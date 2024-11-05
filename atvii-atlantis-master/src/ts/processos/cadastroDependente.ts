import Processo from "../abstracoes/processo";
import Entrada from "../io/entrada";
import Cliente from "../modelos/cliente";
import Armazem from "../dominio/armazem";

export default class CadastrarDependente extends Processo {
    protected titular!: Cliente;  // Use 'protected' se você precisar acessá-la na subclasse
    protected entrada = new Entrada();  // Use 'protected' se necessário

    constructor(titular: Cliente) {
        super();
        this.titular = titular;  // Atribui o titular passado como argumento
    }

    processar(): void {
        console.log("Cadastro de Dependente");

        // Recebendo dados do dependente
        let nome = this.entrada.receberTexto("Digite o nome do dependente:");
        let nomeSocial = this.entrada.receberTexto("Digite o nome social do dependente:");
        let dataNascimento = this.entrada.receberData("Digite a data de nascimento do dependente:");

        // Criando e adicionando o dependente
        let dependente = new Cliente(nome, nomeSocial, dataNascimento);
        dependente.setTitular(this.titular); // Define o titular do dependente
        this.titular.Dependentes.push(dependente); // Adiciona o dependente ao titular

        console.log("Dependente cadastrado com sucesso!");
    }
}
