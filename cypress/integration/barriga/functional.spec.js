/// <reference types="Cypress-xpath" />

describe('Should test at a funcional level', () => {
    
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.get('.input-group > .form-control').type('george@gmail.com')
        cy.get(':nth-child(2) > .form-control').type('abc123')
        cy.get('.btn').click()
        // cy.get('.toast-message').should('contain', 'Bem vindo,')
        // cy.get('[href="/reset"]') 
    });

    it('Should a create an account', () => {
        cy.get('.dropdown-toggle > .fas').click()
        cy.get('[href="/contas"]').click()
        cy.url().should('contain', '/contas')
        
        cy.get('.form-control').type('Conta de teste')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso')
    });

    it('should update an account', () => {
        // cy.get('[data-test=menu-settings').click()
        // cy.get('[href=\'/contas').click()
        cy.xpath("//table//td[contains(., 'Conta de teste')]/..//i[@class='far fa-edit']").click()
        cy.get('[data-test=nome]')
            .clear()
            .type('Conta alterada')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta atualizada')
  
    });
});