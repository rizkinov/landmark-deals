'use client'

import { Suspense } from 'react'
import * as CBRE from '../../src/components/cbre'
import { DealGrid } from '../../src/components/deals/DealGrid'
import { FilterBar } from '../../src/components/deals/FilterBar'
import { FilterChips } from '../../src/components/deals/FilterChips'
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
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#003F2D]">
                CBRE Capital Market Landmark Deals
              </h1>
              <p className="text-gray-600 mt-2">
                Discover significant real estate transactions across Asia Pacific
              </p>
            </div>
            <div className="flex items-center gap-4">
              <CBRE.CBREBadge variant="secondary">
                {loading ? 'Loading...' : `${filteredCount} of ${totalCount} deals`}
              </CBRE.CBREBadge>
              <CBRE.CBREButton 
                variant="outline" 
                onClick={refresh}
                disabled={loading}
              >
                Refresh
              </CBRE.CBREButton>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <FilterBar 
            filters={filters}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
            loading={loading}
          />
        </div>
      </div>

      {/* Filter Chips */}
      {hasActiveFilters && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <FilterChips 
              filters={filters}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <DealGrid 
          deals={deals}
          loading={loading}
          searchTerm={filters.search}
        />
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