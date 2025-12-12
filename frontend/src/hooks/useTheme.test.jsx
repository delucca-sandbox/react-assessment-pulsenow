/**
 * Unit tests for useTheme custom hook
 * Tests theme context consumption
 */
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTheme } from './useTheme'
import { ThemeProvider } from '../context/ThemeContext'

describe('useTheme', () => {
  const wrapper = ({ children }) => (
    <ThemeProvider>{children}</ThemeProvider>
  )

  it('returns theme context values', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current).toHaveProperty('theme')
    expect(result.current).toHaveProperty('toggleTheme')
    expect(typeof result.current.toggleTheme).toBe('function')
  })

  it('theme is either light or dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(['light', 'dark']).toContain(result.current.theme)
  })

  it('toggleTheme switches between light and dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    
    const initialTheme = result.current.theme
    
    act(() => {
      result.current.toggleTheme()
    })
    
    const newTheme = result.current.theme
    expect(newTheme).not.toBe(initialTheme)
    expect(['light', 'dark']).toContain(newTheme)
    
    // Toggle back
    act(() => {
      result.current.toggleTheme()
    })
    
    expect(result.current.theme).toBe(initialTheme)
  })
})

