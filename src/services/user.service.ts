import { Injectable } from '@nestjs/common';
import { UserDtoPass } from 'src/Models/User/Dtos/UserDtoPass';
import { UserDtoWithoutPass } from 'src/Models/User/Dtos/UserDtoWithoutPass';
import { User } from 'src/Models/User/User';
import { PrismaConfig } from 'src/database/prismaConfig';
import { Crud } from 'src/interfaces/crud.interface';
import { HttpResponse, badRequest, created, serviceError, success } from 'src/types/http';

@Injectable()
export class UserService implements Crud {
    constructor(private readonly prisma: PrismaConfig) { }

    async Create(data: UserDtoPass): Promise<HttpResponse> {
        try {
            const user = new User(data.nome, data.email, data.dataNascimento, data.senha);

            data.senha = await user.encriptyPassword();

            const newUser = await this.prisma.usuario.create({
                data,
            });

            return created(newUser);
        } catch (error) {
            return serviceError(error);
        }
    }

    async Read(email: string): Promise<HttpResponse> {
        try {
            const user = await this.prisma.usuario.findUnique({
                where: { email }
            });

            const userWithoutPass = {
                "id": user.id,
                "nome": user.nome,
                "email": user.email
            }

            return user ? success(userWithoutPass) : badRequest("Usuário não encontrado");
        } catch (error) {
            return serviceError(error);
        }

    }

    async Update(data: UserDtoWithoutPass, email: string): Promise<HttpResponse> {
        try {
            await this.prisma.usuario.update({
                where: { email },
                data,
            });

            return success(data);
        } catch (error) {
            return serviceError(error);
        }
    }

    async Delete(email: string): Promise<HttpResponse> {
        try {
            const user = await this.Read(email);

            if (user.statusCode == 400) {
                return badRequest('Usuário não encontrado');
            }

            await this.prisma.usuario.delete({
                where: { email }
            });

            return success('');
        } catch (error) {
            return serviceError(error);
        }
    }

    async UserWithPass(email: string): Promise<HttpResponse> {
        try {
            const user = await this.prisma.usuario.findUnique({
                where: { email }
            });

            return user ? success(user) : badRequest("Usuário não encontrado");
        } catch (error) {
            return serviceError(error);
        }
    }
}