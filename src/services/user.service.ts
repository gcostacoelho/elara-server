import { Injectable } from '@nestjs/common';
import { error } from 'console';
import { UserDtoPass } from 'src/Models/User/Dtos/UserDtoPass';
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
    
            return created(data);
        } catch (error) {
            return serviceError(error);
        }
    }

    Read(id: string = ""): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }

    Update(data: Object, id: string): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }

    Delete(id: string): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }
}