interface HeroProps {
  onOpenCollections?: () => void
}

export default function Hero({ onOpenCollections }: HeroProps) {
  return (
    <section className="relative min-h-[560px] lg:min-h-[640px] flex items-center justify-start overflow-hidden bg-gradient-to-r from-sky-100 via-sky-50 to-blue-50">
      {/* Background Image of Model carrying Lemon Beaded Bag */}
      <img
        src="/images/extracted_img_3.webp"
        alt="Beaded Bag lifestyle background"
        className="absolute inset-0 w-full h-full object-cover object-right lg:object-center opacity-90"
      />

      {/* Subtle overlay gradient to keep text crystal clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent lg:from-black/50 lg:via-black/10" />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 lg:py-24 w-full">
        <div className="max-w-xl space-y-6 text-white animate-fade-in">
          {/* Top Badge Text matching Live Screenshot 2 */}
          <div>
            <span className="font-semibold text-xs sm:text-sm tracking-wide text-white/95 uppercase drop-shadow-xs">
              +10K Satisfied Clients
            </span>
          </div>

          {/* Trustpilot Rating Card matching Live Screenshot 2 */}
          <div className="inline-flex items-center gap-2.5 bg-white text-gray-900 px-3.5 py-1.5 rounded-xl shadow-lg border border-gray-100">
            <div className="flex gap-0.5 bg-[#00B67A] p-1 rounded-xs">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-bold text-gray-800">Rated 4.7/5</span>
            <span className="text-xs font-bold text-[#00B67A] flex items-center gap-1">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0l3.09 9.51H24l-7.54 5.48L19.55 24 12 18.51 4.45 24l3.09-9.01L0 9.51h8.91z" />
              </svg>
              Trustpilot
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans drop-shadow-md">
            Handcrafted Beaded Bags: Minimal. Elegant. Iconic.
          </h1>

          {/* Shop Button */}
          <div className="pt-2">
            <button
              onClick={onOpenCollections}
              className="inline-flex items-center gap-2 bg-[#3B1E2B] text-white font-extrabold px-8 py-4 rounded-2xl text-sm hover:bg-[#2B141F] transition-all duration-200 shadow-xl cursor-pointer"
            >
              <span>Explore All Collections</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
