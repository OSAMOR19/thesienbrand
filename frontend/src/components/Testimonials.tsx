export const testimonialsData = [
  {
    name: 'Sofia L.',
    location: 'Paris, France',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badgeTitle: 'Excellent product!',
    quote: "The beadwork is gorgeous without being fragile. It carries phone, keys, card holder easily, and the shoulder strap is comfortable all day. I've worn it from office to cocktails.",
  },
  {
    name: 'Maya R.',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    badgeTitle: 'Day-to-Night',
    quote: 'Lightweight but structured, the bag keeps its shape and the zipper is smooth. Fits essentials and looks elevated with jeans or a slip dress. Compliments every time.',
  },
  {
    name: 'Aisha K.',
    location: 'Dubai, UAE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    badgeTitle: 'Worth the Hype',
    quote: "Quality exceeded expectations—secure stitching, lined interior, and beads that don't snag. The crossbody drop is perfect for travel days and festivals. Feels special without shouting.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-14 lg:py-20 bg-[#ECE7DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans mb-8">
          Testimonials
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-2xs border border-gray-100/80 hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  {/* Avatar + Author Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-sm font-sans">
                        {t.name} <span className="font-normal text-gray-500 text-xs">| {t.location}</span>
                      </h4>
                    </div>
                  </div>

                  {/* 5 Green Star Rating */}
                  <div className="flex gap-1 text-[#00B67A] text-sm">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  {/* Badge Title */}
                  <h3 className="font-extrabold text-gray-900 text-base font-sans tracking-tight">
                    {t.badgeTitle}
                  </h3>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Floating Arrow Button matching Screenshot 8 */}
          <button
            className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:flex w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 items-center justify-center text-gray-800 hover:bg-gray-50 transition-all"
            aria-label="Next Testimonial"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slider Pagination Indicator lines at bottom */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <span className="w-5 h-1 bg-gray-900 rounded-full" />
            <span className="w-5 h-1 bg-gray-400/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

