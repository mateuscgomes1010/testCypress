const { defineConfig } = require("cypress");
const { readPdf } = require('./cypress/support/helper.js');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Relatório de Testes - CTI',
    embeddedScreenshots: true,
    inlineAssets: true, // Gera um único arquivo HTML standalone
    saveAllAttempts: false,
  },
  viewportHeight: 880,
  viewportWidth: 1280,
  chromeWebSecurity: false,
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)

      on('task', {
        readPdf
      })
      return config;
    }
  }
})
