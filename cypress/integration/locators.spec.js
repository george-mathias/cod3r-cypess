/// <reference types="Cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit("/cypress/componentes.html")
    });

    beforeEach(() => {
        cy.reload()
    });

    it('...', () => {
        
    });
});