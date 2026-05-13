export function PageHeader({
  eyebrow,
  title,
  description,
  emphasis,
  action,
}: {
  eyebrow?: string;
  title: string;
  emphasis?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-mono text-xs uppercase tracking-widest text-stone-500">
            {eyebrow}
          </p>
        )}
        <h1 className="text-display mt-1 text-3xl leading-tight text-stone-100 sm:text-4xl">
          {title}
          {emphasis && (
            <>
              {" "}
              <span className="text-italic-display text-stone-400">{emphasis}</span>
            </>
          )}
        </h1>
        {description && (
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-stone-400">
            {description}
          </p>
        )}
      </div>
      {action}
    </header>
  );
}
