/// <reference types="Cypress" />

describe('Should test at a funcional level', () => {
    
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        // cy.get('.input-group > .form-control').type('george@gmail.com')
        // cy.get(':nth-child(2) > .form-control').type('abc123')
        // cy.get('.btn').click()
        // cy.get('.toast-message').should('contain', 'Bem vindo,')
    });

    it('Should a create an account', () => {
        cy.get('.dropdown-toggle > .fas').click()
        cy.get('[href="/contas"]').click()
        cy.url().should('contain', '/contas')
        
        cy.get('.form-control').type('mercado semanal')
        cy.get('.btn').click()
        cy.url().should('contain', '/contas')
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso')
    });
});