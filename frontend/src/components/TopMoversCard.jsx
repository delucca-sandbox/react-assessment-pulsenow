import { formatCurrency, formatPercent } from '../utils/formatters'
import { getChangeColor, getChangeIcon } from '../utils/colors'

/**
 * TopMoversCard - Displays top gainers or losers list
 * @param {string} title - Card title
 * @param {Array} movers - Array of asset objects with symbol, name, currentPrice, changePercent
 * @param {string} type - 'gainers' or 'losers' for styling
 */
const TopMoversCard = ({ title, movers = [], type = 'gainers' }) => {
  // Normalize and validate type
  const validTypes = ['gainers', 'losers']
  const normalizedType = validTypes.includes(type) ? type : 'gainers'
  
  const isGainers = normalizedType === 'gainers'
  const headerColor = isGainers 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-red-600 dark:text-red-400'
  const headerIcon = isGainers ? '📈' : '📉'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl" role="img" aria-hidden="true">{headerIcon}</span>
        <h3 className={`text-lg font-semibold ${headerColor}`}>
          {title}
        </h3>
      </div>

      {movers.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No {normalizedType} to display
        </p>
      ) : (
        <ul className="space-y-3" aria-label={title}>
          {movers.slice(0, 5).map((asset, index) => {
            const changeColor = getChangeColor(asset.changePercent)
            const changeIcon = getChangeIcon(asset.changePercent)
            
            return (
              <li 
                key={asset.id || asset.symbol}
                className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 -mx-2 px-2 rounded transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-300"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {asset.symbol}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                      {asset.name}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(asset.currentPrice)}
                  </p>
                  <p className={`text-sm font-medium ${changeColor} flex items-center justify-end gap-1`}>
                    <span aria-hidden="true">{changeIcon}</span>
                    <span>{formatPercent(asset.changePercent)}</span>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default TopMoversCard


