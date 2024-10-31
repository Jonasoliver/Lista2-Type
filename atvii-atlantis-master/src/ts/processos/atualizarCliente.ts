import Processo from "../abstracoes/processo";
import Entrada from "../io/entrada";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import AtualizarMenu from "../menus/atualizarMenu";

export default class AtualizarClienteTitular extends Processo {
    protected cliente!: Cliente; // Aqui deve ser um Cliente
    protected entrada = new Entrada();
    protected menu = new AtualizarMenu();

    constructor() {
        super();
        this.execucao = true;
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica;
        let clientes = armazem.Clientes;

        // Buscar cliente para atualizar
        console.log("Atualização de Cliente Titular");
        let nomeCliente = this.entrada.receberTexto("Digite o nome do cliente a ser atualizado:");

        // Utilize find para obter o cliente
        const clienteEncontrado = clientes.find(cliente => cliente.Nome === nomeCliente);

        if (!clienteEncontrado) {
            console.log("Cliente não encontrado.");
            this.execucao = false;
            return;
        }

        // Atribui clienteEncontrado a this.cliente
        this.cliente = clienteEncontrado;

        // Mostrar menu de atualização
        while (this.execucao) {
            this.menu.mostrar();
            let opcao = this.entrada.receberNumero("Qual informação deseja atualizar?");
            switch (opcao) {
                case 1:
                    let novoNome = this.entrada.receberTexto("Digite o novo nome:");
                    this.cliente.Nome = novoNome;
                    break;
                case 2:
                    let novoNomeSocial = this.entrada.receberTexto("Digite o novo nome social:");
                    this.cliente.NomeSocial = novoNomeSocial;
                    break;
                case 3:
                    let novaDataNascimento = this.entrada.receberData("Digite a nova data de nascimento:");
                    this.cliente.DataNascimento = novaDataNascimento;
                    break;
                case 0:
                    this.execucao = false;
                    break;
                default:
                    console.log("Opção inválida.");
            }
        }
    }
}
