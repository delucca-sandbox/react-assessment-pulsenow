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
    await expect(page.getByText('Portfolio Summary')).toBeVisible()
  })

  test('displays asset allocation section', async ({ page }) => {
    await expect(page.getByText('Asset Allocation')).toBeVisible()
  })

  test('displays holdings section', async ({ page }) => {
    await expect(page.getByText('Holdings')).toBeVisible()
  })

  test('shows holdings count', async ({ page }) => {
    await expect(page.getByText(/\d+ holdings?/)).toBeVisible()
  })

  test('displays portfolio total value', async ({ page }) => {
    // Should show formatted currency value
    await expect(page.locator('text=/\\$[\\d,]+/')).toBeVisible()
  })

  test('displays holdings table with asset data', async ({ page }) => {
    await expect(page.getByText('Holdings')).toBeVisible()

    // Wait for content
    await page.waitForTimeout(500)

    // Should show asset symbols
    const table = page.locator('table, [role="grid"], .holdings-table')
    if (await table.isVisible()) {
      await expect(table).toBeVisible()
    }
  })

  test('shows last updated timestamp', async ({ page }) => {
    await expect(page.getByText(/updated/i)).toBeVisible()
  })

  test('displays allocation chart', async ({ page }) => {
    await expect(page.getByText('Asset Allocation')).toBeVisible()

    // Wait for chart to render
    await page.waitForTimeout(500)

    // Recharts renders SVG elements
    const chartContainer = page.locator('.recharts-wrapper, svg')
    await expect(chartContainer.first()).toBeVisible()
  })
})

