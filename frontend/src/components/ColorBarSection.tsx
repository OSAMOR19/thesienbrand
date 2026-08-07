export interface ColorCard {
  name: string
  category: string
  image: string
}

export const colorCards: ColorCard[] = [
  { name: 'Black Beaded Bag', category: 'Black', image: '/images/extracted_img_4.webp' },
  { name: 'Blue Beaded Bag', category: 'Blue', image: '/images/extracted_img_7.webp' },
  { name: 'Gold Beaded Bag', category: 'Gold', image: '/images/extracted_img_14.webp' },
  { name: 'Green Beaded Bag', category: 'Green', image: '/images/extracted_img_11.webp' },
  { name: 'Pink Beaded Bag', category: 'Pink', image: '/images/extracted_img_22.webp' },
  { name: 'Red Beaded Bag', category: 'Red', image: '/images/extracted_img_6.webp' },
  { name: 'Silver Beaded Bag', category: 'Silver', image: '/images/extracted_img_16.webp' },
  { name: 'White Beaded Bag', category: 'White', image: '/images/extracted_img_9.webp' },
]

interface ColorBarSectionProps {
  onSelectCategory?: (category: string) => void
}

export default function ColorBarSection({ onSelectCategory }: ColorBarSectionProps) {
  return (
    <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
          The Beaded Bag Color Bar
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
          Shop curated color edits for every occasion—weekends, weddings, nights out. Choose your shade and let the beadwork shine.
        </p>
      </div>

      {/* Grid of 8 Color Cards matching video 00:32-00:35 */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {colorCards.map((card) => (
          <button
            key={card.name}
            onClick={() => onSelectCategory?.(card.category)}
            className="group flex flex-col items-start bg-[#F8ECE2] rounded-3xl p-3 sm:p-4 hover:shadow-md transition-all duration-300 text-left w-full cursor-pointer"
          >
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-white">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h3 className="font-extrabold text-gray-900 text-xs sm:text-sm tracking-tight font-sans group-hover:text-[#3B1E2B] transition-colors">
              {card.name}
            </h3>
          </button>
        ))}
      </div>
    </section>
  )
}

