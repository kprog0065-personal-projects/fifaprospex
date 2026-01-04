// app/defi_features/pathway/page.tsx
import Link from "next/link";

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
                <h1 className="text-xl font-semibold tracking-tight">Pathway Pool</h1>
                <p className="mt-1 max-w-xl text-xs text-slate-300">
                  Medium‑risk pool that funds cross‑border academies, visas, education, housing and travel for combines.
                  Capital supports players who are ready to step from local programs into professional pathways.
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-950/60 px-3 py-1 text-amber-300 ring-1 ring-amber-700/60">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="font-medium">Medium Risk</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Longer lockups and performance exposure across multiple academies and clubs.
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
                value="6.1%"
                caption="Target net annualized yield (not guaranteed)."
              />
              <Stat
                label="Lockup"
                value="12–24 months"
                caption="Semi‑annual redemption windows, subject to liquidity."
              />
              <Stat label="Pool size" value="C$4.8M" caption="Target initial AUM across regions." />
              <Stat label="Athletes supported" value="65" caption="Players in cross‑border cohorts per cycle." />
            </div>
          </section>

          {/* Use of proceeds */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Use of proceeds</h2>
            <p className="mt-2 text-xs text-slate-300">
              Pathway capital unlocks cross‑border movement for the most promising players. Funding flows into
              structured services and contracts, never direct cash to athletes.
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <UseItem
                title="Academy & education (40%)"
                items={[
                  "Tuition and fees at partner academies in Canada, US, and Europe.",
                  "School support and remote learning for players on the move.",
                  "Language, life‑skills and transition programs.",
                ]}
              />
              <UseItem
                title="Visas, housing & travel (35%)"
                items={[
                  "Visa processing, legal support and insurance.",
                  "Safe housing close to training centers.",
                  "Flights and ground travel for combines and trials.",
                ]}
              />
              <UseItem
                title="Club & combine operations (15%)"
                items={[
                  "Cross‑border tournaments and showcase events.",
                  "Data capture, scouting infrastructure and medical screening.",
                ]}
              />
              <UseItem
                title="Liquidity & platform (10%)"
                items={["Treasury assets for liquidity management.", "Compliance, governance and on‑chain reporting."]}
              />
            </div>
          </section>

          {/* Yield breakdown */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Where yield comes from</h2>
            <div className="mt-2 grid gap-4 md:grid-cols-3">
              <YieldItem
                title="Service savings & margins"
                value="~2.5% p.a."
                description="Negotiated rates with academies, housing partners and travel providers; part of the savings are shared with the pool."
              />
              <YieldItem
                title="Club & event revenue"
                value="~2.1% p.a."
                description="Revenue shares from combines, friendly matches, sponsorships and tourism packages linked to Pathway cohorts."
              />
              <YieldItem
                title="Treasury yield"
                value="~1.5% p.a."
                description="CAD‑denominated low‑risk instruments for unallocated cash to stabilize returns."
              />
            </div>
          </section>

          {/* Impact metrics */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Impact & reporting</h2>
            <p className="mt-2 text-xs text-slate-300">
              Pathway cohorts are tracked from local foundations into cross‑border environments, with transparent
              ledgers for minutes, trials, contracts and educational progress.
            </p>

            <div className="mt-3 grid gap-4 md:grid-cols-3">
              <ImpactItem label="Average cost / athlete / year" value="C$18,000" />
              <ImpactItem label="Target cohorts per year" value="3–5 cross‑border groups" />
              <ImpactItem label="Primary corridors" value="Caribbean → Canada / US / Europe" />
            </div>
          </section>
        </section>

        {/* RIGHT COLUMN */}
        <aside className="w-full max-w-md space-y-4 lg:w-80">
          <SubscribeCard />
          <RiskDisclosure />
        </aside>
      </div>

      {/* Shared sections (same as your snippet) */}
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

/* ------- small subcomponents ------- */

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
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Subscribe</p>
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">Pathway Pool</span>
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
            min={10000}
            step={1000}
            placeholder="C$25,000"
            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
          <p className="text-[11px] text-slate-400">Minimum C$10,000; multiples of C$1,000.</p>
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
            I confirm this expression of interest is non‑binding and I agree to receive offering documents and KYC
            instructions.
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
        <li>Capital is at risk; returns are not guaranteed.</li>
        <li>Longer lockups mean you may not withdraw during the full 12–24 month term.</li>
        <li>Yields depend on academy demand, club revenue and cross‑border logistics.</li>
        <li>Regulatory changes in Canada or partner countries may affect pool structure.</li>
      </ul>
    </section>
  );
}
