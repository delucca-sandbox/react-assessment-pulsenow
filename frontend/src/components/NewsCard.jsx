import { formatRelativeTime } from '../utils/formatters'
import { getCategoryClasses, getImpactClasses } from '../utils/colors'

/**
 * NewsCard - Card component for displaying a news item
 * @param {Object} news - News item object
 */
const NewsCard = ({ news }) => {
  if (!news) return null

  return (
    <article 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md hover:border-pulse-primary/30 transition-all duration-200"
      aria-labelledby={`news-title-${news.id}`}
    >
      {/* Card Header */}
      <div className="p-5">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Category badge */}
          <span 
            className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getCategoryClasses(news.category)}`}
          >
            {news.category}
          </span>
          
          {/* Impact badge */}
          <span 
            className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getImpactClasses(news.impact)}`}
          >
            {news.impact} impact
          </span>
        </div>

        {/* Title */}
        <h3 
          id={`news-title-${news.id}`}
          className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-pulse-primary dark:hover:text-pulse-light cursor-pointer transition-colors"
        >
          {news.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {news.summary}
        </p>

        {/* Affected Assets */}
        {news.affectedAssets && news.affectedAssets.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {news.affectedAssets.slice(0, 4).map((asset) => (
              <span 
                key={asset}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
              >
                {asset}
              </span>
            ))}
            {news.affectedAssets.length > 4 && (
              <span className="px-2 py-0.5 text-gray-500 dark:text-gray-400 text-xs">
                +{news.affectedAssets.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {news.source}
          </span>
          <time 
            dateTime={news.timestamp}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {formatRelativeTime(news.timestamp)}
          </time>
        </div>
      </div>
    </article>
  )
}

export default NewsCard


