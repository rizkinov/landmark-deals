'use client'

import { Deal } from '../../lib/types'
import { DealCard } from './DealCard'

interface DealGridProps {
  deals: Deal[]
  loading: boolean
  searchTerm?: string
}

// Skeleton card for loading state
function DealCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="p-6">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        
        {/* Price skeleton */}
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        
        {/* Badges skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
        
        {/* Table skeleton */}
        <div className="border-t pt-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

// Empty state component
function EmptyState({ searchTerm }: { searchTerm?: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="text-gray-400 mb-4">
        <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {searchTerm ? 'No deals found' : 'No deals available'}
      </h3>
      
      <p className="text-gray-500 max-w-md">
        {searchTerm 
          ? `No deals match your search for "${searchTerm}". Try adjusting your filters or search terms.`
          : 'There are currently no deals to display. Check back later for new landmark deals.'
        }
      </p>
    </div>
  )
}

export function DealGrid({ deals, loading, searchTerm }: DealGridProps) {
  // Show loading skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <DealCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  // Show empty state
  if (deals.length === 0) {
    return (
      <div className="grid grid-cols-1">
        <EmptyState searchTerm={searchTerm} />
      </div>
    )
  }

  // Show deals grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          deal={deal}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  )
} 