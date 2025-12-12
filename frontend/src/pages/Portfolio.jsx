import { useCallback, useMemo } from 'react'
import { getPortfolio } from '../services/api'
import { useDataFetch } from '../hooks/useDataFetch'
import LoadingSkeleton, { SkeletonCard } from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import PortfolioSummary from '../components/PortfolioSummary'
import AllocationChart from '../components/AllocationChart'
import HoldingsTable from '../components/HoldingsTable'
import LastUpdated from '../components/LastUpdated'

// Auto-refresh interval: 30 seconds
const REFRESH_INTERVAL = 30000

// Portfolio loading skeleton component
const PortfolioSkeleton = () => (
  <div className="space-y-6">
    {/* Summary Cards Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>

    {/* Chart Skeleton */}
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <LoadingSkeleton className="h-6 w-40 mb-4" />
      <LoadingSkeleton className="h-[300px] w-full" />
    </div>

    {/* Table Skeleton */}
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <LoadingSkeleton className="h-6 w-32 mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <LoadingSkeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  </div>
)

/**
 * Portfolio - Page displaying portfolio value, allocation chart, and holdings table
 */
const Portfolio = () => {
  const fetchPortfolio = useCallback(() => getPortfolio(), [])
  const { data: portfolio, loading, error, refetch, lastUpdated } = useDataFetch(
    fetchPortfolio, 
    [], 
    { refreshInterval: REFRESH_INTERVAL }
  )

  // Calculate allocation and performance from holdings
  const { allocation, performance } = useMemo(() => {
    if (!portfolio?.assets || portfolio.assets.length === 0) {
      return { allocation: [], performance: null }
    }

    const holdings = portfolio.assets
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0)

    // Calculate allocation percentages
    const allocation = holdings.map(h => ({
      assetId: h.assetId,
      percentage: totalValue > 0 ? (h.value / totalValue) * 100 : 0,
      value: h.value
    })).sort((a, b) => b.percentage - a.percentage)

    // Find best and worst performers
    const sortedByChange = [...holdings].sort((a, b) => b.changePercent - a.changePercent)
    const performance = {
      bestPerformer: sortedByChange[0],
      worstPerformer: sortedByChange[sortedByChange.length - 1]
    }

    return { allocation, performance }
  }, [portfolio])


  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        </div>
        <PortfolioSkeleton />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        <ErrorMessage 
          message={error} 
          onRetry={refetch}
          title="Failed to load portfolio"
        />
      </div>
    )
  }

  // Empty state
  if (!portfolio || !portfolio.assets || portfolio.assets.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        <EmptyState 
          title="No holdings yet"
          description="Your portfolio is empty. Start by adding some assets to track your investments."
          icon="💼"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {portfolio.assets.length} {portfolio.assets.length === 1 ? 'holding' : 'holdings'}
          </span>
          <LastUpdated timestamp={lastUpdated} />
        </div>
      </div>

      {/* Portfolio Summary */}
      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">Portfolio Summary</h2>
        <PortfolioSummary portfolio={portfolio} performance={performance} />
      </section>

      {/* Allocation Chart */}
      <section 
        aria-labelledby="allocation-heading"
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h2 
          id="allocation-heading" 
          className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
        >
          Asset Allocation
        </h2>
        <AllocationChart data={allocation} height={350} />
      </section>

      {/* Holdings Table */}
      <section aria-labelledby="holdings-heading">
        <h2 
          id="holdings-heading" 
          className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
        >
          Holdings
        </h2>
        <HoldingsTable holdings={portfolio.assets} />
      </section>
    </div>
  )
}

export default Portfolio
