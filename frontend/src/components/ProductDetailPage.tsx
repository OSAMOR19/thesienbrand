import { useState } from 'react'
import type { Product } from '../data/products'
import { useCartStore } from '../store/cartStore'
import { useCurrency } from '../store/useCurrency'

interface ProductDetailPageProps {
  product: Product
  onBack: () => void
  onOpenContact?: () => void
}

export default function ProductDetailPage({ product, onBack, onOpenContact }: ProductDetailPageProps) {
  const add = useCartStore((s) => s.add)
  const { formatPrice } = useCurrency()

  // Gallery media setup (video + images)
  const mediaList = [
    ...(product.video ? [{ type: 'video' as const, src: product.video }] : []),
    ...(product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages.map((img) => ({ type: 'image' as const, src: img }))
      : [
          { type: 'image' as const, src: product.image },
          { type: 'image' as const, src: product.hoverImage || product.image },
          { type: 'image' as const, src: '/images/handmade-beaded-bags-display.webp' },
          { type: 'image' as const, src: '/images/beaded-bag-lifestyle-portrait-elegant-woman-white-shirt.webp' },
        ]),
  ]

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [openAccordion, setOpenAccordion] = useState<'desc' | 'shipping' | 'payment' | null>('desc')
  const [reviewsOpen, setReviewsOpen] = useState(false)
  const [userReviewText, setUserReviewText] = useState('')
  const [userReviewAuthor, setUserReviewAuthor] = useState('')
  const [submittedReview, setSubmittedReview] = useState(false)

  const handleAddToCart = () => {
    add(product)
  }

  const activeMedia = mediaList[selectedImageIndex] || mediaList[0]

  const reviewsList = [
    { name: 'Grace', title: 'Exactly what I wanted', rating: 5, date: 'July 24, 2026' },
    { name: 'Victoria', title: 'Just lovely', rating: 5, date: 'July 18, 2026' },
    { name: 'Chloe', title: 'Stunning craftsmanship & fast delivery!', rating: 5, date: 'July 10, 2026' },
    { name: 'Amara K.', title: 'Gorgeous beadwork and sturdy lining', rating: 5, date: 'June 28, 2026' },
  ]

  return (
    <div className="pb-24 pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <button onClick={onBack} className="hover:text-[#3B1E2B] transition-colors cursor-pointer">
            Home
          </button>
          <span className="text-gray-400 font-bold">/</span>
          <span className="text-gray-800 font-bold truncate max-w-xs">{product.name}</span>
        </nav>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-200 hover:border-gray-900 text-xs font-bold text-gray-800 transition-colors cursor-pointer"
        >
          ← Back
        </button>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Media Viewer & Gallery Thumbnails */}
        <div className="lg:col-span-6 space-y-4 sticky top-24">
          {/* Featured Main Media Viewer (Frameless Pure Media) */}
          <div className="relative aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center group">
            {/* Left Navigation Arrow */}
            {mediaList.length > 1 && (
              <button
                onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : mediaList.length - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-sm flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Previous Media"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Right Navigation Arrow */}
            {mediaList.length > 1 && (
              <button
                onClick={() => setSelectedImageIndex((prev) => (prev < mediaList.length - 1 ? prev + 1 : 0))}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-sm flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Next Media"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Main Featured Media Item (Video or Image) */}
            {activeMedia.type === 'video' ? (
              <video
                src={activeMedia.src}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-all duration-300"
              />
            ) : (
              <img
                src={activeMedia.src}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            )}

            {/* Pagination Dash Indicators */}
            {mediaList.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full">
                {mediaList.map((_, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                      selectedImageIndex === idx ? 'w-6 bg-white' : 'w-3 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Gallery Thumbnails Row */}
          <div className="relative flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {mediaList.map((item, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 bg-gray-100 transition-all cursor-pointer ${
                  selectedImageIndex === idx ? 'border-[#3B1E2B] scale-95 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full bg-black relative flex items-center justify-center">
                    <video src={item.src} muted className="w-full h-full object-cover opacity-80" />
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs bg-black/40">
                      ▶ VIDEO
                    </span>
                  </div>
                ) : (
                  <img src={item.src} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Purchase Options matching Screenshots 1, 2, 3 */}
        <div className="lg:col-span-6 space-y-6">
          {/* Title & Reviews Header */}
          <div className="space-y-2 border-b border-gray-100 pb-5">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-medium">
              <span className="text-amber-500 text-base">★★★★★</span>
              <span className="font-bold text-gray-900">25 reviews</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 pt-2 font-sans">
              {formatPrice(product.priceUSD)}
            </div>
            <div className="flex items-center gap-2 pt-1 text-xs font-bold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>In stock</span>
            </div>
          </div>

          {/* Color Selection Pill */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-800">Color :</span>
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-black text-white text-xs font-bold shadow-xs">
                {product.color || 'Pink'}
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 px-6 rounded-2xl bg-[#3B1E2B] hover:bg-[#2B141F] text-white font-extrabold text-sm sm:text-base transition-all cursor-pointer shadow-md active:scale-98"
            >
              Add to cart | {formatPrice(product.priceUSD)}
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full py-4 px-6 rounded-2xl bg-[#5A31F4] hover:bg-[#4823D3] text-white font-extrabold text-sm sm:text-base transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Buy with</span>
              <span className="font-black italic text-lg tracking-tight">shop</span>
            </button>
            <div className="text-center pt-1">
              <button onClick={onOpenContact} className="text-xs font-semibold text-gray-600 underline hover:text-gray-900">
                More payment options
              </button>
            </div>
          </div>

          {/* Badges Box matching Screenshot 1 & 2 */}
          <div className="border border-gray-200 rounded-2xl p-4 flex items-center justify-around text-xs font-bold text-gray-800 bg-white shadow-2xs">
            <div className="flex items-center gap-1.5">
              <span>🚚</span> <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🔄</span> <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🔒</span> <span>Secure Payment</span>
            </div>
          </div>

          {/* Delivery Timeline matching Screenshot 2 */}
          <div className="text-center bg-[#F7F6F0] rounded-2xl p-3 text-xs font-bold text-gray-700 flex items-center justify-center gap-2">
            <span>🚚</span> <span>Delivered Mon 10 Aug – Wed 12 Aug</span>
          </div>

          {/* Accepted Payment Logos matching Screenshot 2 */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-1 opacity-90">
            {['VISA', 'Mastercard', 'Apple Pay', 'G Pay', 'PayPal', 'Shop Pay', 'AMEX', 'Discover'].map((brand) => (
              <span key={brand} className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-[10px] font-extrabold text-gray-700 uppercase shadow-2xs">
                {brand}
              </span>
            ))}
          </div>

          {/* Accordion Sections matching Screenshots 2 & 3 */}
          <div className="divide-y divide-gray-100 border-t border-b border-gray-100 pt-2">
            {/* Description Accordion */}
            <div className="py-4">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'desc' ? null : 'desc')}
                className="w-full text-left flex items-center justify-between font-extrabold text-base text-gray-900 font-sans cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span>🏷️</span>
                  <span>Description</span>
                </div>
                <svg className={`w-4 h-4 transition-transform ${openAccordion === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openAccordion === 'desc' && (
                <div className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed space-y-4 font-normal">
                  <ul className="space-y-1 font-semibold text-gray-800">
                    <li>• Size: 23 x 6 x 13 cm (L x W x H)</li>
                    <li>• Material: {product.material}</li>
                    <li>• Pattern: Artisan Handcrafted Beadwork</li>
                  </ul>
                  <h3 className="font-extrabold text-lg text-gray-900 pt-2">
                    {product.name}
                  </h3>
                  <p>
                    Discover the artistry of our <strong className="text-gray-900 font-semibold">{product.name.toLowerCase()}</strong>, designed to elevate your look as a standout feminine accessory. The rich base and intricate beaded floral patterns make it a favorite among stylish womens fashion accessories.
                  </p>
                  <p>
                    Add color and charm to your wardrobe with this beautiful handcrafted piece. Designed to be carried as a sleek clutch, compact purse, or chic shoulder bag, it transitions seamlessly from day to evening.
                  </p>
                </div>
              )}
            </div>

            {/* Shipping & Returns Accordion */}
            <div className="py-4">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                className="w-full text-left flex items-center justify-between font-extrabold text-base text-gray-900 font-sans cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span>🚚</span>
                  <span>Shipping & Returns</span>
                </div>
                <svg className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openAccordion === 'shipping' && (
                <div className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2">
                  <p>• Free shipping worldwide on all orders.</p>
                  <p>• Standard delivery: 5-10 business days.</p>
                  <p>• 30-day money-back guarantee for unused items.</p>
                </div>
              )}
            </div>

            {/* Payment & Security Accordion */}
            <div className="py-4">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'payment' ? null : 'payment')}
                className="w-full text-left flex items-center justify-between font-extrabold text-base text-gray-900 font-sans cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span>🛡️</span>
                  <span>Payment & Security</span>
                </div>
                <svg className={`w-4 h-4 transition-transform ${openAccordion === 'payment' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openAccordion === 'payment' && (
                <div className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2">
                  <p>• 256-bit SSL encrypted secure checkout.</p>
                  <p>• Accepted methods: Visa, Mastercard, Apple Pay, Google Pay, PayPal, Shop Pay.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Clients Love Us Testimonials Section matching Screenshot 4 */}
      <section className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 border border-gray-100/80 space-y-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
          Clients Love Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-2xs border border-gray-100 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden font-bold flex items-center justify-center text-xs">
                SL
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900">Sofia L.</h4>
                <p className="text-xs text-gray-500">Paris, France</p>
              </div>
            </div>
            <div className="text-amber-500 text-xs">★★★★★</div>
            <h5 className="font-bold text-sm text-gray-900">Excellent product!</h5>
            <p className="text-xs text-gray-600 leading-relaxed">
              "The beadwork is gorgeous without being fragile. It carries phone, keys, card holder easily, and the shoulder strap is comfortable all day."
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xs border border-gray-100 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden font-bold flex items-center justify-center text-xs">
                MR
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900">Maya R.</h4>
                <p className="text-xs text-gray-500">New York, USA</p>
              </div>
            </div>
            <div className="text-amber-500 text-xs">★★★★★</div>
            <h5 className="font-bold text-sm text-gray-900">Day-to-Night</h5>
            <p className="text-xs text-gray-600 leading-relaxed">
              "Lightweight but structured, the bag keeps its shape and the zipper is smooth. Fits essentials and looks elevated with jeans or a slip dress."
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xs border border-gray-100 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden font-bold flex items-center justify-center text-xs">
                AK
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900">Aisha K.</h4>
                <p className="text-xs text-gray-500">Dubai, UAE</p>
              </div>
            </div>
            <div className="text-amber-500 text-xs">★★★★★</div>
            <h5 className="font-bold text-sm text-gray-900">Worth the Hype</h5>
            <p className="text-xs text-gray-600 leading-relaxed">
              "Quality exceeded expectations—secure stitching, lined interior, and beads that don't snag. Crossbody drop is perfect."
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section matching Screenshot 5 */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold text-gray-900 font-sans">Customer Reviews</h2>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-gray-900">4.8</span>
              <span className="text-amber-500">★★★★★</span>
              <span className="text-xs text-gray-500 font-medium">25 reviews</span>
            </div>
          </div>

          <button
            onClick={() => setReviewsOpen(!reviewsOpen)}
            className="px-6 py-3 rounded-2xl bg-[#3B1E2B] hover:bg-[#2B141F] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            {reviewsOpen ? 'Close Form' : 'Write a review'}
          </button>
        </div>

        {reviewsOpen && (
          <div className="bg-[#F8ECE2] rounded-2xl p-6 space-y-4 max-w-xl animate-fadeIn">
            <h3 className="font-bold text-sm text-gray-900">Share Your Experience</h3>
            {submittedReview ? (
              <div className="text-xs text-emerald-800 font-bold bg-emerald-50 p-3 rounded-xl">
                ✓ Thank you for your review! It will be published shortly.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (userReviewAuthor && userReviewText) {
                    setSubmittedReview(true)
                  }
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={userReviewAuthor}
                  onChange={(e) => setUserReviewAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs bg-white outline-none"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Write your review here..."
                  value={userReviewText}
                  onChange={(e) => setUserReviewText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs bg-white outline-none resize-none"
                />
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#3B1E2B] text-white font-bold text-xs">
                  Submit Review
                </button>
              </form>
            )}
          </div>
        )}

        <div className="divide-y divide-gray-100">
          {reviewsList.map((rev, idx) => (
            <div key={idx} className="py-6 first:pt-0 space-y-2">
              <div className="text-amber-500 text-xs">★★★★★</div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-800">
                  {rev.name[0]}
                </div>
                <span className="font-bold text-sm text-gray-900">{rev.name}</span>
                <span className="text-xs text-gray-400">• {rev.date}</span>
              </div>
              <p className="text-xs text-gray-600 font-normal">{rev.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Bar for Mobile & Scroll matching Screenshots 3 & 4 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 sm:p-4 shadow-lg flex items-center justify-center">
        <div className="max-w-xl w-full flex items-center gap-4">
          <button
            onClick={handleAddToCart}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#3B1E2B] hover:bg-[#2B141F] text-white font-extrabold text-sm sm:text-base transition-colors shadow-md cursor-pointer"
          >
            Add to cart | {formatPrice(product.priceUSD)}
          </button>
        </div>
      </div>
    </div>
  )
}
