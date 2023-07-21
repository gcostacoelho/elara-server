import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

}
