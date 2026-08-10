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
      const lower = email.toLowerCase()
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
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto min-h-[75vh] flex flex-col justify-center animate-fadeIn font-sans">
      {/* Navigation Breadcrumbs */}
      <div className="mb-6 flex items-center justify-between text-xs font-semibold text-[#3B1E2B]/80">
        <button
          onClick={onBackToHome}
          className="hover:underline flex items-center gap-1 cursor-pointer font-bold"
        >
          ← Back to Shop
        </button>
        <span className="text-[#3B1E2B]/70 uppercase tracking-widest text-[10px] font-bold">Account Access</span>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 border border-white/60">
        {/* Brand Logo Header */}
        <div className="text-center space-y-3">
          <img
            src="/images/the-sien-brand-logo.png"
            alt="The Sien Brand"
            className="h-12 sm:h-14 w-auto mx-auto object-contain"
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Sign In to Your Account
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
            Manage your beaded handbag orders, saved items, and administrative privileges.
          </p>
        </div>

        {isAdminDetected ? (
          <div className="bg-amber-50 text-gray-900 p-8 rounded-2xl text-center space-y-4 border border-amber-200 shadow-sm animate-fadeIn">
            <div className="text-4xl">⚡</div>
            <h2 className="font-extrabold text-lg text-gray-900">Admin Account Verified!</h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Logged in as <strong className="text-gray-900 font-extrabold">{email}</strong>. You now have full access to manage store catalog, products, device media uploads, and orders.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onGoToAdmin}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#3B1E2B] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#2B141F] transition-all cursor-pointer shadow-md hover:scale-[1.02]"
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
          <div className="bg-emerald-50 text-[#3B1E2B] p-8 rounded-2xl text-center space-y-3 border border-emerald-200 shadow-sm animate-fadeIn">
            <div className="text-3xl">📩</div>
            <h2 className="font-extrabold text-base text-gray-900">Check your inbox</h2>
            <p className="text-xs sm:text-sm text-gray-600">
              We sent a 6-digit login code to <strong className="text-gray-900 font-bold">{email}</strong>
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs font-bold underline text-[#3B1E2B] cursor-pointer hover:text-black"
            >
              Use a different email address
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Quick Admin Demo Access */}
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-center space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                Admin Demo Access
              </span>
              <button
                onClick={handleQuickAdminDemo}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#3B1E2B] hover:bg-[#2B141F] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <span>⚡ Instant Admin Login (admin@thesienbrand.com)</span>
              </button>
            </div>

            {/* Continue with Shop Button */}
            <button
              onClick={() => alert('Shop Login simulated for ' + (email || 'user'))}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#5438F5] hover:bg-[#4327e0] text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue with Shop Account
            </button>

            {/* Divider */}
            <div className="relative py-2 flex items-center justify-center">
              <div className="w-full border-t border-gray-200" />
              <span className="absolute bg-white px-4 text-xs text-gray-400 font-medium">
                or sign in with email
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter email (use admin@thesienbrand.com for admin)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-300 focus:border-[#3B1E2B] focus:ring-2 focus:ring-[#3B1E2B]/20 text-xs sm:text-sm outline-none transition-all pr-12 font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-[#3B1E2B] hover:bg-[#2B141F] text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                >
                  →
                </button>
              </div>

              {/* Email Offers Checkbox */}
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-600 font-normal">
                <input
                  type="checkbox"
                  checked={emailOffers}
                  onChange={(e) => setEmailOffers(e.target.checked)}
                  className="w-4 h-4 rounded-md border-gray-300 text-[#3B1E2B] focus:ring-0 cursor-pointer"
                />
                <span>Subscribe to new handbag drops and exclusive offers</span>
              </label>
            </form>
          </div>
        )}

        {/* Footer Legal Terms */}
        <div className="text-center pt-4 border-t border-gray-100 space-y-1">
          <p className="text-[11px] text-gray-500 font-normal">
            By continuing, you agree to our{' '}
            <a href="#terms" className="underline text-gray-700 hover:text-black">Terms of Service</a>
          </p>
          <p className="text-[11px]">
            <a href="#privacy" className="underline text-gray-500 hover:text-black">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
