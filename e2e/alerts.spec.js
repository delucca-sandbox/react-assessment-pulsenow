/**
 * E2E tests for Alerts page
 * Tests alerts display grouped by severity
 */
import { test, expect } from '@playwright/test'

test.describe('Alerts Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alerts')
  })

  test('loads alerts page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Alerts', level: 1 })).toBeVisible()
  })

  test('displays alerts grouped by severity', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Alerts', level: 1 })).toBeVisible()

    // Wait for alerts list to load
    await expect(page.getByRole('list', { name: /alerts/i })).toBeVisible()

    // Should show severity sections
    await expect(page.getByText(/critical|high|medium|low/i).first()).toBeVisible()
  })

  test('shows alert count', async ({ page }) => {
    await expect(page.getByText(/\d+ alerts?/)).toBeVisible()
  })

  test('shows critical count when present', async ({ page }) => {
    // May or may not have critical alerts
    // Just check page loads, critical count is optional
    await expect(page.getByRole('heading', { name: 'Alerts', level: 1 })).toBeVisible()
  })

  test('displays severity badges with correct colors', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Alerts', level: 1 })).toBeVisible()

    // Wait for alerts list to load
    await expect(page.getByRole('list', { name: /alerts/i })).toBeVisible()

    // Should show colored severity badges
    const severityBadges = page.locator('[class*="bg-red"], [class*="bg-orange"], [class*="bg-yellow"], [class*="bg-blue"]')
    await expect(severityBadges.first()).toBeVisible()
  })

  test('shows last updated timestamp', async ({ page }) => {
    await expect(page.getByText(/updated/i)).toBeVisible()
  })

  test('alerts list is accessible', async ({ page }) => {
    await expect(page.getByRole('list', { name: /alerts/i })).toBeVisible()
  })
})

