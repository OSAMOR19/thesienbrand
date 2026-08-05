interface PolicyModalProps {
  policyType: string | null
  onClose: () => void
}

const policyContents: Record<string, { title: string; text: string }> = {
  privacy: {
    title: 'Privacy Policy',
    text: 'Beaded Bag® respects your privacy and is committed to protecting your personal data. We collect customer data solely to process orders, improve product recommendations, and provide customer support. We do not sell your personal information to third parties.',
  },
  terms: {
    title: 'Terms of Service',
    text: 'By accessing or using Beaded Bag® services, you agree to be bound by these Terms of Service. All designs, images, and content are protected by copyright. Products purchased are for personal use.',
  },
  payment: {
    title: 'Payment Policy',
    text: 'We accept major credit cards (Visa, Mastercard, AMEX), Apple Pay, Google Pay, Shop Pay, and PayPal. All transactions are encrypted via SSL for maximum security.',
  },
  shipping: {
    title: 'Shipping Policy',
    text: 'Enjoy FREE SHIPPING FOREVER on all orders worldwide! Standard delivery takes 5-10 business days. Expedited shipping is available at checkout.',
  },
  refund: {
    title: 'Return & Refund Policy',
    text: 'We offer a 30-day hassle-free return policy. If you are not completely satisfied with your beaded bag, return it in original condition for a full refund or exchange.',
  },
}

export default function PolicyModal({ policyType, onClose }: PolicyModalProps) {
  if (!policyType) return null

  const policy = policyContents[policyType] || {
    title: 'Policy Details',
    text: 'Please contact info@beaded-bag.com for any questions regarding store policies.',
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

        <div className="space-y-2">
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#3B1E2B]">
            LEGAL & POLICIES
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 font-sans tracking-tight">
            {policy.title}
          </h2>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-xs sm:text-sm text-gray-700 leading-relaxed font-normal space-y-3 max-h-[60vh] overflow-y-auto">
          <p>{policy.text}</p>
          <p className="text-gray-500 text-xs pt-2">
            Last updated: July 2026 | Beaded Bag® Official Legal Team
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#3B1E2B] text-white font-bold text-sm hover:bg-[#2B141F] transition-colors"
        >
          Close Policy Window
        </button>
      </div>
    </div>
  )
}
