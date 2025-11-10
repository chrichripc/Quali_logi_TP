import { Page, expect } from '@playwright/test';
export class TodoPage {
readonly page: Page;
readonly todoInput = 'input[placeholder="What needs to be done?"]';
readonly todoList = '.todo-list li';
constructor(page: Page) {
this.page = page;
}
async goto() {
await this.page.goto('https://demo.playwright.dev/todomvc');
}
async addTask(task: string) {
await this.page.fill(this.todoInput, task);
await this.page.keyboard.press('Enter');
}
async deleteTask(task: string) {
const todoItem = this.page.locator(`xpath=//label[text()="${task}"]/..`);
await todoItem.hover();
await todoItem.locator('.destroy').click();
}
async completeTask(task: string) {
const todoItem = this.page.locator(`xpath=//label[text()="${task}"]/..//input[@class='toggle']`);
await todoItem.check();
}
async isTaskVisible(task: string) {
await expect(this.page.getByText(task)).toBeVisible();
}
async isTaskCompleted(task: string) {
const todoItem = this.page.locator(`xpath=//label[text()="${task}"]/../..`);
await expect(todoItem).toHaveClass(/completed/);
}
}