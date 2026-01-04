// app/investor/page.tsx  (Next.js 13+ app router)
// or pages/investor.tsx (Next.js pages router, remove "export const metadata")

export const metadata = {
  title: "Investor Portfolio | Prospex",
};

type PoolTier = "Foundation" | "Pathway" | "Pro";

interface PoolPosition {
  id: string;
  name: string;
  tier: PoolTier;
  riskLabel: "Low" | "Medium" | "High";
  tokens: number;
  tokenPrice: number; // in CAD
  apr: number; // % per year
  realizedYield: number; // CAD earned so far
}

const mockPositions: PoolPosition[] = [
  {
    id: "foundation-1",
    name: "Foundation Pool",
    tier: "Foundation",
    riskLabel: "Low",
    tokens: 1200,
    tokenPrice: 1.02,
    apr: 3.2,
    realizedYield: 48.5,
  },
  {
    id: "pathway-1",
    name: "Pathway Pool",
    tier: "Pathway",
    riskLabel: "Medium",
    tokens: 800,
    tokenPrice: 1.1,
    apr: 6.5,
    realizedYield: 72.1,
  },
  {
    id: "pro-1",
    name: "Pro Pool",
    tier: "Pro",
    riskLabel: "High",
    tokens: 300,
    tokenPrice: 1.35,
    apr: 11.0,
    realizedYield: 96.3,
  },
];

function InvestorPage() {
  const totalValue = mockPositions.reduce((sum, p) => sum + p.tokens * p.tokenPrice, 0);

  const totalRealizedYield = mockPositions.reduce((sum, p) => sum + p.realizedYield, 0);

  const blendedApr = mockPositions.reduce((sum, p) => sum + p.apr * (p.tokens * p.tokenPrice), 0) / (totalValue || 1);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Page header */}
        <header className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Investor Portfolio</h1>
            <p className="mt-1 text-sm text-slate-400">Overview of your Prospex pool positions, yield, and impact.</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-sky-400">
              Invest in Pools
            </button>
            <button className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:border-slate-500">
              Redeem
            </button>
          </div>
        </header>

        {/* Top summary cards */}
        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Portfolio value</p>
            <p className="mt-2 text-2xl font-semibold">
              ${totalValue.toLocaleString("en-CA", { maximumFractionDigits: 2 })}
            </p>
            <p className="mt-1 text-xs text-slate-500">All pools, in CAD.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Blended yield (APR)</p>
            <p className="mt-2 text-2xl font-semibold">{blendedApr.toFixed(1)}%</p>
            <p className="mt-1 text-xs text-slate-500">Weighted across all holdings.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Realized yield</p>
            <p className="mt-2 text-2xl font-semibold">
              $
              {totalRealizedYield.toLocaleString("en-CA", {
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="mt-1 text-xs text-slate-500">Interest and distributions to date.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Impact snapshot</p>
            <p className="mt-2 text-sm font-medium">412 hours of training funded</p>
            <p className="text-xs text-slate-500">83 youth supported across all pools.</p>
          </div>
        </section>

        {/* Positions table */}
        <section className="mb-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Pool positions</h2>
            <span className="text-xs text-slate-500">Showing {mockPositions.length} active positions</span>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900/80">
                <tr>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">Pool</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">Tier / Risk</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">Tokens</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">Token price</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">Value</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">APR</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Realized yield
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockPositions.map(p => {
                  const value = p.tokens * p.tokenPrice;
                  const percentOfPortfolio = (value / totalValue) * 100;

                  return (
                    <tr key={p.id} className="border-t border-slate-800/80 hover:bg-slate-800/40">
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{p.name}</span>
                          <span className="text-xs text-slate-500">{percentOfPortfolio.toFixed(1)}% of portfolio</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="mr-2 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-200">
                          {p.tier}
                        </span>
                        <span
                          className={`text-xs ${
                            p.riskLabel === "Low"
                              ? "text-emerald-400"
                              : p.riskLabel === "Medium"
                                ? "text-amber-300"
                                : "text-rose-400"
                          }`}
                        >
                          {p.riskLabel} risk
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {p.tokens.toLocaleString("en-CA", {
                          maximumFractionDigits: 0,
                        })}
                      </td>
                      <td className="px-4 py-3">${p.tokenPrice.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        $
                        {value.toLocaleString("en-CA", {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-4 py-3">{p.apr.toFixed(1)}%</td>
                      <td className="px-4 py-3">
                        $
                        {p.realizedYield.toLocaleString("en-CA", {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Activity & downloads */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-200">Recent activity</h3>
            <p className="mt-1 text-xs text-slate-500">
              For MVP you can hard-code or plug in last few deposits/withdrawals.
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>Deposited $2,000 into Foundation Pool</span>
                <span className="text-xs text-slate-500">2 days ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Yield payout from Pro Pool</span>
                <span className="text-xs text-slate-500">1 week ago</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-200">Statements & tax</h3>
            <p className="mt-1 text-xs text-slate-500">Export your portfolio and earnings as CSV or PDF.</p>
            <div className="mt-3 flex gap-3">
              <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium hover:border-slate-500">
                Download CSV
              </button>
              <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium hover:border-slate-500">
                Download PDF
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default InvestorPage;
