import { Module } from "@nestjs/common";
import { ListController } from "src/controllers/list.controller";
import { PrismaConfig } from "src/database/prismaConfig";
import { ListService } from "src/services/list.service";

@Module({
    controllers: [ListController],
    providers: [ListService, PrismaConfig],
})

export class ListModule { }