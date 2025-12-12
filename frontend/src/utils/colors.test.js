/**
 * Unit tests for colors.js utility functions
 * Tests color and styling utilities for change values, severity, impact, and categories
 */
import { describe, it, expect } from 'vitest'
import {
  getChangeColor,
  getChangeIcon,
  getSeverityClasses,
  getImpactClasses,
  getCategoryClasses
} from './colors'

describe('getChangeColor', () => {
  it('returns green classes for positive values', () => {
    const result = getChangeColor(5.25)
    expect(result).toContain('text-green')
    expect(result).toContain('dark:text-green')
  })

  it('returns red classes for negative values', () => {
    const result = getChangeColor(-5.25)
    expect(result).toContain('text-red')
    expect(result).toContain('dark:text-red')
  })

  it('returns gray classes for zero', () => {
    const result = getChangeColor(0)
    expect(result).toContain('text-gray')
    expect(result).toContain('dark:text-gray')
  })

  it('handles very small positive values', () => {
    const result = getChangeColor(0.001)
    expect(result).toContain('text-green')
  })

  it('handles very small negative values', () => {
    const result = getChangeColor(-0.001)
    expect(result).toContain('text-red')
  })
})

describe('getChangeIcon', () => {
  it('returns up arrow for positive values', () => {
    expect(getChangeIcon(5.25)).toBe('↑')
    expect(getChangeIcon(0.001)).toBe('↑')
  })

  it('returns down arrow for negative values', () => {
    expect(getChangeIcon(-5.25)).toBe('↓')
    expect(getChangeIcon(-0.001)).toBe('↓')
  })

  it('returns right arrow for zero', () => {
    expect(getChangeIcon(0)).toBe('→')
  })
})

describe('getSeverityClasses', () => {
  it('returns correct classes for critical severity', () => {
    const result = getSeverityClasses('critical')
    expect(result).toContain('bg-red')
    expect(result).toContain('text-red')
    expect(result).toContain('border-red')
    expect(result).toContain('dark:')
  })

  it('returns correct classes for high severity', () => {
    const result = getSeverityClasses('high')
    expect(result).toContain('bg-orange')
    expect(result).toContain('text-orange')
    expect(result).toContain('border-orange')
  })

  it('returns correct classes for medium severity', () => {
    const result = getSeverityClasses('medium')
    expect(result).toContain('bg-yellow')
    expect(result).toContain('text-yellow')
    expect(result).toContain('border-yellow')
  })

  it('returns correct classes for low severity', () => {
    const result = getSeverityClasses('low')
    expect(result).toContain('bg-blue')
    expect(result).toContain('text-blue')
    expect(result).toContain('border-blue')
  })

  it('returns default gray classes for unknown severity', () => {
    const result = getSeverityClasses('unknown')
    expect(result).toContain('bg-gray')
    expect(result).toContain('text-gray')
    expect(result).toContain('border-gray')
  })

  it('returns default classes for undefined severity', () => {
    const result = getSeverityClasses(undefined)
    expect(result).toContain('bg-gray')
  })
})

describe('getImpactClasses', () => {
  it('returns correct classes for critical impact', () => {
    const result = getImpactClasses('critical')
    expect(result).toContain('bg-red')
    expect(result).toContain('text-red')
    expect(result).toContain('dark:')
  })

  it('returns correct classes for high impact', () => {
    const result = getImpactClasses('high')
    expect(result).toContain('bg-orange')
    expect(result).toContain('text-orange')
  })

  it('returns correct classes for medium impact', () => {
    const result = getImpactClasses('medium')
    expect(result).toContain('bg-yellow')
    expect(result).toContain('text-yellow')
  })

  it('returns correct classes for low impact', () => {
    const result = getImpactClasses('low')
    expect(result).toContain('bg-green')
    expect(result).toContain('text-green')
  })

  it('returns default gray classes for unknown impact', () => {
    const result = getImpactClasses('unknown')
    expect(result).toContain('bg-gray')
    expect(result).toContain('text-gray')
  })
})

describe('getCategoryClasses', () => {
  it('returns correct classes for macro category', () => {
    const result = getCategoryClasses('macro')
    expect(result).toContain('bg-indigo')
    expect(result).toContain('text-indigo')
    expect(result).toContain('dark:')
  })

  it('returns correct classes for technology category', () => {
    const result = getCategoryClasses('technology')
    expect(result).toContain('bg-cyan')
    expect(result).toContain('text-cyan')
  })

  it('returns correct classes for crypto category', () => {
    const result = getCategoryClasses('crypto')
    expect(result).toContain('bg-purple')
    expect(result).toContain('text-purple')
  })

  it('returns correct classes for earnings category', () => {
    const result = getCategoryClasses('earnings')
    expect(result).toContain('bg-emerald')
    expect(result).toContain('text-emerald')
  })

  it('returns correct classes for regulatory category', () => {
    const result = getCategoryClasses('regulatory')
    expect(result).toContain('bg-amber')
    expect(result).toContain('text-amber')
  })

  it('returns correct classes for market category', () => {
    const result = getCategoryClasses('market')
    expect(result).toContain('bg-slate')
    expect(result).toContain('text-slate')
  })

  it('returns default gray classes for unknown category', () => {
    const result = getCategoryClasses('unknown')
    expect(result).toContain('bg-gray')
    expect(result).toContain('text-gray')
  })

  it('returns default classes for undefined category', () => {
    const result = getCategoryClasses(undefined)
    expect(result).toContain('bg-gray')
  })
})



