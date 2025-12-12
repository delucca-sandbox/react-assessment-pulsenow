# Feature Specification: Pulse Frontend Pages

**Feature Branch**: `001-pulse-frontend-pages`  
**Created**: 2025-12-11  
**Status**: Draft  
**Input**: User description: "Build the complete frontend pages for Pulse, a market monitoring platform for stocks and cryptocurrencies. The backend API is already complete and running - we need to implement all React frontend pages with full functionality."

## Clarifications

### Session 2025-12-11

- Q: How does authentication work for the frontend? → A: Backend-handled - Frontend assumes authenticated context (no login UI needed)
- Q: How is the API contract documented? → A: OpenAPI/Swagger spec exists and should be referenced for implementation
- Q: What state management approach should be used? → A: Native React hooks with custom useDataFetch hook for server state, React Context for UI state (per constitution Principle VIII - Simplicity First)
- Q: What charting library should be used for price history? → A: Recharts (React-native charting library)
- Q: What accessibility standard should be followed? → A: WCAG 2.1 AA compliance (industry standard)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dashboard Overview (Priority: P1)

As a market investor, I want to see a comprehensive dashboard when I open the application so that I can quickly understand my portfolio performance and market conditions at a glance.

**Why this priority**: The dashboard is the main entry point and provides immediate value by showing portfolio summary, top performers, news, and alerts in one view. This is the most critical page for daily user engagement.

**Independent Test**: Can be fully tested by navigating to the home page and verifying that portfolio value, top gainers/losers, recent news, and active alerts are displayed correctly with proper formatting and color coding.

**Acceptance Scenarios**:

1. **Given** I am a user (authentication handled by backend), **When** I navigate to the dashboard, **Then** I see my total portfolio value displayed prominently with daily change amount and percentage
2. **Given** the portfolio has gained value today, **When** the dashboard loads, **Then** the change values are displayed in green with an upward indicator
3. **Given** the portfolio has lost value today, **When** the dashboard loads, **Then** the change values are displayed in red with a downward indicator
4. **Given** I am on the dashboard, **When** data is loading, **Then** I see animated placeholder skeletons instead of blank space
5. **Given** I am on the dashboard, **When** the API returns an error, **Then** I see a friendly error message with a retry button
6. **Given** I am on the dashboard, **When** I view top gainers and losers, **Then** I see 5 best-performing and 5 worst-performing assets with symbol, name, price, and change percentage
7. **Given** I am on the dashboard, **When** I view recent news, **Then** I see the 5 most recent news items with title, source, relative timestamp, and category badge
8. **Given** I am on the dashboard, **When** I view active alerts, **Then** I see the 5 most recent alerts with message, color-coded severity badge, and timestamp

---

### User Story 2 - Assets Browsing and Analysis (Priority: P1)

As a market investor, I want to browse all available stocks and cryptocurrencies in a unified view so that I can analyze and compare different investment opportunities.

**Why this priority**: The assets page is essential for users to discover and analyze investment options. It provides core functionality that differentiates the platform.

**Independent Test**: Can be fully tested by navigating to the assets page and verifying that all assets are displayed, filtering works correctly, sorting is functional, search filters results, and clicking an asset shows detailed information.

**Acceptance Scenarios**:

1. **Given** I am on the assets page, **When** the page loads, **Then** I see all stocks and cryptocurrencies displayed in a unified table with symbol, name, price, change percentage, and volume
2. **Given** I am viewing the assets table, **When** I select "Stocks Only" filter, **Then** only stock assets are displayed
3. **Given** I am viewing the assets table, **When** I select "Crypto Only" filter, **Then** only cryptocurrency assets are displayed
4. **Given** I am viewing the assets table, **When** I click on a column header, **Then** the table sorts by that column
5. **Given** I have sorted by a column ascending, **When** I click the same column header again, **Then** the sort order reverses to descending
6. **Given** I am viewing the assets table, **When** I type in the search field, **Then** assets are filtered by name or symbol as I type (case-insensitive)
7. **Given** I have searched for assets, **When** I click the clear button, **Then** the search is reset and all assets are shown
8. **Given** I click on an asset row, **When** the modal opens, **Then** I see full name, symbol, current price, change amount/percentage, volume, market cap, and a price history chart
9. **Given** the asset modal is open, **When** I click the close button or outside the modal, **Then** the modal closes
10. **Given** I am viewing on a mobile device (width < 768px), **When** the assets page loads, **Then** I see a card/tile view instead of a table

---

### User Story 3 - Portfolio Management (Priority: P1)

As a market investor, I want to see detailed information about my portfolio holdings and asset allocation so that I can understand my investment distribution and performance.

**Why this priority**: Portfolio tracking is a core value proposition - users need to understand their holdings, allocation, and profit/loss to make informed decisions.

**Independent Test**: Can be fully tested by navigating to the portfolio page and verifying that total value is displayed, allocation chart is interactive, and holdings table shows all required information with proper color coding.

**Acceptance Scenarios**:

1. **Given** I am on the portfolio page, **When** the page loads, **Then** I see my total portfolio value prominently displayed
2. **Given** I am on the portfolio page, **When** I view the summary, **Then** I see total change (amount and percentage) with appropriate color coding
3. **Given** I am on the portfolio page, **When** I view the summary, **Then** I see my best and worst performing assets highlighted
4. **Given** I am on the portfolio page, **When** I view the allocation chart, **Then** I see a pie chart showing portfolio distribution by asset
5. **Given** I am viewing the allocation chart, **When** I hover over a segment, **Then** I see the asset name and allocation percentage
6. **Given** I am on the portfolio page, **When** I view the holdings table, **Then** I see columns for symbol, quantity, average buy price, current price, current value, profit/loss amount, and profit/loss percentage
7. **Given** a holding has profit, **When** I view the holdings table, **Then** the profit values are displayed in green
8. **Given** a holding has loss, **When** I view the holdings table, **Then** the loss values are displayed in red
9. **Given** I am on mobile, **When** the portfolio page loads, **Then** the chart appears above the table in a stacked layout

---

### User Story 4 - News Monitoring (Priority: P2)

As a market investor, I want to browse market news with filtering capabilities so that I can stay informed about developments that may affect my investments.

**Why this priority**: News monitoring enhances the platform but is supplementary to the core portfolio and asset tracking features.

**Independent Test**: Can be fully tested by navigating to the news page and verifying that all news items are displayed in a card layout, category filtering works, and responsive grid adjusts based on screen size.

**Acceptance Scenarios**:

1. **Given** I am on the news page, **When** the page loads, **Then** I see all news items displayed in a card-based layout
2. **Given** I am viewing a news card, **When** I look at its contents, **Then** I see title, source, full summary, timestamp, category badge, impact level, and affected assets
3. **Given** I am on the news page, **When** I select a category filter, **Then** only news items matching that category are displayed
4. **Given** I am viewing on desktop, **When** the news page loads, **Then** I see a 3-column grid layout
5. **Given** I am viewing on tablet, **When** the news page loads, **Then** I see a 2-column grid layout
6. **Given** I am viewing on mobile, **When** the news page loads, **Then** I see a single-column layout

---

### User Story 5 - Alert Management (Priority: P2)

As a market investor, I want to view my alerts grouped by severity so that I can prioritize my attention on the most critical market events.

**Why this priority**: Alert management helps users stay on top of important events but is secondary to viewing actual market data and portfolio information.

**Independent Test**: Can be fully tested by navigating to the alerts page and verifying that alerts are grouped by severity, each group shows count, and sections are collapsible.

**Acceptance Scenarios**:

1. **Given** I am on the alerts page, **When** the page loads, **Then** I see alerts grouped by severity level (Critical, High, Medium, Low)
2. **Given** I am viewing an alerts section, **When** I look at the header, **Then** I see the count of alerts in that severity with appropriate color coding
3. **Given** I am viewing an alert, **When** I look at its contents, **Then** I see title, message, timestamp, affected assets, and action required indicator
4. **Given** I am viewing a severity section, **When** I click on the section header, **Then** the section collapses or expands
5. **Given** severity sections exist, **When** I view section headers, **Then** Critical is red, High is orange, Medium is yellow, and Low is green

---

### User Story 6 - Dark Mode Preference (Priority: P2)

As a user, I want to toggle between light and dark themes so that I can use the application comfortably in different lighting conditions.

**Why this priority**: Dark mode is an important UX feature that affects user comfort but doesn't block core functionality.

**Independent Test**: Can be fully tested by toggling the dark mode switch and verifying all pages correctly display in the selected theme, and preference persists across sessions.

**Acceptance Scenarios**:

1. **Given** I am using the application, **When** I click the dark mode toggle in the header, **Then** the theme switches between light and dark
2. **Given** I have set a theme preference, **When** I close and reopen the application, **Then** my theme preference is preserved
3. **Given** I am a first-time user with system dark mode preference, **When** I open the application, **Then** dark mode is automatically enabled
4. **Given** I am a first-time user with system light mode preference, **When** I open the application, **Then** light mode is automatically enabled
5. **Given** I toggle the theme, **When** the change occurs, **Then** the transition is smooth without jarring flashes

---

### User Story 7 - Real-Time Data Updates (Priority: P3)

As a market investor, I want data to refresh automatically so that I always see current market information without manually refreshing the page.

**Why this priority**: Auto-refresh enhances user experience but the core functionality works without it.

**Independent Test**: Can be fully tested by observing that data updates automatically every 30 seconds and that a last-updated indicator reflects the refresh time.

**Acceptance Scenarios**:

1. **Given** I am on any data page, **When** 30 seconds pass, **Then** the data automatically refreshes
2. **Given** data is refreshing, **When** new data arrives, **Then** the display updates without layout shifts
3. **Given** I am on a page with data, **When** I look at the interface, **Then** I see an indicator showing when data was last updated
4. **Given** I am on a page with data, **When** I click a manual refresh button (if available), **Then** data refreshes immediately

---

### Edge Cases

- What happens when the API returns empty data (no assets, no news, no alerts)?
  - Display appropriate empty state messages (e.g., "No assets found", "No recent news")
- What happens when the API is unreachable or times out?
  - Show user-friendly error message with retry button
- What happens when a user navigates between pages while data is loading?
  - Cancel pending requests and show loading state for new page
- What happens when price data changes during a sort operation?
  - Complete the sort with current data; new data applies on next refresh
- What happens when search returns no matching assets?
  - Display "No results found" message with suggestion to clear search
- What happens when portfolio has no holdings?
  - Show empty portfolio state with guidance on how to add holdings
- What happens when user has very slow internet connection?
  - Loading skeletons remain visible until data arrives; timeout after reasonable period with retry option

## Requirements *(mandatory)*

### Functional Requirements

#### Dashboard Requirements
- **FR-001**: System MUST display total portfolio value, change amount, and change percentage on the dashboard
- **FR-002**: System MUST color-code portfolio changes (green for gains, red for losses) with appropriate visual indicators
- **FR-003**: System MUST display the top 5 best-performing and top 5 worst-performing assets
- **FR-004**: System MUST display the 5 most recent news items with title, source, relative timestamp, and category
- **FR-005**: System MUST display the 5 most recent alerts with message, severity badge, and timestamp
- **FR-006**: System MUST use color-coded severity badges (green=low, yellow=medium, orange=high, red=critical)

#### Assets Requirements
- **FR-007**: System MUST display all stocks and cryptocurrencies in a unified view
- **FR-008**: System MUST allow filtering assets by type (All, Stocks Only, Crypto Only)
- **FR-009**: System MUST allow sorting by price, change percentage, and volume columns
- **FR-010**: System MUST support ascending and descending sort with visual indicators
- **FR-011**: System MUST provide search functionality filtering by name or symbol (case-insensitive)
- **FR-012**: System MUST display asset details in a modal when an asset is selected
- **FR-013**: System MUST include a price history chart in the asset detail modal
- **FR-014**: System MUST support table view on desktop and card view on mobile (<768px)

#### News Requirements
- **FR-015**: System MUST display news items in a card-based layout
- **FR-016**: System MUST show title, source, summary, timestamp, category, impact level, and affected assets for each news item
- **FR-017**: System MUST allow filtering news by category (All, Macro, Technology, Crypto, Earnings, Regulatory, Market)

#### Alerts Requirements
- **FR-018**: System MUST group alerts by severity level (Critical, High, Medium, Low)
- **FR-019**: System MUST display alert count per severity group
- **FR-020**: System MUST show title, message, timestamp, affected assets, and action indicator for each alert
- **FR-021**: System MUST support collapsible sections for each severity group

#### Portfolio Requirements
- **FR-022**: System MUST display total portfolio value prominently
- **FR-023**: System MUST display portfolio change (amount and percentage) with color coding
- **FR-024**: System MUST highlight best and worst performing assets
- **FR-025**: System MUST display an interactive pie chart showing asset allocation
- **FR-026**: System MUST show allocation percentage on chart hover
- **FR-027**: System MUST display holdings table with symbol, quantity, average buy price, current price, current value, profit/loss, and profit/loss percentage
- **FR-028**: System MUST color-code profit (green) and loss (red) values in holdings table

#### Authentication Requirements
- **FR-AUTH-001**: System assumes backend-handled authentication; no login/logout UI is required
- **FR-AUTH-002**: System receives pre-authenticated user context from the backend API

#### Global Application Requirements
- **FR-029**: System MUST provide dark mode toggle accessible from the header
- **FR-030**: System MUST persist theme preference across sessions
- **FR-031**: System MUST respect system theme preference for first-time users
- **FR-032**: System MUST auto-refresh data every 30 seconds
- **FR-033**: System MUST display last update timestamp
- **FR-034**: System MUST show loading skeleton animations while fetching data
- **FR-035**: System MUST show user-friendly error messages with retry functionality on API failures
- **FR-036**: System MUST format currency values with $ symbol and thousand separators
- **FR-037**: System MUST format percentages with sign indicator and 2 decimal places
- **FR-038**: System MUST apply smooth fade-in animations when data loads
- **FR-039**: System MUST apply hover effects on interactive elements
- **FR-040**: System MUST cache fetched data to avoid redundant API calls when navigating between pages

### Non-Functional Requirements

#### Accessibility
- **NFR-A11Y-001**: System MUST comply with WCAG 2.1 AA standards
- **NFR-A11Y-002**: All interactive elements MUST be keyboard accessible
- **NFR-A11Y-003**: Color-coded information (gains/losses) MUST have non-color indicators (icons, text) for color-blind users
- **NFR-A11Y-004**: Charts MUST include accessible alternatives (data tables or ARIA descriptions)
- **NFR-A11Y-005**: All images and icons MUST have appropriate alt text or ARIA labels
- **NFR-A11Y-006**: Focus states MUST be clearly visible on all interactive elements

### Technical Constraints

- **State Management**: Native React hooks (useState, useEffect) with custom useDataFetch hook for server state (API data, caching, auto-refresh); React Context for UI state (theme, local preferences)
- **Caching Strategy**: Custom useDataFetch hook handles data caching and background refetching (30-second interval per FR-032)
- **Charting**: Recharts library for price history charts and portfolio allocation pie chart

### Integration & External Dependencies

- **Backend API**: Existing REST API with OpenAPI/Swagger specification available for reference
- **API Contract**: Implementation MUST align with the OpenAPI spec; types can be generated from the spec

### Key Entities

- **Portfolio**: Represents user's total investment position, including total value, total change, and collection of holdings
- **Holding**: Individual asset position within portfolio, including quantity, average buy price, current value, and profit/loss
- **Asset**: Tradeable market instrument (stock or cryptocurrency) with symbol, name, current price, change percentage, volume, and market cap
- **PriceHistory**: Historical price data points for an asset used in charts
- **NewsItem**: Market news article with title, source, summary, timestamp, category, impact level, and affected assets
- **Alert**: Market notification with severity level, message, timestamp, affected assets, and action required status
- **TopMover**: Asset highlighted as significant gainer or loser based on price change percentage

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can view complete portfolio summary within 2 seconds of page load
- **SC-002**: Users can filter and sort assets table with results appearing in under 200 milliseconds
- **SC-003**: Users can search for any asset and see filtered results as they type with no perceptible delay
- **SC-004**: Users can switch between light and dark themes with smooth transition completing in under 300 milliseconds
- **SC-005**: Data refreshes automatically every 30 seconds without disrupting user activity or causing layout shifts
- **SC-006**: All pages display appropriate loading states and error messages, ensuring users never see blank or broken interfaces
- **SC-007**: Application is fully usable on mobile devices (screens < 768px) with appropriately adapted layouts
- **SC-008**: Users can access detailed asset information via modal within one click from the assets list
- **SC-009**: All monetary values are consistently formatted with currency symbols and thousand separators across the application
- **SC-010**: Color coding for gains/losses is consistently applied across all pages and components
- **SC-011**: Navigation between pages maintains cached data, eliminating redundant loading when returning to previously viewed pages
- **SC-012**: News filtering by category returns filtered results immediately with no page reload
- **SC-013**: Alert severity groups can be expanded/collapsed, with state preserved during the session
- **SC-014**: Application passes WCAG 2.1 AA automated accessibility checks (e.g., axe-core) with no critical violations
