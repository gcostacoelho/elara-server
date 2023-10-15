import { Task } from "../Tasks/Task";

export class List {

    private id: string;
    private nomeLista: string;
    private dataCriacao: Date;
    private concluido: Boolean;
    private dataEntrega: Date;
    private listaTarefa: Task[];
}