/// <reference types="Cypress-xpath" />

describe('Should test at a funcional level', () => {
    
    let token = null
    before(() => {

        cy.getToken('george@gmail.com', 'abc123')
            .then(response => {
                token = response
            })
    });

    beforeEach(() => {
        cy.resetRest(token)
    });

    it.only('Should a create an account', () => {

        // esta opção não foi passada pelo instrutor
        // cy.request({
        //     url: 'https://barrigarest.wcaquino.me/reset',
        //     method: 'GET',
        //     headers: { Authorization: `JWT ${token}` }
        // })

        cy.request({
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`
            },
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

    });

    it('should not cerate an account with same name', () => {

    });

    it('should create a transaction', () => {

    });

    it('should get balance', () => {

    });

    it('should remove a transaction', () => {

    });
});