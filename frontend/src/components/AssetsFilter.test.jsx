/**
 * Component tests for AssetsFilter
 * Tests filter controls for type and search
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/test-utils'
import AssetsFilter from './AssetsFilter'

describe('AssetsFilter', () => {
  const defaultProps = {
    typeFilter: 'all',
    searchQuery: '',
    onTypeChange: vi.fn(),
    onSearchChange: vi.fn(),
    onClear: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('type filter dropdown', () => {
    it('renders dropdown with correct options', () => {
      render(<AssetsFilter {...defaultProps} />)

      const dropdown = screen.getByRole('combobox', { name: /filter by asset type/i })
      expect(dropdown).toBeInTheDocument()

      expect(screen.getByRole('option', { name: 'All Assets' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Stocks' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Crypto' })).toBeInTheDocument()
    })

    it('shows correct selected value', () => {
      render(<AssetsFilter {...defaultProps} typeFilter="stocks" />)

      const dropdown = screen.getByRole('combobox')
      expect(dropdown.value).toBe('stocks')
    })

    it('calls onTypeChange when selection changes', () => {
      const onTypeChange = vi.fn()
      render(<AssetsFilter {...defaultProps} onTypeChange={onTypeChange} />)

      const dropdown = screen.getByRole('combobox')
      fireEvent.change(dropdown, { target: { value: 'crypto' } })

      expect(onTypeChange).toHaveBeenCalledWith('crypto')
    })

    it.each(['all', 'stocks', 'crypto'])('calls onTypeChange with %s', (type) => {
      const onTypeChange = vi.fn()
      render(<AssetsFilter {...defaultProps} onTypeChange={onTypeChange} />)

      const dropdown = screen.getByRole('combobox')
      fireEvent.change(dropdown, { target: { value: type } })

      expect(onTypeChange).toHaveBeenCalledWith(type)
    })
  })

  describe('search input', () => {
    it('renders search input', () => {
      render(<AssetsFilter {...defaultProps} />)

      const input = screen.getByRole('textbox', { name: /search assets/i })
      expect(input).toBeInTheDocument()
    })

    it('shows placeholder text', () => {
      render(<AssetsFilter {...defaultProps} />)

      const input = screen.getByPlaceholderText('Search by name or symbol...')
      expect(input).toBeInTheDocument()
    })

    it('shows current search value', () => {
      render(<AssetsFilter {...defaultProps} searchQuery="apple" />)

      const input = screen.getByRole('textbox')
      expect(input.value).toBe('apple')
    })

    it('calls onSearchChange when typing', () => {
      const onSearchChange = vi.fn()
      render(<AssetsFilter {...defaultProps} onSearchChange={onSearchChange} />)

      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'bitcoin' } })

      expect(onSearchChange).toHaveBeenCalledWith('bitcoin')
    })

    it('shows clear button when search has value', () => {
      render(<AssetsFilter {...defaultProps} searchQuery="test" />)

      const clearButton = screen.getByRole('button', { name: /clear search/i })
      expect(clearButton).toBeInTheDocument()
    })

    it('hides clear button when search is empty', () => {
      render(<AssetsFilter {...defaultProps} searchQuery="" />)

      expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument()
    })

    it('clears search when clear button clicked', () => {
      const onSearchChange = vi.fn()
      render(<AssetsFilter {...defaultProps} searchQuery="test" onSearchChange={onSearchChange} />)

      const clearButton = screen.getByRole('button', { name: /clear search/i })
      fireEvent.click(clearButton)

      expect(onSearchChange).toHaveBeenCalledWith('')
    })
  })

  describe('clear all filters button', () => {
    it('shows clear filters button when type filter is not all', () => {
      render(<AssetsFilter {...defaultProps} typeFilter="stocks" />)

      expect(screen.getByRole('button', { name: /clear all filters/i })).toBeInTheDocument()
    })

    it('shows clear filters button when search has value', () => {
      render(<AssetsFilter {...defaultProps} searchQuery="test" />)

      expect(screen.getByRole('button', { name: /clear all filters/i })).toBeInTheDocument()
    })

    it('hides clear filters button when no filters active', () => {
      render(<AssetsFilter {...defaultProps} typeFilter="all" searchQuery="" />)

      expect(screen.queryByRole('button', { name: /clear all filters/i })).not.toBeInTheDocument()
    })

    it('calls onClear when clear filters button clicked', () => {
      const onClear = vi.fn()
      render(<AssetsFilter {...defaultProps} typeFilter="stocks" onClear={onClear} />)

      const clearButton = screen.getByRole('button', { name: /clear all filters/i })
      fireEvent.click(clearButton)

      expect(onClear).toHaveBeenCalledTimes(1)
    })
  })

  describe('accessibility', () => {
    it('dropdown has accessible label', () => {
      render(<AssetsFilter {...defaultProps} />)

      const dropdown = screen.getByRole('combobox')
      expect(dropdown).toHaveAttribute('aria-label', 'Filter by asset type')
    })

    it('search input has accessible label', () => {
      render(<AssetsFilter {...defaultProps} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-label', 'Search assets')
    })
  })

  describe('default props', () => {
    it('uses default values when props not provided', () => {
      render(<AssetsFilter />)

      const dropdown = screen.getByRole('combobox')
      expect(dropdown.value).toBe('all')

      const input = screen.getByRole('textbox')
      expect(input.value).toBe('')
    })
  })
})

