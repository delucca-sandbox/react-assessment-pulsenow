/**
 * AssetsFilter - Filter controls for assets (type dropdown, search input, clear button)
 * @param {string} typeFilter - Current type filter ('all', 'stocks', 'crypto')
 * @param {string} searchQuery - Current search query
 * @param {Function} onTypeChange - Callback when type filter changes
 * @param {Function} onSearchChange - Callback when search query changes
 * @param {Function} onClear - Callback to clear all filters
 */
const AssetsFilter = ({ 
  typeFilter = 'all', 
  searchQuery = '', 
  onTypeChange, 
  onSearchChange, 
  onClear 
}) => {
  const hasFilters = typeFilter !== 'all' || searchQuery.length > 0

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Type Filter Dropdown */}
      <div className="relative">
        <select
          value={typeFilter}
          onChange={(e) => onTypeChange?.(e.target.value)}
          className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pulse-primary focus:border-transparent cursor-pointer min-w-[140px]"
          aria-label="Filter by asset type"
        >
          <option value="all">All Assets</option>
          <option value="stocks">Stocks</option>
          <option value="crypto">Crypto</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search by name or symbol..."
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pulse-primary focus:border-transparent"
          aria-label="Search assets"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange?.('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Clear All Button */}
      {hasFilters && (
        <button
          onClick={onClear}
          className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pulse-primary whitespace-nowrap"
          aria-label="Clear all filters"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}

export default AssetsFilter




