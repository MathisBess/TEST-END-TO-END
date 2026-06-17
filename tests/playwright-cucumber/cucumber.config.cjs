// ─── Configuration de Cucumber ────────────────────────────────────────────────

module.exports = {
  default: {
    paths: ["tests/playwright-cucumber/features/**/*.feature"],

    import: [
      "tests/playwright-cucumber/tsx-register.js",
      "tests/playwright-cucumber/support/world.ts",
      "tests/playwright-cucumber/support/hook.ts",
      "tests/playwright-cucumber/step-definitions/**/*.ts",
    ],

    format: [
      "progress",
      "html:tests/playwright-cucumber/reports/report.html",
    ],

    parallel: 1,
  },
};
