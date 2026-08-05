import { blogPosts } from '../data/products'

interface BlogListPageProps {
  onSelectPost: (slug: string) => void
  onBackToHome: () => void
}

export default function BlogListPage({ onSelectPost, onBackToHome }: BlogListPageProps) {
  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn font-sans">
      {/* Breadcrumb matching Live Site Screenshot 3 */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        <button
          onClick={onBackToHome}
          className="hover:text-[#0C3B36] transition-colors cursor-pointer"
        >
          Home
        </button>
        <span className="text-gray-400">›</span>
        <span className="text-gray-800 font-bold">Beaded Bag Blog</span>
      </nav>

      {/* Main Title matching Live Site Screenshot 3 */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
          Beaded Bag Blog
        </h1>
      </div>

      {/* Blog Cards Grid matching Live Site Screenshots 2 & 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => onSelectPost(post.id)}
            className="group bg-[#F7F6F0] rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer border border-gray-100"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6 space-y-3">
                <h2 className="font-extrabold text-lg text-gray-900 group-hover:text-[#0C3B36] transition-colors line-clamp-2 font-sans leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed font-normal">
                  {post.summary}
                </p>
                <div className="pt-2 text-[11px] font-bold text-gray-400 tracking-wide">
                  {post.date}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
