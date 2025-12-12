/**
 * Component tests for AssetsTable
 * Tests table rendering, sorting, and interactions
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../test/test-utils'
import AssetsTable from './AssetsTable'

describe('AssetsTable', () => {
  const mockAssets = [
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currentPrice: 175.50,
      changePercent: 2.35,
      volume: 52000000,
      marketCap: 2800000000000
    },
    {
      id: '2',
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPrice: 45000,
      changePercent: -1.25,
      volume: 25000000000,
      marketCap: 880000000000
    }
  ]

  const defaultProps = {
    assets: mockAssets,
    sortBy: 'marketCap',
    sortOrder: 'desc',
    onSort: vi.fn(),
    onAssetClick: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders table with correct headers', () => {
      render(<AssetsTable {...defaultProps} />)

      expect(screen.getByText('Symbol')).toBeInTheDocument()
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Price')).toBeInTheDocument()
      expect(screen.getByText('24h Change')).toBeInTheDocument()
      expect(screen.getByText('Volume')).toBeInTheDocument()
      expect(screen.getByText('Market Cap')).toBeInTheDocument()
    })

    it('renders all assets', () => {
      render(<AssetsTable {...defaultProps} />)

      expect(screen.getByText('AAPL')).toBeInTheDocument()
      expect(screen.getByText('Apple Inc.')).toBeInTheDocument()
      expect(screen.getByText('BTC')).toBeInTheDocument()
      expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    })

    it('renders formatted prices', () => {
      render(<AssetsTable {...defaultProps} />)

      expect(screen.getByText('$175.50')).toBeInTheDocument()
      expect(screen.getByText('$45,000.00')).toBeInTheDocument()
    })

    it('renders formatted percentages', () => {
      render(<AssetsTable {...defaultProps} />)

      expect(screen.getByText('+2.35%')).toBeInTheDocument()
      expect(screen.getByText('-1.25%')).toBeInTheDocument()
    })

    it('renders formatted large numbers', () => {
      render(<AssetsTable {...defaultProps} />)

      // Volume and market cap should be formatted
      expect(screen.getByText('52M')).toBeInTheDocument()
      expect(screen.getByText('2.8T')).toBeInTheDocument()
    })

    it('shows empty message when no assets', () => {
      render(<AssetsTable {...defaultProps} assets={[]} />)

      expect(screen.getByText('No assets found')).toBeInTheDocument()
    })
  })

  describe('color coding', () => {
    it('shows green color for positive change', () => {
      render(<AssetsTable {...defaultProps} />)

      const positiveChange = screen.getByText('+2.35%')
      // The color class is on the parent span element
      const parentSpan = positiveChange.closest('span.font-medium')
      expect(parentSpan.className).toContain('text-green')
    })

    it('shows red color for negative change', () => {
      render(<AssetsTable {...defaultProps} />)

      const negativeChange = screen.getByText('-1.25%')
      // The color class is on the parent span element
      const parentSpan = negativeChange.closest('span.font-medium')
      expect(parentSpan.className).toContain('text-red')
    })

    it('shows up arrow for positive change', () => {
      render(<AssetsTable {...defaultProps} />)

      expect(screen.getByText('↑')).toBeInTheDocument()
    })

    it('shows down arrow for negative change', () => {
      render(<AssetsTable {...defaultProps} />)

      expect(screen.getByText('↓')).toBeInTheDocument()
    })
  })

  describe('sorting', () => {
    it('calls onSort when clicking sortable column header', () => {
      const onSort = vi.fn()
      render(<AssetsTable {...defaultProps} onSort={onSort} />)

      fireEvent.click(screen.getByText('Symbol'))

      expect(onSort).toHaveBeenCalledWith('symbol')
    })

    it('calls onSort with correct column key', () => {
      const onSort = vi.fn()
      render(<AssetsTable {...defaultProps} onSort={onSort} />)

      fireEvent.click(screen.getByText('Price'))
      expect(onSort).toHaveBeenCalledWith('currentPrice')

      fireEvent.click(screen.getByText('24h Change'))
      expect(onSort).toHaveBeenCalledWith('changePercent')

      fireEvent.click(screen.getByText('Volume'))
      expect(onSort).toHaveBeenCalledWith('volume')
    })

    it('shows sort indicator on active column', () => {
      render(<AssetsTable {...defaultProps} sortBy="symbol" sortOrder="asc" />)

      // Should have ascending sort indicator
      const symbolHeader = screen.getByText('Symbol').closest('th')
      expect(symbolHeader).toHaveAttribute('aria-sort', 'ascending')
    })

    it('shows descending indicator', () => {
      render(<AssetsTable {...defaultProps} sortBy="symbol" sortOrder="desc" />)

      const symbolHeader = screen.getByText('Symbol').closest('th')
      expect(symbolHeader).toHaveAttribute('aria-sort', 'descending')
    })

    it('supports keyboard navigation for sorting', () => {
      const onSort = vi.fn()
      render(<AssetsTable {...defaultProps} onSort={onSort} />)

      const symbolHeader = screen.getByText('Symbol').closest('th')
      fireEvent.keyDown(symbolHeader, { key: 'Enter' })

      expect(onSort).toHaveBeenCalledWith('symbol')
    })

    it('supports space key for sorting', () => {
      const onSort = vi.fn()
      render(<AssetsTable {...defaultProps} onSort={onSort} />)

      const symbolHeader = screen.getByText('Symbol').closest('th')
      fireEvent.keyDown(symbolHeader, { key: ' ' })

      expect(onSort).toHaveBeenCalledWith('symbol')
    })
  })

  describe('row interactions', () => {
    it('calls onAssetClick when row is clicked', () => {
      const onAssetClick = vi.fn()
      render(<AssetsTable {...defaultProps} onAssetClick={onAssetClick} />)

      fireEvent.click(screen.getByText('AAPL').closest('tr'))

      expect(onAssetClick).toHaveBeenCalledWith(mockAssets[0])
    })

    it('supports keyboard navigation for row selection', () => {
      const onAssetClick = vi.fn()
      render(<AssetsTable {...defaultProps} onAssetClick={onAssetClick} />)

      const row = screen.getByText('AAPL').closest('tr')
      fireEvent.keyDown(row, { key: 'Enter' })

      expect(onAssetClick).toHaveBeenCalledWith(mockAssets[0])
    })

    it('rows are focusable', () => {
      render(<AssetsTable {...defaultProps} />)

      const row = screen.getByText('AAPL').closest('tr')
      expect(row).toHaveAttribute('tabIndex', '0')
    })

    it('rows have accessible labels', () => {
      render(<AssetsTable {...defaultProps} />)

      const row = screen.getByText('AAPL').closest('tr')
      expect(row).toHaveAttribute('aria-label', 'Apple Inc. (AAPL)')
    })
  })

  describe('accessibility', () => {
    it('has grid role', () => {
      render(<AssetsTable {...defaultProps} />)

      expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('column headers have scope', () => {
      render(<AssetsTable {...defaultProps} />)

      const headers = screen.getAllByRole('columnheader')
      headers.forEach(header => {
        expect(header).toHaveAttribute('scope', 'col')
      })
    })

    it('sortable headers are focusable', () => {
      render(<AssetsTable {...defaultProps} />)

      const symbolHeader = screen.getByText('Symbol').closest('th')
      expect(symbolHeader).toHaveAttribute('tabIndex', '0')
    })
  })

  describe('default props', () => {
    it('handles missing onSort gracefully', () => {
      render(<AssetsTable assets={mockAssets} sortBy="symbol" sortOrder="asc" />)

      // Should not throw when clicking without onSort
      fireEvent.click(screen.getByText('Symbol'))
    })

    it('handles missing onAssetClick gracefully', () => {
      render(<AssetsTable assets={mockAssets} sortBy="symbol" sortOrder="asc" />)

      // Should not throw when clicking without onAssetClick
      fireEvent.click(screen.getByText('AAPL').closest('tr'))
    })
  })
})
