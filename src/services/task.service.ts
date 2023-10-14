import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaConfig } from '../database/prismaConfig';
import { Crud } from '../interfaces/crud.interface';
import { HttpResponse, badRequest, created, serviceError, success } from '../types/http';
import { TaskDto } from '../Models/Tasks/Dtos/TaskDto';
import { TaskDtoWithDelivery } from '../Models/Tasks/Dtos/TaskDtoWithDelivery';
import { ListService } from './list.service';

@Injectable()
export class TaskService implements Crud {
    constructor(
        private readonly prisma: PrismaConfig,
        @Inject(forwardRef(() => ListService))
        private readonly listService: ListService
    ) { }

    async Create(data: TaskDto): Promise<HttpResponse> {
        try {
            const list = await this.listService.Read(data.nomeLista);

            if (list.statusCode != 200) {
                return badRequest("Lista não existe");
            }

            const existentTask = await this.ReadUniqueTask(data.nomeTarefa);

            if (existentTask.statusCode === 200){
                return badRequest("Tarefa já existe, defina outro nome para ela");
            }

            const newTask = await this.prisma.tarefa.create({
                data: {
                    nomeTarefa: data.nomeTarefa.toLowerCase(),
                    dataEntrega: data.dataEntrega,
                    nomeLista_tarefa: data.nomeLista
                }
            });

            return created(newTask);
        } catch (error) {
            return serviceError(error);
        }
    }

    async ReadUniqueTask(nomeTarefa: string): Promise<HttpResponse> {
        try {
            const task = await this.prisma.tarefa.findUnique({
                where: {
                    nomeTarefa: nomeTarefa.toLowerCase()
                }
            });

            return task ? success(task) : badRequest("Tarefa não encontrada");
        } catch (error) {
            return serviceError(error);
        }
    }

    async Read(nomeLista: string): Promise<HttpResponse> {
        try {
            const task = await this.prisma.tarefa.findMany({
                where: {
                    nomeLista_tarefa: nomeLista.toLowerCase()
                }
            });

            return task ? success(task) : badRequest("Tarefa não encontrada");
        } catch (error) {
            return serviceError(error);
        }
    }

    async Update(data: TaskDtoWithDelivery, nomeTarefa: string): Promise<HttpResponse> {
        try {
            const task = await this.Read(nomeTarefa);

            if (task.statusCode == 400) {
                return badRequest(task.body);
            }

            await this.prisma.tarefa.update({
                where: { nomeTarefa },
                data: {
                    nomeTarefa: data.nomeTarefa.toLowerCase(),
                    dataEntrega: data.dataEntrega,
                    concluida: data.concluida
                }
            });

            return success(data);
        } catch (error) {
            return serviceError(error);
        }
    }

    async Delete(nomeTarefa: string): Promise<HttpResponse> {
        try {
            const task = await this.Read(nomeTarefa);

            if (task.statusCode == 400) {
                return badRequest(task.body);
            }

            await this.prisma.tarefa.delete({
                where: { 
                    nomeTarefa: nomeTarefa.toLowerCase()
                }
            });

            return success({});
        } catch (error) {
            return serviceError(error)
        }
    }

    async DeleteAllTasks(nomeLista: string): Promise<HttpResponse> {
        try {
            await this.prisma.tarefa.deleteMany({
                where: {
                    nomeLista_tarefa: nomeLista.toLowerCase()
                }
            });

            return success({});
        } catch (error) {
            serviceError(error);
        }
    }
}
