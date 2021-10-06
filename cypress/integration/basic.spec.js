///<reference types="cypress" />

describe('Cypress basics', () => {
    it('Should visit a page and asset title', () => {
        cy.visit("/cypress/componentes.html")

        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo')

        cy.title()
            .should('contains', 'Campo de Treinamento')
            .should('contain', 'Campo')        
    });

    it.only('Deve encontar e interagir com um elemento', () => {
        cy.visit("/cypress/componentes.html")
        
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    });
});