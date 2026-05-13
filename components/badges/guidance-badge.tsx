import { ArrowDownRight, ArrowRight, ArrowUpRight, Minus } from "lucide-react";
import type { GuidanceTrajectory } from "@/lib/types";
import { GUIDANCE_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";

const GUIDANCE_STYLES: Record<
  GuidanceTrajectory,
  { className: string; Icon: typeof ArrowUpRight }
> = {
  raised: {
    className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    Icon: ArrowUpRight,
  },
  maintained: {
    className: "border-stone-600 bg-stone-800 text-stone-300",
    Icon: ArrowRight,
  },
  lowered: {
    className: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    Icon: ArrowDownRight,
  },
  none: {
    className: "border-stone-700 bg-stone-900 text-stone-500",
    Icon: Minus,
  },
};

export function GuidanceBadge({
  trajectory,
  className,
}: {
  trajectory: GuidanceTrajectory;
  className?: string;
}) {
  const { Icon, className: styleClass } = GUIDANCE_STYLES[trajectory];
  return (
    <span className={cn("pill", styleClass, className)}>
      <Icon className="h-3 w-3" aria-hidden />
      <span>{GUIDANCE_LABELS[trajectory]}</span>
    </span>
  );
}
