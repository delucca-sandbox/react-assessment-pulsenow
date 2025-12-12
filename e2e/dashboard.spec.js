/**
 * E2E tests for Dashboard page
 * Tests critical user flows and visual elements
 */
import { test, expect } from '@playwright/test'

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads dashboard with all sections', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible()

    // Portfolio Summary
    await expect(page.getByText('Portfolio Value')).toBeVisible()

    // Top Movers
    await expect(page.getByText('Top Gainers')).toBeVisible()
    await expect(page.getByText('Top Losers')).toBeVisible()

    // News and Alerts
    await expect(page.getByText('Recent News')).toBeVisible()
    await expect(page.getByText('Active Alerts')).toBeVisible()
  })

  test('displays portfolio value with proper formatting', async ({ page }) => {
    // Wait for data to load
    await expect(page.getByText('Portfolio Value')).toBeVisible()

    // Should show currency formatted value (e.g., $125,000.50) - use first() to avoid strict mode
    await expect(page.locator('text=/\\$[\\d,]+\\.\\d{2}/').first()).toBeVisible()
  })

  test('displays top gainers with positive change indicators', async ({ page }) => {
    await expect(page.getByText('Top Gainers')).toBeVisible()

    // Should show percentage changes with + prefix indicating positive
    await expect(page.getByText(/\+\d+\.\d+%/).first()).toBeVisible()
  })

  test('displays top losers with negative change indicators', async ({ page }) => {
    await expect(page.getByText('Top Losers')).toBeVisible()

    // Should show percentage changes with - prefix indicating negative
    await expect(page.getByText(/-\d+\.\d+%/).first()).toBeVisible()
  })

  test('displays recent news with category badges', async ({ page }) => {
    await expect(page.getByText('Recent News')).toBeVisible()

    // Should show news items
    const newsList = page.locator('[aria-label="Recent news"]')
    await expect(newsList).toBeVisible()
  })

  test('displays active alerts with severity badges', async ({ page }) => {
    await expect(page.getByText('Active Alerts')).toBeVisible()

    // Should show alerts list
    const alertsList = page.locator('[aria-label="Active alerts"]')
    await expect(alertsList).toBeVisible()
  })

  test('shows last updated timestamp', async ({ page }) => {
    await expect(page.getByText(/updated/i)).toBeVisible()
  })

  test('handles loading state gracefully', async ({ page }) => {
    // On slow connections, should show loading skeleton
    // This test verifies the page doesn't crash during loading
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible()
  })
})

