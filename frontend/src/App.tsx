import { useState } from 'react'
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
import BlogPostPage from './components/BlogPostPage'
import { products } from './data/products'

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'collections' | 'contact' | 'about' | 'blog-post'>('home')
  const [selectedPostSlug, setSelectedPostSlug] = useState<string>('are-beaded-bags-good-for-evening-wear')
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isTrackOrderModalOpen, setIsTrackOrderModalOpen] = useState(false)
  const [activePolicy, setActivePolicy] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const bestSellers = products.filter((p) => p.isBestSeller)

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111827] font-sans antialiased selection:bg-[#0C3B36] selection:text-white">
      {/* Top Announcement Bar */}
      <AnnouncementBar
        onOpenTrackOrder={() => setIsTrackOrderModalOpen(true)}
        onOpenContact={() => setCurrentView('contact')}
      />

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
          />
        ) : currentView === 'contact' ? (
          <ContactPage onBackToHome={() => setCurrentView('home')} />
        ) : currentView === 'about' ? (
          <AboutUsPage onBackToHome={() => setCurrentView('home')} />
        ) : currentView === 'blog-post' ? (
          <BlogPostPage
            postSlug={selectedPostSlug}
            onBackToBlog={() => setCurrentView('home')}
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
            />

            {/* 3. Brand Story Feature Box (BEADED BAG®) */}
            <BrandStorySection onOpenCollections={() => setCurrentView('collections')} />

            {/* 4. Discover Your Perfect Beaded Bag */}
            <DiscoverStyleSection />

            {/* 5. Beaded Handbag Product Carousel */}
            <ProductCarousel
              id="beaded-handbags"
              title="Beaded Handbag"
              showTabs={true}
              onViewAll={() => setCurrentView('collections')}
              products={products.filter((p) => [
                'green-beaded-purse',
                'chain-strap-beaded-handbag',
                'pink-beaded-purse',
                'gold-metallic-beaded-bag',
                'pearl-sequin-bag',
                'clear-beaded-purse',
                'yellow-beaded-handbag',
                'light-blue-beaded-bag',
              ].includes(p.id))}
            />

            {/* 6. The Beaded Bag Color Bar */}
            <ColorBarSection />

            {/* 7. Testimonials */}
            <Testimonials />

            {/* 8. Pearl Beaded Bags Dedicated Carousel */}
            <PearlCollectionSection />

            {/* 9. Quality, Durability & Style */}
            <ValueProps />

            {/* 10. Beaded Bag Collections for Every Moment */}
            <CollectionsBannerSection onOpenCollections={() => setCurrentView('collections')} />

            {/* 11. FAQ Accordion */}
            <FAQ />

            {/* 11. Brand Values Bar */}
            <BrandValuesSection />

            {/* 12. Journal / Blog Articles */}
            <BlogSection
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
        onOpenContact={() => setCurrentView('contact')}
        onOpenAboutUs={() => setCurrentView('about')}
        onOpenCollections={() => setCurrentView('collections')}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
      />

      {/* Drawers & Modals */}
      <CartDrawer />
      <CurrencySelectorModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
      />
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
      <CategoryViewModal
        categoryName={activeCategory}
        onClose={() => setActiveCategory(null)}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
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
