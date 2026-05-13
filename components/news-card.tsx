import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NewsItem } from "@/lib/types";
import { relativeTime } from "@/lib/format";
import { IndustryBadge } from "@/components/badges/industry-badge";
import { SentimentBadge } from "@/components/badges/sentiment-badge";

// A NewsCard is two side-by-side links: the ticker chip filters the catalyst list,
// the main body opens the source article in a new tab. We use a relative <article>
// wrapper with two siblings rather than nested anchors.
export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="surface group relative flex items-start gap-3 rounded-lg p-4 transition-colors hover:border-stone-700">
      <Link
        href={{ pathname: "/catalysts", query: { ticker: item.ticker } }}
        className="text-mono relative z-10 shrink-0 self-start rounded-md border border-stone-800 bg-stone-900/60 px-2 py-1 text-xs text-stone-200 hover:border-amber-400/40 hover:text-amber-300"
      >
        {item.ticker}
      </Link>

      <a
        href={item.url}
        target="_blank"
        rel="noreferrer noopener"
        className="min-w-0 flex-1"
      >
        <span aria-hidden className="absolute inset-0" />
        <h3 className="text-sm font-medium leading-snug text-stone-100 group-hover:text-amber-300">
          {item.headline}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-400">
          {item.summary}
        </p>

        <div className="relative z-10 mt-2 flex flex-wrap items-center gap-1.5">
          <SentimentBadge sentiment={item.sentiment} />
          <IndustryBadge industry={item.industry} />
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500">
          <span>
            <span className="text-stone-400">{item.source}</span> · {relativeTime(item.publishedAt)}
          </span>
          <ArrowUpRight
            className="h-3 w-3 text-stone-600 group-hover:text-amber-300"
            aria-hidden
          />
        </div>
      </a>
    </article>
  );
}
