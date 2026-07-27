import BasePage from '../base'

const ELEMENTOS = {
  menuAtivos: ':nth-child(6) > .nav-link',
  subnavNovoEditarAtivos: '[href="/portal_service/listing_assets"] > .collapse-item',
  btnNovoAtivo: '[href="/portal_service/listing_assets/new"] > .btn',
  selectTipoAtivo: '#type',
  campoMarca: '[name="asset[brand]"]',
  campoModelo: '[name="asset[model]"]',
  campoTombo: '[name="asset[tombo]"]',
  selectCodigoAquisicao: '[name="asset[acquisition_id]"]',
  btnSalvar: '[name="commit"]',
  mensagemGrowl: '.bootstrap-growl',
  menuDepositoCTI: 'i',
  containerTomboSelect2: '#select2-tombo-container',
  campoBuscaSelect2: '.select2-search__field'
}

class Ativos extends BasePage {

  clicarMenuAtivos() {
    this.clicar(ELEMENTOS.menuAtivos)
  }

  clicarBotaoNovoEditarAtivos() {
    this.clicar(ELEMENTOS.subnavNovoEditarAtivos)
  }

  clicarBotaoNovoAtivo() {
    this.clicar(ELEMENTOS.btnNovoAtivo)
  }

  selecionarTipoNovoAtivo(tipo = 'CAMERA') {
    this.selecionarOpcao(ELEMENTOS.selectTipoAtivo, tipo)
  }

  informarMarcaNovoAtivo(marca = 'Teste') {
    this.preencher(ELEMENTOS.campoMarca, marca)
  }

  informarModeloNovoAtivo(modelo = 'Teste') {
    this.preencher(ELEMENTOS.campoModelo, modelo)
  }

  informarTomboNovoAtivo(nomeAlias = 'tomboCriado') {
    const tomboDinamico = `AUTO-${Date.now()}`
    
    // Salva no Alias do Cypress
    cy.wrap(tomboDinamico).as(nomeAlias)

    // Usa o preencher da BasePage
    this.preencher(ELEMENTOS.campoTombo, tomboDinamico)
  }

  informarCodigoAquisicaoNovoAtivo(codigo = '1') {
    this.selecionarOpcao(ELEMENTOS.selectCodigoAquisicao, codigo)
  }

  clicarSalvarNovoAtivo() {
    this.clicar(ELEMENTOS.btnSalvar)
  }

  validarAtivoCriadoComSucesso() {
    this.validarTextoVisivel(ELEMENTOS.mensagemGrowl, 'Ativo cadastrado e enviado ao depósito com sucesso!')
  }

  clicarMenuDepositoCTI() {
    this.validarTextoVisivel(ELEMENTOS.menuDepositoCTI, 'Depósito CTI')
    cy.contains(ELEMENTOS.menuDepositoCTI, 'Depósito CTI').click()
  }

  clicarPesquisaESelecionaPorTomboDepositoCTI() {
    cy.get('@tomboCriado').then(tomboSalvo => {
      this.clicar(ELEMENTOS.containerTomboSelect2)
      this.preencher(ELEMENTOS.campoBuscaSelect2, tomboSalvo)
      cy.contains('.select2-results__option', tomboSalvo).click()
    })
  }

  validarTomboPesquisadoNaTabela() {
    cy.get('@tomboCriado').then(tomboSalvo => {
      this.validarTextoVisivel('td', tomboSalvo)
    })
  }

  validarStatusDoAtivoNaTabela(statusEsperado = 'DISPONÍVEL') {
    cy.get('@tomboCriado').then(tomboSalvo => {
      cy.contains('td', tomboSalvo)
        .parents('tr')
        .find('#status')
        .should('have.text', statusEsperado)
    })
  }

  // Método de Fluxo Completo
  criarNovoAtivo(nomeAlias = 'tomboCriado') {
    this.clicarMenuAtivos()
    this.clicarBotaoNovoEditarAtivos()
    this.clicarBotaoNovoAtivo()
    this.selecionarTipoNovoAtivo()
    this.informarMarcaNovoAtivo()
    this.informarModeloNovoAtivo()
    this.informarTomboNovoAtivo(nomeAlias)
    this.informarCodigoAquisicaoNovoAtivo()
    this.clicarSalvarNovoAtivo()
    this.validarAtivoCriadoComSucesso()
  }
}

export default new Ativos();