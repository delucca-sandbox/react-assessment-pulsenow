/**
 * Integration tests for Alerts page
 * Tests alerts display grouped by severity
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '../test/test-utils'
import Alerts from './Alerts'

// Mock data
const mockAlerts = [
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

// Mock the API module
vi.mock('../services/api', () => ({
  getAlerts: vi.fn()
}))

// Import the mocked module
import * as api from '../services/api'

describe('Alerts Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(api.getAlerts).mockResolvedValue({ data: mockAlerts })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('loading state', () => {
    it('shows page title while loading', () => {
      vi.mocked(api.getAlerts).mockImplementation(() => new Promise(() => {}))
      
      render(<Alerts />)

      expect(screen.getByText('Alerts')).toBeInTheDocument()
    })
  })

  describe('successful data loading', () => {
    it('renders alerts after loading', async () => {
      render(<Alerts />)

      await waitFor(() => {
        expect(screen.getByText('AAPL has risen above $175')).toBeInTheDocument()
      })
    })

    it('shows alert count', async () => {
      render(<Alerts />)

      await waitFor(() => {
        expect(screen.getByText(/\d+ alerts?/)).toBeInTheDocument()
      })
    })

    it('shows critical count when present', async () => {
      render(<Alerts />)

      await waitFor(() => {
        expect(screen.getByText(/\d+ critical/i)).toBeInTheDocument()
      })
    })

    it('renders alert messages', async () => {
      render(<Alerts />)

      await waitFor(() => {
        expect(screen.getByText('Significant market volatility detected')).toBeInTheDocument()
      })
    })
  })

  describe('error state', () => {
    it('shows error message on API failure', async () => {
      vi.mocked(api.getAlerts).mockRejectedValue(new Error('Network error'))

      render(<Alerts />)

      await waitFor(() => {
        expect(screen.getByText('Failed to load alerts')).toBeInTheDocument()
      })
    })

    it('shows retry button on error', async () => {
      vi.mocked(api.getAlerts).mockRejectedValue(new Error('Network error'))

      render(<Alerts />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /retry loading data/i })).toBeInTheDocument()
      })
    })
  })

  describe('empty state', () => {
    it('shows empty state when no alerts', async () => {
      vi.mocked(api.getAlerts).mockResolvedValue({ data: [] })

      render(<Alerts />)

      await waitFor(() => {
        expect(screen.getByText('No alerts')).toBeInTheDocument()
      })
    })

    it('shows positive message in empty state', async () => {
      vi.mocked(api.getAlerts).mockResolvedValue({ data: [] })

      render(<Alerts />)

      await waitFor(() => {
        expect(screen.getByText(/all caught up/i)).toBeInTheDocument()
      })
    })
  })

  describe('accessibility', () => {
    it('has proper heading structure', async () => {
      render(<Alerts />)

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Alerts', level: 1 })).toBeInTheDocument()
      })
    })
  })
})
