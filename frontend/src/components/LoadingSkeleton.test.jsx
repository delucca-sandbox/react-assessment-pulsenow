/**
 * Component tests for LoadingSkeleton and related skeleton components
 * Tests loading state display components
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/test-utils'
import LoadingSkeleton, { SkeletonCard, SkeletonTable } from './LoadingSkeleton'

describe('LoadingSkeleton', () => {
  describe('rendering', () => {
    it('renders a div element', () => {
      const { container } = render(<LoadingSkeleton />)

      expect(container.querySelector('div')).toBeInTheDocument()
    })

    it('has animate-pulse class', () => {
      const { container } = render(<LoadingSkeleton />)

      const skeleton = container.firstChild
      expect(skeleton.className).toContain('animate-pulse')
    })

    it('has background color classes', () => {
      const { container } = render(<LoadingSkeleton />)

      const skeleton = container.firstChild
      expect(skeleton.className).toContain('bg-gray')
    })
  })

  describe('variants', () => {
    it('rectangle variant has rounded class', () => {
      const { container } = render(<LoadingSkeleton variant="rectangle" />)

      const skeleton = container.firstChild
      expect(skeleton.className).toContain('rounded')
    })

    it('circle variant has rounded-full class', () => {
      const { container } = render(<LoadingSkeleton variant="circle" />)

      const skeleton = container.firstChild
      expect(skeleton.className).toContain('rounded-full')
    })

    it('text variant has rounded and h-4 classes', () => {
      const { container } = render(<LoadingSkeleton variant="text" />)

      const skeleton = container.firstChild
      expect(skeleton.className).toContain('rounded')
      expect(skeleton.className).toContain('h-4')
    })

    it('defaults to rectangle variant', () => {
      const { container } = render(<LoadingSkeleton />)

      const skeleton = container.firstChild
      expect(skeleton.className).toContain('rounded')
      expect(skeleton.className).not.toContain('rounded-full')
    })
  })

  describe('custom className', () => {
    it('applies custom className', () => {
      const { container } = render(<LoadingSkeleton className="h-10 w-32" />)

      const skeleton = container.firstChild
      expect(skeleton.className).toContain('h-10')
      expect(skeleton.className).toContain('w-32')
    })

    it('combines custom className with base classes', () => {
      const { container } = render(<LoadingSkeleton className="custom-class" />)

      const skeleton = container.firstChild
      expect(skeleton.className).toContain('animate-pulse')
      expect(skeleton.className).toContain('custom-class')
    })
  })

  describe('accessibility', () => {
    it('has status role', () => {
      render(<LoadingSkeleton />)

      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('has aria-label', () => {
      render(<LoadingSkeleton />)

      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveAttribute('aria-label', 'Loading...')
    })
  })
})

describe('SkeletonCard', () => {
  describe('rendering', () => {
    it('renders a card container', () => {
      const { container } = render(<SkeletonCard />)

      const card = container.firstChild
      expect(card.className).toContain('bg-white')
      expect(card.className).toContain('rounded-lg')
      expect(card.className).toContain('shadow-sm')
    })

    it('renders multiple skeleton lines', () => {
      render(<SkeletonCard />)

      const skeletons = screen.getAllByRole('status')
      expect(skeletons.length).toBeGreaterThan(1)
    })

    it('applies custom className', () => {
      const { container } = render(<SkeletonCard className="custom-card" />)

      const card = container.firstChild
      expect(card.className).toContain('custom-card')
    })
  })
})

describe('SkeletonTable', () => {
  describe('rendering', () => {
    it('renders a table container', () => {
      const { container } = render(<SkeletonTable />)

      const table = container.firstChild
      expect(table.className).toContain('bg-white')
      expect(table.className).toContain('rounded-lg')
    })

    it('renders default 5 rows', () => {
      const { container } = render(<SkeletonTable />)

      // Header + 5 rows = 6 row containers
      const rows = container.querySelectorAll('.border-b')
      expect(rows.length).toBe(6) // 1 header + 5 body rows
    })

    it('renders custom number of rows', () => {
      const { container } = render(<SkeletonTable rows={3} />)

      const rows = container.querySelectorAll('.border-b')
      expect(rows.length).toBe(4) // 1 header + 3 body rows
    })

    it('renders default 4 columns', () => {
      render(<SkeletonTable rows={1} cols={4} />)

      const skeletons = screen.getAllByRole('status')
      // 4 in header + 4 in 1 row = 8
      expect(skeletons.length).toBe(8)
    })

    it('renders custom number of columns', () => {
      render(<SkeletonTable rows={1} cols={6} />)

      const skeletons = screen.getAllByRole('status')
      // 6 in header + 6 in 1 row = 12
      expect(skeletons.length).toBe(12)
    })
  })
})

