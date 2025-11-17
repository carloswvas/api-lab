import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDTO {
  @ApiProperty({
    example: 'Organizar estudos',
    description: 'Título da tarefa',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: 'Montar cronograma para revisar TypeScript',
    description: 'Descrição da tarefa',
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    example: '2025-11-10',
    description: 'Data limite da Task (AAAA-MM-DD)',
    type: String,
  })
  @Type(() => Date)
  @IsDate()
  readonly dueDate: Date;

  @ApiProperty({
    example: TaskStatus.PENDING,
    enum: TaskStatus,
    required: false,
    description: 'Status atual da Task',
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  readonly status?: TaskStatus;
}
