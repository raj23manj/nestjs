import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
        ){}

    async getTaskById(id: number): Promise<Task>{
        const found = await this.taskRepository.findOne(id);

        if(!found) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
       return await this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id: number): Promise<any> {
       // https://stackoverflow.com/questions/54499543/what-is-the-proper-pattern-for-bubbling-and-catching-exceptions-using-async-awai 
    //    let found = null;
    //    try {
    //      found = await this.getTaskById(id);
    //    } catch(e) {
    //        console.log("error");
    //        console.log(e.message);
    //        console.log("error");
    //     throw new NotFoundException(e.message);
    //    }
       
       const result = await this.taskRepository.delete(id);


       if(result.affected === 0) {
          throw new NotFoundException(`Task with id ${id} not found`);
       }
       return result;
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
       const task = await this.getTaskById(id)
       task.status = status;
       await task.save();
       return task;
    }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return await this.taskRepository.getTasks(filterDto);
    }

    /*********************** Old Code ************************/    
    
    // private tasks: Task[] = [];
    
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // createTask(createTaskDto: CreateTaskDto) {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuid.v4(),
    //         title: title,
    //         description: description,
    //         status: TaskStatus.OPEN
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id);

    //     if(!found) {
    //        throw new NotFoundException(`Task with id ${id} not found`);
    //     }
    //     return found;
    // }

    // deleteTask(id: string): void {
    //    const found = this.getTaskById(id)
    //    this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //    const task = this.getTaskById(id)
    //    task.status = status;
    //    return task;
    // }

    // // see the import
    // // getTasks(filterDto: import("./dto/get-tasks-filter.dto").GetTasksFilterDto): Task[] {
    // //     throw new Error("Method not implemented.");
    // // }

    // getTasks(filterDto: GetTasksFilterDto): Task[] {
    //    const { status, search } = filterDto;
    //    let tasks = this.getAllTasks();
    //     if(status) {
    //         tasks = this.tasks.filter(task => task.status === status);
    //     }

    //     if(search) {
    //         tasks = this.tasks.filter(task => 
    //               task.title.includes(search) ||
    //               task.description.includes(search)
    //             );
    //     }
        
    //    return tasks;
    // }
}
