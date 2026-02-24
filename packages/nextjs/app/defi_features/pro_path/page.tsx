"use client";

import Link from "next/link";
import { InfoCardAccordion } from "~~/components/InfoCardAccordion";
import { PurchaseVaultShares } from "~~/components/PurchaseVaultShares";

export default function ProPathPoolPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/defi_features" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold">
              PX
            </span>
            <span>Prospex DeFi Dashboard</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/defi_features" className="text-slate-300 hover:text-white">
              All Pools
            </Link>
            <Link
              href="/book-demo"
              className="rounded-full border border-slate-700 px-3 py-1.5 font-medium text-slate-100 hover:border-indigo-400"
            >
              Book Bank Demo
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 lg:flex-row">
        {/* LEFT COLUMN */}
        <section className="flex-1 space-y-4">
          {/* Breadcrumb + title */}
          <div className="space-y-2">
            <div className="text-xs text-slate-400">
              <Link href="/defi_features" className="hover:text-slate-200">
                Tokenized Athlete Funds
              </Link>{" "}
              / <span className="text-slate-300">Pro Path Pool</span>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Pro Path Pool (U18–U21)</h1>
                <p className="mt-1 max-w-xl text-xs text-slate-300">
                  Late-stage cohort targeting near-term CPL/MLS signings. Income-weighted structure with scheduled
                  liquidity; transfer-event upside is smaller but paid with priority.
                </p>
              </div>
              <RiskBadge />
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <p className="text-[11px] font-semibold text-slate-200">Important</p>
              <p className="mt-1 text-[11px] leading-snug text-slate-400">
                Vault shares are priced at NAV (net asset value) and can change over time. Liquidity is provided via
                scheduled, limited repurchase offers after lockup; if a window is oversubscribed, fills are generally
                pro‑rata.
              </p>
            </div>
          </div>

          {/* Pool Stats - Always Visible */}
          <PoolStats />

          {/* Collapsible Sections */}
          <InfoCardAccordion title="Distributions & Liquidity" defaultOpen={false}>
            <div className="grid gap-4 md:grid-cols-3">
              <InfoCard
                title="Reserve policy (demo)"
                value="12 months"
                description="Maintain a stablecoin reserve equal to 12 months of fixed costs before paying ongoing distributions."
              />
              <InfoCard
                title="Ongoing payout policy (demo)"
                value="50 / 50"
                description="After reserve target is met: 50% distributed, 50% retained for reinvestment/working capital."
              />
              <InfoCard
                title="Repurchase offers"
                value="Quarterly"
                description="Offer up to 5% of outstanding shares per tier each window; if requests exceed the limit, fills are generally pro‑rata."
              />
            </div>
            <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
              <p className="text-[11px] font-semibold text-slate-200">Why repurchases are limited</p>
              <p className="mt-1 text-[11px] leading-snug text-slate-400">
                Interval-fund style repurchase offers are periodic and limited (often 5%–25% of shares) and may be
                pro‑rata when oversubscribed, which helps prevent a &quot;run on the fund.&quot;
              </p>
            </div>
          </InfoCardAccordion>

          <InfoCardAccordion title="Use of Proceeds" defaultOpen={false}>
            <p className="text-xs text-slate-300">
              Pro Path capital is deployed at the final stage of the athlete development pipeline — funding direct
              professional placement services, contract negotiation, and near-term signing support.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <UseItem
                title="Professional placement (40%)"
                items={[
                  "Agent fees & contract negotiation support",
                  "CPL/MLS combine preparation and showcase events",
                  "Video scouting packages and club presentations",
                ]}
              />
              <UseItem
                title="Elite training & conditioning (30%)"
                items={[
                  "Professional-grade strength & conditioning programs",
                  "Sport psychology and mental performance coaching",
                  "Injury prevention and physiotherapy support",
                ]}
              />
              <UseItem
                title="Transition & relocation (15%)"
                items={[
                  "Relocation support for signing city/country",
                  "Short-term housing during pre-season trials",
                  "Legal & visa support for cross-border signings",
                ]}
              />
              <UseItem
                title="Liquidity & platform (15%)"
                items={[
                  "Treasury bills & GIC deposits for distributions",
                  "Regulatory compliance (CSA/OSC filings, audits)",
                  "On-chain reporting & investor dashboards",
                ]}
              />
            </div>
          </InfoCardAccordion>

          <InfoCardAccordion title="How Returns Work" defaultOpen={false}>
            <p className="text-xs text-slate-300">
              Pro Path is the income-first tier. Ongoing stablecoin yield is higher than earlier pools, and transfer
              events pay Pro Path investors first via the waterfall before Foundation and Pathway tiers.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <InfoCard
                title="Ongoing yield (income)"
                value="10% target APY"
                description="Higher stablecoin yield target reflects the near-term revenue profile of late-stage athletes. Distributions DRIP into NAV by default; stablecoin payout available during windows."
              />
              <InfoCard
                title="Transfer events (priority)"
                value="Pro Path first"
                description="When a transfer occurs, Pro Path investors receive their 20% share before Foundation (50%) and Pathway (30%) tiers are paid. Installments treated as separate events."
              />
              <InfoCard
                title="Liquidity path"
                value="2yr lockup + quarterly"
                description="Shortest lockup of all three pools. After 2 years, quarterly repurchase offers up to 5% at NAV. Pro-rata if oversubscribed."
              />
            </div>
          </InfoCardAccordion>

          <InfoCardAccordion title="Impact & Reporting" defaultOpen={false}>
            <p className="text-xs text-slate-300">
              Pro Path investors receive the most granular reporting — individual player contract milestones, signing
              announcements (with consent), and real-time NAV updates. Cohort-level anonymized data available at all
              times.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <ImpactItem label="Cohort size" value="12 U18–U21 athletes" />
              <ImpactItem label="Expected professional signings" value="6-8 players (50-65%)" />
              <ImpactItem label="Target leagues" value="CPL, MLS Next Pro, Caribbean national teams" />
            </div>
          </InfoCardAccordion>
        </section>

        {/* RIGHT COLUMN */}
        <aside className="w-full space-y-4 lg:w-80">
          <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Purchase Vault Shares</p>
              <span className="rounded-full bg-emerald-900/50 px-2 py-0.5 text-[10px] text-emerald-300 ring-1 ring-emerald-700/50">
                Pro Path Pool
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Connect your wallet to deposit CAD and receive vault shares representing ownership in the Pro Path Pool
              (U18–U21).
            </p>
            <PurchaseVaultShares pool="proPath" minDeposit={2500} />
            <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
              <p className="mb-1 text-[11px] font-semibold text-slate-300">How it works</p>
              <ol className="space-y-1 text-[11px] text-slate-400">
                <li>1. Connect wallet (MetaMask recommended)</li>
                <li>2. Get test CAD from faucet (demo only)</li>
                <li>3. Approve CAD spending</li>
                <li>4. Deposit to receive vault shares</li>
              </ol>
            </div>
            <p className="text-[11px] text-slate-400">
              Demo environment using ERC-4626 vaults. Production requires KYC/AML and formal offering documents in
              permitted jurisdictions.
            </p>
          </section>
          <RiskDisclosure />
        </aside>
      </div>
    </main>
  );
}

/* ── Sub-components ──────────────────────────────────────────── */

function RiskBadge() {
  return (
    <div className="flex flex-col items-end gap-1 text-xs">
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950/60 px-3 py-1 text-emerald-300 ring-1 ring-emerald-700/60">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="font-medium">Low Risk</span>
      </div>
      <p className="text-[11px] text-slate-400">Higher hit-rate cohort; priority cash distributions.</p>
    </div>
  );
}

function PoolStats() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Pool Snapshot</h2>
      <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Target Base APY (variable)" value="10%" caption="Income-weighted; not guaranteed." />
        <Stat label="Quarterly Liquidity" value="Up to 5%/qtr" caption="After lockup; pro‑rata if oversubscribed." />
        <Stat label="Lockup" value="2 years" caption="No repurchases during lockup." />
        <Stat label="Share Pricing" value="NAV" caption="Vault share price floats; not a fixed token price." />
      </div>
      <div className="mt-4 rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
        <p className="text-[11px] font-semibold text-slate-200">Two flows (kept separate)</p>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">Ongoing distributions</p>
            <p className="mt-1 text-[11px] leading-snug text-slate-300">
              Funded from SPV net cashflow after a reserve target is satisfied; DRIP by default with optional stablecoin
              payout elections during windows.
            </p>
          </div>
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">Transfer events</p>
            <p className="mt-1 text-[11px] leading-snug text-slate-300">
              Special distributions only when cash is actually received (installments treated as multiple events); Pro
              Path is paid ahead of earlier tiers by waterfall.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type StatProps = { label: string; value: string; caption?: string };
function Stat({ label, value, caption }: StatProps) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="text-lg font-semibold text-slate-50">{value}</p>
      {caption && <p className="text-[11px] leading-snug text-slate-400">{caption}</p>}
    </div>
  );
}

type InfoCardProps = { title: string; value: string; description: string };
function InfoCard({ title, value, description }: InfoCardProps) {
  return (
    <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">{title}</p>
        <p className="whitespace-nowrap text-sm font-semibold text-emerald-300">{value}</p>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-slate-300">{description}</p>
    </div>
  );
}

type UseItemProps = { title: string; items: string[] };
function UseItem({ title, items }: UseItemProps) {
  return (
    <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">{title}</p>
      <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
        {items.map(item => (
          <li key={item} className="flex gap-2">
            <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-slate-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type ImpactItemProps = { label: string; value: string };
function ImpactItem({ label, value }: ImpactItemProps) {
  return (
    <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-50">{value}</p>
    </div>
  );
}

function RiskDisclosure() {
  return (
    <section className="rounded-xl border border-slate-900 bg-slate-950/80 p-3">
      <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">Key Risks</h2>
      <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
        <li>Still risky; professional outcomes are uncertain even for late-stage cohorts.</li>
        <li>Repurchases are limited; not a promise of full exit on demand.</li>
        <li>&quot;APY&quot; targets are variable and not guaranteed; NAV may decline.</li>
        <li>Returns depend on player signings, contract structures, and market conditions.</li>
      </ul>
    </section>
  );
}
