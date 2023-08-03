import { Injectable } from '@nestjs/common';
import { PrismaConfig } from '../database/prismaConfig';
import { HttpResponse, badRequest, created, serviceError, success } from '../types/http';
import { HistoricDto } from '../Models/History/Dtos/HistoricDto';

@Injectable()
export class HistoricService {
    constructor(private readonly prisma: PrismaConfig) { }

    async createHistoric(data: HistoricDto, userEmail: string): Promise<HttpResponse> {
        try {
            const newHistoric = await this.prisma.historico.create({
                data: {
                    pedido: data.pedido,
                    usuarioEmail: userEmail
                }
            });

            return created(newHistoric);
        } catch (error) {
            return serviceError(error)
        }
    }

    async readHistoric(userEmail: string): Promise<HttpResponse> {
        try {
            const historic = await this.prisma.historico.findMany({
                where: {
                    usuarioEmail: userEmail
                }
            });

            return historic ? success(historic) : badRequest("Histórico não encontrado");
        } catch (error) {
            return serviceError(error)
        }
    }

    async deleteHistoric(userEmail: string): Promise<HttpResponse> {
        try {
            const hasHistoric = await this.readHistoric(userEmail);

            if (hasHistoric.statusCode == 400) {
                return badRequest(hasHistoric.body);
            }

            await this.prisma.historico.deleteMany({
                where: {
                    usuarioEmail: userEmail
                }
            });

            return success({});
        } catch (error) {
            return serviceError(error);
        }
    }
}
