import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description, status } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = status;
        await task.save();
        return task;
     }
}