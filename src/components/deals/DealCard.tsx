'use client'

import { Deal, COUNTRY_FLAGS } from '../../lib/types'
import * as CBRE from '../cbre'
import { formatPrice } from '../../lib/utils'

interface DealCardProps {
  deal: Deal
  searchTerm?: string
}

export function DealCard({ deal, searchTerm }: DealCardProps) {
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
    <CBRE.CBRECard className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
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
            {COUNTRY_FLAGS[deal.country]} {deal.country}
          </CBRE.CBREBadge>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Property Name */}
        <h3 className="text-xl font-bold text-[#003F2D] mb-3 line-clamp-2">
          {highlightText(deal.property_name, searchTerm)}
        </h3>

        {/* Deal Price */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            USD {formatPrice(deal.deal_price_usd)}M
          </div>
          <div className="text-lg text-gray-600">
            SGD {formatPrice(deal.deal_price_sgd)}M
          </div>
        </div>

        {/* Category & Subcategory */}
        <div className="mb-4 space-y-2">
          <CBRE.CBREBadge variant="outline" className="mr-2">
            {deal.category}
          </CBRE.CBREBadge>
          <CBRE.CBREBadge variant="secondary">
            {deal.subcategory}
          </CBRE.CBREBadge>
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
      </div>
    </CBRE.CBRECard>
  )
} 