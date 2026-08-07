import { useRef } from 'react'
import { styleHighlights } from '../data/products'

interface DiscoverStyleSectionProps {
  onOpenCollections?: () => void
  onSelectCategory?: (category: string) => void
}

export default function DiscoverStyleSection({ onOpenCollections, onSelectCategory }: DiscoverStyleSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.75
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header matching Live Screenshots 3 & 4 */}
      <div className="max-w-4xl mb-10 space-y-3">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
          Discover Your Perfect Beaded Bag
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Explore beaded styles for every day and night: <strong className="text-gray-900 font-semibold">purse, handbag, shoulder bag, crossbody bag, clutch</strong>, and <strong className="text-gray-900 font-semibold">bucket bag</strong>. Enjoy practical touches—<strong className="text-gray-900 font-semibold">zipper</strong> security, <strong className="text-gray-900 font-semibold">shoulder strap</strong> comfort, and handy <strong className="text-gray-900 font-semibold">pouch</strong> compartments—across textures from <strong className="text-gray-900 font-semibold">quilted</strong> and <strong className="text-gray-900 font-semibold">woven</strong> to sleek <strong className="text-gray-900 font-semibold">patent leather</strong>. Find your fit, from minimal minis to roomy, fashionable, durable, beautiful carryalls.
        </p>
      </div>

      {/* Style Highlights Horizontal Grid with floating Left & Right Arrow Buttons */}
      <div className="relative group">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 hidden lg:flex w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 items-center justify-center text-gray-800 hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 z-20"
          aria-label="Previous Styles"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2 snap-x snap-mandatory"
        >
          {styleHighlights.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (onSelectCategory) {
                  onSelectCategory(item.title.split(' ')[0])
                } else if (onOpenCollections) {
                  onOpenCollections()
                }
              }}
              className="flex-none w-[75vw] sm:w-[42vw] lg:w-[31%] group/card snap-start cursor-pointer text-left"
            >
              <div className="relative aspect-[3/4] bg-[#F8ECE2] rounded-3xl overflow-hidden mb-3 shadow-xs group-hover/card:shadow-md transition-shadow">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base tracking-tight font-sans group-hover/card:text-[#3B1E2B] transition-colors">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 hidden lg:flex w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 items-center justify-center text-gray-800 hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 z-20"
          aria-label="Next Styles"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}


