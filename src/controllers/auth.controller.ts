import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Res
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { AuthService } from '../services/auth.service';
import { UserDtoLogin } from 'src/Models/User/Dtos/UserDtoLogin';

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

    async getTokenBearer(@Body() userInfo: UserDtoLogin, @Res() resp: Response) {
        const data = await this.authService.getTokenBearer(userInfo);

        return resp.status(data.statusCode).json(data.body);
    }
    
    @Get('validation/:token')
    async validateToken(@Param('token') auth: string, @Res() resp: Response) {        
        const data = await this.authService.validateToken(auth);

        return resp.status(data.statusCode).json(data.body);
    }
}