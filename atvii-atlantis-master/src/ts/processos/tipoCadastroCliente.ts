import Processo from "../abstracoes/processo";
import MenuTipoCadastroCliente from "../menus/menuTipoCadastroCliente";
import CadastroClienteTitular from "./cadastroClienteTitular";
import CadastrarDependente from "./cadastroDependente";
import Cliente from "../modelos/cliente"; // Certifique-se de importar o Cliente

export default class TipoCadastroCliente extends Processo {
    private clienteTitular!: Cliente; // Adicione uma propriedade para o cliente titular

    constructor(clienteTitular: Cliente) { // Receba o cliente titular no construtor
        super();
        this.clienteTitular = clienteTitular; // Atribua o cliente
        this.menu = new MenuTipoCadastroCliente();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');
        
        switch (this.opcao) {
            case 1:
                this.processo = new CadastroClienteTitular();
                this.processo.processar();
                break;
            case 2:
                this.processo = new CadastrarDependente(); // Agora sem argumento

                this.processo.processar();
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}
