"use client";

import { Star } from "lucide-react";
import { useWatchlist } from "@/lib/watchlist-store";
import { cn } from "@/lib/utils";

export function WatchToggle({
  catalystId,
  className,
}: {
  catalystId: string;
  className?: string;
}) {
  const ids = useWatchlist((s) => s.ids);
  const toggle = useWatchlist((s) => s.toggle);
  const watched = ids.includes(catalystId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(catalystId);
      }}
      aria-label={watched ? "Remove from watchlist" : "Add to watchlist"}
      aria-pressed={watched}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors",
        watched
          ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
          : "border-stone-800 text-stone-500 hover:border-stone-700 hover:text-stone-300",
        className,
      )}
    >
      <Star className={cn("h-4 w-4", watched && "fill-current")} aria-hidden />
    </button>
  );
}
