/**
 * E2E tests for Theme Toggle
 * Tests dark mode switching functionality
 */
import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test('toggles between light and dark mode', async ({ page }) => {
    await page.goto('/')

    // Get theme toggle button
    const themeToggle = page.getByRole('button', { name: /mode/i })
    await expect(themeToggle).toBeVisible()

    // Check initial state (should be light by default in test)
    const html = page.locator('html')
    const initialDark = await html.evaluate(el => el.classList.contains('dark'))

    // Toggle theme
    await themeToggle.click()

    // Should have toggled
    const afterToggle = await html.evaluate(el => el.classList.contains('dark'))
    expect(afterToggle).not.toBe(initialDark)

    // Toggle back
    await themeToggle.click()
    const afterSecondToggle = await html.evaluate(el => el.classList.contains('dark'))
    expect(afterSecondToggle).toBe(initialDark)
  })

  test('persists theme preference across page navigation', async ({ page }) => {
    await page.goto('/')

    // Set to dark mode
    const themeToggle = page.getByRole('button', { name: /mode/i })
    
    // Toggle to dark if not already
    const html = page.locator('html')
    const isDark = await html.evaluate(el => el.classList.contains('dark'))
    if (!isDark) {
      await themeToggle.click()
    }

    // Navigate to another page
    await page.getByRole('link', { name: /assets/i }).click()

    // Theme should persist
    const isDarkAfterNav = await html.evaluate(el => el.classList.contains('dark'))
    expect(isDarkAfterNav).toBe(true)
  })

  test('persists theme preference after page reload', async ({ page }) => {
    await page.goto('/')

    // Set to dark mode
    const themeToggle = page.getByRole('button', { name: /mode/i })
    const html = page.locator('html')
    
    // Toggle to dark if not already
    const isDark = await html.evaluate(el => el.classList.contains('dark'))
    if (!isDark) {
      await themeToggle.click()
    }

    // Reload page
    await page.reload()

    // Theme should persist (from localStorage)
    const isDarkAfterReload = await html.evaluate(el => el.classList.contains('dark'))
    expect(isDarkAfterReload).toBe(true)
  })

  test('dark mode applies correct styling', async ({ page }) => {
    await page.goto('/')

    // Set to dark mode
    const themeToggle = page.getByRole('button', { name: /mode/i })
    const html = page.locator('html')
    
    const isDark = await html.evaluate(el => el.classList.contains('dark'))
    if (!isDark) {
      await themeToggle.click()
    }

    // Check that dark mode styles are applied
    const body = page.locator('body')
    const bgColor = await body.evaluate(el => getComputedStyle(el).backgroundColor)
    
    // Dark mode should have dark background (rgb values for dark gray)
    // This is a rough check - exact values depend on Tailwind config
    expect(bgColor).not.toBe('rgb(255, 255, 255)')
  })

  test('theme toggle has accessible label', async ({ page }) => {
    await page.goto('/')

    const themeToggle = page.getByRole('button', { name: /mode/i })
    await expect(themeToggle).toBeVisible()
    
    // Should have aria-label
    await expect(themeToggle).toHaveAttribute('aria-label', /(Switch to dark mode|Switch to light mode)/)
  })
})

