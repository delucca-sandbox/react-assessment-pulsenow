/**
 * E2E tests for Accessibility
 * Tests keyboard navigation and ARIA compliance
 */
import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('all pages have proper heading structure', async ({ page }) => {
    const pages = [
      { path: '/', heading: 'Dashboard' },
      { path: '/assets', heading: 'Assets' },
      { path: '/news', heading: 'News' },
      { path: '/alerts', heading: 'Alerts' },
      { path: '/portfolio', heading: 'Portfolio' },
    ]

    for (const { path, heading } of pages) {
      await page.goto(path)
      
      // Wait for page content to load
      await expect(page.getByRole('heading', { name: heading, level: 1 })).toBeVisible()
      
      // Should have h1 headings (app title + page title)
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBeGreaterThanOrEqual(1)
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

  test('modal has focusable close button', async ({ page }) => {
    await page.goto('/assets')

    // Wait for table to be fully loaded with data
    await expect(page.getByRole('grid')).toBeVisible()
    const firstRow = page.locator('tbody tr').first()
    await expect(firstRow).toBeVisible()

    // Open modal
    await expect(firstRow).toBeEnabled()
    await firstRow.click()

    // Modal should be visible
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    
    // Wait for modal content to load
    await expect(modal).toContainText(/.+/)

    // Close button should be visible and focusable
    const closeButton = page.getByRole('button', { name: /close modal/i })
    await expect(closeButton).toBeVisible()
  })

  test('interactive elements have focus indicators', async ({ page }) => {
    await page.goto('/')

    // Tab to a button
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Focused element should have visible focus ring
    const focusedElement = page.locator(':focus')
    const focusStyles = await focusedElement.evaluate(el => {
      const styles = getComputedStyle(el)
      return {
        outline: styles.outline,
        outlineStyle: styles.outlineStyle,
        outlineWidth: styles.outlineWidth,
        boxShadow: styles.boxShadow
      }
    })

    // Should have some focus indicator (not "none" or "0px")
    const hasVisibleIndicator = 
      (focusStyles.outlineStyle !== 'none' && focusStyles.outlineWidth !== '0px') ||
      (focusStyles.boxShadow !== 'none' && focusStyles.boxShadow.length > 0)
    
    expect(hasVisibleIndicator).toBe(true)
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

