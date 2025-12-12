/**
 * Test utilities and custom render function
 * Wraps components with necessary providers for testing
 */
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../src/context/ThemeContext'

/**
 * Custom render function that wraps components with providers
 * @param {React.ReactElement} ui - Component to render
 * @param {Object} options - Render options
 * @returns {Object} Render result with all RTL queries
 */
const customRender = (ui, options = {}) => {
  const { route = '/', ...renderOptions } = options

  const AllProviders = ({ children }) => (
    <ThemeProvider>
      <MemoryRouter initialEntries={[route]}>
        {children}
      </MemoryRouter>
    </ThemeProvider>
  )

  return render(ui, { wrapper: AllProviders, ...renderOptions })
}

/**
 * Render without providers (for isolated component testing)
 */
const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(ui, { 
    wrapper: ({ children }) => <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  })
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { customRender as render, renderWithRouter }

