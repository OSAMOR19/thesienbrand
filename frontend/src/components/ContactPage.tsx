import { useState } from 'react'
import { faqs } from '../data/products'

interface ContactPageProps {
  onBackToHome: () => void
}

export default function ContactPage({ onBackToHome }: ContactPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.email && formData.message) {
      setSubmitted(true)
    }
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 animate-fadeIn font-sans">
      {/* Top Section: Form & Header matching Live Screenshot 1 */}
      <section id="contact" className="max-w-4xl space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <button
            onClick={onBackToHome}
            className="hover:text-[#0C3B36] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="text-gray-400">›</span>
          <span className="text-gray-800 font-bold">Contact</span>
        </nav>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight font-sans">
            Contact
          </h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans pt-2">
            How Can we Assist You?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal max-w-3xl">
            At <strong className="text-gray-900 font-semibold">Beaded Bag®</strong>, every question, suggestion, and comment matters. Your experience is our priority, and we're here to listen and help. Whether you're asking about a product, making a special request, or sharing feedback, our team is ready with clear, timely answers.
          </p>
        </div>

        {/* Form Container matching Live Screenshot 1 & 2 */}
        {submitted ? (
          <div className="bg-[#EBF4EE] border border-[#0C3B36]/20 text-[#0C3B36] p-8 sm:p-10 rounded-3xl text-center space-y-4">
            <div className="text-4xl">✨</div>
            <h3 className="text-2xl font-extrabold">Thank you for reaching out!</h3>
            <p className="text-sm text-gray-700 max-w-md mx-auto leading-relaxed">
              We have received your message and our support team will reply to <strong className="text-gray-900">{formData.email}</strong> within 4 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '' })
              }}
              className="mt-4 px-6 py-3 rounded-2xl bg-[#0C3B36] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#082925] transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-gray-900 bg-white text-sm outline-none transition-colors placeholder:text-gray-500 font-medium"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-gray-900 bg-white text-sm outline-none transition-colors placeholder:text-gray-500 font-medium"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-gray-900 bg-white text-sm outline-none transition-colors placeholder:text-gray-500 font-medium"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-gray-900 bg-white text-sm outline-none transition-colors placeholder:text-gray-500 font-medium"
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                required
                rows={5}
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-gray-900 bg-white text-sm outline-none transition-colors placeholder:text-gray-500 font-medium resize-none"
              />
            </div>

            {/* Send Button */}
            <div>
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#0C3B36] hover:bg-[#082925] text-white font-bold text-sm sm:text-base transition-colors shadow-xs cursor-pointer"
              >
                Send
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Middle Pale Green FAQs Block matching Live Screenshots 2 & 3 */}
      <section id="faqs" className="bg-[#EBF4EE] rounded-3xl p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Card: Availability & FAQ Button */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 space-y-6 shadow-xs border border-gray-100/60 text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug font-sans">
              Available Monday–Saturday | 9:00–18:00
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              We aim to reply within <strong className="text-gray-900 font-semibold">4 hours</strong>. Don't hesitate to reach out—every inquiry is handled with care to ensure a fast, thoughtful response
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('faqs-accordion')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full py-3.5 rounded-xl bg-[#0C3B36] hover:bg-[#082925] text-white font-bold text-sm transition-colors text-center cursor-pointer shadow-xs"
              >
                FAQs Page
              </button>
            </div>
          </div>

          {/* Right Card: Frequently Asked Questions Accordion */}
          <div id="faqs-accordion" className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-xs border border-gray-100/60 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
              Frequently asked questions
            </h3>

            <div className="divide-y divide-gray-100">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <div key={index} className="py-4 first:pt-0 last:pb-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left flex items-center justify-between font-bold text-sm sm:text-base text-gray-900 hover:text-[#0C3B36] transition-colors py-1 cursor-pointer"
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
      </section>

      {/* Bottom Section: Contact Information & Image matching Live Screenshot 4 */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4 pb-8">
        {/* Left Column: Contact Info Text */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
            Contact Information
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed font-normal">
            At <strong className="text-gray-900 font-semibold">Beaded Bag®</strong>, we're committed to making your experience smooth and enjoyable. If you have questions, suggestions, or comments, our team is here to help. We prioritize email so we can deliver detailed, thoughtful responses and keep a clear record of your requests—ensuring nothing is missed and you receive the personalized attention you deserve.
          </p>

          <div className="space-y-4 pt-2 text-xs sm:text-sm font-medium text-gray-700">
            <div className="flex items-center gap-3">
              <span className="text-base">🏠</span>
              <span>33 N Gould St, Sheridan, WY 82801, USA</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-base">✉️</span>
              <a href="mailto:info@beaded-bag.com" className="hover:text-[#0C3B36] underline">
                info@beaded-bag.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-base">⏰</span>
              <span>9:00am - 6:00pm, Mon to Sat</span>
            </div>
          </div>
        </div>

        {/* Right Column: Beaded Bag Display Image */}
        <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-sm bg-gray-100 aspect-[4/3]">
          <img
            src="/images/beaded-bag-collection-multicolor-display.webp"
            alt="Beaded Bag Collection"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  )
}
