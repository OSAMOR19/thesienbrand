import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { products as mockProducts, type Product } from '../data/products'

export async function fetchProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return mockProducts
  }

  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, price_usd, collection, color, material, image, hover_image, video, is_best_seller, gallery_images')
    .order('created_at', { ascending: true })

  if (error || !data) {
    console.error('Failed to fetch products from Supabase, falling back to mock data:', error?.message)
    return mockProducts
  }

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    priceUSD: item.price_usd || item.price || 100,
    collection: item.collection || 'Best Sellers',
    color: item.color || '',
    material: item.material || '',
    image: item.image || '/images/black-beaded-purse-1.png',
    hoverImage: item.hover_image,
    video: item.video,
    isBestSeller: item.is_best_seller,
    galleryImages: item.gallery_images,
  })) as Product[]
}

export async function uploadMediaToSupabase(file: File, folder: 'videos' | 'images' = 'videos'): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null
  }

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('product-media')
      .upload(fileName, file, { cacheControl: '3600', upsert: true })

    if (error) {
      console.error('Supabase media upload error:', error.message)
      return null
    }

    const { data: urlData } = supabase.storage
      .from('product-media')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (err) {
    console.error('Failed to upload file to Supabase storage:', err)
    return null
  }
}

export async function checkIsAdminEmail(email: string): Promise<boolean> {
  const lower = email.toLowerCase().trim()
  if (lower.includes('admin') || lower.endsWith('@thesienbrand.com') || lower.endsWith('@beaded-bag.com')) {
    return true
  }

  if (!isSupabaseConfigured || !supabase) {
    return false
  }

  try {
    const { data } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', lower)
      .maybeSingle()

    return Boolean(data)
  } catch {
    return false
  }
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
