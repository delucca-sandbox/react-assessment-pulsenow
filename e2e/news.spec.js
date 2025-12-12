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
    await expect(page.locator('article').first()).toBeVisible()
  })

  test('displays category filter buttons', async ({ page }) => {
    // Should show filter buttons
    await expect(page.getByRole('button', { name: /all/i })).toBeVisible()
  })

  test('filters news by category', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'News', level: 1 })).toBeVisible()

    // Wait for filter buttons to load
    await expect(page.getByRole('button', { name: /all/i })).toBeVisible()

    // Click a category filter
    const techButton = page.getByRole('button', { name: /technology/i })
    if (await techButton.isVisible()) {
      await techButton.click()
      
      // Filter should be active - check aria-pressed attribute instead of class
      await expect(techButton).toHaveAttribute('aria-pressed', 'true')
    }
  })

  test('shows article count', async ({ page }) => {
    await expect(page.getByText(/\d+ articles?/)).toBeVisible()
  })

  test('displays news with category badges', async ({ page }) => {
    // Wait for page heading (h1 specifically)
    await expect(page.getByRole('heading', { name: 'News', level: 1 })).toBeVisible()

    // Wait for article count text to appear (indicates data has loaded)
    await expect(page.getByText(/\d+ articles?/)).toBeVisible()

    // Wait for news articles to load
    const articles = page.locator('article')
    await expect(articles.first()).toBeVisible()

    // Should show category badges on news items (category badges have capitalize class)
    const categoryBadge = articles.first().locator('.capitalize').first()
    await expect(categoryBadge).toBeVisible()
  })

  test('shows last updated timestamp', async ({ page }) => {
    await expect(page.getByText(/updated/i)).toBeVisible()
  })
})

