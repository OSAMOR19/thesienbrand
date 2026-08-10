import React, { useState } from 'react'

interface SignInPageProps {
  onAdminLogin?: (email: string) => void
  onBackToHome: () => void
  onGoToAdmin?: () => void
}

export default function SignInPage({ onAdminLogin, onBackToHome, onGoToAdmin }: SignInPageProps) {
  const [email, setEmail] = useState('')
  const [emailOffers, setEmailOffers] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isAdminDetected, setIsAdminDetected] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      const lower = email.toLowerCase().trim()
      if (lower.includes('admin') || lower === 'admin@thesienbrand.com') {
        setIsAdminDetected(true)
        onAdminLogin?.(email)
      } else {
        setSubmitted(true)
      }
    }
  }

  const handleQuickAdminDemo = () => {
    const adminEmail = 'admin@thesienbrand.com'
    setEmail(adminEmail)
    setIsAdminDetected(true)
    onAdminLogin?.(adminEmail)
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-4 sm:py-10 px-2 sm:px-6 min-h-[80vh] flex flex-col justify-center animate-fadeIn font-sans">
      {/* Top Navigation Breadcrumbs Bar */}
      <div className="mb-3 sm:mb-6 flex items-center justify-between text-xs font-semibold text-[#3B1E2B]/80 px-2">
        <button
          onClick={onBackToHome}
          className="hover:underline flex items-center gap-1 cursor-pointer font-extrabold text-xs sm:text-sm py-1"
        >
          ← Return to Shop
        </button>
        <span className="text-[#3B1E2B]/70 uppercase tracking-widest text-[10px] font-bold">
          Account Sign In
        </span>
      </div>

      {/* Main Glassmorphic Form Card */}
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 lg:p-12 shadow-xl sm:shadow-2xl space-y-6 sm:space-y-8 border border-white/80">
        {/* Brand Logo Header */}
        <div className="text-center space-y-2 sm:space-y-3">
          <img
            src="/images/the-sien-brand-logo.png"
            alt="The Sien Brand"
            className="h-10 sm:h-14 w-auto mx-auto object-contain"
          />
          <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
            Sign In to Your Account
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Manage your beaded handbag orders, saved favorites, and admin privileges.
          </p>
        </div>

        {isAdminDetected ? (
          <div className="bg-amber-50 text-gray-900 p-5 sm:p-8 rounded-2xl text-center space-y-4 border border-amber-200 shadow-sm animate-fadeIn">
            <div className="text-3xl sm:text-4xl">⚡</div>
            <h2 className="font-extrabold text-base sm:text-lg text-gray-900">Admin Account Verified!</h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-md mx-auto">
              Logged in as <strong className="text-gray-900 font-extrabold break-all">{email}</strong>. You have full access to store catalog, products, media uploads, and orders.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
              <button
                onClick={onGoToAdmin}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#3B1E2B] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#2B141F] transition-all cursor-pointer shadow-md active:scale-98"
              >
                Go to Admin Dashboard →
              </button>
              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gray-100 text-gray-800 font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-all cursor-pointer"
              >
                Return to Shop
              </button>
            </div>
          </div>
        ) : submitted ? (
          <div className="bg-emerald-50 text-[#3B1E2B] p-6 sm:p-8 rounded-2xl text-center space-y-3 border border-emerald-200 shadow-sm animate-fadeIn">
            <div className="text-3xl">📩</div>
            <h2 className="font-extrabold text-base text-gray-900">Check your inbox</h2>
            <p className="text-xs sm:text-sm text-gray-600">
              We sent a 6-digit login code to <strong className="text-gray-900 font-bold break-all">{email}</strong>
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs font-bold underline text-[#3B1E2B] cursor-pointer hover:text-black"
            >
              Use a different email address
            </button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Admin Demo Access Box */}
            <div className="bg-amber-50 border border-amber-200 p-3.5 sm:p-5 rounded-2xl space-y-2.5 text-center shadow-2xs">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-amber-600 text-xs">⚡</span>
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-amber-900">
                  Instant Admin Demo Access
                </span>
              </div>
              <button
                onClick={handleQuickAdminDemo}
                className="w-full py-3.5 px-4 rounded-xl sm:rounded-2xl bg-[#3B1E2B] hover:bg-[#2B141F] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md cursor-pointer active:scale-98"
              >
                Sign In as Admin
              </button>
              <p className="text-[11px] text-amber-800/80 font-semibold">
                Uses demo account: <code className="bg-amber-100/80 px-1.5 py-0.5 rounded text-amber-950 font-bold">admin@thesienbrand.com</code>
              </p>
            </div>

            {/* Continue with Shop Account */}
            <button
              onClick={() => alert('Shop Login simulated for ' + (email || 'user'))}
              className="w-full py-3.5 px-4 rounded-xl sm:rounded-2xl bg-[#5438F5] hover:bg-[#4327e0] text-white font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer active:scale-98"
            >
              Continue with Shop Account
            </button>

            {/* Divider */}
            <div className="relative py-2 flex items-center justify-center">
              <div className="w-full border-t border-gray-200" />
              <span className="absolute bg-white px-3 text-xs text-gray-400 font-medium">
                or sign in with email
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-gray-300 focus:border-[#3B1E2B] focus:ring-2 focus:ring-[#3B1E2B]/20 text-xs sm:text-sm outline-none transition-all pr-12 font-medium bg-gray-50/50 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg sm:rounded-xl bg-[#3B1E2B] hover:bg-[#2B141F] text-white flex items-center justify-center font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Submit →
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5 font-normal">
                  Tip: Use <strong className="text-gray-800">admin@thesienbrand.com</strong> to test admin privileges.
                </p>
              </div>

              {/* Email Offers Checkbox */}
              <label className="flex items-start sm:items-center gap-2.5 cursor-pointer text-xs text-gray-600 font-normal pt-1">
                <input
                  type="checkbox"
                  checked={emailOffers}
                  onChange={(e) => setEmailOffers(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#3B1E2B] focus:ring-0 cursor-pointer mt-0.5 sm:mt-0 flex-shrink-0"
                />
                <span className="leading-snug">Subscribe to new handbag drops, sales &amp; exclusive offers</span>
              </label>
            </form>
          </div>
        )}

        {/* Footer Legal Terms */}
        <div className="text-center pt-4 border-t border-gray-100 space-y-1 text-gray-500 text-[11px]">
          <p>
            By continuing, you agree to our{' '}
            <a href="#terms" className="underline text-gray-700 hover:text-black">Terms of Service</a>
          </p>
          <p>
            <a href="#privacy" className="underline text-gray-500 hover:text-black">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
