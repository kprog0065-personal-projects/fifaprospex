// app/defi_features/pathway/page.tsx
import Link from "next/link";
import { PurchaseVaultShares } from "~~/components/PurchaseVaultShares";

export default function PathwayPoolPage() {
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
              / <span className="text-slate-300">Pathway Pool</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Pathway Pool (U14)</h1>
                <p className="mt-1 max-w-xl text-xs text-slate-300">
                  Medium-risk pool funding top U14 academy players selected for Canada/CPL pathways. Supports
                  cross-border transition, education, diaspora housing, and cultural adjustment. Hybrid cash + bonus
                  token returns.
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-950/60 px-3 py-1 text-amber-300 ring-1 ring-amber-700/60">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="font-medium">Medium Risk</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  85% attrition rate. Balanced risk-return profile with mixed cash and token payouts.
                </p>
              </div>
            </div>
          </div>

          {/* Pool stats */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Pool snapshot</h2>
            <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Stat label="Target base APY (variable)" value="8%" caption="Stablecoin yield target; not guaranteed." />
              <Stat
                label="Quarterly liquidity"
                value="Up to 5%/qtr"
                caption="Repurchase offers after lockup; pro-rata if oversubscribed."
              />
              <Stat label="Lockup" value="5 years" caption="No repurchases during lockup." />
              <Stat label="Share pricing" value="NAV" caption="Share price floats at NAV (Net Asset Value)" />
            </div>

            <div className="mt-4 rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
              <p className="text-[11px] font-semibold text-slate-200">Two flows (kept separate)</p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">
                    Ongoing distributions
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-300">
                    From SPV net cashflow after a 12-month cost reserve is satisfied; DRIP by default with optional
                    stablecoin payout elections.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">Transfer events</p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-300">
                    Special distributions only when cash is actually received (installments treated as multiple events).
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
                description="After lockup, offer up to 5% of outstanding shares per tier each window; if requests exceed the limit, fills are pro-rata."
              />
            </div>

            <div className="mt-4 rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
              <p className="text-[11px] font-semibold text-slate-200">What &quot;pro-rata&quot; means</p>
              <p className="mt-1 text-[11px] leading-snug text-slate-400">
                If a tier offers 5% of shares this quarter but 12% of shares are tendered, each tender is partially
                filled so the total filled equals the offer size.
              </p>
            </div>
          </section>

          {/* Use of proceeds */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Use of proceeds</h2>
            <p className="mt-2 text-xs text-slate-300">
              Pathway Pool funds essential support for top U14 academy players transitioning to Canada/CPL academies.
              Capital covers cross-border logistics, education, and cultural integration.
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <UseItem
                title="Academy & education (35%)"
                items={[
                  "Partner academy tuition (Sigma FC, TFC Academy, Whitecaps)",
                  "School enrollment & education support in Canada",
                  "Training programs, coaching, and player development",
                ]}
              />
              <UseItem
                title="Diaspora housing & integration (30%)"
                items={[
                  "Billet family housing with Trinidad diaspora ($800/month)",
                  "Cultural adjustment support and mentorship",
                  "Language support and community connection programs",
                ]}
              />
              <UseItem
                title="Cross-border logistics (20%)"
                items={[
                  "Visa processing, study permits, and legal support",
                  "Flights and initial travel to Canada",
                  "Health insurance and medical screening",
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
          </section>

          {/* How Returns Work */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">How returns work</h2>
            <p className="mt-2 text-xs text-slate-300">
              Hybrid model provides balanced returns: immediate cash distributions plus bonus tokens for long-term
              upside.
            </p>
            <div className="mt-3 grid gap-4 md:grid-cols-3">
              <ReturnItem
                title="Hybrid returns"
                value="50% cash + 50% bonus"
                description="Player transfers generate 50% direct cash distributions and 50% bonus token issuance. Example: $300k transfer → $1,500 cash + 15,000 bonus tokens."
              />
              <ReturnItem
                title="Player milestones"
                value="Tiered unlocks"
                description="Distributions occur at key stages: U18 academy finals (30%), CPL signing (70%). Provides returns at multiple checkpoints."
              />
              <ReturnItem
                title="Exit strategy"
                value="4-6 years"
                description="Shorter timeline than Foundation Pool. Sell tokens on secondary market or hold for additional transfers as player progresses."
              />
            </div>
          </section>

          {/* Impact metrics */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Impact & reporting</h2>
            <p className="mt-2 text-xs text-slate-300">
              Your tokens represent ownership in the entire U14 academy cohort. When ANY player successfully transitions
              to CPL academies and signs professionally, ALL token holders share in returns proportionally.
            </p>

            <div className="mt-3 grid gap-4 md:grid-cols-3">
              <ImpactItem label="Players per cohort" value="24 U14 athletes" />
              <ImpactItem label="Expected CPL signings" value="3-4 players (12-15%)" />
              <ImpactItem label="Primary pathway" value="Trinidad → Canada CPL academies" />
            </div>
          </section>
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
        <p className="text-sm font-semibold text-amber-300 whitespace-nowrap">{value}</p>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-slate-300">{description}</p>
    </div>
  );
}

type UseItemProps = {
  title: string;
  items: string[];
};

function UseItem({ title, items }: UseItemProps) {
  return (
    <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">{title}</p>
      <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
        {items.map(item => (
          <li key={item} className="flex gap-2">
            <span className="mt-[5px] h-1 w-1 rounded-full bg-slate-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type ReturnItemProps = {
  title: string;
  value: string;
  description: string;
};

function ReturnItem({ title, value, description }: ReturnItemProps) {
  return (
    <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">{title}</p>
        <p className="text-sm font-semibold text-amber-300">{value}</p>
      </div>
      <p className="mt-2 text-[11px] text-slate-300 leading-snug">{description}</p>
    </div>
  );
}

type ImpactItemProps = {
  label: string;
  value: string;
};

function ImpactItem({ label, value }: ImpactItemProps) {
  return (
    <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-50">{value}</p>
    </div>
  );
}

function SubscribeCard() {
  return (
    <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Purchase Vault Shares</p>
        <span className="rounded-full bg-amber-900/50 px-2 py-0.5 text-[10px] text-amber-300 ring-1 ring-amber-700/50">
          Pathway Pool
        </span>
      </div>

      <p className="text-xs text-slate-300">
        Connect your wallet to deposit CAD and receive vault shares representing ownership in the Pathway Pool (U14).
      </p>

      <PurchaseVaultShares pool="pathway" minDeposit={1500} />

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
        <li>85% of U14 academy players do not reach professional level. Significant capital loss possible.</li>
        <li>4-6 year timeline before returns materialize. Limited early liquidity.</li>
        <li>Returns depend on player progression, CPL academy acceptance, and transfer market conditions.</li>
        <li>Cross-border logistics and regulatory changes may impact player transitions or distributions.</li>
      </ul>
    </section>
  );
}
