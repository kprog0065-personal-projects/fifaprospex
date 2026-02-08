"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type Tab = "funds" | "staking";

type Fund = {
  name: string;
  slug: string;
  focus: string;
  risk: "Foundation" | "Academy" | "Pro";
  returnProfile: string;
  lockup: string;
  targetBaseApy: string;
  liquidity: string;
  size: string;
  athletes: number;
};

const funds: Fund[] = [
  {
    name: "Foundation Pool",
    slug: "foundation_pool",
    focus: "Early-stage cohort funding (U12).",
    risk: "Foundation",
    returnProfile: "Base yield + long-tail transfer-event upside (separate waterfall).",
    lockup: "8 years",
    targetBaseApy: "6% (variable)",
    liquidity: "Quarterly repurchase offers up to 5% after lockup (pro‑rata).",
    size: "C$2.3M",
    athletes: 40,
  },
  {
    name: "Pathway Pool",
    slug: "pathway_pool",
    focus: "Academy pathway cohort support (U14).",
    risk: "Academy",
    returnProfile: "Income-weighted + transfer-event upside (separate waterfall).",
    lockup: "5 years",
    targetBaseApy: "8% (variable)",
    liquidity: "Quarterly repurchase offers up to 5% after lockup (pro‑rata).",
    size: "C$4.8M",
    athletes: 24,
  },
  {
    name: "Pro Pool",
    slug: "pro_path",
    focus: "Late-stage cohort (U18–U21) with income focus.",
    risk: "Pro",
    returnProfile: "Highest base yield target + scheduled liquidity; smaller transfer-event bucket.",
    lockup: "2 years",
    targetBaseApy: "10% (variable)",
    liquidity: "Quarterly repurchase offers up to 5% after lockup (pro‑rata).",
    size: "C$3.1M",
    athletes: 18,
  },
];

const stakeOptions = [
  { label: "Flexible", lock: "Unbond in 7 days", boost: "1.0x rewards" },
  { label: "6 Months", lock: "Fixed for 180 days", boost: "1.3x rewards" },
  { label: "12 Months", lock: "Fixed for 365 days", boost: "1.6x rewards" },
];

export default function DefiPage() {
  const [activeTab, setActiveTab] = useState<Tab>("funds");

  const totals = useMemo(() => {
    const totalAthletes = funds.reduce((acc, f) => acc + f.athletes, 0);
    return { totalAthletes };
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">DeFi Dashboard</h1>
          <p className="mt-2 text-lg text-indigo-600">Tokenized vault shares with scheduled liquidity.</p>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600">
            Investors hold NAV-priced vault shares. Liquidity is provided via periodic repurchase offers after lockup;
            repurchases are limited per window and may be filled pro‑rata when oversubscribed. [web:18]
          </p>
        </header>

        {/* Top summary strip */}
        <section className="mb-10 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total Assets</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">C$10.2M</p>
            <p className="mt-1 text-[11px] text-slate-500">Demo number.</p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Distribution Policy</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">50 / 50</p>
            <p className="mt-1 text-[11px] text-slate-500">After 12‑month reserve target is met.</p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Athletes Supported</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{totals.totalAthletes}</p>
            <p className="mt-1 text-[11px] text-slate-500">Cohort sizes (demo).</p>
          </div>

          <div className="rounded-2xl bg-indigo-900 border border-indigo-900 p-4 shadow-sm text-indigo-50">
            <p className="text-xs uppercase tracking-wide opacity-80">Liquidity</p>
            <p className="mt-2 text-sm">
              Quarterly repurchase offers • Up to 5% per tier • Pro‑rata if oversubscribed.
            </p>
            <p className="mt-1 text-[11px] opacity-80">Modeled on interval-fund style offers. [web:18]</p>
          </div>
        </section>

        {/* TAB TILES */}
        <section className="mb-6 grid gap-4 md:grid-cols-2">
          <button
            onClick={() => setActiveTab("funds")}
            className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
              activeTab === "funds"
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide">Tokenized Athlete Funds</p>
            <p className="mt-1 text-xs text-slate-600">
              Three tiers with different lockups, yield targets, and special-event exposure.
            </p>
          </button>

          <button
            onClick={() => setActiveTab("staking")}
            className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
              activeTab === "staking"
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide">Stake Club &amp; Nation Tokens</p>
            <p className="mt-1 text-xs text-slate-600">
              Stake PROSPEX / club tokens to earn platform rewards and perks.
            </p>
          </button>
        </section>

        {/* TAB CONTENT: FUNDS */}
        {activeTab === "funds" && (
          <section className="mb-10">
            <h2 className="sr-only">Tokenized Athlete Funds</h2>

            <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">How to read this table</p>
              <ul className="mt-2 space-y-1 text-[12px] text-slate-600">
                <li>“Target base APY” is variable and not guaranteed.</li>
                <li>“Liquidity” is via scheduled repurchase offers after lockup; fills may be pro‑rata. [web:18]</li>
                <li>Transfer events are paid only when cash is received (installments treated as separate events).</li>
              </ul>
            </div>

            <div className="overflow-x-auto rounded-2xl bg-white border border-slate-100 shadow-sm">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-9 gap-3 border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-semibold text-slate-500">
                <span className="col-span-1">Fund</span>
                <span className="col-span-1">Tier</span>
                <span className="col-span-2">Focus</span>
                <span className="col-span-1">Target base APY</span>
                <span className="col-span-1">Lockup</span>
                <span className="col-span-2">Liquidity</span>
                <span className="col-span-1 text-right">Action</span>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-slate-100">
                {funds.map(fund => (
                  <div key={fund.slug} className="grid grid-cols-1 md:grid-cols-9 gap-3 px-6 py-4 items-center">
                    {/* Fund Name */}
                    <div className="col-span-1">
                      <p className="text-sm font-semibold text-slate-900">{fund.name}</p>
                      <p className="mt-0.5 text-xs text-slate-500 md:hidden">{fund.returnProfile}</p>
                    </div>

                    {/* Tier */}
                    <div className="col-span-1">
                      <TierPill tier={fund.risk} />
                    </div>

                    {/* Focus */}
                    <div className="col-span-2">
                      <span className="md:hidden text-xs font-semibold text-slate-600">Focus: </span>
                      <span className="text-xs text-slate-600">{fund.focus}</span>
                      <p className="mt-1 text-[11px] text-slate-500 hidden md:block">{fund.returnProfile}</p>
                    </div>

                    {/* Target Base APY */}
                    <div className="col-span-1">
                      <span className="text-sm font-semibold text-slate-900">{fund.targetBaseApy}</span>
                      <p className="mt-0.5 text-[11px] text-slate-500">Not guaranteed.</p>
                    </div>

                    {/* Lockup */}
                    <div className="col-span-1">
                      <span className="text-xs text-slate-600">{fund.lockup}</span>
                    </div>

                    {/* Liquidity */}
                    <div className="col-span-2">
                      <span className="text-xs text-slate-600">{fund.liquidity}</span>
                    </div>

                    {/* Action Button */}
                    <div className="col-span-1 flex justify-start md:justify-end">
                      <Link
                        href={`/defi_features/${fund.slug}`}
                        className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB CONTENT: STAKING */}
        {activeTab === "staking" && (
          <section className="mb-10">
            <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-1">Stake Club &amp; Nation Tokens</h2>
              <p className="text-sm text-slate-600 mb-4">
                Stake PROSPEX or club tokens (e.g., Trinidad FC, Canada FC) to support long‑term development programs
                and earn platform rewards.
              </p>

              <div className="mb-4">
                <label htmlFor="stakeAmount" className="block text-xs font-medium text-slate-600 mb-1">
                  Amount to stake
                </label>
                <div className="flex rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900">
                  <input
                    id="stakeAmount"
                    type="number"
                    placeholder="0.0"
                    className="flex-1 bg-transparent outline-none"
                  />
                  <button className="ml-2 text-xs font-semibold text-indigo-600">MAX</button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-slate-600 mb-2">Choose lock period</p>
                <div className="grid gap-2 md:grid-cols-3">
                  {stakeOptions.map(opt => (
                    <button
                      key={opt.label}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs hover:border-indigo-500 hover:bg-white transition"
                    >
                      <p className="font-semibold text-slate-900">{opt.label}</p>
                      <p className="text-[11px] text-slate-500">{opt.lock}</p>
                      <p className="mt-1 text-[11px] text-indigo-600">{opt.boost}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4 grid gap-3 md:grid-cols-2 text-xs text-slate-600">
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Reward sources</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Share of platform transaction fees.</li>
                    <li>Non‑cash perks: trials priority, ticket access, merch discounts.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Estimated rewards</p>
                  <p>APR: 4.5–10.0% depending on lock period.</p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Exact rates are illustrative and set by live activity.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="inline-flex flex-1 items-center justify-center rounded-full bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 transition">
                  Stake Tokens
                </button>
                <button className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                  Unstake
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Yield sources explainer - always visible */}
        <section className="mb-12 rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">Where Yield Comes From</h2>
          <p className="text-sm text-slate-600 mb-4">
            Ongoing yield targets are modeled from stablecoin strategies and SPV cashflow policy; transfer events are
            separate “special distributions.”
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="mt-1 text-xl">🏦</div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Stablecoin strategies</p>
                <p className="text-xs text-slate-600">
                  Base yield targets are variable and depend on market conditions and strategy selection.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-1 text-xl">📦</div>
              <div>
                <p className="text-sm font-semibold text-slate-900">SPV cashflow policy</p>
                <p className="text-xs text-slate-600">
                  Ongoing distributions are paid only after a 12‑month reserve target is met, and then split between
                  distribute/retain.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-1 text-xl">⚡</div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Transfer events</p>
                <p className="text-xs text-slate-600">
                  Special distributions are paid when cash is received (including installments), using a separate tier
                  waterfall.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Risk & compliance */}
        <section className="mb-12 rounded-2xl bg-slate-900 text-slate-50 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Risk &amp; Policy</h2>
              <p className="text-xs opacity-80 max-w-2xl">
                These are long-horizon vehicles. Capital is not guaranteed, NAV may decline, and liquidity is limited to
                scheduled repurchase offers that can be pro‑rata when oversubscribed. [web:18]
              </p>
            </div>
            <div className="flex gap-3 text-xs">
              <button className="rounded-full border border-slate-500 px-4 py-2 hover:bg-slate-800 transition">
                View Legal Structure
              </button>
              <button className="rounded-full border border-slate-500 px-4 py-2 hover:bg-slate-800 transition">
                Download Reporting Sample
              </button>
            </div>
          </div>
        </section>

        {/* CTA row */}
        <section className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
            Launch DeFi Dashboard
          </button>
          <button className="inline-flex items-center justify-center rounded-full border border-indigo-600 px-8 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition">
            Book a Bank Demo
          </button>
        </section>
      </div>
    </main>
  );
}

function TierPill({ tier }: { tier: Fund["risk"] }) {
  const cls =
    tier === "Foundation"
      ? "bg-slate-100 text-slate-700"
      : tier === "Academy"
        ? "bg-amber-50 text-amber-700"
        : "bg-indigo-50 text-indigo-700";

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>{tier}</span>;
}
