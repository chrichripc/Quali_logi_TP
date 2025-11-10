// features/step_definitions/todo.steps.ts
import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';

setDefaultTimeout(30_000); 

let browser: Browser;
let page: Page;


Before(async () => {
  browser = await chromium.launch({ headless: false, slowMo: 200 });
  const context = await browser.newContext();
  page = await context.newPage();
});


After(async () => {
  await browser.close();
});

Given('je suis sur la page TodoMVC', async () => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
});

When('j’ajoute la tâche {string}', async (task: string) => {
  await page.getByPlaceholder('What needs to be done?').fill(task);
  await page.keyboard.press('Enter');
});

Then('la tâche {string} est visible dans la liste', async (task: string) => {
  const item = page.locator('.todo-list li', { has: page.locator('label', { hasText: task }) });
  await expect(item).toBeVisible();
  await page.pause();
});


When('je supprime la tâche {string}', async (task: string) => {
  const item = page.locator(`xpath=//label[text()="${task}"]/..`);
  await item.hover();
  await item.locator('.destroy').click();
});

Then('la tâche {string} n’est plus visible dans la liste', async (task: string) => {
  const item = page.locator('.todo-list li', { has: page.locator('label', { hasText: task }) });
  await expect(item).toHaveCount(0);
  await page.pause();
});

When('je coche la tâche {string}', async (task: string) => {
  const checkbox = page
    .locator('.todo-list li', { has: page.locator('label', { hasText: task }) })
    .locator('input.toggle');
  await checkbox.check();
  await page.pause();
});

Then('la tâche {string} apparaît comme terminée', async (task: string) => {
  const item = page.locator('.todo-list li', { has: page.locator('label', { hasText: task }) });
  await expect(item).toHaveClass(/completed/);
  await page.pause()
});



