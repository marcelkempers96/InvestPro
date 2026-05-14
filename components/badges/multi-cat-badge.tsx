import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function MultiCatBadge({ count, className }: { count: number; className?: string }) {
  if (count < 2) return null;
  return (
    <span
      title={`${count} catalysts stacked on this ticker`}
      className={cn(
        "pill border-orange-500/40 bg-orange-500/10 text-orange-300",
        className,
      )}
    >
      <Flame className="h-3 w-3" aria-hidden />
      <span>×{count}</span>
    </span>
  );
}
