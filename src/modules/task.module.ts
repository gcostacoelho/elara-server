import { Module } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { TaskController } from './../controllers/task.controller';
import { PrismaConfig } from '../database/prismaConfig';

@Module({
    controllers: [TaskController],
    providers: [TaskService, PrismaConfig],
    exports: [TaskService]
})
export class TaskModule { }
