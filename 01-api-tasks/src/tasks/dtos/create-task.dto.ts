import { Type } from "class-transformer"
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'id_progress',
    DONE = 'done',
    OVERDUE = 'overdue',
}


export class CreateTasksDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Organizar estudos',
        description: 'Título da tarefa',
    })
    readonly title: string

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'Montar cronograma para revisar TypeScript',
        description: 'Descrição da tarefa',
    })
    readonly description?: string

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    @ApiProperty({
        example: '2025-11-10',
        description: 'Data limite da Task (AAAA-MM-DD)',
        type: String,
    })
    readonly dueDate?: Date

    @IsEnum(TaskStatus)
    @IsOptional()
    @ApiProperty({
        example: TaskStatus.PENDING,
        enum: TaskStatus,
        required: false,
        description: 'Status atual da Task',
    })
    readonly status?: TaskStatus
}