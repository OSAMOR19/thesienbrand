import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { useCurrency } from '../store/useCurrency'

interface HeaderProps {
  onOpenCurrency: () => void
  onOpenSearch: () => void
  onOpenAuth?: () => void
  onOpenCollections?: () => void
  onGoHome?: () => void
  onSelectCategory: (name: string) => void
}

export default function Header({
  onOpenCurrency,
  onOpenSearch,
  onOpenAuth,
  onOpenCollections,
  onGoHome,
  onSelectCategory,
}: HeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = useCartStore((s) => s.count())
  const openCart = useCartStore((s) => s.open)
  const { currentCurrency } = useCurrency()

  const shopByType = [
    { name: 'Beaded Purse', category: 'Purse' },
    { name: 'Beaded Handbag', category: 'Handbag' },
    { name: 'Beaded Shoulder Bag', category: 'Shoulder Bag' },
    { name: 'Beaded Tote Bag', category: 'Tote' },
    { name: 'Beaded Crossbody Bag', category: 'Crossbody' },
    { name: 'Beaded Mini Bag', category: 'Mini' },
    { name: 'Beaded Clutch', category: 'Clutch' },
    { name: 'Beaded Evening Bag', category: 'Evening' },
    { name: 'Beaded Bucket Bag', category: 'Bucket' },
  ]

  const shopByColor = [
    { name: 'Black Beaded Bag', color: '#111111', category: 'Black' },
    { name: 'White Beaded Bag', color: '#FFFFFF', category: 'White' },
    { name: 'Pink Beaded Bag', color: '#FFB6C1', category: 'Pink' },
    { name: 'Blue Beaded Bag', color: '#4682B4', category: 'Blue' },
    { name: 'Gold Beaded Bag', color: '#D4AF37', category: 'Gold' },
    { name: 'Green Beaded Bag', color: '#2E8B57', category: 'Green' },
    { name: 'Red Beaded Bag', color: '#DC143C', category: 'Red' },
    { name: 'Silver Beaded Bag', color: '#C0C0C0', category: 'Silver' },
  ]

  const shopByMaterial = [
    { name: 'Acrylic Bead Bag', desc: 'Lightweight & durable shine', category: 'Acrylic' },
    { name: 'Wood Beaded Bag', desc: 'Natural artisan wooden beads', category: 'Wood' },
    { name: 'Pearl Beaded Bags', desc: 'Classic lustrous faux pearls', category: 'Pearl' },
  ]

  const handleCategoryClick = (category: string) => {
    setActiveDropdown(null)
    setMobileMenuOpen(false)
    onSelectCategory(category)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-shadow duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-[#0C3B36]"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>

        {/* Official Logo matching live site */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/images/beaded-bag-logo.png"
            alt="Beaded Bag®"
            className="h-7 sm:h-8 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const fallback = e.currentTarget.nextElementSibling
              if (fallback) fallback.classList.remove('hidden')
            }}
          />
          <span className="hidden font-extrabold text-xl sm:text-2xl tracking-tighter text-[#0C1A17] font-sans items-center">
            BEADED<span className="font-light tracking-tight">BAG</span>
            <span className="text-[10px] align-top text-[#0C3B36] font-bold ml-0.5">®</span>
          </span>
        </button>

        {/* Desktop Main Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-bold tracking-wider text-gray-800 uppercase">
          <button
            onClick={onOpenCollections}
            className="hover:text-[#0C3B36] transition-colors py-2 uppercase cursor-pointer"
          >
            ALL BEADED BAGS
          </button>

          {/* SHOP BY TYPE Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('type')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-[#0C3B36] transition-colors uppercase">
              SHOP BY TYPE
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'type' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {activeDropdown === 'type' && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-2xl p-4 border border-gray-100 animate-fade-in divide-y divide-gray-50">
                <div className="py-1">
                  {shopByType.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleCategoryClick(item.category)}
                      className="w-full text-left block px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-[#0C3B36]/5 hover:text-[#0C3B36] rounded-lg transition-colors capitalize"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SHOP BY COLOR Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('color')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-[#0C3B36] transition-colors uppercase">
              SHOP BY COLOR
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'color' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {activeDropdown === 'color' && (
              <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-2xl p-3 border border-gray-100 animate-fade-in">
                <div className="space-y-1">
                  {shopByColor.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleCategoryClick(item.category)}
                      className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-[#0C3B36]/5 hover:text-[#0C3B36] rounded-lg transition-colors capitalize"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-xs"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SHOP BY MATERIAL Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('material')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-[#0C3B36] transition-colors uppercase">
              SHOP BY MATERIAL
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'material' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {activeDropdown === 'material' && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-2xl p-3 border border-gray-100 animate-fade-in">
                <div className="space-y-1">
                  {shopByMaterial.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleCategoryClick(item.category)}
                      className="w-full text-left block px-3 py-2 rounded-lg hover:bg-[#0C3B36]/5 transition-colors"
                    >
                      <div className="text-xs font-bold text-gray-800 capitalize">{item.name}</div>
                      <div className="text-[11px] font-normal text-gray-500 normal-case">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Currency Button with SVG Nigerian flag */}
          <button
            onClick={onOpenCurrency}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 hover:border-[#0C3B36] text-xs font-bold text-gray-800 transition-colors"
          >
            {currentCurrency.code === 'NGN' ? (
              <svg className="w-4 h-3 rounded-xs overflow-hidden" viewBox="0 0 3 2">
                <rect width="1" height="2" fill="#008751" />
                <rect x="1" width="1" height="2" fill="#FFFFFF" />
                <rect x="2" width="1" height="2" fill="#008751" />
              </svg>
            ) : (
              <span>{currentCurrency.flag}</span>
            )}
            <span>{currentCurrency.code}</span>
            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-gray-700 hover:text-[#0C3B36] hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Account Button */}
          <button
            onClick={onOpenAuth}
            className="p-2 text-gray-700 hover:text-[#0C3B36] hover:bg-gray-100 rounded-full transition-colors hidden sm:block"
            aria-label="Account"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          {/* Cart Bag Icon with Count Badge */}
          <button
            onClick={openCart}
            className="relative p-2 text-gray-800 hover:text-[#0C3B36] transition-colors"
            aria-label="View Cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute top-1 right-1 bg-[#0C3B36] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-5 py-4 space-y-3 font-semibold text-sm animate-fade-in">
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenCollections?.()
            }}
            className="block py-2 text-gray-800 hover:text-[#0C3B36] font-bold uppercase text-left w-full cursor-pointer"
          >
            ALL BEADED BAGS
          </button>
          <div className="py-2 border-t border-gray-50">
            <div className="text-xs uppercase text-gray-400 font-bold mb-2">Shop by Type</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {shopByType.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleCategoryClick(item.category)}
                  className="text-left text-gray-700 py-1 hover:text-[#0C3B36]"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
