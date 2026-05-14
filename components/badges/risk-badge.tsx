import { ShieldAlert, ShieldCheck, ShieldHalf } from "lucide-react";
import type { Risk } from "@/lib/types";
import { RISK_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";

const RISK_STYLES: Record<Risk, { className: string; Icon: typeof ShieldAlert }> = {
  low: {
    className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    Icon: ShieldCheck,
  },
  medium: {
    className: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    Icon: ShieldHalf,
  },
  high: {
    className: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    Icon: ShieldAlert,
  },
};

export function RiskBadge({ risk, className }: { risk: Risk; className?: string }) {
  const { Icon, className: styleClass } = RISK_STYLES[risk];
  return (
    <span className={cn("pill", styleClass, className)}>
      <Icon className="h-3 w-3" aria-hidden />
      <span>{RISK_LABELS[risk]}</span>
    </span>
  );
}
