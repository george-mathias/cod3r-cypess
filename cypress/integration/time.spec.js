/// <reference types="Cypress" />

describe('Work with clock', () => {
    
    before(() => {
        cy.visit("/cypress/componentes.html")
    });

    it('Going back to the past', () => {
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain','17/10/2021')
        
        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain','31/12/1969')
        
        const dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain','10/04/2012')        
    });
});