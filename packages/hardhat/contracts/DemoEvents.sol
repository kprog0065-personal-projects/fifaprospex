// contracts/DemoEvents.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC4626Asset {
    function asset() external view returns (address);
}

interface IMintableERC20 {
    function mintTo(address to, uint256 amount) external;
}

contract DemoEvents is Ownable {
    address public foundationVault;
    address public academyVault;
    address public proVault;

    IERC20 public immutable stable; // mCAD

    // special-event split: 50/30/20
    uint16 public constant FOUNDATION_BPS = 5000;
    uint16 public constant ACADEMY_BPS = 3000;
    uint16 public constant PRO_BPS = 2000;

    event YearYieldAdded(address indexed vault, uint256 assets);
    event TransferInstallmentSimulated(
        uint256 assets,
        uint256 foundationAssets,
        uint256 academyAssets,
        uint256 proAssets
    );

    constructor(address stable_, address owner_) Ownable(owner_) {
        require(stable_ != address(0), "stable=0");
        stable = IERC20(stable_);
    }

    function setVaults(address foundation_, address academy_, address pro_) external onlyOwner {
        require(foundation_ != address(0) && academy_ != address(0) && pro_ != address(0), "vault=0");
        // Optional sanity: ensure all vaults use same asset
        require(IERC4626Asset(foundation_).asset() == address(stable), "foundation asset mismatch");
        require(IERC4626Asset(academy_).asset() == address(stable), "academy asset mismatch");
        require(IERC4626Asset(pro_).asset() == address(stable), "pro asset mismatch");

        foundationVault = foundation_;
        academyVault = academy_;
        proVault = pro_;
    }

    /**
     * @dev Demo "1 year yield" by MINTING mCAD directly into a vault.
     * No need for caller to have tokens or approve.
     * NOTE: Requires this contract to own the MockStablecoin.
     * NOTE: Open access for demo purposes only.
     */
    function addYearYield(address vault, uint256 assets) external {
        require(vault != address(0), "vault=0");
        require(assets > 0, "assets=0");

        // Mint directly to vault instead of transferFrom
        IMintableERC20(address(stable)).mintTo(vault, assets);

        emit YearYieldAdded(vault, assets);
    }

    /**
     * @dev Demo "transfer installment received" by MINTING mCAD into vaults using the special-event waterfall.
     * Call this multiple times to simulate installments (e.g., 4M, 3M, 3M).
     * NOTE: Requires this contract to own the MockStablecoin.
     * NOTE: Open access for demo purposes only.
     */
    function simulateTransferInstallment(uint256 assets) external {
        require(foundationVault != address(0), "vaults not set");
        require(assets > 0, "assets=0");

        uint256 foundationAssets = (assets * FOUNDATION_BPS) / 10_000;
        uint256 academyAssets = (assets * ACADEMY_BPS) / 10_000;
        uint256 proAssets = assets - foundationAssets - academyAssets; // remainder to avoid rounding loss

        // Mint directly to vaults instead of transferFrom
        IMintableERC20(address(stable)).mintTo(foundationVault, foundationAssets);
        IMintableERC20(address(stable)).mintTo(academyVault, academyAssets);
        IMintableERC20(address(stable)).mintTo(proVault, proAssets);

        emit TransferInstallmentSimulated(assets, foundationAssets, academyAssets, proAssets);
    }
}
