'use client'

import { Suspense } from 'react'
import * as CBRE from '../../src/components/cbre'
import { DealGrid } from '../../src/components/deals/DealGrid'
import { FilterSidebar } from '../../src/components/deals/FilterSidebar'
import { FilterChips } from '../../src/components/deals/FilterChips'
import { HeroBanner } from '../../src/components/deals/HeroBanner'
import { useFilterState } from '../../src/hooks/use-filter-state'
import { useFilteredDeals } from '../../src/hooks/use-filtered-deals'

function DealsPageContent() {
  const { filters, updateFilter, clearFilters, hasActiveFilters } = useFilterState()
  const { deals, loading, error, totalCount, filteredCount, refresh } = useFilteredDeals(filters)

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <CBRE.CBRECard className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Deals</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <CBRE.CBREButton onClick={refresh}>Try Again</CBRE.CBREButton>
        </CBRE.CBRECard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <HeroBanner />
      
      <div className="flex">
        {/* Left Sidebar */}
        <FilterSidebar 
          filters={filters}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
          loading={loading}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
        {/* Compact Stats and Filters Bar */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Stats and Filter Chips */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <CBRE.CBREBadge variant="secondary" className="flex-shrink-0">
                  {loading ? 'Loading...' : `${filteredCount} of ${totalCount} deals`}
                </CBRE.CBREBadge>
                {hasActiveFilters && (
                  <div className="flex-1 min-w-0">
                    <FilterChips 
                      filters={filters}
                      onFilterChange={updateFilter}
                      onClearFilters={clearFilters}
                    />
                  </div>
                )}
              </div>
              
              {/* Right: Refresh Button */}
              <CBRE.CBREButton 
                variant="outline" 
                onClick={refresh}
                disabled={loading}
                className="flex-shrink-0"
              >
                Refresh
              </CBRE.CBREButton>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="flex-1 px-6 py-8 overflow-y-auto">
          <DealGrid 
            deals={deals}
            loading={loading}
            searchTerm={filters.search}
          />
        </div>
        </div>
      </div>
    </div>
  )
}

export default function DealsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003F2D] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading deals...</p>
        </div>
      </div>
    }>
      <DealsPageContent />
    </Suspense>
  )
} 