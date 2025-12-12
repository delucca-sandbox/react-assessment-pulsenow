/**
 * Test utilities and custom render function
 * Wraps components with necessary providers for testing
 */
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../src/context/ThemeContext'

/**
 * Custom render function that wraps components with providers
 * @param {React.ReactElement} ui - Component to render
 * @param {Object} options - Render options
 * @returns {Object} Render result with all RTL queries
 */
const customRender = (ui, options = {}) => {
  const { route = '/', ...renderOptions } = options

  // Set initial route
  window.history.pushState({}, 'Test page', route)

  const AllProviders = ({ children }) => (
    <ThemeProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ThemeProvider>
  )

  return render(ui, { wrapper: AllProviders, ...renderOptions })
}

/**
 * Render without providers (for isolated component testing)
 */
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: BrowserRouter })
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { customRender as render, renderWithRouter }

