import { Response } from "express";
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SearchService } from '../services/search.service';
import { SearchWeatherDto } from '../Models/Search/Dtos/SearchWeatherDto';

@ApiTags('Search')
@Controller('search')
@ApiBearerAuth()
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Get(':request')
    async SearchInWeb(@Param('request') req: string, @Res() resp: Response) {
        const data = await this.searchService.searchWeb(req);

        return resp.status(data.statusCode).json(data.body);
    }

    @Get('video/:request')
    async SearchVideo(@Param('request') req: string, @Res() resp: Response){
        const data = await this.searchService.searchVideo(req);

        return resp.status(data.statusCode).json(data.body);
    }

    @Post('weather')
    async SearchWeather(@Body() req: SearchWeatherDto, @Res() resp: Response){
        const data = await this.searchService.searchWeather(req);

        return resp.status(data.statusCode).json(data.body);
    }

}
