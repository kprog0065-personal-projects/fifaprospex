// contracts/PoolVault.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PoolVault
 * @dev ERC-4626 compliant vault for athlete development pools
 * Users deposit stablecoin (or ETH), receive vault shares representing pool ownership
 */
contract PoolVault is ERC4626, Ownable {
    // Minimum deposit amounts in underlying asset (wei)
    uint256 public immutable MIN_DEPOSIT;
    
    // Pool metadata
    string public poolType; // "Foundation", "Pathway", "ProPath"
    uint256 public cohortYear;
    
    // Distribution tracking
    uint256 public totalDistributed;
    mapping(address => uint256) public lastClaimedDistribution;
    
    event DistributionAdded(uint256 amount, uint256 timestamp);
    event ProfitsDistributed(address indexed recipient, uint256 amount);
    
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
    
    /**
     * @dev Override deposit to enforce minimum
     */
    function deposit(uint256 assets, address receiver) 
        public 
        override 
        returns (uint256) 
    {
        require(assets >= MIN_DEPOSIT, "Below minimum deposit");
        return super.deposit(assets, receiver);
    }
    
    /**
     * @dev Owner adds transfer proceeds to vault (increases share value)
     */
    function addDistribution() external payable onlyOwner {
        require(msg.value > 0, "Must send ETH");
        totalDistributed += msg.value;
        emit DistributionAdded(msg.value, block.timestamp);
    }
    
    /**
     * @dev Calculate pending profits for a share holder
     */
    function pendingProfits(address account) public view returns (uint256) {
        uint256 shares = balanceOf(account);
        if (shares == 0) return 0;
        
        uint256 totalShares = totalSupply();
        uint256 accountShare = (totalDistributed * shares) / totalShares;
        
        return accountShare - lastClaimedDistribution[account];
    }
    
    /**
     * @dev Claim accumulated profits
     */
    function claimProfits() external {
        uint256 profits = pendingProfits(msg.sender);
        require(profits > 0, "No profits to claim");
        
        lastClaimedDistribution[msg.sender] += profits;
        
        (bool success, ) = msg.sender.call{value: profits}("");
        require(success, "Transfer failed");
        
        emit ProfitsDistributed(msg.sender, profits);
    }
    
    /**
     * @dev Allow vault to receive ETH (for distributions)
     */
    receive() external payable {}
}
