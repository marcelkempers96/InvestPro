"use client";

import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="surface mx-auto my-12 flex max-w-md flex-col items-center gap-4 rounded-lg p-8 text-center">
      <AlertTriangle className="h-6 w-6 text-rose-400" aria-hidden />
      <div>
        <h2 className="text-display text-xl text-stone-100">Something broke</h2>
        <p className="mt-1 text-sm text-stone-500">
          {error.message || "An unexpected error occurred."}
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="rounded-md border border-amber-400/60 bg-amber-400/10 px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-400/20"
      >
        Try again
      </button>
    </div>
  );
}
