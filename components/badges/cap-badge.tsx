import type { MarketCapClass } from "@/lib/types";
import { CAP_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";

// Volatility-encoded color: micro caps move 3-5x more than mega on the same news.
const CAP_STYLES: Record<MarketCapClass, string> = {
  micro: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  small: "border-orange-500/40 bg-orange-500/10 text-orange-300",
  mid: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  large: "border-blue-500/40 bg-blue-500/10 text-blue-300",
  mega: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
};

export function CapBadge({
  cap,
  className,
}: {
  cap: MarketCapClass;
  className?: string;
}) {
  return <span className={cn("pill", CAP_STYLES[cap], className)}>{CAP_LABELS[cap]} cap</span>;
}
