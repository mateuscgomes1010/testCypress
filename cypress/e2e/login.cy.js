import Login from '../pages/login'
import BasePage from '../pages/base'


describe('Login', () => {

    beforeEach(() => {
        cy.loginViaApi()
        
    }) 
    it('Login com sucesso', () => {
        Login.visitarPagina
        
    })

    
})

