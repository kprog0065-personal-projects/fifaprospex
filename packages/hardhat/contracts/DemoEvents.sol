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

    // Waterfall split: Foundation 50 / Academy 30 / Pro 20
    uint16 public constant FOUNDATION_BPS = 5000; // ✅ 50%
    uint16 public constant ACADEMY_BPS = 3000; // ✅ 30%
    uint16 public constant PRO_BPS = 2000; // ✅ 20%

    // SPV and platform fee constants
    uint16 public constant SPV_SHARE_BPS = 4900; // 49%
    uint16 public constant PLATFORM_FEE_BPS = 500; // 5% of SPV share

    // Solidarity rates (max, per pool)
    uint16 public constant SOLIDARITY_ACADEMY_BPS = 50; // 0.50% of gross transfer
    uint16 public constant SOLIDARITY_PRO_BPS = 50; // 0.50% of gross transfer

    event YearYieldAdded(address indexed vault, uint256 assets);
    event TransferInstallmentSimulated(
        uint256 grossInstallment,
        uint256 spvShare,
        uint256 platformFee,
        uint256 netToWaterfall,
        uint256 foundationAssets,
        uint256 academyAssets,
        uint256 proAssets
    );
    event SolidaryPaymentSimulated(
        address indexed vault,
        uint256 grossTransferFee,
        uint256 solidarityGross,
        uint256 spvShare,
        uint256 platformFee,
        uint256 netToPool
    );

    constructor(address stable_, address owner_) Ownable(owner_) {
        require(stable_ != address(0), "stable=0");
        stable = IERC20(stable_);
    }

    function setVaults(address foundation_, address academy_, address pro_) external onlyOwner {
        require(foundation_ != address(0) && academy_ != address(0) && pro_ != address(0), "vault=0");
        require(IERC4626Asset(foundation_).asset() == address(stable), "foundation asset mismatch");
        require(IERC4626Asset(academy_).asset() == address(stable), "academy asset mismatch");
        require(IERC4626Asset(pro_).asset() == address(stable), "pro asset mismatch");

        foundationVault = foundation_;
        academyVault = academy_;
        proVault = pro_;
    }

    /**
     * @dev Demo base yield — mints directly into a single vault.
     * Rate is 5% APY applied externally by frontend.
     * NOTE: Open access for demo purposes only.
     */
    function addYearYield(address vault, uint256 assets) external {
        require(vault != address(0), "vault=0");
        require(assets > 0, "assets=0");
        IMintableERC20(address(stable)).mintTo(vault, assets);
        emit YearYieldAdded(vault, assets);
    }

    /**
     * @dev Demo transfer installment.
     * Pass gross installment amount — contract calculates:
     *   SPV 49% share → platform fee 5% → net to waterfall → Foundation/Academy/Pro split
     * Call multiple times to simulate installments.
     * NOTE: Open access for demo purposes only.
     */
    function simulateTransferInstallment(uint256 grossInstallment) external {
        require(foundationVault != address(0), "vaults not set");
        require(grossInstallment > 0, "amount=0");

        uint256 spvShare = (grossInstallment * SPV_SHARE_BPS) / 10_000;
        uint256 platformFee = (spvShare * PLATFORM_FEE_BPS) / 10_000;
        uint256 net = spvShare - platformFee;

        uint256 foundationAssets = (net * FOUNDATION_BPS) / 10_000;
        uint256 academyAssets = (net * ACADEMY_BPS) / 10_000;
        uint256 proAssets = net - foundationAssets - academyAssets; // remainder avoids rounding loss

        IMintableERC20(address(stable)).mintTo(foundationVault, foundationAssets);
        IMintableERC20(address(stable)).mintTo(academyVault, academyAssets);
        IMintableERC20(address(stable)).mintTo(proVault, proAssets);

        emit TransferInstallmentSimulated(
            grossInstallment,
            spvShare,
            platformFee,
            net,
            foundationAssets,
            academyAssets,
            proAssets
        );
    }

    /**
     * @dev Demo solidarity payment.
     * Only valid for Academy and Pro vaults — Foundation (U6-U11) is ineligible.
     * Pass gross transfer fee — contract calculates solidarity rate → SPV share → platform fee → net to pool.
     * NOTE: Open access for demo purposes only.
     */
    function simulateSolidarity(address vault, uint256 grossTransferFee) external {
        require(foundationVault != address(0), "vaults not set");
        require(grossTransferFee > 0, "amount=0");
        require(
            vault == academyVault || vault == proVault,
            "Foundation ineligible for solidarity (U6-U11 under age 12)"
        );

        uint16 solidarityRateBps = (vault == academyVault) ? SOLIDARITY_ACADEMY_BPS : SOLIDARITY_PRO_BPS;

        uint256 solidarityGross = (grossTransferFee * solidarityRateBps) / 10_000;
        uint256 spvShare = (solidarityGross * SPV_SHARE_BPS) / 10_000;
        uint256 platformFee = (spvShare * PLATFORM_FEE_BPS) / 10_000;
        uint256 netToPool = spvShare - platformFee;

        IMintableERC20(address(stable)).mintTo(vault, netToPool);

        emit SolidaryPaymentSimulated(vault, grossTransferFee, solidarityGross, spvShare, platformFee, netToPool);
    }
}
