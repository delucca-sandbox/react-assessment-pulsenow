import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Custom hook for data fetching with loading/error states and auto-refresh support
 * @param {Function} fetchFn - Async function that returns API response
 * @param {Array} deps - Dependencies array for re-fetching
 * @param {Object} options - Configuration options
 * @param {number} options.refreshInterval - Auto-refresh interval in ms (default: null = no auto-refresh)
 */
export const useDataFetch = (fetchFn, deps = [], options = {}) => {
  const { refreshInterval = null } = options
  
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  
  const isFetchingRef = useRef(false)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async (isRefresh = false) => {
    // Prevent redundant fetches
    if (isFetchingRef.current) return
    
    isFetchingRef.current = true
    
    // Only show loading on initial fetch, not refreshes
    if (!isRefresh) {
      setLoading(true)
    }
    setError(null)
    
    try {
      const response = await fetchFn()
      if (mountedRef.current) {
        // Handle both direct data and wrapped response formats
        const responseData = response?.data?.data ?? response?.data ?? response
        setData(responseData)
        setLastUpdated(new Date())
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err.message || 'An error occurred while fetching data')
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
      isFetchingRef.current = false
    }
  }, [fetchFn])

  const refetch = useCallback(() => {
    fetchData(true)
  }, [fetchData])

  // Initial fetch and dependency-based re-fetch
  useEffect(() => {
    mountedRef.current = true
    fetchData(false)
    
    return () => {
      mountedRef.current = false
    }
  }, [...deps, fetchData])

  // Auto-refresh interval
  useEffect(() => {
    if (!refreshInterval) return
    
    const interval = setInterval(() => {
      fetchData(true)
    }, refreshInterval)
    
    return () => clearInterval(interval)
  }, [refreshInterval, fetchData])

  return { data, loading, error, lastUpdated, refetch }
}


