import { formatCurrency, formatPercent } from '../utils/formatters'
import { getChangeColor, getChangeIcon } from '../utils/colors'

/**
 * PortfolioSummaryCard - Displays portfolio total value and change
 * @param {Object} portfolio - Portfolio data with totalValue, totalChange, totalChangePercent
 */
const PortfolioSummaryCard = ({ portfolio }) => {
  if (!portfolio) return null

  const { totalValue, totalChange, totalChangePercent } = portfolio
  const changeColor = getChangeColor(totalChangePercent)
  const changeIcon = getChangeIcon(totalChangePercent)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Portfolio Value
        </h2>
        <span className="text-xs text-gray-400 dark:text-gray-500">24h Change</span>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="portfolio-value">
            {formatCurrency(totalValue)}
          </p>
        </div>
        
        <div className="text-right">
          <p className={`text-lg font-semibold ${changeColor} flex items-center gap-1`} data-testid="portfolio-change-amount">
            <span aria-hidden="true">{changeIcon}</span>
            <span>{formatCurrency(Math.abs(totalChange))}</span>
          </p>
          <p className={`text-sm ${changeColor}`} data-testid="portfolio-change-percent">
            {formatPercent(totalChangePercent)}
          </p>
        </div>
      </div>
      
      {/* Visual indicator bar - Shows change scaled 0-10% range */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">Change indicator (0-10%)</span>
        </div>
        <div className="h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              totalChangePercent >= 0 ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(Math.abs(totalChangePercent) * 10, 100)}%` }}
            role="progressbar"
            aria-valuenow={Math.abs(totalChangePercent)}
            aria-valuemin={0}
            aria-valuemax={10}
            aria-label={`Portfolio ${totalChangePercent >= 0 ? 'gain' : 'loss'} indicator`}
          />
        </div>
      </div>
    </div>
  )
}

export default PortfolioSummaryCard


