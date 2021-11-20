/// <reference types="Cypress-xpath" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a funcional level', () => {

    before(() => {
        cy.server()
        cy.route({
            url: '/signin',
            method: 'POST',
            response: {
                id: 1000,
                nome: 'Usuario falso',
                token: "Uma string muito grande que não deveria ser aceita, mas na verdade vai"
            }
        }).as('signin')
        
        cy.route({
            url: '/saldo',
            method: 'GET',
            response: [{
                conta_id: 999,
                conta: 'carteira',
                saldo: '100.00'
            },
            {
                conta_id: 9909,
                conta: 'banco',
                saldo: '1000000.00'
            }]
        }).as('saldo')
        
        cy.login('george@gmail.com', 'senha errada')
    })

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        cy.resetConta()
    });

    it('Should a create an account', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    });

    it('should update an account', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada')
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