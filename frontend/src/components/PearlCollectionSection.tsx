import ProductCarousel from './ProductCarousel'
import { products, type Product } from '../data/products'

interface PearlCollectionSectionProps {
  onOpenCollections?: () => void
  onSelectProduct?: (product: Product) => void
}

export default function PearlCollectionSection({ onOpenCollections, onSelectProduct }: PearlCollectionSectionProps) {
  const pearlProductIds = [
    'baby-pink-beaded-bag',
    'white-pearl-beaded-bag',
    'pearl-beaded-clutch',
    'pearl-shoulder-bag',
    'beaded-pearl-purse',
    'pearl-beaded-handbag',
    'trendy-bead-bucket-bag',
  ]

  const pearlProducts = products.filter((p) => pearlProductIds.includes(p.id))

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


