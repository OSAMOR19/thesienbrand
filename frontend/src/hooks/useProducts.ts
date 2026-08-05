import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/products'
import { products as mockProducts, type Product } from '../data/products'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchProducts().then((data) => {
      if (!cancelled) {
        setProducts(data)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return { products, loading }
}
