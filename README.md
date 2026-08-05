# Loop Atelier

Bag/accessories storefront — a from-scratch clone of the beaded-bag.com
UX and layout, built with the frontend/backend split below.

## Structure

```
frontend/   React + TypeScript + Vite + Zustand + Tailwind storefront
backend/    Supabase schema, seed data, and edge functions
```

The two are decoupled: `frontend` runs on its own using the bundled mock
catalog in `frontend/src/data/products.ts` — no backend required to
develop or demo it. Wiring in `backend` (Supabase) upgrades the same app
to live data with zero frontend code changes, via `frontend/src/services/products.ts`.

## Quick start (frontend only)

```bash
cd frontend
npm install
npm run dev
```

## Full stack

```bash
cd backend
npm install
npm run db:start
npm run db:reset

cd ../frontend
cp .env.example .env      # fill in VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
                            # from `supabase status` output
npm install
npm run dev
```

## Stack

- **Frontend:** React 18, TypeScript, Vite, Zustand (cart state), Tailwind CSS
- **Backend:** Supabase (Postgres + RLS + Edge Functions)
- **Deploy target:** Cloudflare Pages (frontend), Supabase (backend) —
  same pattern as Marquee / DayForge

## What's replicated from the reference site

Two-tier announcement bar, sticky header with collection nav + currency
selector, hero, horizontally-scrolling best-sellers carousel, "shop by
shape" collection grid on a pale mint section, value-props strip,
testimonials, FAQ accordion, footer with newsletter capture, and a
slide-in cart drawer with quantity controls and a live subtotal.

Branding, copy, and product imagery are original — product art is
generated as SVG (`frontend/src/components/BagIllustration.tsx`) rather
than reproducing the reference site's photography, since that's the
original site's IP. Swap in your own product photos or the real logo
once you have them; every image reference lives in one place.
