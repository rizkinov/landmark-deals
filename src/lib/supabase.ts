import { createClient } from '@supabase/supabase-js'
import { Deal, FilterState, CreateDealData, UpdateDealData, DealsResponse } from './types'
import { quarterToDate } from './utils'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export async function fetchDeals(): Promise<Deal[]> {
  try {
    // Temporarily disable audit function due to 400 error
    // const { data: auditData, error: auditError } = await supabase
    //   .rpc('get_deals_with_audit_info')

    if (false) { // Temporarily disable audit function
      // Now get admin info for deals that have been edited
      const dealsWithAdmin = await Promise.all(
        auditData.map(async (deal: any) => {
          if (deal.last_edited_by) {
            // Get admin info for this deal
            const { data: adminInfo } = await supabase
              .from('admin_users')
              .select('email, role')
              .eq('id', deal.last_edited_by)
              .single()

            return {
              ...deal,
              last_edited_by_email: adminInfo?.email || null,
              last_edited_by_role: adminInfo?.role || null
            }
          }
          return deal
        })
      )
      
      return dealsWithAdmin
    }
  } catch (error) {
    console.warn('Audit function failed, falling back to regular query:', error)
  }

  // Fallback to regular query
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

export async function fetchFilteredDeals(filters: FilterState, showConfidentialPrices: boolean = false): Promise<DealsResponse> {
  let query = supabase
    .from('deals')
    .select('*', { count: 'exact' })

  // Apply search filter - includes D&SF and Sale & Leaseback specific fields
  if (filters.search) {
    query = query.or(`property_name.ilike.%${filters.search}%,buyer.ilike.%${filters.search}%,seller.ilike.%${filters.search}%,location.ilike.%${filters.search}%,remarks.ilike.%${filters.search}%,borrower.ilike.%${filters.search}%,purpose.ilike.%${filters.search}%,deal_type.ilike.%${filters.search}%,lender_source.ilike.%${filters.search}%,tenant.ilike.%${filters.search}%`)
  }

  // Apply country filter
  if (filters.countries.length > 0) {
    query = query.in('country', filters.countries)
  }

  // Apply asset class filter
  if (filters.assetClasses.length > 0) {
    query = query.in('asset_class', filters.assetClasses)
  }

  // Apply services filter
  if (filters.services.length > 0) {
    query = query.in('services', filters.services)
  }

  // Apply price range filter (always use USD as the filter currency)
  // When showConfidentialPrices is true, include confidential deals in price filtering
  if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
    // Only filter out confidential deals when price filtering is applied AND user doesn't have access
    if (!showConfidentialPrices) {
      query = query.eq('is_confidential', false)
    }
    
    if (filters.priceRange.min !== null) {
      query = query.gte('deal_price_usd', filters.priceRange.min)
    }
    
    if (filters.priceRange.max !== null) {
      query = query.lte('deal_price_usd', filters.priceRange.max)
    }
  }

  // Apply date range filter
  if (filters.dateRange.startQuarter || filters.dateRange.endQuarter) {
    if (filters.dateRange.startQuarter) {
      // Convert quarter to date for comparison
      const startDate = quarterToDate(filters.dateRange.startQuarter)
      if (startDate) {
        query = query.gte('deal_date_sortable', startDate)
      }
    }
    if (filters.dateRange.endQuarter) {
      // Convert quarter to date for comparison
      const endDate = quarterToDate(filters.dateRange.endQuarter)
      if (endDate) {
        query = query.lte('deal_date_sortable', endDate)
      }
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
      query = query.order('deal_date_sortable', { ascending: false })
      break
    case 'date_asc':
      query = query.order('deal_date_sortable', { ascending: true })
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
  // Clean up service-specific fields based on service type
  if (dealData.services === 'Debt & Structured Finance') {
    // D&SF fields are all optional
    // Set buyer/seller to N/A for D&SF deals
    dealData.buyer = 'N/A'
    dealData.seller = 'N/A'

    // Remove Sale & Leaseback specific fields
    delete dealData.yield_percentage
    delete dealData.gla_sqm
    delete dealData.tenant
    delete dealData.lease_term_years
    delete dealData.annual_rent
    delete dealData.rent_currency
  } else if (dealData.services === 'Sale & Leaseback') {
    // Sale & Leaseback fields are all optional
    // Set buyer/seller for Sale & Leaseback deals
    dealData.buyer = dealData.buyer || 'N/A'
    dealData.seller = dealData.tenant || 'N/A'

    // Ensure deal_price_usd is set based on annual_rent if provided
    if (dealData.annual_rent && (!dealData.deal_price_usd || dealData.deal_price_usd === 0)) {
      dealData.deal_price_usd = dealData.annual_rent
    } else if (!dealData.deal_price_usd || dealData.deal_price_usd === 0) {
      dealData.deal_price_usd = 0
    }

    // Remove D&SF specific fields
    delete dealData.deal_type
    delete dealData.purpose
    delete dealData.loan_size_local
    delete dealData.loan_size_currency
    delete dealData.ltv_percentage
    delete dealData.loan_term
    delete dealData.borrower
    delete dealData.lender_source
  } else {
    // Property Sales or Capital Advisors
    // Remove D&SF specific fields
    delete dealData.deal_type
    delete dealData.purpose
    delete dealData.loan_size_local
    delete dealData.loan_size_currency
    delete dealData.ltv_percentage
    delete dealData.loan_term
    delete dealData.borrower
    delete dealData.lender_source

    // Remove Sale & Leaseback specific fields
    delete dealData.yield_percentage
    delete dealData.gla_sqm
    delete dealData.tenant
    delete dealData.lease_term_years
    delete dealData.annual_rent
    delete dealData.rent_currency
  }

  console.log('Creating deal with data:', JSON.stringify(dealData, null, 2))

  const { data, error } = await supabase
    .from('deals')
    .insert([dealData])
    .select()
    .single()

  if (error) {
    console.error('Supabase error details:', JSON.stringify(error, null, 2))
    throw new Error(`Database error: ${error.message || 'Unknown error'} (${error.code || 'NO_CODE'})`)
  }

  return data
}

export async function updateDeal(id: string, dealData: Partial<UpdateDealData>): Promise<Deal> {
  // Validate service-specific fields if service type is being updated
  if (dealData.services === 'Debt & Structured Finance') {
    // Get current deal data to check existing fields
    const currentDeal = await fetchDealById(id)
    if (currentDeal) {
      const mergedData = { ...currentDeal, ...dealData }

      if (!mergedData.deal_type || !mergedData.purpose || !mergedData.loan_size_local ||
          !mergedData.loan_size_currency || !mergedData.loan_term || !mergedData.borrower ||
          !mergedData.lender_source) {
        throw new Error('All Debt & Structured Finance fields are required when service type is D&SF')
      }
    }

    // Set buyer/seller to N/A for D&SF deals if not provided
    dealData.buyer = dealData.buyer || 'N/A'
    dealData.seller = dealData.seller || 'N/A'
  } else if (dealData.services === 'Sale & Leaseback') {
    // Get current deal data to check existing fields
    const currentDeal = await fetchDealById(id)
    if (currentDeal) {
      const mergedData = { ...currentDeal, ...dealData }

      if (!mergedData.yield_percentage || !mergedData.gla_sqm || !mergedData.tenant ||
          !mergedData.lease_term_years || !mergedData.annual_rent || !mergedData.rent_currency) {
        throw new Error('All Sale & Leaseback fields are required when service type is Sale & Leaseback')
      }
    }

    // Set seller to tenant for Sale & Leaseback deals
    dealData.seller = dealData.tenant || dealData.seller
  }

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
  assetClasses: string[]
  services: string[]
}> {
  try {
    const { data: deals, error } = await supabase
      .from('deals')
      .select('buyer, seller, asset_class, services')

    if (error) throw error

    const buyers = [...new Set(deals?.map((d: any) => d.buyer) || [])].sort()
    const sellers = [...new Set(deals?.map((d: any) => d.seller) || [])].sort()
    const assetClasses = [...new Set(deals?.map((d: any) => d.asset_class) || [])].sort()
    const services = [...new Set(deals?.map((d: any) => d.services) || [])].sort()

    return { buyers, sellers, assetClasses, services }
  } catch (error) {
    console.error('Error fetching unique values:', error)
    return { buyers: [], sellers: [], assetClasses: [], services: [] }
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

// Capital Advisors specific functions
export async function fetchCapitalAdvisorsProject(slug: string): Promise<Deal | null> {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('services', 'Capital Advisors')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching Capital Advisors project:', error)
    return null
  }

  return data
}

export async function fetchCapitalAdvisorsProjects(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('services', 'Capital Advisors')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching Capital Advisors projects:', error)
    return []
  }

  return data || []
}

export async function createCapitalAdvisorsProject(projectData: {
  project_title: string
  project_subtitle: string
  content_html?: string
  gallery_images?: string[]
  property_image_url?: string
  country: string
  deal_date: string
  location: string
  deal_price_usd?: number
  local_currency?: string
  local_currency_amount?: number
  buyer?: string
  seller?: string
  remarks?: string
  is_confidential?: boolean
}): Promise<Deal> {
  // Convert to Deal format for database
  const dealData = {
    property_name: projectData.project_title, // Use project title as property name
    property_image_url: projectData.property_image_url,
    country: projectData.country,
    deal_price_usd: projectData.deal_price_usd || 0,
    local_currency: projectData.local_currency || 'USD',
    local_currency_amount: projectData.local_currency_amount || 0,
    asset_class: 'Office', // Default for Capital Advisors
    services: 'Capital Advisors',
    deal_date: projectData.deal_date,
    buyer: projectData.buyer || 'N/A',
    seller: projectData.seller || 'N/A',
    location: projectData.location,
    remarks: projectData.remarks,
    is_confidential: projectData.is_confidential,
    // Capital Advisors specific fields
    project_title: projectData.project_title,
    project_subtitle: projectData.project_subtitle,
    content_html: projectData.content_html,
    gallery_images: projectData.gallery_images,
    // slug will be auto-generated by database trigger
  }

  const { data, error } = await supabase
    .from('deals')
    .insert([dealData])
    .select()
    .single()

  if (error) {
    console.error('Error creating Capital Advisors project:', error)
    throw error
  }

  return data
}

export async function updateCapitalAdvisorsProject(
  id: string, 
  projectData: Partial<{
    project_title: string
    project_subtitle: string
    content_html?: string
    gallery_images?: string[]
    property_image_url?: string
    country: string
    deal_date: string
    location: string
    deal_price_usd?: number
    local_currency?: string
    local_currency_amount?: number
    buyer?: string
    seller?: string
    remarks?: string
    is_confidential?: boolean
    asset_class?: string
  }>
): Promise<Deal> {
  // Convert to Deal format for database
  const dealData: any = {}
  
  if (projectData.project_title !== undefined) {
    dealData.property_name = projectData.project_title
    dealData.project_title = projectData.project_title
  }
  
  if (projectData.project_subtitle !== undefined) dealData.project_subtitle = projectData.project_subtitle
  if (projectData.content_html !== undefined) dealData.content_html = projectData.content_html
  if (projectData.gallery_images !== undefined) dealData.gallery_images = projectData.gallery_images
  if (projectData.property_image_url !== undefined) dealData.property_image_url = projectData.property_image_url
  if (projectData.country !== undefined) dealData.country = projectData.country
  if (projectData.deal_date !== undefined) dealData.deal_date = projectData.deal_date
  if (projectData.location !== undefined) dealData.location = projectData.location
  if (projectData.deal_price_usd !== undefined) dealData.deal_price_usd = projectData.deal_price_usd
  if (projectData.local_currency !== undefined) dealData.local_currency = projectData.local_currency
  if (projectData.local_currency_amount !== undefined) dealData.local_currency_amount = projectData.local_currency_amount
  if (projectData.buyer !== undefined) dealData.buyer = projectData.buyer
  if (projectData.seller !== undefined) dealData.seller = projectData.seller
  if (projectData.remarks !== undefined) dealData.remarks = projectData.remarks
  if (projectData.is_confidential !== undefined) dealData.is_confidential = projectData.is_confidential
  if (projectData.asset_class !== undefined) dealData.asset_class = projectData.asset_class

  // Ensure services field is always set to Capital Advisors
  dealData.services = 'Capital Advisors'

  
  const { data, error } = await supabase
    .from('deals')
    .update(dealData)
    .eq('id', id)
    .eq('services', 'Capital Advisors')
    .select()
    .single()

  if (error) {
    console.error('Raw Supabase error object:', error)
    console.error('Error message:', error.message)
    console.error('Error code:', error.code) 
    console.error('Error details:', error.details)
    console.error('Error hint:', error.hint)
    console.error('Update data that caused error:', dealData)
    throw new Error(`Database update failed: ${error.message || 'Unknown error'} (Code: ${error.code || 'N/A'})`)
  }

  return data
} 