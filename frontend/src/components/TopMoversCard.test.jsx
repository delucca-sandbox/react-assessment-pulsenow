/**
 * Component tests for TopMoversCard
 * Tests rendering of gainers and losers lists
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/test-utils'
import TopMoversCard from './TopMoversCard'

describe('TopMoversCard', () => {
  const mockGainers = [
    { id: '1', symbol: 'BTC', name: 'Bitcoin', currentPrice: 45000, changePercent: 5.25 },
    { id: '2', symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 175.50, changePercent: 2.35 },
    { id: '3', symbol: 'MSFT', name: 'Microsoft', currentPrice: 378.50, changePercent: 0.85 }
  ]

  const mockLosers = [
    { id: '1', symbol: 'ETH', name: 'Ethereum', currentPrice: 2500, changePercent: -3.10 },
    { id: '2', symbol: 'GOOGL', name: 'Alphabet', currentPrice: 142, changePercent: -1.25 }
  ]

  describe('rendering gainers', () => {
    it('renders title correctly', () => {
      render(<TopMoversCard title="Top Gainers" movers={mockGainers} type="gainers" />)

      expect(screen.getByText('Top Gainers')).toBeInTheDocument()
    })

    it('renders gainers icon (📈)', () => {
      render(<TopMoversCard title="Top Gainers" movers={mockGainers} type="gainers" />)

      expect(screen.getByText('📈')).toBeInTheDocument()
    })

    it('renders all mover symbols', () => {
      render(<TopMoversCard title="Top Gainers" movers={mockGainers} type="gainers" />)

      expect(screen.getByText('BTC')).toBeInTheDocument()
      expect(screen.getByText('AAPL')).toBeInTheDocument()
      expect(screen.getByText('MSFT')).toBeInTheDocument()
    })

    it('renders all mover names', () => {
      render(<TopMoversCard title="Top Gainers" movers={mockGainers} type="gainers" />)

      expect(screen.getByText('Bitcoin')).toBeInTheDocument()
      expect(screen.getByText('Apple Inc.')).toBeInTheDocument()
      expect(screen.getByText('Microsoft')).toBeInTheDocument()
    })

    it('renders formatted prices', () => {
      render(<TopMoversCard title="Top Gainers" movers={mockGainers} type="gainers" />)

      expect(screen.getByText('$45,000.00')).toBeInTheDocument()
      expect(screen.getByText('$175.50')).toBeInTheDocument()
      expect(screen.getByText('$378.50')).toBeInTheDocument()
    })

    it('renders formatted percentages', () => {
      render(<TopMoversCard title="Top Gainers" movers={mockGainers} type="gainers" />)

      expect(screen.getByText('+5.25%')).toBeInTheDocument()
      expect(screen.getByText('+2.35%')).toBeInTheDocument()
      expect(screen.getByText('+0.85%')).toBeInTheDocument()
    })

    it('renders ranking numbers', () => {
      render(<TopMoversCard title="Top Gainers" movers={mockGainers} type="gainers" />)

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('uses green header color for gainers', () => {
      render(<TopMoversCard title="Top Gainers" movers={mockGainers} type="gainers" />)

      const title = screen.getByText('Top Gainers')
      expect(title.className).toContain('text-green')
    })
  })

  describe('rendering losers', () => {
    it('renders losers icon (📉)', () => {
      render(<TopMoversCard title="Top Losers" movers={mockLosers} type="losers" />)

      expect(screen.getByText('📉')).toBeInTheDocument()
    })

    it('uses red header color for losers', () => {
      render(<TopMoversCard title="Top Losers" movers={mockLosers} type="losers" />)

      const title = screen.getByText('Top Losers')
      expect(title.className).toContain('text-red')
    })

    it('renders negative percentages correctly', () => {
      render(<TopMoversCard title="Top Losers" movers={mockLosers} type="losers" />)

      expect(screen.getByText('-3.10%')).toBeInTheDocument()
      expect(screen.getByText('-1.25%')).toBeInTheDocument()
    })

    it('shows down arrows for losers', () => {
      render(<TopMoversCard title="Top Losers" movers={mockLosers} type="losers" />)

      const downArrows = screen.getAllByText('↓')
      expect(downArrows.length).toBe(2)
    })
  })

  describe('empty state', () => {
    it('shows empty message when no movers', () => {
      render(<TopMoversCard title="Top Gainers" movers={[]} type="gainers" />)

      expect(screen.getByText('No gainers to display')).toBeInTheDocument()
    })

    it('shows empty message for losers', () => {
      render(<TopMoversCard title="Top Losers" movers={[]} type="losers" />)

      expect(screen.getByText('No losers to display')).toBeInTheDocument()
    })
  })

  describe('list limits', () => {
    it('limits display to 5 items', () => {
      const manyMovers = Array.from({ length: 10 }, (_, i) => ({
        id: String(i),
        symbol: `SYM${i}`,
        name: `Stock ${i}`,
        currentPrice: 100 + i,
        changePercent: 1 + i * 0.5
      }))

      render(<TopMoversCard title="Top Gainers" movers={manyMovers} type="gainers" />)

      // Should only show first 5
      expect(screen.getByText('SYM0')).toBeInTheDocument()
      expect(screen.getByText('SYM4')).toBeInTheDocument()
      expect(screen.queryByText('SYM5')).not.toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has accessible list', () => {
      render(<TopMoversCard title="Top Gainers" movers={mockGainers} type="gainers" />)

      const list = screen.getByRole('list', { name: 'Top Gainers' })
      expect(list).toBeInTheDocument()
    })

    it('has list items', () => {
      render(<TopMoversCard title="Top Gainers" movers={mockGainers} type="gainers" />)

      const listItems = screen.getAllByRole('listitem')
      expect(listItems.length).toBe(3)
    })
  })

  describe('default props', () => {
    it('defaults to gainers type', () => {
      render(<TopMoversCard title="Test" movers={mockGainers} />)

      expect(screen.getByText('📈')).toBeInTheDocument()
    })

    it('defaults to empty movers array', () => {
      render(<TopMoversCard title="Test" type="gainers" />)

      expect(screen.getByText('No gainers to display')).toBeInTheDocument()
    })
  })
})

