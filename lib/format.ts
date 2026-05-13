import { differenceInCalendarDays, format, formatDistanceToNowStrict, parseISO } from "date-fns";

export function formatEventDate(iso: string): string {
  return format(parseISO(iso), "EEE, MMM d");
}

export function formatShortDate(iso: string): string {
  return format(parseISO(iso), "MMM d");
}

export function formatLongDate(iso: string): string {
  return format(parseISO(iso), "EEEE, MMMM d, yyyy");
}

export function daysUntil(iso: string, from: Date = new Date()): number {
  return differenceInCalendarDays(parseISO(iso), from);
}

export function countdownLabel(iso: string, from: Date = new Date()): string {
  const days = daysUntil(iso, from);
  if (days < 0) return `${Math.abs(days)}d ago`;
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days < 7) return `In ${days}d`;
  if (days < 30) return `In ${Math.round(days / 7)}w`;
  return `In ${Math.round(days / 30)}mo`;
}

export function relativeTime(iso: string): string {
  return formatDistanceToNowStrict(parseISO(iso), { addSuffix: true });
}

export function formatMarketCap(usd: number | null): string {
  if (usd === null) return "—";
  if (usd >= 1_000_000_000_000) return `$${(usd / 1_000_000_000_000).toFixed(1)}T`;
  if (usd >= 1_000_000_000) return `$${(usd / 1_000_000_000).toFixed(1)}B`;
  if (usd >= 1_000_000) return `$${(usd / 1_000_000).toFixed(0)}M`;
  return `$${usd.toLocaleString()}`;
}

export function formatPct(value: number | null, withSign = true): string {
  if (value === null || value === undefined) return "—";
  const sign = withSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}
