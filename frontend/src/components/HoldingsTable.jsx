import { formatCurrency, formatPercent } from '../utils/formatters'
import { getChangeColor, getChangeIcon } from '../utils/colors'

/**
 * HoldingsTable - Table displaying portfolio holdings with profit/loss
 * @param {Array} holdings - Array of holding objects
 */
const HoldingsTable = ({ holdings = [] }) => {
  if (holdings.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
        No holdings in portfolio
      </div>
    )
  }

  // Calculate totals
  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0)
  const totalChange = holdings.reduce((sum, h) => sum + h.change, 0)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Asset
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Avg. Buy Price
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Current Price
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Value
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Profit/Loss
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {holdings.map((holding) => {
              const changeColor = getChangeColor(holding.changePercent)
              const changeIcon = getChangeIcon(holding.changePercent)
              
              return (
                <tr 
                  key={holding.assetId}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {holding.assetId}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-600 dark:text-gray-300">
                    {holding.quantity.toLocaleString('en-US')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-600 dark:text-gray-300">
                    {formatCurrency(holding.avgBuyPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900 dark:text-white font-medium">
                    {formatCurrency(holding.currentPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900 dark:text-white font-medium">
                    {formatCurrency(holding.value)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className={`font-medium ${changeColor}`}>
                      <div className="flex items-center justify-end gap-1">
                        <span aria-hidden="true">{changeIcon}</span>
                        <span>{formatCurrency(Math.abs(holding.change))}</span>
                      </div>
                      <div className="text-sm">
                        {formatPercent(holding.changePercent)}
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 dark:bg-gray-700/50 border-t-2 border-gray-200 dark:border-gray-600">
              <td colSpan={4} className="px-6 py-4 text-right font-semibold text-gray-900 dark:text-white">
                Total
              </td>
              <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalValue)}
              </td>
              <td className="px-6 py-4 text-right">
                <span className={`font-bold ${getChangeColor(totalChange)}`}>
                  {totalChange >= 0 ? '+' : ''}{formatCurrency(totalChange)}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
        {holdings.map((holding) => {
          const changeColor = getChangeColor(holding.changePercent)
          const changeIcon = getChangeIcon(holding.changePercent)
          
          return (
            <div key={holding.assetId} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  {holding.assetId}
                </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatCurrency(holding.value)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Qty: </span>
                  <span className="text-gray-900 dark:text-white">{holding.quantity}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Avg: </span>
                  <span className="text-gray-900 dark:text-white">{formatCurrency(holding.avgBuyPrice)}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Current: </span>
                  <span className="text-gray-900 dark:text-white">{formatCurrency(holding.currentPrice)}</span>
                </div>
                <div className={changeColor}>
                  <span aria-hidden="true">{changeIcon}</span>
                  <span className="font-medium ml-1">{formatPercent(holding.changePercent)}</span>
                </div>
              </div>
            </div>
          )
        })}
        
        {/* Mobile Total */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900 dark:text-white">Total</span>
            <div className="text-right">
              <div className="font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalValue)}
              </div>
              <div className={`text-sm font-medium ${getChangeColor(totalChange)}`}>
                {totalChange >= 0 ? '+' : ''}{formatCurrency(totalChange)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HoldingsTable


