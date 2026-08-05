import { useState } from 'react'
import ProductCard from './ProductCard'
import { products } from '../data/products'

interface CollectionsPageProps {
  onSelectCategory: (name: string) => void
  onBackToHome: () => void
}

export const collectionGridCards = [
  {
    name: 'Black Beaded Bag',
    category: 'Black',
    image: '/images/black-beaded-purse-glossy-handbag-handle-813.webp',
  },
  {
    name: 'Blue Beaded Bag',
    category: 'Blue',
    image: '/images/light-blue-beaded-bag-handbag-handle-shoulder-667.webp',
  },
  {
    name: 'Gold Beaded Bag',
    category: 'Gold',
    image: '/images/gold-metallic-beaded-bag-mesh-hobo-455.webp',
  },
  {
    name: 'Green Beaded Bag',
    category: 'Green',
    image: '/images/green-beaded-purse-olive-handbag-crafted-beads-723.webp',
  },
  {
    name: 'Pearl Beaded Bags',
    category: 'Pearl',
    image: '/images/white-pearl-beaded-bag-handbag-handle-160.webp',
  },
  {
    name: 'Pink Beaded Bag',
    category: 'Pink',
    image: '/images/pink-beaded-purse-vibrant-handbag-crafted-beads-hot-783.webp',
  },
  {
    name: 'Red Beaded Bag',
    category: 'Red',
    image: '/images/beaded-floral-handbag-pink-shoulder-bag-red-216.webp',
  },
  {
    name: 'Silver Beaded Bag',
    category: 'Silver',
    image: '/images/silver-beaded-handbag-handle-256.webp',
  },
  {
    name: 'White Beaded Bag',
    category: 'White',
    image: '/images/magnolia-pearl-bag-white-embellished-handbag-handle-detachable-963.webp',
  },
  {
    name: 'Wood Beaded Bag',
    category: 'Wood',
    image: '/images/wood-beaded-bag-collection-brown-top-handle.webp',
  },
]

export default function CollectionsPage({ onSelectCategory, onBackToHome }: CollectionsPageProps) {
  const [lineupTab, setLineupTab] = useState<'Best Sellers' | 'Beaded Handbags' | 'Beaded Evening Bag'>('Best Sellers')

  const getLineupProducts = () => {
    if (lineupTab === 'Best Sellers') {
      return products.filter((p) => p.isBestSeller)
    }
    if (lineupTab === 'Beaded Handbags') {
      return products.filter((p) => p.collection === 'Handbags' || p.id.includes('handbag'))
    }
    return products.filter((p) => p.collection === 'Evening' || p.id.includes('clutch'))
  }

  const lineupProducts = getLineupProducts()

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-fadeIn font-sans">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <button onClick={onBackToHome} className="hover:text-[#0C3B36] transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-gray-900 font-bold">Collections</span>
        </div>
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-200 hover:border-gray-900 text-xs font-bold text-gray-800 transition-colors"
        >
          ← Back to Shop
        </button>
      </div>

      {/* 1. Main Collections 3-Column Grid matching Screenshots 1-4 */}
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
          Collections
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionGridCards.map((item) => (
            <div
              key={item.name}
              onClick={() => onSelectCategory(item.category)}
              className="group cursor-pointer space-y-3"
            >
              <div className="relative aspect-[3/4] bg-[#F4F3EE] rounded-3xl overflow-hidden shadow-xs group-hover:shadow-md transition-shadow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="font-extrabold text-gray-900 text-base tracking-tight font-sans group-hover:text-[#0C3B36] transition-colors">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* 2. The Lineup Section matching Screenshot 5 */}
      <div className="pt-8 border-t border-gray-200/80 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
          The Lineup
        </h2>

        {/* Lineup Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {(['Best Sellers', 'Beaded Handbags', 'Beaded Evening Bag'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setLineupTab(tab)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold font-sans transition-all whitespace-nowrap ${
                lineupTab === tab
                  ? 'bg-white text-gray-900 shadow-xs border border-gray-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Lineup Horizontal Carousel Grid */}
        <div className="flex gap-5 overflow-x-auto no-scrollbar py-2 snap-x snap-mandatory">
          {lineupProducts.map((product) => (
            <div
              key={product.id}
              className="flex-none w-[70vw] sm:w-[42vw] lg:w-[23.5%] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
