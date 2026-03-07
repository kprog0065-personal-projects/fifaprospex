"use client";

import { useState } from "react";
import { parseUnits } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESSES, DEMO_EVENTS_ABI, ERC20_ABI, REPURCHASE_MANAGER_ABI } from "~~/lib/contracts";

type Pool = "foundation" | "pathway" | "proPath";

interface Props {
  pool: Pool;
  totalAssets: bigint | undefined;
  address: string | undefined;
}

export function DemoControlPanel({ pool, totalAssets, address }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [faucetAmount, setFaucetAmount] = useState("");
  const [yearsOfYield, setYearsOfYield] = useState("");
  const [transferFee, setTransferFee] = useState("");
  const [installments, setInstallments] = useState("1");
  const [solidarityFee, setSolidarityFee] = useState("");
  const [showInstallInfo, setShowInstallInfo] = useState(false);

  const vaultAddress = CONTRACT_ADDRESSES[pool];
  const cadAddress = CONTRACT_ADDRESSES.cad;
  const demoEventsAddress = CONTRACT_ADDRESSES.demoEvents;

  const repurchaseAddress =
    pool === "foundation"
      ? CONTRACT_ADDRESSES.foundationRepurchase
      : pool === "pathway"
        ? CONTRACT_ADDRESSES.pathwayRepurchase
        : CONTRACT_ADDRESSES.proPathRepurchase;

  const academyVaultAddress = CONTRACT_ADDRESSES.pathway;
  const isSolidarityEligible = pool === "pathway" || pool === "proPath";

  const { writeContract, data: txHash } = useWriteContract();

  const { isLoading: isPending } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  });

  // Preview yield using compound formula for display
  const previewYield = (currentAssets: bigint, years: number): string => {
    const multiplier = Math.pow(1.05, years) - 1;
    const multiplierBig = BigInt(Math.round(multiplier * 1_000_000));
    const yieldAmount = (currentAssets * multiplierBig) / 1_000_000n;
    const total = currentAssets + yieldAmount;
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(total.toString()) / 1e18);
  };

  // Preview transfer breakdown for display
  const previewTransfer = (grossFee: number, numInstallments: number) => {
    const spvShare = grossFee * 0.49;
    const platformFee = spvShare * 0.05;
    const net = spvShare - platformFee;
    const perInstall = net / numInstallments;
    return {
      spvShare: spvShare.toFixed(2),
      platformFee: platformFee.toFixed(2),
      net: net.toFixed(2),
      perInstall: perInstall.toFixed(2),
      proPool: (perInstall * 0.5).toFixed(2),
      academyPool: (perInstall * 0.3).toFixed(2),
      foundationPool: (perInstall * 0.2).toFixed(2),
    };
  };

  // Preview solidarity for display
  const previewSolidarity = (grossFee: number) => {
    const solidarityGross = grossFee * 0.005;
    const spvShare = solidarityGross * 0.49;
    const platformFee = spvShare * 0.05;
    const netToPool = spvShare - platformFee;
    return {
      solidarityGross: solidarityGross.toFixed(2),
      spvShare: spvShare.toFixed(2),
      platformFee: platformFee.toFixed(2),
      netToPool: netToPool.toFixed(2),
    };
  };

  const transferPreview = transferFee ? previewTransfer(parseFloat(transferFee), parseInt(installments) || 1) : null;
  const solidarityPreview = solidarityFee ? previewSolidarity(parseFloat(solidarityFee)) : null;
  const years = yearsOfYield ? parseInt(yearsOfYield) : 1;
  const yieldPreview = totalAssets && totalAssets > 0n && years > 0 ? previewYield(totalAssets, years) : null;

  const handleAction = (
    action: "faucet" | "approveDemo" | "transferInstallment" | "yield" | "openWindow" | "solidarity",
  ) => {
    if (!address) return;

    switch (action) {
      case "faucet": {
        const amountToMint = faucetAmount ? faucetAmount : "10000000";
        writeContract({
          address: cadAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "faucet",
          args: [parseUnits(amountToMint, 18)],
        });
        break;
      }

      case "approveDemo":
        writeContract({
          address: cadAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [demoEventsAddress as `0x${string}`, 2n ** 256n - 1n],
        });
        break;

      case "transferInstallment": {
        if (!transferFee) return;
        const numInstallments = parseInt(installments) || 1;
        const grossTotal = parseFloat(transferFee);
        const grossPerInstall = grossTotal / numInstallments;
        writeContract({
          address: demoEventsAddress as `0x${string}`,
          abi: DEMO_EVENTS_ABI,
          functionName: "simulateTransferInstallment",
          args: [parseUnits(grossPerInstall.toFixed(6), 18)],
        });
        break;
      }

      case "yield": {
        if (!totalAssets || totalAssets === 0n) return;
        const numYears = yearsOfYield ? parseInt(yearsOfYield) : 1;

        // Compound interest: totalAssets × ((1.05)^years - 1)
        // Scale by 1_000_000 to preserve 6 decimal places of precision
        const compoundMultiplier = Math.pow(1.05, numYears) - 1;
        const multiplierScaled = BigInt(Math.round(compoundMultiplier * 1_000_000));
        const yieldAssets = (totalAssets * multiplierScaled) / 1_000_000n;

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
        const endTime = startTime + 86400;
        const offerBps = 500;
        writeContract({
          address: repurchaseAddress as `0x${string}`,
          abi: REPURCHASE_MANAGER_ABI,
          functionName: "openWindow",
          args: [BigInt(startTime), BigInt(endTime), offerBps],
        });
        break;
      }

      case "solidarity": {
        if (!solidarityFee || !isSolidarityEligible) return;
        const vaultTarget = pool === "pathway" ? academyVaultAddress : CONTRACT_ADDRESSES.proPath;
        writeContract({
          address: demoEventsAddress as `0x${string}`,
          abi: DEMO_EVENTS_ABI,
          functionName: "simulateSolidarity",
          args: [vaultTarget as `0x${string}`, parseUnits(solidarityFee, 18)],
        });
        break;
      }
    }
  };

  return (
    <>
      {/* Floating Demo Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 z-50 rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-purple-700 transition-all"
      >
        🎮 Demo Controls
      </button>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}

      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-slate-900 border-l border-slate-700 z-50 overflow-y-auto shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-slate-200">🎮 Demo Controls</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-200 text-xl font-bold">
              ✕
            </button>
          </div>

          {/* SIMULATE EVENTS */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Simulate Events</p>

            {/* BASE YIELD */}
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 space-y-2">
              <p className="text-[11px] font-semibold text-indigo-300">📈 Base Yield (5% APY — Compounded)</p>
              <input
                type="number"
                value={yearsOfYield}
                onChange={e => setYearsOfYield(e.target.value)}
                placeholder="Years of yield (default: 1)"
                min="1"
                max="50"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500"
              />

              {/* Yield Preview */}
              {yieldPreview && (
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-2 text-[10px]">
                  <p className="text-slate-400">
                    Vault total after {years} year{years === 1 ? "" : "s"}:{" "}
                    <span className="text-emerald-300 font-semibold">{yieldPreview}</span>
                  </p>
                  <p className="text-slate-500 mt-0.5">Formula: current balance × (1.05)^{years}</p>
                </div>
              )}

              <button
                onClick={() => handleAction("yield")}
                disabled={isPending || !totalAssets || totalAssets === 0n}
                className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-50"
              >
                {isPending ? "Adding Yield..." : `📈 Add ${years} Year${years === 1 ? "" : "s"} @ 5% APY (Compounded)`}
              </button>
              <p className="text-[10px] text-slate-500">
                Compounds annually — each year&apos;s yield is added to the base before the next year calculates.
              </p>
            </div>

            {/* TRANSFER INSTALLMENT */}
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 space-y-2">
              <p className="text-[11px] font-semibold text-purple-300">💰 Transfer Waterfall</p>
              <input
                type="number"
                value={transferFee}
                onChange={e => setTransferFee(e.target.value)}
                placeholder="Gross transfer fee (e.g. 10000000)"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500"
              />
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={installments}
                  onChange={e => setInstallments(e.target.value)}
                  placeholder="Installments"
                  min="1"
                  max="10"
                  className="w-24 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500"
                />
                <span className="text-[10px] text-slate-500">installment(s) — press once per installment</span>
              </div>

              {/* Transfer Preview */}
              {transferPreview && (
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-2 space-y-1 text-[10px]">
                  <p className="text-slate-400">Per installment breakdown:</p>
                  <p className="text-slate-400">
                    SPV 49% share:{" "}
                    <span className="text-slate-200">${parseFloat(transferPreview.spvShare).toLocaleString()}</span>
                  </p>
                  <p className="text-slate-400">
                    Platform fee (5%):{" "}
                    <span className="text-rose-300">-${parseFloat(transferPreview.platformFee).toLocaleString()}</span>
                  </p>
                  <p className="text-slate-400">
                    Net to waterfall:{" "}
                    <span className="text-emerald-300">${parseFloat(transferPreview.net).toLocaleString()}</span>
                  </p>
                  <div className="border-t border-slate-700 pt-1 mt-1">
                    <button
                      onClick={() => setShowInstallInfo(!showInstallInfo)}
                      className="text-slate-500 hover:text-slate-300 text-[10px]"
                    >
                      {showInstallInfo ? "▲ Hide" : "▼ Show"} pool split
                    </button>
                    {showInstallInfo && (
                      <div className="mt-1 space-y-0.5">
                        <p className="text-slate-400">
                          → Pro (50%):{" "}
                          <span className="text-slate-200">
                            ${parseFloat(transferPreview.proPool).toLocaleString()}
                          </span>
                        </p>
                        <p className="text-slate-400">
                          → Academy (30%):{" "}
                          <span className="text-slate-200">
                            ${parseFloat(transferPreview.academyPool).toLocaleString()}
                          </span>
                        </p>
                        <p className="text-slate-400">
                          → Foundation (20%):{" "}
                          <span className="text-slate-200">
                            ${parseFloat(transferPreview.foundationPool).toLocaleString()}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => handleAction("transferInstallment")}
                disabled={isPending || !transferFee}
                className="w-full rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-purple-700 disabled:opacity-50"
              >
                {isPending
                  ? "Simulating..."
                  : `💰 Simulate Installment${parseInt(installments) > 1 ? ` (1 of ${installments})` : ""}`}
              </button>
              <p className="text-[10px] text-slate-500">
                Press once per installment. Gross ÷ installments → SPV 49% → platform 5% → Pro/Academy/Foundation
                waterfall.
              </p>
            </div>

            {/* SOLIDARITY */}
            <div
              className={`rounded-lg border p-3 space-y-2 ${
                isSolidarityEligible
                  ? "border-slate-700 bg-slate-800/50"
                  : "border-slate-800 bg-slate-900/30 opacity-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <p
                  className={`text-[11px] font-semibold ${isSolidarityEligible ? "text-amber-300" : "text-slate-500"}`}
                >
                  🤝 Solidarity Payment
                </p>
                {!isSolidarityEligible && (
                  <span className="text-[10px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">
                    N/A — Foundation U6–U11
                  </span>
                )}
              </div>

              {isSolidarityEligible ? (
                <>
                  <input
                    type="number"
                    value={solidarityFee}
                    onChange={e => setSolidarityFee(e.target.value)}
                    placeholder="Gross transfer fee that triggered solidarity"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500"
                  />

                  {/* Solidarity Preview */}
                  {solidarityPreview && (
                    <div className="rounded-lg bg-slate-900/80 border border-slate-700 p-2 space-y-1 text-[10px]">
                      <p className="text-slate-400">
                        Solidarity gross (0.50%):{" "}
                        <span className="text-slate-200">
                          ${parseFloat(solidarityPreview.solidarityGross).toLocaleString()}
                        </span>
                      </p>
                      <p className="text-slate-400">
                        SPV 49% share:{" "}
                        <span className="text-slate-200">
                          ${parseFloat(solidarityPreview.spvShare).toLocaleString()}
                        </span>
                      </p>
                      <p className="text-slate-400">
                        Platform fee (5%):{" "}
                        <span className="text-rose-300">
                          -${parseFloat(solidarityPreview.platformFee).toLocaleString()}
                        </span>
                      </p>
                      <p className="text-slate-400">
                        Net to {pool === "pathway" ? "Academy" : "Pro"} pool:{" "}
                        <span className="text-emerald-300">
                          ${parseFloat(solidarityPreview.netToPool).toLocaleString()}
                        </span>
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => handleAction("solidarity")}
                    disabled={isPending || !solidarityFee}
                    className="w-full rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-amber-700 disabled:opacity-50"
                  >
                    {isPending
                      ? "Simulating..."
                      : `🤝 Simulate Solidarity — ${pool === "pathway" ? "Academy (U12–U17)" : "Pro (U18–U23)"}`}
                  </button>
                  <p className="text-[10px] text-slate-500">
                    0.50% of gross transfer fee → SPV 49% → platform 5% → net credited to this pool. Flows on every
                    future transfer the player makes for life.
                  </p>
                </>
              ) : (
                <p className="text-[10px] text-slate-500">
                  Foundation pool (U6–U11) is excluded from FIFA solidarity mechanism. Players must be U12+ at time of
                  registration to generate solidarity payments.
                </p>
              )}
            </div>
          </div>

          {/* SETUP ACTIONS */}
          <div className="pt-2 border-t border-slate-700 space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Setup Actions</p>

            <button
              onClick={() => handleAction("approveDemo")}
              disabled={isPending}
              className="w-full rounded-lg bg-slate-700 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-600 disabled:opacity-50"
            >
              {isPending ? "Approving..." : "Approve Demo Actions (one-time)"}
            </button>

            <input
              type="number"
              value={faucetAmount}
              onChange={e => setFaucetAmount(e.target.value)}
              placeholder="Amount of test CAD (default: 10,000,000)"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500"
            />

            <button
              onClick={() => handleAction("faucet")}
              disabled={isPending}
              className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
            >
              {isPending ? "Minting..." : faucetAmount ? `Get ${faucetAmount} Test CAD` : "Get Test CAD (10,000,000)"}
            </button>

            <button
              onClick={() => handleAction("openWindow")}
              disabled={isPending}
              className="w-full rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
            >
              {isPending ? "Opening..." : "🔓 Open Repurchase Window (Admin)"}
            </button>
          </div>

          {/* Info */}
          <div className="pt-4 border-t border-slate-700">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              <strong className="text-slate-400">Demo Mode:</strong> These controls simulate blockchain events for
              demonstration purposes. In production, transfers and yield flow automatically from real SPV events.
              Solidarity is ineligible for Foundation pool (U6–U11 under age 12 per FIFA rules).
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
