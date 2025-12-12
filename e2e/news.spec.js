/**
 * E2E tests for News page
 * Tests news display and category filtering
 */
import { test, expect } from '@playwright/test'

test.describe('News Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/news')
  })

  test('loads news page with articles', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'News', level: 1 })).toBeVisible()

    // Should show news articles
    await expect(page.locator('article, [class*="NewsCard"], .grid > div').first()).toBeVisible()
  })

  test('displays category filter buttons', async ({ page }) => {
    // Should show filter buttons
    await expect(page.getByRole('button', { name: /all/i })).toBeVisible()
  })

  test('filters news by category', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'News' })).toBeVisible()

    // Wait for content to load
    await page.waitForTimeout(500)

    // Click a category filter
    const techButton = page.getByRole('button', { name: /technology/i })
    if (await techButton.isVisible()) {
      await techButton.click()
      
      // Filter should be active
      await expect(techButton).toHaveClass(/bg-pulse-primary|bg-indigo/)
    }
  })

  test('shows article count', async ({ page }) => {
    await expect(page.getByText(/\d+ articles?/)).toBeVisible()
  })

  test('displays news with category badges', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'News' })).toBeVisible()

    // Wait for content
    await page.waitForTimeout(500)

    // Should show category badges on news items
    const categoryBadges = page.locator('.capitalize, [class*="badge"]')
    await expect(categoryBadges.first()).toBeVisible()
  })

  test('shows last updated timestamp', async ({ page }) => {
    await expect(page.getByText(/updated/i)).toBeVisible()
  })
})

