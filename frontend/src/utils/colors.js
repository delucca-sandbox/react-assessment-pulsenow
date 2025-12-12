/**
 * Get the appropriate text color class for a change value
 * @param {number} value - The change value (positive or negative)
 * @returns {string} Tailwind text color class
 */
export const getChangeColor = (value) => {
  if (value > 0) return 'text-green-600 dark:text-green-400'
  if (value < 0) return 'text-red-600 dark:text-red-400'
  return 'text-gray-600 dark:text-gray-400'
}

/**
 * Get the appropriate icon for a change value
 * @param {number} value - The change value (positive or negative)
 * @returns {string} Arrow icon character
 */
export const getChangeIcon = (value) => {
  if (value > 0) return '↑'
  if (value < 0) return '↓'
  return '→'
}

/**
 * Get Tailwind classes for severity-based styling
 * @param {string} severity - Severity level (critical, high, medium, low)
 * @returns {string} Tailwind classes for background, text, and border
 */
export const getSeverityClasses = (severity) => {
  const classes = {
    critical: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    high: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
    low: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
  }
  return classes[severity] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
}

/**
 * Get Tailwind classes for impact-based styling
 * @param {string} impact - Impact level (critical, high, medium, low)
 * @returns {string} Tailwind classes for styling
 */
export const getImpactClasses = (impact) => {
  const classes = {
    critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
  }
  return classes[impact] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
}

/**
 * Get Tailwind classes for category-based styling
 * @param {string} category - News category
 * @returns {string} Tailwind classes for styling
 */
export const getCategoryClasses = (category) => {
  const classes = {
    macro: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    technology: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
    crypto: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    earnings: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    regulatory: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    market: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
  }
  return classes[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
}


