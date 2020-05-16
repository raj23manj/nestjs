import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {   
    }

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    // @Post()
    // createTask(@Body() body) {
    //     console.log('body', body);
    //     return this.tasksService.createTask(body.title, body.description);
    // }

    // @Post()
    // createTask(@Body('title') title: string, @Body('description') description: string) {
    //     //console.log('body', body);
    //     return this.tasksService.createTask(title, description);
    // }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        console.log('body', createTaskDto);
        return this.tasksService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        console.log('parama', id);
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
