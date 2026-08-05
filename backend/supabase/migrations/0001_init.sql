-- 0001_init.sql
-- Core schema for Loop Atelier storefront.
-- Mirrors the shape consumed by frontend/src/data/products.ts so the
-- frontend can be pointed at Supabase later with no type changes.

create table if not exists collections (
  slug text primary key,
  label text not null,
  sort_order int not null default 0
);

create table if not exists products (
  id text primary key,
  name text not null,
  price numeric(10, 2) not null,
  collection text not null references collections(slug),
  color text not null,
  shape text not null check (shape in ('tote', 'clutch', 'crossbody', 'bucket', 'shoulder', 'mini')),
  pattern text not null check (pattern in ('dot', 'stripe', 'plain', 'grid')),
  swatch text not null,
  created_at timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists idx_products_collection on products(collection);

-- Row level security: products/collections are public read-only.
-- Writes happen only via the service role (admin) or edge functions.
alter table products enable row level security;
alter table collections enable row level security;
alter table newsletter_subscribers enable row level security;

create policy "Public can read products"
  on products for select
  using (true);

create policy "Public can read collections"
  on collections for select
  using (true);

-- No public select/update policy on newsletter_subscribers —
-- inserts happen only through the newsletter-subscribe edge function
-- using the service role key.
