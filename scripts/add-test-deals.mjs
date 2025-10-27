import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test Debt & Structured Finance Deal
const debtDeal = {
  property_name: 'TEST - Debt & Structured Finance Deal',
  country: 'Singapore',
  asset_class: 'Office',
  services: 'Debt & Structured Finance',
  location: 'Marina Bay, Singapore',
  deal_date: 'Q4 2024',
  deal_date_sortable: '2024-10-01',
  buyer: 'N/A',
  seller: 'N/A',
  deal_price_usd: 134.5, // 100 AUD to USD
  local_currency: 'AUD',
  local_currency_amount: 100,
  // D&SF specific fields
  deal_type: 'Senior Investment',
  purpose: 'Acquisition Finance',
  loan_size_local: 100,
  loan_size_currency: 'AUD',
  ltv_percentage: 35,
  loan_term: '5 years',
  borrower: 'Growthpoint',
  lender_source: 'International Bank',
  is_confidential: false,
  price_display_mode: 'exact',
  show_usd: true
}

// Test Capital Advisors Deal
const capitalDeal = {
  property_name: 'TEST - Capital Advisors Project',
  country: 'Singapore',
  asset_class: 'Office',
  services: 'Capital Advisors',
  location: 'Marina Bay, Singapore',
  deal_date: 'Q4 2024',
  deal_date_sortable: '2024-10-01',
  buyer: 'Test Buyer',
  seller: 'Test Seller',
  deal_price_usd: 50,
  local_currency: 'SGD',
  local_currency_amount: 67,
  is_confidential: false,
  price_display_mode: 'exact',
  show_usd: true,
  property_image_url: '/default-photo.jpeg'
}

async function createTestDeals() {
  console.log('Creating TEST Debt & Structured Finance deal...')
  const { data: debt, error: debtError } = await supabase
    .from('deals')
    .insert(debtDeal)
    .select()
    .single()

  if (debtError) {
    console.error('Error creating D&SF deal:', debtError)
  } else {
    console.log('✅ Created D&SF deal:', debt.id)
  }

  console.log('\nCreating TEST Capital Advisors deal...')
  const { data: capital, error: capitalError } = await supabase
    .from('deals')
    .insert(capitalDeal)
    .select()
    .single()

  if (capitalError) {
    console.error('Error creating Capital Advisors deal:', capitalError)
  } else {
    console.log('✅ Created Capital Advisors deal:', capital.id)
  }

  console.log('\n✨ Done!')
}

createTestDeals()
