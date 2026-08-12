import React, { useState, useEffect } from 'react'
import type { Product } from '../data/products'

export interface AdminOrder {
  id: string
  customer: string
  email: string
  items: string
  total: number
  date: string
  status: 'Processing' | 'Delivered' | 'Canceled'
}

interface AdminDashboardPageProps {
  productsList: Product[]
  onUpdateProducts: (updated: Product[]) => void
  onBackToHome: () => void
  isAdminLoggedIn: boolean
  adminEmail: string
  onLogoutAdmin: () => void
  onGoToSignIn: () => void
}

export default function AdminDashboardPage({
  productsList,
  onUpdateProducts,
  onBackToHome,
  isAdminLoggedIn,
  adminEmail,
  onLogoutAdmin,
  onGoToSignIn,
}: AdminDashboardPageProps) {
  // Sidebar tab navigation: 'dashboard' | 'products' | 'orders'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard')
  const [orderFilter, setOrderFilter] = useState<'All' | 'Processing' | 'Delivered' | 'Canceled'>('All')

  // Product Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  
  // Product Form State
  const [formData, setFormData] = useState<{
    name: string
    category: string
    priceUSD: number
    priceNaira: number
    color: string
    material: string
    image: string
    hoverImage: string
    video: string
    isBestSeller: boolean
    status: 'Active' | 'Draft'
  }>({
    name: '',
    category: 'Jewelry',
    priceUSD: 100,
    priceNaira: 10500,
    color: 'Multicolor',
    material: 'Resin & Glass Beads',
    image: '/images/bags-with-beads-1.png',
    hoverImage: '',
    video: '',
    isBestSeller: false,
    status: 'Active',
  })

  // Sample Orders State
  const [orders] = useState<AdminOrder[]>([])

  // Hash Navigation Listener (#admin/dashboard, #admin/products, #admin/orders)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash === '#admin/products' || hash === '#admin-products') {
        setActiveTab('products')
      } else if (hash === '#admin/orders' || hash === '#admin-orders') {
        setActiveTab('orders')
      } else if (hash === '#admin/dashboard' || hash === '#admin') {
        setActiveTab('dashboard')
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const switchTab = (tab: 'dashboard' | 'products' | 'orders') => {
    setActiveTab(tab)
    window.location.hash = `admin/${tab}`
  }

  // Formatting helpers
  const getProductSlug = (p: Product) => {
    return p.id || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const formatNaira = (amount: number) => {
    return `₦${amount.toLocaleString()}`
  }

  const getDisplayPriceNaira = (p: Product) => {
    if ((p as any).priceNaira) return (p as any).priceNaira
    return Math.round(p.priceUSD * 105)
  }

  // Handle open create modal
  const handleOpenCreate = () => {
    setEditingProductId(null)
    setFormData({
      name: '',
      category: 'Jewelry',
      priceUSD: 100,
      priceNaira: 10500,
      color: 'Multicolor',
      material: 'Resin & Glass Beads',
      image: '/images/bags-with-beads-1.png',
      hoverImage: '',
      video: '',
      isBestSeller: false,
      status: 'Active',
    })
    setIsModalOpen(true)
  }

  // Handle open edit modal
  const handleOpenEdit = (p: Product) => {
    setEditingProductId(p.id)
    setFormData({
      name: p.name,
      category: p.collection || 'Jewelry',
      priceUSD: p.priceUSD || 100,
      priceNaira: getDisplayPriceNaira(p),
      color: p.color || '',
      material: p.material || '',
      image: p.image || '/images/bags-with-beads-1.png',
      hoverImage: p.hoverImage || '',
      video: p.video || '',
      isBestSeller: !!p.isBestSeller,
      status: 'Active',
    })
    setIsModalOpen(true)
  }

  // Handle delete product
  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const updated = productsList.filter((p) => p.id !== id)
      onUpdateProducts(updated)
    }
  }

  // Device file uploader helper
  const handleDeviceFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'hoverImage' | 'video') => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      if (result) {
        setFormData((prev) => ({ ...prev, [field]: result }))
      }
    }
    reader.readAsDataURL(file)
  }

  // Handle Save Product Form Submit
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    if (editingProductId) {
      // Edit existing product
      const updated = productsList.map((p) => {
        if (p.id === editingProductId) {
          return {
            ...p,
            name: formData.name,
            collection: formData.category,
            priceUSD: Number(formData.priceUSD),
            priceNaira: Number(formData.priceNaira),
            color: formData.color,
            material: formData.material,
            image: formData.image || '/images/bags-with-beads-1.png',
            hoverImage: formData.hoverImage || undefined,
            video: formData.video || undefined,
            isBestSeller: formData.isBestSeller,
          } as Product
        }
        return p
      })
      onUpdateProducts(updated)
    } else {
      // Create new product
      const newProduct: Product = {
        id: slug || `prod-${Date.now()}`,
        name: formData.name,
        priceUSD: Number(formData.priceUSD),
        collection: formData.category,
        color: formData.color,
        material: formData.material,
        image: formData.image || '/images/bags-with-beads-1.png',
        hoverImage: formData.hoverImage || undefined,
        video: formData.video || undefined,
        isBestSeller: formData.isBestSeller,
        galleryImages: [formData.image].filter(Boolean),
      }
      ;(newProduct as any).priceNaira = Number(formData.priceNaira)

      onUpdateProducts([newProduct, ...productsList])
    }

    setIsModalOpen(false)
  }

  // Access Control Guard
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-[#8C6B1C] flex items-center justify-center text-3xl mx-auto font-black">
            🔒
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
              Admin Access Required
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed">
              Please sign in with your administrative credentials to manage store products, orders, and dashboard metrics.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={onGoToSignIn}
              className="w-full py-3.5 px-6 rounded-full bg-[#8C6B1C] hover:bg-[#785B17] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              Sign In as Admin
            </button>
            <button
              onClick={onBackToHome}
              className="w-full py-3 px-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Back to Storefront
            </button>
          </div>
        </div>
      </div>
    )
  }

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0)
  const displayUserEmail = adminEmail || 'juliesglossglow@gmail.com'

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans antialiased flex flex-col lg:flex-row text-gray-900">
      {/* LEFT SIDEBAR (Dark #0D0D0D Theme matching reference images) */}
      <aside className="w-full lg:w-64 bg-[#0D0D0D] text-gray-300 flex-shrink-0 flex flex-col justify-between select-none p-5 lg:min-h-screen border-r border-gray-900">
        <div className="space-y-6">
          {/* Top Brand Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C59B27] flex items-center justify-center font-bold text-gray-900 text-lg shadow-sm">
              🚀
            </div>
            <div>
              <h2 className="font-bold text-white text-base font-sans tracking-tight leading-tight">
                Julie's Gloss &amp; Glow
              </h2>
              <span className="text-[11px] text-gray-400 font-sans block">Admin Panel</span>
            </div>
          </div>

          {/* Go to Storefront Button */}
          <button
            onClick={onBackToHome}
            className="w-full py-2.5 px-4 rounded-full border border-[#C59B27]/80 hover:bg-[#C59B27]/10 text-[#C59B27] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>👁</span>
            <span>GO TO STOREFRONT</span>
          </button>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-2 text-sm font-medium">
            {/* Dashboard */}
            <button
              onClick={() => switchTab('dashboard')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#8C6B1C] text-white font-bold shadow-xs'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">📊</span>
                <span>Dashboard</span>
              </div>
              {activeTab === 'dashboard' && <span className="text-xs font-bold">&gt;</span>}
            </button>

            {/* Products */}
            <button
              onClick={() => switchTab('products')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#8C6B1C] text-white font-bold shadow-xs'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">📦</span>
                <span>Products</span>
              </div>
              {activeTab === 'products' && <span className="text-xs font-bold">&gt;</span>}
            </button>

            {/* Orders */}
            <button
              onClick={() => switchTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#8C6B1C] text-white font-bold shadow-xs'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">📋</span>
                <span>Orders</span>
              </div>
              {activeTab === 'orders' && <span className="text-xs font-bold">&gt;</span>}
            </button>
          </nav>
        </div>

        {/* Sidebar Bottom Profile */}
        <div className="pt-6 border-t border-gray-900 space-y-2 mt-6 lg:mt-0">
          <div className="text-xs text-gray-400 font-medium truncate px-1">
            {displayUserEmail}
          </div>
          <button
            onClick={onLogoutAdmin}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white font-medium transition-colors cursor-pointer px-1 py-1"
          >
            <span>[--&gt;</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full space-y-8">
        {activeTab === 'dashboard' ? (
          /* ======================================================== */
          /* 1. DASHBOARD VIEW (Matching Reference Screenshot 1)      */
          /* ======================================================== */
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1 font-sans">
                Overview of your paint store
              </p>
            </div>

            {/* Stat Cards Grid (3 Cards matching Image 1) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Total Revenue */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-gray-100/80 space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#8C6B1C]/15 text-[#8C6B1C] flex items-center justify-center text-lg font-bold">
                  📈
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium font-sans">
                    Total Revenue (Paid Orders)
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1 font-sans">
                    {formatNaira(totalRevenue)}
                  </div>
                </div>
              </div>

              {/* Card 2: Total Orders */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-gray-100/80 space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-lg font-bold">
                  🛍️
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium font-sans">
                    Total Orders
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1 font-sans">
                    {orders.length}
                  </div>
                </div>
              </div>

              {/* Card 3: Active Products */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-gray-100/80 space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center text-lg font-bold">
                  📦
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium font-sans">
                    Active Products
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1 font-sans">
                    {productsList.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Low Stock Alerts Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100/80 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 text-lg">⚠️</span>
                <h3 className="font-bold text-gray-800 text-base sm:text-lg font-serif">
                  Low Stock Alerts
                </h3>
                <span className="text-xs text-gray-400 font-sans font-normal">(below 5 units)</span>
              </div>

              <div className="bg-gray-50/60 rounded-2xl p-10 text-center flex flex-col items-center justify-center space-y-2 border border-gray-100/60">
                <div className="text-3xl">🎉</div>
                <p className="text-sm font-semibold text-gray-600">
                  All variants are well-stocked!
                </p>
              </div>
            </div>
          </div>
        ) : activeTab === 'products' ? (
          /* ======================================================== */
          /* 2. PRODUCTS VIEW (Matching Reference Screenshot 2)       */
          /* ======================================================== */
          <div className="space-y-8 animate-fadeIn">
            {/* Header & New Product Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">
                  Products
                </h1>
                <p className="text-sm text-gray-500 mt-1 font-sans">
                  {productsList.length} total products
                </p>
              </div>

              <button
                onClick={handleOpenCreate}
                className="bg-[#8C6B1C] hover:bg-[#785B17] text-white font-bold text-sm px-6 py-3 rounded-full shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] self-start sm:self-auto"
              >
                <span>+ New Product</span>
              </button>
            </div>

            {/* Products Table Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="text-gray-400 font-bold uppercase tracking-wider text-[11px] border-b border-gray-100 pb-4">
                      <th className="pb-4 font-semibold">PRODUCT</th>
                      <th className="pb-4 font-semibold">CATEGORY</th>
                      <th className="pb-4 font-semibold">BASE PRICE</th>
                      <th className="pb-4 font-semibold">VARIANTS</th>
                      <th className="pb-4 font-semibold">STATUS</th>
                      <th className="pb-4 text-right font-semibold">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100/80">
                    {productsList.map((prod) => {
                      const nairaPrice = getDisplayPriceNaira(prod)
                      const slug = getProductSlug(prod)
                      const variantCount = prod.galleryImages?.length || 1

                      return (
                        <tr key={prod.id} className="hover:bg-gray-50/60 transition-colors group">
                          {/* PRODUCT */}
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200/60 shadow-2xs">
                                {prod.video ? (
                                  <video src={prod.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                ) : (
                                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <h4
                                  onClick={() => handleOpenEdit(prod)}
                                  className="font-bold text-sm text-gray-900 group-hover:text-[#8C6B1C] transition-colors truncate cursor-pointer"
                                >
                                  {prod.name}
                                </h4>
                                <span className="text-xs text-gray-400 font-mono block truncate">
                                  {slug}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* CATEGORY */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="bg-gray-100 text-gray-700 font-semibold px-3 py-1 rounded-full text-[11px]">
                              {prod.collection || 'General'}
                            </span>
                          </td>

                          {/* BASE PRICE */}
                          <td className="py-4 px-4 whitespace-nowrap font-bold text-gray-900">
                            {formatNaira(nairaPrice)}
                          </td>

                          {/* VARIANTS */}
                          <td className="py-4 px-4 whitespace-nowrap text-gray-500 font-medium">
                            {variantCount} {variantCount === 1 ? 'variant' : 'variants'}
                          </td>

                          {/* STATUS */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-[11px] inline-flex items-center gap-1.5">
                              Active
                            </span>
                          </td>

                          {/* ACTIONS */}
                          <td className="py-4 pl-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-3">
                              <button
                                onClick={() => handleOpenEdit(prod)}
                                className="text-gray-400 hover:text-gray-800 transition-colors p-1 cursor-pointer"
                                title="Edit Product"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                className="text-gray-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                                title="Delete Product"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* 3. ORDERS VIEW (Matching Reference Screenshot 3)         */
          /* ======================================================== */
          <div className="space-y-8 animate-fadeIn">
            {/* Header & Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">
                  Orders
                </h1>
                <p className="text-sm text-gray-500 mt-1 font-sans">
                  {orders.length} orders
                </p>
              </div>

              <div className="relative">
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value as any)}
                  className="bg-white border border-gray-200 text-gray-700 font-semibold text-xs px-5 py-2.5 rounded-full cursor-pointer hover:bg-gray-50 transition-colors outline-none shadow-2xs appearance-none pr-9"
                >
                  <option value="All">All Orders</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Canceled</option>
                </select>
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
                  ▾
                </span>
              </div>
            </div>

            {/* Orders Table Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100/80 overflow-hidden min-h-[300px] flex flex-col justify-center">
              {orders.length === 0 ? (
                <div className="text-center py-16 space-y-2">
                  <div className="text-4xl">🎉</div>
                  <p className="text-sm font-semibold text-gray-500">
                    No orders found for this filter.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="text-gray-400 font-bold uppercase tracking-wider text-[11px] border-b border-gray-100 pb-4">
                      <th className="pb-4 font-semibold">CUSTOMER</th>
                      <th className="pb-4 font-semibold">DATE</th>
                      <th className="pb-4 font-semibold">TOTAL</th>
                      <th className="pb-4 font-semibold">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100/80">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50/60">
                        <td className="py-4 font-bold text-gray-900">{o.customer}</td>
                        <td className="py-4 text-gray-500">{o.date}</td>
                        <td className="py-4 font-bold text-gray-900">{formatNaira(o.total)}</td>
                        <td className="py-4">
                          <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-[11px]">
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* 4. MODAL: ADD / EDIT PRODUCT                             */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 font-sans animate-fadeIn">
          <div className="bg-white text-gray-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-6">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-gray-900">
                {editingProductId ? 'Edit Product' : 'New Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs font-medium">
              {/* Product Name */}
              <div>
                <label className="block text-gray-700 mb-1 font-bold">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#8C6B1C]"
                  placeholder="e.g. Handcrafted Teardrop Resin Drop Earrings"
                />
              </div>

              {/* Category & Prices */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1 font-bold">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#8C6B1C] bg-white"
                  >
                    <option value="Jewelry">Jewelry</option>
                    <option value="Daily-Accessories">Daily-Accessories</option>
                    <option value="Home-Decor">Home-Decor</option>
                    <option value="Handbags">Handbags</option>
                    <option value="Shoulder Bags">Shoulder Bags</option>
                    <option value="Evening">Evening</option>
                    <option value="Clutches">Clutches</option>
                    <option value="Bucket Bags">Bucket Bags</option>
                    <option value="Best Sellers">Best Sellers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 font-bold">Base Price (₦ Naira)</label>
                  <input
                    type="number"
                    required
                    value={formData.priceNaira}
                    onChange={(e) => {
                      const naira = Number(e.target.value)
                      setFormData({
                        ...formData,
                        priceNaira: naira,
                        priceUSD: Math.round(naira / 105) || 1,
                      })
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#8C6B1C]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 font-bold">Price ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={formData.priceUSD}
                    onChange={(e) => {
                      const usd = Number(e.target.value)
                      setFormData({
                        ...formData,
                        priceUSD: usd,
                        priceNaira: Math.round(usd * 105),
                      })
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#8C6B1C]"
                  />
                </div>
              </div>

              {/* Color & Material */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1 font-bold">Color</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#8C6B1C]"
                    placeholder="e.g. Gold / Black"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-bold">Material</label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#8C6B1C]"
                    placeholder="e.g. Glass & Resin"
                  />
                </div>
              </div>

              {/* Product Image File / URL */}
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-dashed border-gray-300 space-y-2">
                <label className="block text-gray-800 font-bold text-xs">
                  🖼️ Product Main Image (Upload from device or enter URL)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleDeviceFileUpload(e, 'image')}
                  className="block w-full text-xs text-gray-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#8C6B1C] file:text-white cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-900 outline-none"
                  placeholder="/images/bags-with-beads-1.png"
                />
                {formData.image && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 mt-1">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Product Video File / URL */}
              <div className="bg-amber-50/50 p-3.5 rounded-2xl border border-dashed border-[#8C6B1C]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-gray-900 font-bold text-xs">
                    🎥 Product Video (Upload from device or enter URL)
                  </label>
                  <span className="text-[10px] text-gray-400 font-normal">MP4, WEBM</span>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleDeviceFileUpload(e, 'video')}
                  className="block w-full text-xs text-gray-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#8C6B1C] file:text-white cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.video}
                  onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-900 outline-none"
                  placeholder="/videos/black-beaded-purse.mp4 or https://..."
                />
                {formData.video && (
                  <div className="relative aspect-[16/9] max-h-36 bg-black rounded-xl overflow-hidden border border-gray-300 mt-2">
                    <video src={formData.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-rose-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      LIVE VIDEO PREVIEW
                    </span>
                  </div>
                )}
              </div>

              {/* Featured Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700 pt-1">
                <input
                  type="checkbox"
                  checked={formData.isBestSeller}
                  onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                  className="w-4 h-4 rounded text-[#8C6B1C] focus:ring-0 cursor-pointer"
                />
                <span>Feature in Best Sellers</span>
              </label>

              {/* Form Action Buttons */}
              <div className="pt-3 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-full bg-[#8C6B1C] hover:bg-[#785B17] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  {editingProductId ? 'Save Changes' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-3 px-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
