import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDtoPass } from '../Models/User/Dtos/UserDtoPass';
import { UserDtoWithoutPass } from '../Models/User/Dtos/UserDtoWithoutPass';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('add')
    async createNewUser(@Body() user: UserDtoPass, @Res() resp: Response) {
        const data = await this.userService.Create(user);

        return resp.status(data.statusCode).json(data.body);
    }

    @Get(':email')
    async getUser(@Param('email') email: string, @Res() resp: Response) {
        const data = await this.userService.Read(email);

        return resp.status(data.statusCode).json(data.body);
    }

    @Put(':email')
    async putUserData(@Param('email') email: string, @Body() user: UserDtoWithoutPass, @Res() resp: Response) {
        const data = await this.userService.Update(user, email);

        return resp.status(data.statusCode).json(data.body);
    }

    @Delete(':email')
    async deleteUser(@Param('email') email: string, @Res() resp: Response) {
        const data = await this.userService.Delete(email);

        return resp.status(data.statusCode).json(data.body);
    }
}
