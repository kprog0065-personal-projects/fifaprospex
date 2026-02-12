// app/funds/foundation/page.tsx
import Link from "next/link";
import { PurchaseVaultCard } from "~~/components/PurchaseVaultCard";

export default function FoundationPoolPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold">
              PX
            </span>
            <span>Prospex DeFi Dashboard</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/funds" className="text-xs text-slate-300 hover:text-white">
              All Pools
            </Link>
            <Link
              href="/book-demo"
              className="rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-indigo-400"
            >
              Book Bank Demo
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 lg:flex-row">
        {/* LEFT COLUMN */}
        <section className="flex-1 space-y-6">
          {/* Breadcrumb + Title */}
          <div className="space-y-2">
            <div className="text-xs text-slate-400">
              <Link href="/funds" className="hover:text-slate-200">
                Tokenized Athlete Funds
              </Link>{" "}
              / <span className="text-slate-300">Foundation Pool</span>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Foundation Pool (U12)</h1>
                <p className="mt-1 max-w-xl text-xs text-slate-300">
                  High-risk, long-duration pool funding early athlete development. Ongoing yield comes from stablecoin
                  strategies; major upside (if it happens) comes from transfer-event cashflows distributed via a
                  separate waterfall.
                </p>
              </div>
              <RiskBadge />
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <p className="text-[11px] font-semibold text-slate-200">Important</p>
              <p className="mt-1 text-[11px] leading-snug text-slate-400">
                Vault shares are priced at NAV (net asset value) and can change over time. Liquidity is scheduled via
                limited repurchase windows after lockup—not a continuous secondary market. Repurchase requests may be
                filled pro‑rata if oversubscribed.
              </p>
            </div>
          </div>

          {/* Pool Stats */}
          <PoolStats />

          {/* Distributions & Liquidity */}
          <DistributionsAndLiquidity />

          {/* Use of Proceeds */}
          <UseOfProceeds />

          {/* How Returns Work */}
          <ReturnsBreakdown />

          {/* Impact */}
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

/* ---------- Components ---------- */

function RiskBadge() {
  return (
    <div className="flex flex-col items-end gap-1 text-xs">
      <div className="inline-flex items-center gap-2 rounded-full bg-orange-950/60 px-3 py-1 text-orange-300 ring-1 ring-orange-700/60">
        <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
        <span className="font-medium">High Risk</span>
      </div>
      <p className="text-[11px] text-slate-400">Long lockup, limited liquidity, outcomes depend on player success.</p>
    </div>
  );
}

function PoolStats() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Pool snapshot</h2>

      <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Target base APY (variable)" value="6%" caption="Stablecoin yield target; not guaranteed." />
        <Stat
          label="Quarterly liquidity"
          value="Up to 5%/qtr"
          caption="Repurchase offers after lockup; pro‑rata if oversubscribed."
        />
        <Stat label="Lockup" value="8 years" caption="No repurchases during lockup." />
        <Stat label="Share pricing" value="NAV" caption="Share price floats at NAV (Net Asset Value)" />
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
      {caption && <p className="text-[11px] leading-snug text-slate-400">{caption}</p>}
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
          description="After lockup, offer up to 5% of outstanding shares per tier each window; if requests exceed the limit, fills are pro‑rata."
        />
      </div>

      <div className="mt-4 rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
        <p className="text-[11px] font-semibold text-slate-200">What “pro‑rata” means</p>
        <p className="mt-1 text-[11px] leading-snug text-slate-400">
          If a tier offers 5% of shares this quarter but 12% of shares are tendered, each tender is partially filled so
          the total filled equals the offer size.
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
        <p className="text-sm font-semibold text-indigo-200">{value}</p>
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
        Capital funds early-stage player development through vetted local providers. Services are delivered via
        transparent contracts and program spend, not cash payments to players.
      </p>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <UseItem
          title="Core development (50%)"
          items={[
            "Training programs (ball-skill, futsal, strength & conditioning)",
            "Professional coaching & nutrition support",
            "Player development tracking & assessments",
          ]}
        />
        <UseItem
          title="Infrastructure & access (30%)"
          items={[
            "Facility rentals (pitches, courts, safe community spaces)",
            "Transport stipends for families (program support; not investment yield)",
            "Performance data capture (video, GPS, testing)",
          ]}
        />
        <UseItem
          title="Liquidity & reserves (15%)"
          items={[
            "Stablecoin reserve buffer for ops + repurchase windows",
            "Treasury bills / cash equivalents (where applicable)",
          ]}
        />
        <UseItem
          title="Platform & compliance (5%)"
          items={["Reporting & investor dashboards", "Compliance workstreams (as applicable per jurisdiction)"]}
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

function ReturnsBreakdown() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">How returns work</h2>
      <p className="mt-2 text-xs text-slate-300">
        Returns come from (1) ongoing stablecoin strategy yield that can be DRIP’d into NAV, and (2) special
        transfer-event distributions when cash is received.
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
          description="Special distributions use a tier waterfall: Foundation 50%, Academy 30%, Pro 20%. Installments are treated as separate events when cash arrives."
        />
        <ReturnItem
          title="Liquidity path"
          value="Repurchase windows"
          description="After lockup: quarterly repurchase offers up to 5% per tier at NAV; if oversubscribed, fills are pro‑rata. Not a promise of full exit on demand."
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
        <p className="text-sm font-semibold text-orange-300">{value}</p>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-slate-300">{description}</p>
    </div>
  );
}

function ImpactMetrics() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Impact & reporting</h2>
      <p className="mt-2 text-xs text-slate-300">
        Transparent development tracking for each athlete: sessions attended, services consumed, and key milestones.
        Families see what&apos;s funded; investors see anonymized cohort-level reporting.
      </p>

      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <ImpactItem label="Cohort size" value="40 U12 players" />
        <ImpactItem label="Investment model" value="Pool-based (entire cohort)" />
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
      <PurchaseVaultCard
        pool="foundation"
        minDeposit={500}
        poolLabel="Foundation Pool"
        poolDescription="Connect your wallet to deposit CAD and receive vault shares representing ownership in the Foundation Pool (U12)."
      />
    </section>
  );
}

function RiskDisclosure() {
  return (
    <section className="rounded-xl border border-slate-900 bg-slate-950/80 p-3">
      <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">Key risks</h2>
      <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
        <li>Early-stage athlete outcomes are highly uncertain; loss of capital is possible.</li>
        <li>Long lockup; repurchases (if any) occur only in scheduled windows and may be pro‑rata.</li>
        <li>“APY” targets are variable and not guaranteed; NAV may go down as well as up.</li>
        <li>Returns depend on player development, transfer markets, and operational execution.</li>
        <li>Regulatory changes may impact token structure, disclosures, or distribution mechanics.</li>
      </ul>
    </section>
  );
}
