import { useState, useEffect } from 'react'
import { formatRelativeTime } from '../utils/formatters'

/**
 * LastUpdated - Displays the last update time and auto-updates the relative time
 * @param {Date|string} timestamp - Last update timestamp
 * @param {number} updateInterval - How often to update the display (ms, default: 10000)
 */
const LastUpdated = ({ timestamp, updateInterval = 10000 }) => {
  const [, setTick] = useState(0)

  // Force re-render periodically to update relative time
  useEffect(() => {
    if (!timestamp) return
    
    const interval = setInterval(() => {
      setTick(t => t + 1)
    }, updateInterval)
    
    return () => clearInterval(interval)
  }, [timestamp, updateInterval])

  if (!timestamp) return null

  const relativeTime = formatRelativeTime(timestamp)

  return (
    <div 
      className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
      aria-live="polite"
      aria-atomic="true"
    >
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span>
        Last updated {relativeTime}
      </span>
    </div>
  )
}

export default LastUpdated


