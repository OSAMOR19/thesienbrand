import { useState } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAdminLogin?: (email: string) => void
}

export default function AuthModal({ isOpen, onClose, onAdminLogin }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [emailOffers, setEmailOffers] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isAdminDetected, setIsAdminDetected] = useState(false)

  if (!isOpen) return null

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn font-sans">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl z-10 space-y-6 border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="text-center pt-2">
          <img
            src="/images/the-sien-brand-logo.png"
            alt="The Sien Brand"
            className="h-10 sm:h-12 w-auto mx-auto object-contain"
          />
        </div>

        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-gray-900 font-sans tracking-tight">
            Sign in
          </h2>
          <p className="text-xs text-gray-500 font-normal">
            Sign in or create an account
          </p>
        </div>

        {isAdminDetected ? (
          <div className="bg-amber-50 text-gray-900 p-6 rounded-2xl text-center space-y-3 border border-amber-200">
            <div className="text-3xl">⚡</div>
            <h3 className="font-extrabold text-base text-gray-900">Admin Account Verified!</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Logged in as <strong className="text-gray-900">{email}</strong>. The top-edge <strong>Admin Dashboard Access Bar</strong> is now active.
            </p>
            <button
              onClick={onClose}
              className="mt-2 w-full py-3 rounded-xl bg-[#3B1E2B] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#2B141F] transition-colors cursor-pointer"
            >
              Continue to Site &amp; Dashboard Bar →
            </button>
          </div>
        ) : submitted ? (
          <div className="bg-emerald-50 text-[#3B1E2B] p-6 rounded-2xl text-center space-y-2 border border-emerald-100">
            <div className="text-2xl">📩</div>
            <h3 className="font-extrabold text-sm">Check your inbox</h3>
            <p className="text-xs text-gray-600">
              We sent a 6-digit login code to <strong className="text-gray-900">{email}</strong>
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs font-bold underline text-[#3B1E2B]"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Quick Admin Demo Button */}
            <button
              onClick={handleQuickAdminDemo}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#3B1E2B] hover:bg-[#2B141F] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>⚡ Sign in as Admin (admin@thesienbrand.com)</span>
            </button>

            {/* Continue with Shop Button */}
            <button
              onClick={() => alert('Shop Login simulated for ' + (email || 'user'))}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#5438F5] hover:bg-[#4327e0] text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue with shop
            </button>

            {/* Divider */}
            <div className="relative py-2 flex items-center justify-center">
              <div className="w-full border-t border-gray-200" />
              <span className="absolute bg-white px-3 text-xs text-gray-400 font-medium">
                or email sign in
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter email (use admin@thesienbrand.com for admin access)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:border-gray-900 text-xs sm:text-sm outline-none transition-colors pr-12 font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                >
                  →
                </button>
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-600 font-normal">
                <input
                  type="checkbox"
                  checked={emailOffers}
                  onChange={(e) => setEmailOffers(e.target.checked)}
                  className="w-4 h-4 rounded-md border-gray-300 text-[#3B1E2B] focus:ring-0"
                />
                <span>Email me with news and offers</span>
              </label>
            </form>
          </div>
        )}

        {/* Footer Legal Terms */}
        <div className="text-center pt-2 space-y-1">
          <p className="text-[11px] text-gray-500 font-normal">
            By continuing, you agree to our{' '}
            <a href="#terms" onClick={onClose} className="underline text-gray-700">Terms of service</a>
          </p>
          <p className="text-[11px]">
            <a href="#privacy" onClick={onClose} className="underline text-gray-500">Privacy policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
