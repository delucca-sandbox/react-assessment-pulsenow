/**
 * LoadingSkeleton - Animated placeholder component for loading states
 * @param {string} className - Additional Tailwind classes for dimensions
 * @param {string} variant - Shape variant: 'rectangle' | 'circle' | 'text'
 * @param {boolean} aria-hidden - Whether to hide from screen readers (default: true)
 * @param {string} role - ARIA role override (use only at container level)
 */
const LoadingSkeleton = ({ 
  className = '', 
  variant = 'rectangle',
  'aria-hidden': ariaHidden = true,
  role
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700'
  
  const variantClasses = {
    rectangle: 'rounded',
    circle: 'rounded-full',
    text: 'rounded h-4'
  }

  // Validate variant to prevent invalid classes
  const resolvedVariant = variantClasses[variant] ? variant : 'rectangle'

  return (
    <div 
      className={`${baseClasses} ${variantClasses[resolvedVariant]} ${className}`}
      aria-hidden={ariaHidden}
      role={role}
    />
  )
}

/**
 * SkeletonCard - Pre-built card skeleton for consistent loading states
 */
export const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ${className}`}>
    <LoadingSkeleton className="h-6 w-1/3 mb-4" />
    <LoadingSkeleton className="h-4 w-full mb-2" />
    <LoadingSkeleton className="h-4 w-2/3 mb-2" />
    <LoadingSkeleton className="h-4 w-1/2" />
  </div>
)

/**
 * SkeletonTable - Pre-built table skeleton
 */
export const SkeletonTable = ({ rows = 5, cols = 4 }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
    <div className="border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <LoadingSkeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
    </div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div 
        key={rowIndex} 
        className="border-b border-gray-100 dark:border-gray-700 p-4 last:border-b-0"
      >
        <div className="flex gap-4">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <LoadingSkeleton key={colIndex} className="h-4 flex-1" />
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default LoadingSkeleton


