import { CATALYSTS, tickerStackCounts } from "@/lib/data/catalysts";
import { applyFilters, parseFiltersFromSearchParams } from "@/lib/filter";
import { daysUntil } from "@/lib/format";
import { CatalystCard } from "@/components/catalyst-card";
import { EmptyState } from "@/components/empty-state";
import { FilterBar } from "@/components/filter-bar";
import { PageHeader } from "@/components/page-header";

export const revalidate = 900;

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CatalystsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const filters = parseFiltersFromSearchParams(sp);
  const stacks = tickerStackCounts();

  const upcoming = CATALYSTS.filter((c) => c.status === "upcoming").sort(
    (a, b) => daysUntil(a.eventDate) - daysUntil(b.eventDate),
  );

  const filtered = applyFilters(upcoming, filters, stacks);

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Catalysts"
        title="The full"
        emphasis="catalyst calendar"
        description="Every upcoming catalyst we're tracking. Filter by industry, risk, market-cap class, or guidance trajectory."
      />

      <FilterBar />

      <div className="mt-6 mb-3 flex items-baseline justify-between">
        <h2 className="text-mono text-xs uppercase tracking-widest text-stone-500">
          Results <span className="text-stone-700">{filtered.length}</span>
        </h2>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No catalysts match"
          description="Try removing a filter or broadening your search term."
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((c) => (
            <li key={c.id}>
              <CatalystCard catalyst={c} stackCount={stacks[c.ticker] ?? 1} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
