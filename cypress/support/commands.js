/// <reference types="Cypress" />

import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('login', (user, password) => {
    cy.visit('https://barrigareact.wcaquino.me/')
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.PASSWORD).type(password)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo,')
})

Cypress.Commands.add('resetConta', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()
})

Cypress.Commands.add('getToken', (user, password) => {
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body: {
            email: user,
            redireciona: false,
            senha: password
        }
    }).its('body.token').should('not.be.empty')
        .then(token => {
            return token
        })
})