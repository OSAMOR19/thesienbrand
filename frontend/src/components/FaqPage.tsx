import { useState } from 'react'

interface FaqPageProps {
  onBackToHome: () => void
  onOpenContact: () => void
  onOpenTrackOrder: () => void
}

interface FaqCategoryItem {
  question: string
  answer: string | React.ReactNode
}

interface FaqCategory {
  id: string
  title: string
  items: FaqCategoryItem[]
}

const faqData: FaqCategory[] = [
  {
    id: 'orders',
    title: 'Orders & Purchases',
    items: [
      {
        question: 'How do I cancel or edit an order?',
        answer: (
          <div className="space-y-3">
            <p>
              Unfortunately, we cannot cancel orders due to a change of mind. However, we understand that mistakes happen. If you need to edit your order information, such as the delivery address or contact number, please contact our customer service as soon as possible.
            </p>
            <p className="font-semibold">Here's what you can do:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
              <li>Contact our customer service via email address.</li>
              <li>Have your order number ready when contacting customer service.</li>
              <li>We cannot guarantee changes to orders after 24 hours of placement. This is because orders may be processed once received</li>
            </ul>
          </div>
        ),
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your bag is shipped, we’ll send you a tracking number via email. Simply enter this number on our Track Order page to follow your package in real time.',
      },
      {
        question: 'What if there is a problem with my order?',
        answer: 'If your order is damaged, defective, or incorrect, please reach out to info.beadedbag@gmail.com with your order number and photo evidence within 48 hours of delivery.',
      },
    ],
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    items: [
      {
        question: 'What is your return window?',
        answer: (
          <p>
            We accept returns within <strong className="text-gray-900 font-semibold">30 days from the delivery date</strong>. To start a return, please email us at <a href="mailto:info.beadedbag@gmail.com" className="underline hover:text-[#3B1E2B]">info.beadedbag@gmail.com</a> or use our Contact page. Please include your order number, item details, and a photo of the product.
          </p>
        ),
      },
      {
        question: 'Under what conditions can I return an item?',
        answer: 'Items must be unused, in their original condition, with all tags intact and original packaging.',
      },
      {
        question: 'Can I exchange an item instead of returning it?',
        answer: 'Yes, exchanges are available for items of equal value subject to stock availability.',
      },
      {
        question: 'What if my item arrives damaged or defective?',
        answer: 'We will immediately replace or refund any damaged or defective item at no extra cost.',
      },
      {
        question: 'How do refunds work?',
        answer: 'Once returned items are inspected, refunds are issued to your original payment method within 3–5 business days.',
      },
    ],
  },
  {
    id: 'shipping',
    title: 'Shipping & Tracking',
    items: [
      {
        question: 'How long does shipping take?',
        answer: (
          <div className="space-y-3">
            <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2 font-medium">
              <li><strong className="text-gray-900">United States:</strong> 5–10 business days</li>
              <li><strong className="text-gray-900">Europe:</strong> 7–14 business days</li>
              <li><strong className="text-gray-900">Rest of the World:</strong> 10–20 business days</li>
            </ul>
            <p className="text-xs text-gray-500 pt-1">
              Please note: tracking updates may take 5–7 working days, and delivery times may vary due to customs or local postal delays.
            </p>
          </div>
        ),
      },
      {
        question: 'Do you offer free shipping?',
        answer: 'Yes! We offer FREE shipping forever on all orders with no minimum purchase required.',
      },
      {
        question: 'Can my order ship in multiple packages?',
        answer: 'In rare cases, multi-item orders may be split into separate shipments to ensure faster delivery.',
      },
      {
        question: 'What if my package is lost or delayed?',
        answer: 'If your package hasn’t arrived within the estimated delivery frame, please contact our support team immediately.',
      },
      {
        question: 'Who pays customs or import duties?',
        answer: 'Customs duties and taxes are covered by us for most major destinations; no extra fees upon arrival.',
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payments & Security',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer: (
          <div className="space-y-3">
            <p>We accept secure payments through <strong className="text-gray-900 font-semibold">Shopify Payments</strong>, including:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
              <li><strong className="text-gray-900 font-medium">Credit & Debit Cards:</strong> Visa, MasterCard, American Express, Discover, JCB, Diners Club</li>
              <li><strong className="text-gray-900 font-medium">Digital Wallets:</strong> Apple Pay, Shop Pay, Google Pay</li>
            </ul>
          </div>
        ),
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes, all payments are processed through 256-bit SSL encryption to ensure maximum security.',
      },
      {
        question: 'When will I be charged?',
        answer: 'Your payment method is charged immediately upon placing your order.',
      },
    ],
  },
]

export default function FaqPage({ onBackToHome, onOpenContact, onOpenTrackOrder }: FaqPageProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'orders-0': true, // Open first item by default matching screenshot 2
    'returns-0': true, // Open first item matching screenshot 2 & 3
    'shipping-0': true, // Open first item matching screenshot 3
    'payments-0': true, // Open first item matching screenshot 4
  })

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn font-sans">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        <button
          onClick={onBackToHome}
          className="hover:text-[#3B1E2B] transition-colors cursor-pointer"
        >
          Home
        </button>
        <span className="text-gray-400">›</span>
        <span className="text-gray-800 font-bold">FAQs</span>
      </nav>

      {/* Main Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight font-sans">
          FAQs
        </h1>
      </div>

      {/* 5 Feature Cards Grid across Top matching Screenshot 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Track Order */}
        <div className="bg-[#F7F6F0] rounded-3xl p-6 text-center space-y-4 border border-gray-100 flex flex-col justify-between shadow-2xs">
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-gray-800">
              <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8" />
              </svg>
            </div>
            <h3 className="font-extrabold text-base text-gray-900 font-sans">Track Order</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Stay updated on your order's journey from our warehouse to your door.
            </p>
          </div>
          <button
            onClick={onOpenTrackOrder}
            className="w-full py-3 rounded-2xl bg-[#3B1E2B] hover:bg-[#2B141F] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
          >
            Track Order
          </button>
        </div>

        {/* Card 2: Contact Us */}
        <div className="bg-[#F7F6F0] rounded-3xl p-6 text-center space-y-4 border border-gray-100 flex flex-col justify-between shadow-2xs">
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-gray-800">
              <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-extrabold text-base text-gray-900 font-sans">Contact Us</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Fast, efficient support tailored to your needs. Don't hesitate to ask.
            </p>
          </div>
          <button
            onClick={onOpenContact}
            className="w-full py-3 rounded-2xl bg-[#3B1E2B] hover:bg-[#2B141F] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
          >
            Contact Us
          </button>
        </div>

        {/* Card 3: Shipping */}
        <div className="bg-[#F7F6F0] rounded-3xl p-6 text-center space-y-4 border border-gray-100 flex flex-col justify-between shadow-2xs">
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-gray-800">
              <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="font-extrabold text-base text-gray-900 font-sans">Shipping</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              We offer fast and reliable shipping options to ensure your order.
            </p>
          </div>
          <button
            onClick={() => scrollToCategory('shipping')}
            className="w-full py-3 rounded-2xl bg-[#3B1E2B] hover:bg-[#2B141F] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
          >
            Learn More
          </button>
        </div>

        {/* Card 4: Returns & Refunds */}
        <div className="bg-[#F7F6F0] rounded-3xl p-6 text-center space-y-4 border border-gray-100 flex flex-col justify-between shadow-2xs">
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-gray-800">
              <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
              </svg>
            </div>
            <h3 className="font-extrabold text-base text-gray-900 font-sans">Returns & Refunds</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Shop confidently with our easy, hassle-free returns policy.
            </p>
          </div>
          <button
            onClick={() => scrollToCategory('returns')}
            className="w-full py-3 rounded-2xl bg-[#3B1E2B] hover:bg-[#2B141F] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
          >
            Learn More
          </button>
        </div>

        {/* Card 5: Secure Payment */}
        <div className="bg-[#F7F6F0] rounded-3xl p-6 text-center space-y-4 border border-gray-100 flex flex-col justify-between shadow-2xs">
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-gray-800">
              <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-extrabold text-base text-gray-900 font-sans">Secure Payment</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Safe and secure payment methods for your peace of mind.
            </p>
          </div>
          <button
            onClick={() => scrollToCategory('payments')}
            className="w-full py-3 rounded-2xl bg-[#3B1E2B] hover:bg-[#2B141F] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Frequently Asked Questions Header matching Screenshots */}
      <div className="pt-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
          Frequently asked questions
        </h2>
      </div>

      {/* Accordion Categories Container */}
      <div className="max-w-4xl mx-auto space-y-12">
        {faqData.map((cat) => (
          <div key={cat.id} id={cat.id} className="space-y-6 pt-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center font-sans tracking-tight">
              {cat.title}
            </h3>

            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cat.items.map((item, idx) => {
                const key = `${cat.id}-${idx}`
                const isOpen = !!openItems[key]

                return (
                  <div key={idx} className="py-5">
                    <button
                      onClick={() => toggleItem(key)}
                      className="w-full text-left flex items-center justify-between font-bold text-base sm:text-lg text-gray-900 hover:text-[#3B1E2B] transition-colors py-1 cursor-pointer font-sans"
                    >
                      <span>{item.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-600 transition-transform duration-200 ml-4 flex-shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal space-y-3 pr-4">
                        {item.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
