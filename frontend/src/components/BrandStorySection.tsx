interface BrandStorySectionProps {
  onOpenCollections?: () => void
}

export default function BrandStorySection({ onOpenCollections }: BrandStorySectionProps) {
  return (
    <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Image Column matching Live Screenshot 2 */}
        <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xs relative min-h-[380px] lg:min-h-[460px] bg-[#F8ECE2]">
          <img
            src="/images/beaded-bag-collection-multicolor-display.webp"
            alt="Beaded Bag collection showcase on display stands"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        {/* Right Dark Plum Brand Card matching Theme */}
        <div className="lg:col-span-6 bg-[#3B1E2B] text-white rounded-3xl p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-xl">
          <div className="space-y-6">
            <div>
              <div className="bg-white/95 p-3 rounded-2xl inline-block max-w-[220px] shadow-lg">
                <img
                  src="/images/the-sien-brand-logo.png"
                  alt="The Sien Brand"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-white/90 font-normal">
              At <strong className="text-white font-semibold">The Sien Brand</strong>, explore artisan beaded elegance across refined <strong className="text-white">handbags</strong>, city-ready <strong className="text-white">crossbody</strong>, and evening <strong className="text-white">clutch</strong> styles, plus everyday <strong className="text-white">shoulder bag</strong> and <strong className="text-white">tote bag</strong> favorites. Discover tailored <strong className="text-white">satchel</strong> and relaxed <strong className="text-white">hobo</strong> shapes with texture-rich finishes—<strong className="text-white">quilted, woven, pebbled, metallic</strong>, and <strong className="text-white">snakeskin</strong>. Choose statement pieces like a <strong className="text-white">leather clutch</strong> or spacious <strong className="text-white">bucket bag</strong>, with <strong className="text-white">zipper closures</strong>, <strong className="text-white">shoulder strap</strong> comfort, convertible wear, and pouch organization. Premium touches include <strong className="text-white">patent leather</strong>, <strong className="text-white">embossed leather</strong>, and <strong className="text-white">vegan leather</strong>. From messenger bag to evening clutch, leather tote bag, leather shoulder bag, and smart purses—crafted for womens wardrobes.
            </p>
          </div>

          <div className="pt-8">
            <button
              onClick={onOpenCollections}
              className="inline-flex items-center gap-2.5 bg-white text-gray-900 font-bold px-6 py-3 rounded-full text-xs sm:text-sm hover:bg-gray-100 transition-all duration-200 shadow-md group cursor-pointer"
            >
              <span>Shop Beaded Bags</span>
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


