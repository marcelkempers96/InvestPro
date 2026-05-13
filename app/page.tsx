import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { CATALYSTS, tickerStackCounts } from "@/lib/data/catalysts";
import { NEWS } from "@/lib/data/news";
import { daysUntil } from "@/lib/format";
import { CatalystCard } from "@/components/catalyst-card";
import { NewsCard } from "@/components/news-card";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";

export const revalidate = 900;

export default function TodayPage() {
  const stacks = tickerStackCounts();

  const upcoming = CATALYSTS.filter((c) => c.status === "upcoming").sort(
    (a, b) => daysUntil(a.eventDate) - daysUntil(b.eventDate),
  );

  const thisWeek = upcoming.filter((c) => {
    const d = daysUntil(c.eventDate);
    return d >= 0 && d <= 7;
  });

  const nextSeven = upcoming.filter((c) => {
    const d = daysUntil(c.eventDate);
    return d > 7 && d <= 30;
  }).slice(0, 6);

  const hotStacks = Object.entries(stacks)
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const recentNews = [...NEWS]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Today"
        title="Things that"
        emphasis="move the market"
        description="The catalysts firing in the next week, the multi-event stacks worth your attention, and the news that's moving names right now."
      />

      {hotStacks.length > 0 && (
        <section className="surface rounded-lg p-4">
          <div className="mb-3 flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-400" aria-hidden />
            <h2 className="text-sm font-medium text-stone-100">Multi-catalyst stacks</h2>
            <span className="text-xs text-stone-500">
              · highest-conviction setups in the window
            </span>
          </div>
          <ul className="divide-y divide-stone-900">
            {hotStacks.map(([ticker, n]) => (
              <li key={ticker} className="flex items-center justify-between py-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-mono text-base text-stone-100">{ticker}</span>
                  <span className="text-xs text-stone-500">
                    {n} catalysts in the next 60 days
                  </span>
                </div>
                <Link
                  href={{ pathname: "/catalysts", query: { ticker } }}
                  className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200"
                >
                  View <ArrowRight className="h-3 w-3" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <SectionHeading label="This week" count={thisWeek.length} hint="next 7 days" />
      {thisWeek.length === 0 ? (
        <p className="text-sm text-stone-500">No catalysts in the next 7 days.</p>
      ) : (
        <ul className="space-y-3">
          {thisWeek.map((c) => (
            <li key={c.id}>
              <CatalystCard catalyst={c} stackCount={stacks[c.ticker] ?? 1} />
            </li>
          ))}
        </ul>
      )}

      <SectionHeading label="Coming up" count={nextSeven.length} hint="next 30 days" />
      <ul className="space-y-3">
        {nextSeven.map((c) => (
          <li key={c.id}>
            <CatalystCard catalyst={c} stackCount={stacks[c.ticker] ?? 1} />
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center">
        <Link
          href="/catalysts"
          className="inline-flex items-center gap-1 text-sm text-stone-400 hover:text-amber-300"
        >
          See all catalysts <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      <SectionHeading label="Moving names" count={recentNews.length} hint="last 24h" />
      <ul className="space-y-3">
        {recentNews.map((n) => (
          <li key={n.id}>
            <NewsCard item={n} />
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center">
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-sm text-stone-400 hover:text-amber-300"
        >
          All news <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
