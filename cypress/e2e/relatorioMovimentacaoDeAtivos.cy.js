import Login from '../pages/login'  
import Relatorio from '../pages/relatorio'

describe('Relatório de Movimentação de Ativos', () => {

    beforeEach(() => {
        cy.loginViaApi()
        Login.visitarPagina()
    })

    it('Consulta com Sucesso por Área e Período com Registros Encontrados', () => {
        Relatorio.clicarBtnRelatorioMenu() 
        Relatorio.clicarBtnRelatorioMovimentacaoDeAtivos()
        Relatorio.selecionarArea()
        Relatorio.preencherDataInicial('24/07/2026')
        Relatorio.preencherDataFinal('24/07/2026')
        Relatorio.clicarBtnPesquisar()
        Relatorio.validarCabecalhosDoRelatorio('CONSULTORIA', '24 de Julho de 2026', '31 movimentações')
        Relatorio.validarNenhumaDataDiferenteExibida('24 de Julho de 2026')
        Relatorio.validarColunasDaLinhaDoTombo({
            tombo: 'AUTO-1784936882333',
            descricao: 'CAMERA Teste Teste',
            lotacaoAnterior: 'CTI / DEPOSITO SERVICE DESK',
            lotacaoAtual: 'CONSULTORIA / ANALISTAS',
            colaborador: 'Teste'
        })
    })

    it('Geração de Relatório PDF em Nova Aba', () => { 
        Relatorio.clicarBtnRelatorioMenu() 
        Relatorio.clicarBtnRelatorioMovimentacaoDeAtivos()
        Relatorio.selecionarArea()
        Relatorio.preencherDataInicial('24/07/2026')
        Relatorio.preencherDataFinal('24/07/2026')
        Relatorio.clicarBtnPesquisar()
        Relatorio.clicarBtnGerarRelatorio()
        Relatorio.validarConteudoDoPDFrelatorioMovimentacaoDeAtivos()
    })

    it('Consulta sem Dados no Período/Área Selecionados', () => {
        Relatorio.clicarBtnRelatorioMenu() 
        Relatorio.clicarBtnRelatorioMovimentacaoDeAtivos()
        Relatorio.selecionarArea()
        Relatorio.preencherDataInicial('24/07/2010')
        Relatorio.preencherDataFinal('24/07/2010')
        Relatorio.clicarBtnPesquisar()
        Relatorio.validarMensagemSemDadosDePesquisaRelatorioMovimentacaoAtivos('Sem movimentações para: CONSULTORIA')
    })

    it('Validação de Formato e Intervalo Invalido no Filtro de Período', () => {
        Relatorio.clicarBtnRelatorioMenu() 
        Relatorio.clicarBtnRelatorioMovimentacaoDeAtivos()
        Relatorio.selecionarArea()
        Relatorio.preencherDataInicial('24/07/2026')
        Relatorio.preencherDataFinal('23/07/2026')
        Relatorio.clicarBtnPesquisar()
        Relatorio.validarMensagemDeErroParaDataFinalSuperiorDataInicial()
    })

    it('Tentativa de Gerar Relatório sem Resultados ou Pesquisa Prévia', () => {
        Relatorio.clicarBtnRelatorioMenu() 
        Relatorio.clicarBtnRelatorioMovimentacaoDeAtivos()
        Relatorio.clicarBtnPesquisar()
        Relatorio.validarMensagemDeBloqueioParaGerarRelatorioSemDados()

    })
})