import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should display dashboard with key metrics', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check if dashboard header is visible
    await expect(page.locator('h1')).toContainText('Supply Chain Dashboard');
    
    // Check if navigation links are present
    await expect(page.locator('nav a[href="/"]')).toBeVisible();
    await expect(page.locator('nav a[href="/map"]')).toBeVisible();
    await expect(page.locator('nav a[href="/exceptions"]')).toBeVisible();
  });

  test('should navigate to different sections', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Navigate to live map
    await page.click('nav a[href="/map"]');
    await expect(page).toHaveURL('http://localhost:3000/map');
    
    // Navigate to exceptions
    await page.click('nav a[href="/exceptions"]');
    await expect(page).toHaveURL('http://localhost:3000/exceptions');
  });

  test('should display shipment metrics', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check for metric cards
    await expect(page.locator('[data-testid="total-shipments"]')).toBeVisible();
    await expect(page.locator('[data-testid="active-shipments"]')).toBeVisible();
    await expect(page.locator('[data-testid="exceptions-count"]')).toBeVisible();
  });
});