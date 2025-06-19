import { createClient } from '@supabase/supabase-js'
import { Deal, FilterState, CreateDealData, UpdateDealData, DealsResponse } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export async function fetchDeals(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching deals:', error)
    throw error
  }

  return data || []
}

export async function fetchFilteredDeals(filters: FilterState): Promise<DealsResponse> {
  let query = supabase
    .from('deals')
    .select('*', { count: 'exact' })

  // Apply search filter
  if (filters.search) {
    query = query.or(`property_name.ilike.%${filters.search}%,buyer.ilike.%${filters.search}%,seller.ilike.%${filters.search}%`)
  }

  // Apply country filter
  if (filters.countries.length > 0) {
    query = query.in('country', filters.countries)
  }

  // Apply category filter
  if (filters.categories.length > 0) {
    query = query.in('category', filters.categories)
  }

  // Apply subcategory filter
  if (filters.subcategories.length > 0) {
    query = query.in('subcategory', filters.subcategories)
  }

  // Apply price range filter
  if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
    const priceField = filters.priceRange.currency === 'USD' ? 'deal_price_usd' : 'deal_price_sgd'
    
    if (filters.priceRange.min !== null) {
      query = query.gte(priceField, filters.priceRange.min)
    }
    
    if (filters.priceRange.max !== null) {
      query = query.lte(priceField, filters.priceRange.max)
    }
  }

  // Apply date range filter
  if (filters.dateRange.startQuarter || filters.dateRange.endQuarter) {
    if (filters.dateRange.startQuarter) {
      query = query.gte('deal_date', filters.dateRange.startQuarter)
    }
    if (filters.dateRange.endQuarter) {
      query = query.lte('deal_date', filters.dateRange.endQuarter)
    }
  }

  // Apply buyer filter
  if (filters.buyers.length > 0) {
    query = query.in('buyer', filters.buyers)
  }

  // Apply seller filter
  if (filters.sellers.length > 0) {
    query = query.in('seller', filters.sellers)
  }

  // Apply sorting
  switch (filters.sortBy) {
    case 'price_desc':
      query = query.order('deal_price_usd', { ascending: false })
      break
    case 'price_asc':
      query = query.order('deal_price_usd', { ascending: true })
      break
    case 'date_desc':
      query = query.order('deal_date', { ascending: false })
      break
    case 'date_asc':
      query = query.order('deal_date', { ascending: true })
      break
    case 'name_asc':
      query = query.order('property_name', { ascending: true })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching filtered deals:', error)
    throw error
  }

  return {
    data: data || [],
    total: count || 0,
    filtered: data?.length || 0
  }
}

export async function createDeal(dealData: CreateDealData): Promise<Deal> {
  const { data, error } = await supabase
    .from('deals')
    .insert([dealData])
    .select()
    .single()

  if (error) {
    console.error('Error creating deal:', error)
    throw error
  }

  return data
}

export async function updateDeal(id: string, dealData: Partial<UpdateDealData>): Promise<Deal> {
  const { data, error } = await supabase
    .from('deals')
    .update(dealData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating deal:', error)
    throw error
  }

  return data
}

export async function deleteDeal(id: string): Promise<void> {
  const { error } = await supabase
    .from('deals')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting deal:', error)
    throw error
  }
}

export async function fetchDealById(id: string): Promise<Deal | null> {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching deal by ID:', error)
    return null
  }

  return data
}

// Get unique values for filter options
export async function fetchUniqueValues(): Promise<{
  buyers: string[]
  sellers: string[]
  subcategories: string[]
}> {
  try {
    const { data: deals, error } = await supabase
      .from('deals')
      .select('buyer, seller, subcategory')

    if (error) throw error

    const buyers = [...new Set(deals?.map((d: any) => d.buyer) || [])].sort()
    const sellers = [...new Set(deals?.map((d: any) => d.seller) || [])].sort()
    const subcategories = [...new Set(deals?.map((d: any) => d.subcategory) || [])].sort()

    return { buyers, sellers, subcategories }
  } catch (error) {
    console.error('Error fetching unique values:', error)
    return { buyers: [], sellers: [], subcategories: [] }
  }
}

// Real-time subscription for deals
export function subscribeToDeals(callback: (deals: Deal[]) => void) {
  const subscription = supabase
    .channel('deals_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'deals'
      },
      () => {
        // Refetch deals when changes occur
        fetchDeals().then(callback).catch(console.error)
      }
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}

// Upload image to Supabase Storage
export async function uploadDealImage(file: File, dealId: string): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${dealId}-${Date.now()}.${fileExt}`
  const filePath = `deal-images/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('deals')
    .upload(filePath, file)

  if (uploadError) {
    console.error('Error uploading image:', uploadError)
    throw uploadError
  }

  const { data: { publicUrl } } = supabase.storage
    .from('deals')
    .getPublicUrl(filePath)

  return publicUrl
} 