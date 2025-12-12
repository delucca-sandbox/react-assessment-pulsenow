import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { formatCurrency, formatPercent } from '../utils/formatters'

// Color palette for pie chart segments
const COLORS = [
  '#6366f1', // pulse-primary
  '#8b5cf6', // pulse-secondary
  '#22c55e', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#06b6d4', // cyan
  '#ec4899', // pink
  '#84cc16', // lime
  '#f97316', // orange
  '#14b8a6', // teal
]

/**
 * AllocationChart - Pie chart showing portfolio allocation
 * @param {Array} data - Array of allocation objects with assetId, percentage, value
 * @param {number} height - Chart height in pixels (default: 300)
 */
const AllocationChart = ({ data = [], height = 300 }) => {
  if (!data || data.length === 0) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg"
        style={{ height }}
      >
        <p className="text-gray-500 dark:text-gray-400">No allocation data available</p>
      </div>
    )
  }

  // Format data for Recharts
  const chartData = data.map((item, index) => ({
    name: item.assetId,
    value: item.percentage,
    amount: item.value,
    color: COLORS[index % COLORS.length]
  }))

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-white">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {data.value.toFixed(1)}% of portfolio
          </p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {formatCurrency(data.amount)}
          </p>
        </div>
      )
    }
    return null
  }

  // Custom legend
  const CustomLegend = ({ payload }) => {
    if (!payload || payload.length === 0) return null
    return (
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {entry.value} ({chartData[index]?.value.toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Accessible data table (screen reader only) */}
      <table className="sr-only" aria-label="Portfolio allocation breakdown">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Percentage</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.value.toFixed(1)}%</td>
              <td>{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllocationChart


