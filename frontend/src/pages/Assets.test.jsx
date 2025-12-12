/**
 * Integration tests for Assets page
 * Tests full page rendering with filtering, sorting, and modal
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../../test/test-utils'
import Assets from './Assets'

// Mock data
const mockStocks = [
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
  }
]

const mockCrypto = [
  {
    id: 'crypto-1',
    symbol: 'BTC',
    name: 'Bitcoin',
    currentPrice: 45000.00,
    changePercent: 3.50,
    changeAmount: 1525.00,
    volume: 25000000000,
    marketCap: 880000000000
  }
]

const mockStockDetail = {
  ...mockStocks[0],
  priceHistory: [
    { timestamp: new Date(Date.now() - 86400000).toISOString(), price: 170.00 },
    { timestamp: new Date().toISOString(), price: 175.50 }
  ]
}

// Mock the API module
vi.mock('../services/api', () => ({
  getStocks: vi.fn(),
  getCrypto: vi.fn(),
  getStock: vi.fn(),
  getCryptoBySymbol: vi.fn()
}))

// Import the mocked module
import * as api from '../services/api'

describe('Assets Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default mocks: successful responses
    vi.mocked(api.getStocks).mockResolvedValue({ data: mockStocks })
    vi.mocked(api.getCrypto).mockResolvedValue({ data: mockCrypto })
    vi.mocked(api.getStock).mockResolvedValue({ data: mockStockDetail })
    vi.mocked(api.getCryptoBySymbol).mockResolvedValue({ data: mockCrypto[0] })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('loading state', () => {
    it('shows page title while loading', () => {
      vi.mocked(api.getStocks).mockImplementation(() => new Promise(() => {}))
      vi.mocked(api.getCrypto).mockImplementation(() => new Promise(() => {}))
      
      render(<Assets />)

      expect(screen.getByText('Assets')).toBeInTheDocument()
    })
  })

  describe('successful data loading', () => {
    it('renders assets table after loading', async () => {
      render(<Assets />)

      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument()
      })
    })

    it('renders stock assets', async () => {
      render(<Assets />)

      await waitFor(() => {
        // Assets appear in both desktop table and mobile cards
        const aaplElements = screen.getAllByText('AAPL')
        expect(aaplElements.length).toBeGreaterThan(0)
        const appleElements = screen.getAllByText('Apple Inc.')
        expect(appleElements.length).toBeGreaterThan(0)
      })
    })

    it('renders crypto assets', async () => {
      render(<Assets />)

      await waitFor(() => {
        // Assets appear in both desktop table and mobile cards
        const btcElements = screen.getAllByText('BTC')
        expect(btcElements.length).toBeGreaterThan(0)
        const bitcoinElements = screen.getAllByText('Bitcoin')
        expect(bitcoinElements.length).toBeGreaterThan(0)
      })
    })

    it('shows asset count', async () => {
      render(<Assets />)

      await waitFor(() => {
        expect(screen.getByText(/\d+ assets/)).toBeInTheDocument()
      })
    })
  })

  describe('filtering', () => {
    it('renders filter controls', async () => {
      render(<Assets />)

      await waitFor(() => {
        expect(screen.getByRole('combobox', { name: /filter by asset type/i })).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: /search assets/i })).toBeInTheDocument()
      })
    })

    it('filters by stocks only', async () => {
      render(<Assets />)

      await waitFor(() => {
        const aaplElements = screen.getAllByText('AAPL')
        expect(aaplElements.length).toBeGreaterThan(0)
      })

      const dropdown = screen.getByRole('combobox')
      fireEvent.change(dropdown, { target: { value: 'stocks' } })

      await waitFor(() => {
        const aaplElements = screen.getAllByText('AAPL')
        expect(aaplElements.length).toBeGreaterThan(0)
        expect(screen.queryByText('BTC')).not.toBeInTheDocument()
      })
    })

    it('searches by symbol', async () => {
      render(<Assets />)

      await waitFor(() => {
        const aaplElements = screen.getAllByText('AAPL')
        expect(aaplElements.length).toBeGreaterThan(0)
      })

      const searchInput = screen.getByRole('textbox')
      fireEvent.change(searchInput, { target: { value: 'AAPL' } })

      await waitFor(() => {
        const aaplElements = screen.getAllByText('AAPL')
        expect(aaplElements.length).toBeGreaterThan(0)
        expect(screen.queryByText('BTC')).not.toBeInTheDocument()
      })
    })

    it('shows empty state when no results', async () => {
      render(<Assets />)

      await waitFor(() => {
        const aaplElements = screen.getAllByText('AAPL')
        expect(aaplElements.length).toBeGreaterThan(0)
      })

      const searchInput = screen.getByRole('textbox')
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } })

      await waitFor(() => {
        expect(screen.getByText('No assets found')).toBeInTheDocument()
      })
    })
  })

  describe('sorting', () => {
    it('sorts by column when header clicked', async () => {
      render(<Assets />)

      await waitFor(() => {
        const aaplElements = screen.getAllByText('AAPL')
        expect(aaplElements.length).toBeGreaterThan(0)
      })

      const symbolHeader = screen.getByText('Symbol')
      fireEvent.click(symbolHeader)

      // Header should show sort indicator
      await waitFor(() => {
        const header = symbolHeader.closest('th')
        expect(header).toHaveAttribute('aria-sort')
      })
    })
  })

  describe('asset modal', () => {
    it('opens modal when asset row clicked', async () => {
      render(<Assets />)

      await waitFor(() => {
        const aaplElements = screen.getAllByText('AAPL')
        expect(aaplElements.length).toBeGreaterThan(0)
      })

      // Click on the first AAPL element's row
      const aaplElement = screen.getAllByText('AAPL')[0]
      const row = aaplElement.closest('tr')
      fireEvent.click(row)

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('closes modal when close button clicked', async () => {
      render(<Assets />)

      await waitFor(() => {
        const aaplElements = screen.getAllByText('AAPL')
        expect(aaplElements.length).toBeGreaterThan(0)
      })

      const aaplElement = screen.getAllByText('AAPL')[0]
      const row = aaplElement.closest('tr')
      fireEvent.click(row)

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const closeButton = screen.getByRole('button', { name: /close modal/i })
      fireEvent.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('error state', () => {
    it('shows error message on API failure', async () => {
      vi.mocked(api.getStocks).mockRejectedValue(new Error('Network error'))
      vi.mocked(api.getCrypto).mockRejectedValue(new Error('Network error'))

      render(<Assets />)

      await waitFor(() => {
        expect(screen.getByText('Failed to load assets')).toBeInTheDocument()
      })
    })

    it('shows retry button on error', async () => {
      vi.mocked(api.getStocks).mockRejectedValue(new Error('Network error'))
      vi.mocked(api.getCrypto).mockRejectedValue(new Error('Network error'))

      render(<Assets />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /retry loading data/i })).toBeInTheDocument()
      })
    })
  })

  describe('accessibility', () => {
    it('has proper heading structure', async () => {
      render(<Assets />)

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Assets', level: 1 })).toBeInTheDocument()
      })
    })
  })
})
