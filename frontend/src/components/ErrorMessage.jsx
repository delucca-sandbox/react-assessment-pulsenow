/**
 * ErrorMessage - Display error state with optional retry button
 * @param {string} message - Error message to display
 * @param {Function} onRetry - Callback function for retry button
 * @param {string} title - Optional title for the error
 */
const ErrorMessage = ({ message, onRetry, title = 'Something went wrong' }) => {
  return (
    <div 
      className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center"
      role="alert"
      aria-live="polite"
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center mb-4">
          <svg 
            className="w-6 h-6 text-red-600 dark:text-red-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
          {title}
        </h3>
        
        <p className="text-red-700 dark:text-red-400 mb-4 max-w-md">
          {message || 'An unexpected error occurred. Please try again.'}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Retry loading data"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage




