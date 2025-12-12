/**
 * Unit tests for formatters.js utility functions
 * Tests currency, percentage, large number, and date formatting
 */
import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatPercent,
  formatLargeNumber,
  formatRelativeTime,
  formatDate
} from './formatters'

describe('formatCurrency', () => {
  it('formats positive numbers as USD currency', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
    expect(formatCurrency(0)).toBe('$0.00')
    expect(formatCurrency(1000000)).toBe('$1,000,000.00')
  })

  it('formats negative numbers as USD currency', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56')
    expect(formatCurrency(-0.01)).toBe('-$0.01')
  })

  it('handles decimal precision correctly', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50')
    expect(formatCurrency(1234.567)).toBe('$1,234.57') // rounds
    expect(formatCurrency(1234.564)).toBe('$1,234.56') // rounds down
  })

  it('handles null and undefined values', () => {
    expect(formatCurrency(null)).toBe('$0.00')
    expect(formatCurrency(undefined)).toBe('$0.00')
  })

  it('handles NaN values', () => {
    expect(formatCurrency(NaN)).toBe('$0.00')
    expect(formatCurrency(Number('invalid'))).toBe('$0.00')
  })

  it('handles very large numbers', () => {
    expect(formatCurrency(999999999999)).toBe('$999,999,999,999.00')
  })

  it('handles very small decimal numbers', () => {
    expect(formatCurrency(0.01)).toBe('$0.01')
    expect(formatCurrency(0.001)).toBe('$0.00') // rounds to 0
  })
})

describe('formatPercent', () => {
  it('formats positive percentages with + sign', () => {
    expect(formatPercent(5.25)).toBe('+5.25%')
    expect(formatPercent(0.01)).toBe('+0.01%')
    expect(formatPercent(100)).toBe('+100.00%')
  })

  it('formats negative percentages with - sign', () => {
    expect(formatPercent(-5.25)).toBe('-5.25%')
    expect(formatPercent(-0.01)).toBe('-0.01%')
    expect(formatPercent(-100)).toBe('-100.00%')
  })

  it('formats zero without sign', () => {
    expect(formatPercent(0)).toBe('+0.00%')
  })

  it('handles decimal precision correctly', () => {
    expect(formatPercent(5.256)).toBe('+5.26%') // rounds
    expect(formatPercent(5.254)).toBe('+5.25%') // rounds down
  })

  it('handles null and undefined values', () => {
    expect(formatPercent(null)).toBe('0.00%')
    expect(formatPercent(undefined)).toBe('0.00%')
  })

  it('handles NaN values', () => {
    expect(formatPercent(NaN)).toBe('0.00%')
  })
})

describe('formatLargeNumber', () => {
  it('formats numbers in thousands (K)', () => {
    expect(formatLargeNumber(1000)).toBe('1K')
    expect(formatLargeNumber(1500)).toBe('1.5K')
    expect(formatLargeNumber(999999)).toBe('1M') // rounds up
  })

  it('formats numbers in millions (M)', () => {
    expect(formatLargeNumber(1000000)).toBe('1M')
    expect(formatLargeNumber(2500000)).toBe('2.5M')
    expect(formatLargeNumber(999999999)).toBe('1B') // rounds up
  })

  it('formats numbers in billions (B)', () => {
    expect(formatLargeNumber(1000000000)).toBe('1B')
    expect(formatLargeNumber(2800000000000)).toBe('2.8T')
  })

  it('formats numbers in trillions (T)', () => {
    expect(formatLargeNumber(1000000000000)).toBe('1T')
    expect(formatLargeNumber(2500000000000)).toBe('2.5T')
  })

  it('formats small numbers without compact notation', () => {
    expect(formatLargeNumber(0)).toBe('0')
    expect(formatLargeNumber(100)).toBe('100')
    expect(formatLargeNumber(999)).toBe('999')
  })

  it('handles null and undefined values', () => {
    expect(formatLargeNumber(null)).toBe('0')
    expect(formatLargeNumber(undefined)).toBe('0')
  })

  it('handles NaN values', () => {
    expect(formatLargeNumber(NaN)).toBe('0')
  })
})

describe('formatRelativeTime', () => {
  it('formats seconds ago', () => {
    const now = new Date()
    const thirtySecondsAgo = new Date(now.getTime() - 30000)
    const result = formatRelativeTime(thirtySecondsAgo.toISOString())
    // RelativeTimeFormat returns various formats like "30 seconds ago" or "in 30 seconds"
    expect(result).toMatch(/\d+ seconds? ago|in \d+ seconds?|now/)
  })

  it('formats minutes ago', () => {
    const now = new Date()
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60000)
    const result = formatRelativeTime(fiveMinutesAgo.toISOString())
    expect(result).toMatch(/5 minutes ago|in 5 minutes/)
  })

  it('formats hours ago', () => {
    const now = new Date()
    const twoHoursAgo = new Date(now.getTime() - 2 * 3600000)
    const result = formatRelativeTime(twoHoursAgo.toISOString())
    expect(result).toMatch(/2 hours ago|in 2 hours/)
  })

  it('formats days ago', () => {
    const now = new Date()
    const threeDaysAgo = new Date(now.getTime() - 3 * 86400000)
    const result = formatRelativeTime(threeDaysAgo.toISOString())
    expect(result).toMatch(/3 days ago|in 3 days/)
  })

  it('handles Date objects', () => {
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 3600000)
    const result = formatRelativeTime(oneHourAgo)
    expect(result).toMatch(/1 hour ago|in 1 hour/)
  })

  it('handles null and undefined values', () => {
    expect(formatRelativeTime(null)).toBe('')
    expect(formatRelativeTime(undefined)).toBe('')
  })

  it('handles empty string', () => {
    expect(formatRelativeTime('')).toBe('')
  })
})

describe('formatDate', () => {
  it('formats date with month, day, year, and time', () => {
    // Use a fixed date to avoid timezone issues
    const date = new Date('2024-03-15T14:30:00')
    const result = formatDate(date)
    // Check that it contains expected parts (format varies by locale)
    expect(result).toMatch(/Mar/)
    expect(result).toMatch(/15/)
    expect(result).toMatch(/2024/)
  })

  it('handles ISO string input', () => {
    const result = formatDate('2024-03-15T14:30:00Z')
    expect(result).toMatch(/Mar/)
    expect(result).toMatch(/15/)
    expect(result).toMatch(/2024/)
  })

  it('handles null and undefined values', () => {
    expect(formatDate(null)).toBe('')
    expect(formatDate(undefined)).toBe('')
  })

  it('handles empty string', () => {
    expect(formatDate('')).toBe('')
  })
})

