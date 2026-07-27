import BasePage from '../base'

const ELEMENTOS = {
  btnNovaAtribuicao: 'a > .btn',
  menuAtribuicoes: ':nth-child(5) > a > .nav-link > span',
  selectArea: '#set_area',
  selectSubarea: '#resp_subarea',
  radioColaborador: '#bond_employee_type_colaborador',
  radioSubarea: '#bond_employee_type_subarea',
  containerColaboradorSelect2: '#select2-collaborators-container',
  campoBuscaSelect2: '.select2-search__field',
  selectAtendidoPor: '#attended',
  radioPresencial: '#bond_modality_presencial',
  radioHomeOffice: '#bond_modality_home_office',
  selectSO: '#so',
  checkOffice: '#check_office',
  selectPacoteOffice: '#key',
  btnAtribuirAtivo: '#btn_asset',
  selectDescricaoAtivo: '#set_description',
  selectStatusAtivo: '#set_status',
  btnSalvar: '[name="commit"]',
  btnCancelar: 'button.btn-danger',
  mensagemGrowl: '.bootstrap-growl',
  containerPesquisaTombo: '#select2-q_bond_asset_asset_id_eq-container',
  campoBuscaSelect2TomboCriado: '.select2-search__field',
  btnEditarAtribuicao: 'a[href*="/bonds/"][href$="/edit"]',
  btnVisualizarAtivos: 'tbody tr:first-child a[data-target="#bondmodal"]',
  mensagemDealertaAtivoNaoInformado: 'div.alert.alert-danger',
  checkBoxAtribuicao: 'input[name="bonds_ids[]"]',
  btnGerarTermos: 'button[data-target="#generate_term"]',
  radioTermoResponsabilidade: '#term_type_liability',
  radioTermoEmprestimo: '#term_type_loan',
  btnGerarTermoSelecionadoTipo: '#btn-termo',
  btnXFecharModalGerarTermo: '.modal.show button[data-dismiss="modal"]' // elemento não pode estar focado e marcado como "escondido/invisível" (aria-hidden="true") ao mesmo tempo.
}

class Atribuicoes extends BasePage {

  clicarNovaAtribuicao() {
    this.clicar(ELEMENTOS.btnNovaAtribuicao)
  }

  apagarAreaDaAtribuicaoDoAtivo() {
    this.selecionarValorVazioDaSelecao(ELEMENTOS.selectArea)
  }

  clicarBtnXFecharModalGerarTermo() {
    this.clicarDestravandoAriaHidden(ELEMENTOS.btnXFecharModalGerarTermo) 
  }

  validarModalFechou() {
    cy.get('#generate_term').should('not.be.visible')
    cy.get('.modal-backdrop').should('not.exist')
  }

  validarConteudoDoPDFResponsabilidade(){
    cy.get('@tomboCriado').then((tomboCriado) => {
    cy.task('readPdf', 'cypress/downloads/termo_responsabilidade.pdf')
      .should('contain', 'TERMO DE RESPONSABILIDADE')
      .and('contain', 'Nome: Teste')
      .and('contain', 'Área: CONSULTORIA')
      .and('contain', tomboCriado) // Usa o tombo resgatado
    })
  }

  validarConteudoDoPDFEmprestimo(){
    cy.get('@tomboCriado').then((tomboCriado) => {
    cy.task('readPdf', 'cypress/downloads/termo_emprestimo.pdf')
      .should('contain', 'TERMO DE EMPRÉSTIMO')
      .and('contain', 'Nome: Teste')
      .and('contain', 'Área: CONSULTORIA')
      .and('contain', tomboCriado) // Usa o tombo resgatado
    })
  }

  clicarBtnGerarTermoSemDownloadDoArquivo() {
    this.clicar(ELEMENTOS.btnGerarTermoSelecionadoTipo)
  }

  validarMensagemAlert(mensagemEsperada) {
  cy.on('window:alert', (textoDoAlert) => {
    expect(textoDoAlert).to.equal(mensagemEsperada)
  })
}

  clicarBtnGerarTermoSelecionadoTipo(nomeArquivo = 'termo_responsabilidade.pdf') {
  // 1. Intercepta o window.open
  cy.window().then((win) => {
    cy.stub(win, 'open').as('openWindow')
  })

  // 2. Clica no botão
  this.clicar(ELEMENTOS.btnGerarTermoSelecionadoTipo)

  // 3. Pega a URL e salva com o nome dinâmico
  cy.get('@openWindow').should('have.been.calledOnce').then((stub) => {
    const urlPdf = stub.args[0][0]

    cy.request({
      url: urlPdf,
      encoding: 'binary'
    }).then((response) => {
      // Salva usando o nome recebido por parâmetro
      cy.writeFile(`cypress/downloads/${nomeArquivo}`, response.body, 'binary')
    })
    })
  }

  marcarCheckBoxDaAtribuicao() {
  this.marcar(`${ELEMENTOS.checkBoxAtribuicao}:first`)
}

  marcarRadioTermoResponsabilidade() {
    this.marcar(ELEMENTOS.radioTermoResponsabilidade)
  }

  marcarRadioTermoEmprestimo() {
    this.marcar(ELEMENTOS.radioTermoEmprestimo)
  }

  clicarBtnGerarTermoAtribuicao() {
    this.clicar(ELEMENTOS.btnGerarTermos)
  }

  validarModalidadeAtribuicao() {
    this.validarRadioSelecionado(ELEMENTOS.radioHomeOffice)
  }

  validarMensagemDeAlertaAtivoNaoInformado() {
    this.validarTextoVisivel(ELEMENTOS.mensagemDealertaAtivoNaoInformado, 'Ativo não informado!')
  }

  clicarBtnVisualizarAtivos() {
  cy.get(ELEMENTOS.btnVisualizarAtivos)
    .eq(1) // Seleciona o primeiro botão "Visualizar Ativos"
    .click({ force: true })
  }

  clicarBtnEditarAtribuicao() {
    this.clicar(ELEMENTOS.btnEditarAtribuicao, { force: true })
  }

  validarTextoAreaAtribuicao(textoEsperado = 'CONSULTORIA') {
    this.validarOpcaoSelecionada(ELEMENTOS.selectArea, textoEsperado)
  }

  validarTextoSubareaAtribuicao(textoEsperado = 'ANALISTAS') {
    this.validarOpcaoSelecionada(ELEMENTOS.selectSubarea, textoEsperado)
  }

  validarTextoAtendidoPorAtribuicao(textoEsperado = 'Atendente') {
    this.validarOpcaoSelecionada(ELEMENTOS.selectAtendidoPor, textoEsperado)
  }

  clicarEPesquisarTomboCriado(nomeAlias = 'tomboCriado') {
      cy.get(`@${nomeAlias}`).then(tomboSalvo => {
      this.clicar(ELEMENTOS.containerPesquisaTombo)
      cy.get(ELEMENTOS.campoBuscaSelect2TomboCriado).type(tomboSalvo)
      cy.contains('.select2-results__option', tomboSalvo).click()
    })
  }

  clicarAtribuicoes() {
    this.clicar(ELEMENTOS.menuAtribuicoes)
  }

  selecionarAreaAtribuicao(area = 'CONSULTORIA') {
    cy.intercept('GET', '**/portal_service/subareas.json*').as('carregarSubareas')
    this.selecionarOpcao(ELEMENTOS.selectArea, area)
  }

  selecionarSubareaAtribuicao(subarea = 'ANALISTAS') {
    cy.wait('@carregarSubareas')
    this.selecionarOpcao(ELEMENTOS.selectSubarea, subarea)
  }

  marcarOpcaoColaboradorAtribuicao() {
    this.marcar(ELEMENTOS.radioColaborador)
  }

  selecionarColaboradorAtribuicao(nomeColaborador = 'Teste') {
    this.clicar(ELEMENTOS.containerColaboradorSelect2)
    cy.contains('.select2-results__option', nomeColaborador).click()
  }

  selecionarAtendidoPor(atendente = 'Atendente') {
    this.selecionarOpcao(ELEMENTOS.selectAtendidoPor, atendente)
  }

  selecionarModalidadePresencialAtribuicao() {
    this.marcar(ELEMENTOS.radioPresencial)
  }

  selecionarModalidadeHomeOfficeAtribuicao() {
    this.marcar(ELEMENTOS.radioHomeOffice)
  }

  selecionarSOAtribuicao(valor = '2') {
    this.selecionarOpcao(ELEMENTOS.selectSO, valor)
  }

  marcarCheckBoxUtilizaraPacoteOfficeAtribuicao() {
    this.marcar(ELEMENTOS.checkOffice)
  }

  desmarcarCheckBoxUtilizaraPacoteOfficeAtribuicao() {
    this.desmarcar(ELEMENTOS.checkOffice)
  }

  selecionarPacoteOfficeAtribuicao(valor = '1') {
    this.selecionarOpcao(ELEMENTOS.selectPacoteOffice, valor)
  }

  validarCampoDisabledPacoteOfficeAtribuicao() {
    cy.get(ELEMENTOS.selectPacoteOffice).should('be.disabled')
  }

  validarCampoMarcadoPacoteOfficeAtribuicao() {
    cy.get(ELEMENTOS.selectPacoteOffice).should('be.checked')
  }

  selecionarSubareaSemColaborador() {
    this.marcar(ELEMENTOS.radioSubarea)
  }

  validarCampoSemColaboradorComSubareaAtribuicao() {
    this.validarAtributo(ELEMENTOS.containerColaboradorSelect2, 'title', 'SUBAREA')
  }

  clicarAtribuirAtivoAtribuicao() {
    this.clicar(ELEMENTOS.btnAtribuirAtivo)
  }

  selecionarTomboDoAtivoAtribuicao() {
    cy.get('@tomboCriado').then(tomboSalvo => {
      cy.get(ELEMENTOS.campoBuscaSelect2).type(tomboSalvo)
      cy.contains('.select2-results__option', tomboSalvo).click()
    })
  }

  selecionarDescricaoDoAtivoAtribuicao(nomeAtivo = 'CAMERA Teste Teste') {
    cy.get(ELEMENTOS.selectDescricaoAtivo)
      .contains('option', nomeAtivo)
      .then($option => {
        cy.get(ELEMENTOS.selectDescricaoAtivo).select($option.val(), { force: true })
      })
  }

  selecionarStatusVinculadoDoAtivoAtribuicao(status = '5') {
    cy.get(`${ELEMENTOS.selectStatusAtivo} option`).should('have.length.at.least', 1)
    this.selecionarOpcao(ELEMENTOS.selectStatusAtivo, status)
  }

  clicarSalvarAtribuicao() {
    this.clicar(ELEMENTOS.btnSalvar)
  }

  validarMensagemDeSucessoAtivoVinculado() {
    this.validarTextoVisivel(ELEMENTOS.mensagemGrowl, 'Ativos vinculados a: Teste, Parabéns!')
  }

  validarMensagemCampoObrigatorioAreaNovaAtribuicao() {
    this.validarMensagemObrigatoriaNativa(ELEMENTOS.selectArea)
  }

  validarMensagemCampoObrigatorioAtendidoPor() {
    this.validarMensagemObrigatoriaNativa(ELEMENTOS.selectAtendidoPor)
  }

  clicarBotaoCancelarAtribuicao() {
    cy.contains(ELEMENTOS.btnCancelar, 'Cancelar').click()
  }

  validarMensagemCampoObrigatorioUtilizaraPacoteOffice() {
    this.validarMensagemObrigatoriaNativa(ELEMENTOS.selectPacoteOffice)
  }

  alterarStatusDoTombo(nomeAlias = 'tomboCriado', novoStatus) {
  cy.get(`@${nomeAlias}`).then((codigoTombo) => {
    // 1. Busca os containers de linha que estão visíveis na tela
    cy.get('.nested-fields')
      .filter(':visible')
      .each(($linha) => {
        // 2. Se a linha contiver o código do tombo (no texto ou no valor do select)
        if ($linha.text().includes(codigoTombo) || $linha.find('select').val() === codigoTombo) {
          // 3. Altera o status dessa linha de forma direta
          cy.wrap($linha).find('#set_status').select(novoStatus, { force: true })
        }
      })
    })
  }
  
  removerTombo(nomeAlias = 'tomboCriado') {
  cy.get(`@${nomeAlias}`).then((codigoTombo) => {
    cy.get('select#set_tombo')
      .contains('option', codigoTombo)
      .parents('.row')
      .find('a.remove_fields')
      .click()
    })
  }
  // Usado especificamente na EDIÇÃO (quando o campo já existe mas está fechado)
  abrirEPesquisarTomboParaEditar(nomeAlias = 'tomboCriado2') {
    // 1. Clica para abrir o container do Select2 da linha em branco/nova
    this.clicar('#select2-set_tombo-container')// ajuste para o seletor da caixa da edição
    cy.get(`@${nomeAlias}`).then((codigoTombo) => {
      this.preencher(ELEMENTOS.campoBuscaSelect2, `${codigoTombo}{enter}`)
    })
  }

  validarDadosDoTomboNoModal(nomeAlias = 'tomboCriado2', descricaoEsperada, statusEsperado) {
  cy.get(`@${nomeAlias}`).then((codigoTombo) => {
    const tomboLimpo = codigoTombo.trim()

    // Busca a célula do tombo diretamente dentro das linhas (tr) de tabela existentes
    cy.get('tr', { timeout: 10000 })
      .contains('td', tomboLimpo)
      .closest('tr')
      .within(() => {
        cy.get('td').eq(0).should('contain.text', tomboLimpo)
        cy.get('td').eq(1).should('contain.text', descricaoEsperada)
        cy.get('td').eq(2).should('contain.text', statusEsperado)
      })
    })
  }

  validarMensagemObrigatorioAtivoComDefeito() {
    this.validarTextoVisivel(ELEMENTOS.mensagemGrowl, 'Informe o defeito do ativo para prosseguir com a atribuição!')
  }
}
export default new Atribuicoes();