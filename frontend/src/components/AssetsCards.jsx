import { formatCurrency, formatPercent, formatLargeNumber } from '../utils/formatters'
import { getChangeColor, getChangeIcon } from '../utils/colors'

/**
 * AssetsCards - Mobile card view for assets
 * @param {Array} assets - Array of asset objects
 * @param {Function} onAssetClick - Callback when asset card is clicked
 */
const AssetsCards = ({ assets = [], onAssetClick }) => {
  if (assets.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
        No assets found
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {assets.map((asset) => {
        const changeColor = getChangeColor(asset.changePercent)
        const changeIcon = getChangeIcon(asset.changePercent)
        
        return (
          <div
            key={asset.id || asset.symbol}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md hover:border-pulse-primary/50 transition-all"
            onClick={() => onAssetClick?.(asset)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onAssetClick?.(asset)
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${asset.name} (${asset.symbol})`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {asset.symbol}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                  {asset.name}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-gray-900 dark:text-white">
                  {formatCurrency(asset.currentPrice)}
                </p>
                <p className={`text-sm font-medium ${changeColor} flex items-center justify-end gap-1`}>
                  <span aria-hidden="true">{changeIcon}</span>
                  <span>{formatPercent(asset.changePercent)}</span>
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatLargeNumber(asset.volume)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Market Cap</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatLargeNumber(asset.marketCap)}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AssetsCards




