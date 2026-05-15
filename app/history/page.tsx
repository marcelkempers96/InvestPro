import { CATALYSTS } from "@/lib/data/catalysts";
import { CatalystCard } from "@/components/catalyst-card";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";

export default function HistoryPage() {
  const fired = CATALYSTS.filter((c) => c.status === "fired").sort(
    (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime(),
  );

  const wins = fired.filter((c) => (c.outcomePriceChangePct ?? 0) > 0);
  const losses = fired.filter((c) => (c.outcomePriceChangePct ?? 0) < 0);
  const winRate = fired.length ? Math.round((wins.length / fired.length) * 100) : 0;
  const avgMove =
    fired.length > 0
      ? fired.reduce((sum, c) => sum + Math.abs(c.outcomePriceChangePct ?? 0), 0) / fired.length
      : 0;

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="History"
        title="What"
        emphasis="actually happened"
        description="Past catalysts and how the tape reacted. Use the pattern recognition to inform future setups."
      />

      {fired.length === 0 ? (
        <EmptyState
          title="No fired catalysts yet"
          description="Once events pass and we record outcomes, they'll show here."
        />
      ) : (
        <>
          <div className="surface grid grid-cols-3 gap-4 rounded-lg p-4">
            <div>
              <p className="text-mono text-xs uppercase tracking-widest text-stone-500">
                Tracked
              </p>
              <p className="text-mono mt-1 text-2xl text-stone-100">{fired.length}</p>
            </div>
            <div>
              <p className="text-mono text-xs uppercase tracking-widest text-stone-500">
                Win rate
              </p>
              <p className="text-mono mt-1 text-2xl text-emerald-400">{winRate}%</p>
              <p className="text-xs text-stone-600">
                {wins.length}W · {losses.length}L
              </p>
            </div>
            <div>
              <p className="text-mono text-xs uppercase tracking-widest text-stone-500">
                Avg |move|
              </p>
              <p className="text-mono mt-1 text-2xl text-stone-100">
                {avgMove.toFixed(1)}%
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {fired.map((c) => (
              <li key={c.id}>
                <CatalystCard catalyst={c} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
