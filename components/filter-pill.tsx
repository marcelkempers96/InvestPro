"use client";

import { cn } from "@/lib/utils";

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}

export function FilterPill({ label, active, onClick, count }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2.5 py-1 text-xs transition-colors",
        active
          ? "border-amber-400/60 bg-amber-400/10 text-amber-200"
          : "border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200",
      )}
    >
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "text-mono text-[10px]",
            active ? "text-amber-300/80" : "text-stone-600",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

interface FilterRowProps {
  label: string;
  children: React.ReactNode;
}

export function FilterRow({ label, children }: FilterRowProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
      <span className="shrink-0 text-[11px] uppercase tracking-wider text-stone-600">
        {label}
      </span>
      <div className="flex shrink-0 flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
