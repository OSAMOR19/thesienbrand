import ProductCarousel from './ProductCarousel'
import { products, type Product } from '../data/products'

interface PearlCollectionSectionProps {
  onOpenCollections?: () => void
  onSelectProduct?: (product: Product) => void
  products?: Product[]
}

export default function PearlCollectionSection({
  onOpenCollections,
  onSelectProduct,
  products: propsProducts,
}: PearlCollectionSectionProps) {
  const activeProducts = propsProducts || products
  const pearlProductIds = [
    'baby-pink-beaded-bag',
    'white-pearl-beaded-bag',
    'pearl-beaded-clutch',
    'pearl-shoulder-bag',
    'beaded-pearl-purse',
    'pearl-beaded-handbag',
    'trendy-bead-bucket-bag',
  ]

  const pearlProducts = activeProducts.filter(
    (p: Product) => pearlProductIds.includes(p.id) || p.name.toLowerCase().includes('pearl') || p.collection.toLowerCase().includes('pearl')
  )

  return (
    <div className="bg-[#FFF6F0] border-t border-gray-100 py-4">
      <ProductCarousel
        id="pearl-beaded-bags"
        title="Pearl Beaded Bags"
        products={pearlProducts}
        onViewAll={onOpenCollections}
        onSelectProduct={onSelectProduct}
      />
    </div>
  )
}


