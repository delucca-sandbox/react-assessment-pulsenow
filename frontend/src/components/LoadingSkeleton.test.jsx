/**
 * Component tests for LoadingSkeleton and related skeleton components
 * Tests loading state display components
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/test-utils'
import LoadingSkeleton, { SkeletonCard, SkeletonTable } from './LoadingSkeleton'

describe('LoadingSkeleton', () => {
  describe('rendering', () => {
    it('renders with aria-hidden by default', () => {
      render(<LoadingSkeleton />)

      const skeleton = screen.queryByRole('status')
      expect(skeleton).not.toBeInTheDocument() // Should be hidden by default
    })

    it('has animate-pulse class', () => {
      render(<LoadingSkeleton role="status" aria-hidden={false} />)

      const skeleton = screen.getByRole('status')
      expect(skeleton.className).toContain('animate-pulse')
    })

    it('has background color classes', () => {
      render(<LoadingSkeleton role="status" aria-hidden={false} />)

      const skeleton = screen.getByRole('status')
      expect(skeleton.className).toContain('bg-gray-200')
    })
  })

  describe('variants', () => {
    it('rectangle variant has rounded class', () => {
      render(<LoadingSkeleton variant="rectangle" role="status" aria-hidden={false} />)

      const skeleton = screen.getByRole('status')
      expect(skeleton.className).toContain('rounded')
    })

    it('circle variant has rounded-full class', () => {
      render(<LoadingSkeleton variant="circle" role="status" aria-hidden={false} />)

      const skeleton = screen.getByRole('status')
      expect(skeleton.className).toContain('rounded-full')
    })

    it('text variant has rounded and h-4 classes', () => {
      render(<LoadingSkeleton variant="text" role="status" aria-hidden={false} />)

      const skeleton = screen.getByRole('status')
      expect(skeleton.className).toContain('rounded')
      expect(skeleton.className).toContain('h-4')
    })

    it('defaults to rectangle variant', () => {
      render(<LoadingSkeleton role="status" aria-hidden={false} />)

      const skeleton = screen.getByRole('status')
      expect(skeleton.className).toContain('rounded')
      expect(skeleton.className).not.toContain('rounded-full')
    })
    
    it('validates invalid variant and falls back to rectangle', () => {
      render(<LoadingSkeleton variant="invalid" role="status" aria-hidden={false} />)

      const skeleton = screen.getByRole('status')
      expect(skeleton.className).toContain('rounded')
      expect(skeleton.className).not.toContain('rounded-full')
    })
  })

  describe('custom className', () => {
    it('applies custom className', () => {
      render(<LoadingSkeleton className="h-10 w-32" role="status" aria-hidden={false} />)

      const skeleton = screen.getByRole('status')
      expect(skeleton.className).toContain('h-10')
      expect(skeleton.className).toContain('w-32')
    })

    it('combines custom className with base classes', () => {
      render(<LoadingSkeleton className="custom-class" role="status" aria-hidden={false} />)

      const skeleton = screen.getByRole('status')
      expect(skeleton.className).toContain('animate-pulse')
      expect(skeleton.className).toContain('custom-class')
    })
  })

  describe('accessibility', () => {
    it('can expose status role when explicitly set', () => {
      render(<LoadingSkeleton role="status" aria-hidden={false} />)

      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('is hidden from screen readers by default', () => {
      const { container } = render(<LoadingSkeleton />)

      const skeleton = container.firstChild
      expect(skeleton).toHaveAttribute('aria-hidden', 'true')
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
      const { container } = render(<SkeletonCard />)

      // SkeletonCard contains multiple LoadingSkeleton divs (aria-hidden by default)
      const skeletons = container.querySelectorAll('.animate-pulse')
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
      const { container } = render(<SkeletonTable rows={1} cols={4} />)

      const skeletons = container.querySelectorAll('.animate-pulse')
      // 4 in header + 4 in 1 row = 8
      expect(skeletons.length).toBe(8)
    })

    it('renders custom number of columns', () => {
      const { container } = render(<SkeletonTable rows={1} cols={6} />)

      const skeletons = container.querySelectorAll('.animate-pulse')
      // 6 in header + 6 in 1 row = 12
      expect(skeletons.length).toBe(12)
    })
  })
})

