import { Injectable } from "@nestjs/common";
import { ListDto } from "../Models/List/Dtos/ListDto";
import { ListDtoWithoutEmail } from "../Models/List/Dtos/ListDtoWithoutEmail";
import { Crud } from "../interfaces/crud.interface";
import { PrismaConfig } from "../database/prismaConfig";
import { HttpResponse, badRequest, created, serviceError, success } from "../types/http";
import { TaskService } from "./task.service";


@Injectable()
export class ListService implements Crud {
    constructor(
        private readonly prisma: PrismaConfig,
        private readonly taskService: TaskService
    ) { }

    async Create(data: ListDto): Promise<HttpResponse> {
        try {
            const newList = await this.prisma.lista.create({
                data: {
                    nomeLista: data.nomeLista,
                    dataEntrega: data.dataEntrega,
                    usuarioEmail: data.emailUsuario
                }
            });

            return created(newList);
        } catch (error) {
            return serviceError(error);
        }
    }

    async Read(nomeLista: string): Promise<HttpResponse> {
        try {
            const list = await this.prisma.lista.findUnique({
                where: { nomeLista }
            });

            if (list) {
                const listTasks = await this.taskService.Read(nomeLista);

                if (listTasks.statusCode == 200) {
                    const listWithTasks = {
                        "InfosLista": list,
                        "Tarefas": listTasks.body
                    }

                    return success(listWithTasks);
                }

                return success({
                    "InfosLista": list,
                    "Tarefas": []
                });
            }

            return badRequest("Lista não encontrada");
        } catch (error) {
            return serviceError(error);
        }
    }

    async Update(data: ListDtoWithoutEmail, nomeLista: string): Promise<HttpResponse> {
        try {
            await this.prisma.lista.updateMany({
                data,
                where: { nomeLista }
            });

            return success(data);
        } catch (error) {
            return serviceError(error);
        }
    }

    async Delete(nomeLista: string): Promise<HttpResponse> {
        try {
            const list = await this.Read(nomeLista);

            if (list.statusCode == 400) {
                return badRequest(list.body);
            }

            await this.taskService.DeleteTasks(nomeLista);

            await this.prisma.lista.delete({
                where: { nomeLista }
            });

            return success({});
        } catch (error) {
            serviceError(error);
        }
    }
}