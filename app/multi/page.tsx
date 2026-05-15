import Link from "next/link";
import { Flame } from "lucide-react";
import { CATALYSTS, tickerStackCounts } from "@/lib/data/catalysts";
import { daysUntil } from "@/lib/format";
import { CatalystCard } from "@/components/catalyst-card";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";

export default function MultiPage() {
  const stacks = tickerStackCounts();
  const tickers = Object.entries(stacks)
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t);

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Multi-catalyst stacks"
        title="Tickers with"
        emphasis="multiple catalysts"
        description="When a stock has two or more upcoming events in a short window, the setup compounds. These are the highest-conviction names in the calendar."
      />

      {tickers.length === 0 ? (
        <EmptyState
          title="No stacks right now"
          description="Multi-catalyst stacks form when a ticker has 2+ upcoming events within the 60-day window. Check back tomorrow."
        />
      ) : (
        <div className="space-y-8">
          {tickers.map((ticker) => {
            const tickerCatalysts = CATALYSTS.filter(
              (c) => c.ticker === ticker && c.status === "upcoming",
            ).sort((a, b) => daysUntil(a.eventDate) - daysUntil(b.eventDate));
            const company = tickerCatalysts[0]?.company ?? "";

            return (
              <section key={ticker}>
                <div className="mb-3 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <Flame className="h-4 w-4 self-center text-orange-400" aria-hidden />
                    <Link
                      href={{ pathname: "/catalysts", query: { ticker } }}
                      className="text-mono text-xl text-stone-100 hover:text-amber-300"
                    >
                      {ticker}
                    </Link>
                    <span className="text-sm text-stone-500">{company}</span>
                  </div>
                  <span className="text-mono text-xs text-orange-300">
                    ×{tickerCatalysts.length} stacked
                  </span>
                </div>
                <ul className="space-y-3">
                  {tickerCatalysts.map((c) => (
                    <li key={c.id}>
                      <CatalystCard catalyst={c} stackCount={tickerCatalysts.length} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
