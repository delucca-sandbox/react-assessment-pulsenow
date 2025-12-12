/**
 * E2E tests for Portfolio page
 * Tests portfolio display with charts and holdings
 */
import { test, expect } from '@playwright/test'

test.describe('Portfolio Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolio')
  })

  test('loads portfolio page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Portfolio', level: 1 })).toBeVisible()
  })

  test('displays portfolio summary section', async ({ page }) => {
    await expect(page.getByRole('region', { name: /portfolio summary/i })).toBeVisible()
  })

  test('displays asset allocation section', async ({ page }) => {
    await expect(page.getByRole('region', { name: /asset allocation/i })).toBeVisible()
  })

  test('displays holdings section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Holdings' })).toBeVisible()
  })

  test('shows holdings count', async ({ page }) => {
    await expect(page.getByText(/\d+ holdings?/)).toBeVisible()
  })

  test('displays portfolio total value', async ({ page }) => {
    // Wait for portfolio summary section then check for currency value
    await expect(page.getByText(/Portfolio Value|Portfolio Summary/i)).toBeVisible()
    await expect(page.locator('text=/\\$[\\d,]+/').first()).toBeVisible()
  })

  test('displays holdings table with asset data', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Holdings' })).toBeVisible()

    // Should show holdings table
    const table = page.locator('table, [role="grid"]').first()
    await expect(table).toBeVisible()
  })

  test('shows last updated timestamp', async ({ page }) => {
    await expect(page.getByText(/^Last updated\b/i)).toBeVisible()
  })

  test('displays allocation chart', async ({ page }) => {
    // Wait for allocation section
    await expect(page.getByText('Asset Allocation')).toBeVisible()

    // Recharts renders SVG elements - wait for chart wrapper specifically
    const chartContainer = page.locator('.recharts-wrapper').first()
    await expect(chartContainer).toBeVisible()
  })
})

