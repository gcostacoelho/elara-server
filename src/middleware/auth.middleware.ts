import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) { }
    
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.headers.authorization) {
                const tokenSplit = req.headers.authorization.split(" ")[1];

                const valid = await this.jwtService.verifyAsync(tokenSplit);

                return valid ? next() : res.status(HttpStatus.UNAUTHORIZED).json('Unauthorized');
            }

            return res.status(HttpStatus.UNAUTHORIZED).json('Unauthorized');
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
        }

    }
}