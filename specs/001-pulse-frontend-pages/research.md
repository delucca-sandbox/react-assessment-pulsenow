# Research: Pulse Frontend Pages

**Feature**: 001-pulse-frontend-pages | **Date**: 2025-12-11

## Research Summary

This document consolidates research findings for implementing the Pulse frontend pages. All technology choices and patterns are resolved based on codebase analysis, spec requirements, and constitution principles.

---

## 1. State Management Approach

### Decision: Native React Hooks + Context API

**Rationale**: The spec suggests React Query (TanStack Query) for server state, but it's NOT installed in package.json. Per constitution Principle VIII (Simplicity First), adding new dependencies should be avoided when native solutions suffice.

**Alternatives Considered**:
- **React Query (TanStack Query)**: Powerful server state management with built-in caching, but requires adding dependency
- **SWR**: Similar to React Query, also requires new dependency
- **Native hooks (useState/useEffect)**: Already available, sufficient for assessment scope

**Implementation Pattern**:
```javascript
// Custom hook for data fetching with loading/error states
const useDataFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    let cancelled = false
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetchFn()
        if (!cancelled) setData(response.data.data)
      } catch (err) {
        if (!cancelled) setError(err.message || 'An error occurred')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchData()
    return () => { cancelled = true }
  }, deps)
  
  return { data, loading, error, refetch: () => {} }
}
```

---

## 2. Auto-Refresh Implementation

### Decision: useEffect with setInterval (30 seconds)

**Rationale**: FR-032 requires 30-second auto-refresh. Native setInterval with cleanup is sufficient.

**Implementation Pattern**:
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    refetch()
  }, 30000) // 30 seconds
  
  return () => clearInterval(interval)
}, [])
```

**Edge Case Handling**:
- Prevent redundant fetches if one is in progress
- Update "last updated" timestamp on each refresh
- No layout shifts (keep skeleton dimensions consistent)

---

## 3. Theme/Dark Mode Implementation

### Decision: React Context + localStorage + CSS Variables

**Rationale**: FR-029 through FR-031 require dark mode toggle with persistence and system preference detection.

**Implementation**:
1. ThemeContext provides theme state globally
2. localStorage persists preference across sessions
3. `prefers-color-scheme` media query detects system preference
4. Tailwind's `dark:` variants handle styling

**Pattern**:
```javascript
// ThemeContext.jsx
const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  
  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

**Tailwind Config Update Required**:
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...existing config
}
```

---

## 4. API Endpoint Mapping

### Decision: Use existing api.js service functions

**Endpoints Available** (from api.js analysis):

| Page | API Functions | Endpoint |
|------|---------------|----------|
| Dashboard | `getDashboard()` | GET /api/dashboard |
| Assets | `getStocks()`, `getCrypto()` | GET /api/stocks, GET /api/crypto |
| Assets Detail | `getStock(symbol)`, `getCryptoBySymbol(symbol)` | GET /api/stocks/:symbol, GET /api/crypto/:symbol |
| Portfolio | `getPortfolio()` | GET /api/portfolio |
| News | `getNews(params)` | GET /api/news?category=X |
| Alerts | `getAlerts(params)` | GET /api/alerts |

**Note**: api.js already exists and should NOT be modified per constitution.

---

## 5. Responsive Design Breakpoints

### Decision: Mobile-first with Tailwind breakpoints

**Breakpoints** (from spec):
- Mobile: < 768px (card view for tables)
- Tablet: 768px - 1023px (2-column grid for news)
- Desktop: ≥ 1024px (table view, 3-column grid)

**Implementation**:
```jsx
// Example: Assets table/card toggle
<div className="hidden md:block">
  {/* Table view for desktop */}
</div>
<div className="md:hidden">
  {/* Card view for mobile */}
</div>
```

---

## 6. Chart Implementation with Recharts

### Decision: Use Recharts (already installed)

**Required Charts**:
1. **PriceChart** (LineChart) - Asset detail modal
2. **AllocationChart** (PieChart) - Portfolio page

**Pattern**:
```jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const PriceChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <XAxis dataKey="timestamp" />
      <YAxis domain={['auto', 'auto']} />
      <Tooltip />
      <Line type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
)
```

---

## 7. Color Coding Standards

### Decision: Follow constitution V. Color Coding Standards

**Colors** (from constitution):
- Positive/Gains: `text-green-600` or `bg-green-100 text-green-800`
- Negative/Losses: `text-red-600` or `bg-red-100 text-red-800`
- Neutral: `text-gray-600`

**Severity Badges**:
- Critical: `bg-red-100 text-red-800 border-red-200`
- High: `bg-orange-100 text-orange-800 border-orange-200`
- Medium: `bg-yellow-100 text-yellow-800 border-yellow-200`
- Low: `bg-blue-100 text-blue-800 border-blue-200`

**Helper Function**:
```javascript
export const getChangeColor = (value) => value >= 0 ? 'text-green-600' : 'text-red-600'
export const formatChange = (value) => value >= 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`

export const getSeverityClasses = (severity) => ({
  critical: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-blue-100 text-blue-800 border-blue-200'
}[severity] || 'bg-gray-100 text-gray-800')
```

---

## 8. Accessibility Requirements

### Decision: WCAG 2.1 AA compliance patterns

**Implementation Checklist**:
1. **Keyboard Navigation**: All interactive elements focusable with visible focus states
2. **Color Independence**: Icons/arrows accompany color-coded values (↑ for gains, ↓ for losses)
3. **Screen Readers**: Proper ARIA labels, semantic HTML, alt text
4. **Focus Management**: Modal trap focus, skip links
5. **Touch Targets**: Min 44x44px on mobile

**Pattern Examples**:
```jsx
// Color-independent change indicator
<span className={getChangeColor(change)}>
  {change >= 0 ? '↑' : '↓'} {formatChange(change)}
</span>

// Accessible modal
<dialog role="dialog" aria-labelledby="modal-title" aria-modal="true">
  <h2 id="modal-title">Asset Details</h2>
  {/* content */}
</dialog>

// Focus visible
className="focus:outline-none focus:ring-2 focus:ring-pulse-primary focus:ring-offset-2"
```

---

## 9. Loading Skeleton Pattern

### Decision: Animated skeleton components with consistent sizing

**Pattern**:
```jsx
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
)

// Usage in Dashboard
const DashboardSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-24 w-full" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
    </div>
  </div>
)
```

---

## 10. Error Handling Pattern

### Decision: User-friendly error messages with retry button

**Pattern**:
```jsx
const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
    <p className="text-red-800 mb-4">{message || 'Something went wrong'}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:ring-2 focus:ring-red-500"
      >
        Try Again
      </button>
    )}
  </div>
)
```

---

## 11. Currency/Number Formatting

### Decision: Intl.NumberFormat with consistent patterns

**Pattern**:
```javascript
export const formatCurrency = (value) => 
  new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(value)

export const formatLargeNumber = (value) => 
  new Intl.NumberFormat('en-US', { 
    notation: 'compact',
    maximumFractionDigits: 1 
  }).format(value)

export const formatPercent = (value) => 
  `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`

export const formatRelativeTime = (timestamp) => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const diff = (new Date(timestamp) - new Date()) / 1000
  if (Math.abs(diff) < 60) return rtf.format(Math.round(diff), 'second')
  if (Math.abs(diff) < 3600) return rtf.format(Math.round(diff / 60), 'minute')
  if (Math.abs(diff) < 86400) return rtf.format(Math.round(diff / 3600), 'hour')
  return rtf.format(Math.round(diff / 86400), 'day')
}
```

---

## Research Conclusions

| Item | Resolution | Confidence |
|------|------------|------------|
| State Management | Native hooks + Context (no React Query) | High |
| Auto-Refresh | setInterval with 30s timer | High |
| Theme System | Context + localStorage + Tailwind dark: | High |
| API Integration | Use existing api.js functions | High |
| Responsive Design | Mobile-first, md: breakpoint at 768px | High |
| Charts | Recharts LineChart + PieChart | High |
| Color Coding | Constitution-defined colors | High |
| Accessibility | WCAG 2.1 AA patterns | High |
| Formatters | Intl.NumberFormat utilities | High |

**All NEEDS CLARIFICATION items resolved.** Ready for Phase 1: Design & Contracts.


