import Login from '../pages/login'
import Atribuicoes from '../pages/atribuicoes'
import Ativos from '../pages/ativos'

describe('Geração de Termos de Atribuições', () => {

    beforeEach(() => {
        cy.loginViaApi()
        Login.visitarPagina()
    })

    it('Gerar Termo de Responsabilidade em PDF com Sucesso', () => {
        Ativos.criarNovoAtivo()
        Atribuicoes.clicarAtribuicoes()
        Atribuicoes.clicarNovaAtribuicao()
        Atribuicoes.selecionarAreaAtribuicao()
        Atribuicoes.selecionarSubareaAtribuicao()
        Atribuicoes.selecionarSubareaSemColaborador()
        Atribuicoes.selecionarColaboradorAtribuicao()
        Atribuicoes.selecionarAtendidoPor()
        Atribuicoes.selecionarModalidadeHomeOfficeAtribuicao()
        Atribuicoes.selecionarSOAtribuicao()
        Atribuicoes.desmarcarCheckBoxUtilizaraPacoteOfficeAtribuicao()
        Atribuicoes.validarCampoDisabledPacoteOfficeAtribuicao()
        Atribuicoes.clicarAtribuirAtivoAtribuicao()
        Atribuicoes.selecionarTomboDoAtivoAtribuicao()
        Atribuicoes.selecionarDescricaoDoAtivoAtribuicao()
        Atribuicoes.selecionarStatusVinculadoDoAtivoAtribuicao()
        Atribuicoes.clicarSalvarAtribuicao()
        Atribuicoes.validarMensagemDeSucessoAtivoVinculado()//salva a atribuição com o ativo gerado
        Atribuicoes.clicarEPesquisarTomboCriado()
        Atribuicoes.marcarCheckBoxDaAtribuicao()
        Atribuicoes.clicarBtnGerarTermoAtribuicao()
        Atribuicoes.marcarRadioTermoResponsabilidade()
        Atribuicoes.clicarBtnGerarTermoSelecionadoTipo()
        Atribuicoes.validarConteudoDoPDFResponsabilidade()
    })

    it('Gerar Termo de Empréstimo em PDF com Sucesso', () => {
        Ativos.criarNovoAtivo()
        Atribuicoes.clicarAtribuicoes()
        Atribuicoes.clicarNovaAtribuicao()
        Atribuicoes.selecionarAreaAtribuicao()
        Atribuicoes.selecionarSubareaAtribuicao()
        Atribuicoes.selecionarSubareaSemColaborador()
        Atribuicoes.selecionarColaboradorAtribuicao()
        Atribuicoes.selecionarAtendidoPor()
        Atribuicoes.selecionarModalidadeHomeOfficeAtribuicao()
        Atribuicoes.selecionarSOAtribuicao()
        Atribuicoes.desmarcarCheckBoxUtilizaraPacoteOfficeAtribuicao()
        Atribuicoes.validarCampoDisabledPacoteOfficeAtribuicao()
        Atribuicoes.clicarAtribuirAtivoAtribuicao()
        Atribuicoes.selecionarTomboDoAtivoAtribuicao()
        Atribuicoes.selecionarDescricaoDoAtivoAtribuicao()
        Atribuicoes.selecionarStatusVinculadoDoAtivoAtribuicao()
        Atribuicoes.clicarSalvarAtribuicao()
        Atribuicoes.validarMensagemDeSucessoAtivoVinculado()//salva a atribuição com o ativo gerado
        Atribuicoes.clicarEPesquisarTomboCriado()
        Atribuicoes.marcarCheckBoxDaAtribuicao()
        Atribuicoes.clicarBtnGerarTermoAtribuicao()
        Atribuicoes.marcarRadioTermoEmprestimo()
        Atribuicoes.clicarBtnGerarTermoSelecionadoTipo('termo_emprestimo.pdf')
        Atribuicoes.validarConteudoDoPDFEmprestimo()
    })

    it('Tentativa de Gerar Termo sem Selecionar o Tipo de Documento', () => {   
        Ativos.criarNovoAtivo()
        Atribuicoes.clicarAtribuicoes()
        Atribuicoes.clicarNovaAtribuicao()
        Atribuicoes.selecionarAreaAtribuicao()
        Atribuicoes.selecionarSubareaAtribuicao()
        Atribuicoes.selecionarSubareaSemColaborador()
        Atribuicoes.selecionarColaboradorAtribuicao()
        Atribuicoes.selecionarAtendidoPor()
        Atribuicoes.selecionarModalidadeHomeOfficeAtribuicao()
        Atribuicoes.selecionarSOAtribuicao()
        Atribuicoes.desmarcarCheckBoxUtilizaraPacoteOfficeAtribuicao()
        Atribuicoes.validarCampoDisabledPacoteOfficeAtribuicao()
        Atribuicoes.clicarAtribuirAtivoAtribuicao()
        Atribuicoes.selecionarTomboDoAtivoAtribuicao()
        Atribuicoes.selecionarDescricaoDoAtivoAtribuicao()
        Atribuicoes.selecionarStatusVinculadoDoAtivoAtribuicao()
        Atribuicoes.clicarSalvarAtribuicao()
        Atribuicoes.validarMensagemDeSucessoAtivoVinculado()//salva a atribuição com o ativo gerado
        Atribuicoes.clicarEPesquisarTomboCriado()
        Atribuicoes.marcarCheckBoxDaAtribuicao()
        Atribuicoes.clicarBtnGerarTermoAtribuicao()
        Atribuicoes.validarMensagemAlert('Selecione um tipo de Termo e uma ou mais Atribuiçôes')
        Atribuicoes.clicarBtnGerarTermoSemDownloadDoArquivo()
    })

    it('Fechar Modal através do Ícone "X"', () => {    
        Atribuicoes.clicarAtribuicoes()
        Atribuicoes.marcarCheckBoxDaAtribuicao()
        Atribuicoes.clicarBtnGerarTermoAtribuicao()
        Atribuicoes.clicarBtnXFecharModalGerarTermo()
        Atribuicoes.validarModalFechou()
    })

    it('Tentativa de Acionar "Gerar Termos" sem Atribuição Selecionada', () => {
        Atribuicoes.clicarAtribuicoes()
        Atribuicoes.clicarBtnGerarTermoAtribuicao()
        Atribuicoes.clicarBtnGerarTermoSemDownloadDoArquivo()
        Atribuicoes.validarMensagemAlert('Selecione um tipo de Termo e uma ou mais Atribuiçôes')
        
    })
})