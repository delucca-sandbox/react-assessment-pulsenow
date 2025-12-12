/**
 * Component tests for PortfolioSummaryCard
 * Tests rendering, formatting, and color coding
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/test-utils'
import PortfolioSummaryCard from './PortfolioSummaryCard'

describe('PortfolioSummaryCard', () => {
  const mockPortfolio = {
    totalValue: 125000.50,
    totalChange: 2500.25,
    totalChangePercent: 2.04
  }

  describe('rendering', () => {
    it('renders portfolio value correctly formatted', () => {
      render(<PortfolioSummaryCard portfolio={mockPortfolio} />)

      expect(screen.getByText('$125,000.50')).toBeInTheDocument()
    })

    it('renders total change amount correctly', () => {
      render(<PortfolioSummaryCard portfolio={mockPortfolio} />)

      expect(screen.getByText('$2,500.25')).toBeInTheDocument()
    })

    it('renders change percentage correctly', () => {
      render(<PortfolioSummaryCard portfolio={mockPortfolio} />)

      expect(screen.getByText('+2.04%')).toBeInTheDocument()
    })

    it('renders Portfolio Value label', () => {
      render(<PortfolioSummaryCard portfolio={mockPortfolio} />)

      expect(screen.getByText('Portfolio Value')).toBeInTheDocument()
    })

    it('renders 24h Change label', () => {
      render(<PortfolioSummaryCard portfolio={mockPortfolio} />)

      expect(screen.getByText('24h Change')).toBeInTheDocument()
    })
  })

  describe('color coding', () => {
    it('uses green color for positive change', () => {
      render(<PortfolioSummaryCard portfolio={mockPortfolio} />)

      const percentElement = screen.getByText('+2.04%')
      expect(percentElement.className).toContain('text-green')
    })

    it('uses red color for negative change', () => {
      const negativePortfolio = {
        totalValue: 125000.50,
        totalChange: -2500.25,
        totalChangePercent: -2.04
      }
      render(<PortfolioSummaryCard portfolio={negativePortfolio} />)

      const percentElement = screen.getByText('-2.04%')
      expect(percentElement.className).toContain('text-red')
    })

    it('shows up arrow for positive change', () => {
      render(<PortfolioSummaryCard portfolio={mockPortfolio} />)

      expect(screen.getByText('↑')).toBeInTheDocument()
    })

    it('shows down arrow for negative change', () => {
      const negativePortfolio = {
        totalValue: 125000.50,
        totalChange: -2500.25,
        totalChangePercent: -2.04
      }
      render(<PortfolioSummaryCard portfolio={negativePortfolio} />)

      expect(screen.getByText('↓')).toBeInTheDocument()
    })
  })

  describe('progress bar', () => {
    it('renders progress bar element', () => {
      render(<PortfolioSummaryCard portfolio={mockPortfolio} />)

      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toBeInTheDocument()
    })

    it('has green background for positive change', () => {
      render(<PortfolioSummaryCard portfolio={mockPortfolio} />)

      const progressBar = screen.getByRole('progressbar')
      expect(progressBar.className).toContain('bg-green')
    })

    it('has red background for negative change', () => {
      const negativePortfolio = {
        totalValue: 125000.50,
        totalChange: -2500.25,
        totalChangePercent: -2.04
      }
      render(<PortfolioSummaryCard portfolio={negativePortfolio} />)

      const progressBar = screen.getByRole('progressbar')
      expect(progressBar.className).toContain('bg-red')
    })
  })

  describe('edge cases', () => {
    it('returns null when portfolio is null', () => {
      const { container } = render(<PortfolioSummaryCard portfolio={null} />)

      expect(container.firstChild).toBeNull()
    })

    it('returns null when portfolio is undefined', () => {
      const { container } = render(<PortfolioSummaryCard portfolio={undefined} />)

      expect(container.firstChild).toBeNull()
    })

    it('handles zero values', () => {
      const zeroPortfolio = {
        totalValue: 0,
        totalChange: 0,
        totalChangePercent: 0
      }
      render(<PortfolioSummaryCard portfolio={zeroPortfolio} />)

      // Both totalValue and totalChange show $0.00, so we check for multiple occurrences
      const zeroAmounts = screen.getAllByText('$0.00')
      expect(zeroAmounts.length).toBe(2)
      expect(screen.getByText('+0.00%')).toBeInTheDocument()
    })
  })
})
