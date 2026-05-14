# Catalyst — swing-trade catalyst tracker

> *Things that move the market.*

A swing-trade catalyst tracker for earnings, FDA decisions, regulatory rulings,
contract awards, and other discrete events that move stocks on a 1-week to
6-month horizon. Built around five signals layered on top of each event:
**multi-catalyst stacking, options flow, sympathy plays, guidance trajectory,
and market-cap volatility class**.

This repository implements the foundation described in the product specification:
the full design system, the catalyst & news data model, the URL-driven filter
UI, watchlist persistence, and the page set (Today / Catalysts / Detail /
Multi / News / Watchlist / History / Settings / About).

## Status

**MVP foundation.** Renders the full UI from a static seed of catalysts and news
items so the visual language and information architecture can be reviewed
end-to-end. The ingestion layer (FMP, FDA OpenFDA, MarketAux, Tradier), the
Anthropic enrichment job, Supabase auth + sync, Stripe billing, Resend email,
and the cron-driven notification dispatcher are described in the spec and
intentionally **not yet wired** — they're the next vertical slices.

### What's working today

- Next.js 15 App Router with React Server Components + TypeScript strict
- Editorial-finance dark theme: Fraunces / Geist / JetBrains Mono, stone palette, amber accent
- Catalyst list, detail page, news feed, multi-catalyst aggregation, watchlist, history
- URL-state filters (industry, type, risk, cap, guidance, multi-only, search, ticker)
- Sympathy-ticker click-through (applies a ticker filter)
- Watchlist persisted to localStorage via Zustand (Supabase-ready abstraction)
- Mobile bottom tab bar + responsive layout, 44px touch targets
- PWA manifest + icons, viewport theming, accessible focus rings

### Next slices (per the spec)

1. **Supabase**: auth, profile, watchlist sync. Replace `lib/watchlist-store.ts`
   with a Supabase-backed API behind the same interface.
2. **Ingestion**: `lib/ingestion/{earnings,fda,news,enrichment,options}.ts`
   pulling from FMP / OpenFDA / MarketAux / Tradier into Postgres via Prisma.
3. **Anthropic enrichment**: `lib/ai/enrich-catalyst.ts` (server-side only).
   Generate `upsideThesis`, `downsideThesis`, `sympathyTickers`, `risk`. Validate
   with Zod, retry on 429/529.
4. **Notifications**: Resend templates in `emails/`, Vercel Cron at
   `/api/cron/dispatch-notifications` every 15 minutes.
5. **Stripe**: checkout for Pro tier, webhook → `profiles.subscription_tier`.
6. **Tests**: Vitest for utils, Playwright for the 5 critical flows in the spec.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. There is no auth wall yet — the watchlist persists
to localStorage.

## Stack

- **Next.js 15** App Router, RSC where possible
- **TypeScript** strict, zero `any`
- **Tailwind CSS** with custom theme tokens
- **Zustand** for client-side watchlist (persisted)
- **TanStack Query** for any client-side fetching (provider wired)
- **lucide-react** for icons, **date-fns** for date math, **framer-motion**
  available for tasteful transitions
- **Biome** for lint + format

## Directory layout

```
app/
  layout.tsx                 — root layout, font wiring, app shell
  page.tsx                   — /today dashboard
  catalysts/page.tsx         — full filterable list
  catalysts/[id]/page.tsx    — detail page (statically generated)
  news/page.tsx              — news feed with sentiment + industry filters
  multi/page.tsx             — multi-catalyst stacks
  watchlist/page.tsx         — user's starred catalysts
  history/page.tsx           — fired catalysts + outcomes
  settings/page.tsx          — notification + subscription preferences
  about/page.tsx             — methodology
  api/catalysts/route.ts     — JSON endpoint (filter-aware)
components/
  app-shell.tsx, nav-bar.tsx, bottom-tab-bar.tsx
  catalyst-card.tsx, news-card.tsx
  filter-bar.tsx, filter-pill.tsx
  watch-toggle.tsx, options-flow-row.tsx, sympathy-row.tsx
  page-header.tsx, section-heading.tsx, empty-state.tsx, query-provider.tsx
  badges/{multi-cat,type,risk,industry,cap,guidance,sentiment}-badge.tsx
lib/
  types.ts                   — domain types and label maps
  format.ts                  — date / market-cap / pct formatters
  filter.ts                  — URL → filter object → filtered list
  utils.ts                   — `cn` helper
  watchlist-store.ts         — Zustand store (localStorage today, Supabase later)
  data/catalysts.ts          — seed catalyst records
  data/news.ts               — seed news records
public/
  manifest.json, icon-*.svg, robots.txt
```

## Important constraints from the spec

These are baked into the implementation; please preserve them as the app grows.

- **Catalyst dates come from structured sources only.** Claude is for *enrichment*
  (theses, sympathy, risk), never *sourcing* (dates, tickers, market caps).
- **Server-side Anthropic only.** The API key must never ship to the browser.
- **Mobile-first.** Design every component at 375px first.
- **No `any` in TypeScript.** Use `unknown` with narrowing.
- **Persist user data to the backend.** The current localStorage watchlist is a
  prototype convenience; the `useWatchlist` interface is intentionally small
  so the swap to Supabase is a one-file change.

## License

Proprietary, all rights reserved.
