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
import TrackOrderModal from './components/TrackOrderModal'
import PolicyModal from './components/PolicyModal'
import CollectionsPage from './components/CollectionsPage'
import ContactPage from './components/ContactPage'
import AboutUsPage from './components/AboutUsPage'
import BlogListPage from './components/BlogListPage'
import BlogPostPage from './components/BlogPostPage'
import FaqPage from './components/FaqPage'
import ProductDetailPage from './components/ProductDetailPage'
import SignInPage from './components/SignInPage'
import AdminDashboardPage from './components/AdminDashboardPage'
import { products, type Product } from './data/products'

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'collections' | 'contact' | 'about' | 'blog-list' | 'blog-post' | 'faqs' | 'product-detail' | 'signin' | 'admin'>('home')
  const [selectedPostSlug, setSelectedPostSlug] = useState<string>('are-beaded-bags-good-for-evening-wear')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isTrackOrderModalOpen, setIsTrackOrderModalOpen] = useState(false)
  const [activePolicy, setActivePolicy] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Admin & Products State
  const [customProducts, setCustomProducts] = useState<Product[]>(products)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')

  const bestSellers = customProducts.filter((p) => p.isBestSeller)

  // Central Navigation & URL Hash Manager
  const navigateToView = (view: typeof currentView, extraSlug?: string, extraProduct?: Product) => {
    if (view === 'home') {
      window.location.hash = ''
      setCurrentView('home')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (view === 'collections') {
      window.location.hash = 'collections'
      setCurrentView('collections')
    } else if (view === 'contact') {
      window.location.hash = 'contact'
      setCurrentView('contact')
    } else if (view === 'about') {
      window.location.hash = 'about'
      setCurrentView('about')
    } else if (view === 'faqs') {
      window.location.hash = 'faqs'
      setCurrentView('faqs')
    } else if (view === 'blog-list') {
      window.location.hash = 'blog'
      setCurrentView('blog-list')
    } else if (view === 'blog-post' && extraSlug) {
      setSelectedPostSlug(extraSlug)
      window.location.hash = `blog/${extraSlug}`
      setCurrentView('blog-post')
    } else if (view === 'product-detail' && extraProduct) {
      setSelectedProduct(extraProduct)
      window.location.hash = `product/${extraProduct.id}`
      setCurrentView('product-detail')
    } else if (view === 'signin') {
      window.location.hash = 'signin'
      setCurrentView('signin')
    } else if (view === 'admin') {
      window.location.hash = 'admin'
      setCurrentView('admin')
    }
  }

  const handleSelectProduct = (prod: Product) => {
    navigateToView('product-detail', undefined, prod)
  }

  const handleSelectPost = (slug: string) => {
    navigateToView('blog-post', slug)
  }

  const handleAdminLogin = (email: string) => {
    setIsAdminLoggedIn(true)
    setAdminEmail(email)
    navigateToView('admin')
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
    } else if (currentView === 'signin') {
      title = `Sign In / ${siteBrand}`
    } else if (currentView === 'admin') {
      title = `Admin Dashboard / ${siteBrand}`
    }

    document.title = title
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentView, selectedProduct, selectedPostSlug])

  // Real-time URL Hash sync for Browser Back/Forward & direct link access
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#collections') {
        setCurrentView('collections')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash === '#contact') {
        setCurrentView('contact')
        setTimeout(() => {
          const el = document.getElementById('contact')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
          else window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 50)
      } else if (hash === '#about') {
        setCurrentView('about')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash === '#faqs' || hash === '#faq') {
        setCurrentView('faqs')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash === '#blog' || hash === '#blogs') {
        setCurrentView('blog-list')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash.startsWith('#blog/')) {
        const slug = hash.replace('#blog/', '')
        setSelectedPostSlug(slug)
        setCurrentView('blog-post')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash.startsWith('#product/')) {
        const prodId = hash.replace('#product/', '')
        const found = customProducts.find((p) => p.id === prodId)
        if (found) {
          setSelectedProduct(found)
          setCurrentView('product-detail')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } else if (hash === '#signin' || hash === '#login') {
        setCurrentView('signin')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash === '#admin' || hash === '#dashboard') {
        setCurrentView('admin')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash === '' || hash === '#' || hash === '#home') {
        setCurrentView('home')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handleHashChange)
    }
  }, [customProducts])

  return (
    <div className="min-h-screen bg-[#F8C3A8] text-[#111827] font-sans antialiased selection:bg-[#3B1E2B] selection:text-white">
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
              onClick={() => navigateToView('admin')}
              className="bg-amber-400 hover:bg-amber-300 text-gray-900 px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              Open Admin Dashboard Page &amp; Media Upload
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
        onOpenAuth={() => navigateToView('signin')}
        onOpenCollections={() => navigateToView('collections')}
        onGoHome={() => navigateToView('home')}
        onSelectCategory={(categoryName) => setActiveCategory(categoryName)}
      />

      {/* Main Page Content */}
      <main>
        {currentView === 'collections' ? (
          <CollectionsPage
            onSelectCategory={(cat) => setActiveCategory(cat)}
            onBackToHome={() => navigateToView('home')}
            onSelectProduct={handleSelectProduct}
          />
        ) : currentView === 'contact' ? (
          <ContactPage onBackToHome={() => navigateToView('home')} />
        ) : currentView === 'about' ? (
          <AboutUsPage onBackToHome={() => navigateToView('home')} />
        ) : currentView === 'faqs' ? (
          <FaqPage
            onBackToHome={() => navigateToView('home')}
            onOpenContact={() => navigateToView('contact')}
            onOpenTrackOrder={() => setIsTrackOrderModalOpen(true)}
          />
        ) : currentView === 'product-detail' && selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => navigateToView('home')}
            onOpenContact={() => navigateToView('contact')}
          />
        ) : currentView === 'blog-list' ? (
          <BlogListPage
            onSelectPost={handleSelectPost}
            onBackToHome={() => navigateToView('home')}
          />
        ) : currentView === 'blog-post' ? (
          <BlogPostPage
            postSlug={selectedPostSlug}
            onBackToBlog={() => navigateToView('blog-list')}
            onBackToHome={() => navigateToView('home')}
          />
        ) : currentView === 'signin' ? (
          <SignInPage
            onAdminLogin={handleAdminLogin}
            onBackToHome={() => navigateToView('home')}
            onGoToAdmin={() => navigateToView('admin')}
          />
        ) : currentView === 'admin' ? (
          <AdminDashboardPage
            productsList={customProducts}
            onUpdateProducts={(updated) => setCustomProducts(updated)}
            onBackToHome={() => navigateToView('home')}
            isAdminLoggedIn={isAdminLoggedIn}
            adminEmail={adminEmail}
            onLogoutAdmin={() => setIsAdminLoggedIn(false)}
            onGoToSignIn={() => navigateToView('signin')}
          />
        ) : (
          <>
            {/* 1. Hero Banner */}
            <Hero onOpenCollections={() => navigateToView('collections')} />

            {/* 2. Best Selling Beaded Bags Carousel */}
            <ProductCarousel
              id="best-sellers"
              title="Our Best Selling Beaded Bags"
              products={bestSellers}
              onViewAll={() => navigateToView('collections')}
              onSelectProduct={handleSelectProduct}
            />

            {/* 3. Brand Story Feature Box */}
            <BrandStorySection onOpenCollections={() => navigateToView('collections')} />

            {/* 4. Discover Your Perfect Beaded Bag */}
            <DiscoverStyleSection
              onOpenCollections={() => navigateToView('collections')}
              onSelectCategory={(cat) => setActiveCategory(cat)}
            />

            {/* 5. Beaded Handbag Product Carousel */}
            <ProductCarousel
              id="beaded-handbags"
              title="Beaded Handbag"
              showTabs={true}
              onViewAll={() => navigateToView('collections')}
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
              onOpenCollections={() => navigateToView('collections')}
              onSelectProduct={handleSelectProduct}
            />

            {/* 9. Quality, Durability & Style */}
            <ValueProps />

            {/* 10. Beaded Bag Collections for Every Moment */}
            <CollectionsBannerSection
              onOpenCollections={() => navigateToView('collections')}
              onSelectCategory={(cat) => setActiveCategory(cat)}
            />

            {/* 11. FAQ Accordion */}
            <FAQ onOpenContact={() => navigateToView('contact')} onOpenFaq={() => navigateToView('faqs')} />

            {/* 11. Brand Values Bar */}
            <BrandValuesSection />

            {/* 12. Journal / Blog Articles */}
            <BlogSection
              onSeeAll={() => navigateToView('blog-list')}
              onSelectPost={handleSelectPost}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenTrackOrder={() => setIsTrackOrderModalOpen(true)}
        onOpenAuth={() => navigateToView('signin')}
        onOpenContact={() => navigateToView('contact')}
        onOpenFaq={() => navigateToView('faqs')}
        onOpenAboutUs={() => navigateToView('about')}
        onOpenCollections={() => navigateToView('collections')}
        onOpenBlog={() => navigateToView('blog-list')}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
      />

      {/* Drawers & Modals */}
      <CartDrawer onOpenCollections={() => navigateToView('collections')} />
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
      <TrackOrderModal
        isOpen={isTrackOrderModalOpen}
        onClose={() => setIsTrackOrderModalOpen(false)}
      />
      <PolicyModal
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </div>
  )
}

