import LoadingSkeleton, { SkeletonCard } from './LoadingSkeleton'

/**
 * DashboardSkeleton - Loading state skeleton for the Dashboard page
 */
const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Portfolio Summary Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <LoadingSkeleton className="h-6 w-40 mb-4" />
        <LoadingSkeleton className="h-10 w-48 mb-2" />
        <LoadingSkeleton className="h-5 w-32" />
      </div>

      {/* Top Movers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Gainers Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <LoadingSkeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <LoadingSkeleton className="h-8 w-8" variant="circle" />
                  <div>
                    <LoadingSkeleton className="h-4 w-16 mb-1" />
                    <LoadingSkeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="text-right">
                  <LoadingSkeleton className="h-4 w-20 mb-1" />
                  <LoadingSkeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <LoadingSkeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <LoadingSkeleton className="h-8 w-8" variant="circle" />
                  <div>
                    <LoadingSkeleton className="h-4 w-16 mb-1" />
                    <LoadingSkeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="text-right">
                  <LoadingSkeleton className="h-4 w-20 mb-1" />
                  <LoadingSkeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News and Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent News Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <LoadingSkeleton className="h-6 w-32 mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0">
                <LoadingSkeleton className="h-4 w-full mb-2" />
                <div className="flex gap-2">
                  <LoadingSkeleton className="h-5 w-16" />
                  <LoadingSkeleton className="h-5 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Alerts Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <LoadingSkeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <LoadingSkeleton className="h-6 w-16" />
                <div className="flex-1">
                  <LoadingSkeleton className="h-4 w-full mb-1" />
                  <LoadingSkeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSkeleton




