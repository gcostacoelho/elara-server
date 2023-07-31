import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response, response } from 'express';
import { TaskService } from '../services/task.service';
import { TaskDto } from '../Models/Tasks/Dtos/TaskDto';
import { TaskDtoWithDelivery } from '../Models/Tasks/Dtos/TaskDtoWithDelivery';

@ApiTags('Task')
@ApiBearerAuth()
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post('add')
    async createNewTask(@Body() taskData: TaskDto, @Res() resp: Response){
        const data = await this.taskService.Create(taskData);

        return resp.status(data.statusCode).json(data.body);
    }

    @Get(':nomeLista')
    async getTaskInfos(@Param('nomeLista') listName: string, @Res() resp: Response){
        const data = await this.taskService.Read(listName);

        return resp.status(data.statusCode).json(data.body);
    }

    @Put(':nomeTarefa')
    async updateTaskInfo(@Body() taskInfos: TaskDtoWithDelivery, @Param('nomeTarefa') taskName: string, @Res() resp: Response){
        const data = await this.taskService.Update(taskInfos, taskName);

        return resp.status(data.statusCode).json(data.body);
    }

    @Delete(':nomeTarefa')
    async deleteTask(@Param('nomeTarefa') taskName: string, @Res() resp: Response){
        const data = await this.taskService.Delete(taskName);

        return resp.status(data.statusCode).json(data.body);
    }

    @Delete(':nomeLista')
    async deleteAllTasks(@Param('nomeLista') listName: string, @Res() resp: Response){
        const data = await this.taskService.DeleteTasks(listName);

        return resp.status(data.statusCode).json(data.body);
    }
}
