import type { Industry } from "@/lib/types";
import { INDUSTRY_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";

export function IndustryBadge({
  industry,
  className,
}: {
  industry: Industry;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "pill border-stone-700 bg-stone-900/80 text-stone-300",
        className,
      )}
    >
      {INDUSTRY_LABELS[industry]}
    </span>
  );
}
