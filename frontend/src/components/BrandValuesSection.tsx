import { useState } from 'react'

export interface TabItem {
  id: string
  label: string
  content: string
}

export const tabs: TabItem[] = [
  {
    id: 'who-we-are',
    label: 'Who We Are',
    content:
      'At Beaded Bag®, we celebrate the beauty of beadwork paired with everyday practicality. We design pieces that feel special without feeling precious—bags you can carry to brunch, the office, or a night out, and trust to keep up with real life.',
  },
  {
    id: 'our-mission',
    label: 'Our Mission',
    content:
      'Make beaded bags you’ll actually use. That means thoughtful interiors, comfortable carry, durable construction, and silhouettes that move effortlessly from day to night—so you reach for your favorite piece again and again.',
  },
  {
    id: 'values',
    label: 'Our Values & Sustainability',
    content:
      'We believe “fewer, better” beats fast fashion. We favor small-batch runs, responsible material choices, and long-lasting construction. We work with workshops that uphold fair conditions, and we design for longevity—reinforced stress points, repair-friendly details, and packaging that’s minimal but protective.',
  },
  {
    id: 'craft-care',
    label: 'Behind the Beads: Craft & Care',
    content:
      'Go beyond the sparkle. We hand-check bead tension, reinforce high-wear areas, and line each bag for a smooth, snag-free carry. You’ll find balanced weight, soft straps, and organized compartments that make daily use a pleasure. To keep your bag pristine, we include simple care tips—and offer guidance for refreshes or repairs so your favorite stays in rotation for years.',
  },
]

export default function BrandValuesSection() {
  const [activeTabId, setActiveTabId] = useState('who-we-are')
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0]

  return (
    <section className="bg-[#E2EFE7] pb-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Interactive Pill Tabs matching Live Screenshot 3 & 4 */}
        <div className="flex flex-wrap gap-3">
          {tabs.map((t) => {
            const isActive = t.id === activeTabId
            return (
              <button
                key={t.id}
                onClick={() => setActiveTabId(t.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold font-sans transition-all ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-xs border border-gray-200'
                    : 'bg-white/50 text-gray-700 hover:bg-white/80 border border-transparent'
                }`}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Active Tab Paragraph Content */}
        <div className="pt-2">
          <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-normal max-w-4xl">
            {activeTab.content}
          </p>
        </div>
      </div>
    </section>
  )
}
