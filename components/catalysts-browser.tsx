"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CATALYSTS, tickerStackCounts } from "@/lib/data/catalysts";
import { applyFilters, parseFiltersFromSearchParams } from "@/lib/filter";
import { daysUntil } from "@/lib/format";
import { CatalystCard } from "@/components/catalyst-card";
import { EmptyState } from "@/components/empty-state";
import { FilterBar } from "@/components/filter-bar";

// Filtering runs entirely on the client: GitHub Pages serves a single static
// HTML file, so the URL query string is read in the browser rather than on a server.
export function CatalystsBrowser() {
  const searchParams = useSearchParams();

  const stacks = useMemo(() => tickerStackCounts(), []);

  const upcoming = useMemo(
    () =>
      CATALYSTS.filter((c) => c.status === "upcoming").sort(
        (a, b) => daysUntil(a.eventDate) - daysUntil(b.eventDate),
      ),
    [],
  );

  const filtered = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    const filters = parseFiltersFromSearchParams(params);
    return applyFilters(upcoming, filters, stacks);
  }, [searchParams, upcoming, stacks]);

  return (
    <>
      <FilterBar />

      <div className="mb-3 mt-6 flex items-baseline justify-between">
        <h2 className="text-mono text-xs uppercase tracking-widest text-stone-500">
          Results <span className="text-stone-700">{filtered.length}</span>
        </h2>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No catalysts match"
          description="Try removing a filter or broadening your search term."
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((c) => (
            <li key={c.id}>
              <CatalystCard catalyst={c} stackCount={stacks[c.ticker] ?? 1} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
