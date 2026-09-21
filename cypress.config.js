const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "jiuzus",
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // здесь можно добавить плагины
    },
  },
});
