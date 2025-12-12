import { getCategoryClasses } from '../utils/colors'

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'macro', label: 'Macro' },
  { value: 'technology', label: 'Technology' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'earnings', label: 'Earnings' },
  { value: 'regulatory', label: 'Regulatory' },
  { value: 'market', label: 'Market' },
]

/**
 * NewsCategoryFilter - Category filter buttons for news
 * @param {string} selected - Currently selected category
 * @param {Function} onChange - Callback when category changes
 * @param {Object} counts - Optional object with count per category
 */
const NewsCategoryFilter = ({ selected = 'all', onChange, counts = {} }) => {
  return (
    <div 
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter news by category"
    >
      {CATEGORIES.map((category) => {
        const isSelected = selected === category.value
        const count = counts[category.value]
        
        // Get category-specific colors for selected state
        const selectedClasses = category.value === 'all' 
          ? 'bg-pulse-primary text-white'
          : getCategoryClasses(category.value)
        
        return (
          <button
            key={category.value}
            onClick={() => onChange?.(category.value)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-pulse-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900
              ${isSelected 
                ? selectedClasses
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
            aria-pressed={isSelected}
            aria-label={`${category.label}${count !== undefined ? ` (${count} items)` : ''}`}
          >
            {category.label}
            {count !== undefined && (
              <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                isSelected 
                  ? 'bg-white/20' 
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}>
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default NewsCategoryFilter


