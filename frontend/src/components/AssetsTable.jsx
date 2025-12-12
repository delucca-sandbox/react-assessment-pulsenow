import { formatCurrency, formatPercent, formatLargeNumber } from '../utils/formatters'
import { getChangeColor, getChangeIcon } from '../utils/colors'

/**
 * AssetsTable - Desktop table view for assets
 * @param {Array} assets - Array of asset objects
 * @param {string} sortBy - Current sort field
 * @param {string} sortOrder - 'asc' or 'desc'
 * @param {Function} onSort - Callback when sort changes
 * @param {Function} onAssetClick - Callback when asset row is clicked
 */
const AssetsTable = ({ assets = [], sortBy, sortOrder, onSort, onAssetClick }) => {
  const columns = [
    { key: 'symbol', label: 'Symbol', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'currentPrice', label: 'Price', sortable: true, align: 'right' },
    { key: 'changePercent', label: '24h Change', sortable: true, align: 'right' },
    { key: 'volume', label: 'Volume', sortable: true, align: 'right' },
    { key: 'marketCap', label: 'Market Cap', sortable: true, align: 'right' },
  ]

  const handleSort = (key) => {
    if (onSort) {
      onSort(key)
    }
  }

  const SortIcon = ({ columnKey }) => {
    if (sortBy !== columnKey) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    }
    return sortOrder === 'asc' ? (
      <svg className="w-4 h-4 text-pulse-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-pulse-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" role="grid">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                    column.align === 'right' ? 'text-right' : 'text-left'
                  } ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 select-none' : ''}`}
                  onClick={() => column.sortable && handleSort(column.key)}
                  onKeyDown={(e) => {
                    if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      handleSort(column.key)
                    }
                  }}
                  tabIndex={column.sortable ? 0 : -1}
                  role={column.sortable ? 'columnheader button' : 'columnheader'}
                  aria-sort={sortBy === column.key ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <div className={`flex items-center gap-2 ${column.align === 'right' ? 'justify-end' : ''}`}>
                    <span>{column.label}</span>
                    {column.sortable && <SortIcon columnKey={column.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {assets.map((asset) => {
              const changeColor = getChangeColor(asset.changePercent)
              const changeIcon = getChangeIcon(asset.changePercent)
              
              return (
                <tr
                  key={asset.id || asset.symbol}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  onClick={() => onAssetClick?.(asset)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onAssetClick?.(asset)
                    }
                  }}
                  tabIndex={0}
                  role="row"
                  aria-label={`${asset.name} (${asset.symbol})`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {asset.symbol}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-600 dark:text-gray-300 truncate max-w-[200px] block">
                      {asset.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(asset.currentPrice)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`font-medium ${changeColor} flex items-center justify-end gap-1`}>
                      <span aria-hidden="true">{changeIcon}</span>
                      <span>{formatPercent(asset.changePercent)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-gray-600 dark:text-gray-300">
                      {formatLargeNumber(asset.volume)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-gray-600 dark:text-gray-300">
                      {formatLargeNumber(asset.marketCap)}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {assets.length === 0 && (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          No assets found
        </div>
      )}
    </div>
  )
}

export default AssetsTable


