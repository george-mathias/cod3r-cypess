/// <reference types="Cypress-xpath" />

describe('Work with basic elements', () => {
    
    it('Text', () => {
        
        cy.visit("/cypress/componentes.html")
    
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    });

    it.only('Links', () => {
        cy.visit("/cypress/componentes.html")

        cy.xpath('//a[contains(text(),"Voltar")]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
        
        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

    });

});