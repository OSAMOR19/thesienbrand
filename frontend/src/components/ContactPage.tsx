import { useState } from 'react'

interface ContactPageProps {
  onBackToHome: () => void
}

export default function ContactPage({ onBackToHome }: ContactPageProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true)
    }
  }

  return (
    <div className="py-8 lg:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <button onClick={onBackToHome} className="hover:text-[#0C3B36] transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-gray-900 font-bold">Contact</span>
        </div>
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-200 hover:border-gray-900 text-xs font-bold text-gray-800 transition-colors"
        >
          ← Back to Shop
        </button>
      </div>

      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0C3B36]">
          GET IN TOUCH WITH US
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
          Contact Us
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Have a question about your order, custom beaded bag requests, or shipping info? We aim to reply to all inquiries within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Cards Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#0C3B36]/10 flex items-center justify-center text-[#0C3B36] text-lg font-bold flex-shrink-0">
                📍
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-gray-900">Headquarters</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  33 N Gould St, Sheridan, WY 82801, USA
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#0C3B36]/10 flex items-center justify-center text-[#0C3B36] text-lg font-bold flex-shrink-0">
                ✉️
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-gray-900">Email Support</h4>
                <p className="text-xs text-gray-600">
                  <a href="mailto:info@beaded-bag.com" className="underline hover:text-[#0C3B36]">
                    info@beaded-bag.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#0C3B36]/10 flex items-center justify-center text-[#0C3B36] text-lg font-bold flex-shrink-0">
                🕒
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-gray-900">Business Hours</h4>
                <p className="text-xs text-gray-600">
                  9:00am - 6:00pm, Mon to Sat (GMT+1)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-100 shadow-xs">
          {submitted ? (
            <div className="bg-emerald-50 text-[#0C3B36] p-8 rounded-2xl text-center space-y-3 border border-emerald-100">
              <div className="text-3xl">✨</div>
              <h3 className="font-extrabold text-base">Thank you for reaching out!</h3>
              <p className="text-xs text-gray-600 leading-relaxed max-w-md mx-auto">
                We have received your message and our team will get back to you at <strong className="text-gray-900">{formData.email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: '', email: '', phone: '', message: '' })
                }}
                className="mt-4 px-5 py-2 rounded-xl bg-[#0C3B36] text-white text-xs font-bold"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-extrabold text-lg text-gray-900 tracking-tight">
                Send Us a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +234 801 234 5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 text-sm outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#0C3B36] hover:bg-[#082825] text-white font-bold text-sm transition-colors shadow-md"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
