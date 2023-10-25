import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { HistoricService } from '../services/historic.service';
import { HistoricDto } from 'src/Models/History/Dtos/HistoricDto';

@ApiTags('Historic')
@ApiBearerAuth()
@Controller('historic')
export class HistoricController {
    constructor(private readonly historicService: HistoricService) { }

    @Get(':email')
    async getHistoric(@Param('email') email: string, @Res() resp: Response) {
        const data = await this.historicService.readHistoric(email);

        return resp.status(data.statusCode).json(data.body);
    }

    @Delete(':email')
    async deleteHistoric(@Param('email') email: string, @Res() resp: Response) {
        const data = await this.historicService.deleteHistoric(email);

        return resp.status(data.statusCode).json(data.body);
    }

    @Post(':email')
    async postNewHistoric(@Param('email') email: string, @Body() body: HistoricDto, @Res() res: Response) {
        const data = await this.historicService.createHistoric(body, email);

        return res.status(data.statusCode).json(data.body);
    }
}
