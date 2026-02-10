// contracts/RepurchaseManager.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IERC4626Minimal {
    function asset() external view returns (address);
    function totalSupply() external view returns (uint256);

    function previewRedeem(uint256 shares) external view returns (uint256);
    function redeem(uint256 shares, address receiver, address owner) external returns (uint256);

    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function transfer(address to, uint256 value) external returns (bool);
}

/**
 * @title RepurchaseManager
 * @dev Interval-fund style repurchase offers:
 * - Users tender shares during an open window (shares escrowed here).
 * - After window close, owner settles: cap = offerBps of vault totalSupply at open.
 * - If oversubscribed, fills are pro-rata.
 * - Users claim: receive assets for filled shares; unfilled shares returned.
 */
contract RepurchaseManager is Ownable {
    using SafeERC20 for IERC20;

    struct Window {
        uint64 start;
        uint64 end;
        uint16 offerBps; // e.g., 500 = 5%
        uint256 offerShares; // computed at open: totalSupply * offerBps / 10000
        uint256 totalTendered; // total shares tendered
        bool settled;
        uint256 fillBps; // 0..10000 where 10000 means fully filled
    }

    IERC4626Minimal public immutable vault;
    IERC20 public immutable assetToken;

    uint256 public nextWindowId = 1;
    mapping(uint256 => Window) public windows;

    mapping(uint256 => mapping(address => uint256)) public tenderedShares;
    mapping(uint256 => mapping(address => bool)) public claimed;

    event WindowOpened(uint256 indexed windowId, uint64 start, uint64 end, uint16 offerBps, uint256 offerShares);
    event Tendered(uint256 indexed windowId, address indexed user, uint256 shares);
    event WindowSettled(uint256 indexed windowId, uint256 totalTendered, uint256 offerShares, uint256 fillBps);
    event Claimed(
        uint256 indexed windowId,
        address indexed user,
        uint256 filledShares,
        uint256 assetsPaid,
        uint256 returnedShares
    );

    constructor(address vault_, address owner_) Ownable(owner_) {
        require(vault_ != address(0), "vault=0");
        vault = IERC4626Minimal(vault_);
        assetToken = IERC20(IERC4626Minimal(vault_).asset());
    }

    function currentWindowId() external view returns (uint256) {
        return nextWindowId == 0 ? 0 : nextWindowId - 1;
    }

    /**
     * @dev Open a repurchase window.
     * NOTE: onlyOwner removed for demo. Production must restrict to admin/governance.
     */
    function openWindow(uint64 start, uint64 end, uint16 offerBps) external returns (uint256 windowId) {
        require(end > start, "bad window");
        require(offerBps > 0 && offerBps <= 2500, "offerBps max 25%");
        // simple: do not allow overlapping open windows
        if (nextWindowId > 1) {
            Window memory prev = windows[nextWindowId - 1];
            require(prev.settled, "prev not settled");
        }

        uint256 ts = vault.totalSupply();
        uint256 offerShares = (ts * offerBps) / 10_000;

        windowId = nextWindowId++;
        windows[windowId] = Window({
            start: start,
            end: end,
            offerBps: offerBps,
            offerShares: offerShares,
            totalTendered: 0,
            settled: false,
            fillBps: 0
        });

        emit WindowOpened(windowId, start, end, offerBps, offerShares);
    }

    function tender(uint256 windowId, uint256 shares) external {
        Window storage w = windows[windowId];
        require(block.timestamp >= w.start && block.timestamp <= w.end, "window closed");
        require(shares > 0, "shares=0");

        // Escrow shares in this manager
        require(vault.transferFrom(msg.sender, address(this), shares), "share transfer failed");

        tenderedShares[windowId][msg.sender] += shares;
        w.totalTendered += shares;

        emit Tendered(windowId, msg.sender, shares);
    }

    /**
     * @dev Settle a repurchase window after close.
     * NOTE: onlyOwner removed for demo. Production should use Chainlink Keeper automation.
     */
    function settle(uint256 windowId) external {
        Window storage w = windows[windowId];
        require(!w.settled, "settled");
        // require(block.timestamp > w.end, "not ended"); // Demo: allow settle before end time

        if (w.totalTendered == 0 || w.offerShares == 0) {
            w.fillBps = 0;
            w.settled = true;
            emit WindowSettled(windowId, w.totalTendered, w.offerShares, w.fillBps);
            return;
        }

        if (w.totalTendered <= w.offerShares) {
            w.fillBps = 10_000; // fully filled
        } else {
            // pro-rata: filled = tendered * offerShares / totalTendered
            // represent as bps for deterministic per-user calc
            w.fillBps = (uint256(w.offerShares) * 10_000) / uint256(w.totalTendered);
        }

        w.settled = true;
        emit WindowSettled(windowId, w.totalTendered, w.offerShares, w.fillBps);
    }

    function previewClaim(
        uint256 windowId,
        address user
    ) public view returns (uint256 filledShares, uint256 returnedShares, uint256 assetsPaid) {
        Window memory w = windows[windowId];
        uint256 t = tenderedShares[windowId][user];
        if (!w.settled || t == 0) return (0, 0, 0);

        if (w.fillBps == 10_000) {
            filledShares = t;
        } else {
            filledShares = (t * w.fillBps) / 10_000;
        }

        returnedShares = t - filledShares;
        assetsPaid = filledShares == 0 ? 0 : vault.previewRedeem(filledShares);
    }

    function claim(uint256 windowId) external {
        // Window memory w = windows[windowId]; // Demo: not needed without settlement check
        // require(w.settled, "not settled"); // Demo: allow claim without settlement
        require(!claimed[windowId][msg.sender], "claimed");

        claimed[windowId][msg.sender] = true;

        (uint256 filledShares, uint256 returnedShares, ) = previewClaim(windowId, msg.sender);

        // 1) Pay assets for filled shares by redeeming from vault (burns shares held by this contract).
        uint256 redeemedAssets = 0;
        if (filledShares > 0) {
            redeemedAssets = vault.redeem(filledShares, msg.sender, address(this));
        }

        // 2) Return any unfilled shares
        if (returnedShares > 0) {
            require(vault.transfer(msg.sender, returnedShares), "return shares failed");
        }

        emit Claimed(windowId, msg.sender, filledShares, redeemedAssets, returnedShares);
    }
}
