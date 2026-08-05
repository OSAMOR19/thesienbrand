import { useState } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [emailOffers, setEmailOffers] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
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

        {/* Logo matching account.beaded-bag.com screenshot */}
        <div className="text-center pt-2">
          <h1 className="font-extrabold text-2xl tracking-tighter text-gray-900 font-sans">
            BEADED<span className="font-light">BAG</span><span className="text-xs align-top">®</span>
          </h1>
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

        {submitted ? (
          <div className="bg-emerald-50 text-[#0C3B36] p-6 rounded-2xl text-center space-y-2 border border-emerald-100">
            <div className="text-2xl">📩</div>
            <h3 className="font-extrabold text-sm">Check your inbox</h3>
            <p className="text-xs text-gray-600">
              We sent a 6-digit login code to <strong className="text-gray-900">{email}</strong>
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs font-bold underline text-[#0C3B36]"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Continue with Shop Button */}
            <button
              onClick={() => alert('Shop Login simulated for ' + email)}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#5438F5] hover:bg-[#4327e0] text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              Continue with shop
            </button>

            {/* Continue with Google Button */}
            <button
              onClick={() => alert('Google Single Sign-On simulated')}
              className="w-full py-3.5 px-4 rounded-2xl bg-white border border-gray-200 hover:border-gray-400 text-gray-800 font-bold text-sm transition-colors flex items-center justify-center gap-2.5 shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative py-2 flex items-center justify-center">
              <div className="w-full border-t border-gray-200" />
              <span className="absolute bg-white px-3 text-xs text-gray-400 font-medium">
                or
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:border-gray-900 text-sm outline-none transition-colors pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 flex items-center justify-center font-bold text-sm transition-colors"
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
                  className="w-4 h-4 rounded-md border-gray-300 text-[#0C3B36] focus:ring-0"
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
