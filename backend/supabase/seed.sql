-- seed.sql
-- Mirrors frontend/src/data/products.ts exactly. If you edit product data,
-- update both files (or, once the frontend is wired to Supabase per
-- src/services/products.ts, delete the local array and this becomes the
-- single source of truth).

insert into collections (slug, label, sort_order) values
  ('Best Sellers', 'Best Sellers', 1),
  ('Handbags', 'Handbags', 2),
  ('Evening', 'Evening & Clutches', 3)
on conflict (slug) do nothing;

insert into products (id, name, price, collection, color, shape, pattern, swatch) values
  ('aurel-tote', 'Aurel Woven Tote', 210, 'Best Sellers', 'Ochre', 'tote', 'dot', '#B8863B'),
  ('marin-clutch', 'Marin Evening Clutch', 150, 'Best Sellers', 'Ink Black', 'clutch', 'plain', '#211D16'),
  ('sable-crossbody', 'Sable Crossbody', 180, 'Best Sellers', 'Clay', 'crossbody', 'stripe', '#A8462E'),
  ('perle-bucket', 'Perle Bucket Bag', 165, 'Best Sellers', 'Cream', 'bucket', 'grid', '#E4D9C6'),
  ('noor-shoulder', 'Noor Shoulder Bag', 195, 'Best Sellers', 'Bottle Green', 'shoulder', 'dot', '#34493B'),
  ('linden-mini', 'Linden Mini Bag', 120, 'Best Sellers', 'Brass', 'mini', 'plain', '#8F6528'),

  ('hazel-tote', 'Hazel Market Tote', 190, 'Handbags', 'Olive', 'tote', 'stripe', '#5C6E4F'),
  ('ines-shoulder', 'Inès Structured Shoulder Bag', 205, 'Handbags', 'Terracotta', 'shoulder', 'plain', '#B4623E'),
  ('wren-mini', 'Wren Chain Mini', 130, 'Handbags', 'Silver', 'mini', 'dot', '#9AA0A6'),
  ('opal-clutch', 'Opal Beaded Clutch', 140, 'Handbags', 'Pearl White', 'clutch', 'grid', '#EDEAE1'),
  ('faro-crossbody', 'Faro Woven Crossbody', 175, 'Handbags', 'Cognac', 'crossbody', 'stripe', '#8A5A2E'),
  ('birdie-bucket', 'Birdie Bucket Bag', 155, 'Handbags', 'Gold', 'bucket', 'dot', '#C79A3E'),

  ('dune-clutch', 'Dune Pearl Clutch', 145, 'Evening', 'Champagne', 'clutch', 'grid', '#D8C6A1'),
  ('vesper-mini', 'Vesper Evening Mini', 165, 'Evening', 'Onyx', 'mini', 'plain', '#171512'),
  ('iris-shoulder', 'Iris Beaded Shoulder Bag', 220, 'Evening', 'Emerald', 'shoulder', 'dot', '#2E5C46')
on conflict (id) do nothing;
