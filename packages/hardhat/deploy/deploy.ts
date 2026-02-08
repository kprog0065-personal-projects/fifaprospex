// scripts/deploy.ts
import { ethers } from "hardhat";
import { writeFileSync } from "fs";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 1) Deploy mock stablecoin (demo only)
  const MockStablecoin = await ethers.getContractFactory("MockStablecoin");
  const stablecoin = await MockStablecoin.deploy();
  await stablecoin.waitForDeployment();
  const stablecoinAddress = await stablecoin.getAddress();
  console.log("Mock CAD Stablecoin deployed to:", stablecoinAddress);

  // 2) Deploy vaults
  const PoolVault = await ethers.getContractFactory("PoolVault");

  const foundation = await PoolVault.deploy(
    stablecoinAddress,
    "Foundation Pool Vault Shares",
    "vTFND",
    "Foundation",
    2026,
    ethers.parseUnits("500", 18),
  );
  await foundation.waitForDeployment();
  const foundationAddress = await foundation.getAddress();
  console.log("Foundation Vault deployed to:", foundationAddress);

  const academy = await PoolVault.deploy(
    stablecoinAddress,
    "Academy Pool Vault Shares",
    "vTACD",
    "Academy",
    2026,
    ethers.parseUnits("1500", 18),
  );
  await academy.waitForDeployment();
  const academyAddress = await academy.getAddress();
  console.log("Academy Vault deployed to:", academyAddress);

  const pro = await PoolVault.deploy(
    stablecoinAddress,
    "Pro Pool Vault Shares",
    "vTPRO",
    "Pro",
    2026,
    ethers.parseUnits("5000", 18),
  );
  await pro.waitForDeployment();
  const proAddress = await pro.getAddress();
  console.log("Pro Vault deployed to:", proAddress);

  // Optional: set lockups (0 = disabled). Uncomment if you want lockup gating on-chain.
  // const now = BigInt((await ethers.provider.getBlock("latest"))!.timestamp);
  // await (await foundation.setLockupEndsAt(Number(now + 8n * 365n * 24n * 60n * 60n))).wait();
  // await (await academy.setLockupEndsAt(Number(now + 5n * 365n * 24n * 60n * 60n))).wait();
  // await (await pro.setLockupEndsAt(Number(now + 2n * 365n * 24n * 60n * 60n))).wait();

  // 3) Deploy RepurchaseManagers (one per vault)
  const RepurchaseManager = await ethers.getContractFactory("RepurchaseManager");

  const foundationRepurchase = await RepurchaseManager.deploy(foundationAddress, deployer.address);
  await foundationRepurchase.waitForDeployment();
  const foundationRepurchaseAddress = await foundationRepurchase.getAddress();
  console.log("Foundation RepurchaseManager deployed to:", foundationRepurchaseAddress);

  const academyRepurchase = await RepurchaseManager.deploy(academyAddress, deployer.address);
  await academyRepurchase.waitForDeployment();
  const academyRepurchaseAddress = await academyRepurchase.getAddress();
  console.log("Academy RepurchaseManager deployed to:", academyRepurchaseAddress);

  const proRepurchase = await RepurchaseManager.deploy(proAddress, deployer.address);
  await proRepurchase.waitForDeployment();
  const proRepurchaseAddress = await proRepurchase.getAddress();
  console.log("Pro RepurchaseManager deployed to:", proRepurchaseAddress);

  // Wire vault -> manager (optional but useful for UI / future gating)
  await (await foundation.setRepurchaseManager(foundationRepurchaseAddress)).wait();
  await (await academy.setRepurchaseManager(academyRepurchaseAddress)).wait();
  await (await pro.setRepurchaseManager(proRepurchaseAddress)).wait();
  console.log("✅ Repurchase managers set on vaults");

  // 4) Deploy DemoEvents and set vault addresses
  const DemoEvents = await ethers.getContractFactory("DemoEvents");
  const demoEvents = await DemoEvents.deploy(stablecoinAddress, deployer.address);
  await demoEvents.waitForDeployment();
  const demoEventsAddress = await demoEvents.getAddress();
  console.log("DemoEvents deployed to:", demoEventsAddress);

  await (await demoEvents.setVaults(foundationAddress, academyAddress, proAddress)).wait();
  console.log("✅ DemoEvents vault routing set");

  // Save addresses for frontend/scripts
  const addresses = {
    stablecoin: stablecoinAddress,
    vaults: {
      foundation: foundationAddress,
      academy: academyAddress,
      pro: proAddress,
    },
    repurchaseManagers: {
      foundation: foundationRepurchaseAddress,
      academy: academyRepurchaseAddress,
      pro: proRepurchaseAddress,
    },
    demoEvents: demoEventsAddress,
  };

  writeFileSync("./contracts-addresses.json", JSON.stringify(addresses, null, 2));
  console.log("\n✅ Contract addresses saved to contracts-addresses.json");
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
