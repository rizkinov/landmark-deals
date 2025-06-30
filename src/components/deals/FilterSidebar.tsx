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
import { Search, X, Filter } from 'lucide-react'

interface FilterSidebarProps {
  filters: FilterState
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  onClearFilters: () => void
  loading: boolean
}

export function FilterSidebar({ filters, onFilterChange, onClearFilters, loading }: FilterSidebarProps) {
  const [uniqueValues, setUniqueValues] = useState<{
    buyers: string[]
    sellers: string[]
    assetClasses: string[]
    services: string[]
  }>({ buyers: [], sellers: [], assetClasses: [], services: [] })
  
  // Fetch unique values for autocomplete
  useEffect(() => {
    fetchUniqueValues().then(setUniqueValues)
  }, [])

  const activeFilterCount = [
    filters.search ? 1 : 0,
    filters.countries.length,
    filters.assetClasses.length,
    filters.services.length,
    (filters.priceRange.min || filters.priceRange.max) ? 1 : 0,
    (filters.dateRange.startQuarter || filters.dateRange.endQuarter) ? 1 : 0
  ].reduce((a, b) => a + b, 0)

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-[#003F2D] flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-white" />
            <h2 className="text-lg font-semibold text-white">Filters</h2>
          </div>
          {activeFilterCount > 0 && (
            <div className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
              {activeFilterCount}
            </div>
          )}
        </div>
      </div>

      {/* Filter Content */}
      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        {/* Global Search */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Properties, buyers, sellers, locations..."
              value={filters.search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange('search', e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Sort By
          </Label>
          <Select
            value={filters.sortBy}
            onValueChange={(value: string) => onFilterChange('sortBy', value as FilterState['sortBy'])}
          >
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-sm">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Countries */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Countries {filters.countries.length > 0 && `(${filters.countries.length})`}
          </Label>
          <div className="grid grid-cols-2 gap-1">
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
                size="sm"
                className={`text-xs justify-start h-8 ${
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

        {/* Asset Classes */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Asset Classes {filters.assetClasses.length > 0 && `(${filters.assetClasses.length})`}
          </Label>
          <div className="space-y-1">
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
                size="sm"
                className={`text-xs justify-start h-8 w-full ${
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

        {/* Services */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Services {filters.services.length > 0 && `(${filters.services.length})`}
          </Label>
          <div className="space-y-1">
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
                  size="sm"
                  className={`text-xs justify-start h-8 w-full ${
                    filters.services.includes(service)
                      ? `${SERVICES_COLORS[service]} border-gray-300`
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
              >
                {service}
              </Toggle>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Price Range {(filters.priceRange.min || filters.priceRange.max) && '(1)'}
          </Label>
          <div className="space-y-2">
            <div className="text-xs text-gray-600">USD Millions</div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange('priceRange', {
                  ...filters.priceRange,
                  min: e.target.value ? parseFloat(e.target.value) : null
                })}
                className="text-xs h-8"
              />
              <span className="text-xs text-gray-500">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange('priceRange', {
                  ...filters.priceRange,
                  max: e.target.value ? parseFloat(e.target.value) : null
                })}
                className="text-xs h-8"
              />
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Date Range {(filters.dateRange.startQuarter || filters.dateRange.endQuarter) && '(1)'}
          </Label>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-600 mb-1">From</div>
              <Select
                value={filters.dateRange.startQuarter || 'any'}
                onValueChange={(value: string) => onFilterChange('dateRange', {
                  ...filters.dateRange,
                  startQuarter: value === 'any' ? null : value
                })}
              >
                <SelectTrigger className="text-xs h-8">
                  <SelectValue placeholder="Select start date..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any" className="text-xs">Any</SelectItem>
                  {QUARTERS.map((quarter) => (
                    <SelectItem key={quarter} value={quarter} className="text-xs">
                      {quarter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="text-xs text-gray-600 mb-1">To</div>
              <Select
                value={filters.dateRange.endQuarter || 'any'}
                onValueChange={(value: string) => onFilterChange('dateRange', {
                  ...filters.dateRange,
                  endQuarter: value === 'any' ? null : value
                })}
              >
                <SelectTrigger className="text-xs h-8">
                  <SelectValue placeholder="Select end date..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any" className="text-xs">Any</SelectItem>
                  {QUARTERS.map((quarter) => (
                    <SelectItem key={quarter} value={quarter} className="text-xs">
                      {quarter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
        <div className="space-y-2">
          <CBREButton
            variant="outline"
            onClick={onClearFilters}
            className="w-full flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors text-sm h-8"
          >
            <X className="h-3 w-3" />
            Clear All Filters
          </CBREButton>
          
          {loading && (
            <div className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-[#003F2D]"></div>
              Searching...
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 