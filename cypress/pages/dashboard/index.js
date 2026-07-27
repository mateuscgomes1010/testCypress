import BasePage from '../base'

const ELEMENTOS = {
  menuAtivos: ':nth-child(6) > .nav-link',
}


class Dashboard extends BasePage {

    clicarAtribuicoes(){
        this.clicar(ELEMENTOS.menuAtribuicoes)
    }
}




export default new Dashboard(); 