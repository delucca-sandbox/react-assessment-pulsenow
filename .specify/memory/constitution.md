<!--
SYNC IMPACT REPORT
==================
Version change: N/A → 1.0.0 (Initial constitution)

Added principles:
- I. Clean React Code
- II. User Experience Consistency
- III. Performance Standards
- IV. Visual Design Consistency
- V. Color Coding Standards
- VI. Accessibility & Responsive Design
- VII. Backend Immutability
- VIII. Simplicity First

Added sections:
- Technical Standards
- Development Workflow
- Governance

Templates checked:
- ✅ .specify/templates/plan-template.md (compatible)
- ✅ .specify/templates/spec-template.md (compatible)
- ✅ .specify/templates/tasks-template.md (compatible)

Follow-up TODOs: None
-->

# Pulse Platform Frontend Constitution

## Core Principles

### I. Clean React Code

All frontend code MUST use functional components with React hooks. Class components are prohibited.

**Non-negotiable rules:**
- Components MUST be functional using `useState`, `useEffect`, `useCallback`, `useMemo` where appropriate
- Each component MUST have a single responsibility
- Custom hooks MUST be extracted for reusable stateful logic
- Props MUST be destructured at the function signature level
- Component files MUST follow naming convention: `PascalCase.jsx`
- Avoid prop drilling beyond 2 levels; use Context API or composition patterns instead

**Rationale**: Functional components with hooks provide cleaner, more testable code with better performance characteristics through automatic optimization by React.

### II. User Experience Consistency

Every data-fetching operation MUST provide visual feedback to users through loading states and error handling.

**Non-negotiable rules:**
- All async operations MUST display a loading indicator (spinner, skeleton, or placeholder)
- All API errors MUST be caught and displayed with user-friendly messages
- Error states MUST provide actionable guidance when possible (e.g., "Try again" button)
- Empty states MUST be handled with meaningful messages, not blank screens
- Loading states MUST prevent duplicate submissions/requests

**Implementation pattern:**
```javascript
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
```

**Rationale**: Users should never wonder if the application is working. Clear feedback builds trust and improves perceived performance.

### III. Performance Standards

Data fetching and rendering MUST be efficient to ensure smooth user experience.

**Non-negotiable rules:**
- API calls MUST only be made when necessary (on mount, on user action, or on dependency change)
- Avoid fetching the same data multiple times within a session without caching strategy
- Lists with more than 20 items SHOULD implement pagination or lazy loading
- Expensive computations MUST use `useMemo`
- Callbacks passed to child components SHOULD use `useCallback` to prevent unnecessary re-renders
- Components MUST NOT cause unnecessary re-renders of sibling or parent components

**Rationale**: Performance directly impacts user satisfaction and is critical for market monitoring applications where data freshness matters.

### IV. Visual Design Consistency

All styling MUST use Tailwind CSS utility classes exclusively. Custom CSS is prohibited unless absolutely necessary.

**Non-negotiable rules:**
- Use Tailwind utility classes for all styling
- Maintain consistent spacing scale: `p-2`, `p-4`, `p-6`, `m-2`, `m-4`, `m-6`
- Use semantic color classes from Tailwind palette
- Card components MUST use consistent patterns: `rounded-lg shadow-md p-4 bg-white`
- Typography MUST follow hierarchy: `text-2xl font-bold` for titles, `text-lg font-semibold` for subtitles, `text-sm text-gray-600` for secondary text
- Buttons MUST use consistent styling patterns with hover states

**Rationale**: Tailwind CSS provides a consistent design system out of the box and eliminates CSS specificity issues while enabling rapid development.

### V. Color Coding Standards

Financial data MUST use consistent color coding to indicate positive and negative values.

**Non-negotiable rules:**
- Positive values (gains, increases): `text-green-600` or `bg-green-100 text-green-800`
- Negative values (losses, decreases): `text-red-600` or `bg-red-100 text-red-800`
- Neutral values: `text-gray-600`
- Severity badges MUST follow: `critical` = red, `high` = orange, `medium` = yellow, `low` = green
- Impact indicators MUST be visually distinct and consistent across all pages

**Implementation helper:**
```javascript
const getChangeColor = (value) => value >= 0 ? 'text-green-600' : 'text-red-600'
const formatChange = (value) => value >= 0 ? `+${value}` : `${value}`
```

**Rationale**: In financial applications, users rely on color to quickly assess market conditions. Inconsistent coloring causes confusion and potential errors.

### VI. Accessibility & Responsive Design

All components MUST be accessible and work across different screen sizes.

**Non-negotiable rules:**
- All interactive elements MUST be keyboard accessible
- Images MUST have `alt` attributes
- Form inputs MUST have associated labels
- Color MUST NOT be the only means of conveying information (add icons or text)
- Touch targets MUST be at least 44x44 pixels on mobile
- Layout MUST be responsive: mobile-first using Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- Tables MUST have responsive alternatives for mobile (cards or horizontal scroll)

**Rationale**: Accessibility ensures the application is usable by all users and responsive design ensures usability across devices.

### VII. Backend Immutability

The backend code MUST NOT be modified under any circumstances.

**Non-negotiable rules:**
- No changes to files in the `backend/` directory
- No modifications to API endpoints, controllers, services, or mock data
- Frontend MUST adapt to the existing API structure
- If backend limitations are encountered, work around them on the frontend
- Document any backend assumptions in code comments

**Rationale**: This is an assessment project with a pre-built backend. Modifying it violates the assessment constraints and demonstrates inability to work within given boundaries.

### VIII. Simplicity First

Favor simple, working solutions over complex or over-engineered implementations.

**Non-negotiable rules:**
- Do NOT add features beyond what is explicitly required
- Do NOT implement complex state management (Redux, Zustand) unless explicitly needed
- Do NOT add unnecessary abstractions or wrapper components
- Do NOT optimize prematurely; make it work first, then optimize if needed
- Each component SHOULD be understandable in under 2 minutes
- If a solution requires more than 100 lines, consider if it's too complex

**Anti-patterns to avoid:**
- Creating utility files for single-use functions
- Building "flexible" components that only have one use case
- Adding configuration options that won't be used
- Implementing patterns "for future extensibility"

**Rationale**: Simple code is easier to read, test, debug, and maintain. Over-engineering wastes time and creates unnecessary complexity.

## Technical Standards

### Technology Stack (Frontend Only)

- **Framework**: React with functional components
- **Routing**: React Router (already configured)
- **HTTP Client**: Axios via `src/services/api.js` (already configured)
- **Styling**: Tailwind CSS (already configured)
- **Charts**: Recharts (optional, for data visualization)
- **Build Tool**: Vite (already configured)

### File Organization

```
frontend/src/
├── components/     # Reusable UI components
├── pages/          # Route page components
├── services/       # API service functions (DO NOT MODIFY api.js)
├── hooks/          # Custom hooks (create as needed)
└── utils/          # Helper functions (create as needed)
```

### Naming Conventions

- Components: `PascalCase.jsx` (e.g., `PortfolioCard.jsx`)
- Hooks: `useCamelCase.js` (e.g., `useDashboard.js`)
- Utilities: `camelCase.js` (e.g., `formatters.js`)
- Constants: `SCREAMING_SNAKE_CASE`

## Development Workflow

### Before Implementation

1. Read the relevant API endpoint documentation in README.md
2. Understand the data structure returned by the API
3. Plan the component structure before coding
4. Consider loading, error, and empty states upfront

### During Implementation

1. Start with the component skeleton and data fetching
2. Add loading state immediately
3. Add error handling immediately
4. Implement the happy path UI
5. Handle edge cases (empty data, null values)
6. Apply consistent styling
7. Test in browser at different viewport sizes

### Quality Gates

- [ ] Component renders without console errors
- [ ] Loading state displays during data fetch
- [ ] Error state displays on API failure
- [ ] Positive/negative values show correct colors
- [ ] Layout is responsive (check mobile breakpoint)
- [ ] No modifications to backend code

## Governance

This constitution establishes the development standards for the Pulse Platform frontend assessment. All code contributions MUST comply with these principles.

**Amendment procedure:**
1. Identify the principle requiring change
2. Document the rationale for the change
3. Update this constitution with version increment
4. Ensure all existing code complies with updated principles

**Compliance review:**
- Before committing code, verify against the Quality Gates checklist
- Each principle violation MUST be justified in code comments if unavoidable
- When in doubt, favor simplicity (Principle VIII)

**Version**: 1.0.0 | **Ratified**: 2025-12-11 | **Last Amended**: 2025-12-11
