// contracts/PoolVault.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PoolVault
 * @dev ERC-4626 vault for athlete pools (mCAD in/out).
 * Demo policy:
 * - NAV is increased by transferring mCAD directly into the vault (donation-style).
 * - Repurchases/lockups are handled by an external RepurchaseManager (optional gating via maxRedeem/maxWithdraw).
 */
contract PoolVault is ERC4626, Ownable {
    uint256 public immutable MIN_DEPOSIT;

    // Metadata
    string public poolType; // "Foundation" | "Academy" | "Pro"
    uint256 public cohortYear;

    // Optional: repurchase/lockup gating (kept very simple for demo)
    address public repurchaseManager;
    uint64 public lockupEndsAt; // unix timestamp; 0 means no lockup

    uint256 public maxCapAssets; // 0 means uncapped
    event MaxCapSet(uint256 maxCapAssets);

    event RepurchaseManagerSet(address indexed manager);
    event LockupSet(uint64 indexed endsAt);

    constructor(
        IERC20 asset_,
        string memory name_,
        string memory symbol_,
        string memory poolType_,
        uint256 cohortYear_,
        uint256 minDeposit_
    ) ERC4626(asset_) ERC20(name_, symbol_) Ownable(msg.sender) {
        poolType = poolType_;
        cohortYear = cohortYear_;
        MIN_DEPOSIT = minDeposit_;
    }

    function setPoolType(string calldata poolType_) external onlyOwner {
        poolType = poolType_;
    }

    function setCohortYear(uint256 cohortYear_) external onlyOwner {
        cohortYear = cohortYear_;
    }

    function setRepurchaseManager(address manager) external onlyOwner {
        repurchaseManager = manager;
        emit RepurchaseManagerSet(manager);
    }

    function setLockupEndsAt(uint64 endsAt) external onlyOwner {
        lockupEndsAt = endsAt;
        emit LockupSet(endsAt);
    }

    function setMaxCapAssets(uint256 cap) external onlyOwner {
        maxCapAssets = cap;
        emit MaxCapSet(cap);
    }

    /// @dev Enforce min deposit.
    function deposit(uint256 assets, address receiver) public override returns (uint256) {
        require(assets >= MIN_DEPOSIT, "Below minimum deposit");
        if (maxCapAssets != 0) {
            require(totalAssets() + assets <= maxCapAssets, "Cap reached");
        }
        return super.deposit(assets, receiver);
    }

    /// @dev Enforce min mint too (optional but keeps UX consistent).
    function mint(uint256 shares, address receiver) public override returns (uint256) {
        uint256 assets = previewMint(shares);
        require(assets >= MIN_DEPOSIT, "Below minimum deposit");
        if (maxCapAssets != 0) {
            require(totalAssets() + assets <= maxCapAssets, "Cap reached");
        }
        return super.mint(shares, receiver);
    }

    /// @dev Simple gating: no redeem/withdraw during lockup.
    /// For the demo we keep window logic inside RepurchaseManager; vault only blocks before lockup end.
    function maxRedeem(address owner) public view override returns (uint256) {
        if (lockupEndsAt != 0 && block.timestamp < lockupEndsAt) return 0;
        return super.maxRedeem(owner);
    }

    function maxWithdraw(address owner) public view override returns (uint256) {
        if (lockupEndsAt != 0 && block.timestamp < lockupEndsAt) return 0;
        return super.maxWithdraw(owner);
    }
}
