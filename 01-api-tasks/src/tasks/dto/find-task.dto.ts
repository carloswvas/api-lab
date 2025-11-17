import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindTaskDTO {
  @ApiPropertyOptional({
    description: 'Texto para buscar no título ou descrição da tarefa',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Campo para ordenação (valores permitidos)',
    enum: ['dueDate', 'created_at', 'updated_at', 'status'],
    example: 'dueDate',
  })
  @IsOptional()
  @IsString()
  @IsIn(['dueDate', 'created_at', 'updated_at', 'status'])
  orderBy?: string;

  @ApiPropertyOptional({
    description: 'Direção da ordenação',
    example: 'DESC',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  @ApiPropertyOptional({
    description: 'Data inicial de vencimento',
    example: '2025-01-01',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDateStart?: Date;

  @ApiPropertyOptional({
    description: 'Data final de vencimento',
    example: '2025-12-31',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDateEnd?: Date;

  @ApiPropertyOptional({
    description: 'Data inicial de criação',
    example: '2025-01-01',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdStart?: Date;

  @ApiPropertyOptional({
    description: 'Data final de criação',
    example: '2025-12-31',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdEnd?: Date;

  @ApiPropertyOptional({
    description: 'Status da tarefa',
    enum: TaskStatus,
    example: TaskStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus | keyof typeof TaskStatus;

  @ApiPropertyOptional({ description: 'Número da página', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Quantidade de itens por página',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
