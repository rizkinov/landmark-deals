'use client'

import { FilterState } from '../../lib/types'
import * as CBRE from '../cbre'
import { X } from 'lucide-react'

interface FilterChipsProps {
  filters: FilterState
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  onClearFilters: () => void
}

interface FilterChip {
  id: string
  label: string
  onRemove: () => void
}

export function FilterChips({ filters, onFilterChange, onClearFilters }: FilterChipsProps) {
  const chips: FilterChip[] = []

  // Search chip
  if (filters.search) {
    chips.push({
      id: 'search',
      label: `Search: "${filters.search}"`,
      onRemove: () => onFilterChange('search', '')
    })
  }

  // Country chips
  filters.countries.forEach((country) => {
    chips.push({
      id: `country-${country}`,
      label: `Country: ${country}`,
      onRemove: () => onFilterChange('countries', filters.countries.filter(c => c !== country))
    })
  })

  // Asset Class chips
  filters.assetClasses.forEach((assetClass) => {
    chips.push({
      id: `asset-class-${assetClass}`,
      label: `Asset Class: ${assetClass}`,
      onRemove: () => onFilterChange('assetClasses', filters.assetClasses.filter(ac => ac !== assetClass))
    })
  })

  // Services chips
  filters.services.forEach((service) => {
    chips.push({
      id: `service-${service}`,
      label: `Service: ${service}`,
      onRemove: () => onFilterChange('services', filters.services.filter(s => s !== service))
    })
  })

  // Price range chip
  if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
    const minLabel = filters.priceRange.min !== null ? `${filters.priceRange.min}M` : '0'
    const maxLabel = filters.priceRange.max !== null ? `${filters.priceRange.max}M` : '∞'
    chips.push({
      id: 'price-range',
      label: `Price: ${minLabel} - ${maxLabel} ${filters.priceRange.currency}`,
      onRemove: () => onFilterChange('priceRange', { min: null, max: null, currency: filters.priceRange.currency })
    })
  }

  // Date range chip
  if (filters.dateRange.startQuarter || filters.dateRange.endQuarter) {
    const startLabel = filters.dateRange.startQuarter || 'Any'
    const endLabel = filters.dateRange.endQuarter || 'Any'
    chips.push({
      id: 'date-range',
      label: `Date: ${startLabel} - ${endLabel}`,
      onRemove: () => onFilterChange('dateRange', { startQuarter: null, endQuarter: null })
    })
  }

  // Buyer chips
  filters.buyers.forEach((buyer) => {
    chips.push({
      id: `buyer-${buyer}`,
      label: `Buyer: ${buyer}`,
      onRemove: () => onFilterChange('buyers', filters.buyers.filter(b => b !== buyer))
    })
  })

  // Seller chips
  filters.sellers.forEach((seller) => {
    chips.push({
      id: `seller-${seller}`,
      label: `Seller: ${seller}`,
      onRemove: () => onFilterChange('sellers', filters.sellers.filter(s => s !== seller))
    })
  })

  // Sort chip (only if not default)
  if (filters.sortBy !== 'date_desc') {
    const sortLabel = {
      'price_desc': 'Price: High to Low',
      'price_asc': 'Price: Low to High',
      'date_desc': 'Date: Newest First',
      'date_asc': 'Date: Oldest First',
      'name_asc': 'Name: A to Z'
    }[filters.sortBy]

    chips.push({
      id: 'sort',
      label: `Sort: ${sortLabel}`,
      onRemove: () => onFilterChange('sortBy', 'date_desc')
    })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Active filters:</span>
      
      {chips.map((chip) => (
        <CBRE.CBREBadge
          key={chip.id}
          variant="secondary"
          className="flex items-center gap-1 pl-3 pr-2 py-1 bg-[#003F2D] text-white hover:bg-[#002A22] transition-colors cursor-pointer"
        >
          <span className="text-xs">{chip.label}</span>
          <button
            onClick={chip.onRemove}
            className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
            aria-label={`Remove ${chip.label} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </CBRE.CBREBadge>
      ))}

      {chips.length > 1 && (
                 <CBRE.CBREButton
           variant="text"
           onClick={onClearFilters}
           className="text-xs text-gray-600 hover:text-gray-900"
         >
          Clear all
        </CBRE.CBREButton>
      )}
    </div>
  )
} 