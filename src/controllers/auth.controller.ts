import {
    Body,
    Controller,
    Get,
    Header,
    HttpStatus,
    Param,
    Post,
    Req,
    Res
} from '@nestjs/common';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from "express";
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
    
    /*
    Endpoint only works in postman, don't ask me why
    */
    @Get('validation/:token')
    async validateToken(@Param('token') auth: string, @Res() resp: Response) {        
        const data = await this.authService.validateToken(auth);

        return resp.status(data.statusCode).json(data.body);
    }
}