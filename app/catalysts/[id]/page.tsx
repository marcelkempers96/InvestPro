import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";
import {
  CATALYSTS,
  findCatalystById,
  findCatalystsByTicker,
  tickerStackCounts,
} from "@/lib/data/catalysts";
import { NEWS } from "@/lib/data/news";
import {
  countdownLabel,
  daysUntil,
  formatLongDate,
  formatMarketCap,
} from "@/lib/format";
import { CapBadge } from "@/components/badges/cap-badge";
import { GuidanceBadge } from "@/components/badges/guidance-badge";
import { IndustryBadge } from "@/components/badges/industry-badge";
import { MultiCatBadge } from "@/components/badges/multi-cat-badge";
import { RiskBadge } from "@/components/badges/risk-badge";
import { TypeBadge } from "@/components/badges/type-badge";
import { NewsCard } from "@/components/news-card";
import { OptionsFlowRow } from "@/components/options-flow-row";
import { SympathyRow } from "@/components/sympathy-row";
import { WatchToggle } from "@/components/watch-toggle";

export async function generateStaticParams() {
  return CATALYSTS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const c = findCatalystById(id);
  if (!c) return { title: "Catalyst not found" };
  return {
    title: `${c.ticker} · ${c.event}`,
    description: `${c.upsideThesis} / ${c.downsideThesis}`,
  };
}

export default async function CatalystDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const catalyst = findCatalystById(id);
  if (!catalyst) notFound();

  const stacks = tickerStackCounts();
  const otherForTicker = findCatalystsByTicker(catalyst.ticker).filter(
    (c) => c.id !== catalyst.id && c.status === "upcoming",
  );
  const tickerNews = NEWS.filter((n) => n.ticker === catalyst.ticker).slice(0, 3);
  const days = daysUntil(catalyst.eventDate);
  const isFired = catalyst.status === "fired";

  return (
    <div className="animate-fade-in">
      <Link
        href="/catalysts"
        className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-amber-300"
      >
        <ArrowLeft className="h-3 w-3" aria-hidden /> All catalysts
      </Link>

      <header className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-mono text-2xl font-medium text-stone-100">
              {catalyst.ticker}
            </span>
            <span className="text-sm text-stone-500">{catalyst.company}</span>
          </div>
          <h1 className="text-display mt-2 text-3xl leading-tight text-stone-100">
            {catalyst.event}
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-400">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              {formatLongDate(catalyst.eventDate)}
            </span>
            <span className="text-stone-700">·</span>
            <span className={days <= 7 && !isFired ? "text-amber-400" : "text-stone-400"}>
              {countdownLabel(catalyst.eventDate)}
            </span>
            <span className="text-stone-700">·</span>
            <span className="text-mono">Confidence {catalyst.confidenceScore}%</span>
          </p>
        </div>
        <WatchToggle catalystId={catalyst.id} className="h-10 w-10" />
      </header>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <MultiCatBadge count={stacks[catalyst.ticker] ?? 1} />
        <TypeBadge type={catalyst.type} />
        <RiskBadge risk={catalyst.risk} />
        <CapBadge cap={catalyst.marketCapClass} />
        <IndustryBadge industry={catalyst.industry} />
        {catalyst.guidanceTrajectory !== "none" && (
          <GuidanceBadge trajectory={catalyst.guidanceTrajectory} />
        )}
      </div>

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <article className="surface rounded-lg p-4">
          <h3 className="text-mono text-xs uppercase tracking-widest text-emerald-400">
            ▲ Upside thesis
          </h3>
          <p className="mt-2 text-base leading-relaxed text-stone-100">
            {catalyst.upsideThesis}
          </p>
        </article>
        <article className="surface rounded-lg p-4">
          <h3 className="text-mono text-xs uppercase tracking-widest text-rose-400">
            ▼ Downside thesis
          </h3>
          <p className="mt-2 text-base leading-relaxed text-stone-100">
            {catalyst.downsideThesis}
          </p>
        </article>
      </section>

      {catalyst.note && (
        <p className="mt-4 rounded-lg border-l-2 border-amber-400/60 bg-amber-400/5 px-4 py-3 text-sm leading-relaxed text-stone-300">
          {catalyst.note}
        </p>
      )}

      <section className="surface mt-4 space-y-3 rounded-lg p-4">
        <h3 className="text-mono text-xs uppercase tracking-widest text-stone-500">Signals</h3>
        <OptionsFlowRow value={catalyst.optionsFlow} />
        <SympathyRow tickers={catalyst.sympathyTickers} />
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <ShieldAlert className="h-3.5 w-3.5 text-stone-500" aria-hidden />
          <span className="text-stone-500">Market cap</span>
          <span className="text-mono text-stone-200">
            {formatMarketCap(catalyst.marketCapUsd)}
          </span>
        </div>
      </section>

      {isFired && (
        <section className="surface mt-4 rounded-lg p-4">
          <h3 className="text-mono text-xs uppercase tracking-widest text-stone-500">
            Outcome
          </h3>
          <p className="mt-2 text-sm text-stone-200">{catalyst.outcomeSummary}</p>
          {catalyst.outcomePriceChangePct !== null && (
            <p
              className={`text-mono mt-2 text-2xl ${
                catalyst.outcomePriceChangePct > 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {catalyst.outcomePriceChangePct > 0 ? "+" : ""}
              {catalyst.outcomePriceChangePct.toFixed(1)}%
            </p>
          )}
        </section>
      )}

      {otherForTicker.length > 0 && (
        <section className="mt-8">
          <h3 className="text-mono mb-3 text-xs uppercase tracking-widest text-stone-500">
            Other catalysts on {catalyst.ticker}
          </h3>
          <ul className="space-y-2">
            {otherForTicker.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/catalysts/${c.id}`}
                  className="surface flex items-center justify-between rounded-lg p-3 hover:border-stone-700"
                >
                  <div className="flex items-center gap-3">
                    <TypeBadge type={c.type} />
                    <span className="text-sm text-stone-200">{c.event}</span>
                  </div>
                  <span className="text-mono text-xs text-stone-500">
                    {countdownLabel(c.eventDate)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tickerNews.length > 0 && (
        <section className="mt-8">
          <h3 className="text-mono mb-3 text-xs uppercase tracking-widest text-stone-500">
            Recent news on {catalyst.ticker}
          </h3>
          <ul className="space-y-3">
            {tickerNews.map((n) => (
              <li key={n.id}>
                <NewsCard item={n} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-6">
        <a
          href={catalyst.sourceUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-amber-300"
        >
          Source — investor relations <ArrowUpRight className="h-3 w-3" aria-hidden />
        </a>
      </div>
    </div>
  );
}
