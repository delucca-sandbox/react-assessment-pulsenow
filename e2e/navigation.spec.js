/**
 * E2E tests for Navigation
 * Tests routing and navigation between pages
 */
import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('navigates to all pages from sidebar', async ({ page }) => {
    await page.goto('/')

    // Dashboard (home)
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible()

    // Navigate to Assets
    await page.getByRole('link', { name: /assets/i }).click()
    await expect(page.getByRole('heading', { name: 'Assets', level: 1 })).toBeVisible()

    // Navigate to News
    await page.getByRole('link', { name: /news/i }).click()
    await expect(page.getByRole('heading', { name: 'News', level: 1 })).toBeVisible()

    // Navigate to Alerts
    await page.getByRole('link', { name: /alerts/i }).click()
    await expect(page.getByRole('heading', { name: 'Alerts', level: 1 })).toBeVisible()

    // Navigate to Portfolio
    await page.getByRole('link', { name: /portfolio/i }).click()
    await expect(page.getByRole('heading', { name: 'Portfolio', level: 1 })).toBeVisible()

    // Navigate back to Dashboard
    await page.getByRole('link', { name: /dashboard/i }).click()
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible()
  })

  test('highlights active navigation link', async ({ page }) => {
    await page.goto('/')

    // Dashboard link should be active
    const dashboardLink = page.getByRole('link', { name: /dashboard/i })
    await expect(dashboardLink).toHaveAttribute('aria-current', 'page')

    // Navigate to Assets
    await page.getByRole('link', { name: /assets/i }).click()
    
    // Assets link should now be active
    const assetsLink = page.getByRole('link', { name: /assets/i })
    await expect(assetsLink).toHaveAttribute('aria-current', 'page')
    
    // Dashboard should no longer be active
    await expect(dashboardLink).not.toHaveAttribute('aria-current', 'page')
  })

  test('sidebar toggle collapses and expands', async ({ page }) => {
    await page.goto('/')

    const toggleButton = page.getByRole('button', { name: /sidebar/i })
    const sidebar = page.locator('#sidebar-nav')

    // Initially expanded
    await expect(sidebar).toHaveClass(/w-64/)

    // Click to collapse
    await toggleButton.click()
    await expect(sidebar).toHaveClass(/w-16/)

    // Click to expand
    await toggleButton.click()
    await expect(sidebar).toHaveClass(/w-64/)
  })

  test('navigation works with collapsed sidebar', async ({ page }) => {
    await page.goto('/')

    // Collapse sidebar
    const toggleButton = page.getByRole('button', { name: /sidebar/i })
    await toggleButton.click()

    // Should still be able to navigate
    await page.getByRole('link', { name: /assets/i }).click()
    await expect(page.getByRole('heading', { name: 'Assets', level: 1 })).toBeVisible()
  })

  test('direct URL navigation works', async ({ page }) => {
    // Navigate directly to each page
    await page.goto('/assets')
    await expect(page.getByRole('heading', { name: 'Assets', level: 1 })).toBeVisible()

    await page.goto('/news')
    await expect(page.getByRole('heading', { name: 'News', level: 1 })).toBeVisible()

    await page.goto('/alerts')
    await expect(page.getByRole('heading', { name: 'Alerts', level: 1 })).toBeVisible()

    await page.goto('/portfolio')
    await expect(page.getByRole('heading', { name: 'Portfolio', level: 1 })).toBeVisible()
  })

  test('app header displays correctly', async ({ page }) => {
    await page.goto('/')

    // App name
    await expect(page.getByText('Pulse')).toBeVisible()
    
    // Subtitle
    await expect(page.getByText('Market Monitoring Engine')).toBeVisible()
  })
})

