/**
 * EmptyState - Display when no data is available
 * @param {string} title - Main message
 * @param {string} description - Secondary description
 * @param {string} icon - Emoji or icon to display
 * @param {React.ReactNode} action - Optional action button/link
 */
const EmptyState = ({ 
  title = 'No data available', 
  description = 'There is nothing to display at the moment.',
  icon = '📭',
  action = null 
}) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700"
      role="status"
      aria-label={title}
    >
      <div className="flex flex-col items-center">
        <span className="text-5xl mb-4" role="img" aria-hidden="true">
          {icon}
        </span>
        
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-4">
          {description}
        </p>
        
        {action && (
          <div className="mt-2">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}

export default EmptyState


