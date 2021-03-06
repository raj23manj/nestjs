import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {   
    }

    @Get("/getAllTasks")
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
    // one way of using pipes, appleid to all attributes of CreateTaskDto
    @UsePipes(ValidationPipe)
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
    updateTaskStatus(
    @Param('id') id: string, 
    // Another way of using pipes give next to specific attribute in body
    // nest createa a new instance of TaskStatusValidationPipe behind the scenes
    @Body('status', TaskStatusValidationPipe) status: TaskStatus 
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTasks(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
       
    }
}
