/// <reference types="Cypress-xpath" />

describe('Should test at a funcional level', () => {

    // let token = null
    before(() => {

        cy.getToken('george@gmail.com', 'abc123')
            // .then(response => {
            //     token = response
            // })
    });

    beforeEach(() => {
        cy.resetRest()
    });

    it('Should a create an account', () => {

        cy.request({
            url: '/contas',
            method: 'POST',
            // headers: {
            //     Authorization: `JWT ${token}`
            // },
            body: {
                nome: 'Conta via rest'

            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })

    });

    it('should update an account', () => {

        cy.getContaByName('Conta para alterar')
            .then(contaId => {
                cy.request({
                    url: `/contas/${contaId}`,
                    method: 'PUT',
                    followRedirect: false,
                    //headers: { Authorization: `JWT ${token}` },
                    body: {
                        nome: 'conta alterada vai rest'
                    }
                }).as('response')
            })


        cy.get('@response').its('status').should('be.equal', 200)
    });

    it('should not cerate an account with same name', () => {

        cy.request({
            url: '/contas',
            method: 'POST',
            // headers: {
            //     Authorization: `JWT ${token}`
            // },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            // expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    });

    it('should create a transaction', () => {

        const dayjs = require('dayjs')
        let now = dayjs()

        cy.getContaByName('Conta para movimentacoes')
            .then(contaId => {
                cy.request({
                    url: '/transacoes',
                    method: 'POST',
                    //headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: contaId,
                        data_pagamento: now.add('1', 'day').format('DD/MM/YYYY'),
                        data_transacao: now.format('DD/MM/YYYY'),
                        descricao: "desc",
                        envolvido: "inter",
                        status: true,
                        tipo: "REC",
                        valor: "123",
                    }
                }).as('response')
            })

        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')

    });

    it('should get balance', () => {

        const dayjs = require('dayjs')
        let now = dayjs()

        cy.request({
            url: "/saldo",
            method: "GET",
            //headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') {
                    saldoConta = c.saldo
                }
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            url: 'transacoes',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao 1, calculo saldo' }
        }).then(res => {

            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                //headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true,
                    data_transacao: now.format('DD/MM/YYYY'),
                    data_pagamento: now.add('1', 'day').format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            url: "/saldo",
            method: "GET",
            //headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') {
                    saldoConta = c.saldo
                }
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
    });

    it('should remove a transaction', () => {
        cy.request({
            url: 'transacoes',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                //headers: { Authorization: `JWT ${token}` }
            }).its('status').should('be.equal', 204)
        })
    });
});