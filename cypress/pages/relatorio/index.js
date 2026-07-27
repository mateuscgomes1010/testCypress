import BasePage from '../base'

const ELEMENTOS = {
btnRelatoriosMenu: 'a[data-target="#collapseTwo"]',
btnRelatorioMovimentacaoDeAtivos: 'a[href*="/reports/index"]',
selecaoArea: '#area_name',
dataInicial: '#initial_date',
dataFinal: '#final_date',
celulaAreaTabela: 'td[colspan="6"]',
btnPesquisar: 'input[value="Pesquisar"]',
btnGerarRelatorio: 'a[href*="/pdf_create"]',
mensagemSemDados: 'td.text-center',
mensagemGrowl: '.bootstrap-growl'
}

class Relatorio extends BasePage {

  clicarBtnRelatorioMenu() {
    this.clicar(ELEMENTOS.btnRelatoriosMenu)
  }

  validarMensagemSemDadosDePesquisaRelatorioMovimentacaoAtivos(mensagemEsperada){
    this.validarTextoVisivel(ELEMENTOS.mensagemSemDados, mensagemEsperada )
  }

  validarMensagemDeErroParaDataFinalSuperiorDataInicial(){
    this.validarTextoVisivel(ELEMENTOS.mensagemGrowl, 'A data final deve ser superior ou igual a data inicial!')
  }

  validarMensagemDeBloqueioParaGerarRelatorioSemDados(){
    this.validarTextoVisivel(ELEMENTOS.mensagemGrowl, 'Informe uma Área e/ou Período para pesquisar!')
  }

  validarCabecalhosDoRelatorio(areaEsperada, periodoEsperado, qtdEsperada) {
    cy.get(ELEMENTOS.celulaAreaTabela).should('have.length', 3) // Se tiver mais de 3 linhas, o teste falhará, pois não é esperado que haja mais linhas no cabeçalho do relatório.

    cy.get(ELEMENTOS.celulaAreaTabela).eq(0)
      .should('be.visible')
      .and('contain.text', areaEsperada)

    cy.get(ELEMENTOS.celulaAreaTabela).eq(1)
      .should('be.visible')
      .and('contain.text', periodoEsperado)
      .and('contain.text', qtdEsperada)

    cy.get(ELEMENTOS.celulaAreaTabela).eq(2)
      .should('be.visible')
  }

  clicarBtnPesquisar() {
    this.clicar(ELEMENTOS.btnPesquisar)
  }

  clicarBtnRelatorioMovimentacaoDeAtivos() {
    this.clicar(ELEMENTOS.btnRelatorioMovimentacaoDeAtivos)
  }

  selecionarArea(area = 'CONSULTORIA') {
    this.selecionarOpcao(ELEMENTOS.selecaoArea, area)
  }

  preencherDataInicial(data) {
    const dataFormatada = this.obterDataFormatada(data)
    this.preencher(ELEMENTOS.dataInicial, dataFormatada)
  }

  preencherDataFinal(data) {
    const dataFormatada = this.obterDataFormatada(data)
    this.preencher(ELEMENTOS.dataFinal, dataFormatada)
  }

  validarColunasDaLinhaDoTombo(dados) {
    cy.contains('tr', dados.tombo).within(() => {
    cy.get('td').eq(0).should('have.text', dados.tombo)                      // 1ª Coluna: Tombo
    cy.get('td').eq(1).should('be.empty')                                   // 2ª Coluna: Nº de Série (Valida se está em branco)
    cy.get('td').eq(2).should('contain.text', dados.descricao)               // 3ª Coluna: Descrição
    cy.get('td').eq(3).should('contain.text', dados.lotacaoAnterior)         // 4ª Coluna: Lotação Anterior
    cy.get('td').eq(4).should('contain.text', dados.lotacaoAtual)            // 5ª Coluna: Lotação Atual
    cy.get('td').eq(5).should('contain.text', dados.colaborador)             // 6ª Coluna: Colaborador
    })
  }

  validarNenhumaDataDiferenteExibida(dataPesquisada) {
  
    cy.get('td[colspan="6"]').each(($el) => {  // Pega todos os cabeçalhos de data das tabelas
      const texto = $el.text()
      
      if (texto.includes('movimentações')) { // Se for uma linha de data (contém 'movimentações')
        expect(texto, `Esperado que a tabela contivesse apenas a data '${dataPesquisada}'`).to.include(dataPesquisada) // Falha o teste se encontrar qualquer data que não seja a pesquisada
      }
    })
  }

  clicarBtnGerarRelatorio(nomeArquivo = 'relatorio_movimentosAtivos.pdf') {
  // 1. Pega o atributo 'href' direto do link/botão
    cy.get(ELEMENTOS.btnGerarRelatorio)
      .invoke('attr', 'href')
      .then((urlPdf) => {
        
        // 2. Faz o download do arquivo via requisição de background
        cy.request({
          url: urlPdf,
          encoding: 'binary'
        }).then((response) => {
          
          // 3. Salva na pasta cypress/downloads
          cy.writeFile(`cypress/downloads/${nomeArquivo}`, response.body, 'binary')
        })
      })
    }

  validarConteudoDoPDFrelatorioMovimentacaoDeAtivos(){
    cy.task('readPdf', 'cypress/downloads/relatorio_movimentosAtivos.pdf')
      .should('contain', '31 Movimentações de Ativos para CONSULTORIA no período: 24/07/2026 à 24/07/2026')
        .and('contain', 'AUTO-1784936882333')
        .and('contain', 'CAMERA Teste Teste')
        .and('contain', 'CTI / DEPOSITO SERVICE DESK')
        .and('contain', 'CONSULTORIA / ANALISTAS')
        .and('contain', 'Teste')
  }
  



}

export default new Relatorio()