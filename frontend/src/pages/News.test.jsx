/**
 * Integration tests for News page
 * Tests news display with category filtering
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../../test/test-utils'
import News from './News'

// Mock data
const mockNews = [
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
  }
]

// Mock the API module
vi.mock('../services/api', () => ({
  getNews: vi.fn()
}))

// Import the mocked module
import * as api from '../services/api'

describe('News Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(api.getNews).mockResolvedValue({ data: mockNews })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('loading state', () => {
    it('shows page title while loading', () => {
      vi.mocked(api.getNews).mockImplementation(() => new Promise(() => {}))
      
      render(<News />)

      expect(screen.getByText('News')).toBeInTheDocument()
    })
  })

  describe('successful data loading', () => {
    it('renders news articles after loading', async () => {
      render(<News />)

      await waitFor(() => {
        expect(screen.getByText('Apple Announces New Product Line')).toBeInTheDocument()
      })
    })

    it('shows article count', async () => {
      render(<News />)

      await waitFor(() => {
        expect(screen.getByText(/\d+ articles?/)).toBeInTheDocument()
      })
    })

    it('renders category filter buttons', async () => {
      render(<News />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()
      })
    })
  })

  describe('category filtering', () => {
    it('filters by category when button clicked', async () => {
      render(<News />)

      await waitFor(() => {
        expect(screen.getByText('Apple Announces New Product Line')).toBeInTheDocument()
      })

      // Click on technology filter
      const techButton = screen.getByRole('button', { name: /technology/i })
      fireEvent.click(techButton)

      await waitFor(() => {
        expect(screen.getByText('Apple Announces New Product Line')).toBeInTheDocument()
      })
    })
  })

  describe('error state', () => {
    it('shows error message on API failure', async () => {
      vi.mocked(api.getNews).mockRejectedValue(new Error('Network error'))

      render(<News />)

      await waitFor(() => {
        expect(screen.getByText('Failed to load news')).toBeInTheDocument()
      })
    })

    it('shows retry button on error', async () => {
      vi.mocked(api.getNews).mockRejectedValue(new Error('Network error'))

      render(<News />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /retry loading data/i })).toBeInTheDocument()
      })
    })
  })

  describe('empty state', () => {
    it('shows empty state when no news', async () => {
      vi.mocked(api.getNews).mockResolvedValue({ data: [] })

      render(<News />)

      await waitFor(() => {
        expect(screen.getByText('No news available')).toBeInTheDocument()
      })
    })
  })

  describe('accessibility', () => {
    it('has proper heading structure', async () => {
      render(<News />)

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'News', level: 1 })).toBeInTheDocument()
      })
    })
  })
})
