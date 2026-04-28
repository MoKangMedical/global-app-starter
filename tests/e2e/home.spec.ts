import {test, expect} from '@playwright/test';
 
test.describe('Home Page', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/');
  });
 
  test('has title', async ({page}) => {
    await expect(page).toHaveTitle(/Global App/);
  });
 
  test('displays hero section', async ({page}) => {
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
  });
 
  test('navigation links work', async ({page}) => {
    await page.click('text=Features');
    await expect(page.locator('#features')).toBeVisible();
 
    await page.click('text=Pricing');
    await expect(page.locator('#pricing')).toBeVisible();
  });
 
  test('language switcher works', async ({page}) => {
    // Click on language switcher
    await page.click('[data-testid="language-switcher"]');
 
    // Select Chinese
    await page.click('text=ZH');
 
    // Verify URL changed to Chinese locale
    expect(page.url()).toContain('/zh');
 
    // Verify Chinese text is displayed
    await expect(page.locator('text=功能')).toBeVisible();
  });
});
 
test.describe('Pricing Page', () => {
  test('can start checkout', async ({page}) => {
    await page.goto('/#pricing');
 
    // Click on Pro plan
    await page.click('[data-testid="plan-pro"] button');
 
    // Should redirect to signup or checkout
    await expect(page).toHaveURL(/signup|checkout/);
  });
});
 
test.describe('Internationalization', () => {
  const locales = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt'];
 
  for (const locale of locales) {
    test(`renders correctly in ${locale}`, async ({page}) => {
      await page.goto(`/${locale}`);
 
      // Page should load without errors
      await expect(page.locator('h1')).toBeVisible();
 
      // No console errors
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
 
      await page.waitForLoadState('networkidle');
      expect(errors).toHaveLength(0);
    });
  }
});
