import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { Request } from "express";
import { HttpResponse, badRequest, success, unauthorized } from 'src/types/http';

@Injectable()
export class AuthService {

    async getTokenBearer(): Promise<HttpResponse> {
        try {
            const token = await jwt.sign({ expiresIn: "300" }, process.env.SECRET);

            return success({ "token": token });
        } catch (error) {
            return badRequest("Erro ao obter token de acesso");
        }


    }

    async validateToken(req: Request) {
        const token: string = req.headers.authorization;
        
        jwt.verify(token, process.env.SECRET, (err: any, decode: any) => {
            if (err) {
                console.log('Error', err);
                
                return unauthorized();
            }

            return success({
                "auth": true,
                "description": "Bearer token invalid"
            });
        })

        return unauthorized();
    }
}