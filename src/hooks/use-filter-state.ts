import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FilterState } from '../lib/types'
import { useLocalStorage } from './use-local-storage'

const defaultFilterState: FilterState = {
  search: '',
  countries: [],
  assetClasses: [],
  services: [],
  priceRange: {
    min: null,
    max: null,
    currency: 'USD'
  },
  dateRange: {
    startQuarter: null,
    endQuarter: null
  },
  buyers: [],
  sellers: [],
  sortBy: 'date_desc'
}

export function useFilterState() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Clear old localStorage format if it exists
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const oldFilters = window.localStorage.getItem('cbre-deals-filters')
      if (oldFilters) {
        try {
          const parsed = JSON.parse(oldFilters)
          // If it has the old structure (categories/subcategories), clear it
          if (parsed.categories !== undefined || parsed.subcategories !== undefined) {
            window.localStorage.removeItem('cbre-deals-filters')
          }
        } catch (error) {
          // If parsing fails, clear it anyway
          window.localStorage.removeItem('cbre-deals-filters')
        }
      }
    }
  }, [])
  
  const [savedFilters, setSavedFilters] = useLocalStorage<FilterState>(
    'cbre-deals-filters',
    defaultFilterState
  )

  // Initialize filters from URL params or saved filters
  const [filters, setFilters] = useState<FilterState>(() => {
    // Parse URL parameters
    const urlFilters: Partial<FilterState> = {}
    
    const search = searchParams.get('search')
    if (search) urlFilters.search = search

    const countries = searchParams.get('countries')
    if (countries) urlFilters.countries = countries.split(',')

    const assetClasses = searchParams.get('assetClasses')
    if (assetClasses) urlFilters.assetClasses = assetClasses.split(',')

    const services = searchParams.get('services')
    if (services) urlFilters.services = services.split(',')

    const priceMin = searchParams.get('priceMin')
    const priceMax = searchParams.get('priceMax')
    if (priceMin || priceMax) {
      urlFilters.priceRange = {
        min: priceMin ? parseFloat(priceMin) : null,
        max: priceMax ? parseFloat(priceMax) : null,
        currency: 'USD'
      }
    }

    const dateStart = searchParams.get('dateStart')
    const dateEnd = searchParams.get('dateEnd')
    if (dateStart || dateEnd) {
      urlFilters.dateRange = {
        startQuarter: dateStart,
        endQuarter: dateEnd
      }
    }

    const buyers = searchParams.get('buyers')
    if (buyers) urlFilters.buyers = buyers.split(',')

    const sellers = searchParams.get('sellers')
    if (sellers) urlFilters.sellers = sellers.split(',')

    const sortBy = searchParams.get('sortBy') as FilterState['sortBy']
    if (sortBy) urlFilters.sortBy = sortBy

    // If URL has filters, use them; otherwise use saved filters
    const hasUrlFilters = Object.keys(urlFilters).length > 0
    
    // Ensure savedFilters has the correct structure (migrate from old format if needed)
    const migratedSavedFilters = {
      ...defaultFilterState,
      ...savedFilters,
      // Ensure assetClasses and services exist (migrate from old categories/subcategories if needed)
      assetClasses: savedFilters.assetClasses || [],
      services: savedFilters.services || []
    }
    
    return hasUrlFilters ? { ...defaultFilterState, ...urlFilters } : migratedSavedFilters
  })

  // Update URL when filters change
  const updateURL = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams()

    if (newFilters.search) params.set('search', newFilters.search)
    if (newFilters.countries.length > 0) params.set('countries', newFilters.countries.join(','))
    if (newFilters.assetClasses.length > 0) params.set('assetClasses', newFilters.assetClasses.join(','))
    if (newFilters.services.length > 0) params.set('services', newFilters.services.join(','))
    
    if (newFilters.priceRange.min !== null) params.set('priceMin', newFilters.priceRange.min.toString())
    if (newFilters.priceRange.max !== null) params.set('priceMax', newFilters.priceRange.max.toString())
    
    if (newFilters.dateRange.startQuarter) params.set('dateStart', newFilters.dateRange.startQuarter)
    if (newFilters.dateRange.endQuarter) params.set('dateEnd', newFilters.dateRange.endQuarter)
    
    if (newFilters.buyers.length > 0) params.set('buyers', newFilters.buyers.join(','))
    if (newFilters.sellers.length > 0) params.set('sellers', newFilters.sellers.join(','))
    if (newFilters.sortBy !== 'date_desc') params.set('sortBy', newFilters.sortBy)

    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.replace(newURL, { scroll: false })
  }, [router])

  // Update filter function
  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    setSavedFilters(newFilters)
    updateURL(newFilters)
  }, [filters, setSavedFilters, updateURL])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters(defaultFilterState)
    setSavedFilters(defaultFilterState)
    router.replace(window.location.pathname, { scroll: false })
  }, [setSavedFilters, router])

  // Apply preset filters
  const applyPreset = useCallback((presetFilters: Partial<FilterState>) => {
    const newFilters = { ...defaultFilterState, ...presetFilters }
    setFilters(newFilters)
    setSavedFilters(newFilters)
    updateURL(newFilters)
  }, [setSavedFilters, updateURL])

  // Check if filters are active
  const hasActiveFilters = useCallback(() => {
    return JSON.stringify(filters) !== JSON.stringify(defaultFilterState)
  }, [filters])

  return {
    filters,
    updateFilter,
    clearFilters,
    applyPreset,
    hasActiveFilters: hasActiveFilters()
  }
} 