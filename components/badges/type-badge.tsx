import {
  Activity,
  Beaker,
  Calendar,
  FileSignature,
  Globe2,
  Megaphone,
  Sparkles,
} from "lucide-react";
import type { CatalystType } from "@/lib/types";
import { TYPE_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";

const TYPE_STYLES: Record<CatalystType, { className: string; Icon: typeof Activity }> = {
  earnings: {
    className: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    Icon: Activity,
  },
  fda: {
    className: "border-violet-500/40 bg-violet-500/10 text-violet-300",
    Icon: Beaker,
  },
  regulatory: {
    className: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    Icon: FileSignature,
  },
  contract: {
    className: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    Icon: Megaphone,
  },
  product: {
    className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    Icon: Sparkles,
  },
  macro: {
    className: "border-stone-500/40 bg-stone-500/10 text-stone-200",
    Icon: Globe2,
  },
  other: {
    className: "border-stone-700 bg-stone-800 text-stone-300",
    Icon: Calendar,
  },
};

export function TypeBadge({ type, className }: { type: CatalystType; className?: string }) {
  const { Icon, className: styleClass } = TYPE_STYLES[type];
  return (
    <span className={cn("pill", styleClass, className)}>
      <Icon className="h-3 w-3" aria-hidden />
      <span>{TYPE_LABELS[type]}</span>
    </span>
  );
}
