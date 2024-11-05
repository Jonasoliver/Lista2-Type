import Processo from "../abstracoes/processo";
import MenuTipoListagemClientes from "../menus/menuTipoListagemClientes";
import ListarDependentes from "./listagemDependentes";
import ListagemTitulares from "./listagemTitulares";
import Cliente from "../modelos/cliente";
import Armazem from "../dominio/armazem";

export default class TipoListagemClientes extends Processo {
    private clienteTitular!: Cliente;

    constructor() {
        super();
        this.menu = new MenuTipoListagemClientes();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?');

        switch (this.opcao) {
            case 1:
                this.processo = new ListagemTitulares();
                this.processo.processar();
                break;
            case 2:
                // Obtém a lista de clientes da instância única de Armazem
                const titulares = Armazem.InstanciaUnica.Clientes; // Corrigido para usar InstanciaUnica
                const nomeTitular = this.entrada.receberTexto("Digite o nome do titular:");

                // Busca o cliente titular pelo nome
                this.clienteTitular = titulares.find((cliente: Cliente) => cliente.Nome === nomeTitular)!;

                if (this.clienteTitular) {
                    this.processo = new ListarDependentes(this.clienteTitular);
                    this.processo.processar();
                } else {
                    console.log("Titular não encontrado.");
                }
                break;
            default:
                console.log("Opção não entendida... :(");
        }
    }
}
