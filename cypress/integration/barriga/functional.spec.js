/// <reference types="Cypress-xpath" />

import loc from '../../support/locators'

describe('Should test at a funcional level', () => {
    
    before(() => {
        cy.login('george@gmail.com', 'abc123')
        cy.resetConta()
        // cy.get('[href="/reset"]') 
    });

    it('Should a create an account', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.url().should('contain', '/contas')
        
        cy.get(loc.CONTAS.NOME).type('Conta de teste')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    });

    it('should update an account', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada')
  
    });
});