'use client'

import { Deal, ASSET_CLASS_COLORS, SERVICES_COLORS } from '../../lib/types'
import { formatCurrency, formatPriceWithMode } from '../../lib/utils'
import * as CBRE from '../cbre'
import { CapitalAdvisorCard } from './CapitalAdvisorCard'
import { DebtStructuredFinanceCard } from './DebtStructuredFinanceCard'
import { SaleLeasebackCard } from './SaleLeasebackCard'

interface DealCardProps {
  deal: Deal
  searchTerm?: string
}

export function DealCard({ deal, searchTerm }: DealCardProps) {
  // If this is a Capital Advisors deal, render the specialized card
  if (deal.services === 'Capital Advisors') {
    return <CapitalAdvisorCard deal={deal} searchTerm={searchTerm} />
  }

  // If this is a Debt & Structured Finance deal, render the specialized card
  if (deal.services === 'Debt & Structured Finance') {
    return <DebtStructuredFinanceCard deal={deal} searchTerm={searchTerm} />
  }

  // If this is a Sale & Leaseback deal, render the specialized card
  if (deal.services === 'Sale & Leaseback') {
    return <SaleLeasebackCard deal={deal} searchTerm={searchTerm} />
  }

  // Highlight search terms in text
  const highlightText = (text: string, searchTerm?: string) => {
    if (!searchTerm) return text
    
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    )
  }

  return (
    <CBRE.CBRECard className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full !pt-0">
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden">
        {deal.property_image_url ? (
          <img
            src={deal.property_image_url}
            alt={deal.property_name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {/* Country Badge */}
        <div className="absolute top-3 right-3">
          <CBRE.CBREBadge variant="secondary" className="bg-white/90 text-gray-800">
            {deal.country}
          </CBRE.CBREBadge>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Property Name */}
        <h3 className="text-xl font-bold text-[#003F2D] mb-2 line-clamp-2">
          {highlightText(deal.property_name, searchTerm)}
        </h3>

        {/* Location */}
        <div className="mb-4">
          <div className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 flex-shrink-0">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="text-sm font-medium">
              {highlightText(deal.location, searchTerm)}
            </span>
          </div>
        </div>

        {/* Deal Price */}
        <div className="mb-4">
          {deal.price_display_mode === 'confidential' || deal.is_confidential ? (
            <div className="text-2xl font-bold text-gray-900 mb-1">
              <span>
                Confidential
              </span>
            </div>
          ) : (
            <>
              {/* USD Display */}
              {deal.show_usd !== false ? (
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {(() => {
                    const currencyResult = formatPriceWithMode(
                      deal.deal_price_usd,
                      'USD',
                      deal.price_display_mode || 'exact',
                      { includeBillionAnnotation: true }
                    )
                    return (
                      <span>
                        {currencyResult.formatted}
                        {currencyResult.billionAnnotation && (
                          <span className="text-base font-normal text-gray-600 ml-1">
                            ({currencyResult.billionAnnotation})
                          </span>
                        )}
                      </span>
                    )
                  })()}
                </div>
              ) : (
                <div className="text-2xl font-bold text-gray-900 mb-1">USD: -</div>
              )}

              {/* Local Currency Display */}
              {deal.local_currency && deal.local_currency !== 'USD' && deal.local_currency_amount && (
                <div className="text-lg text-gray-600">
                  {formatPriceWithMode(
                    deal.local_currency_amount,
                    deal.local_currency,
                    deal.price_display_mode || 'exact'
                  ).formatted}
                </div>
              )}
            </>
          )}
        </div>

        {/* Asset Class & Services */}
        <div className="mb-4 space-y-2">
          {/* Asset Class - Colorful */}
          <div className="flex">
            <CBRE.CBREBadge
              variant="secondary"
              className={`${deal.asset_class ? ASSET_CLASS_COLORS[deal.asset_class] : 'bg-gray-100 text-gray-700'} border-0 font-medium`}
            >
              {deal.asset_class || deal.custom_asset_class || 'N/A'}
            </CBRE.CBREBadge>
          </div>
          
          {/* Services - Monochrome */}
          <div className="flex">
            <CBRE.CBREBadge 
              variant="outline" 
              className={`${SERVICES_COLORS[deal.services]} text-xs font-normal`}
            >
              {deal.services}
            </CBRE.CBREBadge>
          </div>
        </div>

        {/* Deal Details Table */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Date:</span>
              <span className="font-semibold">{deal.deal_date}</span>
            </div>
            <div className="flex justify-between items-start py-1 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Buyer:</span>
              <span className="font-semibold text-right max-w-[60%]">
                {highlightText(deal.buyer, searchTerm)}
              </span>
            </div>
            <div className="flex justify-between items-start py-1">
              <span className="text-gray-500 font-medium">Seller:</span>
              <span className="font-semibold text-right max-w-[60%]">
                {highlightText(deal.seller, searchTerm)}
              </span>
            </div>
          </div>
        </div>

        {/* Remarks Section */}
        {deal.remarks && (
          <div className="border-t pt-4 mt-4">
            <div className="text-sm">
              <div className="text-gray-500 font-medium mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/>
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
                </svg>
                Remarks:
              </div>
              <div className="text-gray-700 leading-relaxed">
                {highlightText(deal.remarks, searchTerm)}
              </div>
            </div>
          </div>
        )}
      </div>
    </CBRE.CBRECard>
  )
} 