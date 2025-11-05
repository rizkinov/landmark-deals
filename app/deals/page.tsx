'use client'

import { Suspense, useState } from 'react'
import * as CBRE from '../../src/components/cbre'
import { DealGrid } from '../../src/components/deals/DealGrid'
import { FilterSidebar } from '../../src/components/deals/FilterSidebar'
import { FilterChips } from '../../src/components/deals/FilterChips'
import { HeroBanner } from '../../src/components/deals/HeroBanner'
import { useFilterState } from '../../src/hooks/use-filter-state'
import { useFilteredDeals } from '../../src/hooks/use-filtered-deals'
import { generateDealsPDF, generateDetailedFilterDescription } from '../../src/lib/pdf-utils'
import { DownloadIcon } from '@radix-ui/react-icons'

function DealsPageContent() {
  const { filters, updateFilter, clearFilters, hasActiveFilters } = useFilterState()
  const { deals, loading, error, totalCount, filteredCount, refresh } = useFilteredDeals(filters)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  async function handleDownloadPDF() {
    if (deals.length === 0) {
      alert('No deals to export. Please adjust your filters.')
      return
    }

    setIsGeneratingPDF(true)
    try {
      const filterDescription = generateDetailedFilterDescription(filters, deals.length)
      const searchTerm = filters.search || ''
      await generateDealsPDF(deals, searchTerm, filterDescription)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

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
              
              {/* Right: Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <CBRE.CBREButton
                  variant="outline"
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF || deals.length === 0 || loading}
                  className="flex-shrink-0 gap-2"
                >
                  {isGeneratingPDF ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#003F2D]"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <DownloadIcon className="w-4 h-4" />
                      Download PDF
                    </>
                  )}
                </CBRE.CBREButton>
                <CBRE.CBREButton 
                  variant="action"
                  asChild
                  className="flex-shrink-0"
                >
                  <a href="/admin">
                    Admin
                  </a>
                </CBRE.CBREButton>
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