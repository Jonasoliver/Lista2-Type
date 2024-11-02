import Processo from "../abstracoes/processo";
import Entrada from "../io/entrada";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import DeletarMenu from "../menus/deletarMenu";

export default class DeletarClienteTitular extends Processo {
    protected entrada = new Entrada();
    protected menu = new DeletarMenu();

    constructor() {
        super();
        this.execucao = true;
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica;
        let clientes = armazem.Clientes;

        // Buscar cliente para deletar
        console.log("Exclusão de Cliente Titular");
        let nomeCliente = this.entrada.receberTexto("Digite o nome do cliente a ser excluído:");
        let cliente = clientes.find(cliente => cliente.Nome === nomeCliente);

        if (!cliente) {
            console.log("Cliente não encontrado.");
            this.execucao = false;
            return;
        }

        // Confirmar exclusão
        while (this.execucao) {
            this.menu.mostrar();
            let opcao = this.entrada.receberNumero("Escolha uma opção:");
            switch (opcao) {
                case 1:
                    // Remover cliente diretamente da lista de clientes
                    const indiceCliente = clientes.indexOf(cliente);
                    if (indiceCliente !== -1) {
                        clientes.splice(indiceCliente, 1);
                        console.log("Cliente excluído com sucesso.");
                    }
                    this.execucao = false;
                    break;
                case 0:
                    console.log("Operação cancelada.");
                    this.execucao = false;
                    break;
                default:
                    console.log("Opção inválida.");
            }
        }
    }
}
