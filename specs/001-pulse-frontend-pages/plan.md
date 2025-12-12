# Implementation Plan: Pulse Frontend Pages

**Branch**: `001-pulse-frontend-pages` | **Date**: 2025-12-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-pulse-frontend-pages/spec.md`

## Summary

Build the complete frontend pages for Pulse, a market monitoring platform for stocks and cryptocurrencies. The backend API is already complete with mock data. Implementation requires 5 React pages (Dashboard, Assets, Portfolio, News, Alerts) with full functionality including data fetching, loading/error states, filtering, sorting, searching, charts, and dark mode toggle. State management uses native React hooks with optional React Query for caching, and Recharts for data visualization.

## Technical Context

**Language/Version**: JavaScript ES6+ with React 18.2.0
**Primary Dependencies**: React 18, React Router DOM 6.20, Axios 1.6, Recharts 2.10, Tailwind CSS 3.3
**Storage**: N/A (backend mock data, browser localStorage for theme preference)
**Testing**: Manual testing via browser (no test framework specified)
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge), responsive (mobile <768px)
**Project Type**: Web application (frontend-only implementation, backend is immutable)
**Performance Goals**: <2s page load (SC-001), <200ms filter/sort (SC-002), 30-second auto-refresh (FR-032)
**Constraints**: Backend immutability, WCAG 2.1 AA compliance, no custom CSS (Tailwind only), functional components only
**Scale/Scope**: 5 main pages, ~40 functional requirements, ~14 acceptance scenarios per page

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Clean React Code | ✅ PASS | Functional components with hooks, single responsibility |
| II. User Experience Consistency | ✅ PASS | Loading states, error handling, empty states required |
| III. Performance Standards | ✅ PASS | Data caching, 30-sec refresh, useMemo/useCallback patterns |
| IV. Visual Design Consistency | ✅ PASS | Tailwind CSS only, consistent spacing/typography |
| V. Color Coding Standards | ✅ PASS | Green gains, red losses, severity badges defined |
| VI. Accessibility & Responsive | ✅ PASS | WCAG 2.1 AA, mobile-first, keyboard accessible |
| VII. Backend Immutability | ✅ PASS | No backend modifications allowed |
| VIII. Simplicity First | ✅ PASS | No over-engineering, no unnecessary abstractions |

**Pre-Design Gate**: ✅ PASSED - All principles align with feature requirements

## Project Structure

### Documentation (this feature)

```text
specs/001-pulse-frontend-pages/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── api-types.ts     # TypeScript interfaces for API responses
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── components/       # Reusable UI components (existing: Layout.jsx)
│   │   ├── Layout.jsx    # Existing - navigation shell
│   │   ├── LoadingSkeleton.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── EmptyState.jsx
│   │   ├── AssetModal.jsx
│   │   ├── PriceChart.jsx
│   │   └── ThemeToggle.jsx
│   ├── pages/            # Route page components (existing placeholders)
│   │   ├── Dashboard.jsx
│   │   ├── Assets.jsx
│   │   ├── News.jsx
│   │   ├── Alerts.jsx
│   │   └── Portfolio.jsx
│   ├── services/
│   │   └── api.js        # Existing - Axios API client (DO NOT MODIFY)
│   ├── hooks/            # Custom hooks (to create)
│   │   ├── useDataFetch.js
│   │   └── useTheme.js
│   ├── context/          # React Context (to create)
│   │   └── ThemeContext.jsx
│   └── utils/            # Helper functions (to create)
│       └── formatters.js
└── tests/                # Manual testing only

backend/                  # IMMUTABLE - DO NOT MODIFY
└── [existing backend structure]
```

**Structure Decision**: Web application with frontend-only implementation. Backend is pre-built and immutable. Frontend follows existing structure with pages/, components/, services/, plus new hooks/, context/, utils/ directories.

## Complexity Tracking

> **No violations requiring justification** - All requirements align with constitution principles.

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| State Management | Native hooks + Context | Simpler than Redux/Zustand per Principle VIII |
| Data Fetching | Custom useDataFetch hook | Encapsulates loading/error/data pattern per Principle I |
| Theming | Context + localStorage | Minimal approach for dark mode persistence |
| Charts | Recharts (existing dep) | Already in package.json, meets requirements |

---

## Post-Design Constitution Re-Check

*Re-evaluation after Phase 1 design artifacts are complete.*

| Principle | Status | Post-Design Notes |
|-----------|--------|-------------------|
| I. Clean React Code | ✅ PASS | Custom hooks defined (useDataFetch, useTheme), component structure planned |
| II. User Experience Consistency | ✅ PASS | LoadingSkeleton, ErrorMessage, EmptyState components defined |
| III. Performance Standards | ✅ PASS | Auto-refresh pattern documented, useMemo/useCallback guidance in research |
| IV. Visual Design Consistency | ✅ PASS | Tailwind patterns documented, color system defined in research |
| V. Color Coding Standards | ✅ PASS | Helper functions specified (getChangeColor, getSeverityClasses) |
| VI. Accessibility & Responsive | ✅ PASS | ARIA patterns documented, responsive breakpoints defined |
| VII. Backend Immutability | ✅ PASS | api.js marked as DO NOT MODIFY, all API types documented |
| VIII. Simplicity First | ✅ PASS | No new dependencies added, minimal state management approach |

**Post-Design Gate**: ✅ PASSED - Design artifacts comply with all constitution principles

---

## Generated Artifacts Summary

| Artifact | Path | Description |
|----------|------|-------------|
| Implementation Plan | `specs/001-pulse-frontend-pages/plan.md` | This file |
| Research | `specs/001-pulse-frontend-pages/research.md` | Technology decisions and patterns |
| Data Model | `specs/001-pulse-frontend-pages/data-model.md` | Entity definitions and relationships |
| API Types | `specs/001-pulse-frontend-pages/contracts/api-types.ts` | TypeScript interfaces for API |
| Quickstart | `specs/001-pulse-frontend-pages/quickstart.md` | Setup and implementation guide |

---

## Next Steps

Run `/speckit.tasks` to generate the implementation task breakdown (`tasks.md`).
