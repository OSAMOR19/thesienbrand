import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { products as mockProducts, type Product } from '../data/products'

export async function fetchProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return mockProducts
  }

  const { data, error } = await supabase
    .from('products')
    .select('id, name, price_usd, collection, color, material, image, hover_image')
    .order('created_at', { ascending: true })

  if (error || !data) {
    console.error('Failed to fetch products from Supabase, falling back to mock data:', error?.message)
    return mockProducts
  }

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    priceUSD: item.price_usd || 100,
    collection: item.collection || 'Best Sellers',
    color: item.color || '',
    material: item.material || '',
    image: item.image || '',
    hoverImage: item.hover_image,
  })) as Product[]
}

export async function subscribeToNewsletter(email: string): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { ok: true }
  }

  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/newsletter-subscribe`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    return { ok: false, error: body.error ?? 'Subscription failed' }
  }

  return { ok: true }
}
