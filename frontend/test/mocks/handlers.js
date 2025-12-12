/**
 * MSW (Mock Service Worker) handlers for API mocking
 * Provides consistent mock data for tests
 */
import { http, HttpResponse } from 'msw'

// Mock data fixtures
export const mockPortfolio = {
  totalValue: 125000.50,
  totalChange: 2500.25,
  totalChangePercent: 2.04,
  assets: [
    {
      assetId: 'AAPL',
      name: 'Apple Inc.',
      quantity: 50,
      avgCost: 150.00,
      currentPrice: 175.50,
      value: 8775.00,
      changePercent: 5.25,
      changeAmount: 437.50,
      type: 'stock'
    },
    {
      assetId: 'BTC',
      name: 'Bitcoin',
      quantity: 0.5,
      avgCost: 40000,
      currentPrice: 45000,
      value: 22500,
      changePercent: 12.5,
      changeAmount: 2500,
      type: 'crypto'
    },
    {
      assetId: 'GOOGL',
      name: 'Alphabet Inc.',
      quantity: 25,
      avgCost: 130.00,
      currentPrice: 142.00,
      value: 3550.00,
      changePercent: 9.23,
      changeAmount: 300.00,
      type: 'stock'
    }
  ]
}

export const mockStocks = [
  {
    id: 'stock-1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 175.50,
    changePercent: 2.35,
    changeAmount: 4.02,
    volume: 52000000,
    marketCap: 2800000000000,
    sector: 'Technology'
  },
  {
    id: 'stock-2',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    currentPrice: 142.00,
    changePercent: -1.25,
    changeAmount: -1.80,
    volume: 28000000,
    marketCap: 1800000000000,
    sector: 'Technology'
  },
  {
    id: 'stock-3',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    currentPrice: 378.50,
    changePercent: 0.85,
    changeAmount: 3.20,
    volume: 22000000,
    marketCap: 2800000000000,
    sector: 'Technology'
  }
]

export const mockCrypto = [
  {
    id: 'crypto-1',
    symbol: 'BTC',
    name: 'Bitcoin',
    currentPrice: 45000.00,
    changePercent: 3.50,
    changeAmount: 1525.00,
    volume: 25000000000,
    marketCap: 880000000000
  },
  {
    id: 'crypto-2',
    symbol: 'ETH',
    name: 'Ethereum',
    currentPrice: 2500.00,
    changePercent: -2.10,
    changeAmount: -53.57,
    volume: 15000000000,
    marketCap: 300000000000
  }
]

export const mockNews = [
  {
    id: 'news-1',
    title: 'Apple Announces New Product Line',
    source: 'TechNews',
    timestamp: new Date().toISOString(),
    category: 'technology',
    impact: 'high',
    affectedAssets: ['AAPL']
  },
  {
    id: 'news-2',
    title: 'Bitcoin Reaches New Monthly High',
    source: 'CryptoDaily',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    category: 'crypto',
    impact: 'medium',
    affectedAssets: ['BTC', 'ETH']
  },
  {
    id: 'news-3',
    title: 'Federal Reserve Holds Interest Rates',
    source: 'MarketWatch',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    category: 'macro',
    impact: 'high',
    affectedAssets: []
  }
]

export const mockAlerts = [
  {
    id: 'alert-1',
    title: 'Price Alert',
    message: 'AAPL has risen above $175',
    severity: 'high',
    timestamp: new Date().toISOString(),
    actionRequired: true,
    affectedAssets: ['AAPL']
  },
  {
    id: 'alert-2',
    title: 'Portfolio Alert',
    message: 'Your portfolio is up 5% this week',
    severity: 'low',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    actionRequired: false,
    affectedAssets: []
  },
  {
    id: 'alert-3',
    title: 'Critical Market Alert',
    message: 'Significant market volatility detected',
    severity: 'critical',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    actionRequired: true,
    affectedAssets: ['BTC', 'ETH']
  }
]

export const mockDashboard = {
  portfolio: mockPortfolio,
  topGainers: [
    { symbol: 'BTC', name: 'Bitcoin', currentPrice: 45000, changePercent: 3.50 },
    { symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 175.50, changePercent: 2.35 },
    { symbol: 'MSFT', name: 'Microsoft', currentPrice: 378.50, changePercent: 0.85 }
  ],
  topLosers: [
    { symbol: 'ETH', name: 'Ethereum', currentPrice: 2500, changePercent: -2.10 },
    { symbol: 'GOOGL', name: 'Alphabet', currentPrice: 142, changePercent: -1.25 }
  ],
  recentNews: mockNews.slice(0, 5),
  activeAlerts: mockAlerts
}

export const mockStockDetail = {
  ...mockStocks[0],
  priceHistory: [
    { timestamp: new Date(Date.now() - 86400000 * 7).toISOString(), price: 170.00 },
    { timestamp: new Date(Date.now() - 86400000 * 6).toISOString(), price: 171.50 },
    { timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), price: 172.00 },
    { timestamp: new Date(Date.now() - 86400000 * 4).toISOString(), price: 173.25 },
    { timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), price: 174.00 },
    { timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), price: 174.50 },
    { timestamp: new Date(Date.now() - 86400000).toISOString(), price: 175.50 }
  ],
  keyMetrics: {
    peRatio: 28.5,
    dividendYield: 0.5
  },
  sentiment: {
    bullish: 0.65,
    bearish: 0.20,
    neutral: 0.15
  }
}

// MSW handlers
export const handlers = [
  // Dashboard
  http.get('/api/dashboard', () => {
    return HttpResponse.json({ data: mockDashboard })
  }),

  // Portfolio
  http.get('/api/portfolio', () => {
    return HttpResponse.json({ data: mockPortfolio })
  }),

  // Stocks
  http.get('/api/stocks', () => {
    return HttpResponse.json({ data: mockStocks })
  }),

  http.get('/api/stocks/:symbol', ({ params }) => {
    const stock = mockStocks.find(s => s.symbol === params.symbol)
    if (stock) {
      return HttpResponse.json({ data: { ...mockStockDetail, ...stock } })
    }
    return new HttpResponse(null, { status: 404 })
  }),

  // Crypto
  http.get('/api/crypto', () => {
    return HttpResponse.json({ data: mockCrypto })
  }),

  http.get('/api/crypto/:symbol', ({ params }) => {
    const crypto = mockCrypto.find(c => c.symbol === params.symbol)
    if (crypto) {
      // Create crypto detail with price history (matching stock detail structure)
      const cryptoDetail = {
        ...crypto,
        priceHistory: [
          { timestamp: new Date(Date.now() - 86400000 * 7).toISOString(), price: crypto.currentPrice * 0.95 },
          { timestamp: new Date(Date.now() - 86400000 * 6).toISOString(), price: crypto.currentPrice * 0.96 },
          { timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), price: crypto.currentPrice * 0.97 },
          { timestamp: new Date(Date.now() - 86400000 * 4).toISOString(), price: crypto.currentPrice * 0.98 },
          { timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), price: crypto.currentPrice * 0.99 },
          { timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), price: crypto.currentPrice * 0.995 },
          { timestamp: new Date(Date.now() - 86400000).toISOString(), price: crypto.currentPrice }
        ],
        keyMetrics: {
          circulatingSupply: 19000000,
          maxSupply: 21000000,
          marketDominance: 45.5
        }
      }
      return HttpResponse.json({ data: cryptoDetail })
    }
    return new HttpResponse(null, { status: 404 })
  }),

  // News
  http.get('/api/news', () => {
    return HttpResponse.json({ data: mockNews })
  }),

  // Alerts
  http.get('/api/alerts', () => {
    return HttpResponse.json({ data: mockAlerts })
  })
]

// Error handlers for testing error states
export const errorHandlers = [
  http.get('/api/dashboard', () => {
    return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' })
  }),
  http.get('/api/stocks', () => {
    return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' })
  }),
  http.get('/api/crypto', () => {
    return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' })
  }),
  http.get('/api/news', () => {
    return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' })
  }),
  http.get('/api/alerts', () => {
    return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' })
  }),
  http.get('/api/portfolio', () => {
    return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' })
  })
]

// Empty data handlers for testing empty states
export const emptyHandlers = [
  http.get('/api/dashboard', () => {
    return HttpResponse.json({ 
      data: { 
        portfolio: null, 
        topGainers: [], 
        topLosers: [], 
        recentNews: [], 
        activeAlerts: [] 
      } 
    })
  }),
  http.get('/api/stocks', () => {
    return HttpResponse.json({ data: [] })
  }),
  http.get('/api/crypto', () => {
    return HttpResponse.json({ data: [] })
  }),
  http.get('/api/news', () => {
    return HttpResponse.json({ data: [] })
  }),
  http.get('/api/alerts', () => {
    return HttpResponse.json({ data: [] })
  }),
  http.get('/api/portfolio', () => {
    return HttpResponse.json({ data: { assets: [] } })
  })
]

