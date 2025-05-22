import { expect, test } from '@playwright/test';

test('write text', async ({ page }) => {
  await page.goto('http://localhost:3114');

  // Click the get started link.
  await page.getByRole('textbox').fill('eorhug');
  await expect(page.getByRole('textbox')).toContainText(['eorhug']);
});

test('add link item', async ({ page }) => {
  await page.goto('http://localhost:3114');

  // Click the get started link.
  await page.getByRole('button', { name: 'ADD LINK ITEM' }).click();

  // check iframe

  await page.getByRole('button', { name: 'toggle to button' }).nth(0).click();
  // await expect(page.getByLabel).toContainText(['eorhug']);
});
