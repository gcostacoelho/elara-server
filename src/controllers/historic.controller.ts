import { Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { HistoricService } from '../services/historic.service';

@ApiTags('Historic')
@ApiBearerAuth()
@Controller('historic')
export class HistoricController {
    constructor(private readonly historicService: HistoricService) { }

    @Get(':email')
    async getHistoric(@Param('email') email: string, @Res() resp: Response){
        const data = await this.historicService.readHistoric(email);

        return resp.status(data.statusCode).json(data.body);
    }

    @Delete(':email')
    async deleteHistoric(@Param('email') email: string, @Res() resp: Response){
        const data = await this.historicService.deleteHistoric(email);

        return resp.status(data.statusCode).json(data.body);
    }
}
