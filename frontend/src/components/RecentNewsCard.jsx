import { formatRelativeTime } from '../utils/formatters'
import { getCategoryClasses, getImpactClasses } from '../utils/colors'

/**
 * RecentNewsCard - Displays recent news items with category badges
 * @param {Array} news - Array of news items
 * @param {number} limit - Maximum number of items to display (default: 5)
 */
const RecentNewsCard = ({ news = [], limit = 5 }) => {
  const displayNews = news.slice(0, limit)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-hidden="true">📰</span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent News
          </h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {news.length} items
        </span>
      </div>

      {displayNews.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No recent news
        </p>
      ) : (
        <ul className="space-y-4" aria-label="Recent news">
          {displayNews.map((item) => (
            <li 
              key={item.id}
              className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0 last:pb-0"
            >
              <h4 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-pulse-primary dark:hover:text-pulse-light cursor-pointer transition-colors">
                {item.title}
              </h4>
              
              <div className="flex flex-wrap items-center gap-2">
                {/* Category badge */}
                <span 
                  className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${getCategoryClasses(item.category)}`}
                >
                  {item.category}
                </span>
                
                {/* Impact badge */}
                <span 
                  className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${getImpactClasses(item.impact)}`}
                >
                  {item.impact}
                </span>
                
                {/* Source and time */}
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                  {item.source} • {formatRelativeTime(item.timestamp)}
                </span>
              </div>
              
              {/* Affected assets */}
              {item.affectedAssets && item.affectedAssets.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.affectedAssets.slice(0, 3).map((asset) => (
                    <span 
                      key={asset}
                      className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                    >
                      {asset}
                    </span>
                  ))}
                  {item.affectedAssets.length > 3 && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      +{item.affectedAssets.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RecentNewsCard


