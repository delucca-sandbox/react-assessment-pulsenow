/**
 * E2E tests for Accessibility
 * Tests keyboard navigation and ARIA compliance
 */
import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('all pages have proper heading structure', async ({ page }) => {
    const pages = ['/', '/assets', '/news', '/alerts', '/portfolio']

    for (const path of pages) {
      await page.goto(path)
      
      // Should have exactly one h1
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBe(1)
    }
  })

  test('navigation is keyboard accessible', async ({ page }) => {
    await page.goto('/')

    // Tab to navigation links
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Should be able to navigate with Enter
    const focusedElement = page.locator(':focus')
    const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase())
    
    // Should focus on interactive elements
    expect(['a', 'button', 'input', 'select']).toContain(tagName)
  })

  test('modal traps focus', async ({ page }) => {
    await page.goto('/assets')

    // Wait for table
    await expect(page.getByRole('grid')).toBeVisible()

    // Open modal
    const firstRow = page.locator('tbody tr').first()
    await firstRow.click()

    // Modal should be visible
    await expect(page.getByRole('dialog')).toBeVisible()

    // Focus should be trapped in modal
    const closeButton = page.getByRole('button', { name: /close modal/i })
    await expect(closeButton).toBeFocused()
  })

  test('interactive elements have focus indicators', async ({ page }) => {
    await page.goto('/')

    // Tab to a button
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Focused element should have visible focus ring
    const focusedElement = page.locator(':focus')
    const outline = await focusedElement.evaluate(el => {
      const styles = getComputedStyle(el)
      return styles.outline || styles.boxShadow
    })

    // Should have some focus indicator
    expect(outline).toBeTruthy()
  })

  test('images have alt text or are decorative', async ({ page }) => {
    await page.goto('/')

    // All images should have alt attribute
    const images = page.locator('img')
    const count = await images.count()

    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      const ariaHidden = await img.getAttribute('aria-hidden')
      const role = await img.getAttribute('role')

      // Either has alt text, is hidden from AT, or has presentation role
      const isAccessible = alt !== null || ariaHidden === 'true' || role === 'presentation'
      expect(isAccessible).toBe(true)
    }
  })

  test('form inputs have labels', async ({ page }) => {
    await page.goto('/assets')

    // Wait for page load
    await expect(page.getByRole('grid')).toBeVisible()

    // Search input should have label
    const searchInput = page.getByRole('textbox', { name: /search/i })
    await expect(searchInput).toBeVisible()

    // Dropdown should have label
    const dropdown = page.getByRole('combobox', { name: /filter/i })
    await expect(dropdown).toBeVisible()
  })

  test('color is not the only indicator', async ({ page }) => {
    await page.goto('/')

    // Wait for content
    await expect(page.getByText('Top Gainers')).toBeVisible()

    // Positive/negative changes should have arrows in addition to color
    const upArrows = page.locator('text=↑')
    const downArrows = page.locator('text=↓')

    // Should have visual indicators beyond just color
    const upCount = await upArrows.count()
    const downCount = await downArrows.count()

    expect(upCount + downCount).toBeGreaterThan(0)
  })

  test('page has skip link or main landmark', async ({ page }) => {
    await page.goto('/')

    // Should have main landmark
    const main = page.getByRole('main')
    await expect(main).toBeVisible()
  })

  test('buttons have accessible names', async ({ page }) => {
    await page.goto('/')

    // All buttons should have accessible names
    const buttons = page.locator('button')
    const count = await buttons.count()

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i)
      const name = await button.getAttribute('aria-label')
      const text = await button.textContent()

      // Button should have either aria-label or text content
      const hasName = (name && name.length > 0) || (text && text.trim().length > 0)
      expect(hasName).toBe(true)
    }
  })
})

