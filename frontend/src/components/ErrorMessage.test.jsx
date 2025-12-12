/**
 * Component tests for ErrorMessage
 * Tests error display and retry functionality
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../test/test-utils'
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage', () => {
  describe('rendering', () => {
    it('renders default title', () => {
      render(<ErrorMessage message="Test error" />)

      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('renders custom title', () => {
      render(<ErrorMessage message="Test error" title="Custom Error Title" />)

      expect(screen.getByText('Custom Error Title')).toBeInTheDocument()
    })

    it('renders error message', () => {
      render(<ErrorMessage message="This is a test error message" />)

      expect(screen.getByText('This is a test error message')).toBeInTheDocument()
    })

    it('renders default message when message is empty', () => {
      render(<ErrorMessage message="" />)

      expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument()
    })

    it('renders error icon', () => {
      render(<ErrorMessage message="Test error" />)

      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('retry button', () => {
    it('renders retry button when onRetry is provided', () => {
      const onRetry = vi.fn()
      render(<ErrorMessage message="Test error" onRetry={onRetry} />)

      // Button has aria-label="Retry loading data" and text "Try Again"
      expect(screen.getByRole('button', { name: /retry loading data/i })).toBeInTheDocument()
    })

    it('does not render retry button when onRetry is not provided', () => {
      render(<ErrorMessage message="Test error" />)

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('calls onRetry when retry button is clicked', () => {
      const onRetry = vi.fn()
      render(<ErrorMessage message="Test error" onRetry={onRetry} />)

      fireEvent.click(screen.getByRole('button', { name: /retry loading data/i }))

      expect(onRetry).toHaveBeenCalledTimes(1)
    })

    it('can be clicked multiple times', () => {
      const onRetry = vi.fn()
      render(<ErrorMessage message="Test error" onRetry={onRetry} />)

      const button = screen.getByRole('button', { name: /retry loading data/i })
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      expect(onRetry).toHaveBeenCalledTimes(3)
    })
  })

  describe('accessibility', () => {
    it('has alert role', () => {
      render(<ErrorMessage message="Test error" />)

      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('has aria-live polite', () => {
      render(<ErrorMessage message="Test error" />)

      const alert = screen.getByRole('alert')
      expect(alert).toHaveAttribute('aria-live', 'polite')
    })

    it('retry button has accessible label', () => {
      const onRetry = vi.fn()
      render(<ErrorMessage message="Test error" onRetry={onRetry} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Retry loading data')
    })
  })

  describe('styling', () => {
    it('has error styling (red theme)', () => {
      render(<ErrorMessage message="Test error" />)

      const alert = screen.getByRole('alert')
      expect(alert.className).toContain('bg-red')
      expect(alert.className).toContain('border-red')
    })
  })
})
