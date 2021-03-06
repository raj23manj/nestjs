import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
    // different way to import
    // transform(value: any, metadata: import("@nestjs/common").ArgumentMetadata) {
    //     throw new Error("Method not implemented.");
    // }


    readonly allowedStatues = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value);
        console.log(metadata)

        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`Not A Valid Status: ${value}`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        // retuns -1 if not found
        const idx = this.allowedStatues.indexOf(status);
        return idx !== -1
    }
}