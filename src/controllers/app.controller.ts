import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('hello')
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
