/**
 * Component tests for ThemeToggle
 * Tests theme switching functionality
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeContext } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  const renderWithTheme = (theme = 'light', toggleTheme = vi.fn()) => {
    return render(
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    )
  }

  describe('rendering', () => {
    it('renders toggle button', () => {
      renderWithTheme()

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('shows moon icon in light mode', () => {
      renderWithTheme('light')

      // Moon icon should be visible (for switching to dark)
      const button = screen.getByRole('button')
      const svg = button.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('shows sun icon in dark mode', () => {
      renderWithTheme('dark')

      // Sun icon should be visible (for switching to light)
      const button = screen.getByRole('button')
      const svg = button.querySelector('svg')
      expect(svg).toBeInTheDocument()
      // The sun icon has text-yellow-400 class - use getAttribute for SVG elements
      expect(svg.getAttribute('class')).toContain('text-yellow')
    })
  })

  describe('interactions', () => {
    it('calls toggleTheme when clicked', () => {
      const toggleTheme = vi.fn()
      renderWithTheme('light', toggleTheme)

      fireEvent.click(screen.getByRole('button'))

      expect(toggleTheme).toHaveBeenCalledTimes(1)
    })

    it('can toggle multiple times', () => {
      const toggleTheme = vi.fn()
      renderWithTheme('light', toggleTheme)

      const button = screen.getByRole('button')
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      expect(toggleTheme).toHaveBeenCalledTimes(3)
    })
  })

  describe('accessibility', () => {
    it('has accessible label in light mode', () => {
      renderWithTheme('light')

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    })

    it('has accessible label in dark mode', () => {
      renderWithTheme('dark')

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
    })

    it('icons are hidden from screen readers', () => {
      renderWithTheme('light')

      const svg = screen.getByRole('button').querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
