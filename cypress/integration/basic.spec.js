///<reference types="cypress" />

describe('Cypress basics', () => {
    it.only('Should visit a page and asset title', () => {
        cy.visit("/cypress/componentes.html")

        cy.pause()

        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo')

        cy.title()
            .should('contains', 'Campo de Treinamento')
            .should('contain', 'Campo')        
    });

    it('Deve encontar e interagir com um elemento', () => {
        cy.visit("/cypress/componentes.html")
        
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    });
});