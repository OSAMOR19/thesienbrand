import { create } from 'zustand'

export interface Currency {
  code: string
  symbol: string
  name: string
  flag: string
  rate: number // Rate relative to USD
}

export const CURRENCIES: Currency[] = [
  { code: 'NGN', symbol: '₦', name: 'Nigeria', flag: '🇳🇬', rate: 2881 },
  { code: 'USD', symbol: '$', name: 'United States', flag: '🇺🇸', rate: 1.0 },
  { code: 'EUR', symbol: '€', name: 'Euro Area', flag: '🇪🇺', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'United Kingdom', flag: '🇬🇧', rate: 0.79 },
  { code: 'CAD', symbol: 'CA$', name: 'Canada', flag: '🇨🇦', rate: 1.37 },
  { code: 'AUD', symbol: 'AU$', name: 'Australia', flag: '🇦🇺', rate: 1.52 },
  { code: 'AED', symbol: 'AED', name: 'United Arab Emirates', flag: '🇦🇪', rate: 3.67 },
  { code: 'JPY', symbol: '¥', name: 'Japan', flag: '🇯🇵', rate: 155.4 },
  { code: 'CHF', symbol: 'CHF', name: 'Switzerland', flag: '🇨🇭', rate: 0.91 },
  { code: 'SGD', symbol: 'SG$', name: 'Singapore', flag: '🇸🇬', rate: 1.35 },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong', flag: '🇭🇰', rate: 7.81 },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand', flag: '🇳🇿', rate: 1.64 },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghana', flag: '🇬🇭', rate: 15.2 },
  { code: 'KES', symbol: 'KSh', name: 'Kenya', flag: '🇰🇪', rate: 129.5 },
  { code: 'EGP', symbol: 'E£', name: 'Egypt', flag: '🇪🇬', rate: 48.3 },
  { code: 'INR', symbol: '₹', name: 'India', flag: '🇮🇳', rate: 83.5 },
  { code: 'ZAR', symbol: 'R', name: 'South Africa', flag: '🇿🇦', rate: 18.4 },
]

interface CurrencyState {
  currentCurrency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (basePriceUSD: number) => string
}

export const useCurrency = create<CurrencyState>((set, get) => ({
  currentCurrency: CURRENCIES[0], // Default NGN as seen in live site
  setCurrency: (currency) => set({ currentCurrency: currency }),
  formatPrice: (basePriceUSD) => {
    const { currentCurrency } = get()
    const converted = Math.round(basePriceUSD * currentCurrency.rate)
    return `${currentCurrency.symbol}${converted.toLocaleString()}`
  },
}))
