interface AboutUsPageProps {
  onBackToHome: () => void
}

export default function AboutUsPage({ onBackToHome }: AboutUsPageProps) {
  return (
    <div className="py-8 lg:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <button onClick={onBackToHome} className="hover:text-[#3B1E2B] transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-gray-900 font-bold">About Us</span>
        </div>
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-200 hover:border-gray-900 text-xs font-bold text-gray-800 transition-colors"
        >
          ← Back to Shop
        </button>
      </div>

      {/* Header Banner */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#3B1E2B]/10 text-[#3B1E2B] font-bold text-[11px] uppercase tracking-wider">
          OUR ARTISAN STORY
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight font-sans">
          About The Sien Brand®
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Crafting handmade beaded purses, shoulder bags, and luxury clutches designed to make every outfit shine.
        </p>
      </div>

      {/* Image Banner */}
      <div className="rounded-3xl overflow-hidden shadow-sm aspect-[16/9] bg-[#F8ECE2]">
        <img
          src="/images/beaded-bag-collection-multicolor-display.webp"
          alt="The Sien Brand Showcase"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Narrative Section */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xs space-y-6 text-gray-700 leading-relaxed font-normal text-sm sm:text-base">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight font-sans">
          Meticulous Craftsmanship, Modern Elegance
        </h2>
        <p>
          Founded with a passion for traditional beadweaving and contemporary fashion, <strong>The Sien Brand®</strong> creates statement accessories that stand out. Every handbag in our collection is hand-strung by master artisans using premium acrylic, wooden, metallic, and pearl beads.
        </p>
        <p>
          We believe accessories should be as durable as they are beautiful. That is why every piece undergoes strict quality control checks to ensure reinforced stitching, sturdy handles, and smooth finishes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-100 text-center">
          <div className="space-y-1">
            <span className="text-3xl font-extrabold text-[#3B1E2B]">10,000+</span>
            <p className="text-xs text-gray-500 font-medium">Happy Customers Worldwide</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-extrabold text-[#3B1E2B]">100%</span>
            <p className="text-xs text-gray-500 font-medium">Handcrafted & Quality Checked</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-extrabold text-[#3B1E2B]">FREE</span>
            <p className="text-xs text-gray-500 font-medium">Worldwide Shipping Always</p>
          </div>
        </div>
      </div>
    </div>
  )
}
