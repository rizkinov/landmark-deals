import { Deal } from './types'
import { formatCurrencyString } from './utils'
import { PPTLayout } from './ppt-types'

// Re-export types for convenience
export type { PPTLayout } from './ppt-types'
export { PPT_LAYOUTS } from './ppt-types'

// CBRE Brand Colors (hex)
const CBRE_DARK_GREEN = '012A2D'
const CBRE_DARK_GREY = '435254'
const CBRE_LIGHT_GREY = 'CAD1D3'
const WHITE = 'FFFFFF'

// Font detection and fallbacks
// Preferred: Financier Display (title) / Calibre (body)
// Fallback: Times New Roman (title) / Tahoma (body)

function isFontAvailable(fontName: string): boolean {
  if (typeof document === 'undefined') return false
  
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return false
  
  const testString = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const baseFont = 'monospace'
  const fontSize = '72px'
  
  // Measure with base font
  context.font = `${fontSize} ${baseFont}`
  const baseWidth = context.measureText(testString).width
  
  // Measure with test font + fallback to base
  context.font = `${fontSize} "${fontName}", ${baseFont}`
  const testWidth = context.measureText(testString).width
  
  // If widths differ, the font is available
  return baseWidth !== testWidth
}

// Cache detected fonts
let _titleFont: string | null = null
let _bodyFont: string | null = null
let _isUsingCalibre: boolean | null = null

function getTitleFont(): string {
  if (_titleFont === null) {
    _titleFont = isFontAvailable('Financier Display') ? 'Financier Display' : 'Times New Roman'
  }
  return _titleFont
}

function getBodyFont(): string {
  if (_bodyFont === null) {
    _isUsingCalibre = isFontAvailable('Calibre')
    _bodyFont = _isUsingCalibre ? 'Calibre' : 'Tahoma'
  }
  return _bodyFont
}

// Calibre renders slightly smaller than Tahoma, so we bump up font sizes by ~15%
function adjustFontSize(baseSize: number): number {
  // Make sure getBodyFont() is called first to detect font
  getBodyFont()
  return _isUsingCalibre ? Math.round(baseSize * 1.15) : baseSize
}

// Process image through canvas to normalize orientation
// Modern browsers auto-rotate images based on EXIF when loaded via Image element
// By drawing to canvas, we capture the correctly oriented image
async function processImageWithOrientation(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(blob)
    
    img.onload = () => {
      URL.revokeObjectURL(url)
      
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Failed to get canvas context'))
        return
      }
      
      // Drawing the image to canvas captures the browser's auto-rotation
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/jpeg', 0.9))
    }
    
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }
    
    // Set crossOrigin before src to handle CORS
    img.crossOrigin = 'anonymous'
    img.src = url
  })
}

// Helper function to load image as base64 with orientation correction
async function loadImageAsBase64(url: string): Promise<string | null> {
  try {
    if (url.startsWith('data:')) {
      return url
    }

    let fullUrl = url
    if (!url.startsWith('http')) {
      if (!url.startsWith('https://')) {
        fullUrl = `${window.location.origin}${url.startsWith('/') ? url : '/' + url}`
      } else {
        fullUrl = url
      }
    }

    const response = await fetch(fullUrl, { mode: 'cors' })
    if (!response.ok) {
      return null
    }

    const blob = await response.blob()
    
    // Always process through canvas to handle EXIF orientation
    // Modern browsers auto-rotate when loading via Image element
    try {
      return await processImageWithOrientation(blob)
    } catch {
      // Fallback to direct base64 conversion if canvas processing fails
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    }
  } catch {
    return null
  }
}

// Format deal value based on service type
// showConfidentialPrices: if true, show actual value even for confidential deals
function formatDealValue(deal: Deal, showConfidentialPrices: boolean = false): string {
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
  
  // Check if confidential - unless user has unlocked access
  const isConfidential = deal.is_confidential || deal.price_display_mode === 'confidential'
  if (isConfidential && !showConfidentialPrices) {
    return 'Confidential'
  }
  
  // Show actual value (either not confidential, or user has access)
  // Add (Confidential) marker if this was a confidential value that user unlocked
  const confidentialMarker = isConfidential && showConfidentialPrices ? '\n(Confidential)' : ''
  
  if (deal.price_display_mode === 'over' && !isConfidential) {
    return `Over ${formatCurrencyString(deal.deal_price_usd, 'USD')}`
  }
  
  if (deal.price_display_mode === 'approx' && !isConfidential) {
    return `~${formatCurrencyString(deal.deal_price_usd, 'USD')}`
  }
  
  return formatCurrencyString(deal.deal_price_usd, 'USD') + confidentialMarker
}

// Format parties based on service type
function formatParties(deal: Deal): { primary: string; secondary: string; primaryLabel: string; secondaryLabel: string } {
  if (deal.services === 'Debt & Structured Finance') {
    return {
      primary: deal.borrower || 'N/A',
      secondary: deal.lender_source || 'N/A',
      primaryLabel: 'Borrower',
      secondaryLabel: 'Lender'
    }
  }
  
  if (deal.services === 'Sale & Leaseback') {
    return {
      primary: deal.buyer,
      secondary: deal.tenant || 'N/A',
      primaryLabel: 'Buyer',
      secondaryLabel: 'Tenant'
    }
  }
  
  return {
    primary: deal.buyer,
    secondary: deal.seller,
    primaryLabel: 'Buyer',
    secondaryLabel: 'Seller'
  }
}

// Generate filename
function generateFilename(searchTerm: string, totalDeals: number): string {
  const date = new Date().toISOString().split('T')[0]
  const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '')
  
  let filename = `CBRE_Deals_${date}_${time}`
  
  if (searchTerm) {
    const safeTerm = searchTerm
      .replace(/[^a-zA-Z0-9]/g, '_')
      .substring(0, 20)
      .toLowerCase()
    filename += `_${safeTerm}`
  }
  
  filename += `_${totalDeals}deals.pptx`
  return filename
}

// Add title slide
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addTitleSlide(pptx: any, filterDescription: string, totalDeals: number) {
  const slide = pptx.addSlide()
  const titleFont = getTitleFont()
  const bodyFont = getBodyFont()
  
  // Green header bar
  slide.addShape('rect', {
    x: 0,
    y: 0,
    w: '100%',
    h: 1.5,
    fill: { color: CBRE_DARK_GREEN }
  })
  
  // Title - Financier Display or Times
  slide.addText('CBRE Landmark Deals', {
    x: 0.5,
    y: 0.35,
    w: 9,
    h: 0.8,
    fontSize: 32, // Title font doesn't need adjustment
    fontFace: titleFont,
    bold: true,
    color: WHITE
  })
  
  // Filter description - Calibre or Tahoma
  slide.addText(filterDescription, {
    x: 0.5,
    y: 2.5,
    w: 9,
    h: 0.5,
    fontSize: adjustFontSize(14),
    fontFace: bodyFont,
    color: CBRE_DARK_GREY
  })
  
  // Total deals - Calibre or Tahoma
  slide.addText(`${totalDeals} Deal${totalDeals !== 1 ? 's' : ''}`, {
    x: 0.5,
    y: 3.2,
    w: 9,
    h: 0.5,
    fontSize: adjustFontSize(24),
    fontFace: bodyFont,
    bold: true,
    color: CBRE_DARK_GREEN
  })
  
  // Date - Calibre or Tahoma
  const genDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  slide.addText(`Generated on ${genDate}`, {
    x: 0.5,
    y: 4.5,
    w: 9,
    h: 0.3,
    fontSize: adjustFontSize(10),
    fontFace: bodyFont,
    color: CBRE_DARK_GREY
  })
}

// Table layout (list format) - with images like PDF
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function generateTableLayout(pptx: any, deals: Deal[], images: (string | null)[], showConfidentialPrices: boolean) {
  const dealsPerSlide = 5 // Reduced to fit images
  const slideCount = Math.ceil(deals.length / dealsPerSlide)
  const rowHeight = 0.7 // Height for each row to fit image
  const titleFont = getTitleFont()
  const bodyFont = getBodyFont()
  
  for (let slideIndex = 0; slideIndex < slideCount; slideIndex++) {
    const slide = pptx.addSlide()
    const startIdx = slideIndex * dealsPerSlide
    const slideDeals = deals.slice(startIdx, startIdx + dealsPerSlide)
    
    // Header bar
    slide.addShape('rect', {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.5,
      fill: { color: CBRE_DARK_GREEN }
    })
    
    // Title - Financier Display or Times
    slide.addText('CBRE Landmark Deals', {
      x: 0.2,
      y: 0.1,
      w: 5,
      h: 0.3,
      fontSize: 14,
      fontFace: titleFont,
      bold: true,
      color: WHITE
    })
    
    // Table header - with Image column
    const tableHeaders = [
      { text: '', options: { bold: true, fill: { color: CBRE_DARK_GREEN }, color: WHITE, fontFace: bodyFont } }, // Image column
      { text: 'Property', options: { bold: true, fill: { color: CBRE_DARK_GREEN }, color: WHITE, fontFace: bodyFont } },
      { text: 'Location', options: { bold: true, fill: { color: CBRE_DARK_GREEN }, color: WHITE, fontFace: bodyFont } },
      { text: 'Value', options: { bold: true, fill: { color: CBRE_DARK_GREEN }, color: WHITE, fontFace: bodyFont } },
      { text: 'Type', options: { bold: true, fill: { color: CBRE_DARK_GREEN }, color: WHITE, fontFace: bodyFont } },
      { text: 'Date', options: { bold: true, fill: { color: CBRE_DARK_GREEN }, color: WHITE, fontFace: bodyFont } },
      { text: 'Parties', options: { bold: true, fill: { color: CBRE_DARK_GREEN }, color: WHITE, fontFace: bodyFont } }
    ]
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableRows: any[] = [tableHeaders]
    
    for (let i = 0; i < slideDeals.length; i++) {
      const deal = slideDeals[i]
      const parties = formatParties(deal)
      const fillColor = i % 2 === 0 ? 'F5F5F5' : WHITE
      
      tableRows.push([
        { text: '', options: { fill: { color: fillColor } } }, // Placeholder for image
        { text: deal.property_name || 'N/A', options: { fill: { color: fillColor }, fontFace: bodyFont } },
        { text: `${deal.location}, ${deal.country}`, options: { fill: { color: fillColor }, fontFace: bodyFont } },
        { text: formatDealValue(deal, showConfidentialPrices), options: { fill: { color: fillColor }, fontFace: bodyFont, bold: true } },
        { text: `${deal.asset_class || deal.custom_asset_class || 'N/A'}`, options: { fill: { color: fillColor }, fontFace: bodyFont } },
        { text: deal.deal_date || 'N/A', options: { fill: { color: fillColor }, fontFace: bodyFont } },
        { text: `${parties.primary} → ${parties.secondary}`, options: { fill: { color: fillColor }, fontFace: bodyFont } }
      ])
    }
    
    const tableY = 0.6
    
    slide.addTable(tableRows, {
      x: 0.2,
      y: tableY,
      w: 9.6,
      colW: [0.7, 1.5, 1.4, 1.2, 1.2, 0.8, 2.8], // Added image column width
      rowH: [0.3, ...Array(slideDeals.length).fill(rowHeight)], // Header smaller, data rows taller
      fontSize: adjustFontSize(8),
      fontFace: bodyFont,
      color: CBRE_DARK_GREY,
      border: { type: 'solid', pt: 0.5, color: CBRE_LIGHT_GREY },
      valign: 'middle'
    })
    
    // Add images on top of table cells
    for (let i = 0; i < slideDeals.length; i++) {
      const globalIdx = startIdx + i
      const img = images[globalIdx]
      if (!img) continue
      
      const imgX = 0.2 + 0.02 // Table x + small margin
      const imgY = tableY + 0.3 + (i * rowHeight) + 0.02 // After header row
      const imgSize = rowHeight - 0.04
      
      try {
        slide.addImage({
          data: img,
          x: imgX,
          y: imgY,
          w: 0.66,
          h: imgSize,
          sizing: { type: 'cover', w: 0.66, h: imgSize }
        })
      } catch {
        // Image failed
      }
    }
    
    // Page number
    slide.addText(`Page ${slideIndex + 1} of ${slideCount}`, {
      x: 0,
      y: 5.3,
      w: '100%',
      h: 0.2,
      fontSize: adjustFontSize(8),
      fontFace: bodyFont,
      color: CBRE_DARK_GREY,
      align: 'center'
    })
  }
}

// Grid layout - ONE combined table per slide with images in cells
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function generateGridLayout(
  pptx: any, 
  deals: Deal[], 
  images: (string | null)[], 
  cols: number, 
  rows: number,
  showConfidentialPrices: boolean
) {
  const dealsPerSlide = cols * rows
  const slideCount = Math.ceil(deals.length / dealsPerSlide)
  const titleFont = getTitleFont()
  const bodyFont = getBodyFont()
  
  // Slide dimensions
  const slideWidth = 10
  const slideHeight = 5.625
  const headerHeight = 0.45
  const footerHeight = 0.25
  const margin = 0.1
  
  const tableWidth = slideWidth - (2 * margin)
  const tableHeight = slideHeight - headerHeight - footerHeight - (2 * margin)
  
  // Font sizes based on grid density - adjusted for Calibre if detected
  const baseFontSize = cols >= 5 ? 5 : (cols >= 4 ? 6 : 7)
  const baseTitleFontSize = cols >= 5 ? 5.5 : (cols >= 4 ? 6.5 : 7.5)
  const fontSize = adjustFontSize(baseFontSize)
  const titleFontSize = adjustFontSize(baseTitleFontSize)
  
  // Each deal takes 2 columns (label + value)
  const totalCols = cols * 2
  const colWidth = tableWidth / totalCols
  const labelColWidth = colWidth * 0.9
  const valueColWidth = colWidth * 1.1
  const dealWidth = labelColWidth + valueColWidth // Total width for one property
  
  // Row heights: 6 rows per grid row (image, name, location, seller, value, date)
  const rowsPerDeal = 6
  const totalTableRows = rows * rowsPerDeal
  const baseRowHeight = tableHeight / totalTableRows
  
  // Make image row taller, name row slightly taller
  const imageRowHeight = baseRowHeight * 2.2
  const nameRowHeight = baseRowHeight * 0.8
  const infoRowHeight = (tableHeight - (rows * (imageRowHeight + nameRowHeight))) / (rows * (rowsPerDeal - 2))
  
  for (let slideIndex = 0; slideIndex < slideCount; slideIndex++) {
    const slide = pptx.addSlide()
    const startIdx = slideIndex * dealsPerSlide
    const slideDeals = deals.slice(startIdx, startIdx + dealsPerSlide)
    
    // Header bar
    slide.addShape('rect', {
      x: 0,
      y: 0,
      w: '100%',
      h: headerHeight,
      fill: { color: CBRE_DARK_GREEN }
    })
    
    // Title - Financier Display or Times
    slide.addText('CBRE Landmark Deals', {
      x: 0.15,
      y: 0.08,
      w: 5,
      h: 0.3,
      fontSize: 12,
      fontFace: titleFont,
      bold: true,
      color: WHITE
    })
    
    // Column widths array (same for all row tables)
    const colWidths: number[] = []
    for (let c = 0; c < cols; c++) {
      colWidths.push(labelColWidth)
      colWidths.push(valueColWidth)
    }
    
    // Height for each row's table
    const rowTableHeight = tableHeight / rows
    
    // Create separate table for each grid row to ensure consistent image alignment
    for (let gridRow = 0; gridRow < rows; gridRow++) {
      // Get deals for this row
      const rowDeals: (Deal | null)[] = []
      for (let c = 0; c < cols; c++) {
        const dealIdx = gridRow * cols + c
        if (dealIdx < slideDeals.length) {
          rowDeals.push(slideDeals[dealIdx])
        } else {
          rowDeals.push(null)
        }
      }
      
      // Skip empty rows
      if (rowDeals.every(d => d === null)) continue
      
      // Calculate Y position for this row's table
      const rowY = headerHeight + margin + (gridRow * rowTableHeight)
      
      // Build table data for this row
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tableData: any[][] = []
      const rowHeights: number[] = []
      
      // Row 1: Images (each image spans 2 columns)
      const imageRow: any[] = []
      for (let c = 0; c < cols; c++) {
        imageRow.push({
          text: '',
          options: {
            fill: { color: 'F0F0F0' },
            colspan: 2
          }
        })
      }
      tableData.push(imageRow)
      rowHeights.push(imageRowHeight)
      
      // Row 2: Property name (spanning 2 columns each)
      const nameRow: any[] = []
      for (let c = 0; c < cols; c++) {
        const deal = rowDeals[c]
        nameRow.push({
          text: deal?.property_name?.toUpperCase() || '',
          options: {
            fill: { color: CBRE_DARK_GREEN },
            fontFace: bodyFont,
            fontSize: titleFontSize,
            color: WHITE,
            bold: true,
            valign: 'middle',
            align: 'center',
            colspan: 2
          }
        })
      }
      tableData.push(nameRow)
      rowHeights.push(nameRowHeight)
      
      // Row 3: Location
      const locationRow: any[] = []
      for (let c = 0; c < cols; c++) {
        const deal = rowDeals[c]
        locationRow.push({
          text: 'Location',
          options: { fontFace: bodyFont, fontSize: fontSize, color: CBRE_DARK_GREY, bold: true }
        })
        locationRow.push({
          text: deal?.location || '',
          options: { fontFace: bodyFont, fontSize: fontSize, color: CBRE_DARK_GREY }
        })
      }
      tableData.push(locationRow)
      rowHeights.push(infoRowHeight)
      
      // Row 4: Seller/Developer
      const sellerRow: any[] = []
      for (let c = 0; c < cols; c++) {
        const deal = rowDeals[c]
        const parties = deal ? formatParties(deal) : { secondaryLabel: 'Seller', secondary: '' }
        sellerRow.push({
          text: parties.secondaryLabel,
          options: { fontFace: bodyFont, fontSize: fontSize, color: CBRE_DARK_GREY, bold: true }
        })
        sellerRow.push({
          text: parties.secondary || '',
          options: { fontFace: bodyFont, fontSize: fontSize, color: CBRE_DARK_GREY }
        })
      }
      tableData.push(sellerRow)
      rowHeights.push(infoRowHeight)
      
      // Row 5: Value
      const valueRow: any[] = []
      for (let c = 0; c < cols; c++) {
        const deal = rowDeals[c]
        valueRow.push({
          text: 'Value',
          options: { fontFace: bodyFont, fontSize: fontSize, color: CBRE_DARK_GREY, bold: true }
        })
        valueRow.push({
          text: deal ? formatDealValue(deal, showConfidentialPrices) : '',
          options: { fontFace: bodyFont, fontSize: fontSize, color: CBRE_DARK_GREY, bold: true }
        })
      }
      tableData.push(valueRow)
      rowHeights.push(infoRowHeight)
      
      // Row 6: Date
      const dateRow: any[] = []
      for (let c = 0; c < cols; c++) {
        const deal = rowDeals[c]
        dateRow.push({
          text: 'Date',
          options: { fontFace: bodyFont, fontSize: fontSize, color: CBRE_DARK_GREY, bold: true }
        })
        dateRow.push({
          text: deal?.deal_date || '',
          options: { fontFace: bodyFont, fontSize: fontSize, color: CBRE_DARK_GREY }
        })
      }
      tableData.push(dateRow)
      rowHeights.push(infoRowHeight)
      
      // Add table for this row
      slide.addTable(tableData, {
        x: margin,
        y: rowY,
        w: tableWidth,
        colW: colWidths,
        rowH: rowHeights,
        fontSize: fontSize,
        fontFace: bodyFont,
        color: CBRE_DARK_GREY,
        border: { type: 'solid', pt: 0.5, color: CBRE_LIGHT_GREY },
        valign: 'middle'
      })
      
      // Add images for this row
      for (let c = 0; c < cols; c++) {
        const deal = rowDeals[c]
        if (!deal) continue
        
        const dealIdx = gridRow * cols + c
        const img = images[startIdx + dealIdx]
        if (!img) continue
        
        const imgX = margin + c * dealWidth
        
        try {
          slide.addImage({
            data: img,
            x: imgX + 0.02,
            y: rowY + 0.02,
            w: dealWidth - 0.04,
            h: imageRowHeight - 0.04,
            sizing: { type: 'cover', w: dealWidth - 0.04, h: imageRowHeight - 0.04 }
          })
        } catch {
          // Image failed to load
        }
      }
    }
    
    // Page number
    slide.addText(`Page ${slideIndex + 1} of ${slideCount}`, {
      x: 0,
      y: slideHeight - footerHeight,
      w: '100%',
      h: footerHeight,
      fontSize: adjustFontSize(7),
      fontFace: bodyFont,
      color: CBRE_DARK_GREY,
      align: 'center',
      valign: 'middle'
    })
  }
}

// Load pptxgenjs from CDN at runtime to avoid webpack bundling issues
async function loadPptxGenJS(): Promise<any> {
  // Check if already loaded
  if (typeof window !== 'undefined' && (window as any).PptxGenJS) {
    return (window as any).PptxGenJS
  }
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js'
    script.async = true
    script.onload = () => {
      if ((window as any).PptxGenJS) {
        resolve((window as any).PptxGenJS)
      } else {
        reject(new Error('PptxGenJS failed to load'))
      }
    }
    script.onerror = () => reject(new Error('Failed to load PptxGenJS script'))
    document.head.appendChild(script)
  })
}

// Main export function
export async function generateDealsPPT(
  deals: Deal[],
  searchTerm: string,
  filterDescription: string,
  layout: PPTLayout,
  showConfidentialPrices: boolean = false
): Promise<void> {
  // Load pptxgenjs from CDN at runtime
  const PptxGenJS = await loadPptxGenJS()
  const pptx = new PptxGenJS()
  
  // Set presentation properties
  pptx.author = 'CBRE'
  pptx.title = 'CBRE Landmark Deals Report'
  pptx.subject = 'Landmark Deals'
  pptx.company = 'CBRE'
  
  // Set slide size (16:9 widescreen)
  pptx.defineLayout({ name: 'LAYOUT_WIDE', width: 10, height: 5.625 })
  pptx.layout = 'LAYOUT_WIDE'
  
  // Load all images first
  const imagePromises = deals.map(async (deal) => {
    const imageUrl = deal.property_image_url || '/default-photo.jpeg'
    return await loadImageAsBase64(imageUrl)
  })
  
  const images = await Promise.all(imagePromises)
  
  // Add title slide
  addTitleSlide(pptx, filterDescription, deals.length)
  
  // Generate slides based on layout
  switch (layout) {
    case 'table':
      await generateTableLayout(pptx, deals, images, showConfidentialPrices)
      break
    case 'grid-2x2':
      await generateGridLayout(pptx, deals, images, 2, 2, showConfidentialPrices)
      break
    case 'grid-4x2':
      await generateGridLayout(pptx, deals, images, 4, 2, showConfidentialPrices)
      break
    case 'grid-5x2':
      await generateGridLayout(pptx, deals, images, 5, 2, showConfidentialPrices)
      break
    case 'grid-8x1':
      await generateGridLayout(pptx, deals, images, 8, 1, showConfidentialPrices)
      break
    case 'grid-8x2':
      await generateGridLayout(pptx, deals, images, 8, 2, showConfidentialPrices)
      break
  }
  
  // Generate filename and save
  const filename = generateFilename(searchTerm, deals.length)
  await pptx.writeFile({ fileName: filename })
}
