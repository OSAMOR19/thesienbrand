import { useState } from 'react'
import { faqs } from '../data/products'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="faqs" className="py-14 lg:py-20 bg-[#E2EFE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left White Card matching Live Screenshot 3 */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-xs border border-gray-100/80 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
              Need Help or Have a Question?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm mx-auto font-normal">
              We value clarity and trust. Find quick answers to help you choose your perfect beret — or <strong className="text-gray-900 font-semibold">contact us</strong> for more details.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href="#contact"
                className="block w-full py-3.5 rounded-xl bg-[#0C3B36] text-white font-bold text-xs sm:text-sm hover:bg-[#082925] transition-colors text-center shadow-xs"
              >
                Contact Us
              </a>
              <a
                href="#faqs"
                className="block w-full py-3.5 rounded-xl border border-gray-200 text-gray-800 font-bold text-xs sm:text-sm hover:border-gray-900 transition-colors text-center"
              >
                FAQs Page
              </a>
            </div>
          </div>

          {/* Right White Card matching Live Screenshot 3 */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xs border border-gray-100/80">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans mb-6">
              Frequently asked questions
            </h2>

            <div className="divide-y divide-gray-100">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i
                return (
                  <div key={i} className="py-4 first:pt-0 last:pb-0">
                    <button
                      onClick={() => toggle(i)}
                      className="w-full text-left flex items-center justify-between font-bold text-sm sm:text-base text-gray-900 font-sans hover:text-[#0C3B36] transition-colors py-1"
                    >
                      <span>{faq.q}</span>
                      <svg
                        className={`w-4 h-4 text-gray-600 transition-transform duration-200 ml-4 flex-shrink-0 ${
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
                      <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                        {faq.a}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
