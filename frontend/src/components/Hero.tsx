import React, { useState, useEffect, useRef } from 'react'

interface HeroProps {
  onOpenCollections?: () => void
}

interface HeroSlide {
  id: number
  title: string
  subtitle: string
  video?: string
  fallbackImage: string
  badgeText: string
}

export default function Hero({ onOpenCollections }: HeroProps) {
  const slides: HeroSlide[] = [
    {
      id: 1,
      title: 'Handcrafted Beaded Bags: Minimal. Elegant. Iconic.',
      subtitle: 'Experience artisan beadweaving with smooth modern silhouettes.',
      video: '/videos/hero-pinterest-video.mp4',
      fallbackImage: '/images/extracted_img_3.webp',
      badgeText: '+10K Satisfied Clients',
    },
    {
      id: 2,
      title: 'Statement Beaded Purses for Every Occasion',
      subtitle: 'Elevate cocktail dresses and evening gowns with lustrous beaded shine.',
      video: '/videos/hero-pinterest-video.mp4',
      fallbackImage: '/images/beaded-bag-lifestyle-portrait-elegant-woman-white-shirt.webp',
      badgeText: 'Handcrafted Luxury',
    },
    {
      id: 3,
      title: 'Artisan Beadweaving: 24+ Hours Per Handbag',
      subtitle: 'Every bead is hand-strung using high-tensile reinforced threads.',
      video: '/videos/black-beaded-purse.mp4',
      fallbackImage: '/images/beaded-bag-lifestyle-portrait-smiling-woman-black-blazer.webp',
      badgeText: '100% Quality Inspected',
    },
    {
      id: 4,
      title: 'Iconic Pearl & Acrylic Handbags',
      subtitle: 'Free worldwide shipping on all orders with zero minimum purchase.',
      video: '/videos/hero-pinterest-video.mp4',
      fallbackImage: '/images/handmade-beaded-bags-display.webp',
      badgeText: 'Free Worldwide Shipping',
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isPlaying, slides.length])

  // Play video on current slide
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide && isPlaying) {
          video.currentTime = 0
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      }
    })
  }, [currentSlide, isPlaying])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const activeSlideData = slides[currentSlide]

  return (
    <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-start overflow-hidden bg-black text-white">
      {/* Background Video Slides Carousel */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {slide.video ? (
            <video
              ref={(el) => (videoRefs.current[idx] = el)}
              src={slide.video}
              muted
              loop
              playsInline
              poster={slide.fallbackImage}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-linear"
            />
          ) : (
            <img
              src={slide.fallbackImage}
              alt={slide.title}
              className="w-full h-full object-cover object-center opacity-90"
            />
          )}

          {/* Dark gradient overlay for ultra-crisp text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 lg:py-24 w-full">
        <div className="max-w-xl space-y-6 text-white animate-fade-in">
          {/* Top Badge Text */}
          <div className="flex items-center gap-3">
            <span className="bg-[#3B1E2B]/90 backdrop-blur-md border border-white/20 text-white font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {activeSlideData.badgeText}
            </span>
          </div>



          {/* Dynamic Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans drop-shadow-md transition-all duration-500">
            {activeSlideData.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal drop-shadow-xs">
            {activeSlideData.subtitle}
          </p>

          {/* Shop Button */}
          <div className="pt-2">
            <button
              onClick={onOpenCollections}
              className="inline-flex items-center gap-2.5 bg-[#3B1E2B] text-white font-extrabold px-8 py-4 rounded-2xl text-sm hover:bg-[#2B141F] transition-all duration-200 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Explore All Collections</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Video Carousel Slide Controls (Left/Right Arrows & Indicators) */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
        <button
          onClick={prevSlide}
          className="p-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
          aria-label="Previous Video Slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
          aria-label="Next Video Slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}

