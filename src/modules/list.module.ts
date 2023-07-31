import { Module } from "@nestjs/common";
import { ListController } from "../controllers/list.controller";
import { PrismaConfig } from "../database/prismaConfig";
import { ListService } from "../services/list.service";
import { TaskModule } from "./task.module";
import { TaskService } from "../services/task.service";

@Module({
    imports: [TaskModule],
    controllers: [ListController],
    providers: [ListService, PrismaConfig, TaskService],
})

export class ListModule { }