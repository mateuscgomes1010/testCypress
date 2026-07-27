// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Import do Mochawesome Reporter para escutar as execuções
import 'cypress-mochawesome-reporter/register'

// Coloque no e2e.js para valer para TODOS os testes do projeto
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false impede que o Cypress quebre o teste por causa de bugs do JS da aplicação
  return false;
});