import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('ajouter du pain');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Tab');
  await page.getByRole('checkbox', { name: '❯Mark all as complete' }).press('l');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('A');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Aller courrir');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('listitem').filter({ hasText: 'ajouter du pain' }).getByLabel('Toggle Todo').check();
  await page.getByText('Mark all as complete').click();
  await page.locator('html').click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.pause();
});