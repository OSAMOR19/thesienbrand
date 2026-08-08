import { useState } from 'react'

interface TrackOrderModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TrackOrderModal({ isOpen, onClose }: TrackOrderModalProps) {
  const [orderNumber, setOrderNumber] = useState('')
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [result, setResult] = useState<string | null>(null)

  if (!isOpen) return null

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (orderNumber && emailOrPhone) {
      setResult(`Order #${orderNumber} is currently IN TRANSIT. Estimated delivery in 3-5 business days.`)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn font-sans">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 shadow-2xl z-10 space-y-6 border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Title */}
        <div className="space-y-2">
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#3B1E2B]">
            PARCELPANEL TRACKING
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-sans tracking-tight">
            Track Your Order
          </h2>
          <p className="text-xs text-gray-600 font-normal leading-relaxed">
            Enter your order number and email or phone number to check the real-time shipping status of your The Sien Brand® package.
          </p>
        </div>

        {result ? (
          <div className="bg-emerald-50 text-[#3B1E2B] p-6 rounded-2xl space-y-3 border border-emerald-100">
            <div className="flex items-center gap-2 font-extrabold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{result}</span>
            </div>
            <p className="text-xs text-gray-600">
              Tracking Number: <strong className="text-gray-900">TSB-94827103-NG</strong> (FedEx Express)
            </p>
            <button
              onClick={() => setResult(null)}
              className="mt-2 text-xs font-bold underline text-[#3B1E2B]"
            >
              Track another order
            </button>
          </div>
        ) : (
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Order Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. #9821"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 text-xs font-medium outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email or Phone Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. email@example.com"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 text-xs font-medium outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#3B1E2B] hover:bg-[#2B141F] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
            >
              Track Order Status
            </button>
          </form>
        )}

        <div className="pt-2 text-center border-t border-gray-100">
          <p className="text-[11px] text-gray-500">
            Need help? Contact support at <a href="mailto:info@thesienbrand.com" className="underline text-gray-700 font-medium">info@thesienbrand.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
