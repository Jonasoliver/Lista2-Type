import Processo from "../abstracoes/processo";
import Entrada from "../io/entrada";
import Cliente from "../modelos/cliente";

export default class ListarDependentes extends Processo {
    private titular!: Cliente; // Armazena o titular

    constructor(titular: Cliente) {
        super();
        this.titular = titular; // Recebe o titular no construtor
    }

    processar(): void {
        console.log(`Listagem de Dependentes para: ${this.titular.Nome}`);

        if (this.titular.Dependentes.length === 0) {
            console.log("Nenhum dependente cadastrado.");
            return;
        }

        console.log("Dependentes:");
        this.titular.Dependentes.forEach((dependente, index) => {
            console.log(`${index + 1}. ${dependente.Nome} - Nome Social: ${dependente.NomeSocial}`);
        });
    }
}
