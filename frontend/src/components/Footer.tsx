import React, { useState } from 'react'

interface FooterProps {
  onOpenTrackOrder?: () => void
  onOpenAuth?: () => void
  onOpenContact?: () => void
  onOpenAboutUs?: () => void
  onOpenCollections?: () => void
  onOpenBlog?: () => void
  onOpenFaq?: () => void
  onOpenPolicy?: (policy: string) => void
}

export default function Footer({
  onOpenTrackOrder,
  onOpenAuth,
  onOpenContact,
  onOpenAboutUs,
  onOpenCollections,
  onOpenBlog,
  onOpenFaq,
  onOpenPolicy,
}: FooterProps) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="font-sans">
      {/* 1. Full-Width Perks Bar matching Live Screenshot 1 & 2 */}
      <div className="bg-[#F8ECE2] py-12 border-t border-b border-[#3B1E2B]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            {/* Official Beaded Bag */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="text-[#3B1E2B] flex-shrink-0">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-base text-gray-900 font-sans tracking-tight">Official Beaded Bag®</h4>
                <p className="text-xs text-gray-600 mt-1 font-normal">Original. Timeless. Detailed.</p>
              </div>
            </div>

            {/* Free Shipping Forever */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="text-[#3B1E2B] flex-shrink-0">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-base text-gray-900 font-sans tracking-tight">Free Shipping—Forever</h4>
                <p className="text-xs text-gray-600 mt-1 font-normal">Every order ships free. No minimums.</p>
              </div>
            </div>

            {/* Secure Payment */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="text-[#3B1E2B] flex-shrink-0">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-base text-gray-900 font-sans tracking-tight">Secure Payment</h4>
                <p className="text-xs text-gray-600 mt-1 font-normal">Protected, seamless transactions.</p>
              </div>
            </div>

            {/* Easy Returns */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="text-[#3B1E2B] flex-shrink-0">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-base text-gray-900 font-sans tracking-tight">Easy Returns</h4>
                <p className="text-xs text-gray-600 mt-1 font-normal">Hassle-free 30-day policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Dark Plum Footer Section matching Theme */}
      <div className="bg-[#2B141F] text-white pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-xs sm:text-sm">
            {/* Column 1: Brand & Newsletter (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              {/* Logo */}
              <div className="bg-white/95 p-2.5 rounded-2xl inline-block max-w-[220px] shadow-md">
                <img
                  src="/images/the-sien-brand-logo.png"
                  alt="The Sien Brand"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>

              {/* Newsletter Box */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-white font-sans">
                  Get 5% off your first order!
                </h3>

                {subscribed ? (
                  <div className="bg-white/10 text-white p-3 rounded-lg text-xs font-bold">
                    ✓ Code sent to your email!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-white text-gray-900 text-xs outline-none flex-grow"
                    />
                    <button
                      type="submit"
                      className="w-11 h-11 rounded-xl bg-white text-gray-900 flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
                      aria-label="Submit Email"
                    >
                      <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </form>
                )}

                <p className="text-[11px] text-white/70 leading-relaxed font-normal max-w-xs">
                  Simply sign up for our private sales, and you will immediately receive a discount voucher valid across the entire store.
                </p>
              </div>
            </div>

            {/* Column 2: QUICK LINKS (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-white font-sans">QUICK LINKS</h4>
              <ul className="space-y-2 text-white/80 text-xs font-normal">
                <li><button onClick={onOpenTrackOrder} className="hover:text-white transition-colors">Track Order</button></li>
                <li><button onClick={onOpenAuth} className="hover:text-white transition-colors">Orders</button></li>
                <li><button onClick={onOpenContact} className="hover:text-white transition-colors">Contact</button></li>
                <li><button onClick={onOpenFaq} className="hover:text-white transition-colors">FAQs</button></li>
                <li><button onClick={onOpenAboutUs} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={onOpenCollections} className="hover:text-white transition-colors">Sitemap</button></li>
                <li><button onClick={onOpenBlog} className="hover:text-white transition-colors">Blog</button></li>
                <li><button onClick={onOpenAuth} className="hover:text-white transition-colors">Profile</button></li>
              </ul>
            </div>

            {/* Column 3: LEGAL (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-white font-sans">LEGAL</h4>
              <ul className="space-y-2 text-white/80 text-xs font-normal">
                <li><button onClick={() => onOpenPolicy?.('privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => onOpenPolicy?.('terms')} className="hover:text-white transition-colors">Terms of Service</button></li>
                <li><button onClick={() => onOpenPolicy?.('payment')} className="hover:text-white transition-colors">Payment Policy</button></li>
                <li><button onClick={() => onOpenPolicy?.('shipping')} className="hover:text-white transition-colors">Shipping Policy</button></li>
                <li><button onClick={() => onOpenPolicy?.('refund')} className="hover:text-white transition-colors">Return & Refund Policy</button></li>
              </ul>
            </div>

            {/* Column 4: CONTACT (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-white font-sans">CONTACT</h4>
              <div className="space-y-2 text-white/80 text-xs font-normal">
                <p className="font-semibold text-white/90">• Inquiries and Suggestions •</p>
                <p className="leading-relaxed">
                  For any questions or suggestions, please do not hesitate to contact us. We aim to respond within 24 hours via email.
                </p>
                <div className="space-y-1.5 pt-2">
                  <p className="flex items-center gap-2">
                    <span>🏠</span> <span>33 N Gould St, Sheridan, WY 82801, USA</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📝</span> <span>Contact form: <button onClick={onOpenContact} className="underline hover:text-white cursor-pointer">Contact Us</button></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>✉️</span> <a href="mailto:info@beaded-bag.com" className="underline hover:text-white">info@beaded-bag.com</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>🕒</span> <span>9:00am - 6:00pm, Mon to Sat</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Payment Badges & Copyright matching Live Screenshot 1 */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
            {/* Payment Icons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#1A1F71] text-white px-2 py-0.5 rounded text-[10px] font-bold">VISA</span>
              <span className="bg-[#EB001B] text-white px-2 py-0.5 rounded text-[10px] font-bold">MC</span>
              <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] font-bold"> Pay</span>
              <span className="bg-white text-gray-900 px-2 py-0.5 rounded text-[10px] font-bold">G Pay</span>
              <span className="bg-[#003087] text-white px-2 py-0.5 rounded text-[10px] font-bold">PayPal</span>
              <span className="bg-[#5A31F4] text-white px-2 py-0.5 rounded text-[10px] font-bold">shop</span>
              <span className="bg-[#006FCF] text-white px-2 py-0.5 rounded text-[10px] font-bold">AMEX</span>
              <span className="bg-[#FF6600] text-white px-2 py-0.5 rounded text-[10px] font-bold">DISCOVER</span>
            </div>

            {/* Copyright */}
            <p className="text-center sm:text-right">
              © 2026 Beaded Bag®.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
