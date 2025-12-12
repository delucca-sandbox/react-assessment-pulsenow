/**
 * E2E tests for Assets page
 * Tests filtering, sorting, and asset detail modal
 */
import { test, expect } from '@playwright/test'

test.describe('Assets Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/assets')
  })

  test('loads assets page with table', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Assets', level: 1 })).toBeVisible()

    // Wait for table to load
    await expect(page.getByRole('grid')).toBeVisible()
  })

  test('displays assets with all required columns', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Check column headers - use role columnheader for specificity
    const headerRow = page.locator('thead tr')
    await expect(headerRow.getByText('Symbol')).toBeVisible()
    await expect(headerRow.getByText('Name')).toBeVisible()
    await expect(headerRow.getByText('Price')).toBeVisible()
    await expect(headerRow.getByText('24h Change')).toBeVisible()
    await expect(headerRow.getByText('Volume')).toBeVisible()
    await expect(headerRow.getByText('Market Cap')).toBeVisible()
  })

  test('displays filter controls', async ({ page }) => {
    // Type filter dropdown
    await expect(page.getByRole('combobox', { name: /filter by asset type/i })).toBeVisible()

    // Search input
    await expect(page.getByRole('textbox', { name: /search assets/i })).toBeVisible()
  })

  test('filters assets by type - stocks only', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Select stocks only
    const dropdown = page.getByRole('combobox', { name: /filter by asset type/i })
    await dropdown.selectOption('stocks')

    // Verify filter is applied
    await expect(dropdown).toHaveValue('stocks')
    
    // Verify the table shows stock data (assuming AAPL is a stock in mock data)
    await expect(page.locator('tbody').getByText('AAPL').first()).toBeVisible()
  })

  test('filters assets by type - crypto only', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Select crypto only
    const dropdown = page.getByRole('combobox', { name: /filter by asset type/i })
    await dropdown.selectOption('crypto')

    // Verify filter is applied
    await expect(dropdown).toHaveValue('crypto')
    
    // Verify the table shows crypto data (assuming BTC is crypto in mock data)
    await expect(page.locator('tbody').getByText('BTC').first()).toBeVisible()
  })

  test('searches assets by symbol', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Type in search
    const searchInput = page.getByRole('textbox', { name: /search assets/i })
    await searchInput.fill('AAPL')

    // Should show matching results in the table
    await expect(page.locator('tbody').getByText('AAPL').first()).toBeVisible()
  })

  test('searches assets by name', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Type in search
    const searchInput = page.getByRole('textbox', { name: /search assets/i })
    await searchInput.fill('Bitcoin')

    // Should show matching results in the table
    await expect(page.locator('tbody').getByText('Bitcoin').first()).toBeVisible()
  })

  test('clears search when X button clicked', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Type in search
    const searchInput = page.getByRole('textbox', { name: /search assets/i })
    await searchInput.fill('test')

    // Click clear button
    const clearButton = page.getByRole('button', { name: /clear search/i })
    await clearButton.click()

    // Search should be cleared
    await expect(searchInput).toHaveValue('')
  })

  test('shows clear filters button when filters active', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Apply a filter
    const dropdown = page.getByRole('combobox', { name: /filter by asset type/i })
    await dropdown.selectOption('stocks')

    // Clear filters button should appear
    await expect(page.getByRole('button', { name: /clear all filters/i })).toBeVisible()
  })

  test('clears all filters when clear button clicked', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Apply filters
    const dropdown = page.getByRole('combobox', { name: /filter by asset type/i })
    await dropdown.selectOption('stocks')

    const searchInput = page.getByRole('textbox', { name: /search assets/i })
    await searchInput.fill('test')

    // Click clear all
    const clearButton = page.getByRole('button', { name: /clear all filters/i })
    await clearButton.click()

    // Filters should be reset
    await expect(dropdown).toHaveValue('all')
    await expect(searchInput).toHaveValue('')
  })

  test('sorts table when column header clicked', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Click on Symbol header to sort
    const symbolHeader = page.getByText('Symbol').first()
    await expect(symbolHeader).toBeVisible()
    await symbolHeader.click()

    // Header should show sort indicator
    const th = page.locator('th', { hasText: 'Symbol' })
    await expect(th).toHaveAttribute('aria-sort', /(ascending|descending)/)
  })

  test('opens asset detail modal when row clicked', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Click on first asset row
    const firstRow = page.locator('tbody tr').first()
    await expect(firstRow).toBeVisible()
    await firstRow.click()

    // Modal should open
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('closes modal when close button clicked', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Open modal
    const firstRow = page.locator('tbody tr').first()
    await expect(firstRow).toBeVisible()
    await firstRow.click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Close modal
    const closeButton = page.getByRole('button', { name: /close modal/i })
    await closeButton.click()

    // Modal should be closed
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('closes modal when Escape key pressed', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Open modal
    const firstRow = page.locator('tbody tr').first()
    await expect(firstRow).toBeVisible()
    await firstRow.click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Press Escape
    await page.keyboard.press('Escape')

    // Modal should be closed
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('shows empty state when no results match filter', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Search for something that doesn't exist
    const searchInput = page.getByRole('textbox', { name: /search assets/i })
    await searchInput.fill('xyznonexistent123')

    // Should show empty state
    await expect(page.getByText('No assets found')).toBeVisible()
  })

  test('shows asset count', async ({ page }) => {
    await expect(page.getByRole('grid')).toBeVisible()

    // Should show count
    await expect(page.getByText(/\d+ assets?/)).toBeVisible()
  })
})

