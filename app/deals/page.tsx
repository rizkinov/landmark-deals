'use client'

import { Suspense, useState } from 'react'
import * as CBRE from '../../src/components/cbre'
import { DealGrid } from '../../src/components/deals/DealGrid'
import { FilterSidebar } from '../../src/components/deals/FilterSidebar'
import { FilterChips } from '../../src/components/deals/FilterChips'
import { HeroBanner } from '../../src/components/deals/HeroBanner'
import { ConfidentialPasswordModal } from '../../src/components/deals/ConfidentialPasswordModal'
import { PPTLayoutModal } from '../../src/components/deals/PPTLayoutModal'
import { useFilterState } from '../../src/hooks/use-filter-state'
import { useFilteredDeals } from '../../src/hooks/use-filtered-deals'
import { useConfidentialAccess } from '../../src/hooks/use-confidential-access'
import { generateDealsPDF, generateDetailedFilterDescription } from '../../src/lib/pdf-utils'
import { PPTLayout } from '../../src/lib/ppt-types'
import { DownloadIcon, LockOpen1Icon, LockClosedIcon, FileIcon } from '@radix-ui/react-icons'

function DealsPageContent() {
  const { filters, updateFilter, clearFilters, hasActiveFilters } = useFilterState()
  const { hasAccess: hasConfidentialAccess, grantAccess, revokeAccess, timeRemaining } = useConfidentialAccess()
  // Pass confidential access status to filter hook so price filters include confidential deals when unlocked
  const { deals, loading, error, totalCount, filteredCount, refresh } = useFilteredDeals(filters, hasConfidentialAccess)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isGeneratingPPT, setIsGeneratingPPT] = useState(false)
  const [showPPTModal, setShowPPTModal] = useState(false)
  const [showConfidentialModal, setShowConfidentialModal] = useState(false)

  async function handleDownloadPDF() {
    if (deals.length === 0) {
      alert('No deals to export. Please adjust your filters.')
      return
    }

    setIsGeneratingPDF(true)
    try {
      const filterDescription = generateDetailedFilterDescription(filters, deals.length)
      const searchTerm = filters.search || ''
      // Pass confidential access status to show actual values if unlocked
      await generateDealsPDF(deals, searchTerm, filterDescription, hasConfidentialAccess)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  async function handleDownloadPPT(layout: PPTLayout) {
    if (deals.length === 0) {
      alert('No deals to export. Please adjust your filters.')
      return
    }

    setIsGeneratingPPT(true)
    try {
      // Use dynamic import
      const pptModule = await import('../../src/lib/ppt-utils')
      const { generateDealsPPT } = pptModule
      const filterDescription = generateDetailedFilterDescription(filters, deals.length)
      const searchTerm = filters.search || ''
      // Pass confidential access status to show actual values if unlocked
      await generateDealsPPT(deals, searchTerm, filterDescription, layout, hasConfidentialAccess)
      setShowPPTModal(false)
    } catch (error) {
      console.error('Error generating PPT:', error)
      alert('Error generating PowerPoint. Please try again.')
    } finally {
      setIsGeneratingPPT(false)
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
                  variant="outline"
                  onClick={() => setShowPPTModal(true)}
                  disabled={isGeneratingPPT || deals.length === 0 || loading}
                  className="flex-shrink-0 gap-2"
                >
                  {isGeneratingPPT ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#003F2D]"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileIcon className="w-4 h-4" />
                      Download PPT
                    </>
                  )}
                </CBRE.CBREButton>
                {hasConfidentialAccess ? (
                  <CBRE.CBREButton
                    variant="outline"
                    onClick={revokeAccess}
                    className="flex-shrink-0 gap-2 border-green-600 text-green-700 hover:bg-green-50"
                    title={timeRemaining ? `Access expires in ${timeRemaining}` : undefined}
                  >
                    <LockOpen1Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">Confidentials Unlocked</span>
                    <span className="sm:hidden">Unlocked</span>
                  </CBRE.CBREButton>
                ) : (
                  <CBRE.CBREButton
                    variant="outline"
                    onClick={() => setShowConfidentialModal(true)}
                    className="flex-shrink-0 gap-2"
                  >
                    <LockClosedIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">View Confidentials</span>
                    <span className="sm:hidden">Confidentials</span>
                  </CBRE.CBREButton>
                )}
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
            showConfidentialPrices={hasConfidentialAccess}
          />
        </div>
        </div>
      </div>

      {/* Confidential Password Modal */}
      <ConfidentialPasswordModal
        isOpen={showConfidentialModal}
        onClose={() => setShowConfidentialModal(false)}
        onSuccess={() => {}}
        grantAccess={grantAccess}
      />

      {/* PPT Layout Selection Modal */}
      <PPTLayoutModal
        isOpen={showPPTModal}
        onClose={() => setShowPPTModal(false)}
        onSelect={handleDownloadPPT}
        isGenerating={isGeneratingPPT}
      />
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