import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const secretWord: any = process.env.SECRET;

        if (req.headers.authorization) {
            const tokenSplited: string = req.headers.authorization.split(' ')[1];

            const error: any = jwt.verify(tokenSplited, secretWord, 
                (err: any) => {
                    if (err) return err;
                });

            return error ? res.status(HttpStatus.UNAUTHORIZED).json('Unauthorized') : next()
        }
        
        return res.status(HttpStatus.UNAUTHORIZED).json('Unauthorized');
    }
}