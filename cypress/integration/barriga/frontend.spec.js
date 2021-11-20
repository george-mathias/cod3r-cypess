/// <reference types="Cypress-xpath" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Should test at a funcional level', () => {
    after(() => {
        cy.clearLocalStorage()
    })
    
    beforeEach(() => {
        buildEnv()
        cy.login('george@gmail.com', 'senha errada')
        cy.get(loc.MENU.HOME).click()
    });

    it('Should a create an account', () => {
        
        cy.route({
            url: '/contas',
            method: 'POST',
            response: [
                { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1}
            ]
        }).as('saveConta')

        cy.acessarMenuConta()

        cy.route({
            url: '/contas',
            method: 'GET',
            response: [
                { id: 1, nome:'Carteira', visivel: true, usuario_id: 1 },
                { id: 2, nome:'Banco', visivel: true, usuario_id: 1 },
                { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1}
            ]
        }).as('contasSave')
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    });

    it('should update an account', () => {
        buildEnv()
        cy.route({
            url: '/contas/**',
            method: 'PUT',
            response: { id: 1, nome:'Conta alterada', visivel: true, usuario_id: 1 }
        }).as('contaParaAlteracao')
        
        cy.acessarMenuConta()
        cy.route({
            url: '/contas',
            method: 'GET',
            response: [
                { id: 1, nome:'Carteira', visivel: true, usuario_id: 1 },
                { id: 2, nome:'Banco', visivel: true, usuario_id: 1 },
                { id: 3, nome:'Conta alterada', visivel: true, usuario_id: 1 }
            ]
        }).as('contaAtualizada')
        
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME)
        .clear()
        .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    });

    it('should not cerate an account with same name', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    });

    it('should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type(123)
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        // cy.get(loc.MENU.EXTRATO).click()
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('contain', '123')
    });

    it('should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA("Conta para saldo")).should('contain', '534,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        // cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.wait(1000)
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA("Conta para saldo")).should('contain', '4.034,00')
    });

    it('should remove a transaction', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVE_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    });
});