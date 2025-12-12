# Data Model: Pulse Frontend Pages

**Feature**: 001-pulse-frontend-pages | **Date**: 2025-12-11

## Overview

This document defines the data entities used in the Pulse frontend, derived from the backend mock data structure and spec requirements. All types are defined from the frontend's perspective (what the API returns).

---

## Core Entities

### 1. Asset (Stock or Cryptocurrency)

Represents a tradeable market instrument.

```typescript
interface Asset {
  id: string              // Unique identifier (same as symbol)
  symbol: string          // Trading symbol (e.g., "AAPL", "BTC")
  name: string            // Full name (e.g., "Apple Inc.", "Bitcoin")
  currentPrice: number    // Current market price in USD
  changePercent: number   // 24h price change percentage
  changeAmount: number    // 24h price change in USD
  volume: number          // 24h trading volume
  marketCap: number       // Market capitalization in USD
  
  // Stock-specific (optional)
  sector?: string         // Industry sector (e.g., "Technology")
  
  // Extended data (available in detail view)
  priceHistory?: PricePoint[]
  alerts?: Alert[]
  sentiment?: SentimentData
  keyMetrics?: KeyMetrics
}
```

**Validation Rules**:
- `symbol`: Required, uppercase alphanumeric, 1-5 characters
- `currentPrice`: Required, non-negative number
- `changePercent`: Required, number (can be negative)
- `volume`: Required, non-negative integer

**State Transitions**: N/A (read-only data)

---

### 2. PricePoint (Price History)

Represents a single price data point for charts.

```typescript
interface PricePoint {
  timestamp: string      // ISO 8601 timestamp
  price: number          // Price at timestamp
  volume: number         // Volume at timestamp
}
```

**Validation Rules**:
- `timestamp`: Required, valid ISO 8601 date string
- `price`: Required, positive number

---

### 3. Portfolio

Represents user's total investment position.

```typescript
interface Portfolio {
  userId: string              // User identifier
  totalValue: number          // Total portfolio value in USD
  totalChange: number         // Total change amount in USD
  totalChangePercent: number  // Total change percentage
  assets: Holding[]           // Individual holdings
  watchlist: string[]         // Watched asset symbols
}
```

**Validation Rules**:
- `totalValue`: Required, non-negative number
- `assets`: Required, array (can be empty)

---

### 4. Holding

Individual asset position within portfolio.

```typescript
interface Holding {
  assetId: string           // Asset symbol
  quantity: number          // Number of units owned
  avgBuyPrice: number       // Average purchase price per unit
  currentPrice: number      // Current market price per unit
  value: number             // Current total value (quantity × currentPrice)
  change: number            // Profit/loss amount
  changePercent: number     // Profit/loss percentage
}
```

**Derived Values**:
- `value` = `quantity` × `currentPrice`
- `change` = `value` - (`quantity` × `avgBuyPrice`)
- `changePercent` = (`change` / (`quantity` × `avgBuyPrice`)) × 100

**Validation Rules**:
- `quantity`: Required, positive number
- `avgBuyPrice`: Required, positive number

---

### 5. NewsItem

Market news article.

```typescript
interface NewsItem {
  id: string                // Unique identifier
  title: string             // Headline
  source: string            // Publisher name
  category: NewsCategory    // Classification
  timestamp: string         // ISO 8601 publication time
  impact: ImpactLevel       // Market impact level
  affectedAssets: string[]  // Related asset symbols
  summary: string           // Article summary
  sentiment: number         // Sentiment score (0-1)
  tags: string[]            // Search tags
}

type NewsCategory = 'macro' | 'technology' | 'crypto' | 'earnings' | 'regulatory' | 'market'
type ImpactLevel = 'critical' | 'high' | 'medium' | 'low'
```

**Validation Rules**:
- `title`: Required, non-empty string
- `category`: Required, one of defined categories
- `impact`: Required, one of defined levels

---

### 6. Alert

Market notification with severity level.

```typescript
interface Alert {
  id: string                  // Unique identifier
  type: string                // Alert type classification
  severity: SeverityLevel     // Severity level
  title?: string              // Alert title (global alerts)
  message: string             // Alert description
  timestamp: string           // ISO 8601 creation time
  affectedAssets?: string[]   // Related asset symbols
  actionRequired?: boolean    // Whether user action needed
  impact?: string             // Impact direction (positive/negative/neutral)
}

type SeverityLevel = 'critical' | 'high' | 'medium' | 'low'
```

**Validation Rules**:
- `severity`: Required, one of: critical, high, medium, low
- `message`: Required, non-empty string

**UI Mapping**:
| Severity | Background | Text | Border |
|----------|------------|------|--------|
| critical | red-100 | red-800 | red-200 |
| high | orange-100 | orange-800 | orange-200 |
| medium | yellow-100 | yellow-800 | yellow-200 |
| low | blue-100 | blue-800 | blue-200 |

---

### 7. TopMover

Asset highlighted as significant gainer or loser.

```typescript
interface TopMover {
  id: string
  symbol: string
  name: string
  currentPrice: number
  changePercent: number
  changeAmount: number
  // Subset of Asset fields
}
```

---

### 8. DashboardData

Aggregated data for dashboard view.

```typescript
interface DashboardData {
  portfolio: Portfolio
  recentNews: NewsItem[]      // 5 most recent
  activeAlerts: Alert[]       // 10 most recent
  topGainers: TopMover[]      // 5 best performers
  topLosers: TopMover[]       // 5 worst performers
  aiInsights: AiInsight[]     // 5 most recent
  upcomingEvents: MarketEvent[]
}
```

---

## Supporting Types

### SentimentData

```typescript
interface SentimentData {
  overall: number     // 0-1 scale
  technical: number   // Technical analysis sentiment
  fundamental: number // Fundamental analysis sentiment
  social: number      // Social media sentiment
}
```

### KeyMetrics (Stocks)

```typescript
interface StockMetrics {
  peRatio: number
  eps: number
  dividendYield: number
  beta: number
}
```

### KeyMetrics (Crypto)

```typescript
interface CryptoMetrics {
  circulatingSupply: number
  maxSupply: number | null
  marketDominance: number
  hashRate?: number           // BTC
  gasPrice?: number           // ETH
  transactionsPerSecond?: number // SOL
}
```

### AiInsight

```typescript
interface AiInsight {
  id: string
  type: 'pattern_recognition' | 'anomaly_detection' | 'sentiment_analysis'
  asset: string
  confidence: number
  title: string
  description: string
  timestamp: string
  actionable: boolean
}
```

### MarketEvent

```typescript
interface MarketEvent {
  id: string
  type: string
  asset: string
  scheduledTime: string
  importance: 'critical' | 'high' | 'medium' | 'low'
  expectedImpact: string
  description: string
}
```

---

## Entity Relationships

```
Portfolio
    └── assets: Holding[]
           └── assetId → Asset.symbol

DashboardData
    ├── portfolio → Portfolio
    ├── recentNews → NewsItem[]
    ├── activeAlerts → Alert[]
    ├── topGainers → Asset[] (subset)
    └── topLosers → Asset[] (subset)

Asset
    ├── priceHistory → PricePoint[]
    └── alerts → Alert[]

NewsItem
    └── affectedAssets → Asset.symbol[]

Alert
    └── affectedAssets → Asset.symbol[]
```

---

## Frontend State Structure

```typescript
// Page-level state (each page manages its own)
interface PageState<T> {
  data: T | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

// Global UI state (Context)
interface UIState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
}

// Assets page specific state
interface AssetsPageState extends PageState<Asset[]> {
  filter: 'all' | 'stocks' | 'crypto'
  sortBy: 'price' | 'changePercent' | 'volume' | 'name'
  sortOrder: 'asc' | 'desc'
  searchQuery: string
  selectedAsset: Asset | null
  modalOpen: boolean
}

// News page specific state
interface NewsPageState extends PageState<NewsItem[]> {
  categoryFilter: NewsCategory | 'all'
}

// Alerts page specific state
interface AlertsPageState extends PageState<Alert[]> {
  collapsedSections: Record<SeverityLevel, boolean>
}
```

---

## Data Flow

1. **Initial Load**: Page mounts → fetch data → show skeleton → update state
2. **Auto-Refresh**: Timer ticks → fetch data → update state silently
3. **User Action**: Filter/sort/search → update local state → re-render
4. **Modal Open**: Click asset → set selectedAsset → fetch detail (if needed) → show modal
5. **Theme Toggle**: Click toggle → update context → persist to localStorage → apply class


