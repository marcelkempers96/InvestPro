import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { Sentiment } from "@/lib/types";
import { cn } from "@/lib/utils";

const STYLES: Record<Sentiment, { label: string; className: string; Icon: typeof TrendingUp }> = {
  bullish: {
    label: "Bullish",
    className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    Icon: TrendingUp,
  },
  bearish: {
    label: "Bearish",
    className: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    Icon: TrendingDown,
  },
  neutral: {
    label: "Neutral",
    className: "border-stone-700 bg-stone-800 text-stone-300",
    Icon: Minus,
  },
};

export function SentimentBadge({
  sentiment,
  className,
}: {
  sentiment: Sentiment;
  className?: string;
}) {
  const { Icon, label, className: styleClass } = STYLES[sentiment];
  return (
    <span className={cn("pill", styleClass, className)}>
      <Icon className="h-3 w-3" aria-hidden />
      <span>{label}</span>
    </span>
  );
}
