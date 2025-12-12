import { useCallback } from 'react'
import { getDashboard } from '../services/api'
import { useDataFetch } from '../hooks/useDataFetch'
import DashboardSkeleton from '../components/DashboardSkeleton'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import PortfolioSummaryCard from '../components/PortfolioSummaryCard'
import TopMoversCard from '../components/TopMoversCard'
import RecentNewsCard from '../components/RecentNewsCard'
import ActiveAlertsCard from '../components/ActiveAlertsCard'
import LastUpdated from '../components/LastUpdated'

// Auto-refresh interval: 30 seconds
const REFRESH_INTERVAL = 30000

/**
 * Dashboard - Main dashboard page with portfolio summary, top movers, news, and alerts
 */
const Dashboard = () => {
  const fetchDashboard = useCallback(() => getDashboard(), [])
  const { data, loading, error, refetch, lastUpdated } = useDataFetch(
    fetchDashboard, 
    [], 
    { refreshInterval: REFRESH_INTERVAL }
  )

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <DashboardSkeleton />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <ErrorMessage 
          message={error} 
          onRetry={refetch}
          title="Failed to load dashboard"
        />
      </div>
    )
  }

  // Empty state
  if (!data || !data.portfolio) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <EmptyState 
          title="No dashboard data"
          description="Unable to load dashboard information. Please try again later."
          icon="📊"
        />
      </div>
    )
  }

  const { portfolio, topGainers, topLosers, recentNews, activeAlerts } = data

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <LastUpdated timestamp={lastUpdated} />
      </div>

      {/* Portfolio Summary */}
      <section aria-labelledby="portfolio-heading">
        <h2 id="portfolio-heading" className="sr-only">Portfolio Summary</h2>
        <PortfolioSummaryCard portfolio={portfolio} />
      </section>

      {/* Top Movers Grid */}
      <section aria-labelledby="movers-heading">
        <h2 id="movers-heading" className="sr-only">Top Market Movers</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopMoversCard 
            title="Top Gainers" 
            movers={topGainers} 
            type="gainers" 
          />
          <TopMoversCard 
            title="Top Losers" 
            movers={topLosers} 
            type="losers" 
          />
        </div>
      </section>

      {/* News and Alerts Grid */}
      <section aria-labelledby="updates-heading">
        <h2 id="updates-heading" className="sr-only">News and Alerts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentNewsCard news={recentNews} limit={5} />
          <ActiveAlertsCard alerts={activeAlerts} limit={5} />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
