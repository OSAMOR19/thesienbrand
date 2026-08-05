interface CollectionsBannerSectionProps {
  onOpenCollections?: () => void
}

export default function CollectionsBannerSection({ onOpenCollections }: CollectionsBannerSectionProps) {
  return (
    <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Image Column matching Live Screenshots 1 & 2 */}
        <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-sm relative aspect-[4/3] bg-[#F4F3EE]">
          <img
            src="/images/handmade-beaded-bags-display.webp"
            alt="Handmade beaded bags collection display"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        {/* Right Content Column matching Live Screenshots 1 & 2 */}
        <div className="lg:col-span-6 space-y-6 lg:pl-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
            Beaded Bag Collections for Every Moment
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
            Discover our beaded bag lineup for real life. Start with <strong className="text-gray-900 underline font-semibold">Beaded Purse</strong> pieces—polished looks with secure zipper closures and neat pouch organization. Explore <strong className="text-gray-900 underline font-semibold">Beaded Handbag</strong> styles that pair with a versatile tote bag or refined shoulder bag. Choose <strong className="text-gray-900 underline font-semibold">Beaded Shoulder Bag</strong> designs with a comfy shoulder strap and convertible wear for errands. For nights out, <strong className="text-gray-900 underline font-semibold">Beaded Crossbody Bag</strong> options balance sleek satchel structure and clutch versatility. Elevate formal outfits with a <strong className="text-gray-900 underline font-semibold">Beaded Clutch</strong> in quilted textures and premium patent leather. Weekends call for the <strong className="text-gray-900 underline font-semibold">Beaded Bucket Bag</strong>—hands-free crossbody convenience with room for essentials.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenCollections}
              className="inline-flex items-center gap-2 bg-[#0C3B36] text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm hover:bg-[#092e2b] transition-all duration-200 shadow-md group cursor-pointer"
            >
              <span>View all collections</span>
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
