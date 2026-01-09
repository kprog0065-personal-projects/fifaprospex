// scripts/deploy.ts
import { ethers } from "hardhat";
import { writeFileSync } from "fs";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 1. Deploy mock stablecoin (for demo only)
  const MockStablecoin = await ethers.getContractFactory("MockStablecoin");
  const stablecoin = await MockStablecoin.deploy();
  await stablecoin.waitForDeployment();
  const stablecoinAddress = await stablecoin.getAddress();
  console.log("Mock CAD Stablecoin deployed to:", stablecoinAddress);

  // 2. Deploy Foundation Pool Vault (U12)
  const FoundationVault = await ethers.getContractFactory("PoolVault");
  const foundation = await FoundationVault.deploy(
    stablecoinAddress,
    "Foundation Pool Vault Shares",
    "vTFND",
    "Foundation",
    2026, // cohort year
    ethers.parseUnits("500", 18), // min 500 CAD
  );
  await foundation.waitForDeployment();
  console.log("Foundation Vault deployed to:", await foundation.getAddress());

  // 3. Deploy Pathway Pool Vault (U14)
  const PathwayVault = await ethers.getContractFactory("PoolVault");
  const pathway = await PathwayVault.deploy(
    stablecoinAddress,
    "Pathway Pool Vault Shares",
    "vTPWY",
    "Pathway",
    2026,
    ethers.parseUnits("1500", 18), // min 1500 CAD
  );
  await pathway.waitForDeployment();
  console.log("Pathway Vault deployed to:", await pathway.getAddress());

  // 4. Deploy Pro Path Pool Vault (U21)
  const ProPathVault = await ethers.getContractFactory("PoolVault");
  const proPath = await ProPathVault.deploy(
    stablecoinAddress,
    "Pro Path Pool Vault Shares",
    "vTPRO",
    "ProPath",
    2026,
    ethers.parseUnits("5000", 18), // min 5000 CAD
  );
  await proPath.waitForDeployment();
  console.log("Pro Path Vault deployed to:", await proPath.getAddress());

  // Save addresses
  const addresses = {
    stablecoin: stablecoinAddress,
    foundation: await foundation.getAddress(),
    pathway: await pathway.getAddress(),
    proPath: await proPath.getAddress(),
  };

  writeFileSync("./contracts-addresses.json", JSON.stringify(addresses, null, 2));
  console.log("\n✅ Contract addresses saved to contracts-addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
