import { Deal, CreateDealData } from './types'

// Convert deals to CSV format
export function exportDealsToCSV(deals: Deal[]): string {
  if (deals.length === 0) {
    return 'No deals to export'
  }

  // Define CSV headers
  const headers = [
    'ID',
    'Property Name',
    'Country',
    'Deal Price (USD)',
    'Local Currency',
    'Local Currency Amount',
    'Asset Class',
    'Services',
    'Deal Date',
    'Buyer',
    'Seller',
    'Property Image URL',
    'Created At'
  ]

  // Convert deals to CSV rows
  const rows = deals.map(deal => [
    deal.id,
    `"${deal.property_name}"`, // Wrap in quotes to handle commas
    deal.country,
    deal.deal_price_usd,
    deal.local_currency,
    deal.local_currency_amount,
    deal.asset_class,
    deal.services,
    deal.deal_date,
    `"${deal.buyer}"`,
    `"${deal.seller}"`,
    deal.property_image_url || '',
    deal.created_at
  ])

  // Combine headers and rows
  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
  
  return csvContent
}

// Download CSV file
export function downloadCSV(csvContent: string, filename: string = 'deals-export.csv'): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// Parse CSV content to deals data
export function parseCSVToDeals(csvContent: string): CreateDealData[] {
  const lines = csvContent.trim().split('\n')
  
  if (lines.length < 2) {
    throw new Error('CSV file must contain at least a header row and one data row')
  }

  // Parse header row
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  
  // Validate required headers
  const requiredHeaders = [
    'Property Name',
    'Country', 
    'Deal Price (USD)',
    'Local Currency',
    'Local Currency Amount',
    'Asset Class',
    'Services',
    'Deal Date',
    'Buyer',
    'Seller'
  ]

  const missingHeaders = requiredHeaders.filter(required => 
    !headers.some(header => header.toLowerCase().includes(required.toLowerCase()))
  )

  if (missingHeaders.length > 0) {
    throw new Error(`Missing required columns: ${missingHeaders.join(', ')}`)
  }

  // Parse data rows
  const deals: CreateDealData[] = []
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue // Skip empty lines
    
    try {
      const values = parseCSVLine(line)
      
      if (values.length < headers.length) {
        console.warn(`Row ${i + 1} has fewer columns than expected, skipping`)
        continue
      }

      const deal: CreateDealData = {
        property_name: cleanValue(values[getColumnIndex(headers, 'Property Name')]),
        country: cleanValue(values[getColumnIndex(headers, 'Country')]) as any,
        deal_price_usd: parseFloat(cleanValue(values[getColumnIndex(headers, 'Deal Price (USD)')])) || 0,
        local_currency: cleanValue(values[getColumnIndex(headers, 'Local Currency')]) as any,
        local_currency_amount: parseFloat(cleanValue(values[getColumnIndex(headers, 'Local Currency Amount')])) || 0,
        asset_class: cleanValue(values[getColumnIndex(headers, 'Asset Class')]) as any,
        services: cleanValue(values[getColumnIndex(headers, 'Services')]) as any,
        deal_date: cleanValue(values[getColumnIndex(headers, 'Deal Date')]),
        buyer: cleanValue(values[getColumnIndex(headers, 'Buyer')]),
        seller: cleanValue(values[getColumnIndex(headers, 'Seller')]),
        property_image_url: cleanValue(values[getColumnIndex(headers, 'Property Image URL')]) || '/default-photo.jpeg'
      }

      // Validate required fields
      if (!deal.property_name || !deal.country || !deal.buyer || !deal.seller) {
        console.warn(`Row ${i + 1} missing required data, skipping`)
        continue
      }

      deals.push(deal)
    } catch (error) {
      console.warn(`Error parsing row ${i + 1}: ${error}, skipping`)
      continue
    }
  }

  return deals
}

// Helper function to parse a CSV line handling quoted values
function parseCSVLine(line: string): string[] {
  const values: string[] = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      values.push(current)
      current = ''
    } else {
      current += char
    }
  }
  
  values.push(current) // Add the last value
  return values
}

// Helper function to find column index by name
function getColumnIndex(headers: string[], columnName: string): number {
  const index = headers.findIndex(header => 
    header.toLowerCase().includes(columnName.toLowerCase())
  )
  return index >= 0 ? index : 0
}

// Helper function to clean CSV values
function cleanValue(value: string): string {
  return value?.trim().replace(/^"(.*)"$/, '$1') || ''
}

// Generate CSV template for import
export function generateCSVTemplate(): string {
  const headers = [
    'Property Name',
    'Country',
    'Deal Price (USD)',
    'Local Currency', 
    'Local Currency Amount',
    'Asset Class',
    'Services',
    'Deal Date',
    'Buyer',
    'Seller',
    'Property Image URL'
  ]

  const sampleRow = [
    'Marina Bay Financial Centre',
    'Singapore',
    '150.5',
    'SGD',
    '203.2',
    'Office',
    'Capital Advisors',
    'Q3 2024',
    'CapitaLand',
    'CBRE',
    '/default-photo.jpeg'
  ]

  return [headers.join(','), sampleRow.join(',')].join('\n')
} 