/// <reference types="Cypress-xpath" />

describe('Work with basic elements', () => {
    
    before(() => {
        cy.visit("/cypress/componentes.html")
    });

    beforeEach(() => {
        cy.reload()
    });

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    });

    it.only('Links', () => {
        cy.xpath('//a[contains(text(),"Voltar")]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
        
        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

    });

});