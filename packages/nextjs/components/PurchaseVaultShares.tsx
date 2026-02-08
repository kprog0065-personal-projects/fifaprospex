"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useBlockNumber, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESSES, DEMO_EVENTS_ABI, ERC20_ABI, REPURCHASE_MANAGER_ABI, VAULT_ABI } from "~~/lib/contracts";

type Pool = "foundation" | "pathway" | "proPath";

interface Props {
  pool: Pool;
  minDeposit: number;
}

// 1 bp = 0.01%
// 600 = 6.00%, 800 = 8.00%, 1000 = 10.00%
const POOL_APY_BPS: Record<Pool, bigint> = {
  foundation: 600n,
  pathway: 800n,
  proPath: 1000n,
};

const formatBpsPercent = (bps: bigint) => {
  const whole = bps / 100n;
  const frac = bps % 100n;
  return frac === 0n ? `${whole}%` : `${whole}.${frac.toString().padStart(2, "0")}%`;
};

export function PurchaseVaultShares({ pool, minDeposit }: Props) {
  const [depositAmount, setDepositAmount] = useState("");
  const [sellShares, setSellShares] = useState("");

  const vaultAddress = CONTRACT_ADDRESSES[pool];
  const cadAddress = CONTRACT_ADDRESSES.cad;
  const demoEventsAddress = CONTRACT_ADDRESSES.demoEvents;

  // one repurchase manager per pool
  const repurchaseAddress =
    pool === "foundation"
      ? CONTRACT_ADDRESSES.foundationRepurchase
      : pool === "pathway"
        ? CONTRACT_ADDRESSES.pathwayRepurchase
        : CONTRACT_ADDRESSES.proPathRepurchase;

  const { address } = useAccount();

  const apyBps = POOL_APY_BPS[pool];
  const apyLabel = formatBpsPercent(apyBps);

  const { writeContract, data: txHash } = useWriteContract();

  const { isLoading: isPending, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  });

  // Watch new blocks, refetch reads
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { data: cadBalance, refetch: refetchCadBalance } = useReadContract({
    address: cadAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: vaultShares, refetch: refetchVaultShares } = useReadContract({
    address: vaultAddress,
    abi: VAULT_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Total value held by the vault (mCAD)
  const { data: totalAssets, refetch: refetchTotalAssets } = useReadContract({
    address: vaultAddress,
    abi: VAULT_ABI,
    functionName: "totalAssets",
    query: { enabled: true },
  });

  // READ CURRENT WINDOW ID DIRECTLY FROM CONTRACT
  const { data: currentWindowId, refetch: refetchWindowId } = useReadContract({
    address: repurchaseAddress as `0x${string}`,
    abi: REPURCHASE_MANAGER_ABI,
    functionName: "currentWindowId",
    query: { enabled: !!repurchaseAddress },
  });

  // GET WINDOW DETAILS
  const { data: windowData, refetch: refetchWindow } = useReadContract({
    address: repurchaseAddress as `0x${string}`,
    abi: REPURCHASE_MANAGER_ABI,
    functionName: "windows",
    args: [currentWindowId || 0n],
    query: {
      enabled: !!repurchaseAddress && !!currentWindowId && currentWindowId > 0n,
    },
  });

  // Parse window status
  const isWindowSettled = windowData ? windowData[5] : false;
  const windowEnd = windowData ? windowData[1] : 0n;
  const isWindowOpen = windowData && !isWindowSettled && Date.now() / 1000 < Number(windowEnd);

  // 🔍 DEBUG
  console.log("🔍 Window Debug:", {
    currentWindowId: currentWindowId?.toString(),
    windowData: windowData
      ? {
          start: windowData[0]?.toString(),
          end: windowData[1]?.toString(),
          settled: windowData[5],
        }
      : "NO DATA",
    isWindowOpen,
    nowTimestamp: Math.floor(Date.now() / 1000),
    repurchaseAddress,
  });

  const refetchAll = () => {
    refetchCadBalance();
    refetchVaultShares();
    refetchTotalAssets();
    refetchWindowId();
    refetchWindow();
  };

  useEffect(() => {
    if (!address) return;
    refetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber, address]);

  useEffect(() => {
    if (!isTxSuccess) return;
    refetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTxSuccess]);

  const handleAction = (
    action:
      | "faucet"
      | "approve"
      | "deposit"
      | "approveDemo"
      | "transfer10m"
      | "yield"
      | "openWindow"
      | "approveSell"
      | "tender"
      | "settleWindow"
      | "claim",
  ) => {
    if (!address) return;

    switch (action) {
      case "faucet":
        writeContract({
          address: cadAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "faucet",
          args: [parseUnits("10000000", 18)],
        });
        break;

      case "approve":
        if (!depositAmount) return;
        writeContract({
          address: cadAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [vaultAddress as `0x${string}`, parseUnits(depositAmount, 18)],
        });
        break;

      case "deposit":
        if (!depositAmount) return;
        writeContract({
          address: vaultAddress as `0x${string}`,
          abi: VAULT_ABI,
          functionName: "deposit",
          args: [parseUnits(depositAmount, 18), address],
        });
        break;

      case "approveDemo":
        writeContract({
          address: cadAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [demoEventsAddress as `0x${string}`, 2n ** 256n - 1n],
        });
        break;

      case "transfer10m": {
        const installment = parseUnits("4000000", 18);
        writeContract({
          address: demoEventsAddress as `0x${string}`,
          abi: DEMO_EVENTS_ABI,
          functionName: "simulateTransferInstallment",
          args: [installment],
        });
        break;
      }

      case "yield": {
        if (!totalAssets || totalAssets === 0n) return;

        const yieldAssets = (totalAssets * apyBps) / 10_000n;
        if (yieldAssets === 0n) return;

        writeContract({
          address: demoEventsAddress as `0x${string}`,
          abi: DEMO_EVENTS_ABI,
          functionName: "addYearYield",
          args: [vaultAddress as `0x${string}`, yieldAssets],
        });
        break;
      }

      case "openWindow": {
        const startTime = Math.floor(Date.now() / 1000);
        const endTime = startTime + 1; // 1 second for instant demo
        const offerBps = 500; // 5%

        writeContract({
          address: repurchaseAddress as `0x${string}`,
          abi: REPURCHASE_MANAGER_ABI,
          functionName: "openWindow",
          args: [BigInt(startTime), BigInt(endTime), offerBps],
        });
        break;
      }

      case "approveSell": {
        if (!sellShares) return;

        writeContract({
          address: vaultAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [repurchaseAddress as `0x${string}`, parseUnits(sellShares, 18)],
        });
        break;
      }

      case "tender": {
        if (!sellShares || !currentWindowId || currentWindowId === 0n) return;
        writeContract({
          address: repurchaseAddress as `0x${string}`,
          abi: REPURCHASE_MANAGER_ABI,
          functionName: "tender",
          args: [currentWindowId, parseUnits(sellShares, 18)],
        });
        break;
      }

      case "settleWindow": {
        if (!currentWindowId || currentWindowId === 0n) return;
        writeContract({
          address: repurchaseAddress as `0x${string}`,
          abi: REPURCHASE_MANAGER_ABI,
          functionName: "settle",
          args: [currentWindowId],
        });
        break;
      }

      case "claim": {
        if (!currentWindowId || currentWindowId === 0n) return;
        writeContract({
          address: repurchaseAddress as `0x${string}`,
          abi: REPURCHASE_MANAGER_ABI,
          functionName: "claim",
          args: [currentWindowId],
        });
        break;
      }
    }
  };

  const oneYearYield = totalAssets ? (totalAssets * apyBps) / 10_000n : 0n;

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div className="space-y-4">
            {!connected ? (
              <div className="flex justify-center">
                <button
                  onClick={openConnectModal}
                  type="button"
                  className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
                >
                  Purchase
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* DEMO BUTTONS */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAction("transfer10m")}
                    disabled={isPending}
                    className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-purple-700 disabled:opacity-50 shadow-sm hover:shadow-md"
                  >
                    {isPending ? "Transferring..." : "💰 Simulate Transfer (Installment)"}
                  </button>

                  <button
                    onClick={() => handleAction("yield")}
                    disabled={isPending}
                    className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-50 shadow-sm hover:shadow-md"
                    title={`Adds ${apyLabel} of current vault total each click (compounding).`}
                  >
                    {isPending ? "Adding Yield..." : `📈 Add 1 Year Yield (${apyLabel})`}
                  </button>
                </div>

                <button
                  onClick={() => handleAction("approveDemo")}
                  disabled={isPending}
                  className="w-full rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 disabled:opacity-50"
                >
                  {isPending ? "Approving..." : "Approve Demo Actions (one-time)"}
                </button>

                {/* WALLET + VAULT TILES */}
                <div className="space-y-2">
                  {/* Wallet */}
                  <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-3 text-[11px]">
                    <p className="mb-2 font-semibold text-slate-200">Wallet</p>
                    <p className="text-slate-400">
                      CAD: <span className="text-slate-200">{cadBalance ? formatUnits(cadBalance, 18) : "0"}</span>
                    </p>
                    <p className="text-slate-400">
                      Pool Tokens:{" "}
                      <span className="text-slate-200">{vaultShares ? formatUnits(vaultShares, 18) : "0"}</span>
                    </p>
                  </div>

                  {/* Vault */}
                  <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-3 text-[11px]">
                    <p className="mb-2 font-semibold text-slate-200">Vault</p>
                    <p className="text-slate-400">
                      Vault total (CAD):{" "}
                      <span className="text-slate-200">{totalAssets ? formatUnits(totalAssets, 18) : "0"}</span>
                    </p>
                    <p className="text-slate-400">
                      1Y yield @{apyLabel} (CAD):{" "}
                      <span className="text-slate-200">{oneYearYield ? formatUnits(oneYearYield, 18) : "0"}</span>
                    </p>
                  </div>
                </div>

                {/* BUY FLOW */}
                <button
                  onClick={() => handleAction("faucet")}
                  disabled={isPending}
                  className="w-full rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 disabled:opacity-50"
                >
                  {isPending ? "Minting..." : "Get Test CAD (10,000,000)"}
                </button>

                <input
                  type="number"
                  value={depositAmount}
                  onChange={e => setDepositAmount(e.target.value)}
                  placeholder={`Min: ${minDeposit} CAD`}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500"
                />

                <button
                  onClick={() => handleAction("approve")}
                  disabled={isPending || !depositAmount}
                  className="w-full rounded-lg bg-amber-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
                >
                  {isPending ? "Approving..." : "Approve CAD Spending"}
                </button>

                <button
                  onClick={() => handleAction("deposit")}
                  disabled={isPending || !depositAmount}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                >
                  {isPending ? "Depositing..." : "Deposit into Vault"}
                </button>

                {/* SELL / REPURCHASE FLOW */}
                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3 space-y-2 text-[11px] text-slate-400">
                  <p className="mb-1 font-semibold text-slate-200">Sell / Withdraw (Repurchase Window)</p>

                  <input
                    type="number"
                    value={sellShares}
                    onChange={e => setSellShares(e.target.value)}
                    placeholder="Shares to sell"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] text-slate-200 placeholder:text-slate-500"
                  />

                  {/* Window Status Display */}
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={
                        currentWindowId && currentWindowId > 0n
                          ? `Window #${currentWindowId.toString()}`
                          : "No active window"
                      }
                      readOnly
                      className="flex-1 rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-1.5 text-[11px] text-slate-200 cursor-not-allowed"
                    />
                    <span
                      className={`px-2 py-1 text-[10px] rounded-full whitespace-nowrap ${
                        isWindowOpen
                          ? "bg-emerald-500/20 text-emerald-300"
                          : isWindowSettled
                            ? "bg-blue-500/20 text-blue-300"
                            : currentWindowId && currentWindowId > 0n
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-slate-500/20 text-slate-400"
                      }`}
                    >
                      {currentWindowId && currentWindowId > 0n
                        ? isWindowOpen
                          ? "Open"
                          : isWindowSettled
                            ? "Settled"
                            : "Closed"
                        : "None"}
                    </span>
                  </div>

                  {/* Window end time */}
                  {windowEnd > 0n && (
                    <p className="text-[10px] text-slate-500">
                      {isWindowOpen
                        ? `Closes: ${new Date(Number(windowEnd) * 1000).toLocaleString()}`
                        : `Closed: ${new Date(Number(windowEnd) * 1000).toLocaleString()}`}
                    </p>
                  )}

                  {/* Open Window Button */}
                  {(!currentWindowId || currentWindowId === 0n || isWindowSettled) && (
                    <button
                      onClick={() => handleAction("openWindow")}
                      disabled={isPending}
                      className="w-full rounded-lg bg-purple-600 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
                    >
                      {isPending ? "Opening..." : "🔓 Open Repurchase Window (Admin - 1 sec)"}
                    </button>
                  )}

                  {/* Approve Shares */}
                  <button
                    onClick={() => handleAction("approveSell")}
                    disabled={isPending || !sellShares || !isWindowOpen}
                    className="w-full rounded-lg bg-slate-800 px-3 py-1.5 text-[11px] font-medium text-slate-200 transition-colors hover:bg-slate-700 disabled:opacity-50"
                  >
                    {isPending ? "Approving..." : "Approve share spending"}
                  </button>

                  {/* Tender Shares */}
                  <button
                    onClick={() => handleAction("tender")}
                    disabled={isPending || !sellShares || !currentWindowId || currentWindowId === 0n || !isWindowOpen}
                    className="w-full rounded-lg bg-rose-600 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-rose-700 disabled:opacity-50"
                  >
                    {isPending ? "Tendering..." : "Sell shares into window"}
                  </button>

                  {/* Settle Window Button */}
                  {!!currentWindowId && currentWindowId > 0n && !isWindowOpen && !isWindowSettled && (
                    <button
                      onClick={() => handleAction("settleWindow")}
                      disabled={isPending}
                      className="w-full rounded-lg bg-amber-600 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
                    >
                      {isPending ? "Settling..." : "⚙️ Settle Window (Admin)"}
                    </button>
                  )}

                  {/* Claim Payout */}
                  <button
                    onClick={() => handleAction("claim")}
                    disabled={isPending || !currentWindowId || currentWindowId === 0n || !isWindowSettled}
                    className="w-full rounded-lg bg-sky-600 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-sky-700 disabled:opacity-50"
                  >
                    {isPending ? "Claiming..." : "Claim CAD payout"}
                  </button>

                  {/* Help Text */}
                  <p className="text-[10px] text-slate-500">
                    {!currentWindowId || currentWindowId === 0n
                      ? "Admin must open a tender window first."
                      : isWindowOpen
                        ? `Window open - tender shares before ${new Date(Number(windowEnd) * 1000).toLocaleString()}`
                        : !isWindowSettled
                          ? "Window closed. Admin must settle before you can claim."
                          : "Window settled. Claim your CAD for filled shares."}
                  </p>
                </div>

                {/* Account */}
                <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2 text-[11px] text-slate-400">
                  <p>Wallet: {account.displayName}</p>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
