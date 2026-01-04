"use client";

import React, { useState } from "react";
import Link from "next/link";

type Tab = "funds" | "staking";

type Fund = {
  name: string;
  slug: string;
  focus: string;
  risk: "Low" | "Medium" | "High";
  returnProfile: string;
  lockup: string;
  size: string;
  apy: string;
  athletes: number;
};

const funds: Fund[] = [
  {
    name: "Foundation Pool",
    slug: "foundation_pool",
    focus: "Local training, gyms, coaching, basic services.",
    risk: "Low",
    returnProfile: "Stable yield from discounts + low‑risk cash products.",
    lockup: "3–6 months",
    size: "C$2.3M",
    apy: "3.4%",
    athletes: 120,
  },
  {
    name: "Pathway Pool",
    slug: "pathway_pool",
    focus: "Cross‑border academies, visas, education, housing.",
    risk: "Medium",
    returnProfile: "Mixed yield from service savings + club revenue.",
    lockup: "12–24 months",
    size: "C$4.8M",
    apy: "6.1%",
    athletes: 65,
  },
  {
    name: "Pro Path Pool",
    slug: "pro_path",
    focus: "Club equity, revenue share, and transfer‑linked upside.",
    risk: "High",
    returnProfile: "Performance‑linked upside with longer horizons.",
    lockup: "24+ months",
    size: "C$3.1M",
    apy: "9.8%",
    athletes: 24,
  },
];

const stakeOptions = [
  {
    label: "Flexible",
    lock: "Unbond in 7 days",
    boost: "1.0x rewards",
  },
  {
    label: "6 Months",
    lock: "Fixed for 180 days",
    boost: "1.3x rewards",
  },
  {
    label: "12 Months",
    lock: "Fixed for 365 days",
    boost: "1.6x rewards",
  },
];

export default function DefiPage() {
  const [activeTab, setActiveTab] = useState<Tab>("funds");

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">DeFi Dashboard</h1>
          <p className="mt-2 text-lg text-indigo-600">Bank‑grade tokenization for real‑world athlete development.</p>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600">
            Secure, compliant DeFi rails that turn fan support and sponsorship capital into structured athlete
            development funds—built for banks, clubs, and regulators.
          </p>
        </header>

        {/* Top summary strip */}
        <section className="mb-10 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total Assets</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">C$10.2M</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Blended APY</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-600">6.0%</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Athletes Supported</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">209</p>
          </div>
          <div className="rounded-2xl bg-indigo-900 border border-indigo-900 p-4 shadow-sm text-indigo-50">
            <p className="text-xs uppercase tracking-wide opacity-80">Compliance</p>
            <p className="mt-2 text-sm">KYC / AML enabled • CAD stablecoin rails • Custodied by regulated partners.</p>
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
              Three tiers of CAD‑denominated development pools with different risk / return profiles.
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
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div className="hidden md:grid grid-cols-7 gap-4 border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-500">
                <span>Fund</span>
                <span>Focus</span>
                <span>Risk</span>
                <span>Current APY</span>
                <span>Lockup</span>
                <span>Size</span>
                <span>Athletes</span>
              </div>
              <div className="divide-y divide-slate-100">
                {funds.map(fund => (
                  <div key={fund.slug} className="grid grid-cols-1 md:grid-cols-7 gap-4 px-4 py-4 items-start">
                    <div className="md:col-span-1">
                      <p className="text-sm font-semibold text-slate-900">{fund.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{fund.returnProfile}</p>
                    </div>

                    <div className="md:col-span-1 text-xs text-slate-600">{fund.focus}</div>

                    <div className="md:col-span-1">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          fund.risk === "Low"
                            ? "bg-emerald-50 text-emerald-600"
                            : fund.risk === "Medium"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {fund.risk}
                      </span>
                    </div>

                    <div className="md:col-span-1 text-sm font-semibold text-emerald-600">{fund.apy}</div>

                    <div className="md:col-span-1 text-xs text-slate-600">{fund.lockup}</div>

                    <div className="md:col-span-1 text-sm text-slate-900">{fund.size}</div>

                    <div className="md:col-span-1 flex items-center justify-between md:justify-start gap-3">
                      <span className="text-sm text-slate-700">{fund.athletes}</span>

                      <Link
                        href={`/defi_features/${fund.slug}`}
                        className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
                      >
                        View / Subscribe
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
                    Exact rates are illustrative and will be determined by live pool activity.
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
          <h2 className="text-lg font-semibold text-slate-900 mb-1">Where Fund Yield Comes From</h2>
          <p className="text-sm text-slate-600 mb-4">
            Athlete funds earn return from real‑world activity, not pure token speculation.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="mt-1 text-xl">💪</div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Service Discounts</p>
                <p className="text-xs text-slate-600">
                  Aggregated discounts on gyms, housing, travel, and academy fees are captured as economic value and
                  shared with fund investors.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-1 text-xl">🎟️</div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Club &amp; Tourism Revenue</p>
                <p className="text-xs text-slate-600">
                  Shares of tickets, sponsorships, prize money, and CONCACAF‑linked tourism packages flow back into the
                  pools.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-1 text-xl">🏦</div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Treasury Yield</p>
                <p className="text-xs text-slate-600">
                  Unallocated cash is held in CAD‑denominated stablecoins and low‑risk bank products to earn a
                  conservative base yield.
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
                Athlete development funds are long‑horizon vehicles. Capital is not guaranteed and returns depend on
                service usage, club performance, and treasury yields. All investors must complete KYC / AML before
                subscribing.
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
