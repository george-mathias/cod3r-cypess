/// <reference types="Cypress" />

describe('Esperas...', () => {

    before(() => {
        cy.visit("/cypress/componentes.html")
    });

    beforeEach(() => {
        cy.reload()
    });

    it('Deve aguardar elemento estar disponível', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    });
    
    it('Deve fazer retrys', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
            .should('exist')
            .type('funciona')
    });

    it('Uso do find-1', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        // cy.get('#lista li')
        //     .find('span')
        //     .should('contain', 'Item 2')
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    });
    
    it('Uso do find-2', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    });

    it('Uso do timeout', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo').should('exist')
        // cy.get('#novoCampo', {timeout: 1000}).should('exist')

        // cy.get('#buttonListDOM').click()
        // // cy.wait(3000) //não usar ou usar com muita cautela
        // cy.get('#lista li span', {timeout: 6000})
        //     .should('contain', 'Item 2')
            
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
            .should('have.length', 1)
        cy.get('#lista li span')
            .should('have.length', 2)
    });

    it.only('Click retry', () => {
        cy.get('#buttonCount')
            .click()
            .should('have.value', '1')
    });
});