import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { TodoWorld } from '../support/world.js';

Given('je suis sur la page d\'accueil de la Todo List', async function (this: TodoWorld) {
  await this.page.goto('http://localhost:5173');
});

When('je saisis {string} dans le champ d\'ajout', async function (this: TodoWorld, taskName: string) {
  await this.page.getByLabel('Nouvelle tâche').fill(taskName);
});

When('je valide l\'ajout de la tâche', async function (this: TodoWorld) {
  await this.page.keyboard.press('Enter');
});

Then('la tâche {string} doit apparaître dans la liste des tâches', async function (this: TodoWorld, taskName: string) {
  const task = this.page.getByText(taskName, { exact: true });
  await expect(task).toBeVisible();
});

Then('le compteur de tâches restantes doit indiquer {string}', async function (this: TodoWorld, count: string) {
  const counter = this.page.locator('.todo-count');
  await expect(counter).toContainText(count);
});