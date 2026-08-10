import React, { useState } from 'react'
import type { Product } from '../data/products'
import { uploadMediaToSupabase } from '../services/products'
import { isSupabaseConfigured } from '../lib/supabaseClient'

export interface AdminOrder {
  id: string
  customer: string
  email: string
  items: string
  total: number
  date: string
  fulfillmentStatus: 'Processing' | 'Delivering' | 'Completed' | 'Canceled'
  paymentStatus: 'Paid' | 'Wait for pay' | 'Refunded'
  selected?: boolean
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
  const [activeSidebarTab, setActiveSidebarTab] = useState<'dashboard' | 'orders' | 'products' | 'customers' | 'settings'>('orders')
  const [orderFilterTab, setOrderFilterTab] = useState<'All' | 'Processing' | 'Delivering' | 'Completed' | 'Canceled'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatusMsg, setUploadStatusMsg] = useState('')

  // Orders State (Matching the reference layout image)
  const [orders, setOrders] = useState<AdminOrder[]>([
    { id: 'UID23456', customer: 'Pauline Wright', email: 'pauline@example.com', items: 'Black Beaded Purse x1', total: 2499, date: '2026/10/31', fulfillmentStatus: 'Delivering', paymentStatus: 'Paid', selected: true },
    { id: 'UID23457', customer: 'Estella Brewer', email: 'estella@example.com', items: 'Pearl Beaded Bag x1', total: 780, date: '2026/10/31', fulfillmentStatus: 'Completed', paymentStatus: 'Wait for pay', selected: true },
    { id: 'UID23458', customer: 'May Castro', email: 'may@example.com', items: 'Lemon Beaded Bag x1', total: 529, date: '2026/10/18', fulfillmentStatus: 'Processing', paymentStatus: 'Wait for pay', selected: false },
    { id: 'UID23410', customer: 'Isabella Figueroa', email: 'isabella@example.com', items: 'Gold Metallic Bag x1', total: 3888, date: '2026/10/12', fulfillmentStatus: 'Processing', paymentStatus: 'Paid', selected: true },
    { id: 'UID23472', customer: 'Derrick Caldwell', email: 'derrick@example.com', items: 'Clear Beaded Purse x1', total: 765, date: '2026/10/04', fulfillmentStatus: 'Processing', paymentStatus: 'Wait for pay', selected: false },
    { id: 'UID23433', customer: 'Peter Su', email: 'peter@example.com', items: 'Pink Beaded Purse x1', total: 1080, date: '2026/09/22', fulfillmentStatus: 'Canceled', paymentStatus: 'Paid', selected: false },
    { id: 'UID23436', customer: 'John Mayer', email: 'john@example.com', items: 'Pearl Sequin Bag x1', total: 2499, date: '2026/09/16', fulfillmentStatus: 'Canceled', paymentStatus: 'Paid', selected: false },
    { id: 'UID23490', customer: 'Sophia Bennett', email: 'sophia@example.com', items: 'Green Beaded Purse x1', total: 1250, date: '2026/09/10', fulfillmentStatus: 'Completed', paymentStatus: 'Paid', selected: false },
    { id: 'UID23491', customer: 'Emma Watson', email: 'emma@example.com', items: 'Yellow Handbag x1', total: 890, date: '2026/09/05', fulfillmentStatus: 'Delivering', paymentStatus: 'Paid', selected: false },
  ])

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

  // Access Control Guard
  if (!isAdminLoggedIn) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto min-h-[70vh] flex flex-col justify-center animate-fadeIn font-sans">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mx-auto font-extrabold shadow-xs">
            🔒
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Admin Access Required
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              You must be logged in with admin privileges to view and manage The Sien Studio panel.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={onGoToSignIn}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#1D212A] hover:bg-[#151821] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-[1.01]"
            >
              ⚡ Sign In as Admin Page
            </button>
            <button
              onClick={onBackToHome}
              className="w-full py-3 px-6 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Return to Public Store
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Handle uploading media file directly from user device
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'video' | 'image') => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadStatusMsg(`Uploading ${field} from device...`)

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
      const updated = productsList.map((p) =>
        p.id === editingProductId
          ? {
              ...p,
              name: formData.name,
              priceUSD: Number(formData.priceUSD),
              collection: formData.collection as any,
              color: formData.color,
              material: formData.material,
              image: formData.image || '/images/black-beaded-purse-1.png',
              video: formData.video || undefined,
              isBestSeller: formData.isBestSeller,
            }
          : p
      )
      onUpdateProducts(updated)
    } else {
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

  // Order Handlers
  const handleToggleSelectOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, selected: !o.selected } : o))
    )
  }

  const handleToggleSelectAll = () => {
    const allSelected = orders.every((o) => o.selected)
    setOrders((prev) => prev.map((o) => ({ ...o, selected: !allSelected })))
  }

  const handleChangeOrderStatus = (id: string, newStatus: AdminOrder['fulfillmentStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, fulfillmentStatus: newStatus } : o))
    )
  }

  const handleDeleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id))
  }

  const handleAddNewOrderPrompt = () => {
    const customer = prompt('Enter customer name:', 'Sarah Jenkins')
    if (!customer) return
    const newOrd: AdminOrder = {
      id: `UID${Math.floor(10000 + Math.random() * 90000)}`,
      customer,
      email: `${customer.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      items: 'Custom Beaded Clutch x1',
      total: 1450,
      date: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
      fulfillmentStatus: 'Processing',
      paymentStatus: 'Paid',
      selected: false,
    }
    setOrders([newOrd, ...orders])
  }

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesFilter =
      orderFilterTab === 'All' ? true : o.fulfillmentStatus === orderFilterTab
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#E5E9EE] font-sans antialiased flex flex-col lg:flex-row text-gray-700">
      {/* LEFT SIDEBAR (Dark Navy Theme matching reference image) */}
      <aside className="w-full lg:w-64 bg-[#1B212D] text-gray-300 flex-shrink-0 flex flex-col justify-between select-none">
        <div>
          {/* Brand Logo Header */}
          <div className="px-5 py-5 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center font-black text-white text-base shadow-sm">
                A
              </div>
              <span className="font-extrabold text-white text-base tracking-tight font-sans">
                The Sien Studio
              </span>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors cursor-pointer text-xs">
              ⇅
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-4 space-y-1 text-xs font-semibold">
            {/* Dashboard */}
            <button
              onClick={() => setActiveSidebarTab('dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                activeSidebarTab === 'dashboard'
                  ? 'bg-[#283042] text-white font-extrabold'
                  : 'hover:bg-gray-800/60 text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span>📊</span>
                <span>Dashboard</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-blue-500" />
            </button>

            {/* Orders Accordion Header */}
            <div>
              <button
                onClick={() => setActiveSidebarTab('orders')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeSidebarTab === 'orders'
                    ? 'bg-[#283042] text-white font-extrabold'
                    : 'hover:bg-gray-800/60 text-gray-400 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>📜</span>
                  <span>Order</span>
                </div>
                <span className="text-[10px]">▼</span>
              </button>

              {/* Sub-item */}
              {activeSidebarTab === 'orders' && (
                <div className="pl-9 pr-3 py-2 text-[11px] text-gray-400 font-normal">
                  <span className="bg-gray-800 px-2 py-1 rounded text-cyan-400 font-bold block cursor-pointer">
                    Picking Mode
                  </span>
                </div>
              )}
            </div>

            {/* Products */}
            <button
              onClick={() => setActiveSidebarTab('products')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                activeSidebarTab === 'products'
                  ? 'bg-[#283042] text-white font-extrabold'
                  : 'hover:bg-gray-800/60 text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span>📦</span>
                <span>Products &amp; Upload</span>
              </div>
              <span className="text-[10px]">▼</span>
            </button>

            {/* Customers */}
            <button
              onClick={() => setActiveSidebarTab('customers')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                activeSidebarTab === 'customers'
                  ? 'bg-[#283042] text-white font-extrabold'
                  : 'hover:bg-gray-800/60 text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span>👤</span>
                <span>Customers</span>
              </div>
            </button>

            {/* Report */}
            <div className="flex items-center justify-between px-3 py-2.5 text-gray-400 hover:text-gray-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <span>📊</span>
                <span>Report</span>
              </div>
            </div>

            {/* Inventory */}
            <div className="flex items-center justify-between px-3 py-2.5 text-gray-400 hover:text-gray-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <span>🛒</span>
                <span>Inventory</span>
              </div>
            </div>

            {/* Sales Channel */}
            <div className="flex items-center justify-between px-3 py-2.5 text-gray-400 hover:text-gray-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <span>📢</span>
                <span>Sales Channel</span>
              </div>
            </div>

            {/* My Sales Channel List */}
            <div className="pt-3 pb-1 border-t border-gray-800/80">
              <div className="flex items-center justify-between px-3 text-[11px] text-cyan-400 font-bold mb-2">
                <span>My Sales Channel</span>
                <span className="bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded text-[9px]">8</span>
              </div>
              <div className="space-y-1 pl-3 text-[11px] text-gray-400 font-medium">
                <div className="py-1 hover:text-white cursor-pointer">UIUX Cafe</div>
                <div className="py-1 hover:text-white cursor-pointer">Deer Cafe</div>
                <div className="py-1 hover:text-white cursor-pointer">Journey Kaffee</div>
                <div className="py-1 hover:text-white cursor-pointer">Little Junkie</div>
                <div className="py-1 hover:text-white cursor-pointer">Sunday Cafe</div>
                <div className="py-1 text-cyan-400 font-bold tracking-widest">...</div>
              </div>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-gray-800 space-y-1 text-xs font-semibold">
          {/* Settings */}
          <button
            onClick={() => setActiveSidebarTab('settings')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              activeSidebarTab === 'settings'
                ? 'bg-[#283042] text-white font-extrabold'
                : 'hover:bg-gray-800/60 text-gray-400 hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span>⚙️</span>
              <span>Setting</span>
            </div>
            <span className="text-[10px]">&gt;</span>
          </button>

          {/* Return to Public Shop */}
          <button
            onClick={onBackToHome}
            className="w-full flex items-center gap-3 px-3 py-2 text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
          >
            <span>←</span>
            <span>Public Store</span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN PANEL WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F4F6F9]">
        {/* TOP NAVBAR (Matching Reference Bar) */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0 shadow-2xs">
          {/* Search Box */}
          <div className="relative w-64 sm:w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-md border border-gray-200 bg-gray-50 text-xs text-gray-800 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Right Admin Controls */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="hidden sm:flex items-center gap-2 text-gray-600">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                {adminEmail ? adminEmail[0].toUpperCase() : 'A'}
              </span>
              <span className="text-gray-800 font-bold">{adminEmail || 'Simon Lin'}</span>
              <span className="text-gray-400 text-[10px]">▼</span>
            </div>

            <button
              onClick={onLogoutAdmin}
              className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors cursor-pointer border border-gray-200"
            >
              Logout
            </button>

            <button
              onClick={onBackToHome}
              className="px-4 py-1.5 rounded-md bg-[#2563EB] hover:bg-blue-700 text-white font-bold transition-colors cursor-pointer shadow-xs"
            >
              Save
            </button>
          </div>
        </header>

        {/* MAIN PANEL CONTENT AREA */}
        <main className="p-6 flex-1 overflow-y-auto space-y-6">
          {activeSidebarTab === 'orders' ? (
            /* ORDERS TAB (Exact visual replica of reference image) */
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
              {/* Header Title Bar */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900 font-sans tracking-tight">Orders</h1>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOrders(orders)}
                    className="px-4 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs cursor-pointer border border-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => alert('Orders updated successfully!')}
                    className="px-4 py-1.5 rounded-md bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Status Filter Tabs (All, Processing, Delivery, Completed, Canceled) */}
              <div className="px-6 border-b border-gray-200 flex items-center gap-6 text-xs font-bold text-gray-500 bg-gray-50/50">
                {(['All', 'Processing', 'Delivering', 'Completed', 'Canceled'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setOrderFilterTab(tab)}
                    className={`py-3 transition-colors cursor-pointer relative ${
                      orderFilterTab === tab ? 'text-teal-600 font-extrabold' : 'hover:text-gray-900'
                    }`}
                  >
                    {tab === 'Delivering' ? 'Delivery' : tab}
                    {orderFilterTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Sub Action Bar: Search input, date range, + Add New Order */}
              <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-md border border-gray-200 text-xs text-gray-800 outline-none focus:border-blue-500 w-48 sm:w-64"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-[11px]">
                    <span>18/11/2016</span>
                    <span>to</span>
                    <span>22/11/2016</span>
                  </div>
                </div>

                <button
                  onClick={handleAddNewOrderPrompt}
                  className="text-blue-600 hover:text-blue-800 text-xs font-extrabold cursor-pointer flex items-center gap-1"
                >
                  <span>+ Add New Order</span>
                </button>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4 w-10">
                        <div className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={orders.length > 0 && orders.every((o) => o.selected)}
                            onChange={handleToggleSelectAll}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                          />
                          <span className="text-[10px] text-gray-400">▾</span>
                        </div>
                      </th>
                      <th className="py-3 px-4">Order</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Buyer name</th>
                      <th className="py-3 px-4">Fulfillment status</th>
                      <th className="py-3 px-4">Total price</th>
                      <th className="py-3 px-4">Payment status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredOrders.map((o) => {
                      const isCanceled = o.fulfillmentStatus === 'Canceled'
                      return (
                        <tr
                          key={o.id}
                          className={`transition-colors ${
                            isCanceled
                              ? 'bg-rose-50/60 hover:bg-rose-50 text-rose-900'
                              : o.selected
                              ? 'bg-blue-50/20 hover:bg-blue-50/40'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <input
                              type="checkbox"
                              checked={!!o.selected}
                              onChange={() => handleToggleSelectOrder(o.id)}
                              className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                            />
                          </td>
                          <td className="py-3.5 px-4 font-bold text-cyan-600 hover:underline cursor-pointer">
                            {o.id}
                          </td>
                          <td className="py-3.5 px-4 text-gray-500 font-medium">{o.date}</td>
                          <td className="py-3.5 px-4 font-bold text-gray-800">{o.customer}</td>
                          <td className="py-3.5 px-4">
                            <select
                              value={o.fulfillmentStatus}
                              onChange={(e) =>
                                handleChangeOrderStatus(
                                  o.id,
                                  e.target.value as AdminOrder['fulfillmentStatus']
                                )
                              }
                              className={`px-2.5 py-1 rounded border text-[11px] font-semibold outline-none cursor-pointer ${
                                isCanceled
                                  ? 'bg-rose-100 border-rose-200 text-rose-700'
                                  : o.fulfillmentStatus === 'Completed'
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                  : 'bg-white border-gray-200 text-gray-700'
                              }`}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Delivering">Delivering</option>
                              <option value="Completed">Completed</option>
                              <option value="Canceled">Canceled</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-gray-900">
                            NT$ {o.total.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 font-semibold">
                            <span
                              className={`text-[11px] ${
                                o.paymentStatus === 'Paid' ? 'text-gray-700' : 'text-gray-400'
                              }`}
                            >
                              {o.paymentStatus}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {isCanceled ? (
                              <button
                                onClick={() => handleChangeOrderStatus(o.id, 'Processing')}
                                className="text-rose-600 hover:text-rose-800 font-bold text-xs cursor-pointer hover:underline"
                              >
                                Return
                              </button>
                            ) : (
                              <button
                                onClick={() => handleDeleteOrder(o.id)}
                                className="text-gray-400 hover:text-rose-600 text-sm transition-colors cursor-pointer"
                                title="Delete order"
                              >
                                🗑️
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-4 bg-gray-50/60 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold">{filteredOrders.length} orders</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOrders(orders)}
                    className="px-4 py-1.5 rounded-md bg-white hover:bg-gray-100 text-gray-600 font-bold cursor-pointer border border-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => alert('Orders saved!')}
                    className="px-4 py-1.5 rounded-md bg-[#2563EB] hover:bg-blue-700 text-white font-bold cursor-pointer shadow-xs"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : activeSidebarTab === 'products' ? (
            /* PRODUCTS & DEVICE MEDIA UPLOADER TAB */
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                    Products Catalog &amp; Media Studio
                  </h1>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload product videos and high-res images directly from your device to Supabase Storage CDN.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      isSupabaseConfigured
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {isSupabaseConfigured ? '🟢 Supabase CDN Active' : '🟠 Local Preview Mode'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Form Column */}
                <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h2 className="font-extrabold text-gray-900 text-sm font-sans">
                      {editingProductId ? '✏️ Edit Product' : '➕ Add New Product'}
                    </h2>
                    {editingProductId && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                        Editing Mode
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-medium">
                    <div>
                      <label className="block text-gray-700 mb-1 font-bold">Product Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-md border border-gray-200 text-xs text-gray-900 outline-none focus:border-blue-500"
                        placeholder="e.g. Emerald Pearl Beaded Clutch"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-700 mb-1 font-bold">Price ($ USD)</label>
                        <input
                          type="number"
                          required
                          value={formData.priceUSD}
                          onChange={(e) => setFormData({ ...formData, priceUSD: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-md border border-gray-200 text-xs outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1 font-bold">Collection</label>
                        <select
                          value={formData.collection}
                          onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                          className="w-full px-2.5 py-2 rounded-md border border-gray-200 text-xs outline-none focus:border-blue-500 bg-white"
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

                    {/* Device Video File Upload */}
                    <div className="bg-gray-50 p-3.5 rounded-lg border border-dashed border-blue-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-blue-900 font-extrabold text-xs">
                          🎥 Product Video (Upload from Device)
                        </label>
                        <span className="text-[10px] text-gray-400">MP4, WEBM</span>
                      </div>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileUpload(e, 'video')}
                        className="block w-full text-xs text-gray-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                      />
                    </div>

                    {/* Device Image File Upload */}
                    <div className="bg-gray-50 p-3.5 rounded-lg border border-dashed border-gray-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-gray-800 font-extrabold text-xs">
                          🖼️ Product Image (Upload from Device)
                        </label>
                        <span className="text-[10px] text-gray-400">PNG, JPG</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'image')}
                        className="block w-full text-xs text-gray-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-gray-800 file:text-white hover:file:bg-gray-900 cursor-pointer"
                      />
                    </div>

                    {uploadStatusMsg && (
                      <div className="bg-blue-50 text-blue-700 p-2.5 rounded text-center text-xs font-bold animate-pulse">
                        {uploadStatusMsg}
                      </div>
                    )}

                    {/* Best Seller Checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.isBestSeller}
                        onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                      />
                      <span>Mark as Featured Best Seller</span>
                    </label>

                    <div className="pt-2 flex gap-2">
                      <button
                        type="submit"
                        disabled={isUploading}
                        className="flex-1 py-2.5 px-4 rounded-md bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                      >
                        {editingProductId ? 'Save Changes' : 'Publish Product'}
                      </button>
                      {editingProductId && (
                        <button
                          type="button"
                          onClick={resetForm}
                          className="px-3 py-2.5 rounded-md bg-gray-100 text-gray-600 font-bold text-xs cursor-pointer hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Catalog Table Column */}
                <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-extrabold text-gray-900 text-sm">
                      Catalog Items ({productsList.length})
                    </h3>
                  </div>

                  <div className="divide-y divide-gray-100 max-h-[650px] overflow-y-auto">
                    {productsList.map((p) => (
                      <div key={p.id} className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                            {p.video ? (
                              <video src={p.video} autoPlay loop muted className="w-full h-full object-cover" />
                            ) : (
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs text-gray-900 truncate">{p.name}</h4>
                            <div className="text-[11px] text-gray-500 font-medium">
                              ${p.priceUSD} USD • {p.collection}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleEditClick(p)}
                          className="px-3 py-1.5 rounded bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 text-xs font-bold transition-all cursor-pointer border border-gray-200"
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : activeSidebarTab === 'dashboard' ? (
            /* DASHBOARD OVERVIEW TAB */
            <div className="space-y-6">
              <h1 className="text-xl font-bold text-gray-900">Dashboard Overview</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-xs text-gray-400 font-bold uppercase">Total Orders</span>
                  <div className="text-2xl font-extrabold text-gray-900 mt-1">{orders.length} orders</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-xs text-gray-400 font-bold uppercase">Total Revenue</span>
                  <div className="text-2xl font-extrabold text-blue-600 mt-1">
                    NT$ {orders.reduce((acc, o) => acc + o.total, 0).toLocaleString()}
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-xs text-gray-400 font-bold uppercase">Catalog Products</span>
                  <div className="text-2xl font-extrabold text-gray-900 mt-1">{productsList.length} items</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-xs text-gray-400 font-bold uppercase">CDN Storage</span>
                  <div className="text-xs font-bold text-teal-600 mt-2">
                    {isSupabaseConfigured ? '🟢 Connected' : '🟠 Demo Mode'}
                  </div>
                </div>
              </div>
            </div>
          ) : activeSidebarTab === 'customers' ? (
            /* CUSTOMERS TAB */
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 space-y-4">
              <h1 className="text-xl font-bold text-gray-900">Customer Directory</h1>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Total Spent</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-bold text-gray-900">{o.customer}</td>
                        <td className="py-3 px-4 text-gray-500">{o.email}</td>
                        <td className="py-3 px-4 font-bold text-gray-900">NT$ {o.total}</td>
                        <td className="py-3 px-4">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Active Buyer
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* SETTINGS TAB */
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 space-y-4">
              <h1 className="text-xl font-bold text-gray-900">Store &amp; Supabase Settings</h1>
              <p className="text-xs text-gray-600">
                Manage cloud storage credentials, store settings, and database integration.
              </p>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2 text-xs font-medium">
                <div><strong>Supabase Connection Status:</strong> {isSupabaseConfigured ? '🟢 Active' : '🟠 Not Configured (Using Local Fallback)'}</div>
                <div><strong>Storage Bucket:</strong> product-media</div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
