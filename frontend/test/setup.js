/**
 * Test setup file for Vitest + React Testing Library
 * This file runs before all tests
 */
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

// Mock window.matchMedia for dark mode tests (configurable)
let matchMediaMatches = false
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: query.includes('dark') ? matchMediaMatches : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Helper to set matchMedia preference
window.setMediaQueryPreference = (prefersDark) => {
  matchMediaMatches = prefersDark
}

// Mock localStorage with stateful implementation
const localStorageStore = new Map()
const localStorageMock = {
  getItem: vi.fn((key) => localStorageStore.get(key) || null),
  setItem: vi.fn((key, value) => localStorageStore.set(key, String(value))),
  removeItem: vi.fn((key) => localStorageStore.delete(key)),
  clear: vi.fn(() => localStorageStore.clear()),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Clear localStorage between tests
afterEach(() => {
  localStorageStore.clear()
  matchMediaMatches = false
})

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor() {
    this.observe = vi.fn()
    this.unobserve = vi.fn()
    this.disconnect = vi.fn()
  }
}
window.IntersectionObserver = MockIntersectionObserver

// Mock ResizeObserver for Recharts
class MockResizeObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
window.ResizeObserver = MockResizeObserver

// Suppress console errors during tests (optional, remove if you want to see errors)
// vi.spyOn(console, 'error').mockImplementation(() => {})

