"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useCallback, useMemo } from "react";
import type {
  CatalystType,
  GuidanceTrajectory,
  Industry,
  MarketCapClass,
  Risk,
} from "@/lib/types";
import {
  CAP_LABELS,
  GUIDANCE_LABELS,
  INDUSTRY_LABELS,
  RISK_LABELS,
  TYPE_LABELS,
} from "@/lib/types";
import { FilterPill, FilterRow } from "@/components/filter-pill";

const INDUSTRIES: Industry[] = [
  "ai_semis",
  "energy",
  "biotech",
  "defense",
  "fintech",
  "consumer",
  "crypto",
  "other",
];
const TYPES: CatalystType[] = [
  "earnings",
  "fda",
  "regulatory",
  "contract",
  "product",
  "macro",
];
const RISKS: Risk[] = ["low", "medium", "high"];
const CAPS: MarketCapClass[] = ["micro", "small", "mid", "large", "mega"];
const GUIDANCE: GuidanceTrajectory[] = ["raised", "maintained", "lowered"];

function toggleParam(params: URLSearchParams, key: string, value: string): URLSearchParams {
  const current = params.getAll(key);
  const next = new URLSearchParams(params);
  next.delete(key);
  if (current.includes(value)) {
    for (const v of current) if (v !== value) next.append(key, v);
  } else {
    for (const v of current) next.append(key, v);
    next.append(key, value);
  }
  return next;
}

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const active = useMemo(
    () => ({
      industries: searchParams.getAll("industry"),
      types: searchParams.getAll("type"),
      risks: searchParams.getAll("risk"),
      caps: searchParams.getAll("cap"),
      guidance: searchParams.getAll("guidance"),
      multi: searchParams.get("multi") === "1",
      search: searchParams.get("q") ?? "",
      ticker: searchParams.get("ticker") ?? "",
    }),
    [searchParams],
  );

  const apply = useCallback(
    (next: URLSearchParams) => {
      const qs = next.toString();
      router.replace(qs ? `?${qs}` : "?", { scroll: false });
    },
    [router],
  );

  const onToggle = (key: string, value: string) => {
    apply(toggleParam(searchParams, key, value));
  };

  const onSearch = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("q", value);
    else next.delete("q");
    apply(next);
  };

  const clearAll = () => apply(new URLSearchParams());

  const hasActiveFilters =
    active.industries.length ||
    active.types.length ||
    active.risks.length ||
    active.caps.length ||
    active.guidance.length ||
    active.multi ||
    active.search ||
    active.ticker;

  return (
    <div className="surface space-y-2 rounded-lg p-3">
      {/* Search row */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-600"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search ticker, company, event…"
            value={active.search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full rounded-md border border-stone-800 bg-stone-950/40 py-1.5 pl-8 pr-3 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-400/40 focus:outline-none"
          />
        </div>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 rounded-md border border-stone-800 bg-stone-900 px-2.5 py-1.5 text-xs text-stone-400 hover:border-stone-700 hover:text-stone-200"
          >
            <X className="h-3 w-3" aria-hidden />
            Clear
          </button>
        ) : null}
      </div>

      {active.ticker && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500">Filtering:</span>
          <span className="text-mono inline-flex items-center gap-1 rounded-md border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-amber-200">
            {active.ticker}
            <button
              type="button"
              onClick={() => {
                const next = new URLSearchParams(searchParams);
                next.delete("ticker");
                apply(next);
              }}
              className="hover:text-amber-100"
              aria-label="Remove ticker filter"
            >
              <X className="h-3 w-3" aria-hidden />
            </button>
          </span>
        </div>
      )}

      <FilterRow label="Type">
        {TYPES.map((t) => (
          <FilterPill
            key={t}
            label={TYPE_LABELS[t]}
            active={active.types.includes(t)}
            onClick={() => onToggle("type", t)}
          />
        ))}
      </FilterRow>

      <FilterRow label="Industry">
        {INDUSTRIES.map((i) => (
          <FilterPill
            key={i}
            label={INDUSTRY_LABELS[i]}
            active={active.industries.includes(i)}
            onClick={() => onToggle("industry", i)}
          />
        ))}
      </FilterRow>

      <FilterRow label="Risk">
        {RISKS.map((r) => (
          <FilterPill
            key={r}
            label={RISK_LABELS[r]}
            active={active.risks.includes(r)}
            onClick={() => onToggle("risk", r)}
          />
        ))}
      </FilterRow>

      <FilterRow label="Cap">
        {CAPS.map((c) => (
          <FilterPill
            key={c}
            label={CAP_LABELS[c]}
            active={active.caps.includes(c)}
            onClick={() => onToggle("cap", c)}
          />
        ))}
      </FilterRow>

      <FilterRow label="Guidance">
        {GUIDANCE.map((g) => (
          <FilterPill
            key={g}
            label={GUIDANCE_LABELS[g]}
            active={active.guidance.includes(g)}
            onClick={() => onToggle("guidance", g)}
          />
        ))}
      </FilterRow>

      <FilterRow label="Setup">
        <FilterPill
          label="Multi-catalyst only"
          active={active.multi}
          onClick={() => {
            const next = new URLSearchParams(searchParams);
            if (active.multi) next.delete("multi");
            else next.set("multi", "1");
            apply(next);
          }}
        />
      </FilterRow>
    </div>
  );
}
