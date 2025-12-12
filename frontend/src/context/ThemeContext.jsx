import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // SSR-safe theme initialization
    if (typeof window === 'undefined') return 'light'
    
    try {
      // Check localStorage first
      const stored = localStorage.getItem('pulse-theme')
      if (stored) return stored
      // Fall back to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      // Persist to localStorage
      localStorage.setItem('pulse-theme', theme)
      // Apply/remove dark class on document
      document.documentElement.classList.toggle('dark', theme === 'dark')
    } catch {
      // Silently fail in environments without localStorage
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}


