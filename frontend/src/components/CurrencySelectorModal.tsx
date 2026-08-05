import React from 'react'
import { useCurrency, CURRENCIES, type Currency } from '../store/useCurrency'

interface CurrencySelectorModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CurrencySelectorModal({ isOpen, onClose }: CurrencySelectorModalProps) {
  const { currentCurrency, setCurrency } = useCurrency()

  if (!isOpen) return null

  const handleSelect = (c: Currency) => {
    setCurrency(c)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Select Currency</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto divide-y divide-gray-100 space-y-1">
          {CURRENCIES.map((c) => {
            const isSelected = c.code === currentCurrency.code
            return (
              <button
                key={c.code}
                onClick={() => handleSelect(c)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all ${
                  isSelected ? 'bg-[#3B1E2B]/5 font-semibold text-[#3B1E2B]' : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className="font-medium text-sm text-gray-900">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.code}</div>
                  </div>
                </div>
                <div className="font-bold text-sm">
                  {c.symbol} {c.code}
                  {isSelected && <span className="ml-2 text-[#3B1E2B]">✓</span>}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
