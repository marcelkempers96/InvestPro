import { CatalystCardSkeleton } from "@/components/catalyst-card";

export default function Loading() {
  return (
    <div className="animate-fade-in space-y-3">
      <div className="h-8 w-2/3 animate-pulse rounded bg-stone-900" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-stone-900" />
      <div className="mt-6 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <CatalystCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
