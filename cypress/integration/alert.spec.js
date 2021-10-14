/// <reference types="Cypress" />

describe('Alerts...', () => {
    
    before(() => {
        cy.visit("/cypress/componentes.html")
    });

    beforeEach(() => {
        cy.reload()
    });

    it('Alert', () => {
        cy.get('#alert').click()
        cy.on('window:alert', msg => {
            console.log(msg);
            expect(msg).to.be.equal('Alert Simples')
        })
    })
});