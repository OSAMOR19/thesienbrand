import { useState } from 'react'
import { products, type Product } from '../data/products'
import { useCurrency } from '../store/useCurrency'
import { useCartStore } from '../store/cartStore'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProduct?: (product: Product) => void
}

export default function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const { formatPrice } = useCurrency()
  const addToCart = useCartStore((s) => s.add)

  if (!isOpen) return null

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.color.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase()) ||
          p.material.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const handleAddToCart = (p: Product) => {
    addToCart(p)
    onClose()
  }

  const handleProductClick = (p: Product) => {
    onClose()
    onSelectProduct?.(p)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-fade-in">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search beaded bags, purses, clutches..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 outline-none text-base text-gray-900 placeholder:text-gray-400 font-sans"
          />
          <button onClick={onClose} className="text-sm font-medium text-gray-400 hover:text-gray-600 px-2">
            ESC
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {!query.trim() && (
            <div>
              <p className="text-xs uppercase font-semibold text-gray-400 tracking-wider mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Pearl Beaded Bag', 'Floral Purse', 'Evening Clutch', 'Shoulder Bag', 'Wood Bag'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-700 hover:bg-[#3B1E2B] hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && filtered.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No beaded bags found for "{query}".
            </div>
          )}

          {query.trim() && filtered.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs uppercase font-semibold text-gray-400 tracking-wider">
                Products ({filtered.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:border-[#3B1E2B]/30 hover:bg-[#3B1E2B]/5 transition-all group cursor-pointer"
                    onClick={() => handleProductClick(p)}
                  >
                    <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg bg-gray-100 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#3B1E2B]">{p.name}</h4>
                      <p className="text-xs text-gray-500">{p.collection}</p>
                      <p className="text-xs font-bold text-[#3B1E2B] mt-0.5">{formatPrice(p.priceUSD)}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(p)
                      }}
                      className="px-3 py-1.5 bg-[#3B1E2B] text-white text-xs rounded-full font-medium opacity-90 group-hover:opacity-100 transition-opacity"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
