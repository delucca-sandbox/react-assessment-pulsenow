import { formatRelativeTime } from '../utils/formatters'
import { getSeverityClasses } from '../utils/colors'

/**
 * ActiveAlertsCard - Displays active alerts with severity badges
 * @param {Array} alerts - Array of alert objects
 * @param {number} limit - Maximum number of alerts to display (default: 5)
 */
const ActiveAlertsCard = ({ alerts = [], limit = 5 }) => {
  const displayAlerts = alerts.slice(0, limit)

  // Sort by severity (critical first)
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
  const sortedAlerts = [...displayAlerts].sort(
    (a, b) => (severityOrder[a.severity] ?? 4) - (severityOrder[b.severity] ?? 4)
  )

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-hidden="true">🔔</span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Active Alerts
          </h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {alerts.length} active
        </span>
      </div>

      {sortedAlerts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No active alerts
        </p>
      ) : (
        <ul className="space-y-3" aria-label="Active alerts" role="list">
          {sortedAlerts.map((alert) => (
            <li 
              key={alert.id}
              className="flex items-start gap-3 p-2 -mx-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              role="listitem"
            >
              {/* Severity badge */}
              <span 
                className={`px-2 py-1 rounded text-xs font-semibold uppercase border ${getSeverityClasses(alert.severity)}`}
                aria-label={`Severity: ${alert.severity}`}
              >
                {alert.severity}
              </span>
              
              <div className="flex-1 min-w-0">
                {/* Alert title or type */}
                {alert.title && (
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {alert.title}
                  </p>
                )}
                
                {/* Alert message */}
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {alert.message}
                </p>
                
                {/* Timestamp and action indicator */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatRelativeTime(alert.timestamp)}
                  </span>
                  
                  {alert.actionRequired && (
                    <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                      • Action required
                    </span>
                  )}
                </div>
                
                {/* Affected assets */}
                {alert.affectedAssets && alert.affectedAssets.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {alert.affectedAssets.slice(0, 3).map((asset) => (
                      <span 
                        key={asset}
                        className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                      >
                        {asset}
                      </span>
                    ))}
                    {alert.affectedAssets.length > 3 && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        +{alert.affectedAssets.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ActiveAlertsCard


