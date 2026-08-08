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
      {/* Product Image / Video Container - Frameless Pure Media */}
      <div
        onClick={() => onSelectProduct?.(product)}
        className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-3 cursor-pointer group-hover:scale-[1.02] transition-transform duration-300 bg-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {product.video ? (
          <video
            src={product.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <img
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>

      {/* Product Information */}
      <div className="text-center w-full px-1 space-y-1">
        <h3
          onClick={() => onSelectProduct?.(product)}
          className="font-extrabold text-gray-900 text-sm sm:text-base tracking-tight font-sans cursor-pointer hover:text-[#3B1E2B] transition-colors line-clamp-1"
        >
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-gray-700 pb-1">
          {formatPrice(product.priceUSD)}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={() => add(product)}
          className="w-full py-2.5 px-4 rounded-full border border-gray-300 hover:border-[#3B1E2B] hover:bg-[#3B1E2B] hover:text-white text-gray-900 text-xs sm:text-sm font-bold transition-all duration-200 shadow-2xs active:scale-95 cursor-pointer bg-white"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
