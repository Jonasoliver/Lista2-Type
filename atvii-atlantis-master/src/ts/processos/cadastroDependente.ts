import Processo from "../abstracoes/processo";
import Entrada from "../io/entrada";
import Cliente from "../modelos/cliente";
import Armazem from "../dominio/armazem";

export default class CadastrarDependente extends Processo {
    protected entrada = new Entrada();

    constructor() {
        super();
    }

    processar(): void {
        console.log("Cadastro de Dependente");

        // Solicita o nome do titular
        const nomeTitular = this.entrada.receberTexto("Digite o nome do titular para associar o dependente:");

        // Busca o titular pelo nome no armazém de clientes
        const titular = Armazem.InstanciaUnica.Clientes.find(
            (cliente: Cliente) => cliente.Nome === nomeTitular
        );

        if (!titular) {
            console.log("Titular não encontrado.");
            return;
        }

        // Recebendo dados do dependente
        const nome = this.entrada.receberTexto("Digite o nome do dependente:");
        const nomeSocial = this.entrada.receberTexto("Digite o nome social do dependente:");
        const dataNascimento = this.entrada.receberData("Digite a data de nascimento do dependente:");

        // Criando e associando o dependente ao titular encontrado
        const dependente = new Cliente(nome, nomeSocial, dataNascimento);
        dependente.setTitular(titular); // Define o titular do dependente
        titular.Dependentes.push(dependente); // Adiciona o dependente ao titular

        console.log("Dependente cadastrado com sucesso!");
    }
}
