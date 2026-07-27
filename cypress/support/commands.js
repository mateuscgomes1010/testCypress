Cypress.Commands.add('loginViaApi', (email = 'qa.teste@teste.pge.ce.gov.br', password = '3Fh$8Dx@mNv6#bKj1Zp%') => {
  cy.session([email, password], () => {
    // 1. Faz GET na página de login para pegar o CSRF Token gerado pelo Rails
    cy.request('GET', 'http://testeqa.pge.ce.gov.br/admins/sign_in').then((response) => {
      // Extrai o token de dentro do HTML da página
      const parser = new DOMParser()
      const doc = parser.parseFromString(response.body, 'text/html')
      const token = doc.querySelector('input[name="authenticity_token"]')?.value

      // 2. Faz o POST para autenticar via Form Data com o token capturado
      cy.request({
        method: 'POST',
        url: 'http://testeqa.pge.ce.gov.br/admins/sign_in',
        form: true, // Garante envio como 'application/x-www-form-urlencoded'
        body: {
          'utf8': '✓',
          'authenticity_token': token,
          'admin[email]': email,
          'admin[password]': password,
          'commit': 'Entrar'
        }
      })
    })
  })
})