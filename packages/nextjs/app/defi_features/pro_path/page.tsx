// app/defi_features/pro-path/page.tsx
import Link from "next/link";

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
                <h1 className="text-xl font-semibold tracking-tight">Pro Path Pool</h1>
                <p className="mt-1 max-w-xl text-xs text-slate-300">
                  High‑risk pool with exposure to club equity SPVs, revenue share and carefully structured
                  transfer‑linked upside. Built for investors who understand long, volatile horizons.
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs">
                <div className="inline-flex items-center gap-2 rounded-full bg-rose-950/60 px-3 py-1 text-rose-300 ring-1 ring-rose-700/60">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="font-medium">High Risk</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Concentrated exposure to clubs, exits and performance‑based revenue.
                </p>
              </div>
            </div>
          </div>

          {/* Pool stats */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Pool snapshot</h2>
            <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Stat
                label="Current APY (illustrative)"
                value="9.8%"
                caption="High target net annualized return, not guaranteed."
              />
              <Stat label="Lockup" value="24+ months" caption="Redemptions only at specific liquidity events." />
              <Stat label="Pool size" value="C$3.1M" caption="Initial AUM across club and player SPVs." />
              <Stat
                label="Athletes in pipeline"
                value="24"
                caption="Players whose rights flow through club structures."
              />
            </div>
          </section>

          {/* Use of proceeds */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Use of proceeds</h2>
            <p className="mt-2 text-xs text-slate-300">
              Pro Path capital sits behind clubs and academies that sign, develop and sell players. The pool does not
              own individual athletes; it owns economic interests in regulated SPVs.
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <UseItem
                title="Club / academy SPVs (50%)"
                items={[
                  "Equity stakes in diaspora‑anchored clubs (e.g., West Indies FC, Central America FC).",
                  "Capital for academies that take Foundation & Pathway graduates into pro environments.",
                  "Governance rights focused on youth development standards.",
                ]}
              />
              <UseItem
                title="Transfer‑linked structures (25%)"
                items={[
                  "Contractual rights to a defined % of net transfer fees from partner clubs.",
                  "Sell‑on clauses when CPL/MLS/European clubs move players onward.",
                  "Caps and floors to reduce tail‑risk on extreme outcomes.",
                ]}
              />
              <UseItem
                title="Revenue share & matchday (15%)"
                items={[
                  "Portions of gate receipts, sponsorship, and media for specific fixtures.",
                  "Themed nights (Caribbean derbies, diaspora games) linked to Pro Path clubs.",
                ]}
              />
              <UseItem
                title="Liquidity & platform (10%)"
                items={["Treasury assets to bridge timing between exits.", "Legal, audit and reporting for all SPVs."]}
              />
            </div>
          </section>

          {/* Yield breakdown */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Where yield comes from</h2>
            <div className="mt-2 grid gap-4 md:grid-cols-3">
              <YieldItem
                title="Club valuation growth"
                value="~4–6% p.a. (long‑run)"
                description="Equity in well‑run clubs can appreciate as matchday, media and brand build around diaspora markets."
              />
              <YieldItem
                title="Transfer & sell‑on upside"
                value="Lumpy"
                description="Occasional exits from CPL → MLS → Europe send step‑change gains to the pool when defined thresholds are met."
              />
              <YieldItem
                title="Steady club revenue share"
                value="~2–3% p.a."
                description="Revenue participation from tickets, sponsorships and events smooths some of the volatility between exits."
              />
            </div>
          </section>

          {/* Impact metrics */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Impact & reporting</h2>
            <p className="mt-2 text-xs text-slate-300">
              Pro Path is the final stage of the high‑trust lane. Every dollar is traceable back to specific clubs,
              cohorts and player journeys, with transfer events logged on‑chain.
            </p>

            <div className="mt-3 grid gap-4 md:grid-cols-3">
              <ImpactItem label="Target exits per 5‑year cycle" value="3–5 significant transfers" />
              <ImpactItem label="Clubs in portfolio" value="6–10 SPVs across CONCACAF & Canada" />
              <ImpactItem
                label="Foundation / Pathway linkage"
                value="100% of clubs commit to recruiting from Prospex cohorts"
              />
            </div>
          </section>
        </section>

        {/* RIGHT COLUMN */}
        <aside className="w-full max-w-md space-y-4 lg:w-80">
          <SubscribeCard />
          <RiskDisclosure />
        </aside>
      </div>

      {/* Shared explainer */}
      <section className="mb-12 mt-4 rounded-2xl bg-white border border-slate-100 p-6 shadow-sm text-slate-900">
        <h2 className="text-lg font-semibold mb-1">Where Fund Yield Comes From</h2>
        <p className="text-sm text-slate-600 mb-4">
          Athlete funds earn return from real‑world activity, not pure token speculation.
        </p>

        <div className="space-y-4 text-slate-800">
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
                Shares of tickets, sponsorships, prize money, and CONCACAF‑ linked tourism packages flow back into the
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

      {/* Risk & CTA (shared style) */}
      <section className="mb-12 rounded-2xl bg-slate-900 text-slate-50 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">Risk &amp; Policy</h2>
            <p className="text-xs opacity-80 max-w-2xl">
              Pro Path is speculative. Capital is not guaranteed and returns depend on club performance, transfer
              markets, and regulatory conditions. All investors must complete KYC / AML and confirm suitability for
              high‑risk products.
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

      <section className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4">
        <Link
          href="/defi_features"
          className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
        >
          Launch DeFi Dashboard
        </Link>
        <Link
          href="/book-demo"
          className="inline-flex items-center justify-center rounded-full border border-indigo-600 px-8 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition"
        >
          Book a Bank Demo
        </Link>
      </section>
    </main>
  );
}

/* ---------- small subcomponents ---------- */

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
        <p className="text-sm font-semibold text-rose-300">{value}</p>
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
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Subscribe</p>
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">Pro Path Pool</span>
      </div>

      <p className="text-xs text-slate-300">
        Indicate a non‑binding interest amount. Final subscriptions are subject to KYC/AML approval, suitability checks
        and offering documents.
      </p>

      <form className="space-y-3">
        <div className="space-y-1">
          <label htmlFor="amount" className="text-[11px] font-medium text-slate-200">
            Indicative amount (CAD)
          </label>
          <input
            id="amount"
            type="number"
            min={25000}
            step={5000}
            placeholder="C$50,000"
            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
          <p className="text-[11px] text-slate-400">Minimum C$25,000; multiples of C$5,000.</p>
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-[11px] font-medium text-slate-200">
            Contact email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@institution.com"
            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        <label className="flex items-start gap-2 text-[11px] text-slate-300">
          <input type="checkbox" className="mt-0.5 h-3 w-3 rounded border-slate-700 bg-slate-900 text-indigo-500" />
          <span>
            I understand the Pro Path Pool is a high‑risk product and confirm that this expression of interest is
            non‑binding.
          </span>
        </label>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-lg bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          Submit interest
        </button>
      </form>

      <p className="text-[11px] text-slate-400">
        This page is for illustrative purposes only and does not constitute an offer to sell or a solicitation of an
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
        <li>Capital is at risk; returns are highly uncertain and volatile.</li>
        <li>Liquidity is limited; redemptions may only be possible on major exit events.</li>
        <li>Club performance, transfer markets and regulatory shifts can materially impact outcomes.</li>
        <li>This pool is suitable only for investors who can tolerate loss of capital and long lockups.</li>
      </ul>
    </section>
  );
}
