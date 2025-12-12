/**
 * Format a number as USD currency
 * @param {number} value - The value to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value) => {
  if (value == null || isNaN(value)) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

/**
 * Format a percentage with sign
 * @param {number} value - The percentage value
 * @returns {string} Formatted percentage string with + or - sign
 */
export const formatPercent = (value) => {
  if (value == null || isNaN(value)) return '0.00%'
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

/**
 * Format large numbers with compact notation (K, M, B, T)
 * @param {number} value - The value to format
 * @returns {string} Formatted compact number
 */
export const formatLargeNumber = (value) => {
  if (value == null || isNaN(value)) return '0'
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value)
}

/**
 * Format a timestamp as relative time (e.g., "2 hours ago")
 * @param {string|Date} timestamp - ISO 8601 timestamp or Date object
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return ''
  
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const now = new Date()
  const date = new Date(timestamp)
  const diffInSeconds = Math.floor((date - now) / 1000)
  
  const absSeconds = Math.abs(diffInSeconds)
  
  if (absSeconds < 60) {
    return rtf.format(diffInSeconds, 'second')
  }
  if (absSeconds < 3600) {
    return rtf.format(Math.round(diffInSeconds / 60), 'minute')
  }
  if (absSeconds < 86400) {
    return rtf.format(Math.round(diffInSeconds / 3600), 'hour')
  }
  if (absSeconds < 2592000) {
    return rtf.format(Math.round(diffInSeconds / 86400), 'day')
  }
  return rtf.format(Math.round(diffInSeconds / 2592000), 'month')
}

/**
 * Format a date as a readable string
 * @param {string|Date} timestamp - ISO 8601 timestamp or Date object
 * @returns {string} Formatted date string
 */
export const formatDate = (timestamp) => {
  if (!timestamp) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(timestamp))
}




