/**
 * Component tests for ActiveAlertsCard
 * Tests alerts display with severity badges
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/test-utils'
import ActiveAlertsCard from './ActiveAlertsCard'

describe('ActiveAlertsCard', () => {
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

  describe('rendering', () => {
    it('renders card title', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      expect(screen.getByText('Active Alerts')).toBeInTheDocument()
    })

    it('renders alerts icon', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      expect(screen.getByText('🔔')).toBeInTheDocument()
    })

    it('renders alert count', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      expect(screen.getByText('3 active')).toBeInTheDocument()
    })

    it('renders all alert messages', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      expect(screen.getByText('AAPL has risen above $175')).toBeInTheDocument()
      expect(screen.getByText('Your portfolio is up 5% this week')).toBeInTheDocument()
      expect(screen.getByText('Significant market volatility detected')).toBeInTheDocument()
    })

    it('renders alert titles', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      expect(screen.getByText('Price Alert')).toBeInTheDocument()
      expect(screen.getByText('Portfolio Alert')).toBeInTheDocument()
      expect(screen.getByText('Critical Market Alert')).toBeInTheDocument()
    })
  })

  describe('severity badges', () => {
    it('renders severity badges', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      expect(screen.getByText('critical')).toBeInTheDocument()
      expect(screen.getByText('high')).toBeInTheDocument()
      expect(screen.getByText('low')).toBeInTheDocument()
    })

    it('critical badge has red styling', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      const criticalBadge = screen.getByText('critical')
      expect(criticalBadge.className).toContain('bg-red')
    })

    it('high badge has orange styling', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      const highBadge = screen.getByText('high')
      expect(highBadge.className).toContain('bg-orange')
    })

    it('low badge has blue styling', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      const lowBadge = screen.getByText('low')
      expect(lowBadge.className).toContain('bg-blue')
    })
  })

  describe('sorting by severity', () => {
    it('sorts alerts by severity (critical first)', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      const listItems = screen.getAllByRole('listitem')
      
      // First item should be critical
      expect(listItems[0]).toHaveTextContent('critical')
      
      // Second should be high
      expect(listItems[1]).toHaveTextContent('high')
      
      // Third should be low
      expect(listItems[2]).toHaveTextContent('low')
    })
  })

  describe('action required indicator', () => {
    it('shows action required indicator', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      const actionIndicators = screen.getAllByText('• Action required')
      expect(actionIndicators.length).toBe(2) // Two alerts have actionRequired: true
    })

    it('does not show action required when false', () => {
      const alertsNoAction = [{
        id: 'alert-1',
        message: 'Test alert',
        severity: 'low',
        timestamp: new Date().toISOString(),
        actionRequired: false
      }]

      render(<ActiveAlertsCard alerts={alertsNoAction} />)

      expect(screen.queryByText('• Action required')).not.toBeInTheDocument()
    })
  })

  describe('affected assets', () => {
    it('renders affected assets', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      expect(screen.getByText('AAPL')).toBeInTheDocument()
      expect(screen.getByText('BTC')).toBeInTheDocument()
      expect(screen.getByText('ETH')).toBeInTheDocument()
    })

    it('limits affected assets to 3', () => {
      const alertWithManyAssets = [{
        id: 'alert-1',
        message: 'Market alert',
        severity: 'high',
        timestamp: new Date().toISOString(),
        affectedAssets: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META']
      }]

      render(<ActiveAlertsCard alerts={alertWithManyAssets} />)

      expect(screen.getByText('AAPL')).toBeInTheDocument()
      expect(screen.getByText('GOOGL')).toBeInTheDocument()
      expect(screen.getByText('MSFT')).toBeInTheDocument()
      expect(screen.queryByText('AMZN')).not.toBeInTheDocument()
      expect(screen.getByText('+2 more')).toBeInTheDocument()
    })
  })

  describe('limit prop', () => {
    it('respects limit prop', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} limit={2} />)

      const listItems = screen.getAllByRole('listitem')
      expect(listItems.length).toBe(2)
    })

    it('defaults to 5 items', () => {
      const manyAlerts = Array.from({ length: 10 }, (_, i) => ({
        id: `alert-${i}`,
        message: `Alert ${i}`,
        severity: 'low',
        timestamp: new Date().toISOString()
      }))

      render(<ActiveAlertsCard alerts={manyAlerts} />)

      const listItems = screen.getAllByRole('listitem')
      expect(listItems.length).toBe(5)
    })
  })

  describe('empty state', () => {
    it('shows empty message when no alerts', () => {
      render(<ActiveAlertsCard alerts={[]} />)

      expect(screen.getByText('No active alerts')).toBeInTheDocument()
    })

    it('shows empty message with default alerts prop', () => {
      render(<ActiveAlertsCard />)

      expect(screen.getByText('No active alerts')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has accessible list', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      expect(screen.getByRole('list', { name: 'Active alerts' })).toBeInTheDocument()
    })

    it('severity badges have aria-label', () => {
      render(<ActiveAlertsCard alerts={mockAlerts} />)

      const criticalBadge = screen.getByText('critical')
      expect(criticalBadge).toHaveAttribute('aria-label', 'Severity: critical')
    })
  })
})

