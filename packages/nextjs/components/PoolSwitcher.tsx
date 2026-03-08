"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const POOLS = [
  { label: "⚽ Foundation", slug: "foundation_pool" },
  { label: "🎓 Academy", slug: "pathway_pool" },
  { label: "🏆 Pro", slug: "pro_path" },
];

export function PoolSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 rounded-xl bg-slate-800 border border-slate-700 p-1">
      {POOLS.map(pool => {
        const isActive = pathname.includes(pool.slug);
        return (
          <Link
            key={pool.slug}
            href={`/defi_features/${pool.slug}`}
            className={`flex-1 text-center rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
              isActive ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
            }`}
          >
            {pool.label}
          </Link>
        );
      })}
    </div>
  );
}
