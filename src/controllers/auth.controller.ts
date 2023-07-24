import {
    Body,
    Controller,
    Get,
    Header,
    HttpStatus,
    Post,
    Req,
    Res
} from '@nestjs/common';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from "express";
import { AuthService } from '../services/auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'sucesso',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: "Erro de validação dos dados pedidos"
    })

    async getTokenBearer(@Res() resp: Response) {
        const data = await this.authService.getTokenBearer();

        return resp.status(data.statusCode).json(data.body);
    }
    
    @ApiHeader({
        name: 'authorization',
        description: 'Insert your token here',
        required: true
    })
    /*
    Endpoint only works in postman, don't ask me why
    */
    @Get('validation')
    async validateToken(@Req() req: Request, @Res() resp: Response) {        
        const data = await this.authService.validateToken(req);

        return resp.status(data.statusCode).json(data.body);
    }
}