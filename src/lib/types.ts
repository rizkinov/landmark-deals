// CBRE Capital Market Landmark Deals Types

export interface Deal {
  id: string
  property_name: string
  property_image_url?: string | null
  property_images?: string[]
  country: 'Japan' | 'Korea' | 'Taiwan' | 'Hong Kong' | 'China' | 'Singapore' | 'Maldives' | 'Australia' | 'India' | 'New Zealand' | 'Philippines' | 'Vietnam' | 'Thailand'
  deal_price_usd: number // in millions
  local_currency?: 'USD' | 'SGD' | 'AUD' | 'JPY' | 'HKD' | 'CNY' | 'KRW' | 'TWD' | 'MVR' | 'INR' | 'NZD' | 'PHP' | 'VND' | 'THB'
  local_currency_amount?: number // in millions (or appropriate unit for currency)
  asset_class: 'Office' | 'Hotels & Hospitality' | 'Industrial & Logistics' | 'Retail' | 'Residential / Multifamily' | 'Land' | 'Data Centres'
  services: 'Debt & Structured Finance' | 'Capital Advisors' | 'Property Sales'
  deal_date: string // Q2 2024 format
  deal_date_sortable?: string
  buyer: string
  seller: string
  location: string // Required: city/town (e.g., "Marina Bay, Singapore")
  remarks?: string | null // Optional: additional notes
  location_remarks?: string | null // Optional: location-specific notes
  is_confidential?: boolean // Optional: whether pricing is confidential
  created_at: string
  updated_at?: string
  last_edited_at?: string
  last_edited_by?: string
  last_edited_by_email?: string
  last_edited_by_role?: string
}

export interface FilterState {
  search: string
  countries: string[]
  assetClasses: string[]
  services: string[]
  priceRange: {
    min: number | null
    max: number | null
    currency: 'USD'
  }
  dateRange: {
    startQuarter: string | null
    endQuarter: string | null
  }
  buyers: string[]
  sellers: string[]
  sortBy: 'price_desc' | 'price_asc' | 'date_desc' | 'date_asc' | 'name_asc'
}

export interface FilterPreset {
  id: string
  name: string
  filters: Partial<FilterState>
  createdAt: string
}

export type Country = Deal['country']
export type AssetClass = Deal['asset_class']
export type Services = Deal['services']

export const COUNTRIES: Country[] = [
  'Japan', 'Korea', 'Taiwan', 'Hong Kong', 'China', 'Singapore', 'Maldives', 'Australia', 'India', 'New Zealand', 'Philippines', 'Vietnam', 'Thailand'
]

export const ASSET_CLASSES: AssetClass[] = [
  'Office',
  'Hotels & Hospitality',
  'Industrial & Logistics',
  'Retail',
  'Residential / Multifamily',
  'Land',
  'Data Centres'
]

export const SERVICES: Services[] = [
  'Debt & Structured Finance',
  'Capital Advisors',
  'Property Sales'
]

export const QUARTERS = [
  'Q1 2020', 'Q2 2020', 'Q3 2020', 'Q4 2020',
  'Q1 2021', 'Q2 2021', 'Q3 2021', 'Q4 2021',
  'Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022',
  'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023',
  'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024',
  'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'
]

export const COUNTRY_FLAGS: Record<Country, string> = {
  'Japan': '🇯🇵',
  'Korea': '🇰🇷',
  'Taiwan': '🇹🇼',
  'Hong Kong': '🇭🇰',
  'China': '🇨🇳',
  'Singapore': '🇸🇬',
  'Maldives': '🇲🇻',
  'Australia': '🇦🇺',
  'India': '🇮🇳',
  'New Zealand': '🇳🇿',
  'Philippines': '🇵🇭',
  'Vietnam': '🇻🇳',
  'Thailand': '🇹🇭'
}

export const ASSET_CLASS_COLORS: Record<AssetClass, string> = {
  'Office': 'bg-blue-100 text-blue-800',
  'Hotels & Hospitality': 'bg-purple-100 text-purple-800',
  'Industrial & Logistics': 'bg-orange-100 text-orange-800',
  'Retail': 'bg-green-100 text-green-800',
  'Residential / Multifamily': 'bg-yellow-100 text-yellow-800',
  'Land': 'bg-amber-100 text-amber-800',
  'Data Centres': 'bg-indigo-100 text-indigo-800'
}

export const SERVICES_COLORS: Record<Services, string> = {
  'Debt & Structured Finance': 'bg-gray-50 text-gray-600 border-gray-200',
  'Capital Advisors': 'bg-gray-50 text-gray-600 border-gray-200',
  'Property Sales': 'bg-gray-50 text-gray-600 border-gray-200'
}

export const PRICE_RANGES = [
  { label: 'Under $50M', min: 0, max: 50 },
  { label: '$50M - $100M', min: 50, max: 100 },
  { label: '$100M - $500M', min: 100, max: 500 },
  { label: '$500M+', min: 500, max: null }
]

export const SORT_OPTIONS = [
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'date_desc', label: 'Date: Newest First' },
  { value: 'date_asc', label: 'Date: Oldest First' },
  { value: 'name_asc', label: 'Property Name: A to Z' }
] as const

export interface DealsResponse {
  data: Deal[]
  total: number
  filtered: number
}

export interface CreateDealData {
  property_name: string
  property_image_url?: string
  country: Country
  deal_price_usd: number
  local_currency: 'USD' | 'SGD' | 'AUD' | 'JPY' | 'HKD' | 'CNY' | 'KRW' | 'TWD' | 'MVR' | 'INR' | 'NZD' | 'PHP' | 'VND' | 'THB'
  local_currency_amount: number
  asset_class: AssetClass
  services: Services
  deal_date: string
  buyer: string
  seller: string
  location: string
  remarks?: string
  is_confidential?: boolean
}

export interface UpdateDealData extends Partial<CreateDealData> {
  id: string
}

// Country to available currencies mapping
export const COUNTRY_CURRENCIES: Record<Country, string[]> = {
  'Australia': ['AUD', 'USD'],
  'Japan': ['JPY', 'USD'],
  'Singapore': ['SGD', 'USD'],
  'Hong Kong': ['HKD', 'USD'],
  'China': ['CNY', 'USD'],
  'Korea': ['KRW', 'USD'],
  'Taiwan': ['TWD', 'USD'],
  'Maldives': ['MVR', 'USD'],
  'India': ['INR', 'USD'],
  'New Zealand': ['NZD', 'USD'],
  'Philippines': ['PHP', 'USD'],
  'Vietnam': ['VND', 'USD'],
  'Thailand': ['THB', 'USD']
} 