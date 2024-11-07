import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class ListarTitularDeDependente extends Processo {
    private nomeDependente: string; // Recebe o nome do dependente como argumento

    constructor(nomeDependente: string) {
        super();
        this.nomeDependente = nomeDependente;
    }

    processar(): void {
        console.log("Listagem de Titular por Dependente");

        // Obtém a lista de clientes da instância única de Armazem
        const clientes = Armazem.InstanciaUnica.Clientes;

        // Encontra o dependente e seu titular
        const dependente = clientes.find(cliente =>
            cliente.Dependentes.some(dep => dep.Nome === this.nomeDependente)
        );

        if (dependente) {
            const titular = dependente.Dependentes.find(dep => dep.Nome === this.nomeDependente)?.Titular;
            if (titular) {
                console.log(`Titular do dependente ${this.nomeDependente}: ${titular.Nome}`);
            } else {
                console.log("Dependente não encontrado ou não possui um titular associado.");
            }
        } else {
            console.log("Dependente não encontrado.");
        }
    }
}
