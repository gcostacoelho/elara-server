import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { TaskController } from './../controllers/task.controller';
import { PrismaConfig } from '../database/prismaConfig';
import { ListService } from 'src/services/list.service';
import { ListModule } from './list.module';

@Module({
    imports: [ListModule],
    controllers: [TaskController],
    providers: [TaskService, PrismaConfig, ListService],
    exports: [TaskService]
})
export class TaskModule { }
