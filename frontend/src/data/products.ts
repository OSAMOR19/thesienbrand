export interface Product {
  id: string
  name: string
  priceUSD: number // Base USD price
  collection: 'Best Sellers' | 'Handbags' | 'Shoulder Bags' | 'Evening' | 'Clutches' | 'Bucket Bags' | string
  color: string
  material: string
  image: string
  video?: string
  hoverImage?: string
  galleryImages?: string[]
  isBestSeller?: boolean
}

export const products: Product[] = [
  // 1. Best Sellers Carousel Items matching Live Site Screenshots
  {
    id: 'bags-with-beads',
    name: 'Bags With Beads',
    priceUSD: 100, // ₦288,100
    collection: 'Best Sellers',
    color: 'White / Blue',
    material: 'Glass & Pearl Beads',
    image: '/images/bags-with-beads-1.png',
    hoverImage: '/images/bags-with-beads-2.png',
    galleryImages: [
      '/images/bags-with-beads-1.png',
      '/images/bags-with-beads-2.png',
      '/images/bags-with-beads-3.png',
      '/images/bags-with-beads-4.png',
      '/images/bags-with-beads-5.png',
    ],
    isBestSeller: true,
  },
  {
    id: 'floral-beaded-purse',
    name: 'Floral Beaded Purse',
    priceUSD: 100, // ₦288,100
    collection: 'Best Sellers',
    color: 'Beige / Floral',
    material: 'Artisan Glass Beads',
    image: '/images/floral-beaded-purse-1.png',
    hoverImage: '/images/floral-beaded-purse-2.png',
    galleryImages: [
      '/images/floral-beaded-purse-1.png',
      '/images/floral-beaded-purse-2.png',
      '/images/floral-beaded-purse-3.png',
      '/images/floral-beaded-purse-4.png',
      '/images/floral-beaded-purse-5.png',
    ],
    isBestSeller: true,
  },
  {
    id: 'beaded-flower-bag',
    name: 'Beaded Flower Bag',
    priceUSD: 100, // ₦288,100
    collection: 'Best Sellers',
    color: 'Multicolor Floral',
    material: 'Faceted Sequins & Beads',
    image: '/images/beaded-flower-bag-1.png',
    hoverImage: '/images/beaded-flower-bag-2.png',
    galleryImages: [
      '/images/beaded-flower-bag-1.png',
      '/images/beaded-flower-bag-2.png',
      '/images/beaded-flower-bag-3.jpg',
      '/images/beaded-flower-bag-4.jpg',
      '/images/beaded-flower-bag-5.png',
    ],
    isBestSeller: true,
  },
  {
    id: 'colorful-beaded-bag',
    name: 'Colorful Beaded Bag',
    priceUSD: 100, // ₦288,100
    collection: 'Best Sellers',
    color: 'White / Folk Art',
    material: 'Handcrafted Beads',
    image: '/images/colorful-beaded-bag-1.png',
    hoverImage: '/images/colorful-beaded-bag-2.png',
    galleryImages: [
      '/images/colorful-beaded-bag-1.png',
      '/images/colorful-beaded-bag-2.png',
      '/images/colorful-beaded-bag-3.png',
      '/images/colorful-beaded-bag-4.png',
      '/images/colorful-beaded-bag-5.png',
    ],
    isBestSeller: true,
  },
  {
    id: 'black-beaded-purse',
    name: 'Black Beaded Purse',
    priceUSD: 50, // ₦144,100
    collection: 'Best Sellers',
    color: 'Black',
    material: 'Glossy Acrylic Beads',
    image: '/images/black-beaded-purse-1.png',
    video: '/videos/black-beaded-purse.mp4',
    hoverImage: '/images/black-beaded-purse-2.png',
    galleryImages: [
      '/images/black-beaded-purse-1.png',
      '/images/black-beaded-purse-2.png',
      '/images/black-beaded-purse-3.png',
    ],
    isBestSeller: true,
  },
  {
    id: 'beaded-floral-handbag',
    name: 'Beaded Floral Handbag',
    priceUSD: 100, // ₦288,100
    collection: 'Best Sellers',
    color: 'Pink / Floral',
    material: 'Glass Beads',
    image: '/images/beaded-floral-handbag-pink-shoulder-bag-red-216.webp',
    isBestSeller: true,
  },
  {
    id: 'silver-beaded-handbag',
    name: 'Silver Beaded Handbag',
    priceUSD: 50, // ₦144,100
    collection: 'Best Sellers',
    color: 'Silver',
    material: 'Metallic Beads',
    image: '/images/silver-beaded-handbag-handle-256.webp',
    isBestSeller: true,
  },
  {
    id: 'black-beaded-evening-handbag',
    name: 'Black Beaded Evening Handbag',
    priceUSD: 60, // ₦172,900
    collection: 'Best Sellers',
    color: 'Black',
    material: 'Scalloped Beads',
    image: '/images/black-beaded-evening-handbag-scalloped-rounded-316.webp',
    isBestSeller: true,
  },
  {
    id: 'magnolia-pearl-bag',
    name: 'Magnolia Pearl Bag',
    priceUSD: 60, // ₦172,900
    collection: 'Best Sellers',
    color: 'White / Pearl',
    material: 'Embellished Pearls',
    image: '/images/magnolia-pearl-bag-white-embellished-handbag-handle-detachable-963.webp',
    isBestSeller: true,
  },
  {
    id: 'lemon-beaded-bag',
    name: 'Lemon Beaded Bag',
    priceUSD: 100, // ₦288,100
    collection: 'Best Sellers',
    color: 'Yellow / Lemon',
    material: 'Artisan Glass Beads',
    image: '/images/lemon-beaded-bag-colorful-shoulder-abstract-multicolor-488.webp',
    isBestSeller: true,
  },

  // 2. Discover Style & Category Items matching Live Site Screenshots
  {
    id: 'green-beaded-purse',
    name: 'Green Beaded Purse',
    priceUSD: 50, // ₦144,100
    collection: 'Handbags',
    color: 'Olive Green',
    material: 'Crafted Beads',
    image: '/images/green-beaded-purse-olive-handbag-crafted-beads-723.webp',
  },
  {
    id: 'chain-strap-beaded-handbag',
    name: 'Chain Strap Beaded Handbag',
    priceUSD: 60, // ₦172,900
    collection: 'Handbags',
    color: 'Silver',
    material: 'Chain Strap & Beads',
    image: '/images/chain-strap-beaded-handbag-silver-450.webp',
  },
  {
    id: 'pink-beaded-purse',
    name: 'Pink Beaded Purse',
    priceUSD: 50, // ₦144,100
    collection: 'Shoulder Bags',
    color: 'Hot Pink',
    material: 'Acrylic Beads',
    image: '/images/pink-beaded-purse-vibrant-handbag-crafted-beads-hot-783.webp',
  },
  {
    id: 'gold-metallic-beaded-bag',
    name: 'Gold Metallic Beaded Bag',
    priceUSD: 50, // ₦144,100
    collection: 'Evening',
    color: 'Gold',
    material: 'Mesh Hobo',
    image: '/images/gold-metallic-beaded-bag-mesh-hobo-455.webp',
  },
  {
    id: 'pearl-sequin-bag',
    name: 'Pearl Sequin Bag',
    priceUSD: 45, // ₦129,700
    collection: 'Evening',
    color: 'White / Gold',
    material: 'Sequin Fringe',
    image: '/images/pearl-sequin-bag-beaded-shoulder-fringe-gold-tone-white-212.webp',
  },
  {
    id: 'clear-beaded-purse',
    name: 'Clear Beaded Purse',
    priceUSD: 50, // ₦144,100
    collection: 'Clutches',
    color: 'Iridescent Clear',
    material: 'Acrylic Beads',
    image: '/images/clear-beaded-purse-iridescent-handbag-handle-white-827.webp',
  },
  {
    id: 'yellow-beaded-handbag',
    name: 'Yellow Beaded Handbag',
    priceUSD: 50, // ₦144,100
    collection: 'Handbags',
    color: 'Yellow',
    material: 'Glass Beads',
    image: '/images/yellow-beaded-handbag-handle-shoulder-372.webp',
  },
  {
    id: 'light-blue-beaded-bag',
    name: 'Light Blue Beaded Bag',
    priceUSD: 50, // ₦144,100
    collection: 'Shoulder Bags',
    color: 'Light Blue',
    material: 'Faceted Beads',
    image: '/images/light-blue-beaded-bag-handbag-handle-shoulder-667.webp',
  },

  // 3. Pearl Collection Items matching Live Site Screenshots
  {
    id: 'baby-pink-beaded-bag',
    name: 'Baby Pink Beaded Bag',
    priceUSD: 40, // ₦115,300
    collection: 'Shoulder Bags',
    color: 'Baby Pink',
    material: 'Acrylic Beads',
    image: '/images/baby-pink-beaded-bag-shoulder-134.webp',
  },
  {
    id: 'white-pearl-beaded-bag',
    name: 'White Pearl Beaded Bag',
    priceUSD: 50, // ₦144,100
    collection: 'Handbags',
    color: 'White',
    material: 'Pearl Weave',
    image: '/images/white-pearl-beaded-bag-handbag-handle-160.webp',
  },
  {
    id: 'pearl-beaded-clutch',
    name: 'Pearl Beaded Clutch',
    priceUSD: 40, // ₦115,300
    collection: 'Clutches',
    color: 'Gold / White',
    material: 'Ornate Pearl Clutch',
    image: '/images/pearl-beaded-clutch-ornate-bag-gold-tone-white-684.webp',
  },
  {
    id: 'pearl-shoulder-bag',
    name: 'Pearl Shoulder Bag',
    priceUSD: 50, // ₦144,100
    collection: 'Shoulder Bags',
    color: 'White',
    material: 'Pearl Strap',
    image: '/images/pearl-shoulder-bag-beaded-handbag-handle-strap-white-610.webp',
  },
  {
    id: 'beaded-pearl-purse',
    name: 'Beaded Pearl Purse',
    priceUSD: 40, // ₦115,300
    collection: 'Evening',
    color: 'Ivory Pearl',
    material: 'Multiple Pearl Rows',
    image: '/images/beaded-pearl-purse-cream-colored-handbag-adorned-multiple-rows-white-910.webp',
  },
  {
    id: 'pearl-beaded-handbag',
    name: 'Pearl Beaded Handbag',
    priceUSD: 100, // ₦288,100
    collection: 'Handbags',
    color: 'Cream White',
    material: 'Flap Closure Pearl',
    image: '/images/pearl-beaded-handbag-cream-colored-rectangular-flap-closure-shoulder-589.webp',
  },
  {
    id: 'trendy-bead-bucket-bag',
    name: 'Trendy Bead Bucket Bag',
    priceUSD: 30, // ₦86,500
    collection: 'Bucket Bags',
    color: 'Pink / Beige',
    material: 'Pearl & Bead Weave',
    image: '/images/trendy-bead-bucket-bag-pearl-beaded-pink-beige-140.webp',
  },
]

export const categoryCards = [
  {
    id: 'beaded-purses',
    title: 'BEADED PURSES',
    image: '/images/beaded-purse-collection-silver-black-mini-top-handle-bag.png',
    link: '#best-sellers',
  },
  {
    id: 'beaded-shoulder-bag',
    title: 'BEADED SHOULDER BAG',
    image: '/images/beaded-shoulder-bag-collection-multicolor.png',
    link: '#best-sellers',
  },
  {
    id: 'beaded-evening-bag',
    title: 'BEADED EVENING BAG',
    image: '/images/beaded-evening-bag-collection-gold-half-moon.png',
    link: '#best-sellers',
  },
  {
    id: 'pearl-beaded-bag',
    title: 'PEARL BEADED BAG',
    image: '/images/pearl-beaded-bag-collection-white-shoulder-bag.png',
    link: '#best-sellers',
  },
]

export const styleHighlights = [
  {
    id: 'crossbody-style',
    title: 'Beaded Crossbody Bag',
    image: '/images/beaded-crossbody-bag-collection-silver-mini.webp',
  },
  {
    id: 'wood-style',
    title: 'Wood Beaded Bag',
    image: '/images/wood-beaded-bag-collection-brown-top-handle.webp',
  },
  {
    id: 'clutch-style',
    title: 'Beaded Clutch',
    image: '/images/beaded-clutch-collection-pink-gem-clutch.webp',
  },
  {
    id: 'handbag-style',
    title: 'Beaded Handbag',
    image: '/images/beaded-handbag-collection-black-white-pearl-top-handle.webp',
  },
  {
    id: 'mini-style',
    title: 'Beaded Mini Bag',
    image: '/images/beaded-mini-bag-collection-black-top-handle.webp',
  },
  {
    id: 'tote-style',
    title: 'Beaded Tote Bag',
    image: '/images/beaded-tote-bag-collection-silver-shoulder.webp',
  },
]

export const blogPosts = [
  {
    id: 'how-many-beads-do-you-need-to-make-a-beaded-bag',
    title: 'How many beads do you need to make a beaded bag?',
    summary: 'Discover how many beads you need to make a beaded bag, tips on bead selection, and create stylish, personalized handbags with our expert guide.',
    date: 'July 29, 2026',
    image: '/images/How_many_beads_do_you_need_to_make_a_beaded_bag.webp',
    category: 'Artisan Guides',
  },
  {
    id: 'how-do-i-make-my-beaded-bag-stiff',
    title: 'How do I make my beaded bag stiff?',
    summary: 'Discover how do I make my beaded bag stiff with expert tips for a firm, durable finish. Perfect for stylish, long-lasting handcrafted beaded bags.',
    date: 'July 22, 2026',
    image: '/images/How_do_I_make_my_beaded_bag_stiff.webp',
    category: 'Craftsmanship & Care',
  },
  {
    id: 'are-beaded-bags-good-for-evening-wear',
    title: 'Are beaded bags good for evening wear?',
    summary: 'Discover if beaded bags are good for evening wear and see how elegant handcrafted beaded purses add a chic touch to any sophisticated event or occasion.',
    date: 'July 15, 2026',
    image: '/images/Are_beaded_bags_good_for_evening_wear.webp',
    category: 'Style & Trends',
  },
  {
    id: 'where-to-store-handbags-in-a-house',
    title: 'Where to store handbags in a house?',
    summary: 'Discover where to store handbags in a house with smart, stylish storage ideas. Keep beaded bags organized, protected, and ready to use anytime.',
    date: 'June 17, 2026',
    image: '/images/where-to-store-handbags-in-a-house.webp',
    category: 'Storage & Care',
  },
  {
    id: 'is-it-okay-to-hang-handbags',
    title: 'Is it okay to hang handbags?',
    summary: 'Wondering is it okay to hang handbags? Discover smart storage tips, preserve bag shapes, and keep designer purses looking chic and organized.',
    date: 'June 10, 2026',
    image: '/images/is-it-okay-to-hang-handbags.webp',
    category: 'Care Tips',
  },
  {
    id: 'how-to-store-beaded-handbags',
    title: 'How to store beaded handbags?',
    summary: 'Discover how to store beaded handbags to keep your delicate purses pristine, prevent damage, and ensure your designer bags last for years.',
    date: 'June 3, 2026',
    image: '/images/how-to-store-beaded-handbags.webp',
    category: 'Maintenance Guide',
  },
]


export const faqs = [
  {
    q: 'What are your shipping times?',
    a: 'Our standard delivery typically takes 5 to 10 business days, depending on your location. At Beaded Bag®, we prioritize prompt and efficient processing so your order arrives as quickly as possible.',
  },
  {
    q: 'How can I track my order?',
    a: 'Once your bag is shipped, we’ll send you a tracking number via email. Simply enter this number on our Track Order page to follow your package in real time.',
  },
  {
    q: 'Can I return a bag if it doesn’t suit me?',
    a: 'Absolutely. If you’re not fully satisfied, you can return your item within 30 days of receipt. Please consult our Return Policy for further details.',
  },
  {
    q: 'How can I contact customer service?',
    a: 'Our dedicated customer service team is here to help. Send us an email at info@beaded-bag.com or call the number listed on our site. We aim to respond within 24 hours.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we ship to most countries worldwide. Shipping times and costs may vary depending on your location. For more details, please see our Shipping Policy.',
  },
]
