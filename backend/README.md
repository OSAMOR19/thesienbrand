# Loop Atelier — Backend

Supabase project: schema, seed data, and one edge function for the
storefront in `../frontend`.

## Structure

```
supabase/
  migrations/0001_init.sql   products, collections, newsletter_subscribers + RLS
  seed.sql                   product catalog, mirrors frontend/src/data/products.ts
  functions/
    newsletter-subscribe/    edge function backing the footer signup form
  config.toml                 local dev ports
```

## Local development

Requires the [Supabase CLI](https://supabase.com/docs/guides/cli).

```bash
npm run db:start     # boots local Postgres + Studio via Docker
npm run db:reset      # applies migrations + seed.sql
npm run functions:serve
```

Studio runs at `http://localhost:54323`, API at `http://localhost:54321`.
`supabase start` prints the local anon key — copy it into
`frontend/.env` as `VITE_SUPABASE_ANON_KEY`.

## Deploying

```bash
supabase link --project-ref <your-project-ref>
supabase db push
npm run functions:deploy
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<from project settings>
```

## Notes

- RLS is on for every table. `products`/`collections` are public read-only.
  `newsletter_subscribers` has no public policy — inserts only happen
  through the edge function using the service role key, so the key never
  reaches the browser.
- The `products.collection` column intentionally stores the display label
  ("Best Sellers", "Handbags", "Evening") rather than a separate numeric
  FK, to match the grouping used by the frontend carousels. If this grows
  past a handful of collections, normalize it to an id.
