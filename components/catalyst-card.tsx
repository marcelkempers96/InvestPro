import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { Catalyst } from "@/lib/types";
import { countdownLabel, daysUntil, formatEventDate, formatMarketCap } from "@/lib/format";
import { cn } from "@/lib/utils";
import { CapBadge } from "@/components/badges/cap-badge";
import { GuidanceBadge } from "@/components/badges/guidance-badge";
import { IndustryBadge } from "@/components/badges/industry-badge";
import { MultiCatBadge } from "@/components/badges/multi-cat-badge";
import { RiskBadge } from "@/components/badges/risk-badge";
import { TypeBadge } from "@/components/badges/type-badge";
import { OptionsFlowRow } from "@/components/options-flow-row";
import { SympathyRow } from "@/components/sympathy-row";
import { WatchToggle } from "@/components/watch-toggle";

interface CatalystCardProps {
  catalyst: Catalyst;
  stackCount?: number;
  variant?: "compact" | "expanded";
  className?: string;
}

export function CatalystCard({
  catalyst,
  stackCount = 1,
  variant = "compact",
  className,
}: CatalystCardProps) {
  const days = daysUntil(catalyst.eventDate);
  const isPast = catalyst.status === "fired";
  const dayHighlight = !isPast && days <= 7;

  return (
    <article
      className={cn(
        "surface group relative overflow-hidden rounded-lg p-4 transition-colors",
        "hover:border-stone-700",
        dayHighlight && "border-amber-400/20",
        className,
      )}
    >
      <div className="flex gap-4">
        {/* Date column */}
        <div className="flex w-16 shrink-0 flex-col items-start gap-1">
          <span
            className={cn(
              "text-mono text-xs uppercase tracking-wide",
              dayHighlight ? "text-amber-400" : "text-stone-500",
            )}
          >
            {countdownLabel(catalyst.eventDate)}
          </span>
          <span className="text-mono text-[11px] text-stone-600">
            {formatEventDate(catalyst.eventDate)}
          </span>
        </div>

        {/* Main column */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={`/catalysts/${catalyst.id}`}
                className="inline-flex items-baseline gap-2 hover:text-amber-300"
              >
                <span className="text-mono text-base font-medium text-stone-100">
                  {catalyst.ticker}
                </span>
                <span className="truncate text-xs text-stone-500">{catalyst.company}</span>
              </Link>
              <h3
                className={cn(
                  "mt-1 text-display text-base leading-snug text-stone-100",
                  variant === "expanded" && "text-lg",
                )}
              >
                {catalyst.event}
              </h3>
            </div>
            <WatchToggle catalystId={catalyst.id} />
          </div>

          {/* Signal pills */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <MultiCatBadge count={stackCount} />
            <TypeBadge type={catalyst.type} />
            <RiskBadge risk={catalyst.risk} />
            <CapBadge cap={catalyst.marketCapClass} />
            <IndustryBadge industry={catalyst.industry} />
            {catalyst.guidanceTrajectory !== "none" && (
              <GuidanceBadge trajectory={catalyst.guidanceTrajectory} />
            )}
          </div>

          {/* Thesis row */}
          <div className="mt-3 grid gap-1.5 text-sm">
            <p className="flex gap-2 text-stone-300">
              <span className="text-mono shrink-0 text-emerald-400">▲</span>
              <span className="leading-snug">{catalyst.upsideThesis}</span>
            </p>
            <p className="flex gap-2 text-stone-300">
              <span className="text-mono shrink-0 text-rose-400">▼</span>
              <span className="leading-snug">{catalyst.downsideThesis}</span>
            </p>
          </div>

          {/* Signals */}
          {(catalyst.optionsFlow || catalyst.sympathyTickers.length > 0) && (
            <div className="mt-3 space-y-1.5 border-t border-stone-800/80 pt-3">
              <OptionsFlowRow value={catalyst.optionsFlow} />
              <SympathyRow tickers={catalyst.sympathyTickers} />
            </div>
          )}

          {/* Footer meta */}
          <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-stone-500">
            <div className="flex items-center gap-3">
              <span className="text-mono">
                Cap {formatMarketCap(catalyst.marketCapUsd)}
              </span>
              <span className="text-mono">
                Conf {catalyst.confidenceScore}%
              </span>
              {isPast && catalyst.outcomePriceChangePct !== null && (
                <span
                  className={cn(
                    "text-mono",
                    catalyst.outcomePriceChangePct > 0 ? "text-emerald-400" : "text-rose-400",
                  )}
                >
                  {catalyst.outcomePriceChangePct > 0 ? "+" : ""}
                  {catalyst.outcomePriceChangePct.toFixed(1)}%
                </span>
              )}
            </div>
            <Link
              href={`/catalysts/${catalyst.id}`}
              className="inline-flex items-center gap-0.5 text-stone-500 hover:text-stone-300"
            >
              Detail <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function CatalystCardSkeleton() {
  return (
    <div className="surface animate-pulse rounded-lg p-4">
      <div className="flex gap-4">
        <div className="w-16 space-y-2">
          <div className="h-3 w-12 rounded bg-stone-800" />
          <div className="h-2 w-10 rounded bg-stone-800" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="h-4 w-2/3 rounded bg-stone-800" />
          <div className="h-3 w-full rounded bg-stone-800" />
          <div className="flex gap-1.5">
            <div className="h-5 w-16 rounded bg-stone-800" />
            <div className="h-5 w-16 rounded bg-stone-800" />
            <div className="h-5 w-16 rounded bg-stone-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExternalSourceLink({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-amber-300"
    >
      Source <ArrowUpRight className="h-3 w-3" aria-hidden />
    </a>
  );
}
