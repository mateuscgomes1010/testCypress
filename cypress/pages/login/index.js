// cypress/pages/Login.js
import BasePage from '../base'

// Mapeamos os seletores da tela em um objeto centralizado
const ELEMENTOS = {
  campoEmail: '[name="admin[email]"]',
  campoSenha: '[name="admin[password]"]',
  botaoEntrar: '[name="commit"]',
  mensagemGrowl: '.bootstrap-growl'
}

class Login extends BasePage {

  visitarPagina() {
    this.visitar('http://testeqa.pge.ce.gov.br')
  }

  preencherEmail(email) {
    // Usa o 'preencher' da BasePage passando o seletor e o valor e espera até 10 segundos para o campo de e-mail estar visível
    this.preencher(ELEMENTOS.campoEmail, email, { timeout: 10000 })
  }

  preencherSenha(senha) {
    this.preencher(ELEMENTOS.campoSenha, senha)
  }

  clicarEntrar() {
    // Usa o 'clicar' da BasePage
    this.clicar(ELEMENTOS.botaoEntrar)
  }

  // Podemos tornar a função mais flexível permitindo passar e-mail e senha por parâmetro
  realizarLogin(email = 'qa.teste@teste.pge.ce.gov.br', senha = '3Fh$8Dx@mNv6#bKj1Zp%') {
    this.preencherEmail(email)
    this.preencherSenha(senha)
    this.clicarEntrar()
  }

  validarMensagemDeSucessoLogin() {
    // Usa a validação da BasePage
    this.validarTextoVisivel(ELEMENTOS.mensagemGrowl, 'Logado com sucesso.')
  }
}

export default new Login();