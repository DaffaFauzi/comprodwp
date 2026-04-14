import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

async function stabilize(page: Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addStyleTag({
    content: `
      *, *::before, *::after { 
        animation: none !important; 
        transition: none !important; 
        scroll-behavior: auto !important;
        caret-color: transparent !important;
      }
    `,
  })
}

test('hero EN matches snapshot', async ({ page }) => {
  await stabilize(page)
  await page.goto('/en', { waitUntil: 'networkidle' })
  const hero = page.getByTestId('hero')
  await expect(hero).toHaveScreenshot('hero-en.png', { maxDiffPixels: 0 })
})

test('hero ID matches snapshot', async ({ page }) => {
  await stabilize(page)
  await page.goto('/id', { waitUntil: 'networkidle' })
  const hero = page.getByTestId('hero')
  await expect(hero).toHaveScreenshot('hero-id.png', { maxDiffPixels: 0 })
})
