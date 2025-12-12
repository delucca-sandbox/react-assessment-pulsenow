/**
 * Component tests for Layout
 * Tests navigation, sidebar, and responsive behavior
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/test-utils'
import Layout from './Layout'

describe('Layout', () => {
  describe('rendering', () => {
    it('renders header with app name', () => {
      render(<Layout><div>Content</div></Layout>)

      expect(screen.getByText('Pulse')).toBeInTheDocument()
    })

    it('renders header subtitle', () => {
      render(<Layout><div>Content</div></Layout>)

      expect(screen.getByText('Market Monitoring Engine')).toBeInTheDocument()
    })

    it('renders children content', () => {
      render(<Layout><div>Test Content</div></Layout>)

      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('renders theme toggle', () => {
      render(<Layout><div>Content</div></Layout>)

      // Theme toggle button should be present with mode in label
      const themeButton = screen.getByRole('button', { name: /mode/i })
      expect(themeButton).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('renders all navigation links', () => {
      render(<Layout><div>Content</div></Layout>)

      expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /assets/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /news/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /alerts/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument()
    })

    it('renders navigation icons', () => {
      render(<Layout><div>Content</div></Layout>)

      expect(screen.getByText('📊')).toBeInTheDocument() // Dashboard
      expect(screen.getByText('💰')).toBeInTheDocument() // Assets
      expect(screen.getByText('📰')).toBeInTheDocument() // News
      expect(screen.getByText('🔔')).toBeInTheDocument() // Alerts
      expect(screen.getByText('💼')).toBeInTheDocument() // Portfolio
    })

    it('links have correct paths', () => {
      render(<Layout><div>Content</div></Layout>)

      expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/')
      expect(screen.getByRole('link', { name: /assets/i })).toHaveAttribute('href', '/assets')
      expect(screen.getByRole('link', { name: /news/i })).toHaveAttribute('href', '/news')
      expect(screen.getByRole('link', { name: /alerts/i })).toHaveAttribute('href', '/alerts')
      expect(screen.getByRole('link', { name: /portfolio/i })).toHaveAttribute('href', '/portfolio')
    })

    it('highlights active link', () => {
      render(<Layout><div>Content</div></Layout>, { route: '/' })

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i })
      expect(dashboardLink).toHaveAttribute('aria-current', 'page')
    })
  })

  describe('sidebar toggle', () => {
    it('renders sidebar toggle button', () => {
      render(<Layout><div>Content</div></Layout>)

      // Button aria-label is "Collapse sidebar" or "Expand sidebar"
      const toggleButton = screen.getByRole('button', { name: /sidebar/i })
      expect(toggleButton).toBeInTheDocument()
    })

    it('toggles sidebar when button clicked', () => {
      render(<Layout><div>Content</div></Layout>)

      const toggleButton = screen.getByRole('button', { name: /collapse sidebar/i })
      const sidebar = screen.getByLabelText('Main navigation')

      // Initially expanded
      expect(sidebar.className).toContain('w-64')

      // Click to collapse
      fireEvent.click(toggleButton)
      expect(sidebar.className).toContain('w-16')

      // Click to expand (button label changes)
      const expandButton = screen.getByRole('button', { name: /expand sidebar/i })
      fireEvent.click(expandButton)
      expect(sidebar.className).toContain('w-64')
    })

    it('updates aria-expanded on toggle', () => {
      render(<Layout><div>Content</div></Layout>)

      const toggleButton = screen.getByRole('button', { name: /sidebar/i })

      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')

      fireEvent.click(toggleButton)

      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('hides nav text when collapsed', () => {
      render(<Layout><div>Content</div></Layout>)

      const toggleButton = screen.getByRole('button', { name: /sidebar/i })

      // Initially visible
      expect(screen.getByText('Dashboard')).toBeVisible()

      // Collapse sidebar
      fireEvent.click(toggleButton)

      // Text should be sr-only (screen reader only)
      const dashboardLink = screen.getByRole('link', { name: /dashboard/i })
      const srOnlyText = dashboardLink.querySelector('.sr-only')
      expect(srOnlyText).toHaveTextContent('Dashboard')
    })
  })

  describe('accessibility', () => {
    it('has main landmark', () => {
      render(<Layout><div>Content</div></Layout>)

      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('has navigation region with aria-label', () => {
      render(<Layout><div>Content</div></Layout>)

      // The aside has aria-label="Main navigation"
      const sidebar = screen.getByLabelText('Main navigation')
      expect(sidebar).toBeInTheDocument()
    })

    it('sidebar toggle controls navigation', () => {
      render(<Layout><div>Content</div></Layout>)

      const toggleButton = screen.getByRole('button', { name: /sidebar/i })
      expect(toggleButton).toHaveAttribute('aria-controls', 'sidebar-nav')
    })

    it('navigation has list role', () => {
      render(<Layout><div>Content</div></Layout>)

      expect(screen.getByRole('list')).toBeInTheDocument()
    })
  })
})
