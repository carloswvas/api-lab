import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { TaskStatus } from "../dtos/create-task.dto";

export type TaskDocument = HydratedDocument<Task>

@Schema({ timestamps: true })
export class Task {
    @Prop({ required: true })
    title: string

    @Prop()
    description: string

    @Prop({ type: Date })
    dueDate: Date

    @Prop({
        type: String,
        enum: TaskStatus,
        default: TaskStatus.PENDING,
        index: true
    })
    status: string
}

export const TaskSchema = SchemaFactory.createForClass(Task)