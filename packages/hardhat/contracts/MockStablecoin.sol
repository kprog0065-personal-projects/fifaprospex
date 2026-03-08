// contracts/MockStablecoin.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MockStablecoin
 * @dev Mock CAD stablecoin for demo (1 token = 1 CAD)
 *      faucet() and batchFaucet() are DEMO ONLY — remove before mainnet.
 */
contract MockStablecoin is ERC20, Ownable {
    uint256 public constant MAX_FAUCET_AMOUNT = 1_000_000_000 * 10 ** 18; // 1B CAD
    uint8 public constant MAX_BATCH_SIZE = 20;

    constructor() ERC20("Mock CAD Stablecoin", "mCAD") Ownable(msg.sender) {
        // Mint 1M CAD to deployer for demo
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    // ─────────────────────────────────────────────────────────────
    //  DEMO FAUCETS
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Mint test CAD to the caller.
     * @param amount Amount in 18-decimal units. Max 1B CAD per call.
     */
    function faucet(uint256 amount) external {
        require(amount <= MAX_FAUCET_AMOUNT, "MockCAD: exceeds faucet limit");
        _mint(msg.sender, amount);
    }

    /**
     * @notice Mint the same amount of test CAD to multiple wallets in one tx.
     * @param recipients Array of wallet addresses to fund. Max 20 per call.
     * @param amount     Amount each wallet receives, in 18-decimal units.
     *
     * @dev  Recipients are passed at call time — never hardcoded in the contract.
     *       On local Hardhat/Anvil:  pass your local test wallet addresses.
     *       On Avalanche testnet:    pass your testnet wallet addresses.
     *       Same contract, same ABI, different addresses at runtime.
     */
    function batchFaucet(address[] calldata recipients, uint256 amount) external {
        require(amount <= MAX_FAUCET_AMOUNT, "MockCAD: exceeds faucet limit");
        require(recipients.length > 0, "MockCAD: empty recipients");
        require(recipients.length <= MAX_BATCH_SIZE, "MockCAD: too many recipients");

        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "MockCAD: zero address in list");
            _mint(recipients[i], amount);
        }
    }

    // ─────────────────────────────────────────────────────────────
    //  OWNER MINT
    // ─────────────────────────────────────────────────────────────

    /**
     * @notice Mint directly to a specific address.
     * @dev    Only owner can call — intended for DemoEvents contract
     *         to top up vaults during yield simulation.
     * @param to     Recipient address.
     * @param amount Amount in 18-decimal units.
     */
    function mintTo(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "MockCAD: mint to zero address");
        _mint(to, amount);
    }

    /**
     * @notice Batch mint different amounts to different addresses.
     * @dev    Owner only — useful for initial demo environment setup,
     *         funding vaults, SPV contracts, etc. with different amounts.
     * @param recipients Array of addresses to fund.
     * @param amounts    Corresponding amounts per address (must match length).
     */
    function batchMintTo(address[] calldata recipients, uint256[] calldata amounts) external {
        require(recipients.length > 0, "MockCAD: empty recipients");
        require(recipients.length <= MAX_BATCH_SIZE, "MockCAD: too many recipients");
        require(recipients.length == amounts.length, "MockCAD: length mismatch");

        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "MockCAD: zero address in list");
            _mint(recipients[i], amounts[i]);
        }
    }
}
