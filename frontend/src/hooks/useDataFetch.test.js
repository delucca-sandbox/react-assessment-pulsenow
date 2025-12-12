/**
 * Unit tests for useDataFetch custom hook
 * Tests data fetching, loading states, error handling, and refetch
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useDataFetch } from './useDataFetch'

describe('useDataFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('starts with loading true and no data', () => {
      const mockFetch = vi.fn().mockImplementation(() => new Promise(() => {}))
      const { result } = renderHook(() => useDataFetch(mockFetch))

      expect(result.current.loading).toBe(true)
      expect(result.current.data).toBe(null)
      expect(result.current.error).toBe(null)
    })
  })

  describe('successful data fetching', () => {
    it('fetches data and updates state correctly', async () => {
      const mockData = { items: [1, 2, 3] }
      const mockFetch = vi.fn().mockResolvedValue({ data: mockData })

      const { result } = renderHook(() => useDataFetch(mockFetch))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.data).toEqual(mockData)
      expect(result.current.error).toBe(null)
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it('handles nested data structure (response.data.data)', async () => {
      const mockData = { nested: 'value' }
      const mockFetch = vi.fn().mockResolvedValue({ data: { data: mockData } })

      const { result } = renderHook(() => useDataFetch(mockFetch))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.data).toEqual(mockData)
    })

    it('handles direct data response', async () => {
      const mockData = { direct: 'data' }
      const mockFetch = vi.fn().mockResolvedValue(mockData)

      const { result } = renderHook(() => useDataFetch(mockFetch))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.data).toEqual(mockData)
    })

    it('updates lastUpdated timestamp after successful fetch', async () => {
      const mockFetch = vi.fn().mockResolvedValue({ data: { test: 'data' } })

      const { result } = renderHook(() => useDataFetch(mockFetch))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.lastUpdated).toBeInstanceOf(Date)
    })
  })

  describe('error handling', () => {
    it('handles fetch errors and sets error state', async () => {
      const errorMessage = 'Network error'
      const mockFetch = vi.fn().mockRejectedValue(new Error(errorMessage))

      const { result } = renderHook(() => useDataFetch(mockFetch))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBe(errorMessage)
      expect(result.current.data).toBe(null)
    })

    it('handles errors without message', async () => {
      const mockFetch = vi.fn().mockRejectedValue({})

      const { result } = renderHook(() => useDataFetch(mockFetch))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBe('An error occurred while fetching data')
    })
  })

  describe('refetch functionality', () => {
    it('provides a refetch function that re-fetches data', async () => {
      const mockFetch = vi.fn()
        .mockResolvedValueOnce({ data: { count: 1 } })
        .mockResolvedValueOnce({ data: { count: 2 } })

      const { result } = renderHook(() => useDataFetch(mockFetch))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.data).toEqual({ count: 1 })

      await act(async () => {
        result.current.refetch()
      })

      await waitFor(() => {
        expect(result.current.data).toEqual({ count: 2 })
      })

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })

  describe('dependencies', () => {
    it('refetches when dependencies change', async () => {
      const mockFetch = vi.fn()
        .mockResolvedValueOnce({ data: { id: 1 } })
        .mockResolvedValueOnce({ data: { id: 2 } })

      const { result, rerender } = renderHook(
        ({ dep }) => useDataFetch(mockFetch, [dep]),
        { initialProps: { dep: 'a' } }
      )

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.data).toEqual({ id: 1 })

      rerender({ dep: 'b' })

      await waitFor(() => {
        expect(result.current.data).toEqual({ id: 2 })
      })

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })
})
