interface BlogPostPageProps {
  postSlug: string
  onBackToBlog: () => void
}

const blogArticles: Record<string, { title: string; date: string; category: string; image: string; content: string[] }> = {
  'are-beaded-bags-good-for-evening-wear': {
    title: 'Are Beaded Bags Good for Evening Wear?',
    date: 'July 15, 2026',
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
    date: 'July 22, 2026',
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
    date: 'July 29, 2026',
    category: 'Artisan Guides',
    image: '/images/how-many-beads-do-you-need-to-make-a-beaded-bag.webp',
    content: [
      'The number of beads required to craft a handbag depends on the bead size, bag dimension, and weaving technique.',
      'For a standard medium-sized handbag using 8mm acrylic beads, an artisan typically needs between 800 to 1,500 individual beads. Smaller micro-bead clutches can require up to 4,000 beads.',
      'Every The Sien Brand® piece is meticulously hand-strung by master artisans, spending up to 24 hours per handbag.',
    ],
  },
  'where-to-store-handbags-in-a-house': {
    title: 'Where to store handbags in a house?',
    date: 'June 17, 2026',
    category: 'Storage & Care',
    image: '/images/where-to-store-handbags-in-a-house.webp',
    content: [
      'Finding the ideal location to store your handbag collection keeps your home organized while protecting your valuable accessories from dust, moisture, and direct sunlight.',
      'Dedicated closet shelving, breathable dust bags, and climate-controlled storage spots ensure that your beaded purses maintain their vibrant color and pristine condition.',
      'Avoid storing bags in damp basements or harsh lighting to prevent discoloration and deterioration of delicate bead threads.',
    ],
  },
  'is-it-okay-to-hang-handbags': {
    title: 'Is it okay to hang handbags?',
    date: 'June 10, 2026',
    category: 'Care Tips',
    image: '/images/is-it-okay-to-hang-handbags.webp',
    content: [
      'Hanging handbags by their handles or shoulder straps might seem convenient, but over prolonged periods it can cause strap stretching and distortion.',
      'For structured beaded bags, upright placement on padded shelves or within storage cubbies is strongly recommended to preserve both handle shape and beaded body structure.',
      'If hanging is necessary, use wide, padded hooks designed specifically to distribute strap weight evenly.',
    ],
  },
  'how-to-store-beaded-handbags': {
    title: 'How to store beaded handbags?',
    date: 'June 3, 2026',
    category: 'Maintenance Guide',
    image: '/images/how-to-store-beaded-handbags.webp',
    content: [
      'Handcrafted beaded bags require gentle care and proper storage techniques to prevent bead snagging, thread loosening, or surface scratching.',
      'Always stuff your beaded bags with soft acid-free tissue paper, enclose them in breathable cotton dust covers, and store them flat or upright on a soft surface.',
      'Keep beaded items separated from heavily embellished clothing or metallic zippers to prevent friction and snagging.',
    ],
  },
}


export default function BlogPostPage({ postSlug, onBackToBlog, onBackToHome }: BlogPostPageProps & { onBackToHome?: () => void }) {
  const article = blogArticles[postSlug] || blogArticles['are-beaded-bags-good-for-evening-wear']

  return (
    <div className="py-8 lg:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          {onBackToHome && (
            <>
              <button onClick={onBackToHome} className="hover:text-[#3B1E2B] transition-colors cursor-pointer">
                Home
              </button>
              <span className="text-gray-400 font-bold">/</span>
            </>
          )}
          <button onClick={onBackToBlog} className="hover:text-[#3B1E2B] transition-colors cursor-pointer">
            Blog
          </button>
          <span className="text-gray-400 font-bold">/</span>
          <span className="text-gray-900 font-bold truncate max-w-xs">{article.title}</span>
        </div>
        <button
          onClick={onBackToBlog}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-200 hover:border-gray-900 text-xs font-bold text-gray-800 transition-colors cursor-pointer"
        >
          ← Back to Blog
        </button>
      </div>

      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="inline-block px-3 py-1 rounded-full bg-[#3B1E2B]/10 text-[#3B1E2B] font-bold text-[11px] uppercase tracking-wider">
          {article.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight font-sans">
          {article.title}
        </h1>
        <p className="text-xs text-gray-500 font-medium">
          Published on {article.date} • By The Sien Brand® Editorial Team
        </p>
      </div>

      {/* Main Image */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm aspect-[16/9] bg-[#F8ECE2]">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        {/* The Sien Brand Watermark Overlay */}
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 shadow-md">
          <span className="text-xs font-extrabold text-white uppercase tracking-wider font-sans">
            THE SIEN BRAND
          </span>
        </div>
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
