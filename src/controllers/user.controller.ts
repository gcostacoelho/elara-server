import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response, Request, response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDtoPass } from 'src/Models/User/Dtos/UserDtoPass';
import { UserDtoWithoutPass } from 'src/Models/User/Dtos/UserDtoWithoutPass';

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
    async getUser(@Param('email') email: string, @Res() resp: Response){
        const data = await this.userService.Read(email);

        return resp.status(data.statusCode).json(data.body);
    }

    @Put(':id')
    async putUserData(@Param('id') id: string, @Body() user: UserDtoWithoutPass, @Res() resp: Response){
        const data = await this.userService.Update(user, id);

        return resp.status(data.statusCode).json(data.body);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string, @Res() resp: Response){
        const data = await this.userService.Delete(id);

        return resp.status(data.statusCode).json(data.body);
    }
}
