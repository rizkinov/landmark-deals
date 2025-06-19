import { useState, useEffect } from 'react'
import { Deal, FilterState, DealsResponse } from '../lib/types'
import { fetchFilteredDeals, subscribeToDeals } from '../lib/supabase'
import { useDebounce } from './use-debounce'

export function useFilteredDeals(filters: FilterState) {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [filteredCount, setFilteredCount] = useState(0)

  // Debounce filters to avoid too many API calls
  const debouncedFilters = useDebounce(filters, 300)

  // Fetch filtered deals
  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response: DealsResponse = await fetchFilteredDeals(debouncedFilters)
        setDeals(response.data)
        setTotalCount(response.total)
        setFilteredCount(response.filtered)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch deals')
        setDeals([])
        setTotalCount(0)
        setFilteredCount(0)
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [debouncedFilters])

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToDeals((updatedDeals: Deal[]) => {
      // Re-fetch with current filters when data changes
      fetchFilteredDeals(debouncedFilters)
        .then((response) => {
          setDeals(response.data)
          setTotalCount(response.total)
          setFilteredCount(response.filtered)
        })
        .catch((err) => {
          console.error('Error refetching deals after real-time update:', err)
        })
    })

    return unsubscribe
  }, [debouncedFilters])

  // Refresh function for manual refresh
  const refresh = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response: DealsResponse = await fetchFilteredDeals(debouncedFilters)
      setDeals(response.data)
      setTotalCount(response.total)
      setFilteredCount(response.filtered)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh deals')
    } finally {
      setLoading(false)
    }
  }

  return {
    deals,
    loading,
    error,
    totalCount,
    filteredCount,
    refresh
  }
} 