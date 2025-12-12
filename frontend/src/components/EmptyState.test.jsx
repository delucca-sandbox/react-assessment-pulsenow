/**
 * Component tests for EmptyState
 * Tests empty state display with various configurations
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/test-utils'
import EmptyState from './EmptyState'

describe('EmptyState', () => {
  describe('rendering', () => {
    it('renders default title', () => {
      render(<EmptyState />)

      expect(screen.getByText('No data available')).toBeInTheDocument()
    })

    it('renders custom title', () => {
      render(<EmptyState title="Custom Empty Title" />)

      expect(screen.getByText('Custom Empty Title')).toBeInTheDocument()
    })

    it('renders default description', () => {
      render(<EmptyState />)

      expect(screen.getByText('There is nothing to display at the moment.')).toBeInTheDocument()
    })

    it('renders custom description', () => {
      render(<EmptyState description="Custom description text" />)

      expect(screen.getByText('Custom description text')).toBeInTheDocument()
    })

    it('renders default icon', () => {
      render(<EmptyState />)

      expect(screen.getByText('📭')).toBeInTheDocument()
    })

    it('renders custom icon', () => {
      render(<EmptyState icon="🔍" />)

      expect(screen.getByText('🔍')).toBeInTheDocument()
    })
  })

  describe('action button', () => {
    it('does not render action when not provided', () => {
      render(<EmptyState />)

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('renders action when provided', () => {
      const action = <button>Click me</button>
      render(<EmptyState action={action} />)

      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('renders complex action elements', () => {
      const action = (
        <div>
          <button>Primary</button>
          <button>Secondary</button>
        </div>
      )
      render(<EmptyState action={action} />)

      expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Secondary' })).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has status role', () => {
      render(<EmptyState />)

      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('has aria-label matching title', () => {
      render(<EmptyState title="Custom Title" />)

      const status = screen.getByRole('status')
      expect(status).toHaveAttribute('aria-label', 'Custom Title')
    })

    it('icon is hidden from screen readers', () => {
      render(<EmptyState icon="📭" />)

      const icon = screen.getByText('📭')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('styling', () => {
    it('has card styling', () => {
      render(<EmptyState />)

      const container = screen.getByRole('status')
      expect(container.className).toContain('bg-white')
      expect(container.className).toContain('rounded-lg')
      expect(container.className).toContain('border')
    })

    it('has centered text', () => {
      render(<EmptyState />)

      const container = screen.getByRole('status')
      expect(container.className).toContain('text-center')
    })
  })
})

