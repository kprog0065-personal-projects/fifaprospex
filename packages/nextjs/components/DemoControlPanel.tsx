"use client";

import { useState } from "react";
import { parseUnits } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESSES, DEMO_EVENTS_ABI, ERC20_ABI, REPURCHASE_MANAGER_ABI } from "~~/lib/contracts";

type Pool = "foundation" | "pathway" | "proPath";

interface Props {
  pool: Pool;
  apyLabel: string;
  apyBps: bigint;
  totalAssets: bigint | undefined;
  address: string | undefined;
}

export function DemoControlPanel({ pool, apyLabel, apyBps, totalAssets, address }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [faucetAmount, setFaucetAmount] = useState("");
  const [yearsOfYield, setYearsOfYield] = useState("");

  const vaultAddress = CONTRACT_ADDRESSES[pool];
  const cadAddress = CONTRACT_ADDRESSES.cad;
  const demoEventsAddress = CONTRACT_ADDRESSES.demoEvents;

  const repurchaseAddress =
    pool === "foundation"
      ? CONTRACT_ADDRESSES.foundationRepurchase
      : pool === "pathway"
        ? CONTRACT_ADDRESSES.pathwayRepurchase
        : CONTRACT_ADDRESSES.proPathRepurchase;

  const { writeContract, data: txHash } = useWriteContract();

  const { isLoading: isPending } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  });

  const handleAction = (action: "faucet" | "approveDemo" | "transfer10m" | "yield" | "openWindow") => {
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

        const years = yearsOfYield ? parseInt(yearsOfYield) : 1;
        const yieldAssets = (totalAssets * apyBps * BigInt(years)) / 10_000n;
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
        const endTime = startTime + 86400; // 1 day for demo
        const offerBps = 500; // 5%

        writeContract({
          address: repurchaseAddress as `0x${string}`,
          abi: REPURCHASE_MANAGER_ABI,
          functionName: "openWindow",
          args: [BigInt(startTime), BigInt(endTime), offerBps],
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

          {/* Demo Actions Section */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Simulate Events</p>

            {/* Transfer & Yield Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAction("transfer10m")}
                disabled={isPending}
                className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-purple-700 disabled:opacity-50 shadow-sm"
              >
                {isPending ? "Transferring..." : "💰 Transfer Installment"}
              </button>

              <button
                onClick={() => handleAction("yield")}
                disabled={isPending}
                className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-50 shadow-sm"
                title={`Adds ${yearsOfYield || "1"} year(s) of yield at ${apyLabel}`}
              >
                {isPending
                  ? "Adding Yield..."
                  : yearsOfYield
                    ? `📈 Add ${yearsOfYield} Year${yearsOfYield === "1" ? "" : "s"} Yield`
                    : `📈 Add 1 Year Yield`}
              </button>
            </div>

            {/* Years Input */}
            <input
              type="number"
              value={yearsOfYield}
              onChange={e => setYearsOfYield(e.target.value)}
              placeholder="Years of yield (default: 1)"
              min="1"
              max="50"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500"
            />

            <div className="pt-2 border-t border-slate-700">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Setup Actions</p>

              {/* Approve Demo */}
              <button
                onClick={() => handleAction("approveDemo")}
                disabled={isPending}
                className="w-full rounded-lg bg-slate-700 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-600 disabled:opacity-50 mb-2"
              >
                {isPending ? "Approving..." : "Approve Demo Actions (one-time)"}
              </button>

              {/* Faucet Amount Input */}
              <input
                type="number"
                value={faucetAmount}
                onChange={e => setFaucetAmount(e.target.value)}
                placeholder="Amount of test CAD (default: 10,000,000)"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 mb-2"
              />

              {/* Get Test CAD */}
              <button
                onClick={() => handleAction("faucet")}
                disabled={isPending}
                className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50 mb-2"
              >
                {isPending ? "Minting..." : faucetAmount ? `Get ${faucetAmount} Test CAD` : "Get Test CAD (10,000,000)"}
              </button>

              {/* Open Window */}
              <button
                onClick={() => handleAction("openWindow")}
                disabled={isPending}
                className="w-full rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
              >
                {isPending ? "Opening..." : "🔓 Open Repurchase Window (Admin)"}
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="pt-4 border-t border-slate-700">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              <strong className="text-slate-400">Demo Mode:</strong> These controls simulate blockchain events for
              demonstration purposes. In production, transfers and yield would happen automatically based on real
              events.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
