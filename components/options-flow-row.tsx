import { Activity } from "lucide-react";

export function OptionsFlowRow({ value }: { value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 text-xs text-stone-400">
      <Activity className="h-3.5 w-3.5 text-stone-500" aria-hidden />
      <span className="text-stone-500">Options</span>
      <span className="text-mono text-stone-200">{value}</span>
    </div>
  );
}
