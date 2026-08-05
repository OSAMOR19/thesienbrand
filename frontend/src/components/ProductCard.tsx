import React, { useState } from 'react'
import type { Product } from '../data/products'
import { useCartStore } from '../store/cartStore'
import { useCurrency } from '../store/useCurrency'

interface ProductCardProps {
  product: Product
  onSelectProduct?: (product: Product) => void
}

export default function ProductCard({ product, onSelectProduct }: ProductCardProps) {
  const add = useCartStore((s) => s.add)
  const { formatPrice } = useCurrency()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="group flex flex-col items-center w-full">
      {/* Product Image Container */}
      <div
        onClick={() => onSelectProduct?.(product)}
        className="relative w-full aspect-[4/5] bg-[#F4F3EE] rounded-3xl overflow-hidden mb-4 flex items-center justify-center p-6 transition-all duration-300 group-hover:shadow-lg cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="text-center w-full px-2">
        <h3
          onClick={() => onSelectProduct?.(product)}
          className="font-extrabold text-gray-900 text-sm sm:text-base tracking-tight mb-1 font-sans cursor-pointer hover:text-[#0C3B36] transition-colors"
        >
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">
          {formatPrice(product.priceUSD)}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={() => add(product)}
          className="w-full py-2.5 px-4 rounded-full border border-gray-300 hover:border-[#0C3B36] hover:bg-[#0C3B36] hover:text-white text-gray-800 text-xs sm:text-sm font-bold transition-all duration-200 shadow-2xs active:scale-95 cursor-pointer"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
