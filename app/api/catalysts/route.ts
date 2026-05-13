import { NextResponse } from "next/server";
import { CATALYSTS, tickerStackCounts } from "@/lib/data/catalysts";
import { applyFilters, parseFiltersFromSearchParams } from "@/lib/filter";

// In production this would query the Postgres `catalysts` table via Prisma.
// For the static prototype we serve the seed data and respect the URL filters.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const filters = parseFiltersFromSearchParams(url.searchParams);
  const stacks = tickerStackCounts();
  const items = applyFilters(
    CATALYSTS.filter((c) => c.status === "upcoming"),
    filters,
    stacks,
  );
  return NextResponse.json({ items, total: items.length });
}
