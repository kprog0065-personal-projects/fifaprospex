"use client";

import { PurchaseVaultShares } from "./PurchaseVaultShares";

type Pool = "foundation" | "pathway" | "proPath";

interface Props {
  pool: Pool;
  minDeposit: number;
  poolLabel: string;
  poolDescription: string;
}

const POOL_COLORS: Record<Pool, string> = {
  foundation: "bg-orange-900/50 text-orange-300 ring-1 ring-orange-700/50",
  pathway: "bg-blue-900/50 text-blue-300 ring-1 ring-blue-700/50",
  proPath: "bg-purple-900/50 text-purple-300 ring-1 ring-purple-700/50",
};

export function PurchaseVaultCard({ pool, minDeposit, poolLabel, poolDescription }: Props) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Purchase Vault Shares</p>
        <span className={`rounded-full px-2 py-0.5 text-[10px] ${POOL_COLORS[pool]}`}>{poolLabel}</span>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-300">{poolDescription}</p>

      {/* The actual purchase component */}
      <PurchaseVaultShares pool={pool} minDeposit={minDeposit} />

      {/* How it works */}
      <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
        <p className="mb-1 text-[11px] font-semibold text-slate-300">How it works</p>
        <ol className="space-y-1 text-[11px] text-slate-400">
          <li>1. Connect wallet (MetaMask recommended)</li>
          <li>2. Get test CAD from faucet (demo only)</li>
          <li>3. Approve CAD spending</li>
          <li>4. Deposit to receive vault shares</li>
        </ol>
      </div>

      {/* Demo disclaimer */}
      <p className="text-[11px] text-slate-400">
        Demo environment using ERC‑4626 vaults. Production requires KYC/AML and formal offering documents in permitted
        jurisdictions.
      </p>
    </div>
  );
}
