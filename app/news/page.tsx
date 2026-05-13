"use client";

import { useMemo, useState } from "react";
import type { Industry, Sentiment } from "@/lib/types";
import { INDUSTRY_LABELS } from "@/lib/types";
import { NEWS } from "@/lib/data/news";
import { FilterPill, FilterRow } from "@/components/filter-pill";
import { NewsCard } from "@/components/news-card";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";

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
const SENTIMENTS: Sentiment[] = ["bullish", "bearish", "neutral"];

export default function NewsPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [sentiments, setSentiments] = useState<Sentiment[]>([]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return [...NEWS]
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
      .filter((n) => {
        if (industries.length && !industries.includes(n.industry)) return false;
        if (sentiments.length && !sentiments.includes(n.sentiment)) return false;
        if (term) {
          const hay = `${n.ticker} ${n.headline} ${n.summary}`.toLowerCase();
          if (!hay.includes(term)) return false;
        }
        return true;
      });
  }, [industries, sentiments, query]);

  const toggleIndustry = (i: Industry) =>
    setIndustries((curr) =>
      curr.includes(i) ? curr.filter((x) => x !== i) : [...curr, i],
    );
  const toggleSentiment = (s: Sentiment) =>
    setSentiments((curr) =>
      curr.includes(s) ? curr.filter((x) => x !== s) : [...curr, s],
    );

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="News"
        title="Stock-moving"
        emphasis="headlines"
        description="The news driving the names you're watching. Sentiment-tagged, source-linked, ranked by relevance."
      />

      <div className="surface space-y-2 rounded-lg p-3">
        <input
          type="search"
          placeholder="Search headlines, tickers, or text…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-stone-800 bg-stone-950/40 px-3 py-1.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-400/40 focus:outline-none"
        />
        <FilterRow label="Industry">
          {INDUSTRIES.map((i) => (
            <FilterPill
              key={i}
              label={INDUSTRY_LABELS[i]}
              active={industries.includes(i)}
              onClick={() => toggleIndustry(i)}
            />
          ))}
        </FilterRow>
        <FilterRow label="Sentiment">
          {SENTIMENTS.map((s) => (
            <FilterPill
              key={s}
              label={s.charAt(0).toUpperCase() + s.slice(1)}
              active={sentiments.includes(s)}
              onClick={() => toggleSentiment(s)}
            />
          ))}
        </FilterRow>
      </div>

      <div className="mb-3 mt-6 flex items-baseline justify-between">
        <h2 className="text-mono text-xs uppercase tracking-widest text-stone-500">
          Results <span className="text-stone-700">{filtered.length}</span>
        </h2>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No news matches"
          description="Try fewer filters or a broader search."
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((n) => (
            <li key={n.id}>
              <NewsCard item={n} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
