"use client";

import React, { useMemo } from "react";
import Link from "next/link";

type Fund = {
  name: string;
  slug: string;
  focus: string;
  risk: "Foundation" | "Academy" | "Pro";
  riskLabel: string;
  returnProfile: string;
  lockup: string;
  targetBaseApy: string;
  liquidity: string;
  hardCap: string;
  minWallet: string;
  maxWallet: string;
  athletes: number;
};

const funds: Fund[] = [
  {
    name: "Foundation Pool",
    slug: "foundation_pool",
    focus: "Early-stage cohort (U6–U11).",
    risk: "Foundation",
    riskLabel: "High Risk",
    returnProfile: "Base yield + uncapped long-tail transfer upside (VC-style waterfall).",
    lockup: "6 years",
    targetBaseApy: "8–12% (variable)",
    liquidity: "Quarterly repurchase up to 5% NAV after lockup (pro‑rata).",
    hardCap: "C$1.5M",
    minWallet: "C$500",
    maxWallet: "C$10,000",
    athletes: 40,
  },
  {
    name: "Pathway Pool",
    slug: "pathway_pool",
    focus: "Academy pathway cohort (U12–U17).",
    risk: "Academy",
    riskLabel: "Medium Risk",
    returnProfile: "Hybrid cash + bonus token returns; moderate transfer upside.",
    lockup: "4 years",
    targetBaseApy: "6–9% (variable)",
    liquidity: "Quarterly repurchase up to 10% NAV after lockup (pro‑rata).",
    hardCap: "C$4M",
    minWallet: "C$1,500",
    maxWallet: "C$25,000",
    athletes: 24,
  },
  {
    name: "Pro Path Pool",
    slug: "pro_path",
    focus: "Late-stage cohort (U18–U23).",
    risk: "Pro",
    riskLabel: "Low Risk",
    returnProfile: "Income-first; priority waterfall payout; capped transfer upside.",
    lockup: "2 years",
    targetBaseApy: "4–6% (variable)",
    liquidity: "Quarterly repurchase up to 15% NAV after lockup (pro‑rata).",
    hardCap: "C$6M",
    minWallet: "C$5,000",
    maxWallet: "C$100,000",
    athletes: 12,
  },
];

export default function DefiPage() {
  const totals = useMemo(() => {
    const totalAthletes = funds.reduce((acc, f) => acc + f.athletes, 0);
    return { totalAthletes };
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">DeFi Dashboard</h1>
          <p className="mt-2 text-lg text-indigo-600">Tokenized vault shares with scheduled liquidity.</p>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            Investors hold NAV-priced vault shares. Liquidity is provided via periodic repurchase offers after lockup;
            repurchases are limited per window and may be filled pro‑rata when oversubscribed.
          </p>
        </header>

        {/* Top summary strip */}
        <section className="mb-10 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total Assets</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">C$11.5M</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Foundation Pool</span>
                <span className="font-medium text-slate-700">C$1.5M</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Pathway Pool</span>
                <span className="font-medium text-slate-700">C$4M</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Pro Path Pool</span>
                <span className="font-medium text-slate-700">C$6M</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Active Pools</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">3 / Year</p>
            <p className="mt-1 text-[11px] text-slate-500">
              Foundation · Academy · Pro Path — new cohort opens annually.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Athletes Supported</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{totals.totalAthletes}</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Foundation (U6–U11)</span>
                <span className="font-medium text-slate-700">40 athletes</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Academy (U12–U17)</span>
                <span className="font-medium text-slate-700">24 athletes</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Pro Path (U18–U23)</span>
                <span className="font-medium text-slate-700">12 athletes</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-900 bg-indigo-900 p-4 shadow-sm text-indigo-50">
            <p className="text-xs uppercase tracking-wide opacity-80">Liquidity</p>
            <p className="mt-2 text-sm font-semibold">Quarterly Repurchase</p>
            <div className="mt-2 space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="opacity-70">Foundation</span>
                <span className="font-medium">5% / qtr</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="opacity-70">Academy</span>
                <span className="font-medium">10% / qtr</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="opacity-70">Pro Path</span>
                <span className="font-medium">15% / qtr</span>
              </div>
            </div>
            <p className="mt-2 text-[11px] opacity-70">Pro‑rata if oversubscribed.</p>
          </div>
        </section>

        {/* Tokenized Athlete Funds */}
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Tokenized Athlete Funds</h2>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              3 Active Pools
            </span>
          </div>

          <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">How to read this table</p>
            <ul className="mt-2 space-y-1 text-[12px] text-slate-600">
              <li>&quot;Target base APY&quot; is variable and not guaranteed.</li>
              <li>
                Liquidity is via scheduled quarterly repurchase offers after lockup; each pool has a different max
                repurchase rate — fills may be pro‑rata.
              </li>
              <li>Transfer upside is separate from base yield and paid only when club proceeds are received.</li>
            </ul>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
            {/* Desktop Table Header */}
            <div className="hidden grid-cols-10 gap-3 border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-semibold text-slate-500 md:grid">
              <span className="col-span-1">Fund</span>
              <span className="col-span-1">Risk Tier</span>
              <span className="col-span-2">Focus</span>
              <span className="col-span-1">Target APY</span>
              <span className="col-span-1">Lockup</span>
              <span className="col-span-1">Hard Cap</span>
              <span className="col-span-1">Min / Max</span>
              <span className="col-span-1">Liquidity</span>
              <span className="col-span-1 text-right">Action</span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-100">
              {funds.map(fund => (
                <div key={fund.slug} className="grid grid-cols-1 items-center gap-3 px-6 py-4 md:grid-cols-10">
                  <div className="col-span-1">
                    <p className="text-sm font-semibold text-slate-900">{fund.name}</p>
                    <p className="mt-0.5 text-xs text-slate-500 md:hidden">{fund.returnProfile}</p>
                  </div>

                  <div className="col-span-1">
                    <TierPill tier={fund.risk} label={fund.riskLabel} />
                  </div>

                  <div className="col-span-2">
                    <span className="text-xs text-slate-600">{fund.focus}</span>
                    <p className="mt-1 hidden text-[11px] text-slate-500 md:block">{fund.returnProfile}</p>
                  </div>

                  <div className="col-span-1">
                    <span className="text-sm font-semibold text-slate-900">{fund.targetBaseApy}</span>
                    <p className="mt-0.5 text-[11px] text-slate-500">Not guaranteed.</p>
                  </div>

                  <div className="col-span-1">
                    <span className="text-xs text-slate-600">{fund.lockup}</span>
                  </div>

                  <div className="col-span-1">
                    <span className="text-xs font-medium text-slate-700">{fund.hardCap}</span>
                  </div>

                  <div className="col-span-1">
                    <p className="text-[11px] text-slate-600">Min: {fund.minWallet}</p>
                    <p className="text-[11px] text-slate-600">Max: {fund.maxWallet}</p>
                  </div>

                  <div className="col-span-1">
                    <span className="text-xs text-slate-600">{fund.liquidity}</span>
                  </div>

                  <div className="col-span-1 flex justify-start md:justify-end">
                    <Link
                      href={`/defi_features/${fund.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-500"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Active Positions */}
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Active Positions</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
              Connect wallet to view
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-3">
              {funds.map(fund => (
                <div key={fund.slug} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-700">{fund.name}</p>
                    <TierPill tier={fund.risk} label={fund.riskLabel} />
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Your shares</span>
                      <span className="font-semibold text-slate-900">—</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">NAV value</span>
                      <span className="font-semibold text-slate-900">—</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Pending distributions</span>
                      <span className="font-semibold text-slate-900">—</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Target APY</span>
                      <span className="font-semibold text-indigo-600">{fund.targetBaseApy}</span>
                    </div>
                  </div>
                  <Link
                    href={`/defi_features/${fund.slug}`}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-indigo-200 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
                  >
                    Manage Position
                  </Link>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-[11px] text-slate-400">
              Connect your wallet to see your vault share balances, NAV values, and pending distributions.
            </p>
          </div>
        </section>

        {/* Yield sources explainer */}
        <section className="mb-12 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-semibold text-slate-900">Where Yield Comes From</h2>
          <p className="mb-4 text-sm text-slate-600">
            Ongoing yield targets are modeled from stablecoin strategies and SPV cashflow policy; club proceeds are
            separate &quot;special distributions.&quot;
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
                  Ongoing distributions are paid only after a 12‑month reserve target is met, then split between
                  distribute and retain to keep the vault operationally stable.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-1 text-xl">⚡</div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Club proceeds</p>
                <p className="text-xs text-slate-600">
                  Special distributions paid when club proceeds are received, via a tiered waterfall: Pro Path first,
                  then Academy, then Foundation. Installments treated as separate events.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Risk & compliance */}
        <section className="mb-12 rounded-2xl bg-slate-900 p-6 text-slate-50">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-1 text-lg font-semibold">Risk &amp; Policy</h2>
              <p className="max-w-2xl text-xs opacity-80">
                These are long-horizon vehicles. Capital is not guaranteed, NAV may decline, and liquidity is limited to
                scheduled repurchase offers that can be pro‑rata when oversubscribed.
              </p>
            </div>
            <div className="flex gap-3 text-xs">
              <button className="rounded-full border border-slate-500 px-4 py-2 transition hover:bg-slate-800">
                View Legal Structure
              </button>
              <button className="rounded-full border border-slate-500 px-4 py-2 transition hover:bg-slate-800">
                Download Reporting Sample
              </button>
            </div>
          </div>
        </section>

        {/* CTA row */}
        <section className="mb-8 flex flex-col items-center justify-center gap-4 md:flex-row">
          <button className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            Launch DeFi Dashboard
          </button>
          <button className="inline-flex items-center justify-center rounded-full border border-indigo-600 px-8 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50">
            Book a Bank Demo
          </button>
        </section>
      </div>
    </main>
  );
}

function TierPill({ tier, label }: { tier: Fund["risk"]; label: string }) {
  const styles = {
    Foundation: {
      wrapper: "bg-orange-50 ring-1 ring-orange-300",
      dot: "bg-orange-400",
      text: "text-orange-700",
    },
    Academy: {
      wrapper: "bg-amber-50 ring-1 ring-amber-300",
      dot: "bg-amber-400",
      text: "text-amber-700",
    },
    Pro: {
      wrapper: "bg-emerald-50 ring-1 ring-emerald-300",
      dot: "bg-emerald-500",
      text: "text-emerald-700",
    },
  };

  const s = styles[tier];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.wrapper} ${s.text}`}
    >
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {label}
    </span>
  );
}
