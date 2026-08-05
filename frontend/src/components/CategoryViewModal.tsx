import { useState } from 'react'
import { products, type Product } from '../data/products'
import ProductCard from './ProductCard'

interface CategoryViewModalProps {
  categoryName: string | null
  onClose: () => void
}

export default function CategoryViewModal({ categoryName, onClose }: CategoryViewModalProps) {
  const [sortOption, setSortOption] = useState<'featured' | 'price-low' | 'price-high'>('featured')

  if (!categoryName) return null

  // Filter products by collection or category keyword
  const filteredProducts = products.filter((p) => {
    const term = categoryName.toLowerCase().replace('beaded ', '')
    return (
      p.name.toLowerCase().includes(term) ||
      p.collection.toLowerCase().includes(term) ||
      p.color.toLowerCase().includes(term) ||
      p.material.toLowerCase().includes(term)
    )
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.priceUSD - b.priceUSD
    if (sortOption === 'price-high') return b.priceUSD - a.priceUSD
    return 0
  })

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white animate-fade-in">
      {/* Header Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Breadcrumb Navigation matching HTTrack collection page */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <button onClick={onClose} className="hover:text-gray-900 transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-gray-900 font-bold capitalize">{categoryName}</span>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors text-sm font-bold flex items-center gap-1"
        >
          <span>Back to Store</span>
          <span>✕</span>
        </button>
      </div>

      {/* Collection Sub-page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Collection Title Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight font-sans capitalize">
            {categoryName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Showing {sortedProducts.length} handcrafted artisan beaded bag designs
          </p>
        </div>

        {/* Filters and Sorting Toolbar matching HTTrack dump */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#F4F3EE] rounded-2xl border border-gray-100">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
            <svg className="w-4 h-4 text-[#0C3B36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filters &amp; Sort</span>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="text-xs font-medium text-gray-600">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs font-bold text-gray-800 outline-none focus:border-[#0C3B36]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid matching HTTrack Collection layout */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">
            No products found matching "{categoryName}".
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
