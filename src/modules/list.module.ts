import { Module, forwardRef } from "@nestjs/common";
import { ListController } from "../controllers/list.controller";
import { PrismaConfig } from "../database/prismaConfig";
import { ListService } from "../services/list.service";
import { TaskModule } from "./task.module";
import { TaskService } from "../services/task.service";

@Module({
    imports: [forwardRef(() => TaskModule)],
    controllers: [ListController],
    providers: [ListService, PrismaConfig, TaskService],
    exports: [ListService]
})

export class ListModule { }