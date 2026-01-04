import React from "react";
import Link from "next/link";

export const AppFooter = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white text-slate-700">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
        {/* Brand + tagline */}
        <div>
          <p className="text-sm font-semibold tracking-wide text-slate-900">Prospex</p>
          <p className="mt-1 text-xs text-slate-500">
            Transparent pools funding pre‑12 coaching, player development, and professional pathways.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <Link href="/defi_features" className="hover:text-red-500">
            Pools &amp; DeFi
          </Link>
          <span className="hidden text-slate-300 md:inline">·</span>
          <Link href="/select_profile" className="hover:text-red-500">
            Profiles
          </Link>
          <span className="hidden text-slate-300 md:inline">·</span>
          <Link href="/community" className="hover:text-red-500">
            Community
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-right text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Prospex.</p>
          <p>Built for footballers, coaches, and investors.</p>
        </div>
      </div>
    </footer>
  );
};
