import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from "express";

import { SearchService } from '../services/search.service';
import { SearchDto } from '../Models/Search/Dtos/SearcDto';


@ApiTags('Search')
@Controller('search')
@ApiBearerAuth()
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Post()
    async SearchInWeb(@Body() body: SearchDto, @Res() resp: Response) {
        const data = await this.searchService.searchWeb(body);

        return resp.status(data.statusCode).json(data.body);
    }

    @Post('video')
    async SearchVideo(@Body() body: SearchDto, @Res() resp: Response){
        const data = await this.searchService.searchVideo(body);

        return resp.status(data.statusCode).json(data.body);
    }

}
