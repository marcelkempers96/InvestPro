import type { Catalyst } from "@/lib/types";

export interface QueryFilters {
  search: string;
  ticker: string;
  industries: string[];
  types: string[];
  risks: string[];
  caps: string[];
  guidance: string[];
  multi: boolean;
}

export function parseFiltersFromSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): QueryFilters {
  const get = (k: string): string | null => {
    if (params instanceof URLSearchParams) return params.get(k);
    const v = params[k];
    if (Array.isArray(v)) return v[0] ?? null;
    return v ?? null;
  };
  const getAll = (k: string): string[] => {
    if (params instanceof URLSearchParams) return params.getAll(k);
    const v = params[k];
    if (Array.isArray(v)) return v;
    return v ? [v] : [];
  };

  return {
    search: get("q") ?? "",
    ticker: (get("ticker") ?? "").toUpperCase(),
    industries: getAll("industry"),
    types: getAll("type"),
    risks: getAll("risk"),
    caps: getAll("cap"),
    guidance: getAll("guidance"),
    multi: get("multi") === "1",
  };
}

export function applyFilters(
  catalysts: Catalyst[],
  filters: QueryFilters,
  stackCounts: Record<string, number>,
): Catalyst[] {
  const term = filters.search.trim().toLowerCase();
  return catalysts.filter((c) => {
    if (filters.ticker && c.ticker.toUpperCase() !== filters.ticker) return false;
    if (filters.industries.length && !filters.industries.includes(c.industry)) return false;
    if (filters.types.length && !filters.types.includes(c.type)) return false;
    if (filters.risks.length && !filters.risks.includes(c.risk)) return false;
    if (filters.caps.length && !filters.caps.includes(c.marketCapClass)) return false;
    if (filters.guidance.length && !filters.guidance.includes(c.guidanceTrajectory)) return false;
    if (filters.multi && (stackCounts[c.ticker] ?? 0) < 2) return false;
    if (term) {
      const hay = `${c.ticker} ${c.company} ${c.event} ${c.upsideThesis} ${c.downsideThesis}`.toLowerCase();
      if (!hay.includes(term)) return false;
    }
    return true;
  });
}
