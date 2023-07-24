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
        const secretWord: string = process.env.SECRET;

        if (req.headers.authorization) {
            const tokenSplited: string = req.headers.authorization.split(' ')[1];

            const error: any = jwt.verify(tokenSplited, secretWord, 
                (err: any) => {
                    if (err) return err;
                });

            return error ? unauthorized() : success({
                "validToken": true
            })
        }
        
        return unauthorized();
    }
}