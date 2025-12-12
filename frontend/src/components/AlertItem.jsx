import { formatRelativeTime } from '../utils/formatters'

/**
 * AlertItem - Individual alert item component
 * @param {Object} alert - Alert object with title, message, timestamp, affectedAssets, actionRequired
 */
const AlertItem = ({ alert }) => {
  if (!alert) return null

  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-lg">
      {/* Title and action indicator */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1">
          {alert.title && (
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {alert.title}
            </h4>
          )}
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {alert.message}
          </p>
        </div>
        
        {alert.actionRequired && (
          <span className="shrink-0 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-semibold rounded-full">
            Action Required
          </span>
        )}
      </div>

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-3 mt-3">
        {/* Timestamp */}
        <time 
          dateTime={alert.timestamp}
          className="text-xs text-gray-500 dark:text-gray-400"
        >
          {formatRelativeTime(alert.timestamp)}
        </time>

        {/* Alert type */}
        {alert.type && (
          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            • {alert.type.replace(/_/g, ' ')}
          </span>
        )}

        {/* Affected Assets */}
        {alert.affectedAssets && alert.affectedAssets.length > 0 && (
          <div className="flex flex-wrap gap-1 ml-auto">
            {alert.affectedAssets.slice(0, 3).map((asset) => (
              <span 
                key={asset}
                className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs font-medium"
              >
                {asset}
              </span>
            ))}
            {alert.affectedAssets.length > 3 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                +{alert.affectedAssets.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AlertItem




