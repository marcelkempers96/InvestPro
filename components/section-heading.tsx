export function SectionHeading({
  label,
  count,
  hint,
}: {
  label: string;
  count?: number;
  hint?: string;
}) {
  return (
    <div className="mb-3 mt-8 flex items-baseline justify-between">
      <div className="flex items-baseline gap-2">
        <h2 className="text-display text-sm uppercase tracking-widest text-stone-500">{label}</h2>
        {count !== undefined && (
          <span className="text-mono text-xs text-stone-700">{count}</span>
        )}
      </div>
      {hint && <span className="text-xs text-stone-600">{hint}</span>}
    </div>
  );
}
