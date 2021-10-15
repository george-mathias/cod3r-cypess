/// <reference types="Cypress" />

describe('Work with iFrames', () => {
    
    it('Deve preencher campo de texto', () => {
        cy.visit("/cypress/componentes.html")
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?')
        })
    })
});