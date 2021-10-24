/// <reference types="Cypress-xpath" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a funcional level', () => {
    
    before(() => {
        cy.login('george@gmail.com', 'abc123')
        cy.resetConta()
        // cy.get('[href="/reset"]') 
    });

    it('Should a create an account', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    });

    it('should update an account', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta de teste')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada')  
    });

    it('should not cerate an account with same name', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta alterada')
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    });
    
    it('should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type(123)
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta alterada')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        // cy.get(loc.MENU.EXTRATO).click()
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('contain', '123')
    });

    it('should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA("Conta alterada")).should('contain', '123,00')
    });
});