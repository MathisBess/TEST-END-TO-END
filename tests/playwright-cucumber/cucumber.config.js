// ─── Configuration de Cucumber ────────────────────────────────────────────────
//
// Ce fichier dit à Cucumber :
//   - où trouver les scénarios (.feature)
//   - quels fichiers charger avant de lancer les tests (support + step definitions)
//   - comment afficher les résultats

module.exports = {
  default: {
    // Les fichiers .feature contiennent les scénarios Gherkin (Given/When/Then)
    paths: ["tests/playwright-cucumber/features//*.feature"],

    // Fichiers chargés dans l'ordre avant chaque test :
    //   1. world.ts   → définit le "contexte partagé" entre les steps (page, browser…)
    //   2. hooks.ts   → code qui s'exécute avant/après chaque scénario
    //   3. les steps  → les fonctions qui implémentent chaque ligne Gherkin
    require: [
      "tests/playwright-cucumber/support/world.ts",
      "tests/playwright-cucumber/support/hooks.ts",
      "tests/playwright-cucumber/step-definitions//*.ts",
    ],

    // ts-node permet d'écrire les steps en TypeScript (sinon il faudrait du JS)
    requireModule: ["ts-node/register"],

    // Affichage : "progress" dans le terminal, rapport HTML dans /reports/
    format: [
      "progress",
      "html:tests/playwright-cucumber/reports/report.html",
    ],

    // parallel: 1 = les scénarios s'exécutent l'un après l'autre (plus simple pour débuter)
    parallel: 1,
  },
};