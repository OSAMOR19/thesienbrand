import { categoryCards } from '../data/products'

export default function CollectionGrid() {
  return (
    <section className="py-10 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryCards.map((card) => (
          <a
            key={card.id}
            href={card.link}
            className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6"
          >
            {/* Background Image with subtle zoom on hover */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {/* Gradient Overlay for high readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity group-hover:opacity-90" />

            {/* Card Content */}
            <div className="relative z-10 space-y-3">
              <h3 className="text-white font-extrabold text-xl sm:text-2xl tracking-wider font-sans uppercase drop-shadow-sm">
                {card.title}
              </h3>
              <div>
                <span className="inline-flex items-center gap-2 bg-[#3B1E2B] text-white text-xs font-bold px-4 py-2 rounded-full transition-all group-hover:bg-[#2B141F] group-hover:gap-3">
                  <span>Shop now</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
