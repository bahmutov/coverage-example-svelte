// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

it('works', () => {
  cy.visit('/')
    .contains('Log in')
    .click()
  cy.contains('Log out')
    .should('be.visible')
    .click()
  cy.contains('Log in').should('be.visible')
})
