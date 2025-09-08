'use client'

import { Deal, SERVICES_COLORS, ASSET_CLASS_COLORS } from '../../lib/types'
import * as CBRE from '../cbre'
import Link from 'next/link'

interface CapitalAdvisorCardProps {
  deal: Deal
  searchTerm?: string
}

export function CapitalAdvisorCard({ deal, searchTerm }: CapitalAdvisorCardProps) {
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
            alt={deal.project_title || deal.property_name}
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

      {/* Card Content - Simplified for Capital Advisors */}
      <div className="p-6">
        {/* Project Title */}
        <h3 className="text-xl font-bold text-[#003F2D] mb-3 line-clamp-2">
          {highlightText(deal.project_title || deal.property_name, searchTerm)}
        </h3>

        {/* Project Subtitle */}
        {deal.project_subtitle && (
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {highlightText(deal.project_subtitle, searchTerm)}
          </p>
        )}

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

        {/* Asset Class and Services Badges */}
        <div className="mb-4 space-y-2">
          {/* Asset Class - Colorful */}
          <div className="flex">
            <CBRE.CBREBadge 
              variant="secondary" 
              className={`${ASSET_CLASS_COLORS[deal.asset_class]} border-0 font-medium`}
            >
              {deal.asset_class}
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

        {/* Date and Read More */}
        <div className="flex justify-between items-center pt-4 border-t">
          <span className="text-sm text-gray-500 font-medium">
            {deal.deal_date}
          </span>
          
          {/* Read More Button - Opens in new tab */}
          {deal.slug ? (
            <Link href={`/deals/capital-advisors/${deal.slug}`} target="_blank" rel="noopener noreferrer">
              <CBRE.CBREButton variant="view-more" size="sm">
                Read More
              </CBRE.CBREButton>
            </Link>
          ) : (
            <CBRE.CBREButton variant="view-more" size="sm" disabled>
              Coming Soon
            </CBRE.CBREButton>
          )}
        </div>

        {/* Remarks Section (if present) */}
        {deal.remarks && (
          <div className="border-t pt-4 mt-4">
            <div className="text-sm">
              <div className="text-gray-500 font-medium mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/>
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
                </svg>
                Notes:
              </div>
              <div className="text-gray-700 leading-relaxed line-clamp-2">
                {highlightText(deal.remarks, searchTerm)}
              </div>
            </div>
          </div>
        )}
      </div>
    </CBRE.CBRECard>
  )
}