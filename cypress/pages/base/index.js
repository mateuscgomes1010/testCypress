

export default class BasePage {
  visitar(url) {
    cy.visit(url)
  }

  preencher(seletor, texto, opcoes = {}) {
    cy.get(seletor,opcoes).should('be.visible').clear().type(texto)
  }

  clicar(seletor, opcoes = {}) {
    cy.get(seletor).should('be.visible').click(opcoes)
  }

  // Marcar/Desmarcar Checkbox ou Radio
  marcar(seletor) {
    cy.get(seletor).check().should('be.checked')
  }

  selecionarValorVazioDaSelecao(seletor) {
    cy.get(seletor).select('')
  }

  desmarcar(seletor) {
    cy.get(seletor).uncheck().should('not.be.checked')
  }

  validarDadosDaMovimentacaoDeAtivos(seletor, textoEsperado) {
    cy.get(seletor).should('contain.text', textoEsperado)
  }
  
  obterDataFormatada(dataDesejada) {
  // Se você passou uma string no formato "DD/MM/AAAA", converte para "YYYY-MM-DD"
    if (typeof dataDesejada === 'string' && dataDesejada.includes('/')) {
      const [dia, mes, ano] = dataDesejada.split('/')
      return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`
    }

    // Se já passou em "YYYY-MM-DD", retorna ela mesma
    if (dataDesejada) {
      return dataDesejada
    }

    // Se NÃO passou nada, pega a data ATUAL (hoje)
    const hoje = new Date()
    const ano = hoje.getFullYear()
    const mes = String(hoje.getMonth() + 1).padStart(2, '0')
    const dia = String(hoje.getDate()).padStart(2, '0')

    return `${ano}-${mes}-${dia}`
  }

  // Na basePage.js
clicarDestravandoAriaHidden(seletor) {
    cy.get(seletor)
      .invoke('removeAttr', 'aria-hidden') // 1. Remove a trava de acessibilidade que o navegador bloqueia
      .focus()                            // 2. Garante o foco
      .click({ force: true })             // 3. Executa o clique
    }

  // Seleção em dropdown <select> nativo por valor ou texto
  selecionarOpcao(seletor, valorOuTexto) {
    cy.get(seletor).select(valorOuTexto)
  }

  // Validação de mensagens nativas HTML5 (require do navegador)
  validarMensagemObrigatoriaNativa(seletor, mensagemEsperada = 'Selecione um item da lista.') {
    cy.get(seletor).then(($el) => {
      expect($el[0].validationMessage).to.equal(mensagemEsperada)
    })
  }

  // Validação de atributos de um elemento
  validarAtributo(seletor, atributo, valorEsperado) {
    cy.get(seletor).should('have.attr', atributo, valorEsperado)
  }

  validarTextoVisivel(seletor, textoEsperado) {
    cy.contains(seletor, textoEsperado).should('be.visible')
  }
  validarOpcaoSelecionada(seletor, valorEsperado) {
    cy.get(seletor)
    .find('option:selected')
    .should('have.text', valorEsperado)
  }
  validarRadioSelecionado(seletor) {
    cy.get(seletor)
      .should('be.checked')
      
  }
}