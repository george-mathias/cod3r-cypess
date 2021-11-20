const buildEnv = () => {
    
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


        cy.route({
            url: '/contas',
            method: 'GET',
            response: [
                { id: 1, nome:'Carteira', visivel: true, usuario_id: 1 },
                { id: 2, nome:'Banco', visivel: true, usuario_id: 1 },
            ]
        }).as('contas')
}

export default buildEnv