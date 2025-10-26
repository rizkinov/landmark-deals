import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency formatting utility - uses symbols only (no redundant currency codes)
export function formatCurrency(
  amount: number,
  currency: 'AUD' | 'CNY' | 'HKD' | 'INR' | 'JPY' | 'KRW' | 'MVR' | 'MYR' | 'NZD' | 'PHP' | 'SGD' | 'THB' | 'TWD' | 'USD' | 'VND',
  options: {
    showDecimals?: boolean
    unit?: 'M' | 'B' | '' // M for millions, B for billions
    includeBillionAnnotation?: boolean // Show billion annotation for USD deals > 1B
  } = {}
): { formatted: string; billionAnnotation?: string } {
  const { showDecimals = true, unit = 'M', includeBillionAnnotation = false } = options

  // Currency symbol mapping
  const currencySymbols = {
    AUD: 'A$',
    CNY: 'CN¥', // Chinese Yuan - distinguished from Japanese Yen
    HKD: 'HK$',
    INR: '₹',
    JPY: '¥',
    KRW: '₩',
    MVR: 'Rf',
    MYR: 'RM',
    NZD: 'NZ$',
    PHP: '₱',
    SGD: 'S$',
    THB: '฿',
    TWD: 'NT$',
    USD: '$',
    VND: '₫'
  }

  // Determine appropriate decimal places and unit
  let formattedAmount: string
  let displayUnit = unit
  let billionAnnotation: string | undefined

  if (currency === 'JPY' || currency === 'KRW') {
    // Japanese Yen and Korean Won typically don't use decimals and are often in billions
    if (amount >= 1000 && unit === 'M') {
      formattedAmount = (amount / 1000).toFixed(0)
      displayUnit = 'B'
    } else {
      formattedAmount = amount.toFixed(0)
    }
  } else if (currency === 'TWD') {
    // Taiwan Dollar - always display in billions due to large amounts
    if (unit === 'M') {
      formattedAmount = (amount / 1000).toFixed(1)
      displayUnit = 'B'
    } else {
      formattedAmount = showDecimals ? amount.toFixed(1) : amount.toFixed(0)
    }
  } else if (currency === 'INR' || currency === 'VND') {
    // Indian Rupee and Vietnamese Dong typically don't use decimals and are often in billions
    if (amount >= 1000 && unit === 'M') {
      formattedAmount = (amount / 1000).toFixed(0)
      displayUnit = 'B'
    } else {
      formattedAmount = amount.toFixed(0)
    }
  } else if (currency === 'PHP') {
    // Philippine Peso - often in billions for large deals
    if (amount >= 1000 && unit === 'M') {
      formattedAmount = (amount / 1000).toFixed(1)
      displayUnit = 'B'
    } else {
      formattedAmount = showDecimals ? amount.toFixed(1) : amount.toFixed(0)
    }
  } else {
    // Other currencies (USD, SGD, AUD, HKD, CNY, MVR, MYR, NZD, THB) use decimals
    formattedAmount = showDecimals ? amount.toFixed(1) : amount.toFixed(0)
  }

  // Check for billion annotation (only for USD and when amount is > 1000M)
  if (includeBillionAnnotation && currency === 'USD' && amount >= 1000 && unit === 'M') {
    const billionValue = (amount / 1000).toFixed(1)
    billionAnnotation = `$${billionValue} bil`
  }

  const formatted = `${currencySymbols[currency]}${formattedAmount}${displayUnit}`
  
  return billionAnnotation 
    ? { formatted, billionAnnotation }
    : { formatted }
}

// Backward compatible helper that returns string only
export function formatCurrencyString(
  amount: number,
  currency: 'AUD' | 'CNY' | 'HKD' | 'INR' | 'JPY' | 'KRW' | 'MVR' | 'MYR' | 'NZD' | 'PHP' | 'SGD' | 'THB' | 'TWD' | 'USD' | 'VND',
  options: {
    showDecimals?: boolean
    unit?: 'M' | 'B' | ''
  } = {}
): string {
  return formatCurrency(amount, currency, options).formatted
}

// Format price with proper decimal places and commas
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

// Format date to display format
export function formatDate(dateString: string): string {
  return dateString // Already in Q2 2024 format
}

// Generate excerpt from text
export function generateExcerpt(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Convert string to slug
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

// Convert quarter string (e.g., "Q2 2024") to a date for sorting/filtering
export function quarterToDate(quarterStr: string): string | null {
  const match = quarterStr.match(/^Q([1-4])\s+(\d{4})$/)
  if (!match) return null

  const quarter = parseInt(match[1])
  const year = parseInt(match[2])

  // Map quarters to months (start of quarter)
  const quarterToMonth = {
    1: '01', // Q1 starts in January
    2: '04', // Q2 starts in April
    3: '07', // Q3 starts in July
    4: '10'  // Q4 starts in October
  }

  return `${year}-${quarterToMonth[quarter as keyof typeof quarterToMonth]}-01`
}

// Exchange rates for currency conversion (same as DealForm)
export const EXCHANGE_RATES: Record<string, number> = {
  AUD: 1.5,
  CNY: 7.2,
  HKD: 7.8,
  INR: 83,
  JPY: 150,
  KRW: 1300,
  MVR: 15.4,
  MYR: 4.7,
  NZD: 1.6,
  PHP: 56,
  SGD: 1.35,
  THB: 36,
  TWD: 31,
  USD: 1,
  VND: 24000
}

// Round USD to whole millions based on local currency conversion
export function roundUsdFromLocal(
  localAmount: number,
  localCurrency: string
): number {
  if (localCurrency === 'USD') {
    return Math.round(localAmount)
  }

  const rate = EXCHANGE_RATES[localCurrency] || 1
  const usdAmount = localAmount / rate
  return Math.round(usdAmount) // Round to whole millions
}

// Format price with display mode (Over/Approx/Confidential)
export function formatPriceWithMode(
  amount: number,
  currency: 'AUD' | 'CNY' | 'HKD' | 'INR' | 'JPY' | 'KRW' | 'MVR' | 'MYR' | 'NZD' | 'PHP' | 'SGD' | 'THB' | 'TWD' | 'USD' | 'VND',
  displayMode?: 'exact' | 'over' | 'approx' | 'confidential',
  options: {
    showDecimals?: boolean
    unit?: 'M' | 'B' | ''
    includeBillionAnnotation?: boolean
  } = {}
): { formatted: string; billionAnnotation?: string } {
  // Handle confidential mode
  if (displayMode === 'confidential') {
    return { formatted: 'Confidential' }
  }

  // Get base formatting
  const { formatted, billionAnnotation } = formatCurrency(amount, currency, options)

  // Add prefix/suffix based on mode
  if (displayMode === 'over') {
    return {
      formatted: `Over ${formatted}`,
      billionAnnotation
    }
  } else if (displayMode === 'approx') {
    return {
      formatted: `Approx. ${formatted}`,
      billionAnnotation
    }
  }

  // Default: exact mode
  return { formatted, billionAnnotation }
}

// Get display text for USD when hidden
export function getUsdDisplayText(showUsd: boolean): string {
  return showUsd ? '' : 'USD: -'
}
