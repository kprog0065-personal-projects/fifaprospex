// app/defi_features/pro_path/page.tsx
import Link from "next/link";
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
        <section className="flex-1 space-y-6">
          {/* Breadcrumb + title */}
          <div className="space-y-2">
            <div className="text-xs text-slate-400">
              <Link href="/defi_features" className="hover:text-slate-200">
                Tokenized Athlete Funds
              </Link>{" "}
              / <span className="text-slate-300">Pro Path Pool</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Pro Path Pool (U18–U21)</h1>
                <p className="mt-1 max-w-xl text-xs text-slate-300">
                  Late-stage cohort targeting near-term CPL/MLS signings. Income-weighted structure with scheduled
                  liquidity; transfer-event upside is smaller but paid with priority.
                </p>
              </div>

              <div className="flex flex-col items-end gap-1 text-xs">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950/60 px-3 py-1 text-emerald-300 ring-1 ring-emerald-700/60">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="font-medium">Low Risk</span>
                </div>
                <p className="text-[11px] text-slate-400">Higher hit-rate cohort; priority cash distributions.</p>
              </div>
            </div>
          </div>

          {/* Important */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Important</h2>
            <p className="mt-2 text-xs text-slate-300">
              Vault shares are priced at NAV (net asset value) and can change over time. Liquidity is provided via
              scheduled, limited repurchase offers after lockup; if a window is oversubscribed, fills are generally
              pro‑rata.
            </p>
          </section>

          {/* Pool snapshot */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Pool snapshot</h2>
            <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Stat label="Target base APY (variable)" value="10%" caption="Income-weighted; not guaranteed." />
              <Stat
                label="Quarterly liquidity"
                value="Up to 5%/qtr"
                caption="After lockup; pro‑rata if oversubscribed."
              />
              <Stat label="Lockup" value="2 years" caption="No repurchases during lockup." />
              <Stat label="Share pricing" value="NAV" caption="Vault share price floats; not a fixed token price." />
            </div>

            <div className="mt-4 rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
              <p className="text-[11px] font-semibold text-slate-200">Two flows (kept separate)</p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">
                    Ongoing distributions
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-300">
                    Funded from SPV net cashflow after a reserve target is satisfied; DRIP by default with optional
                    stablecoin payout elections during windows.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">Transfer events</p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-300">
                    Special distributions only when cash is actually received (installments treated as multiple events);
                    Pro Path is paid ahead of earlier tiers by waterfall.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Distributions & Liquidity */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Distributions & liquidity</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-3">
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

            <div className="mt-4 rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
              <p className="text-[11px] font-semibold text-slate-200">Why repurchases are limited</p>
              <p className="mt-1 text-[11px] text-slate-400 leading-snug">
                Interval-fund style repurchase offers are periodic and limited (often 5%–25% of shares) and may be
                pro‑rata when oversubscribed, which helps prevent a &quot;run on the fund.&quot;
              </p>
            </div>
          </section>

          {/* Use of proceeds - Add remaining sections here */}
          {/* You can copy the rest from your original file */}
        </section>

        {/* RIGHT COLUMN */}
        <aside className="w-full max-w-md space-y-4 lg:w-80">
          <SubscribeCard />
          <RiskDisclosure />
        </aside>
      </div>
    </main>
  );
}

/* ------- Components ------- */

type StatProps = {
  label: string;
  value: string;
  caption?: string;
};

function Stat({ label, value, caption }: StatProps) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="text-lg font-semibold text-slate-50">{value}</p>
      {caption && <p className="text-[11px] text-slate-400 leading-snug">{caption}</p>}
    </div>
  );
}

type InfoCardProps = {
  title: string;
  value: string;
  description: string;
};

function InfoCard({ title, value, description }: InfoCardProps) {
  return (
    <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">{title}</p>
        <p className="text-sm font-semibold text-emerald-300 whitespace-nowrap">{value}</p>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-slate-300">{description}</p>
    </div>
  );
}

function SubscribeCard() {
  return (
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

      <div className="rounded-lg bg-slate-950/80 border border-slate-800 p-3">
        <p className="text-[11px] font-semibold text-slate-300 mb-1">How it works</p>
        <ol className="space-y-1 text-[11px] text-slate-400">
          <li>1. Connect wallet (MetaMask recommended)</li>
          <li>2. Get test CAD from faucet (demo only)</li>
          <li>3. Approve CAD spending</li>
          <li>4. Deposit to receive vault shares</li>
        </ol>
      </div>

      <p className="text-[11px] text-slate-400">
        **Demo environment using ERC-4626 vaults.** Production requires KYC/AML and formal offering documents in
        permitted jurisdictions.
      </p>
    </section>
  );
}

function RiskDisclosure() {
  return (
    <section className="rounded-xl border border-slate-900 bg-slate-950/80 p-3">
      <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">Key risks</h2>
      <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
        <li>Still risky; professional outcomes are uncertain even for late-stage cohorts.</li>
        <li>Repurchases are limited; not a promise of full exit on demand.</li>
        <li>&quot;APY&quot; targets are variable and not guaranteed; NAV may decline.</li>
        <li>Returns depend on player signings, contract structures, and market conditions.</li>
      </ul>
    </section>
  );
}
