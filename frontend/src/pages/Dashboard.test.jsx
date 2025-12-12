/**
 * Integration tests for Dashboard page
 * Tests full page rendering with API mocking
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '../../test/test-utils'
import Dashboard from './Dashboard'

// Mock data
const mockDashboard = {
  portfolio: {
    totalValue: 125000.50,
    totalChange: 2500.25,
    totalChangePercent: 2.04
  },
  topGainers: [
    { symbol: 'BTC', name: 'Bitcoin', currentPrice: 45000, changePercent: 3.50 },
    { symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 175.50, changePercent: 2.35 }
  ],
  topLosers: [
    { symbol: 'ETH', name: 'Ethereum', currentPrice: 2500, changePercent: -2.10 },
    { symbol: 'GOOGL', name: 'Alphabet', currentPrice: 142, changePercent: -1.25 }
  ],
  recentNews: [
    {
      id: 'news-1',
      title: 'Apple Announces New Product Line',
      source: 'TechNews',
      timestamp: new Date().toISOString(),
      category: 'technology',
      impact: 'high'
    }
  ],
  activeAlerts: [
    {
      id: 'alert-1',
      title: 'Price Alert',
      message: 'AAPL has risen above $175',
      severity: 'high',
      timestamp: new Date().toISOString()
    }
  ]
}

// Mock the API module
vi.mock('../services/api', () => ({
  getDashboard: vi.fn()
}))

// Import the mocked module
import * as api from '../services/api'

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default mock: successful response
    vi.mocked(api.getDashboard).mockResolvedValue({ data: mockDashboard })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('loading state', () => {
    it('shows page title while loading', () => {
      // Make the promise never resolve to keep loading state
      vi.mocked(api.getDashboard).mockImplementation(() => new Promise(() => {}))
      
      render(<Dashboard />)

      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })
  })

  describe('successful data loading', () => {
    it('renders portfolio summary after loading', async () => {
      render(<Dashboard />)

      await waitFor(() => {
        expect(screen.getByText('Portfolio Value')).toBeInTheDocument()
      })
    })

    it('renders top gainers section', async () => {
      render(<Dashboard />)

      await waitFor(() => {
        expect(screen.getByText('Top Gainers')).toBeInTheDocument()
      })
    })

    it('renders top losers section', async () => {
      render(<Dashboard />)

      await waitFor(() => {
        expect(screen.getByText('Top Losers')).toBeInTheDocument()
      })
    })

    it('renders recent news section', async () => {
      render(<Dashboard />)

      await waitFor(() => {
        expect(screen.getByText('Recent News')).toBeInTheDocument()
      })
    })

    it('renders active alerts section', async () => {
      render(<Dashboard />)

      await waitFor(() => {
        expect(screen.getByText('Active Alerts')).toBeInTheDocument()
      })
    })
  })

  describe('error state', () => {
    it('shows error message on API failure', async () => {
      vi.mocked(api.getDashboard).mockRejectedValue(new Error('Network error'))

      render(<Dashboard />)

      await waitFor(() => {
        expect(screen.getByText('Failed to load dashboard')).toBeInTheDocument()
      })
    })

    it('shows retry button on error', async () => {
      vi.mocked(api.getDashboard).mockRejectedValue(new Error('Network error'))

      render(<Dashboard />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /retry loading data/i })).toBeInTheDocument()
      })
    })
  })

  describe('accessibility', () => {
    it('has proper heading structure', async () => {
      render(<Dashboard />)

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeInTheDocument()
      })
    })
  })
})
