# Quickstart Guide: Pulse Frontend Pages

**Feature**: 001-pulse-frontend-pages | **Date**: 2025-12-11

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Project Setup

### 1. Clone and Install Dependencies

```bash
# From project root
cd /home/delucca/Workspaces/src/sandbox/interviews/react-assessment-pulsenow

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start Development Servers

**Terminal 1 - Backend API** (port 3001):
```bash
cd backend
npm run dev
# Or: node server.js
```

**Terminal 2 - Frontend** (port 5173):
```bash
cd frontend
npm run dev
```

### 3. Access the Application

- Frontend: http://localhost:5173
- API Base: http://localhost:5173/api (proxied to backend)

---

## Project Structure Overview

```
frontend/src/
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point
├── index.css            # Tailwind imports
├── components/          # Reusable components
│   └── Layout.jsx       # Navigation shell (existing)
├── pages/               # Route components (to implement)
│   ├── Dashboard.jsx
│   ├── Assets.jsx
│   ├── News.jsx
│   ├── Alerts.jsx
│   └── Portfolio.jsx
└── services/
    └── api.js           # Axios client (DO NOT MODIFY)
```

---

## API Reference

All API calls use functions from `src/services/api.js`. Response format:

```javascript
{
  success: true,
  data: { /* response data */ },
  count: 5,  // for array responses
  pagination: { page, limit, total, totalPages }
}
```

### Available API Functions

| Function | Endpoint | Description |
|----------|----------|-------------|
| `getDashboard()` | GET /api/dashboard | Dashboard aggregated data |
| `getStocks()` | GET /api/stocks | All stocks with filters |
| `getStock(symbol)` | GET /api/stocks/:symbol | Single stock details |
| `getCrypto()` | GET /api/crypto | All cryptocurrencies |
| `getCryptoBySymbol(symbol)` | GET /api/crypto/:symbol | Single crypto details |
| `getPortfolio()` | GET /api/portfolio | User portfolio |
| `getNews(params)` | GET /api/news | News with filters |
| `getAlerts(params)` | GET /api/alerts | Alerts with filters |

### Query Parameters

**Filtering**:
- `?category=macro` - Filter news by category
- `?severity=critical` - Filter alerts by severity
- `?type=stock` - Filter assets by type
- `?search=apple` - Search by name/symbol

**Sorting**:
- `?sort=price&order=desc` - Sort by field

**Pagination**:
- `?page=1&limit=10` - Paginate results

---

## Implementation Checklist

### Per-Component Checklist (Constitution Compliance)

Before marking any component complete, verify:

- [ ] Functional component with hooks (no class components)
- [ ] Loading skeleton displayed during fetch
- [ ] Error message with retry button on API failure
- [ ] Empty state message when no data
- [ ] Green for gains, red for losses (with icons ↑↓)
- [ ] Keyboard accessible interactive elements
- [ ] Responsive layout (test at 768px breakpoint)
- [ ] No console errors or warnings
- [ ] Tailwind CSS only (no custom CSS)

### Page Implementation Order (Recommended)

1. **Dashboard** - Entry point, portfolio summary, top movers, news, alerts
2. **Assets** - Table/card view, filters, sort, search, modal detail
3. **Portfolio** - Value summary, pie chart, holdings table
4. **News** - Card grid, category filter, responsive columns
5. **Alerts** - Severity groups, collapsible sections

---

## Code Patterns

### Data Fetching Pattern

```javascript
import { useState, useEffect } from 'react'
import { getDashboard } from '../services/api'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getDashboard()
      setData(response.data.data)
    } catch (err) {
      setError(err.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />
  if (!data) return <EmptyState />

  return (
    <div>
      {/* Render data */}
    </div>
  )
}
```

### Auto-Refresh Pattern

```javascript
useEffect(() => {
  fetchData() // Initial fetch
  
  const interval = setInterval(fetchData, 30000) // 30 seconds
  return () => clearInterval(interval)
}, [])
```

### Color Coding Helpers

```javascript
// utils/formatters.js
export const getChangeColor = (value) => 
  value >= 0 ? 'text-green-600' : 'text-red-600'

export const getChangeIcon = (value) => 
  value >= 0 ? '↑' : '↓'

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)

export const formatPercent = (value) =>
  `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
```

### Severity Badge Pattern

```javascript
const getSeverityClasses = (severity) => ({
  critical: 'bg-red-100 text-red-800',
  high: 'bg-orange-100 text-orange-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-blue-100 text-blue-800'
}[severity])

// Usage
<span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityClasses(alert.severity)}`}>
  {alert.severity}
</span>
```

---

## Testing

### Manual Testing Steps

1. **Loading States**: Throttle network in DevTools → Network → Slow 3G
2. **Error States**: Block API in DevTools → Network → Block request URL
3. **Responsive**: DevTools → Toggle device toolbar → Test at 320px, 768px, 1024px
4. **Accessibility**: Use Tab key to navigate all interactive elements
5. **Dark Mode**: Toggle theme and verify all pages render correctly

### Browser Console Checks

- No React errors or warnings
- No failed network requests (except intentional blocks)
- No accessibility warnings

---

## Troubleshooting

### Common Issues

**API returns 404**:
- Ensure backend is running on port 3001
- Check Vite proxy config in `vite.config.js`

**Styles not applying**:
- Verify Tailwind is processing files in `tailwind.config.js` content array
- Check for typos in class names

**Data not updating**:
- Check auto-refresh interval is set
- Verify state is being updated correctly

**Modal not closing**:
- Ensure click handler on backdrop
- Check state management for modalOpen

---

## Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/en-US/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- Constitution: `.specify/memory/constitution.md`
- Feature Spec: `specs/001-pulse-frontend-pages/spec.md`
- Data Model: `specs/001-pulse-frontend-pages/data-model.md`


