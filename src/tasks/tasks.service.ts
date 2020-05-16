import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from "uuid";
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    
    private tasks: Task[] = [];
    
    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto) {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid.v4(),
            title: title,
            description: description,
            status: TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    deleteTask(id: string): void {
       this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
       const task = this.getTaskById(id)
       task.status = status;
       return task;
    }

    // see the import
    // getTasks(filterDto: import("./dto/get-tasks-filter.dto").GetTasksFilterDto): Task[] {
    //     throw new Error("Method not implemented.");
    // }

    getTasks(filterDto: GetTasksFilterDto): Task[] {
       const { status, search } = filterDto;
       let tasks = this.getAllTasks();
        if(status) {
            tasks = this.tasks.filter(task => task.status === status);
        }

        if(search) {
            tasks = this.tasks.filter(task => 
                  task.title.includes(search) ||
                  task.description.includes(search)
                );
        }
        
       return tasks;
    }
}
