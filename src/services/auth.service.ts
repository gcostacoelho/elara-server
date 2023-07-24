import { Inject, Injectable } from '@nestjs/common';
import { Request } from "express";
import { HttpResponse, badRequest, serviceError, success, unauthorized } from 'src/types/http';
import { UserService } from './user.service';
import { User } from 'src/Models/User/User';
import { UserDtoLogin } from 'src/Models/User/Dtos/UserDtoLogin';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    async getTokenBearer(data: UserDtoLogin): Promise<HttpResponse> {
        try {
            const userData = await this.userService.UserWithPass(data.email);

            const infos = userData.body;
            const user = new User(infos.nome, infos.email, infos.dataNascimento, data.senha);

            const hashEqualPass = await user.compareHashWithPass(infos.senha);

            if (hashEqualPass) {
                const payload = {
                    sub: infos.id,
                    email: infos.email
                }

                return success({
                    "access_token": await this.jwtService.signAsync(payload)
                })
            }

            return badRequest('Senha incorreta');

        } catch (error) {
            return serviceError("Erro ao obter token de acesso");
        }
    }

    async validateToken(auth: string): Promise<HttpResponse> {
        try {
            const validToken = await this.jwtService.verifyAsync(auth);
            const valid = {
                "valid": true,
                "access_token": auth
            }

            if (validToken) {
                return success(valid);
            }

        } catch (error) {
            return success({
                "valid": "Token inválido",
                error
            });
        }
    }
}