import { Injectable } from '@nestjs/common';
import { PrismaConfig } from '../database/prismaConfig';
import { Crud } from '../interfaces/crud.interface';
import { HttpResponse, badRequest, created, serviceError, success } from '../types/http';
import { TaskDto } from '../Models/Tasks/Dtos/TaskDto';
import { TaskDtoWithDelivery } from '../Models/Tasks/Dtos/TaskDtoWithDelivery';

@Injectable()
export class TaskService implements Crud {
    constructor(private readonly prisma: PrismaConfig) { }

    async Create(data: TaskDto): Promise<HttpResponse> {
        try {
            const newTask = await this.prisma.tarefa.create({
                data: {
                    nomeTarefa: data.nomeTarefa,
                    dataEntrega: data.dataEntrega,
                    nomeLista_tarefa: data.nomeLista
                }
            });

            return created(newTask);
        } catch (error) {
            return serviceError(error);
        }
    }

    async Read(nomeLista: string): Promise<HttpResponse> {
        try {
            const task = await this.prisma.tarefa.findMany({
                where: {
                    nomeLista_tarefa: nomeLista
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
                    nomeTarefa: data.nomeTarefa,
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
                where: { nomeTarefa }
            });

            return success({});

        } catch (error) {
            return serviceError(error)
        }
    }

    async DeleteTasks(nomeLista: string): Promise<HttpResponse> {
        try {
            await this.prisma.tarefa.deleteMany({
                where: {
                    nomeLista_tarefa: nomeLista
                }
            });

            return success({});
        } catch (error) {
            serviceError(error);
        }
    }
}
