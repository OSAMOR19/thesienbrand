import { blogPosts } from '../data/products'

interface BlogSectionProps {
  onSelectPost?: (slug: string) => void
  onSeeAll?: () => void
}

export default function BlogSection({ onSelectPost, onSeeAll }: BlogSectionProps) {
  // Show first 3 posts on homepage section
  const featuredPosts = blogPosts.slice(0, 3)

  return (
    <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
          The Sien Brand Journal
        </h2>
        <button
          onClick={onSeeAll || (() => onSelectPost?.('how-many-beads-do-you-need-to-make-a-beaded-bag'))}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#3B1E2B] hover:underline cursor-pointer"
        >
          <span>See all</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredPosts.map((post) => (

          <article
            key={post.id}
            onClick={() => onSelectPost?.(post.id)}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* The Sien Brand Watermark Overlay replacing old BEADEDBAG watermark */}
                <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 shadow-md">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider font-sans">
                    THE SIEN BRAND
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  {post.date}
                </span>
                <h3 className="font-extrabold text-base text-gray-900 group-hover:text-[#3B1E2B] transition-colors line-clamp-2 font-sans">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </div>
            <div className="px-6 pb-6 pt-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3B1E2B] group-hover:gap-2 transition-all">
                Read Article →
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
