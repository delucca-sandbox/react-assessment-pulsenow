/**
 * Integration tests for Portfolio page
 * Tests portfolio display with charts and holdings
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '../test/test-utils'
import Portfolio from './Portfolio'

// Mock data - matching what HoldingsTable expects
const mockPortfolio = {
  totalValue: 125000.50,
  totalChange: 2500.25,
  totalChangePercent: 2.04,
  assets: [
    {
      assetId: 'AAPL',
      name: 'Apple Inc.',
      symbol: 'AAPL',
      quantity: 50,
      avgBuyPrice: 150.00,
      currentPrice: 175.50,
      value: 8775.00,
      changePercent: 5.25,
      change: 437.50,
      type: 'stock'
    },
    {
      assetId: 'BTC',
      name: 'Bitcoin',
      symbol: 'BTC',
      quantity: 0.5,
      avgBuyPrice: 40000,
      currentPrice: 45000,
      value: 22500,
      changePercent: 12.5,
      change: 2500,
      type: 'crypto'
    }
  ]
}

// Mock the API module
vi.mock('../services/api', () => ({
  getPortfolio: vi.fn()
}))

// Import the mocked module
import * as api from '../services/api'

describe('Portfolio Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(api.getPortfolio).mockResolvedValue({ data: mockPortfolio })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('loading state', () => {
    it('shows page title while loading', () => {
      vi.mocked(api.getPortfolio).mockImplementation(() => new Promise(() => {}))
      
      render(<Portfolio />)

      expect(screen.getByText('Portfolio')).toBeInTheDocument()
    })
  })

  describe('successful data loading', () => {
    it('renders allocation chart section after loading', async () => {
      render(<Portfolio />)

      await waitFor(() => {
        expect(screen.getByText('Asset Allocation')).toBeInTheDocument()
      })
    })

    it('shows holdings count', async () => {
      render(<Portfolio />)

      await waitFor(() => {
        expect(screen.getByText(/\d+ holdings?/)).toBeInTheDocument()
      })
    })

    it('renders holdings section', async () => {
      render(<Portfolio />)

      await waitFor(() => {
        expect(screen.getByText('Holdings')).toBeInTheDocument()
      })
    })
  })

  describe('portfolio data', () => {
    it('displays formatted currency values', async () => {
      render(<Portfolio />)

      await waitFor(() => {
        // Should show formatted currency values (multiple instances expected)
        const currencyValues = screen.getAllByText(/\$[\d,]+/)
        expect(currencyValues.length).toBeGreaterThan(0)
      })
    })

    it('displays holdings data', async () => {
      render(<Portfolio />)

      await waitFor(() => {
        // HoldingsTable uses assetId for display - appears multiple times (desktop + mobile)
        const aaplElements = screen.getAllByText('AAPL')
        expect(aaplElements.length).toBeGreaterThan(0)
        const btcElements = screen.getAllByText('BTC')
        expect(btcElements.length).toBeGreaterThan(0)
      })
    })
  })

  describe('error state', () => {
    it('shows error message on API failure', async () => {
      vi.mocked(api.getPortfolio).mockRejectedValue(new Error('Network error'))

      render(<Portfolio />)

      await waitFor(() => {
        expect(screen.getByText('Failed to load portfolio')).toBeInTheDocument()
      })
    })

    it('shows retry button on error', async () => {
      vi.mocked(api.getPortfolio).mockRejectedValue(new Error('Network error'))

      render(<Portfolio />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /retry loading data/i })).toBeInTheDocument()
      })
    })
  })

  describe('empty state', () => {
    it('shows empty state when no holdings', async () => {
      vi.mocked(api.getPortfolio).mockResolvedValue({ data: { assets: [] } })

      render(<Portfolio />)

      await waitFor(() => {
        expect(screen.getByText('No holdings yet')).toBeInTheDocument()
      })
    })

    it('shows helpful message in empty state', async () => {
      vi.mocked(api.getPortfolio).mockResolvedValue({ data: { assets: [] } })

      render(<Portfolio />)

      await waitFor(() => {
        expect(screen.getByText(/portfolio is empty/i)).toBeInTheDocument()
      })
    })
  })

  describe('accessibility', () => {
    it('has proper heading structure', async () => {
      render(<Portfolio />)

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Portfolio', level: 1 })).toBeInTheDocument()
      })
    })

    it('has accessible sections', async () => {
      render(<Portfolio />)

      await waitFor(() => {
        expect(screen.getByText('Asset Allocation')).toBeInTheDocument()
        expect(screen.getByText('Holdings')).toBeInTheDocument()
      })
    })
  })
})
