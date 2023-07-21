import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response, Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDtoPass } from 'src/Models/User/Dtos/UserDtoPass';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('add')
    async createNewUser(@Body() user: UserDtoPass, @Res() resp: Response) {
        const data = await this.userService.Create(user);

        return resp.status(data.statusCode).json(data.body);
    }
}
