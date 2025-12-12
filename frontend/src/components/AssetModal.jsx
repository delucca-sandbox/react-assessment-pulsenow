import { useEffect, useRef } from 'react'
import { formatCurrency, formatPercent, formatLargeNumber } from '../utils/formatters'
import { getChangeColor, getChangeIcon } from '../utils/colors'
import PriceChart from './PriceChart'

/**
 * AssetModal - Modal displaying detailed asset information with price chart
 * @param {Object} asset - Asset data object
 * @param {boolean} isOpen - Whether modal is open
 * @param {Function} onClose - Callback to close modal
 */
const AssetModal = ({ asset, isOpen, onClose }) => {
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Focus trap - focus close button when modal opens
      closeButtonRef.current?.focus()
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Handle click outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen || !asset) return null

  const changeColor = getChangeColor(asset.changePercent)
  const changeIcon = getChangeIcon(asset.changePercent)

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        role="document"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 
              id="modal-title" 
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              {asset.symbol}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{asset.name}</p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pulse-primary"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Price Section */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Price</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(asset.currentPrice)}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-xl font-semibold ${changeColor} flex items-center gap-1`}>
                <span aria-hidden="true">{changeIcon}</span>
                <span>{formatPercent(asset.changePercent)}</span>
              </p>
              <p className={`text-sm ${changeColor}`}>
                {asset.changeAmount >= 0 ? '+' : ''}{formatCurrency(asset.changeAmount)}
              </p>
            </div>
          </div>

          {/* Price Chart */}
          {asset.priceHistory && asset.priceHistory.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Price History
              </h3>
              <PriceChart 
                data={asset.priceHistory} 
                color={asset.changePercent >= 0 ? '#22c55e' : '#ef4444'}
                height={250}
              />
            </div>
          )}

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatLargeNumber(asset.marketCap)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Volume (24h)</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatLargeNumber(asset.volume)}
              </p>
            </div>
            {asset.sector && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Sector</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {asset.sector}
                </p>
              </div>
            )}
            {asset.keyMetrics?.peRatio && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">P/E Ratio</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {asset.keyMetrics.peRatio.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          {/* Sentiment (if available) */}
          {asset.sentiment && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Sentiment Analysis
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(asset.sentiment).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-gray-200 dark:text-gray-700"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray={`${value * 175.93} 175.93`}
                          className="text-pulse-primary"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-900 dark:text-white">
                        {Math.round(value * 100)}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AssetModal




