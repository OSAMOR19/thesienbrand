import { create } from 'zustand'
import type { Product } from '../data/products'

export interface CartLine {
  product: Product
  qty: number
}

interface CartState {
  lines: CartLine[]
  isOpen: boolean
  open: () => void
  close: () => void
  add: (product: Product) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  subtotalUSD: () => number
  count: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  lines: [],
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  add: (product) =>
    set((state) => {
      const existing = state.lines.find((l) => l.product.id === product.id)
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l
          ),
          isOpen: true,
        }
      }
      return { lines: [...state.lines, { product, qty: 1 }], isOpen: true }
    }),
  remove: (id) => set((state) => ({ lines: state.lines.filter((l) => l.product.id !== id) })),
  setQty: (id, qty) =>
    set((state) => ({
      lines: state.lines
        .map((l) => (l.product.id === id ? { ...l, qty } : l))
        .filter((l) => l.qty > 0),
    })),
  subtotalUSD: () => get().lines.reduce((sum, l) => sum + (l.product.priceUSD || 100) * l.qty, 0),
  count: () => get().lines.reduce((sum, l) => sum + l.qty, 0),
}))
