// lib/demoWallets.ts
// ─────────────────────────────────────────────────────────────
// Demo wallet addresses for batchFaucet.
// Addresses are passed at call time — never hardcoded in the contract.
//
// LOCAL:   Default Hardhat/Anvil accounts (deterministic, always the same)
// TESTNET: Your actual Avalanche Fuji testnet wallets
//
// To switch: set NEXT_PUBLIC_ENV=testnet in your .env.local
// ─────────────────────────────────────────────────────────────

const LOCAL_WALLETS: `0x${string}`[] = [
  //   "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // Hardhat wallet 0
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Hardhat wallet 1
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", // Hardhat wallet 2
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906", // Hardhat wallet 3
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", // Hardhat wallet 4
  "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", // Hardhat wallet 5
];

const TESTNET_WALLETS: `0x${string}`[] = [
  "0xYourAvalancheWallet1", // Replace before deploying to testnet
  "0xYourAvalancheWallet2",
  "0xYourAvalancheWallet3",
  "0xYourAvalancheWallet4",
  "0xYourAvalancheWallet5",
];

export const DEMO_WALLETS = process.env.NEXT_PUBLIC_ENV === "testnet" ? TESTNET_WALLETS : LOCAL_WALLETS;
