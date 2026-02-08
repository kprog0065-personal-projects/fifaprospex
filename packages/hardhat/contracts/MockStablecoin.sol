// contracts/MockStablecoin.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockStablecoin
 * @dev Mock CAD stablecoin for demo (1 token = 1 CAD)
 */
contract MockStablecoin is ERC20 {
    constructor() ERC20("Mock CAD Stablecoin", "mCAD") {
        // Mint 1M CAD to deployer for demo
        _mint(msg.sender, 1_000_000 * 10**decimals());
    }
    
    /**
     * @dev Faucet for demo - anyone can mint up to 1Billion CAD
     */
    function faucet(uint256 amount) external {
        require(amount <= 1_000_000_000 * 10**decimals(), "Max 10k CAD per call");
        _mint(msg.sender, amount);
    }
}
