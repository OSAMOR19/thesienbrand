import React, { useRef, useState } from 'react'
import type { Product } from '../data/products'
import ProductCard from './ProductCard'

interface ProductCarouselProps {
  id?: string
  title: string
  products: Product[]
  showTabs?: boolean
  onViewAll?: () => void
  onSelectProduct?: (product: Product) => void
}

export default function ProductCarousel({
  id = 'best-sellers',
  title,
  products,
  showTabs = false,
  onViewAll,
  onSelectProduct,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedTab, setSelectedTab] = useState('Beaded Handbag')

  const categories = [
    'Beaded Crossbody Bag',
    'Wood Beaded Bag',
    'Beaded Clutch',
    'Beaded Handbag',
    'Pearl Beaded Bag',
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const progress = scrollLeft / (scrollWidth - clientWidth)
      const index = Math.round(progress * 2)
      setActiveIndex(index)
    }
  }

  return (
    <section id={id} className="py-10 lg:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Sub-Nav Tabs rendered ONLY when showTabs is true */}
      {showTabs && (
        <div className="border-b border-gray-200/80 mb-8 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 text-xs sm:text-sm font-bold text-gray-700 whitespace-nowrap pb-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTab(cat)}
                className={`hover:text-[#0C3B36] transition-colors ${
                  selectedTab === cat ? 'text-[#0C3B36] font-extrabold border-b-2 border-[#0C3B36] pb-3 -mb-3' : 'font-semibold text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
          {showTabs ? selectedTab : title}
        </h2>
        <button
          onClick={onViewAll}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 hover:border-gray-900 text-xs sm:text-sm font-bold text-gray-800 transition-colors cursor-pointer"
        >
          <span>View all</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Carousel Wrapper with Left/Right Arrows */}
      <div className="relative group">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-3 sm:-left-5 top-1/3 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-800 hover:bg-gray-50 hover:scale-105 transition-all"
          aria-label="Previous Products"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute -right-3 sm:-right-5 top-1/3 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-800 hover:bg-gray-50 hover:scale-105 transition-all"
          aria-label="Next Products"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Horizontal Scroll Grid */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 snap-x snap-mandatory"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[23%] snap-start"
            >
              <ProductCard product={product} onSelectProduct={onSelectProduct} />
            </div>
          ))}
        </div>

        {/* Carousel Pagination Indicator Dots matching screenshot 3 */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => {
                if (scrollRef.current) {
                  const targetScroll = (scrollRef.current.scrollWidth / 3) * idx
                  scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' })
                }
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-8 bg-[#0C3B36]' : 'w-4 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
