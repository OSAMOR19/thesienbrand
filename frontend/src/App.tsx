import { useState, useEffect } from 'react'
import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductCarousel from './components/ProductCarousel'
import CollectionGrid from './components/CollectionGrid'
import BrandStorySection from './components/BrandStorySection'
import DiscoverStyleSection from './components/DiscoverStyleSection'
import ColorBarSection from './components/ColorBarSection'
import Testimonials from './components/Testimonials'
import PearlCollectionSection from './components/PearlCollectionSection'
import CollectionsBannerSection from './components/CollectionsBannerSection'
import ValueProps from './components/ValueProps'
import FAQ from './components/FAQ'
import BrandValuesSection from './components/BrandValuesSection'
import BlogSection from './components/BlogSection'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import CurrencySelectorModal from './components/CurrencySelectorModal'
import SearchModal from './components/SearchModal'
import CategoryViewModal from './components/CategoryViewModal'
import AuthModal from './components/AuthModal'
import TrackOrderModal from './components/TrackOrderModal'
import PolicyModal from './components/PolicyModal'
import CollectionsPage from './components/CollectionsPage'
import ContactPage from './components/ContactPage'
import AboutUsPage from './components/AboutUsPage'
import BlogListPage from './components/BlogListPage'
import BlogPostPage from './components/BlogPostPage'
import FaqPage from './components/FaqPage'
import ProductDetailPage from './components/ProductDetailPage'
import AdminDashboardModal from './components/AdminDashboardModal'
import { products, type Product } from './data/products'

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'collections' | 'contact' | 'about' | 'blog-list' | 'blog-post' | 'faqs' | 'product-detail'>('home')
  const [selectedPostSlug, setSelectedPostSlug] = useState<string>('are-beaded-bags-good-for-evening-wear')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isTrackOrderModalOpen, setIsTrackOrderModalOpen] = useState(false)
  const [activePolicy, setActivePolicy] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Admin & Products State
  const [customProducts, setCustomProducts] = useState<Product[]>(products)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)

  const bestSellers = customProducts.filter((p) => p.isBestSeller)

  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod)
    setCurrentView('product-detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAdminLogin = (email: string) => {
    setIsAdminLoggedIn(true)
    setAdminEmail(email)
    setIsAdminModalOpen(true)
  }

  // Dynamic Document Title based on view and slash / page title
  useEffect(() => {
    const siteBrand = 'The Sien Brand'
    let title = `${siteBrand} / Handcrafted Beaded Bags & Purses`

    if (currentView === 'collections') {
      title = `Collections / ${siteBrand}`
    } else if (currentView === 'contact') {
      title = `Contact Us / ${siteBrand}`
    } else if (currentView === 'about') {
      title = `About Us / ${siteBrand}`
    } else if (currentView === 'faqs') {
      title = `FAQs / ${siteBrand}`
    } else if (currentView === 'blog-list') {
      title = `The Sien Brand Journal / ${siteBrand}`
    } else if (currentView === 'blog-post') {
      const articleTitles: Record<string, string> = {
        'are-beaded-bags-good-for-evening-wear': 'Are Beaded Bags Good for Evening Wear?',
        'how-do-i-make-my-beaded-bag-stiff': 'How Do I Make My Beaded Bag Stiff?',
        'how-many-beads-do-you-need-to-make-a-beaded-bag': 'How Many Beads Do You Need to Make a Beaded Bag?',
        'where-to-store-handbags-in-a-house': 'Where to Store Handbags in a House?',
        'is-it-okay-to-hang-handbags': 'Is it Okay to Hang Handbags?',
        'how-to-store-beaded-handbags': 'How to Store Beaded Handbags?',
      }
      const postTitle = articleTitles[selectedPostSlug] || 'Blog Post'
      title = `${postTitle} / ${siteBrand}`
    } else if (currentView === 'product-detail' && selectedProduct) {
      title = `${selectedProduct.name} / ${siteBrand}`
    }

    document.title = title
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentView, selectedProduct, selectedPostSlug])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#contact') {
        setCurrentView('contact')
        setTimeout(() => {
          const el = document.getElementById('contact')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
          else window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 100)
      } else if (hash === '#faqs' || hash === '#faq') {
        setCurrentView('faqs')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash === '#blog' || hash === '#blogs') {
        setCurrentView('blog-list')
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleOpenContact = () => {
    window.location.hash = 'contact'
    setCurrentView('contact')
    setTimeout(() => {
      const el = document.getElementById('contact')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)
  }

  const handleOpenFaq = () => {
    window.location.hash = 'faqs'
    setCurrentView('faqs')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#FFF6F0] text-[#111827] font-sans antialiased selection:bg-[#3B1E2B] selection:text-white">
      {/* Top Edge Admin Access Bar when Admin is Logged In */}
      {isAdminLoggedIn && (
        <div className="bg-[#2B141F] text-white px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs font-bold sticky top-0 z-50 shadow-md border-b border-amber-400/40">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-gray-900 font-extrabold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              ⚡ ADMIN LOGGED IN
            </span>
            <span className="hidden sm:inline text-white/90">Welcome, {adminEmail || 'admin@thesienbrand.com'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="bg-amber-400 hover:bg-amber-300 text-gray-900 px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              Open Admin Dashboard &amp; Media Upload
            </button>
            <button
              onClick={() => setIsAdminLoggedIn(false)}
              className="text-white/70 hover:text-white underline cursor-pointer text-xs"
            >
              Logout Admin
            </button>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        onOpenCurrency={() => setIsCurrencyModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenCollections={() => setCurrentView('collections')}
        onGoHome={() => setCurrentView('home')}
        onSelectCategory={(categoryName) => setActiveCategory(categoryName)}
      />

      {/* Main Page Content */}
      <main>
        {currentView === 'collections' ? (
          <CollectionsPage
            onSelectCategory={(cat) => setActiveCategory(cat)}
            onBackToHome={() => setCurrentView('home')}
            onSelectProduct={handleSelectProduct}
          />
        ) : currentView === 'contact' ? (
          <ContactPage onBackToHome={() => setCurrentView('home')} />
        ) : currentView === 'about' ? (
          <AboutUsPage onBackToHome={() => setCurrentView('home')} />
        ) : currentView === 'faqs' ? (
          <FaqPage
            onBackToHome={() => setCurrentView('home')}
            onOpenContact={handleOpenContact}
            onOpenTrackOrder={() => setIsTrackOrderModalOpen(true)}
          />
        ) : currentView === 'product-detail' && selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setCurrentView('home')}
            onOpenContact={handleOpenContact}
          />
        ) : currentView === 'blog-list' ? (
          <BlogListPage
            onSelectPost={(slug) => {
              setSelectedPostSlug(slug)
              setCurrentView('blog-post')
            }}
            onBackToHome={() => setCurrentView('home')}
          />
        ) : currentView === 'blog-post' ? (
          <BlogPostPage
            postSlug={selectedPostSlug}
            onBackToBlog={() => setCurrentView('blog-list')}
            onBackToHome={() => setCurrentView('home')}
          />
        ) : (
          <>
            {/* 1. Hero Banner */}
            <Hero onOpenCollections={() => setCurrentView('collections')} />

            {/* 2. Best Selling Beaded Bags Carousel */}
            <ProductCarousel
              id="best-sellers"
              title="Our Best Selling Beaded Bags"
              products={bestSellers}
              onViewAll={() => setCurrentView('collections')}
              onSelectProduct={handleSelectProduct}
            />

            {/* 3. Brand Story Feature Box (BEADED BAG®) */}
            <BrandStorySection onOpenCollections={() => setCurrentView('collections')} />

            {/* 4. Discover Your Perfect Beaded Bag */}
            <DiscoverStyleSection
              onOpenCollections={() => setCurrentView('collections')}
              onSelectCategory={(cat) => setActiveCategory(cat)}
            />

            {/* 5. Beaded Handbag Product Carousel */}
            <ProductCarousel
              id="beaded-handbags"
              title="Beaded Handbag"
              showTabs={true}
              onViewAll={() => setCurrentView('collections')}
              onSelectProduct={handleSelectProduct}
              products={customProducts.filter((p) => [
                'green-beaded-purse',
                'chain-strap-beaded-handbag',
                'pink-beaded-purse',
                'gold-metallic-beaded-bag',
                'pearl-sequin-bag',
                'clear-beaded-purse',
                'yellow-beaded-handbag',
                'light-blue-beaded-bag',
              ].includes(p.id) || p.collection === 'Handbags')}
            />

            {/* 6. The Beaded Bag Color Bar */}
            <ColorBarSection onSelectCategory={(cat) => setActiveCategory(cat)} />

            {/* 7. Testimonials */}
            <Testimonials />

            {/* 8. Pearl Beaded Bags Dedicated Carousel */}
            <PearlCollectionSection
              onOpenCollections={() => setCurrentView('collections')}
              onSelectProduct={handleSelectProduct}
            />

            {/* 9. Quality, Durability & Style */}
            <ValueProps />

            {/* 10. Beaded Bag Collections for Every Moment */}
            <CollectionsBannerSection
              onOpenCollections={() => setCurrentView('collections')}
              onSelectCategory={(cat) => setActiveCategory(cat)}
            />

            {/* 11. FAQ Accordion */}
            <FAQ onOpenContact={handleOpenContact} onOpenFaq={handleOpenFaq} />

            {/* 11. Brand Values Bar */}
            <BrandValuesSection />

            {/* 12. Journal / Blog Articles */}
            <BlogSection
              onSeeAll={() => setCurrentView('blog-list')}
              onSelectPost={(slug) => {
                setSelectedPostSlug(slug)
                setCurrentView('blog-post')
              }}
            />
          </>
        )}
      </main>


      {/* Footer */}
      <Footer
        onOpenTrackOrder={() => setIsTrackOrderModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenContact={handleOpenContact}
        onOpenFaq={handleOpenFaq}
        onOpenAboutUs={() => setCurrentView('about')}
        onOpenCollections={() => setCurrentView('collections')}
        onOpenBlog={() => setCurrentView('blog-list')}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
      />

      {/* Drawers & Modals */}
      <CartDrawer onOpenCollections={() => setCurrentView('collections')} />
      <CurrencySelectorModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
      />
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectProduct={handleSelectProduct}
      />
      <CategoryViewModal
        categoryName={activeCategory}
        onClose={() => setActiveCategory(null)}
        onSelectProduct={handleSelectProduct}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAdminLogin={handleAdminLogin}
      />
      <TrackOrderModal
        isOpen={isTrackOrderModalOpen}
        onClose={() => setIsTrackOrderModalOpen(false)}
      />
      <PolicyModal
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        productsList={customProducts}
        onUpdateProducts={(updated) => setCustomProducts(updated)}
      />
    </div>
  )
}
