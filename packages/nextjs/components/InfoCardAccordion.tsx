"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface InfoCardAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function InfoCardAccordion({ title, children, defaultOpen = false }: InfoCardAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">{title}</h2>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        )}
      </button>
      {isOpen && <div className="mt-4 space-y-3">{children}</div>}
    </section>
  );
}
