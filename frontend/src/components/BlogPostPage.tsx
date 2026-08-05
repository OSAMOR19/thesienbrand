interface BlogPostPageProps {
  postSlug: string
  onBackToBlog: () => void
}

const blogArticles: Record<string, { title: string; date: string; category: string; image: string; content: string[] }> = {
  'are-beaded-bags-good-for-evening-wear': {
    title: 'Are Beaded Bags Good for Evening Wear?',
    date: 'July 14, 2026',
    category: 'Style & Trends',
    image: '/images/are-beaded-bags-good-for-evening-wear.webp',
    content: [
      'When it comes to evening attire, accessories play a crucial role in pulling together a sophisticated look. Beaded bags have stood the test of time as standard evening wear staples.',
      'From luxurious metallic beads and shimmering sequins to lustrous faux pearls, beaded clutches and shoulder bags offer an eye-catching touch of elegance to silk gowns, cocktail dresses, and formal suits.',
      'Versatile for galas, wedding receptions, and black-tie dinners, a handcrafted beaded handbag is both a functional carrier for evening essentials and a piece of wearable art.',
    ],
  },
  'how-do-i-make-my-beaded-bag-stiff': {
    title: 'How Do I Make My Beaded Bag Stiff?',
    date: 'July 18, 2026',
    category: 'Craftsmanship & Care',
    image: '/images/how-do-i-make-my-beaded-bag-stiff.webp',
    content: [
      'Maintaining structural integrity is key to preserving the silhouette of a beaded bag. Over time, heavy wear or soft stringing can cause a handbag to lose its firm structure.',
      'Using high-tensile nylon fishing line, internal acrylic frame supports, or custom canvas lining inserts can give your beaded purse the crisp structure it needs to hold its shape.',
      'Store your beaded bag with acid-free tissue paper inside to maintain its shape when not in use.',
    ],
  },
  'how-many-beads-do-you-need-to-make-a-beaded-bag': {
    title: 'How Many Beads Do You Need to Make a Beaded Bag?',
    date: 'July 22, 2026',
    category: 'Artisan Guides',
    image: '/images/how-many-beads-do-you-need-to-make-a-beaded-bag.webp',
    content: [
      'The number of beads required to craft a handbag depends on the bead size, bag dimension, and weaving technique.',
      'For a standard medium-sized handbag using 8mm acrylic beads, an artisan typically needs between 800 to 1,500 individual beads. Smaller micro-bead clutches can require up to 4,000 beads.',
      'Every Beaded Bag® piece is meticulously hand-strung by master artisans, spending up to 24 hours per handbag.',
    ],
  },
}

export default function BlogPostPage({ postSlug, onBackToBlog }: BlogPostPageProps) {
  const article = blogArticles[postSlug] || blogArticles['are-beaded-bags-good-for-evening-wear']

  return (
    <div className="py-8 lg:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <button onClick={onBackToBlog} className="hover:text-[#0C3B36] transition-colors">
            Blog
          </button>
          <span>/</span>
          <span className="text-gray-900 font-bold truncate max-w-xs">{article.title}</span>
        </div>
        <button
          onClick={onBackToBlog}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-200 hover:border-gray-900 text-xs font-bold text-gray-800 transition-colors"
        >
          ← Back to Blog
        </button>
      </div>

      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="inline-block px-3 py-1 rounded-full bg-[#0C3B36]/10 text-[#0C3B36] font-bold text-[11px] uppercase tracking-wider">
          {article.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight font-sans">
          {article.title}
        </h1>
        <p className="text-xs text-gray-500 font-medium">
          Published on {article.date} • By Beaded Bag® Editorial Team
        </p>
      </div>

      {/* Main Image */}
      <div className="rounded-3xl overflow-hidden shadow-sm aspect-[16/9] bg-[#F4F3EE]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose max-w-none text-gray-700 leading-relaxed font-normal space-y-6 text-sm sm:text-base">
        {article.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}
