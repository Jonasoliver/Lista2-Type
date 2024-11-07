import Processo from "../abstracoes/processo";
import MenuTipoListagemClientes from "../menus/menuTipoListagemClientes";
import ListarDependentes from "./listagemDependentes";
import ListagemTitulares from "./listagemTitulares";
import ListarTitularDeDependente from "./listagemTitulardeDependente"; // Importando a nova classe
import Cliente from "../modelos/cliente";
import Armazem from "../dominio/armazem";

export default class TipoListagemClientes extends Processo {
    private clienteTitular!: Cliente;
    private nomeDependente: string; // Adicionando a propriedade 'nomeDependente'

    constructor() {
        super();
        this.menu = new MenuTipoListagemClientes();
        this.nomeDependente = ""; // Inicializando a propriedade
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
                const titulares = Armazem.InstanciaUnica.Clientes;
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
            case 3:
                // Solicita o nome do dependente
                this.nomeDependente = this.entrada.receberTexto("Digite o nome do dependente:");

                // Inicia o processo de listagem de titular para o dependente informado
                this.processo = new ListarTitularDeDependente(this.nomeDependente);
                this.processo.processar();
                break;
            default:
                console.log("Opção não entendida... :(");
        }
    }
}
