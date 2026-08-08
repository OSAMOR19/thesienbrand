import React, { useState } from 'react'
import type { Product } from '../data/products'
import { uploadMediaToSupabase } from '../services/products'
import { isSupabaseConfigured } from '../lib/supabaseClient'

interface AdminDashboardModalProps {
  isOpen: boolean
  onClose: () => void
  productsList: Product[]
  onUpdateProducts: (updated: Product[]) => void
}

export interface AdminOrder {
  id: string
  customer: string
  email: string
  items: string
  total: number
  date: string
  status: 'Processing' | 'Shipped' | 'Delivered'
}

export default function AdminDashboardModal({
  isOpen,
  onClose,
  productsList,
  onUpdateProducts,
}: AdminDashboardModalProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatusMsg, setUploadStatusMsg] = useState('')

  // Form state for creating/editing product
  const [formData, setFormData] = useState<{
    id: string
    name: string
    priceUSD: number
    collection: string
    color: string
    material: string
    image: string
    video: string
    isBestSeller: boolean
  }>({
    id: '',
    name: '',
    priceUSD: 100,
    collection: 'Best Sellers',
    color: 'Black',
    material: 'Acrylic Beads',
    image: '/images/black-beaded-purse-1.png',
    video: '',
    isBestSeller: false,
  })

  // Sample Orders
  const [orders, setOrders] = useState<AdminOrder[]>([
    { id: '#ORD-9821', customer: 'Sophia Bennett', email: 'sophia@example.com', items: 'Black Beaded Purse x1', total: 50, date: 'Aug 07, 2026', status: 'Processing' },
    { id: '#ORD-9820', customer: 'Emma Watson', email: 'emma.w@example.com', items: 'Pearl Beaded Bag x1, Gold Clutch x1', total: 160, date: 'Aug 06, 2026', status: 'Shipped' },
    { id: '#ORD-9819', customer: 'Olivia Rodrigo', email: 'olivia@example.com', items: 'Lemon Beaded Bag x1', total: 100, date: 'Aug 05, 2026', status: 'Delivered' },
  ])

  if (!isOpen) return null

  // Handle uploading media file directly from user device
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'video' | 'image') => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadStatusMsg(`Uploading ${field} from device...`)

    // 1. Upload file to Supabase Storage bucket 'product-media' if connected
    const publicUrl = await uploadMediaToSupabase(file, field === 'video' ? 'videos' : 'images')
    if (publicUrl) {
      setIsUploading(false)
      setUploadStatusMsg('Uploaded to Supabase CDN!')
      if (field === 'video') {
        setFormData((prev) => ({ ...prev, video: publicUrl }))
      } else {
        setFormData((prev) => ({ ...prev, image: publicUrl }))
      }
      setTimeout(() => setUploadStatusMsg(''), 3000)
      return
    }

    // 2. Fallback to Data URL for instant local device preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setIsUploading(false)
      setUploadStatusMsg('Loaded from device (Local Preview)')
      const result = event.target?.result as string
      if (result) {
        if (field === 'video') {
          setFormData((prev) => ({ ...prev, video: result }))
        } else {
          setFormData((prev) => ({ ...prev, image: result }))
        }
      }
      setTimeout(() => setUploadStatusMsg(''), 3000)
    }
    reader.readAsDataURL(file)
  }

  const handleEditClick = (p: Product) => {
    setEditingProductId(p.id)
    setFormData({
      id: p.id,
      name: p.name,
      priceUSD: p.priceUSD,
      collection: p.collection,
      color: p.color,
      material: p.material,
      image: p.image,
      video: p.video || '',
      isBestSeller: !!p.isBestSeller,
    })
  }

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return

    if (editingProductId) {
      // Update existing
      const updated = productsList.map((p) =>
        p.id === editingProductId
          ? {
              ...p,
              name: formData.name,
              priceUSD: Number(formData.priceUSD),
              collection: formData.collection as any,
              color: formData.color,
              material: formData.material,
              image: formData.image,
              video: formData.video || undefined,
              isBestSeller: formData.isBestSeller,
            }
          : p
      )
      onUpdateProducts(updated)
    } else {
      // Create new
      const newProd: Product = {
        id: formData.name.toLowerCase().replace(/\s+/g, '-'),
        name: formData.name,
        priceUSD: Number(formData.priceUSD),
        collection: formData.collection as any,
        color: formData.color,
        material: formData.material,
        image: formData.image || '/images/black-beaded-purse-1.png',
        video: formData.video || undefined,
        isBestSeller: formData.isBestSeller,
      }
      onUpdateProducts([newProd, ...productsList])
    }

    // Reset form
    resetForm()
  }

  const resetForm = () => {
    setEditingProductId(null)
    setFormData({
      id: '',
      name: '',
      priceUSD: 100,
      collection: 'Best Sellers',
      color: 'Black',
      material: 'Acrylic Beads',
      image: '/images/black-beaded-purse-1.png',
      video: '',
      isBestSeller: false,
    })
    setUploadStatusMsg('')
  }

  const toggleOrderStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const nextStatus = o.status === 'Processing' ? 'Shipped' : o.status === 'Shipped' ? 'Delivered' : 'Processing'
          return { ...o, status: nextStatus }
        }
        return o
      })
    )
  }

  const filteredProducts = productsList.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.collection.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const videoProductsCount = productsList.filter((p) => p.video).length
  const bestSellersCount = productsList.filter((p) => p.isBestSeller).length

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans animate-fadeIn">
      <div className="relative bg-[#111116] text-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 my-6 flex flex-col max-h-[90vh]">
        {/* Sleek Top Header Bar */}
        <div className="bg-[#181820] border-b border-white/10 px-6 sm:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-lg font-extrabold text-white">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-sans">
                  The Sien Brand Studio
                </h2>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-white/50 font-normal">
                Product Catalog, Device File Uploader &amp; Order Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center font-bold transition-all cursor-pointer border border-white/10"
            aria-label="Close dashboard"
          >
            ✕
          </button>
        </div>

        {/* Studio KPI Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-6 sm:px-8 pt-5 pb-2">
          <div className="bg-[#1A1A24] p-3.5 rounded-2xl border border-white/5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">Total Catalog</span>
            <div className="text-xl font-extrabold text-white mt-0.5">{productsList.length} items</div>
          </div>
          <div className="bg-[#1A1A24] p-3.5 rounded-2xl border border-white/5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400/80">Best Sellers</span>
            <div className="text-xl font-extrabold text-amber-400 mt-0.5">{bestSellersCount} featured</div>
          </div>
          <div className="bg-[#1A1A24] p-3.5 rounded-2xl border border-white/5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400/80">Video Media</span>
            <div className="text-xl font-extrabold text-rose-400 mt-0.5">{videoProductsCount} videos</div>
          </div>
          <div className="bg-[#1A1A24] p-3.5 rounded-2xl border border-white/5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400/80">Storage Status</span>
            <div className="text-xs font-bold text-cyan-400 mt-1 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              {isSupabaseConfigured ? 'Supabase CDN' : 'Local Device Demo'}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 sm:px-8 py-3 flex items-center justify-between border-b border-white/10 bg-[#14141C]">
          <div className="bg-white/5 p-1 rounded-2xl flex border border-white/10">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'products' ? 'bg-[#3B1E2B] text-white shadow-md' : 'text-white/60 hover:text-white'
              }`}
            >
              <span>🛍️ Products &amp; Device Upload</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-md text-[10px]">{productsList.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'orders' ? 'bg-[#3B1E2B] text-white shadow-md' : 'text-white/60 hover:text-white'
              }`}
            >
              <span>📦 Customer Orders</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-md text-[10px]">{orders.length}</span>
            </button>
          </div>

          {activeTab === 'products' && (
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/15 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-white/40 outline-none focus:border-amber-400 transition-colors w-48 lg:w-64"
              />
            </div>
          )}
        </div>

        {/* Scrollable Content Container */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {activeTab === 'products' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Product Form Column */}
              <div className="lg:col-span-5 bg-[#181822] p-6 rounded-3xl border border-white/10 space-y-5 shadow-lg">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="font-extrabold text-white text-base font-sans">
                    {editingProductId ? '✏️ Edit Product Media & Info' : '➕ Add New Product'}
                  </h3>
                  {editingProductId && (
                    <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full uppercase">
                      Editing Mode
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-medium">
                  <div>
                    <label className="block text-white/70 mb-1.5 font-bold">Product Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/30 outline-none focus:border-amber-400 transition-colors"
                      placeholder="e.g. Emerald Pearl Beaded Clutch"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/70 mb-1.5 font-bold">Price ($ USD)</label>
                      <input
                        type="number"
                        required
                        value={formData.priceUSD}
                        onChange={(e) => setFormData({ ...formData, priceUSD: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1.5 font-bold">Collection</label>
                      <select
                        value={formData.collection}
                        onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl border border-white/15 bg-[#22222E] text-white outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="Best Sellers">Best Sellers</option>
                        <option value="Handbags">Handbags</option>
                        <option value="Shoulder Bags">Shoulder Bags</option>
                        <option value="Evening">Evening</option>
                        <option value="Clutches">Clutches</option>
                        <option value="Bucket Bags">Bucket Bags</option>
                      </select>
                    </div>
                  </div>

                  {/* Device Video File Upload Dropzone */}
                  <div className="bg-[#22222E] p-4 rounded-2xl border border-dashed border-amber-400/40 hover:border-amber-400 space-y-2 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="block text-white font-extrabold text-xs">
                        🎥 Product Video (Upload from Device)
                      </label>
                      <span className="text-[10px] text-white/50 font-normal">MP4, WEBM, MOV</span>
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, 'video')}
                      className="block w-full text-xs text-white/70 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-gradient-to-r file:from-[#3B1E2B] file:to-rose-900 file:text-white hover:file:opacity-90 cursor-pointer"
                    />
                    <div className="pt-1">
                      <span className="text-[11px] text-white/50">Or paste video path/URL:</span>
                      <input
                        type="text"
                        value={formData.video}
                        onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-white/15 bg-white/5 text-xs text-white font-normal mt-1 outline-none focus:border-amber-400"
                        placeholder="/videos/black-beaded-purse.mp4"
                      />
                    </div>
                  </div>

                  {/* Device Image File Upload Dropzone */}
                  <div className="bg-[#22222E] p-4 rounded-2xl border border-dashed border-white/20 hover:border-white/40 space-y-2 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="block text-white font-extrabold text-xs">
                        🖼️ Product Image (Upload from Device)
                      </label>
                      <span className="text-[10px] text-white/50 font-normal">PNG, JPG, WEBP</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'image')}
                      className="block w-full text-xs text-white/70 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-white/15 file:text-white hover:file:bg-white/25 cursor-pointer"
                    />
                  </div>

                  {/* Status Indicator */}
                  {uploadStatusMsg && (
                    <div className="bg-amber-400/10 border border-amber-400/30 text-amber-300 p-3 rounded-xl text-center text-xs font-bold animate-pulse">
                      {uploadStatusMsg}
                    </div>
                  )}

                  {/* Media Preview Container */}
                  {formData.video ? (
                    <div className="relative aspect-[4/3] bg-black rounded-2xl overflow-hidden border border-white/15 shadow-md">
                      <video src={formData.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                      <span className="absolute top-2.5 left-2.5 bg-rose-600/90 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        ACTIVE VIDEO PREVIEW
                      </span>
                    </div>
                  ) : formData.image ? (
                    <div className="relative aspect-[4/3] bg-white/5 rounded-2xl overflow-hidden border border-white/15 shadow-md">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : null}

                  {/* Best Seller Checkbox */}
                  <label className="flex items-center gap-3 cursor-pointer pt-1 bg-white/5 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-400 focus:ring-0 bg-black/40 border-white/30"
                    />
                    <span className="text-white font-bold text-xs">Feature in Best Sellers Carousel</span>
                  </label>

                  {/* Form Action Buttons */}
                  <div className="pt-2 flex gap-3">
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="flex-1 py-3.5 bg-gradient-to-r from-[#3B1E2B] to-[#5C2B42] hover:from-[#2B141F] hover:to-[#4A2033] text-white font-extrabold rounded-xl transition-all cursor-pointer text-xs uppercase tracking-wider shadow-lg disabled:opacity-50"
                    >
                      {editingProductId ? 'Save Product Changes' : 'Create Product'}
                    </button>
                    {editingProductId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Products Catalog Grid / List */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-white text-base">
                    Product Catalog ({filteredProducts.length})
                  </h3>
                  <span className="text-xs text-white/50">Click any product to edit media</span>
                </div>

                <div className="space-y-3">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleEditClick(prod)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        editingProductId === prod.id
                          ? 'bg-amber-400/10 border-amber-400 shadow-md'
                          : 'bg-[#181822] border-white/10 hover:border-white/25 hover:bg-[#1E1E2C]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {prod.video ? (
                          <div className="relative w-16 h-16 bg-black rounded-xl overflow-hidden flex-shrink-0 border border-white/20">
                            <video src={prod.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                            <span className="absolute bottom-1 right-1 text-[8px] bg-rose-600 text-white font-extrabold px-1 rounded uppercase">
                              VIDEO
                            </span>
                          </div>
                        ) : (
                          <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded-xl bg-white/5 border border-white/10 flex-shrink-0" />
                        )}
                        <div className="min-w-0 space-y-0.5">
                          <h4 className="font-extrabold text-sm text-white truncate">{prod.name}</h4>
                          <p className="text-xs text-white/60 font-medium">
                            ${prod.priceUSD} • {prod.collection}
                          </p>
                          {prod.isBestSeller && (
                            <span className="inline-block text-[10px] font-extrabold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded-full">
                              ★ Best Seller
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditClick(prod)
                        }}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-colors flex-shrink-0 cursor-pointer border border-white/15"
                      >
                        Edit Media →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Orders Tab */
            <div className="space-y-5">
              <h3 className="font-extrabold text-white text-base">Customer Orders Tracker</h3>
              <div className="bg-[#181822] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10 text-xs">
                {orders.map((o) => (
                  <div key={o.id} className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                    <div className="space-y-1">
                      <div className="font-extrabold text-white text-sm flex items-center gap-2">
                        <span>{o.id}</span>
                        <span className="text-white/40">•</span>
                        <span>{o.customer}</span>
                      </div>
                      <p className="text-white/50">{o.email} • {o.date}</p>
                      <p className="text-gray-300 font-semibold pt-1">{o.items}</p>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="font-extrabold text-base text-white">${o.total}</span>
                      <button
                        onClick={() => toggleOrderStatus(o.id)}
                        className={`px-4 py-2 rounded-full font-extrabold text-xs cursor-pointer transition-transform active:scale-95 border ${
                          o.status === 'Processing'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : o.status === 'Shipped'
                            ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        }`}
                      >
                        {o.status} (Click to toggle)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
