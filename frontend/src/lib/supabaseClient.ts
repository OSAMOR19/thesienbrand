import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Supabase is optional for local/demo use — the app runs fine on the
// bundled mock data in `src/data/products.ts` with no env vars set.
// Set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (see .env.example) to
// point the storefront at the schema in backend/supabase instead.
export const supabase = url && anonKey ? createClient(url, anonKey) : null

export const isSupabaseConfigured = Boolean(supabase)
