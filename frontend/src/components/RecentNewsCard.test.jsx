/**
 * Component tests for RecentNewsCard
 * Tests news display with category badges
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import RecentNewsCard from './RecentNewsCard'

describe('RecentNewsCard', () => {
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

  describe('rendering', () => {
    it('renders card title', () => {
      render(<RecentNewsCard news={mockNews} />)

      expect(screen.getByText('Recent News')).toBeInTheDocument()
    })

    it('renders news icon', () => {
      render(<RecentNewsCard news={mockNews} />)

      expect(screen.getByText('📰')).toBeInTheDocument()
    })

    it('renders news count', () => {
      render(<RecentNewsCard news={mockNews} />)

      expect(screen.getByText('3 items')).toBeInTheDocument()
    })

    it('renders all news titles', () => {
      render(<RecentNewsCard news={mockNews} />)

      expect(screen.getByText('Apple Announces New Product Line')).toBeInTheDocument()
      expect(screen.getByText('Bitcoin Reaches New Monthly High')).toBeInTheDocument()
      expect(screen.getByText('Federal Reserve Holds Interest Rates')).toBeInTheDocument()
    })

    it('renders news sources', () => {
      render(<RecentNewsCard news={mockNews} />)

      expect(screen.getByText(/TechNews/)).toBeInTheDocument()
      expect(screen.getByText(/CryptoDaily/)).toBeInTheDocument()
      expect(screen.getByText(/MarketWatch/)).toBeInTheDocument()
    })
  })

  describe('category badges', () => {
    it('renders category badges', () => {
      render(<RecentNewsCard news={mockNews} />)

      expect(screen.getByText('technology')).toBeInTheDocument()
      expect(screen.getByText('crypto')).toBeInTheDocument()
      expect(screen.getByText('macro')).toBeInTheDocument()
    })

    it('category badges have correct styling', () => {
      render(<RecentNewsCard news={mockNews} />)

      const techBadge = screen.getByText('technology')
      expect(techBadge.className).toContain('bg-cyan')

      const cryptoBadge = screen.getByText('crypto')
      expect(cryptoBadge.className).toContain('bg-purple')

      const macroBadge = screen.getByText('macro')
      expect(macroBadge.className).toContain('bg-indigo')
    })
  })

  describe('impact badges', () => {
    it('renders impact badges', () => {
      render(<RecentNewsCard news={mockNews} />)

      const highBadges = screen.getAllByText('high')
      expect(highBadges.length).toBe(2)

      expect(screen.getByText('medium')).toBeInTheDocument()
    })
  })

  describe('affected assets', () => {
    it('renders affected assets tags', () => {
      render(<RecentNewsCard news={mockNews} />)

      expect(screen.getByText('AAPL')).toBeInTheDocument()
      expect(screen.getByText('BTC')).toBeInTheDocument()
      expect(screen.getByText('ETH')).toBeInTheDocument()
    })

    it('limits affected assets display to 3', () => {
      const newsWithManyAssets = [{
        id: 'news-1',
        title: 'Market Update',
        source: 'News',
        timestamp: new Date().toISOString(),
        category: 'market',
        impact: 'medium',
        affectedAssets: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META']
      }]

      render(<RecentNewsCard news={newsWithManyAssets} />)

      expect(screen.getByText('AAPL')).toBeInTheDocument()
      expect(screen.getByText('GOOGL')).toBeInTheDocument()
      expect(screen.getByText('MSFT')).toBeInTheDocument()
      expect(screen.queryByText('AMZN')).not.toBeInTheDocument()
      expect(screen.getByText('+2 more')).toBeInTheDocument()
    })
  })

  describe('limit prop', () => {
    it('respects limit prop', () => {
      render(<RecentNewsCard news={mockNews} limit={2} />)

      expect(screen.getByText('Apple Announces New Product Line')).toBeInTheDocument()
      expect(screen.getByText('Bitcoin Reaches New Monthly High')).toBeInTheDocument()
      expect(screen.queryByText('Federal Reserve Holds Interest Rates')).not.toBeInTheDocument()
    })

    it('defaults to 5 items', () => {
      const manyNews = Array.from({ length: 10 }, (_, i) => ({
        id: `news-${i}`,
        title: `News Item ${i}`,
        source: 'Source',
        timestamp: new Date().toISOString(),
        category: 'market',
        impact: 'low',
        affectedAssets: []
      }))

      render(<RecentNewsCard news={manyNews} />)

      expect(screen.getByText('News Item 0')).toBeInTheDocument()
      expect(screen.getByText('News Item 4')).toBeInTheDocument()
      expect(screen.queryByText('News Item 5')).not.toBeInTheDocument()
    })
  })

  describe('empty state', () => {
    it('shows empty message when no news', () => {
      render(<RecentNewsCard news={[]} />)

      expect(screen.getByText('No recent news')).toBeInTheDocument()
    })

    it('shows empty message with default news prop', () => {
      render(<RecentNewsCard />)

      expect(screen.getByText('No recent news')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has accessible list', () => {
      render(<RecentNewsCard news={mockNews} />)

      expect(screen.getByRole('list', { name: 'Recent news' })).toBeInTheDocument()
    })

    it('has list items', () => {
      render(<RecentNewsCard news={mockNews} />)

      const items = screen.getAllByRole('listitem')
      expect(items.length).toBe(3)
    })
  })
})

