import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { getStocks, getCrypto, getStock, getCryptoBySymbol } from '../services/api'
import { useDataFetch } from '../hooks/useDataFetch'
import { SkeletonTable } from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import AssetsFilter from '../components/AssetsFilter'
import AssetsTable from '../components/AssetsTable'
import AssetsCards from '../components/AssetsCards'
import AssetModal from '../components/AssetModal'
import LastUpdated from '../components/LastUpdated'

// Auto-refresh interval: 30 seconds
const REFRESH_INTERVAL = 30000

/**
 * Assets - Page for browsing and analyzing stocks and cryptocurrencies
 */
const Assets = () => {
  // Filter and sort state
  const [typeFilter, setTypeFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('marketCap')
  const [sortOrder, setSortOrder] = useState('desc')
  
  // Modal state
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [detailedAsset, setDetailedAsset] = useState(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  
  // Ref to track component mount state for async operations
  const isMountedRef = useRef(true)
  
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  // Fetch stocks
  const fetchStocks = useCallback(() => getStocks(), [])
  const { 
    data: stocksData, 
    loading: stocksLoading, 
    error: stocksError, 
    refetch: refetchStocks,
    lastUpdated: stocksLastUpdated 
  } = useDataFetch(fetchStocks, [], { refreshInterval: REFRESH_INTERVAL })

  // Fetch crypto
  const fetchCrypto = useCallback(() => getCrypto(), [])
  const { 
    data: cryptoData, 
    loading: cryptoLoading, 
    error: cryptoError, 
    refetch: refetchCrypto,
    lastUpdated: cryptoLastUpdated 
  } = useDataFetch(fetchCrypto, [], { refreshInterval: REFRESH_INTERVAL })

  // Use the most recent update time
  const lastUpdated = stocksLastUpdated && cryptoLastUpdated 
    ? (stocksLastUpdated > cryptoLastUpdated ? stocksLastUpdated : cryptoLastUpdated)
    : stocksLastUpdated || cryptoLastUpdated

  // Combine and process assets
  const assets = useMemo(() => {
    const stocks = (stocksData || []).map(s => ({ ...s, type: 'stock' }))
    const crypto = (cryptoData || []).map(c => ({ ...c, type: 'crypto' }))
    
    let combined = []
    
    // Apply type filter
    if (typeFilter === 'all') {
      combined = [...stocks, ...crypto]
    } else if (typeFilter === 'stocks') {
      combined = stocks
    } else if (typeFilter === 'crypto') {
      combined = crypto
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      combined = combined.filter(asset => 
        asset.symbol.toLowerCase().includes(query) ||
        asset.name.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    combined.sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]
      
      // Handle string sorting
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      }
      return aVal < bVal ? 1 : -1
    })

    return combined
  }, [stocksData, cryptoData, typeFilter, searchQuery, sortBy, sortOrder])

  // Handle sort change
  const handleSort = useCallback((field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }, [sortBy])

  // Handle asset click - fetch detailed data and open modal
  const handleAssetClick = useCallback(async (asset) => {
    setSelectedAsset(asset)
    setModalOpen(true)
    setLoadingDetail(true)
    
    try {
      const response = asset.type === 'stock' 
        ? await getStock(asset.symbol)
        : await getCryptoBySymbol(asset.symbol)
      
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setDetailedAsset(response.data.data || response.data)
      }
    } catch {
      // If detailed fetch fails, just show basic asset data
      if (isMountedRef.current) {
        setDetailedAsset(asset)
      }
    } finally {
      if (isMountedRef.current) {
        setLoadingDetail(false)
      }
    }
  }, [])

  // Handle modal close
  const handleCloseModal = useCallback(() => {
    setModalOpen(false)
    setSelectedAsset(null)
    setDetailedAsset(null)
  }, [])

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setTypeFilter('all')
    setSearchQuery('')
  }, [])

  // Refetch all data
  const handleRetry = useCallback(() => {
    refetchStocks()
    refetchCrypto()
  }, [refetchStocks, refetchCrypto])

  const loading = stocksLoading || cryptoLoading
  const error = stocksError || cryptoError

  // Loading state
  if (loading && !stocksData && !cryptoData) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assets</h1>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="h-11 w-36 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="h-11 flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
        <SkeletonTable rows={10} cols={6} />
      </div>
    )
  }

  // Error state
  if (error && !stocksData && !cryptoData) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assets</h1>
        <ErrorMessage 
          message={error} 
          onRetry={handleRetry}
          title="Failed to load assets"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assets</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {assets.length} {assets.length === 1 ? 'asset' : 'assets'}
          </span>
          <LastUpdated timestamp={lastUpdated} />
        </div>
      </div>

      {/* Filters */}
      <AssetsFilter
        typeFilter={typeFilter}
        searchQuery={searchQuery}
        onTypeChange={setTypeFilter}
        onSearchChange={setSearchQuery}
        onClear={handleClearFilters}
      />

      {/* Empty state */}
      {assets.length === 0 ? (
        <EmptyState
          title="No assets found"
          description={searchQuery 
            ? `No assets match "${searchQuery}". Try a different search term.`
            : "No assets available for the selected filter."
          }
          icon="🔍"
          action={
            (typeFilter !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-2 bg-pulse-primary text-white rounded-lg hover:bg-pulse-secondary transition-colors"
              >
                Clear Filters
              </button>
            )
          }
        />
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <AssetsTable
              assets={assets}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              onAssetClick={handleAssetClick}
            />
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            <AssetsCards
              assets={assets}
              onAssetClick={handleAssetClick}
            />
          </div>
        </>
      )}

      {/* Asset Detail Modal */}
      <AssetModal
        asset={loadingDetail ? selectedAsset : detailedAsset}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default Assets
