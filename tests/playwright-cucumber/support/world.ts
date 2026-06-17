// ─── World ────────────────────────────────────────────────────────────────────
//
// Le "World" est le contexte partagé entre toutes les steps d'un même scénario.
// Concrètement : c'est l'objet `this` accessible dans chaque fonction Given/When/Then.
//
// On y stocke `page` (l'onglet du navigateur) et `context` (la session navigateur).
// Chaque scénario reçoit son propre World tout neuf → isolation totale entre scénarios.

import { setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";
import { BrowserContext, Page } from "playwright";

// L'interface décrit ce que `this` contient dans les steps
export interface TodoWorld {
  context: BrowserContext; // la "session" navigateur (cookies, localStorage…)
  page: Page;             // l'onglet sur lequel on interagit
  // attach et log sont fournis par Cucumber (pour les rapports)
  attach: (data: string, mediaType?: string) => void;
  log: (text: string) => void;
  parameters: Record<string, unknown>;
}

// On définit le constructeur du World avec une simple fonction
// (une classe `extends World` pose des problèmes de compatibilité avec ts-node)
function CustomWorld(this: TodoWorld, options: IWorldOptions) {
  Object.assign(this, options);
}

// On enregistre notre World auprès de Cucumber
setWorldConstructor(CustomWorld);