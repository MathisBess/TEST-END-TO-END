import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser } from "playwright";
import { TodoWorld } from "./world";

// Temps max accordé à chaque step avant échec
setDefaultTimeout(30_000);

// Le navigateur est partagé entre tous les scénarios
let browser: Browser;

// Lancé UNE SEULE FOIS avant tous les scénarios
BeforeAll(async () => {
  browser = await chromium.launch({
    headless: true, // false = navigateur visible (utile pour déboguer)
  });
});

// Lancé UNE SEULE FOIS après tous les scénarios
AfterAll(async () => {
  await browser.close();
});

// Lancé avant CHAQUE scénario
Before(async function (this: TodoWorld) {
  // Nouveau context = localStorage vide, cookies vides
  // → chaque scénario repart de zéro
  this.context = await browser.newContext({
    storageState: { cookies: [], origins: [] },
  });
  this.page = await this.context.newPage();
});

// Lancé après CHAQUE scénario
After(async function (this: TodoWorld) {
  await this.context.close();
});