import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Req,
    Res
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
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

    getTokenBearer(@Res() resp: Response) { }

    @ApiHeader({
        name: 'Auth',
        description: 'Insert your token here',
        required: true
    })
    @Get('validation')
    validateToken(@Req() req: Request, @Res() resp: Response) { }
}