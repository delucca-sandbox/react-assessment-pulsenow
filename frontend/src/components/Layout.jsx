import { NavLink } from 'react-router-dom'
import { useState, useCallback } from 'react'
import MetaMaskButton from './MetaMaskButton'
import ThemeToggle from './ThemeToggle'

const NAVIGATION = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Assets', path: '/assets', icon: '💰' },
  { name: 'News', path: '/news', icon: '📰' },
  { name: 'Alerts', path: '/alerts', icon: '🔔' },
  { name: 'Portfolio', path: '/portfolio', icon: '💼' },
]

/**
 * Layout - Main application layout with header, sidebar navigation, and content area
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content to render in main area
 */
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                type="button"
                onClick={toggleSidebar}
                className="mr-3 p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pulse-primary transition-colors"
                aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                aria-expanded={sidebarOpen}
                aria-controls="sidebar-nav"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={sidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} 
                  />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-pulse-primary">Pulse</h1>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">Market Monitoring Engine</span>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <MetaMaskButton />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          data-testid="sidebar"
          className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-4rem)] transition-all duration-300`}
        >
          <nav id="sidebar-nav" aria-label="Main navigation" className="p-4">
            <ul className="space-y-2" role="list">
              {NAVIGATION.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center ${sidebarOpen ? 'space-x-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pulse-primary ${
                        isActive
                          ? 'bg-pulse-primary text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    <span className="text-xl" aria-hidden="true">{item.icon}</span>
                    {sidebarOpen && <span>{item.name}</span>}
                    {!sidebarOpen && <span className="sr-only">{item.name}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
