import Link from "next/link";
import { Users } from "lucide-react";

export function SympathyRow({ tickers }: { tickers: string[] }) {
  if (!tickers.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-400">
      <Users className="h-3.5 w-3.5 text-stone-500" aria-hidden />
      <span className="text-stone-500">Sympathy</span>
      {tickers.map((t, i) => (
        <span key={t} className="flex items-center gap-2">
          <Link
            href={{ pathname: "/catalysts", query: { ticker: t } }}
            className="text-mono text-stone-200 hover:text-amber-300"
          >
            {t}
          </Link>
          {i < tickers.length - 1 && <span className="text-stone-700">·</span>}
        </span>
      ))}
    </div>
  );
}
