# 🧪 Suíte de Testes E2E - Inventário CTI (Cypress)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Este repositório contém a automação de testes End-to-End (E2E) para a aplicação **Inventário CTI**, desenvolvida utilizando **Cypress** com o padrão **Page Objects**, validações customizadas (como leitura de PDFs) e geração automática de relatórios de execução.

---
## 📌 Documentação e Planejamento

* 📋 **Plano de Testes:** [Acessar Plano de Testes](https://docs.google.com/document/d/1j4RpSsOaqEei9IytsmYTY54sBOtBXV8vF7guMs7u1Xg/edit?usp=sharing)
* 💡 **Melhorias e Inconsistências:** [Acessar Levantamento de Melhorias](https://app.notion.com/p/Levantamento-de-Inconsist-ncias-e-D-vidas-d109a7d6b1374e1b8719e8eb1ada7e15?source=copy_link)

---
## 📊 Relatório de Execução dos Testes

O relatório interativo HTML é gerado automaticamente após a execução da suíte e publicado via GitHub Pages:

* 📈 **[Clique aqui para visualizar o Relatório de Execução (HTML)](https://mateuscgomes1010.github.io/testCypress/cypress/reports/html/index.html)**

---

## 🛠️ Tecnologias e Ferramentas

* **[Cypress](https://www.cypress.io/)** (Framework de automação de testes E2E)
* **[JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)** (Linguagem base)
* **[Cypress Mochawesome Reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter)** (Geração de relatórios com screenshots/evidências)
* **[pdf-parse](https://www.npmjs.com/package/pdf-parse)** (Validação e extração de conteúdo em PDFs)

---

## 📂 Estrutura do Projeto

```text
TESTCYPRESS/
├── cypress/
│   ├── downloads/          # PDFs e arquivos baixados durante os testes
│   ├── e2e/                # Arquivos de cenários de testes (.cy.js)
│   ├── fixtures/           # Massas de dados e arquivos estáticos
│   ├── pages/              # Mapeamento de elementos e ações (Page Objects)
│   ├── reports/            # Relatório HTML gerado pós-execução
│   ├── screenshots/        # Prints automáticos de falhas de teste
│   └── support/            # Comandos customizados, tasks e suporte global
├── .gitignore              # Ignora evidências, relatórios e node_modules
├── cypress.config.js       # Configurações globais do Cypress e Plugins
└── package.json            # Dependências e scripts do Node
```
---

## 📋 Pré-requisitos

Antes de começar, garanta que você tem instalado na sua máquina:

* **[Node.js](https://nodejs.org/)** (Versão 18 ou superior)
* **[npm](https://www.npmjs.com/)** (Gerenciador de pacotes do Node)
* **[Git](https://git-scm.com/)**

---

## 🚀 Como Instalar e Rodar o Projeto

### 1. Clonar o repositório
`git clone <URL_DO_SEU_REPOSITORIO>`  
`cd TESTCYPRESS`  

### 2. Instalar as dependências
`npm install`  

---

## 🧪 Executando os Testes

### 🖥️ Modo Interativo (Abre a Interface do Cypress)
Para desenvolver ou depurar testes na interface gráfica:  
`npx cypress open`

### ⚡ Modo Headless (Em segundo plano no terminal)
Ideal para execuções rápidas e ambientes de CI/CD:  
`npx cypress run`

### 🎯 Executar apenas um arquivo de teste específico
`npx cypress run --spec "cypress/e2e/relatorioMovimentacaoDeAtivos.cy.js"`

---

## 📊 Relatório de Testes (Mochawesome)

Após cada execução em modo *headless* (`npx cypress run`), um relatório **HTML** completo contendo métricas, tempos e prints de eventuais erros é gerado automaticamente.

### Como visualizar o relatório:
1. Navegue até a pasta: `cypress/reports/html/`
2. Clique com o botão direito no arquivo **`index.html`**
3. Escolha **"Revelar no Explorador de Arquivos"** (ou *Reveal in File Explorer*)
4. Dê dois cliques para abrir no seu navegador de preferência.

---

## ⚙️ Funcionalidades Importantes Implementadas

* **Validação de PDFs:** Leitura direta de relatórios gerados via `cy.task('readPdf')`.
* **Download Transparente:** Captura de URLs e arquivos PDF via `cy.request()` sem depender da abertura de abas.
* **Isolamento de Tabelas:** Validações rigorosas de dados filtrados sem contaminação de registros de datas anteriores.

