interface AnnouncementBarProps {
  onOpenTrackOrder?: () => void
  onOpenContact?: () => void
  onOpenFaq?: () => void
}

export default function AnnouncementBar({
  onOpenTrackOrder,
  onOpenContact,
  onOpenFaq,
}: AnnouncementBarProps) {
  return (
    <div className="bg-[#0C3B36] text-white text-[13px] font-medium py-2.5 px-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-5 sm:gap-6 text-xs sm:text-[13px] flex-wrap">
        <button
          onClick={onOpenTrackOrder}
          className="underline underline-offset-4 decoration-white/60 hover:decoration-white font-semibold cursor-pointer"
        >
          Track Order
        </button>
        <button
          onClick={onOpenContact}
          className="underline underline-offset-4 decoration-white/60 hover:decoration-white font-semibold cursor-pointer"
        >
          Contact
        </button>
        <button
          onClick={onOpenFaq}
          className="underline underline-offset-4 decoration-white/60 hover:decoration-white font-semibold cursor-pointer"
        >
          FAQs
        </button>
        <span className="text-white/40 hidden sm:inline">—</span>
        <span className="bg-white text-[#0C3B36] font-bold px-3 py-1 rounded-md text-[11px] uppercase tracking-wider shadow-xs whitespace-nowrap">
          FREE SHIPPING FOREVER
        </span>
        <span className="font-bold tracking-wider uppercase whitespace-nowrap">
          TRUSTED BY 10,000+
        </span>
        <span className="font-bold tracking-wider uppercase whitespace-nowrap hidden md:inline">
          EASY RETURNS
        </span>
      </div>
    </div>
  )
}

