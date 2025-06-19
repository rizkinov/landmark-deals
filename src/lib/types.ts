// CBRE Capital Market Landmark Deals Types

export interface Deal {
  id: string
  property_name: string
  property_image_url: string | null
  country: 'Japan' | 'Korea' | 'Taiwan' | 'Hong Kong' | 'China' | 'Singapore' | 'Maldives' | 'Australia'
  deal_price_usd: number // in millions
  deal_price_sgd: number // in millions
  category: 'Investment Property Sales' | 'Services'
  subcategory: string
  deal_date: string // Q2 2024 format
  buyer: string
  seller: string
  created_at: string
  updated_at: string
}

export interface FilterState {
  search: string
  countries: string[]
  categories: string[]
  subcategories: string[]
  priceRange: {
    min: number | null
    max: number | null
    currency: 'USD' | 'SGD'
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
export type Category = Deal['category']

export const COUNTRIES: Country[] = [
  'Japan', 'Korea', 'Taiwan', 'Hong Kong', 'China', 'Singapore', 'Maldives', 'Australia'
]

export const CATEGORIES: Category[] = [
  'Investment Property Sales', 'Services'
]

export const SUBCATEGORIES: Record<Category, string[]> = {
  'Investment Property Sales': [
    'Office',
    'Hotels & Hospitality',
    'Industrial & Logistics',
    'Retail',
    'Residential / Multifamily',
    'Land',
    'Data Centres'
  ],
  'Services': [
    'Debt & Structured Finance',
    'Capital Advisors'
  ]
}

export const QUARTERS = [
  'Q1 2020', 'Q2 2020', 'Q3 2020', 'Q4 2020',
  'Q1 2021', 'Q2 2021', 'Q3 2021', 'Q4 2021',
  'Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022',
  'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023',
  'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'
]

export const COUNTRY_FLAGS: Record<Country, string> = {
  'Japan': '🇯🇵',
  'Korea': '🇰🇷',
  'Taiwan': '🇹🇼',
  'Hong Kong': '🇭🇰',
  'China': '🇨🇳',
  'Singapore': '🇸🇬',
  'Maldives': '🇲🇻',
  'Australia': '🇦🇺'
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
  deal_price_sgd: number
  category: Category
  subcategory: string
  deal_date: string
  buyer: string
  seller: string
}

export interface UpdateDealData extends Partial<CreateDealData> {
  id: string
} 