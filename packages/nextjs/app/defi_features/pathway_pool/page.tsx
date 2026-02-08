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

            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Pathway Pool (U14)</h1>
                <p className="mt-1 max-w-xl text-xs text-slate-300">
                  Medium-risk pool supporting selected U14 academy players on Canada/CPL pathways. Ongoing yield comes
                  from stablecoin strategies; additional upside (if it happens) comes from transfer-event cashflows
                  distributed via a separate waterfall.
                </p>
              </div>

              <MediumRiskBadge />
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <p className="text-[11px] font-semibold text-slate-200">Important</p>
              <p className="mt-1 text-[11px] leading-snug text-slate-400">
                Vault shares are priced at NAV (net asset value) and can change over time. Liquidity is provided via
                scheduled, limited repurchase offers after lockup; if a repurchase window is oversubscribed, fills are
                generally pro‑rata. [web:18]
              </p>
            </div>
          </div>

          {/* Pool stats */}
          <PoolSnapshot />

          {/* Distributions & Liquidity */}
          <DistributionsAndLiquidity />

          {/* Use of proceeds */}
          <UseOfProceeds />

          {/* How Returns Work */}
          <HowReturnsWork />

          {/* Impact metrics */}
          <ImpactMetrics />
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

function MediumRiskBadge() {
  return (
    <div className="flex flex-col items-end gap-1 text-xs">
      <div className="inline-flex items-center gap-2 rounded-full bg-amber-950/60 px-3 py-1 text-amber-300 ring-1 ring-amber-700/60">
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="font-medium">Medium Risk</span>
      </div>
      <p className="text-[11px] text-slate-400">Balanced risk-return profile with scheduled liquidity.</p>
    </div>
  );
}

function PoolSnapshot() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Pool snapshot</h2>

      <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Target base APY (variable)" value="8%" caption="Stablecoin yield target; not guaranteed." />
        <Stat
          label="Quarterly liquidity"
          value="Up to 5%/qtr"
          caption="Repurchase offers after lockup; pro‑rata if oversubscribed."
        />
        <Stat label="Lockup" value="5 years" caption="No repurchases during lockup." />
        <Stat label="Share pricing" value="NAV" caption="Vault share price floats; not fixed token price." />
      </div>

      <div className="mt-4 rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
        <p className="text-[11px] font-semibold text-slate-200">Two flows (kept separate)</p>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">Ongoing distributions</p>
            <p className="mt-1 text-[11px] leading-snug text-slate-300">
              From SPV net cashflow after a 12‑month cost reserve is satisfied; DRIP by default with optional stablecoin
              payout elections.
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
  );
}

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

function DistributionsAndLiquidity() {
  return (
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
        <p className="mt-1 text-[11px] leading-snug text-slate-400">
          Interval-fund style repurchase offers are periodic and limited (often 5%–25% of shares) and may be pro‑rata
          when oversubscribed, which helps prevent a “run on the fund.” [web:18]
        </p>
      </div>
    </section>
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
        <p className="text-sm font-semibold text-amber-200">{value}</p>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-slate-300">{description}</p>
    </div>
  );
}

function UseOfProceeds() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Use of proceeds</h2>
      <p className="mt-2 text-xs text-slate-300">
        Pathway Pool funds essential support for top U14 academy players transitioning to Canada/CPL academies. Capital
        covers cross-border logistics, education, housing integration supports, and player development services.
      </p>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <UseItem
          title="Academy & education (35%)"
          items={[
            "Partner academy tuition and training support (example partners; not guaranteed)",
            "School enrollment & education support in Canada",
            "Coaching, analysis, and player development services",
          ]}
        />
        <UseItem
          title="Diaspora housing & integration (30%)"
          items={[
            "Billet family housing and settlement supports (structure varies by location)",
            "Cultural adjustment mentorship",
            "Community connection programs",
          ]}
        />
        <UseItem
          title="Cross-border logistics (20%)"
          items={["Visa/study permit support", "Flights and initial travel", "Health insurance and medical screening"]}
        />
        <UseItem
          title="Liquidity & platform (15%)"
          items={[
            "Stablecoin reserve buffer for ops + repurchase windows",
            "Reporting & investor dashboards",
            "Compliance workstreams (as applicable per jurisdiction)",
          ]}
        />
      </div>
    </section>
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

function HowReturnsWork() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">How returns work</h2>
      <p className="mt-2 text-xs text-slate-300">
        Ongoing distributions and transfer events are separate flows. Repurchase windows are the primary liquidity
        mechanism after lockup.
      </p>

      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <ReturnItem
          title="Ongoing yield (income)"
          value="DRIP default"
          description="Ongoing distributions are funded from SPV net cashflow after reserves. By default, distributions compound into NAV; investors can elect stablecoin payout during windows."
        />
        <ReturnItem
          title="Transfer events (upside)"
          value="50/30/20"
          description="Special distributions use the tier waterfall: Pathway participates in the Academy bucket (30% of transfer-event distributions), paid only when cash is received."
        />
        <ReturnItem
          title="Liquidity path"
          value="Repurchase offers"
          description="After lockup: quarterly repurchase offers up to 5% per tier at NAV; if oversubscribed, fills are generally pro‑rata."
        />
      </div>
    </section>
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

function ImpactMetrics() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Impact & reporting</h2>
      <p className="mt-2 text-xs text-slate-300">
        Vault shares represent pro‑rata exposure to the Pathway cohort. Reporting focuses on funded services, player
        progress checkpoints, and aggregated cohort outcomes.
      </p>

      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <ImpactItem label="Players per cohort" value="24 U14 athletes" />
        <ImpactItem label="Pathway target" value="Canada/CPL academy placement" />
        <ImpactItem label="Regions in scope" value="Caribbean, Central America, Canadian diaspora" />
      </div>
    </section>
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

      {/* Keep tile unchanged */}
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
        Demo environment using ERC‑4626 vaults. Production requires KYC/AML and formal offering documents in permitted
        jurisdictions.
      </p>
    </section>
  );
}

function RiskDisclosure() {
  return (
    <section className="rounded-xl border border-slate-900 bg-slate-950/80 p-3">
      <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">Key risks</h2>
      <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
        <li>Athlete outcomes are uncertain; loss of capital is possible.</li>
        <li>
          Long lockup; liquidity is via scheduled repurchase offers and may be pro‑rata if oversubscribed. [web:18]
        </li>
        <li>“APY” targets are variable and not guaranteed; NAV may decline.</li>
        <li>Cross-border execution, eligibility, and regulatory changes can affect outcomes and distributions.</li>
      </ul>
    </section>
  );
}
