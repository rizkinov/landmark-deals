'use client'

import { useState, useEffect } from 'react'
import { FilterState, COUNTRIES, CATEGORIES, SUBCATEGORIES, QUARTERS, SORT_OPTIONS } from '../../lib/types'
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
import { Checkbox } from '../ui/checkbox'
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
    subcategories: string[]
  }>({ buyers: [], sellers: [], subcategories: [] })
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Fetch unique values for autocomplete
  useEffect(() => {
    fetchUniqueValues().then(setUniqueValues)
  }, [])

  // Get available subcategories based on selected categories
  const availableSubcategories = filters.categories.length > 0
    ? filters.categories.flatMap(cat => SUBCATEGORIES[cat as keyof typeof SUBCATEGORIES] || [])
    : Object.values(SUBCATEGORIES).flat()

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

        {/* Row 2: Country + Category */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Countries */}
          <div className="flex-1">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Countries
            </Label>
            <div className="flex flex-wrap gap-2">
              {COUNTRIES.map((country) => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox
                    id={`country-${country}`}
                    checked={filters.countries.includes(country)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onFilterChange('countries', [...filters.countries, country])
                      } else {
                        onFilterChange('countries', filters.countries.filter(c => c !== country))
                      }
                    }}
                  />
                  <Label htmlFor={`country-${country}`} className="text-sm cursor-pointer">
                    {country}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </Label>
            <div className="space-y-2">
              {CATEGORIES.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onFilterChange('categories', [...filters.categories, category])
                      } else {
                        onFilterChange('categories', filters.categories.filter(c => c !== category))
                        // Clear subcategories that belong to this category
                        const categorySubcategories = SUBCATEGORIES[category as keyof typeof SUBCATEGORIES] || []
                        onFilterChange('subcategories', filters.subcategories.filter(s => !categorySubcategories.includes(s)))
                      }
                    }}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Subcategories (if categories selected) */}
        {filters.categories.length > 0 && (
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategories
            </Label>
            <div className="flex flex-wrap gap-2">
              {availableSubcategories.map((subcategory) => (
                <div key={subcategory} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subcategory-${subcategory}`}
                    checked={filters.subcategories.includes(subcategory)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onFilterChange('subcategories', [...filters.subcategories, subcategory])
                      } else {
                        onFilterChange('subcategories', filters.subcategories.filter(s => s !== subcategory))
                      }
                    }}
                  />
                  <Label htmlFor={`subcategory-${subcategory}`} className="text-sm cursor-pointer">
                    {subcategory}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Row 4: Price Range */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range (Millions)
            </Label>
            <div className="flex items-center gap-4">
              {/* Currency Toggle */}
              <div className="flex rounded-md border border-gray-300">
                <button
                  type="button"
                  onClick={() => onFilterChange('priceRange', { ...filters.priceRange, currency: 'USD' })}
                  className={`px-3 py-1 text-sm rounded-l-md ${
                    filters.priceRange.currency === 'USD'
                      ? 'bg-[#003F2D] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  USD
                </button>
                <button
                  type="button"
                  onClick={() => onFilterChange('priceRange', { ...filters.priceRange, currency: 'SGD' })}
                  className={`px-3 py-1 text-sm rounded-r-md border-l ${
                    filters.priceRange.currency === 'SGD'
                      ? 'bg-[#003F2D] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  SGD
                </button>
              </div>

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

        {/* Row 5: Date Range */}
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
          <CBREButton
            variant="outline"
            onClick={onClearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear All Filters
          </CBREButton>

          <div className="text-sm text-gray-500">
            {loading ? 'Searching...' : 'Use filters to refine results'}
          </div>
        </div>
      </div>
    </div>
  )
}