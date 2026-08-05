import { useCartStore } from '../store/cartStore'
import { useCurrency } from '../store/useCurrency'

export default function CartDrawer() {
  const { isOpen, close, lines, setQty, remove, subtotalUSD } = useCartStore()
  const { formatPrice } = useCurrency()

  const subtotal = subtotalUSD()
  const freeShippingThresholdUSD = 150
  const progressPercent = Math.min(100, (subtotal / freeShippingThresholdUSD) * 100)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
        aria-hidden
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-extrabold text-xl text-gray-900 font-sans">Your Cart ({lines.reduce((s, l) => s + l.qty, 0)})</h2>
          <button onClick={close} aria-label="Close cart" className="p-2 text-gray-400 hover:text-gray-600 text-xl font-bold">
            ✕
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-[#3B1E2B]/5 px-6 py-3 border-b border-gray-100">
          <div className="text-xs font-semibold text-[#3B1E2B] mb-1 text-center">
            {progressPercent >= 100 ? (
              <span>🎉 You unlocked FREE Shipping Worldwide!</span>
            ) : (
              <span>Add {formatPrice(freeShippingThresholdUSD - subtotal)} more to get Free Shipping!</span>
            )}
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3B1E2B] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-2xl">
                🛍️
              </div>
              <p className="text-gray-500 text-sm font-medium">Your cart is currently empty.</p>
              <button
                onClick={close}
                className="px-6 py-2.5 rounded-full bg-[#3B1E2B] text-white text-xs font-bold hover:bg-[#2B141F] transition-colors"
              >
                Explore Collections
              </button>
            </div>
          ) : (
            <ul className="space-y-4 divide-y divide-gray-100">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="pt-4 first:pt-0 flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-2xl bg-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-gray-900 font-sans">{product.name}</h4>
                        <button
                          onClick={() => remove(product.id)}
                          className="text-xs text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-[#3B1E2B] mt-0.5">{formatPrice(product.priceUSD)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-full">
                        <button
                          onClick={() => setQty(product.id, qty - 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 font-bold"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-gray-900">{qty}</span>
                        <button
                          onClick={() => setQty(product.id, qty + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 font-bold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-extrabold text-gray-900">
                        {formatPrice(product.priceUSD * qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {lines.length > 0 && (
          <div className="border-t border-gray-100 p-6 space-y-4 bg-gray-50/50">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-600">Subtotal</span>
              <span className="font-extrabold text-lg text-gray-900">{formatPrice(subtotal)}</span>
            </div>
            <button className="w-full bg-[#3B1E2B] hover:bg-[#2B141F] text-white py-3.5 rounded-full text-sm font-bold shadow-lg transition-all active:scale-98">
              Proceed to Checkout →
            </button>
            <p className="text-[11px] text-gray-400 text-center">
              🔒 100% Encrypted &amp; Secure Checkout • Free Shipping
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
