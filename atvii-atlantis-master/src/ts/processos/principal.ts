import Processo from "../abstracoes/processo";
import MenuPrincipal from "../menus/menuPricipal";
import TipoCadastroCliente from "./tipoCadastroCliente";
import TipoListagemClientes from "./tipoListagemClientes";
import AtualizarClienteTitular from "./atualizarCliente";
import DeletarClienteTitular from "./deletarClienteTitular";
import Cliente from "../modelos/cliente"; // Importe a classe Cliente

export default class Principal extends Processo {
    private clienteTitular!: Cliente; // Adicione uma propriedade para o cliente titular

    constructor() {
        super();
        this.execucao = true;
        this.menu = new MenuPrincipal();
        
        // Crie um cliente titular, você pode definir valores reais aqui
        this.clienteTitular = new Cliente("Nome", "Nome Social", new Date());
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');

        switch (this.opcao) {
            case 1:
                this.processo = new TipoCadastroCliente(this.clienteTitular); // Passe o cliente titular
                this.processo.processar();
                break;
            case 2:
                this.processo = new AtualizarClienteTitular();
                this.processo.processar();
                break;
            case 3:
                this.processo = new TipoListagemClientes();
                this.processo.processar();
                break;
            case 4:
                this.processo = new DeletarClienteTitular();
                this.processo.processar();
                break;
            case 0:
                this.execucao = false;
                console.log('Até logo!');
                console.clear();
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}
