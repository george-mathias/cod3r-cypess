/// <reference types="Cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit("/cypress/componentes.html")
    });

    beforeEach(() => {
        cy.reload()
    });

    it('Using jquery selector', () => {
        // cy.get('input[onclick="javascript:fazerCadastro()"]')
        cy.get('input[onclick="javascript:fazerCadastro()"]')
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get('[onclick*=\'Francisco\']')
        cy.get("[onclick*='Francisco']")
        cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input')
        cy.get('#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) > input')
    });

    //npm install cypress-xpath
    it.only('Using xpath', () => {
        cy.xpath('//input[contains(@onclick, \'Francisco\')]')
        cy.xpath('//input[contains(@onclick, \'Francisco\')]')
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input[@type='text']")
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type('Funciona')
    });
});