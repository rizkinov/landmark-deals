import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FilterState } from '../lib/types'
import { useLocalStorage } from './use-local-storage'

const defaultFilterState: FilterState = {
  search: '',
  countries: [],
  categories: [],
  subcategories: [],
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

    const categories = searchParams.get('categories')
    if (categories) urlFilters.categories = categories.split(',')

    const subcategories = searchParams.get('subcategories')
    if (subcategories) urlFilters.subcategories = subcategories.split(',')

    const priceMin = searchParams.get('priceMin')
    const priceMax = searchParams.get('priceMax')
    const priceCurrency = searchParams.get('priceCurrency') as 'USD' | 'SGD'
    if (priceMin || priceMax || priceCurrency) {
      urlFilters.priceRange = {
        min: priceMin ? parseFloat(priceMin) : null,
        max: priceMax ? parseFloat(priceMax) : null,
        currency: priceCurrency || 'USD'
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
    return hasUrlFilters ? { ...defaultFilterState, ...urlFilters } : savedFilters
  })

  // Update URL when filters change
  const updateURL = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams()

    if (newFilters.search) params.set('search', newFilters.search)
    if (newFilters.countries.length > 0) params.set('countries', newFilters.countries.join(','))
    if (newFilters.categories.length > 0) params.set('categories', newFilters.categories.join(','))
    if (newFilters.subcategories.length > 0) params.set('subcategories', newFilters.subcategories.join(','))
    
    if (newFilters.priceRange.min !== null) params.set('priceMin', newFilters.priceRange.min.toString())
    if (newFilters.priceRange.max !== null) params.set('priceMax', newFilters.priceRange.max.toString())
    if (newFilters.priceRange.currency !== 'USD') params.set('priceCurrency', newFilters.priceRange.currency)
    
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