import { useCallback, useMemo } from 'react'
import { getAlerts } from '../services/api'
import { useDataFetch } from '../hooks/useDataFetch'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import AlertSection from '../components/AlertSection'
import LastUpdated from '../components/LastUpdated'

// Severity order for display
const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low']

// Auto-refresh interval: 30 seconds
const REFRESH_INTERVAL = 30000

/**
 * Alerts - Page displaying alerts grouped by severity with collapsible sections
 */
const Alerts = () => {
  const fetchAlerts = useCallback(() => getAlerts(), [])
  const { data: alertsData, loading, error, refetch, lastUpdated } = useDataFetch(
    fetchAlerts, 
    [], 
    { refreshInterval: REFRESH_INTERVAL }
  )

  // Group alerts by severity
  const groupedAlerts = useMemo(() => {
    if (!alertsData) return {}
    
    const groups = {
      critical: [],
      high: [],
      medium: [],
      low: []
    }
    
    alertsData.forEach(alert => {
      const severity = alert.severity?.toLowerCase() || 'low'
      if (groups[severity]) {
        groups[severity].push(alert)
      } else {
        groups.low.push(alert)
      }
    })

    // Sort each group by timestamp (newest first)
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    })
    
    return groups
  }, [alertsData])

  // Calculate total counts
  const totalAlerts = alertsData?.length || 0
  const criticalCount = groupedAlerts.critical?.length || 0

  // Loading skeleton
  const LoadingSkeleton_Alerts = () => (
    <div className="space-y-4">
      {SEVERITY_ORDER.map((severity) => (
        <div key={severity} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LoadingSkeleton className="h-5 w-5" />
              <LoadingSkeleton className="h-6 w-6" variant="circle" />
              <LoadingSkeleton className="h-6 w-24" />
            </div>
            <LoadingSkeleton className="h-7 w-10" />
          </div>
        </div>
      ))}
    </div>
  )

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alerts</h1>
        <LoadingSkeleton_Alerts />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alerts</h1>
        <ErrorMessage 
          message={error} 
          onRetry={refetch}
          title="Failed to load alerts"
        />
      </div>
    )
  }

  // Empty state
  if (!alertsData || alertsData.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alerts</h1>
        <EmptyState 
          title="No alerts"
          description="You're all caught up! There are no alerts at this time."
          icon="✅"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alerts</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {totalAlerts} {totalAlerts === 1 ? 'alert' : 'alerts'}
            {criticalCount > 0 && (
              <span className="text-red-600 dark:text-red-400 font-medium ml-2">
                ({criticalCount} critical)
              </span>
            )}
          </p>
        </div>
        <LastUpdated timestamp={lastUpdated} />
      </div>

      {/* Alert Sections by Severity */}
      <div className="space-y-4" role="list" aria-label="Alerts grouped by severity">
        {SEVERITY_ORDER.map((severity) => (
          <AlertSection
            key={severity}
            severity={severity}
            alerts={groupedAlerts[severity] || []}
          />
        ))}
      </div>
    </div>
  )
}

export default Alerts
