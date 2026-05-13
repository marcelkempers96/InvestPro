"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CATALYSTS, tickerStackCounts } from "@/lib/data/catalysts";
import { daysUntil } from "@/lib/format";
import { useWatchlist } from "@/lib/watchlist-store";
import { CatalystCard } from "@/components/catalyst-card";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";

export default function WatchlistPage() {
  const ids = useWatchlist((s) => s.ids);
  const [hydrated, setHydrated] = useState(false);

  // Zustand's persist middleware rehydrates on the client; show a stable skeleton until then.
  useEffect(() => setHydrated(true), []);

  const stacks = tickerStackCounts();
  const watched = CATALYSTS.filter((c) => ids.includes(c.id)).sort(
    (a, b) => daysUntil(a.eventDate) - daysUntil(b.eventDate),
  );

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Watchlist"
        title="The catalysts"
        emphasis="you're tracking"
        description="Your personal calendar. Notifications fire here first — adjust lead time in Settings."
      />

      {!hydrated ? (
        <div className="surface h-32 animate-pulse rounded-lg" />
      ) : watched.length === 0 ? (
        <EmptyState
          title="Nothing on your watchlist"
          description="Star a catalyst on any page to add it here."
          action={
            <Link
              href="/catalysts"
              className="inline-flex items-center gap-1 rounded-md border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-400/20"
            >
              Browse catalysts
            </Link>
          }
        />
      ) : (
        <ul className="space-y-3">
          {watched.map((c) => (
            <li key={c.id}>
              <CatalystCard catalyst={c} stackCount={stacks[c.ticker] ?? 1} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
