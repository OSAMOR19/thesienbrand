-- 0002_storage_and_video.sql
-- Migration script to add video support, image galleries, and Supabase Storage bucket configuration

-- 1. Extend products table schema for video & enhanced media properties
alter table products add column if not exists video text;
alter table products add column if not exists image text;
alter table products add column if not exists hover_image text;
alter table products add column if not exists gallery_images text[];
alter table products add column if not exists is_best_seller boolean default false;
alter table products add column if not exists material text;

-- Allow public read access to products
drop policy if exists "Public can read products" on products;
create policy "Public can read products"
  on products for select
  using (true);

-- Allow admin insertion and update on products
drop policy if exists "Admins can insert products" on products;
create policy "Admins can insert products"
  on products for insert
  with check (true);

drop policy if exists "Admins can update products" on products;
create policy "Admins can update products"
  on products for update
  using (true);

-- 2. Create Supabase Storage Bucket for Product Videos and Images
insert into storage.buckets (id, name, public)
values ('product-media', 'product-media', true)
on conflict (id) do nothing;

-- 3. Storage Bucket Row Level Security (RLS) Policies
drop policy if exists "Public can view product media" on storage.objects;
create policy "Public can view product media"
  on storage.objects for select
  using (bucket_id = 'product-media');

drop policy if exists "Anyone can upload product media" on storage.objects;
create policy "Anyone can upload product media"
  on storage.objects for insert
  with check (bucket_id = 'product-media');

drop policy if exists "Anyone can update product media" on storage.objects;
create policy "Anyone can update product media"
  on storage.objects for update
  using (bucket_id = 'product-media');

-- 4. Seed Black Beaded Purse product with test video
insert into products (id, name, price, collection, color, shape, pattern, swatch, image, video, is_best_seller, material)
values (
  'black-beaded-purse',
  'Black Beaded Purse',
  50.00,
  'Best Sellers',
  'Black',
  'clutch',
  'plain',
  '#000000',
  '/images/black-beaded-purse-1.png',
  '/videos/black-beaded-purse.mp4',
  true,
  'Glossy Acrylic Beads'
)
on conflict (id) do update set
  video = excluded.video,
  image = excluded.image,
  is_best_seller = excluded.is_best_seller;
