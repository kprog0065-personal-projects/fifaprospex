// app/funds/foundation/page.tsx
import Link from "next/link";

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
        {/* LEFT COLUMN: Overview + Use of Proceeds + Metrics */}
        <section className="flex-1 space-y-6">
          {/* Breadcrumb + Title */}
          <div className="space-y-2">
            <div className="text-xs text-slate-400">
              <Link href="/funds" className="hover:text-slate-200">
                Tokenized Athlete Funds
              </Link>{" "}
              / <span className="text-slate-300">Foundation Pool</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Foundation Pool</h1>
                <p className="mt-1 max-w-xl text-xs text-slate-300">
                  Stable, low‑risk pool that finances local training, gyms, coaching, nutrition and basic services for
                  U‑10 to U‑13 cohorts. Capital is deployed into short‑cycle development blocks, not direct cash to
                  players.
                </p>
              </div>
              <RiskBadge />
            </div>
          </div>

          {/* Pool Stats Card */}
          <PoolStats />

          {/* Use of Proceeds */}
          <UseOfProceeds />

          {/* Yield Explanation */}
          <YieldBreakdown />

          {/* Impact Metrics */}
          <ImpactMetrics />
        </section>

        {/* RIGHT COLUMN: Subscribe / KYC Card */}
        <aside className="w-full max-w-md space-y-4 lg:w-80">
          <SubscribeCard />
          <RiskDisclosure />
        </aside>
      </div>
    </main>
  );
}

/* ---------- Sub‑components ---------- */

function RiskBadge() {
  return (
    <div className="flex flex-col items-end gap-1 text-xs">
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950/60 px-3 py-1 text-emerald-300 ring-1 ring-emerald-700/60">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="font-medium">Low Risk</span>
      </div>
      <p className="text-[11px] text-slate-400">
        Short lockup, diversified across services and conservative yield instruments.
      </p>
    </div>
  );
}

function PoolStats() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Pool snapshot</h2>
      <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Current APY (illustrative)" value="3.4%" caption="Target net annualized yield (not guaranteed)." />
        <Stat label="Lockup" value="3–6 months" caption="Quarterly redemptions, subject to liquidity." />
        <Stat label="Pool size" value="C$2.3M" caption="Target initial AUM for pilot phase." />
        <Stat label="Athletes supported" value="120" caption="Estimated U‑10 to U‑13 players per cycle." />
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

function UseOfProceeds() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Use of proceeds</h2>
      <p className="mt-2 text-xs text-slate-300">
        The Foundation Pool funds short, rules‑based development blocks instead of cash payments to athletes. Services
        are delivered through vetted, local providers under transparent contracts.
      </p>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <UseItem
          title="Core development (50%)"
          items={[
            "Ball‑skill and futsal blocks for U‑10 to U‑13 players.",
            "Local coaching, gym access and recovery sessions.",
            "Basic nutrition support (meals, snack programs).",
          ]}
        />
        <UseItem
          title="Infrastructure & access (30%)"
          items={[
            "Pitch rental, futsal courts and safe community facilities.",
            "Transport stipends for families to reach sessions.",
            "Data capture: video, GPS and objective testing.",
          ]}
        />
        <UseItem
          title="Liquidity & reserves (15%)"
          items={[
            "Treasury bills, GIC‑like deposits at partner banks.",
            "Cash buffer to honour redemptions inside lockup windows.",
          ]}
        />
        <UseItem
          title="Platform & compliance (5%)"
          items={["Regulatory, audit and local governance costs.", "On‑chain reporting and impact dashboards."]}
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

function YieldBreakdown() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Where yield comes from</h2>
      <div className="mt-2 grid gap-4 md:grid-cols-3">
        <YieldItem
          title="Service margin"
          value="~1.4% p.a."
          description="Discounts negotiated on gyms, coaching, gear and facilities; a portion of the spread is shared back to the pool."
        />
        <YieldItem
          title="Treasury yield"
          value="~1.5% p.a."
          description="Short‑dated government and bank instruments held in Canadian dollars at regulated partners."
        />
        <YieldItem
          title="Operational efficiency"
          value="~0.5% p.a."
          description="Shared savings from standardized scheduling, group travel and bulk procurement across cohorts."
        />
      </div>
    </section>
  );
}

type YieldItemProps = {
  title: string;
  value: string;
  description: string;
};

function YieldItem({ title, value, description }: YieldItemProps) {
  return (
    <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200">{title}</p>
        <p className="text-sm font-semibold text-emerald-300">{value}</p>
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
        Each athlete supported by the Foundation Pool has a transparent development ledger: sessions attended, services
        consumed and key milestones. Families can see what has been funded; investors see anonymized cohort‑level data.
      </p>

      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <ImpactItem label="Average cost / athlete / 3‑month block" value="C$750" />
        <ImpactItem label="Minimum cohort size" value="40–60 players" />
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
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Subscribe</p>
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">Foundation Pool</span>
      </div>

      <p className="text-xs text-slate-300">
        Indicate a non‑binding interest amount. Final subscriptions are subject to KYC/AML approval and offering
        documents.
      </p>

      <form className="space-y-3">
        <div className="space-y-1">
          <label htmlFor="amount" className="text-[11px] font-medium text-slate-200">
            Indicative amount (CAD)
          </label>
          <input
            id="amount"
            type="number"
            min={1000}
            step={500}
            placeholder="C$10,000"
            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none ring-0 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
          <p className="text-[11px] text-slate-400">Minimum C$5,000; multiples of C$500.</p>
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-[11px] font-medium text-slate-200">
            Contact email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@institution.com"
            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none ring-0 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-start gap-2 text-[11px] text-slate-300">
            <input type="checkbox" className="mt-0.5 h-3 w-3 rounded border-slate-700 bg-slate-900 text-indigo-500" />
            <span>
              I confirm this expression of interest is non‑binding and I agree to receive offering documents and KYC
              instructions.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-lg bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          Submit interest
        </button>
      </form>

      <p className="text-[11px] text-slate-400">
        This page is for **illustrative** purposes only and does not constitute an offer to sell or a solicitation of an
        offer to buy any security. Any offering will be made via formal documentation in permitted jurisdictions.
      </p>
    </section>
  );
}

function RiskDisclosure() {
  return (
    <section className="rounded-xl border border-slate-900 bg-slate-950/80 p-3">
      <h2 className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">Key risks</h2>
      <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
        <li>Capital is at risk; returns are not guaranteed.</li>
        <li>Lockups and liquidity windows mean you may not withdraw on demand.</li>
        <li>Yields depend on service demand, treasury rates and operational performance in CONCACAF markets.</li>
        <li>Regulatory changes in Canada or partner jurisdictions may impact pool structure.</li>
      </ul>
    </section>
  );
}
