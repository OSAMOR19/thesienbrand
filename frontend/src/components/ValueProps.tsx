export default function ValueProps() {
  const features = [
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Premium Materials',
      description: 'High-quality faceted beads and reinforced nylon threads chosen for maximum sparkle and strength.',
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Handwoven Mastery',
      description: 'Each bag is meticulously threaded by hand, celebrating the art of traditional bead weaving.',
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Built to Shine',
      description: 'Designed with reinforced stitching to be a lasting statement piece — not just a fast-fashion accessory.',
    },
  ]

  return (
    <section className="py-14 lg:py-20 bg-[#542921] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Title Column matching Screenshot 11 */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-sans">
              Quality,<br />
              Durability<br />
              &amp; Style
            </h2>
          </div>

          {/* Right 3 Features Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item) => (
              <div key={item.title} className="space-y-3">
                <div className="mb-2">{item.icon}</div>
                <h3 className="font-extrabold text-lg text-white font-sans tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

