import jsPDF from 'jspdf'
import autoTable, { RowInput } from 'jspdf-autotable'
import { Deal } from './types'
import { formatCurrencyString } from './utils'

// CBRE Brand Colors (RGB values)
const CBRE_GREEN: [number, number, number] = [0, 63, 45] // #003F2D
const CBRE_DARK_GREEN: [number, number, number] = [1, 42, 45] // #012A2D
const CBRE_DARK_GREY: [number, number, number] = [67, 82, 84] // #435254
const CBRE_LIGHT_GREY: [number, number, number] = [202, 209, 211] // #CAD1D3

// Helper function to load image as base64
async function loadImageAsBase64(url: string): Promise<string | null> {
  try {
    // If it's already a data URL, return it
    if (url.startsWith('data:')) {
      return url
    }

    // Handle relative URLs
    let fullUrl = url
    if (!url.startsWith('http')) {
      // If it's a Supabase URL, use as-is, otherwise prepend origin
      if (!url.startsWith('https://')) {
        fullUrl = `${window.location.origin}${url.startsWith('/') ? url : '/' + url}`
      } else {
        fullUrl = url
      }
    }

    // Try to fetch the image with CORS
    const response = await fetch(fullUrl, { mode: 'cors' })
    if (!response.ok) {
      console.warn('Failed to fetch image:', fullUrl)
      return null
    }

    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.warn('Failed to load image:', url, error)
    return null
  }
}

// Generate filter description in one sentence
export function generateFilterDescription(searchTerm: string, totalDeals: number): string {
  if (searchTerm) {
    return `Showing ${totalDeals} deal${totalDeals !== 1 ? 's' : ''} matching "${searchTerm}"`
  }
  return `Showing all ${totalDeals} deal${totalDeals !== 1 ? 's' : ''}`
}

// Generate detailed filter description from FilterState
export function generateDetailedFilterDescription(
  filters: {
    search?: string
    countries?: string[]
    assetClasses?: string[]
    services?: string[]
    priceRange?: { min: number | null; max: number | null }
    dateRange?: { startQuarter: string | null; endQuarter: string | null }
  },
  totalDeals: number
): string {
  const parts: string[] = []
  
  if (filters.search) {
    parts.push(`search "${filters.search}"`)
  }
  
  if (filters.countries && filters.countries.length > 0) {
    if (filters.countries.length === 1) {
      parts.push(`country: ${filters.countries[0]}`)
    } else {
      parts.push(`${filters.countries.length} countries`)
    }
  }
  
  if (filters.assetClasses && filters.assetClasses.length > 0) {
    if (filters.assetClasses.length === 1) {
      parts.push(`asset class: ${filters.assetClasses[0]}`)
    } else {
      parts.push(`${filters.assetClasses.length} asset classes`)
    }
  }
  
  if (filters.services && filters.services.length > 0) {
    if (filters.services.length === 1) {
      parts.push(`service: ${filters.services[0]}`)
    } else {
      parts.push(`${filters.services.length} services`)
    }
  }
  
  if (filters.priceRange && (filters.priceRange.min !== null || filters.priceRange.max !== null)) {
    const min = filters.priceRange.min ? `$${filters.priceRange.min}M` : ''
    const max = filters.priceRange.max ? `$${filters.priceRange.max}M` : ''
    if (min && max) {
      parts.push(`price: ${min} - ${max}`)
    } else if (min) {
      parts.push(`price: ${min}+`)
    } else if (max) {
      parts.push(`price: up to ${max}`)
    }
  }
  
  if (filters.dateRange && (filters.dateRange.startQuarter || filters.dateRange.endQuarter)) {
    const start = filters.dateRange.startQuarter || ''
    const end = filters.dateRange.endQuarter || ''
    if (start && end) {
      parts.push(`date: ${start} to ${end}`)
    } else if (start) {
      parts.push(`date: from ${start}`)
    } else if (end) {
      parts.push(`date: until ${end}`)
    }
  }
  
  if (parts.length === 0) {
    return `Showing all ${totalDeals} deal${totalDeals !== 1 ? 's' : ''}`
  }
  
  return `Showing ${totalDeals} deal${totalDeals !== 1 ? 's' : ''} ${parts.join(', ')}`
}

// Generate minimalist filename with filter info
export function generateFilename(searchTerm: string, totalDeals: number): string {
  const date = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '') // HHMMSS
  
  let filename = `CBRE_Deals_${date}_${time}`
  
  if (searchTerm) {
    // Make search term filename-safe (remove special chars, limit length)
    const safeTerm = searchTerm
      .replace(/[^a-zA-Z0-9]/g, '_')
      .substring(0, 20)
      .toLowerCase()
    filename += `_${safeTerm}`
  }
  
  filename += `_${totalDeals}deals.pdf`
  return filename
}

// Format deal value based on service type
function formatDealValue(deal: Deal): string {
  if (deal.services === 'Debt & Structured Finance') {
    if (deal.loan_size_local && deal.loan_size_currency) {
      return `${formatCurrencyString(deal.loan_size_local, deal.loan_size_currency)}m`
    }
    return 'N/A'
  }
  
  if (deal.services === 'Sale & Leaseback') {
    if (deal.yield_percentage) {
      return `${deal.yield_percentage}% Yield`
    }
    return 'N/A'
  }
  
  // Property Sales and Capital Advisors
  if (deal.is_confidential || deal.price_display_mode === 'confidential') {
    return 'Confidential'
  }
  
  if (deal.price_display_mode === 'over') {
    return `Over ${formatCurrencyString(deal.deal_price_usd, 'USD')}`
  }
  
  if (deal.price_display_mode === 'approx') {
    return `Approx. ${formatCurrencyString(deal.deal_price_usd, 'USD')}`
  }
  
  return formatCurrencyString(deal.deal_price_usd, 'USD')
}

// Format parties based on service type
// Note: Using simple arrow -> instead of Unicode ← for PDF compatibility
function formatParties(deal: Deal): string {
  if (deal.services === 'Debt & Structured Finance') {
    return `${deal.borrower || 'N/A'} -> ${deal.lender_source || 'N/A'}`
  }
  
  if (deal.services === 'Sale & Leaseback') {
    return `${deal.buyer} -> ${deal.tenant || 'N/A'}`
  }
  
  return `${deal.buyer} -> ${deal.seller}`
}

// Generate PDF from deals
export async function generateDealsPDF(
  deals: Deal[],
  searchTerm: string,
  filterDescription: string
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  })

  // Header with CBRE Dark Green background
  doc.setFillColor(CBRE_DARK_GREEN[0], CBRE_DARK_GREEN[1], CBRE_DARK_GREEN[2])
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 25, 'F') // Increased height for more spacing

  // Title in white - using serif font (times) for Financier Display feel
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('times', 'bold')
  doc.text('CBRE Landmark Deals Report', 15, 12)

  // Filter description with more bottom margin
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(filterDescription, 15, 20) // Moved down from 18 to 20

  // Generation date (right aligned)
  const genDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  doc.setFontSize(8)
  doc.text(`Generated on ${genDate}`, doc.internal.pageSize.getWidth() - 15, 20, {
    align: 'right'
  })

  // Load all images first
  const imagePromises = deals.map(async (deal) => {
    const imageUrl = deal.property_image_url || '/default-photo.jpeg'
    return await loadImageAsBase64(imageUrl)
  })
  
  const images = await Promise.all(imagePromises)

  // Prepare table data with images embedded in first column
  const tableData: RowInput[] = []
  
  for (let i = 0; i < deals.length; i++) {
    const deal = deals[i]
    const imageBase64 = images[i]
    
    // Create cell content with image and text
    // We'll use a workaround: add image separately and use text in cell
    const propertyCell = deal.property_name || 'N/A'
    
    tableData.push([
      propertyCell,
      `${deal.location}, ${deal.country}`,
      formatDealValue(deal),
      `${deal.asset_class || deal.custom_asset_class || 'N/A'} / ${deal.services}`,
      deal.deal_date || 'N/A',
      formatParties(deal),
      deal.remarks || '-'
    ])
  }

  // Generate table with images properly positioned in cells
  autoTable(doc, {
    head: [[
      'Property',
      'Location',
      'Value',
      'Type',
      'Date',
      'Parties',
      'Remarks'
    ]],
    body: tableData,
    startY: 30, // Increased from 25 to account for larger header
    headStyles: {
      fillColor: CBRE_DARK_GREEN, // Changed to Dark Green
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'left',
      cellPadding: 4
    },
    bodyStyles: {
      textColor: CBRE_DARK_GREY,
      fontSize: 8,
      halign: 'left',
      cellPadding: { left: 3, right: 3, top: 3, bottom: 4 } // Balanced padding - rows will fit content naturally
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    },
    columnStyles: {
      0: { 
        cellWidth: 45, // Property Name (with space for image) - increased
        cellPadding: { left: 15, right: 3, top: 3, bottom: 4 }, // Matching top/bottom margins
        minCellHeight: 17 // Minimum height: 3mm top + 10mm image + 4mm bottom = 17mm
      },
      1: { 
        cellWidth: 38, // Location - increased
        minCellHeight: 17 // Match first column height to ensure bottom padding is visible
      },
      2: { 
        cellWidth: 28, // Value - increased
        minCellHeight: 17
      },
      3: { 
        cellWidth: 38, // Type - increased
        minCellHeight: 17
      },
      4: { 
        cellWidth: 22, // Date - increased
        minCellHeight: 17
      },
      5: { 
        cellWidth: 38, // Parties - increased
        minCellHeight: 17
      },
      6: { 
        cellWidth: 50, // Remarks - increased
        minCellHeight: 17
      }
    },
    styles: {
      cellPadding: 3,
      lineColor: CBRE_LIGHT_GREY,
      lineWidth: 0.5
    },
    margin: { left: 15, right: 15 }, // Aligned with top text (starts at 15mm)
    rowPageBreak: 'avoid', // Prevent rows from splitting across pages
    didDrawCell: (data: any) => {
      // Add images to the first column (Property column) only, and only for body rows
      if (data.column.index === 0 && data.section === 'body') {
        // In autoTable, row.index is 0-based for the body section
        // row.index 0 = first body row (first deal)
        // So we use row.index directly as the deal index
        const dealIndex = data.row.index
        
        // Safety check for array bounds
        if (dealIndex >= 0 && dealIndex < images.length && dealIndex < deals.length) {
          const imageBase64 = images[dealIndex]
          
          if (imageBase64 && data.cell && data.cell.x !== undefined && data.cell.y !== undefined) {
            try {
              const imgSize = 10 // mm - fits within cell
              const cellPadding = 3 // mm
              
              // Use cell position directly from autoTable
              const imgX = data.cell.x + cellPadding
              
              // Calculate top vertical position in cell (top-aligned)
              // Use the cell's top padding position
              const topPadding = data.cell.padding?.top || 3
              const topY = data.cell.y + topPadding
              
              // Add image to the left side of the cell, top-aligned
              doc.addImage(
                imageBase64,
                'JPEG',
                imgX,
                topY,
                imgSize,
                imgSize
              )
            } catch (error) {
              console.warn('Failed to add image to PDF cell:', error)
            }
          }
        }
      }
    }
  })

  // Footer with page numbers
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(CBRE_DARK_GREY[0], CBRE_DARK_GREY[1], CBRE_DARK_GREY[2])
    doc.setFont('helvetica', 'normal')
    doc.text(
      `Page ${i} of ${pageCount} | Total: ${deals.length} deal${deals.length !== 1 ? 's' : ''}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }

  // Generate filename and save
  const filename = generateFilename(searchTerm, deals.length)
  doc.save(filename)
}

