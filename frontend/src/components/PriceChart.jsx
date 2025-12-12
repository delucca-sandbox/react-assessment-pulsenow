import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { formatCurrency } from '../utils/formatters'

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-lg">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    )
  }
  return null
}

/**
 * PriceChart - Line chart for displaying price history
 * @param {Array} data - Array of price points with timestamp and price
 * @param {string} color - Line color (default: pulse-primary)
 * @param {number} height - Chart height in pixels (default: 300)
 */
const PriceChart = ({ data = [], color = '#6366f1', height = 300 }) => {
  if (!data || data.length === 0) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg"
        style={{ height }}
      >
        <p className="text-gray-500 dark:text-gray-400">No price data available</p>
      </div>
    )
  }

  // Format data for Recharts
  const chartData = data.map((point) => {
    const d = new Date(point.timestamp)
    const isValid = !Number.isNaN(d.getTime())
    return {
      ...point,
      timestampLabel: isValid
        ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : '—'
    }
  })

  return (
    <div style={{ height }} className="w-full" role="img" aria-label="Price history chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="currentColor" 
            className="text-gray-200 dark:text-gray-700"
          />
          <XAxis 
            dataKey="timestampLabel" 
            tick={{ fontSize: 12 }}
            stroke="currentColor"
            className="text-gray-500 dark:text-gray-400"
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            domain={['auto', 'auto']}
            tick={{ fontSize: 12 }}
            stroke="currentColor"
            className="text-gray-500 dark:text-gray-400"
            tickFormatter={(value) => formatCurrency(value).replace('.00', '')}
            tickLine={false}
            axisLine={false}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 2, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PriceChart


