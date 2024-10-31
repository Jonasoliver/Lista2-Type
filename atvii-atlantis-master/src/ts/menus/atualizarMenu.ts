import Menu from "../interfaces/menu";

export default class AtualizarMenu implements Menu {
    mostrar(): void {
        console.log("Selecione a informação a ser atualizada:");
        console.log("1 - Nome");
        console.log("2 - Nome Social");
        console.log("3 - Data de Nascimento");
        console.log("0 - Sair");
    }
}
