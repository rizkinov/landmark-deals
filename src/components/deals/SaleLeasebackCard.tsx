'use client'

import { Deal, SaleLeasebackDeal, ASSET_CLASS_COLORS } from '../../lib/types'
import * as CBRE from '../cbre'

interface SaleLeasebackCardProps {
  deal: Deal
  searchTerm?: string
}

export function SaleLeasebackCard({ deal, searchTerm }: SaleLeasebackCardProps) {
  // Currency symbol mapping
  const getCurrencySymbol = (currency: string): string => {
    const symbols: Record<string, string> = {
      'USD': '$',
      'AUD': 'A$',
      'SGD': 'S$',
      'JPY': '¥',
      'HKD': 'HK$',
      'CNY': '¥',
      'KRW': '₩',
      'TWD': 'NT$',
      'INR': '₹',
      'NZD': 'NZ$',
      'PHP': '₱',
      'VND': '₫',
      'THB': '฿',
      'MVR': 'MVR '
    }
    return symbols[currency] || `${currency} `
  }

  // Type guard to ensure we have Sale & Leaseback data
  const isValidSaleLeasebackDeal = (deal: Deal): deal is SaleLeasebackDeal => {
    return deal.services === 'Sale & Leaseback' &&
           !!deal.yield_percentage &&
           !!deal.gla_sqm &&
           !!deal.tenant &&
           !!deal.lease_term_years &&
           !!deal.annual_rent &&
           !!deal.rent_currency
  }

  if (!isValidSaleLeasebackDeal(deal)) {
    // Fallback to basic display if Sale & Leaseback data is incomplete
    return <div className="p-4 border border-red-200 rounded bg-red-50">
      <p className="text-red-600 text-sm">Incomplete Sale & Leaseback deal data</p>
    </div>
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

        {/* Yield Badge - Prominent display */}
        <div className="absolute top-3 left-3">
          <CBRE.CBREBadge variant="secondary" className="bg-teal-600 text-white font-bold text-lg px-3 py-1">
            {deal.yield_percentage}% Yield
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

        {/* Asset Class Badge */}
        <div className="mb-4">
          <CBRE.CBREBadge
            variant="secondary"
            className={`${ASSET_CLASS_COLORS[deal.asset_class]} border-0 font-medium`}
          >
            {deal.asset_class}
          </CBRE.CBREBadge>
        </div>

        {/* Sale & Leaseback Details Table */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Date:</span>
              <span className="font-semibold">{deal.deal_date}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Yield:</span>
              <span className="font-semibold text-teal-600">{deal.yield_percentage}%</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-500 font-medium">GLA (sqm):</span>
              <span className="font-semibold">{deal.gla_sqm.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-start py-1 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Buyer:</span>
              <span className="font-semibold text-right max-w-[60%]">
                {highlightText(deal.buyer, searchTerm)}
              </span>
            </div>
            <div className="flex justify-between items-start py-1 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Tenant:</span>
              <span className="font-semibold text-right max-w-[60%]">
                {highlightText(deal.tenant, searchTerm)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Lease Term:</span>
              <span className="font-semibold">{deal.lease_term_years} years</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500 font-medium">Annual Rent:</span>
              <span className="font-semibold">
                {getCurrencySymbol(deal.rent_currency)}{deal.annual_rent}M
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