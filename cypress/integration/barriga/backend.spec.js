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

    it('Should a create an account', () => {

        cy.request({
            url: '/contas',
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
        cy.request({
            url: '/contas',
            method: 'GET',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => { 

            cy.request({
                url: `/contas/${res.body[0].id}`,
                method: 'PUT',
                followRedirect: false,
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'conta alterada vai rest'
                }
            }).as('response')
        })
        

        cy.get('@response').its('status').should('be.equal', 200)
    });

    it.only('should not cerate an account with same name', () => {

        cy.request({
            url: '/contas',
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false 
        }).as('response')

        cy.get('@response').then(res => {
            console.log(res);
            
            expect(res.status).to.be.equal(400)
            // expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    });

    it('should create a transaction', () => {

    });

    it('should get balance', () => {

    });

    it('should remove a transaction', () => {

    });
});