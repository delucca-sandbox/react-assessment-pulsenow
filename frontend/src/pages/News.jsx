import { useState, useCallback, useMemo } from 'react'
import { getNews } from '../services/api'
import { useDataFetch } from '../hooks/useDataFetch'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import NewsCard from '../components/NewsCard'
import NewsCategoryFilter from '../components/NewsCategoryFilter'
import LastUpdated from '../components/LastUpdated'

// Auto-refresh interval: 30 seconds
const REFRESH_INTERVAL = 30000

// Loading skeleton for news grid
const LoadingGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 9 }).map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex gap-2 mb-3">
          <LoadingSkeleton className="h-6 w-20" />
          <LoadingSkeleton className="h-6 w-24" />
        </div>
        <LoadingSkeleton className="h-6 w-full mb-2" />
        <LoadingSkeleton className="h-6 w-3/4 mb-4" />
        <LoadingSkeleton className="h-4 w-full mb-2" />
        <LoadingSkeleton className="h-4 w-full mb-2" />
        <LoadingSkeleton className="h-4 w-2/3 mb-4" />
        <div className="flex gap-2 mb-4">
          <LoadingSkeleton className="h-5 w-12" />
          <LoadingSkeleton className="h-5 w-12" />
          <LoadingSkeleton className="h-5 w-12" />
        </div>
        <div className="flex justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <LoadingSkeleton className="h-4 w-24" />
          <LoadingSkeleton className="h-4 w-20" />
        </div>
      </div>
    ))}
  </div>
)

/**
 * News - Page for browsing market news with category filtering
 */
const News = () => {
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Fetch news
  const fetchNews = useCallback(() => getNews(), [])
  const { data: newsData, loading, error, refetch, lastUpdated } = useDataFetch(
    fetchNews, 
    [], 
    { refreshInterval: REFRESH_INTERVAL }
  )

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    if (!newsData) return {}
    
    const counts = { all: newsData.length }
    newsData.forEach(item => {
      const category = item.category || 'uncategorized'
      counts[category] = (counts[category] || 0) + 1
    })
    return counts
  }, [newsData])

  // Filter news by category
  const filteredNews = useMemo(() => {
    if (!newsData) return []
    if (categoryFilter === 'all') return newsData
    return newsData.filter(item => item.category === categoryFilter)
  }, [newsData, categoryFilter])

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">News</h1>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <LoadingSkeleton key={i} className="h-10 w-24" />
          ))}
        </div>
        <LoadingGrid />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">News</h1>
        <ErrorMessage 
          message={error} 
          onRetry={refetch}
          title="Failed to load news"
        />
      </div>
    )
  }

  // Empty state
  if (!newsData || newsData.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">News</h1>
        <EmptyState 
          title="No news available"
          description="There are no news articles to display at the moment."
          icon="📰"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">News</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredNews.length} {filteredNews.length === 1 ? 'article' : 'articles'}
          </span>
          <LastUpdated timestamp={lastUpdated} />
        </div>
      </div>

      {/* Category Filter */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">Filter by category</h2>
        <NewsCategoryFilter
          selected={categoryFilter}
          onChange={setCategoryFilter}
          counts={categoryCounts}
        />
      </section>

      {/* News Grid */}
      {filteredNews.length === 0 ? (
        <EmptyState
          title="No news in this category"
          description={`There are no news articles in the "${categoryFilter}" category.`}
          icon="📭"
          action={
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className="px-4 py-2 bg-pulse-primary text-white rounded-lg hover:bg-pulse-secondary transition-colors"
            >
              View All News
            </button>
          }
        />
      ) : (
        <section aria-labelledby="news-heading">
          <h2 id="news-heading" className="sr-only">News Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default News
