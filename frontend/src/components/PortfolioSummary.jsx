import { formatCurrency, formatPercent } from '../utils/formatters'
import { getChangeColor, getChangeIcon } from '../utils/colors'

/**
 * PortfolioSummary - Displays total value, change, and best/worst performers
 * @param {Object} portfolio - Portfolio data with totalValue, totalChange, totalChangePercent
 * @param {Object} performance - Performance data with bestPerformer, worstPerformer
 */
const PortfolioSummary = ({ portfolio, performance }) => {
  if (!portfolio) return null

  const { totalValue, totalChange, totalChangePercent } = portfolio
  const changeColor = getChangeColor(totalChangePercent)
  const changeIcon = getChangeIcon(totalChangePercent)

  const bestPerformer = performance?.bestPerformer
  const worstPerformer = performance?.worstPerformer

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Value Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Total Value
        </h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {formatCurrency(totalValue)}
        </p>
        <div className={`mt-2 flex items-center gap-2 ${changeColor}`}>
          <span aria-hidden="true">{changeIcon}</span>
          <span className="font-medium">{formatCurrency(Math.abs(totalChange))}</span>
          <span className="text-sm">({formatPercent(totalChangePercent)})</span>
        </div>
      </div>

      {/* Best Performer Card */}
      {bestPerformer && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg" role="img" aria-hidden="true">🏆</span>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Best Performer
            </h3>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {bestPerformer.assetId}
          </p>
          <div className="mt-2 flex items-center gap-2 text-green-600 dark:text-green-400">
            <span aria-hidden="true">↑</span>
            <span className="font-medium">{formatPercent(bestPerformer.changePercent)}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({formatCurrency(bestPerformer.change)})
            </span>
          </div>
        </div>
      )}

      {/* Worst Performer Card */}
      {worstPerformer && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg" role="img" aria-hidden="true">📉</span>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Worst Performer
            </h3>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {worstPerformer.assetId}
          </p>
          <div className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400">
            <span aria-hidden="true">↓</span>
            <span className="font-medium">{formatPercent(worstPerformer.changePercent)}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({formatCurrency(worstPerformer.change)})
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default PortfolioSummary




