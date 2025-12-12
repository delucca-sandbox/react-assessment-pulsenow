import { useState } from 'react'
import { getSeverityClasses } from '../utils/colors'
import AlertItem from './AlertItem'

// Severity config with icons and order
const SEVERITY_CONFIG = {
  critical: { icon: '🔴', label: 'Critical', order: 0 },
  high: { icon: '🟠', label: 'High', order: 1 },
  medium: { icon: '🟡', label: 'Medium', order: 2 },
  low: { icon: '🔵', label: 'Low', order: 3 },
}

/**
 * AlertSection - Collapsible section for alerts of a specific severity
 * @param {string} severity - Severity level (critical, high, medium, low)
 * @param {Array} alerts - Array of alert objects
 * @param {boolean} defaultExpanded - Whether section starts expanded (default: true for critical/high)
 */
const AlertSection = ({ severity, alerts = [], defaultExpanded }) => {
  const config = SEVERITY_CONFIG[severity] || { icon: '⚪', label: severity, order: 99 }
  const isDefaultExpanded = defaultExpanded ?? (severity === 'critical' || severity === 'high')
  const [isExpanded, setIsExpanded] = useState(isDefaultExpanded)

  const severityClasses = getSeverityClasses(severity)
  
  // Extract specific class types for more maintainable composition
  const allClasses = severityClasses.split(' ')
  const borderClasses = allClasses.filter(c => c.startsWith('border-')).join(' ')
  const textClasses = allClasses.filter(c => c.startsWith('text-') && !c.includes('dark:')).join(' ')

  const handleToggle = () => {
    setIsExpanded(prev => !prev)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleToggle()
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Section Header */}
      <button
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pulse-primary ${borderClasses}`}
        aria-expanded={isExpanded}
        aria-controls={`alerts-${severity}`}
      >
        <div className="flex items-center gap-3">
          {/* Expand/Collapse Icon */}
          <svg 
            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>

          {/* Severity Icon */}
          <span className="text-lg" role="img" aria-hidden="true">
            {config.icon}
          </span>

          {/* Severity Label */}
          <span className={`font-semibold text-lg ${textClasses}`}>
            {config.label}
          </span>
        </div>

        {/* Count Badge */}
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${severityClasses}`}>
          {alerts.length}
        </span>
      </button>

      {/* Section Content */}
      <div
        id={`alerts-${severity}`}
        className={`transition-all duration-200 ease-in-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        role="region"
        aria-labelledby={`alerts-${severity}-header`}
      >
        {alerts.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
            No {config.label.toLowerCase()} alerts
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700 border-t border-gray-100 dark:border-gray-700">
            {alerts.map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AlertSection


