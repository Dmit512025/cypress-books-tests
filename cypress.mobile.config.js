const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'jiuzus',
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 375,
    viewportHeight: 667,
    setupNodeEvents(on, config) {
      return config
    },
  },
})
