'use client'

import { useState, useEffect } from 'react'
import { FilterState, COUNTRIES, ASSET_CLASSES, SERVICES, QUARTERS, SORT_OPTIONS, ASSET_CLASS_COLORS, SERVICES_COLORS } from '../../lib/types'
import { fetchUniqueValues } from '../../lib/supabase'
import { CBREButton } from '../cbre'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger,
  SelectValue 
} from '../ui/select'
import { Toggle } from '../ui/toggle'
import { Search, X, SlidersHorizontal } from 'lucide-react'

interface FilterBarProps {
  filters: FilterState
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  onClearFilters: () => void
  loading: boolean
}

export function FilterBar({ filters, onFilterChange, onClearFilters, loading }: FilterBarProps) {
  const [uniqueValues, setUniqueValues] = useState<{
    buyers: string[]
    sellers: string[]
    assetClasses: string[]
    services: string[]
  }>({ buyers: [], sellers: [], assetClasses: [], services: [] })
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Fetch unique values for autocomplete
  useEffect(() => {
    fetchUniqueValues().then(setUniqueValues)
  }, [])

  return (
    <div className="py-4">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <CBREButton
          variant="outline"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="w-full flex items-center justify-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters {mobileFiltersOpen ? 'Hide' : 'Show'}
        </CBREButton>
      </div>

      {/* Filter Controls */}
      <div className={`space-y-4 ${mobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
        {/* Row 1: Search + Sort */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Global Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search properties, buyers, sellers..."
              value={filters.search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <div className="w-full md:w-48">
            <Select
              value={filters.sortBy}
              onValueChange={(value: string) => onFilterChange('sortBy', value as FilterState['sortBy'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2: Countries */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Countries
          </Label>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map((country) => (
              <Toggle
                key={country}
                pressed={filters.countries.includes(country)}
                onPressedChange={(pressed) => {
                  if (pressed) {
                    onFilterChange('countries', [...filters.countries, country])
                  } else {
                    onFilterChange('countries', filters.countries.filter(c => c !== country))
                  }
                }}
                variant="outline"
                className={`text-sm transition-all duration-200 ${
                  filters.countries.includes(country)
                    ? 'bg-[#003F2D] text-white border-[#003F2D] hover:bg-[#003F2D]/90'
                    : 'hover:bg-gray-50'
                }`}
              >
                {country}
              </Toggle>
            ))}
          </div>
        </div>

        {/* Row 3: Asset Classes */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Asset Classes
          </Label>
          <div className="flex flex-wrap gap-2">
            {ASSET_CLASSES.map((assetClass) => (
              <Toggle
                key={assetClass}
                pressed={filters.assetClasses.includes(assetClass)}
                onPressedChange={(pressed) => {
                  if (pressed) {
                    onFilterChange('assetClasses', [...filters.assetClasses, assetClass])
                  } else {
                    onFilterChange('assetClasses', filters.assetClasses.filter(ac => ac !== assetClass))
                  }
                }}
                variant="outline"
                className={`text-sm transition-all duration-200 ${
                  filters.assetClasses.includes(assetClass)
                    ? `${ASSET_CLASS_COLORS[assetClass]} border-current`
                    : 'hover:bg-gray-50'
                }`}
              >
                {assetClass}
              </Toggle>
            ))}
          </div>
        </div>

        {/* Row 4: Services */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Services
          </Label>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((service) => (
              <Toggle
                key={service}
                pressed={filters.services.includes(service)}
                onPressedChange={(pressed) => {
                  if (pressed) {
                    onFilterChange('services', [...filters.services, service])
                  } else {
                    onFilterChange('services', filters.services.filter(s => s !== service))
                  }
                }}
                variant="outline"
                className={`text-sm transition-all duration-200 ${
                  filters.services.includes(service)
                    ? `${SERVICES_COLORS[service]} border-current`
                    : 'hover:bg-gray-50'
                }`}
              >
                {service}
              </Toggle>
            ))}
          </div>
        </div>

        {/* Row 5: Price Range */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range (Millions)
            </Label>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600">USD</span>

              {/* Min Price */}
              <Input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange('priceRange', {
                  ...filters.priceRange,
                  min: e.target.value ? parseFloat(e.target.value) : null
                })}
                className="w-24"
              />

              <span className="text-gray-500">to</span>

              {/* Max Price */}
              <Input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange('priceRange', {
                  ...filters.priceRange,
                  max: e.target.value ? parseFloat(e.target.value) : null
                })}
                className="w-24"
              />
            </div>
          </div>
        </div>

        {/* Row 6: Date Range */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </Label>
            <div className="flex items-center gap-4">
              <Select
                value={filters.dateRange.startQuarter || 'any'}
                onValueChange={(value: string) => onFilterChange('dateRange', {
                  ...filters.dateRange,
                  startQuarter: value === 'any' ? null : value
                })}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="From..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {QUARTERS.map((quarter) => (
                    <SelectItem key={quarter} value={quarter}>
                      {quarter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="text-gray-500">to</span>

              <Select
                value={filters.dateRange.endQuarter || 'any'}
                onValueChange={(value: string) => onFilterChange('dateRange', {
                  ...filters.dateRange,
                  endQuarter: value === 'any' ? null : value
                })}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="To..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {QUARTERS.map((quarter) => (
                    <SelectItem key={quarter} value={quarter}>
                      {quarter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <CBREButton
              variant="outline"
              onClick={onClearFilters}
              className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
            >
              <X className="h-4 w-4" />
              Clear All Filters
            </CBREButton>
            
            {/* Active Filter Count */}
            {(filters.countries.length > 0 || filters.assetClasses.length > 0 || filters.services.length > 0 || filters.search || 
              filters.priceRange.min || filters.priceRange.max || 
              filters.dateRange.startQuarter || filters.dateRange.endQuarter) && (
              <div className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                {[
                  filters.search && 1,
                  filters.countries.length,
                  filters.assetClasses.length,
                  filters.services.length,
                  (filters.priceRange.min || filters.priceRange.max) && 1,
                  (filters.dateRange.startQuarter || filters.dateRange.endQuarter) && 1
                ].filter(Boolean).reduce((a, b) => (a as number) + (b as number), 0)} active filters
              </div>
            )}
          </div>

          <div className="text-sm text-gray-500">
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#003F2D]"></div>
                Searching...
              </span>
            ) : (
              'Use filters to refine results'
            )}
          </div>
        </div>
      </div>
    </div>
  )
}