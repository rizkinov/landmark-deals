// CBRE Capital Market Landmark Deals Types

// Price display mode types
export type PriceDisplayMode = 'exact' | 'over' | 'approx' | 'confidential'

// Site Settings
export interface SiteSetting {
  id: string
  setting_key: string
  setting_value: string
  updated_at: string
  updated_by?: string | null
  created_at: string
}

export interface SitePasswordStatus {
  isSet: boolean
  lastUpdated?: string
  updatedBy?: string
}

export interface Deal {
  id: string
  property_name: string
  property_image_url?: string | null
  property_images?: string[]
  country: 'Australia' | 'China' | 'Hong Kong' | 'India' | 'Japan' | 'Korea' | 'Malaysia' | 'Maldives' | 'New Zealand' | 'Philippines' | 'Singapore' | 'Taiwan' | 'Thailand' | 'Vietnam'
  deal_price_usd: number // in millions
  local_currency?: 'AUD' | 'CNY' | 'HKD' | 'INR' | 'JPY' | 'KRW' | 'MVR' | 'MYR' | 'NZD' | 'PHP' | 'SGD' | 'THB' | 'TWD' | 'USD' | 'VND'
  local_currency_amount?: number // in millions (or appropriate unit for currency)
  asset_class: 'Office' | 'Hotels & Hospitality' | 'Industrial & Logistics' | 'Retail' | 'Residential / Multifamily' | 'Land' | 'Data Centres' | null
  custom_asset_class?: string | null // For D&SF: custom asset class when standard options don't apply
  services: 'Debt & Structured Finance' | 'Capital Advisors' | 'Property Sales' | 'Sale & Leaseback'
  deal_date: string // Q2 2024 format
  deal_date_sortable?: string
  buyer: string
  seller: string
  location: string // Required: city/town (e.g., "Marina Bay, Singapore")
  remarks?: string | null // Optional: additional notes
  location_remarks?: string | null // Optional: location-specific notes
  is_confidential?: boolean // Optional: whether pricing is confidential (computed from price_display_mode)
  price_display_mode?: PriceDisplayMode // Optional: how to display price (exact, over, approx, confidential)
  show_usd?: boolean // Optional: whether to show USD amount (false shows "USD: -")
  // Capital Advisors specific fields
  project_title?: string | null // For Capital Advisors: main project title
  project_subtitle?: string | null // For Capital Advisors: project subtitle
  content_html?: string | null // For Capital Advisors: rich text content
  gallery_images?: string[] | null // For Capital Advisors: array of gallery image URLs
  slug?: string | null // For Capital Advisors: URL-friendly identifier
  // Debt & Structured Finance specific fields
  deal_type?: string | null // For D&SF: Senior Investment, Mezzanine Finance, Bridge Loan, Construction Finance
  custom_deal_type?: string | null // For D&SF: custom deal type when standard options don't apply
  purpose?: string | null // For D&SF: Land Bank & Construction, Acquisition Finance, etc.
  loan_size_local?: number | null // For D&SF: Loan amount in local currency (millions)
  loan_size_currency?: 'AUD' | 'CNY' | 'HKD' | 'INR' | 'JPY' | 'KRW' | 'MVR' | 'MYR' | 'NZD' | 'PHP' | 'SGD' | 'THB' | 'TWD' | 'USD' | 'VND' | null // For D&SF: Currency for loan size
  ltv_percentage?: number | null // For D&SF: Loan-to-value ratio (0-100)
  loan_term?: string | null // For D&SF: Term of the loan (e.g., "4 years")
  borrower?: string | null // For D&SF: Entity borrowing the funds
  lender_source?: string | null // For D&SF: Bank Lender, Non Bank Lender, Private Equity, etc.
  // Sale & Leaseback specific fields
  yield_percentage?: number | null // For S&L: Yield (Investment yield percentage 0-100)
  gla_sqm?: number | null // For S&L: Gross Leasable Area in square meters
  tenant?: string | null // For S&L: Entity leasing back the property
  lease_term_months?: number | null // For S&L: Leaseback Period (Duration of leaseback agreement in months)
  annual_rent?: number | null // For S&L: Deal Price (in millions)
  rent_currency?: string | null // For S&L: Currency for deal price
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
export type AssetClass = NonNullable<Deal['asset_class']>
export type Services = Deal['services']

export const COUNTRIES: Country[] = [
  'Australia', 'China', 'Hong Kong', 'India', 'Japan', 'Korea', 'Malaysia', 'Maldives', 'New Zealand', 'Philippines', 'Singapore', 'Taiwan', 'Thailand', 'Vietnam'
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
  'Property Sales',
  'Sale & Leaseback'
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
  'Australia': '🇦🇺',
  'China': '🇨🇳',
  'Hong Kong': '🇭🇰',
  'India': '🇮🇳',
  'Japan': '🇯🇵',
  'Korea': '🇰🇷',
  'Malaysia': '🇲🇾',
  'Maldives': '🇲🇻',
  'New Zealand': '🇳🇿',
  'Philippines': '🇵🇭',
  'Singapore': '🇸🇬',
  'Taiwan': '🇹🇼',
  'Thailand': '🇹🇭',
  'Vietnam': '🇻🇳'
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
  'Property Sales': 'bg-gray-50 text-gray-600 border-gray-200',
  'Sale & Leaseback': 'bg-teal-50 text-teal-700 border-teal-200'
}

// D&SF specific constants
export const DEAL_TYPES = [
  'Senior Investment',
  'Mezzanine Finance',
  'Bridge Loan',
  'Construction Finance'
] as const

export const LENDER_SOURCES = [
  'Bank Lender',
  'Non Bank Lender',
  'International Bank',
  'Private Equity',
  'REIT',
  'Government Fund'
] as const

export const FINANCING_PURPOSES = [
  'Land Bank & Construction',
  'Acquisition Finance',
  'Development Finance',
  'Refinancing',
  'Working Capital'
] as const

export type DealType = typeof DEAL_TYPES[number]
export type LenderSource = typeof LENDER_SOURCES[number]
export type FinancingPurpose = typeof FINANCING_PURPOSES[number]

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
  local_currency: 'AUD' | 'CNY' | 'HKD' | 'INR' | 'JPY' | 'KRW' | 'MVR' | 'MYR' | 'NZD' | 'PHP' | 'SGD' | 'THB' | 'TWD' | 'USD' | 'VND'
  local_currency_amount: number
  asset_class: AssetClass | null
  custom_asset_class?: string
  services: Services
  deal_date: string
  buyer: string
  seller: string
  location: string
  remarks?: string
  is_confidential?: boolean
  price_display_mode?: PriceDisplayMode
  show_usd?: boolean
  // Capital Advisors specific fields
  project_title?: string
  project_subtitle?: string
  content_html?: string
  gallery_images?: string[]
  // Debt & Structured Finance specific fields
  deal_type?: DealType | string | null
  custom_deal_type?: string
  purpose?: FinancingPurpose | string
  loan_size_local?: number
  loan_size_currency?: 'USD' | 'SGD' | 'AUD' | 'JPY' | 'HKD' | 'CNY' | 'KRW' | 'TWD' | 'MVR' | 'INR' | 'NZD' | 'PHP' | 'VND' | 'THB'
  ltv_percentage?: number
  loan_term?: string
  borrower?: string
  lender_source?: LenderSource | string
  // Sale & Leaseback specific fields
  yield_percentage?: number
  gla_sqm?: number
  tenant?: string
  lease_term_months?: number
  annual_rent?: number
  rent_currency?: string
}

export interface UpdateDealData extends Partial<CreateDealData> {
  id: string
}

// Capital Advisors specific types
export interface CapitalAdvisorsProject extends Deal {
  services: 'Capital Advisors'
  project_title: string
  project_subtitle: string
  slug: string
  content_html?: string | null
  gallery_images?: string[] | null
}

// Debt & Structured Finance specific types
export interface DebtStructuredFinanceDeal extends Deal {
  services: 'Debt & Structured Finance'
  deal_type: DealType
  purpose: string
  loan_size_local: number
  loan_size_currency: string
  ltv_percentage?: number | null
  loan_term: string
  borrower: string
  lender_source: LenderSource
}

// Sale & Leaseback specific types
export interface SaleLeasebackDeal extends Deal {
  services: 'Sale & Leaseback'
  yield_percentage: number
  gla_sqm: number
  tenant: string
  lease_term_months: number
  annual_rent: number
  rent_currency: string
}

export interface CreateCapitalAdvisorsData {
  project_title: string
  project_subtitle: string
  content_html?: string
  gallery_images?: string[]
  property_image_url?: string
  country: Country
  deal_date: string
  location: string
  // Optional traditional deal fields for Capital Advisors
  deal_price_usd?: number
  local_currency?: 'AUD' | 'CNY' | 'HKD' | 'INR' | 'JPY' | 'KRW' | 'MVR' | 'MYR' | 'NZD' | 'PHP' | 'SGD' | 'THB' | 'TWD' | 'USD' | 'VND'
  local_currency_amount?: number
  asset_class?: AssetClass
  buyer?: string
  seller?: string
  remarks?: string
  is_confidential?: boolean
}

// Country to available currencies mapping
export const COUNTRY_CURRENCIES: Record<Country, string[]> = {
  'Australia': ['AUD', 'USD'],
  'China': ['CNY', 'USD'],
  'Hong Kong': ['HKD', 'USD'],
  'India': ['INR', 'USD'],
  'Japan': ['JPY', 'USD'],
  'Korea': ['KRW', 'USD'],
  'Malaysia': ['MYR', 'USD'],
  'Maldives': ['MVR', 'USD'],
  'New Zealand': ['NZD', 'USD'],
  'Philippines': ['PHP', 'USD'],
  'Singapore': ['SGD', 'USD'],
  'Taiwan': ['TWD', 'USD'],
  'Thailand': ['THB', 'USD'],
  'Vietnam': ['VND', 'USD']
} 