// lib/contracts.ts

export const CONTRACT_ADDRESSES = {
  cad: "0x5FbDB2315678afecb367f032d93F642f64180aa3" as `0x${string}`,
  foundation: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" as `0x${string}`,
  pathway: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" as `0x${string}`,
  proPath: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9" as `0x${string}`,
  demoEvents: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788" as `0x${string}`,

  // Repurchase Managers
  foundationRepurchase: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9" as `0x${string}`,
  pathwayRepurchase: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707" as `0x${string}`,
  proPathRepurchase: "0x0165878A594ca255338adfa4d48449f69242Eb8F" as `0x${string}`,
} as const;

export const VAULT_ABI = [
  {
    inputs: [
      { name: "assets", type: "uint256" },
      { name: "receiver", type: "address" },
    ],
    name: "deposit",
    outputs: [{ type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAssets",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "asset",
    outputs: [{ type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const ERC20_ABI = [
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "amount", type: "uint256" }],
    name: "faucet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const DEMO_EVENTS_ABI = [
  {
    inputs: [
      { name: "vault", type: "address" },
      { name: "assets", type: "uint256" },
    ],
    name: "addYearYield",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "assets", type: "uint256" }],
    name: "simulateTransferInstallment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

// RepurchaseManager ABI (copied from your RepurchaseManager.json "abi" field)
export const REPURCHASE_MANAGER_ABI = [
  {
    inputs: [
      { internalType: "address", name: "vault_", type: "address" },
      { internalType: "address", name: "owner_", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "windowId", type: "uint256" },
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "filledShares", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "assetsPaid", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "returnedShares", type: "uint256" },
    ],
    name: "Claimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "windowId", type: "uint256" },
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "shares", type: "uint256" },
    ],
    name: "Tendered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "windowId", type: "uint256" },
      { indexed: false, internalType: "uint64", name: "start", type: "uint64" },
      { indexed: false, internalType: "uint64", name: "end", type: "uint64" },
      { indexed: false, internalType: "uint16", name: "offerBps", type: "uint16" },
      { indexed: false, internalType: "uint256", name: "offerShares", type: "uint256" },
    ],
    name: "WindowOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "windowId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "totalTendered", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "offerShares", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "fillBps", type: "uint256" },
    ],
    name: "WindowSettled",
    type: "event",
  },
  {
    inputs: [],
    name: "assetToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "windowId", type: "uint256" }],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "claimed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentWindowId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextWindowId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "start", type: "uint64" },
      { internalType: "uint64", name: "end", type: "uint64" },
      { internalType: "uint16", name: "offerBps", type: "uint16" },
    ],
    name: "openWindow",
    outputs: [{ internalType: "uint256", name: "windowId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "windowId", type: "uint256" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "previewClaim",
    outputs: [
      { internalType: "uint256", name: "filledShares", type: "uint256" },
      { internalType: "uint256", name: "returnedShares", type: "uint256" },
      { internalType: "uint256", name: "assetsPaid", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "windowId", type: "uint256" }],
    name: "settle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "windowId", type: "uint256" },
      { internalType: "uint256", name: "shares", type: "uint256" },
    ],
    name: "tender",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "tenderedShares",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "vault",
    outputs: [{ internalType: "contract IERC4626Minimal", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "windows",
    outputs: [
      { internalType: "uint64", name: "start", type: "uint64" },
      { internalType: "uint64", name: "end", type: "uint64" },
      { internalType: "uint16", name: "offerBps", type: "uint16" },
      { internalType: "uint256", name: "offerShares", type: "uint256" },
      { internalType: "uint256", name: "totalTendered", type: "uint256" },
      { internalType: "bool", name: "settled", type: "bool" },
      { internalType: "uint256", name: "fillBps", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
