/// <reference types="Cypress" />

describe('Should test a funcional level', () => {
    
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.get('.input-group > .form-control').type('george@gmail.com')
        cy.get(':nth-child(2) > .form-control').type('abc123')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo,')
    });

    it('login', () => {

    });
});