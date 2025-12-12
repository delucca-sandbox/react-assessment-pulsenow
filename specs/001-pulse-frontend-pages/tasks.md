# Tasks: Pulse Frontend Pages

**Input**: Design documents from `/specs/001-pulse-frontend-pages/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/api-types.ts ✅

**Tests**: Manual testing only (no automated tests specified)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend**: `frontend/src/` (pages, components, hooks, context, utils)
- **Backend**: `backend/` (IMMUTABLE - DO NOT MODIFY)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and directory structure

- [X] T001 Create hooks directory at `frontend/src/hooks/`
- [X] T002 [P] Create context directory at `frontend/src/context/`
- [X] T003 [P] Create utils directory at `frontend/src/utils/`
- [X] T004 Configure Tailwind dark mode in `frontend/tailwind.config.js` (add `darkMode: 'class'`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Context & Hooks

- [X] T005 Create ThemeContext with provider, localStorage persistence, and system preference detection in `frontend/src/context/ThemeContext.jsx`
- [X] T006 Create useTheme custom hook in `frontend/src/hooks/useTheme.js`
- [X] T007 [P] Create useDataFetch custom hook with loading/error/data states and auto-refresh support in `frontend/src/hooks/useDataFetch.js`

### Utility Functions

- [X] T008 [P] Create formatters utility (formatCurrency, formatPercent, formatLargeNumber, formatRelativeTime) in `frontend/src/utils/formatters.js`
- [X] T009 [P] Create color helpers (getChangeColor, getChangeIcon, getSeverityClasses) in `frontend/src/utils/colors.js`

### Shared UI Components

- [X] T010 [P] Create LoadingSkeleton component with configurable dimensions in `frontend/src/components/LoadingSkeleton.jsx`
- [X] T011 [P] Create ErrorMessage component with retry button in `frontend/src/components/ErrorMessage.jsx`
- [X] T012 [P] Create EmptyState component with customizable message in `frontend/src/components/EmptyState.jsx`
- [X] T013 Create ThemeToggle component (sun/moon icon button) in `frontend/src/components/ThemeToggle.jsx`

### App Integration

- [X] T014 Wrap App with ThemeProvider and add dark class toggle to document in `frontend/src/App.jsx`
- [X] T015 Add ThemeToggle to Layout header navigation in `frontend/src/components/Layout.jsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Dashboard Overview (Priority: P1) 🎯 MVP

**Goal**: Display comprehensive dashboard with portfolio summary, top performers, recent news, and active alerts

**Independent Test**: Navigate to `/` and verify portfolio value, top gainers/losers, recent news (5 items), and active alerts (5 items) display with proper formatting and color coding

### Implementation for User Story 1

- [X] T016 [US1] Create DashboardSkeleton component for loading state in `frontend/src/components/DashboardSkeleton.jsx`
- [X] T017 [US1] Implement PortfolioSummaryCard component (total value, change amount, change %) in `frontend/src/components/PortfolioSummaryCard.jsx`
- [X] T018 [P] [US1] Implement TopMoversCard component (gainers/losers lists with color coding) in `frontend/src/components/TopMoversCard.jsx`
- [X] T019 [P] [US1] Implement RecentNewsCard component (5 news items with badges) in `frontend/src/components/RecentNewsCard.jsx`
- [X] T020 [P] [US1] Implement ActiveAlertsCard component (5 alerts with severity badges) in `frontend/src/components/ActiveAlertsCard.jsx`
- [X] T021 [US1] Implement Dashboard page with data fetching, loading, error, and empty states in `frontend/src/pages/Dashboard.jsx`
- [X] T022 [US1] Add keyboard accessibility and ARIA labels to Dashboard components

**Checkpoint**: Dashboard (User Story 1) should be fully functional and testable independently

---

## Phase 4: User Story 2 - Assets Browsing and Analysis (Priority: P1)

**Goal**: Browse all stocks and cryptocurrencies with filtering, sorting, search, and detailed modal view

**Independent Test**: Navigate to `/assets`, verify table displays all assets, filter by type works, sorting works, search filters results, clicking asset opens modal with chart

### Implementation for User Story 2

- [X] T023 [US2] Create PriceChart component using Recharts LineChart in `frontend/src/components/PriceChart.jsx`
- [X] T024 [US2] Create AssetModal component with full details and price history chart in `frontend/src/components/AssetModal.jsx`
- [X] T025 [P] [US2] Create AssetsTable component (desktop view) with sortable columns in `frontend/src/components/AssetsTable.jsx`
- [X] T026 [P] [US2] Create AssetsCards component (mobile view) with card layout in `frontend/src/components/AssetsCards.jsx`
- [X] T027 [US2] Create AssetsFilter component (type dropdown, search input, clear button) in `frontend/src/components/AssetsFilter.jsx`
- [X] T028 [US2] Implement Assets page with data fetching, filter/sort/search state, responsive table/card toggle in `frontend/src/pages/Assets.jsx` *(Note: Sort completes with current data snapshot; fresh data applies on next refresh cycle)*
- [X] T029 [US2] Add keyboard accessibility (focus trap in modal, tab navigation) and ARIA labels to Assets components

**Checkpoint**: Assets (User Story 2) should be fully functional and testable independently

---

## Phase 5: User Story 3 - Portfolio Management (Priority: P1)

**Goal**: Display portfolio value, allocation pie chart, and holdings table with profit/loss

**Independent Test**: Navigate to `/portfolio`, verify total value displays, pie chart shows allocation with hover tooltips, holdings table shows all columns with color-coded profit/loss

### Implementation for User Story 3

- [X] T030 [US3] Create AllocationChart component using Recharts PieChart with hover tooltips in `frontend/src/components/AllocationChart.jsx`
- [X] T031 [P] [US3] Create PortfolioSummary component (total value, change, best/worst performers) in `frontend/src/components/PortfolioSummary.jsx`
- [X] T032 [P] [US3] Create HoldingsTable component with all required columns and color coding in `frontend/src/components/HoldingsTable.jsx`
- [X] T033 [US3] Implement Portfolio page with data fetching, loading, error states, and responsive layout in `frontend/src/pages/Portfolio.jsx`
- [X] T034 [US3] Add accessibility: chart data table alternative, proper table headers, color-independent indicators

**Checkpoint**: Portfolio (User Story 3) should be fully functional and testable independently

---

## Phase 6: User Story 4 - News Monitoring (Priority: P2)

**Goal**: Browse market news with category filtering in responsive card grid layout

**Independent Test**: Navigate to `/news`, verify all news items display in card layout, category filter works, responsive grid adjusts (3-col desktop, 2-col tablet, 1-col mobile)

### Implementation for User Story 4

- [X] T035 [US4] Create NewsCard component (title, source, summary, timestamp, category badge, impact, affected assets) in `frontend/src/components/NewsCard.jsx`
- [X] T036 [US4] Create NewsCategoryFilter component (All, Macro, Technology, Crypto, Earnings, Regulatory, Market) in `frontend/src/components/NewsCategoryFilter.jsx`
- [X] T037 [US4] Implement News page with data fetching, category filtering, and responsive grid in `frontend/src/pages/News.jsx`
- [X] T038 [US4] Add keyboard accessibility and ARIA labels to News components

**Checkpoint**: News (User Story 4) should be fully functional and testable independently

---

## Phase 7: User Story 5 - Alert Management (Priority: P2)

**Goal**: View alerts grouped by severity with collapsible sections

**Independent Test**: Navigate to `/alerts`, verify alerts are grouped by severity (Critical, High, Medium, Low), each section shows count with correct color, sections can expand/collapse

### Implementation for User Story 5

- [X] T039 [US5] Create AlertItem component (title, message, timestamp, affected assets, action indicator) in `frontend/src/components/AlertItem.jsx`
- [X] T040 [US5] Create AlertSection component (collapsible, severity-colored header, count badge) in `frontend/src/components/AlertSection.jsx`
- [X] T041 [US5] Implement Alerts page with data fetching, grouping by severity, collapsible state in `frontend/src/pages/Alerts.jsx`
- [X] T042 [US5] Add keyboard accessibility (Enter/Space to toggle sections) and ARIA expanded states

**Checkpoint**: Alerts (User Story 5) should be fully functional and testable independently

---

## Phase 8: User Story 6 - Dark Mode Preference (Priority: P2)

**Goal**: Toggle between light/dark themes with persistence and smooth transition

**Independent Test**: Click dark mode toggle in header, verify all pages render correctly in both themes, close and reopen app to verify preference persists, verify smooth transition animation

### Implementation for User Story 6

- [X] T043 [US6] Add dark mode color variants to all page components (Dashboard, Assets, Portfolio, News, Alerts)
- [X] T044 [US6] Add transition classes for smooth theme switching in `frontend/src/index.css`
- [X] T045 [US6] Verify all components have proper dark mode styles (backgrounds, text, borders, badges)

**Checkpoint**: Dark mode (User Story 6) should be fully functional across all pages

---

## Phase 9: User Story 7 - Real-Time Data Updates (Priority: P3)

**Goal**: Auto-refresh data every 30 seconds with last-updated indicator

**Independent Test**: Wait 30 seconds on any data page, verify data refreshes without layout shift, verify last-updated timestamp updates

### Implementation for User Story 7

- [X] T046 [US7] Enhance useDataFetch hook with 30-second auto-refresh interval and cleanup in `frontend/src/hooks/useDataFetch.js`
- [X] T047 [US7] Create LastUpdated component showing relative timestamp in `frontend/src/components/LastUpdated.jsx`
- [X] T048 [US7] Add LastUpdated indicator to Dashboard, Assets, Portfolio, News, and Alerts pages
- [X] T049 [US7] Ensure data refresh does not cause layout shifts (maintain skeleton dimensions)

**Checkpoint**: Real-time updates (User Story 7) working on all data pages

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements affecting multiple user stories

- [X] T050 [P] Add smooth fade-in animations when data loads across all pages
- [X] T051 [P] Add hover effects to all interactive elements (buttons, cards, table rows)
- [X] T052 Verify WCAG 2.1 AA compliance: focus states visible, color-independent indicators, proper contrast
- [X] T053 Run quickstart.md validation (manual testing checklist for all pages)
- [X] T054 Performance check: verify <2s page load, <200ms filter/sort operations

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-9)**: All depend on Foundational phase completion
  - P1 stories (US1, US2, US3) can proceed in parallel after Foundation
  - P2 stories (US4, US5, US6) can proceed after Foundation (or after P1 for polish)
  - P3 stories (US7) can proceed after Foundation
- **Polish (Phase 10)**: Depends on all user stories being complete

### User Story Dependencies

| Story | Priority | Depends On | Can Parallel With |
|-------|----------|------------|-------------------|
| US1 - Dashboard | P1 | Foundational | US2, US3 |
| US2 - Assets | P1 | Foundational | US1, US3 |
| US3 - Portfolio | P1 | Foundational | US1, US2 |
| US4 - News | P2 | Foundational | US1-US3, US5, US6 |
| US5 - Alerts | P2 | Foundational | US1-US4, US6 |
| US6 - Dark Mode | P2 | US1-US5 (for testing all pages) | - |
| US7 - Auto-Refresh | P3 | Foundational | Any, but best after US1-US5 |

### Within Each User Story

- Components before page integration
- Core implementation before accessibility enhancements
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- Foundational: T008, T009, T010, T011, T012 can run in parallel
- US1: T018, T019, T020 can run in parallel (after T017)
- US2: T025, T026 can run in parallel
- US3: T031, T032 can run in parallel
- Different P1 user stories (US1, US2, US3) can be worked on in parallel

---

## Parallel Example: Foundational Phase

```bash
# After T005 completes, launch these in parallel:
T007: "Create useDataFetch custom hook in frontend/src/hooks/useDataFetch.js"
T008: "Create formatters utility in frontend/src/utils/formatters.js"
T009: "Create color helpers in frontend/src/utils/colors.js"
T010: "Create LoadingSkeleton component in frontend/src/components/LoadingSkeleton.jsx"
T011: "Create ErrorMessage component in frontend/src/components/ErrorMessage.jsx"
T012: "Create EmptyState component in frontend/src/components/EmptyState.jsx"
```

## Parallel Example: P1 User Stories

```bash
# After Foundational completes, launch all P1 stories in parallel:
# Developer A: User Story 1 (Dashboard) - T016-T022
# Developer B: User Story 2 (Assets) - T023-T029
# Developer C: User Story 3 (Portfolio) - T030-T034
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T015)
3. Complete Phase 3: User Story 1 - Dashboard (T016-T022)
4. **STOP and VALIDATE**: Test Dashboard independently
5. Deploy/demo if ready - MVP complete!

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 (Dashboard) → Test → Deploy (MVP!)
3. Add User Story 2 (Assets) → Test → Deploy
4. Add User Story 3 (Portfolio) → Test → Deploy
5. Add User Story 4 (News) → Test → Deploy
6. Add User Story 5 (Alerts) → Test → Deploy
7. Add User Story 6 (Dark Mode) → Test → Deploy
8. Add User Story 7 (Auto-Refresh) → Test → Deploy
9. Polish → Final validation → Complete!

### Full Implementation Order (Sequential)

1. **Setup**: T001 → T002 || T003 || T004
2. **Foundational**: T005 → T006 → T007 || T008 || T009 || T010 || T011 || T012 → T013 → T014 → T015
3. **US1**: T016 → T017 → T018 || T019 || T020 → T021 → T022
4. **US2**: T023 → T024 → T025 || T026 → T027 → T028 → T029
5. **US3**: T030 → T031 || T032 → T033 → T034
6. **US4**: T035 → T036 → T037 → T038
7. **US5**: T039 → T040 → T041 → T042
8. **US6**: T043 → T044 → T045
9. **US7**: T046 → T047 → T048 → T049
10. **Polish**: T050 || T051 → T052 → T053 → T054

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- api.js is IMMUTABLE - DO NOT MODIFY
- Manual testing only - use quickstart.md checklist
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Dark mode styles should be added incrementally as each page is built

