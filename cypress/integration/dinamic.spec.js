/// <reference types="Cypress" />

describe('Dinamic tests', () => {

    beforeEach(() => {
        cy.visit("/cypress/componentes.html")
    });

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

    foods.forEach(food => {
        it(`Cadastro com comida ${food}`, () => {
            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('Qualquer')
            cy.get(`[name=formSexo][value=F]`).click()
            // cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).check()
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).check()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')

            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', "Cadastrado!")
        });

    })
    it.only('Should select all options using each', () => {
        cy.get('#formNome').type('Usuario')
        cy.get('#formSobrenome').type('Qualquer')
        cy.get(`[name=formSexo][value=F]`).click()

        /* desta forma clica em todos, porém, não tem controle */
        // cy.get('[name=formComidaFavorita]').check({multiple: true})

        cy.get('[name=formComidaFavorita]').each($el => {
            if ($el.val() !== 'vegetariano')
                cy.wrap($el).click()
        })

        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')

        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', "Cadastrado!")
        // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    });
});