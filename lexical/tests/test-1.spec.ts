import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3114/');
  await page.getByRole('button', { name: 'ADD LINK ITEM' }).click();
  await page.locator('.ContentEditable__root > div > button').first().click();
});
