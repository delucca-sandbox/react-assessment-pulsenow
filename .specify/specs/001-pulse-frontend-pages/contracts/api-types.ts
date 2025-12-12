/**
 * API Type Definitions for Pulse Frontend
 * 
 * These TypeScript interfaces define the shape of data returned by the backend API.
 * Use for documentation reference - the frontend uses JavaScript (not TypeScript).
 * 
 * Source: Backend mock data analysis
 */

// ============================================================================
// Base Response Types
// ============================================================================

/** Standard API response wrapper */
export interface ApiResponse<T> {
  success: boolean
  data: T
  count?: number
  pagination?: PaginationInfo
}

/** Pagination metadata */
export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

// ============================================================================
// Asset Types
// ============================================================================

/** Base asset interface (common to stocks and crypto) */
export interface Asset {
  id: string
  symbol: string
  name: string
  currentPrice: number
  changePercent: number
  changeAmount: number
  volume: number
  marketCap: number
  priceHistory: PricePoint[]
  alerts: AssetAlert[]
  sentiment: SentimentData
}

/** Stock-specific asset */
export interface Stock extends Asset {
  sector: string
  keyMetrics: StockMetrics
}

/** Cryptocurrency-specific asset */
export interface Cryptocurrency extends Asset {
  keyMetrics: CryptoMetrics
}

/** Price history data point */
export interface PricePoint {
  timestamp: string  // ISO 8601
  price: number
  volume: number
}

/** Asset-level alert */
export interface AssetAlert {
  id: string
  type: string
  severity: SeverityLevel
  message: string
  timestamp: string  // ISO 8601
  impact: 'positive' | 'negative' | 'neutral'
}

/** Sentiment analysis scores */
export interface SentimentData {
  overall: number      // 0-1
  technical: number    // 0-1
  fundamental: number  // 0-1
  social: number       // 0-1
}

/** Stock-specific metrics */
export interface StockMetrics {
  peRatio: number
  eps: number
  dividendYield: number
  beta: number
}

/** Cryptocurrency-specific metrics */
export interface CryptoMetrics {
  circulatingSupply: number
  maxSupply: number | null
  marketDominance: number
  hashRate?: number
  gasPrice?: number
  transactionsPerSecond?: number
}

// ============================================================================
// Portfolio Types
// ============================================================================

/** Complete portfolio data */
export interface Portfolio {
  userId: string
  totalValue: number
  totalChange: number
  totalChangePercent: number
  assets: Holding[]
  watchlist: string[]
}

/** Individual portfolio holding */
export interface Holding {
  assetId: string
  quantity: number
  avgBuyPrice: number
  currentPrice: number
  value: number
  change: number
  changePercent: number
}

/** Portfolio performance (from /api/portfolio/performance) */
export interface PortfolioPerformance {
  totalValue: number
  totalChange: number
  totalChangePercent: number
  bestPerformer: Holding
  worstPerformer: Holding
  assetAllocation: AssetAllocation[]
}

/** Asset allocation for pie chart */
export interface AssetAllocation {
  assetId: string
  percentage: number
  value: number
}

// ============================================================================
// News Types
// ============================================================================

/** News article */
export interface NewsItem {
  id: string
  title: string
  source: string
  category: NewsCategory
  timestamp: string  // ISO 8601
  impact: ImpactLevel
  affectedAssets: string[]
  summary: string
  sentiment: number  // 0-1
  tags: string[]
}

/** News category classification */
export type NewsCategory = 
  | 'macro' 
  | 'technology' 
  | 'crypto' 
  | 'earnings' 
  | 'regulatory' 
  | 'market'

/** Impact level classification */
export type ImpactLevel = 'critical' | 'high' | 'medium' | 'low'

// ============================================================================
// Alert Types
// ============================================================================

/** Global market alert */
export interface Alert {
  id: string
  type: string
  severity: SeverityLevel
  title: string
  message: string
  timestamp: string  // ISO 8601
  affectedAssets: string[]
  actionRequired: boolean
  aiCoreAccuracy?: number
}

/** Severity level classification */
export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low'

// ============================================================================
// Dashboard Types
// ============================================================================

/** Aggregated dashboard data (from /api/dashboard) */
export interface DashboardData {
  portfolio: Portfolio
  recentNews: NewsItem[]
  activeAlerts: Alert[]
  topGainers: Asset[]
  topLosers: Asset[]
  aiInsights: AiInsight[]
  upcomingEvents: MarketEvent[]
}

/** AI-generated insight */
export interface AiInsight {
  id: string
  type: 'pattern_recognition' | 'anomaly_detection' | 'sentiment_analysis'
  asset: string
  confidence: number  // 0-1
  title: string
  description: string
  timestamp: string  // ISO 8601
  actionable: boolean
}

/** Upcoming market event */
export interface MarketEvent {
  id: string
  type: string
  asset: string
  scheduledTime: string  // ISO 8601
  importance: ImpactLevel
  expectedImpact: string
  description: string
  aiCorePrediction?: {
    confidence: number
    predictedMove: string
    magnitude: string
  }
}

// ============================================================================
// API Endpoint Contracts
// ============================================================================

/**
 * GET /api/dashboard
 * @returns ApiResponse<DashboardData>
 */
export type GetDashboardResponse = ApiResponse<DashboardData>

/**
 * GET /api/assets
 * @query type?: 'stock' | 'crypto'
 * @query search?: string
 * @query sort?: 'price' | 'changePercent' | 'volume'
 * @query order?: 'asc' | 'desc'
 * @query page?: number
 * @query limit?: number
 * @returns ApiResponse<Asset[]>
 */
export type GetAssetsResponse = ApiResponse<Asset[]>

/**
 * GET /api/assets/stocks
 * @returns ApiResponse<Stock[]>
 */
export type GetStocksResponse = ApiResponse<Stock[]>

/**
 * GET /api/assets/crypto
 * @returns ApiResponse<Cryptocurrency[]>
 */
export type GetCryptoResponse = ApiResponse<Cryptocurrency[]>

/**
 * GET /api/assets/:symbol/history
 * @param symbol - Asset symbol
 * @query startDate?: string (ISO 8601)
 * @query endDate?: string (ISO 8601)
 * @returns ApiResponse<PricePoint[]>
 */
export type GetPriceHistoryResponse = ApiResponse<PricePoint[]>

/**
 * GET /api/portfolio
 * @returns ApiResponse<Portfolio>
 */
export type GetPortfolioResponse = ApiResponse<Portfolio>

/**
 * GET /api/portfolio/performance
 * @returns ApiResponse<PortfolioPerformance>
 */
export type GetPortfolioPerformanceResponse = ApiResponse<PortfolioPerformance>

/**
 * GET /api/news
 * @query category?: NewsCategory
 * @query impact?: ImpactLevel
 * @query asset?: string
 * @query page?: number
 * @query limit?: number
 * @returns ApiResponse<NewsItem[]>
 */
export type GetNewsResponse = ApiResponse<NewsItem[]>

/**
 * GET /api/alerts
 * @query severity?: SeverityLevel
 * @query asset?: string
 * @query actionRequired?: boolean
 * @query page?: number
 * @query limit?: number
 * @returns ApiResponse<Alert[]>
 */
export type GetAlertsResponse = ApiResponse<Alert[]>

// ============================================================================
// UI State Types (Frontend-only)
// ============================================================================

/** Theme preference */
export type Theme = 'light' | 'dark'

/** Asset type filter */
export type AssetTypeFilter = 'all' | 'stocks' | 'crypto'

/** Sort field options for assets table */
export type AssetSortField = 'symbol' | 'name' | 'price' | 'changePercent' | 'volume'

/** Sort order */
export type SortOrder = 'asc' | 'desc'


