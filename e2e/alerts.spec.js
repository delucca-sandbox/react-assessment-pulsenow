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

  test('displays severity sections with counts', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Alerts', level: 1 })).toBeVisible()

    // Wait for alerts list to load
    await expect(page.getByRole('list', { name: /alerts/i })).toBeVisible()

    // Should show severity labels (Critical, High, Medium, or Low)
    const severityLabels = page.getByText(/^(Critical|High|Medium|Low)$/)
    await expect(severityLabels.first()).toBeVisible()
  })

  test('displays severity badges with semantic labels', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Alerts', level: 1 })).toBeVisible()

    // Wait for alerts list to load
    await expect(page.getByRole('list', { name: /alerts/i })).toBeVisible()

    // Should show severity section buttons with counts
    const severityButtons = page.getByRole('button').filter({ hasText: /Critical|High|Medium|Low/ })
    await expect(severityButtons.first()).toBeVisible()
  })

  test('shows last updated timestamp', async ({ page }) => {
    await expect(page.getByText(/updated/i)).toBeVisible()
  })

  test('alerts list is accessible', async ({ page }) => {
    await expect(page.getByRole('list', { name: /alerts/i })).toBeVisible()
  })
})

