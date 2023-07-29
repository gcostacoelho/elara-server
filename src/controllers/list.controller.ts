import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { ListDto } from "../Models/List/Dtos/ListDto";
import { ListDtoWithoutEmail } from "../Models/List/Dtos/ListDtoWithoutEmail";
import { ListService } from "../services/list.service";

@ApiTags('List')
@ApiBearerAuth()
@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) { }

    @Post('add')
    async createNewList(@Body() listInfos: ListDto, @Res() resp: Response) {
        const data = await this.listService.Create(listInfos);

        return resp.status(data.statusCode).json(data.body);
    }

    @Get(':nome')
    async getList(@Param('nome') nomeLista: string, @Res() resp: Response){
        const data = await this.listService.Read(nomeLista);

        return resp.status(data.statusCode).json(data.body);
    }

    @Put(':nome')
    async updateList(@Param("nome") nomeLista: string, @Body() listInfos: ListDtoWithoutEmail, @Res() resp: Response){
        const data = await this.listService.Update(listInfos, nomeLista);

        return resp.status(data.statusCode).json(data.body);
    }

    @Delete(':nome')
    async deleteList(@Param("nome") nomeLista: string, @Res() resp: Response){
        const data = await this.listService.Delete(nomeLista);

        return resp.status(data.statusCode).json(data.body);
    }
}