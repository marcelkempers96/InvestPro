import { Telescope } from "lucide-react";

export function EmptyState({
  title = "Nothing here yet",
  description,
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="surface flex flex-col items-center gap-3 rounded-lg py-16 text-center">
      <Telescope className="h-7 w-7 text-stone-700" aria-hidden />
      <div>
        <p className="text-display text-lg text-stone-200">{title}</p>
        {description && (
          <p className="mt-1 text-sm text-stone-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
