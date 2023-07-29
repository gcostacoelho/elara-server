import { Module } from "@nestjs/common";
import { ListController } from "../controllers/list.controller";
import { PrismaConfig } from "../database/prismaConfig";
import { ListService } from "../services/list.service";

@Module({
    controllers: [ListController],
    providers: [ListService, PrismaConfig],
})

export class ListModule { }