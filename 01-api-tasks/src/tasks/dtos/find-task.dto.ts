import { Type } from "class-transformer";
import { IsDate, IsEnum, IsIn, IsInt, IsOptional, IsString, Min } from "class-validator"
import { TaskStatus } from "./create-task.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class FindTaskDTO {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Texto para buscar no título ou descrição da tarefa',
    })
    readonly search?: string

    @IsString()
    @IsOptional()
    @IsIn(['dueDate', 'createdAt', 'updatedAt', 'status'])
    @ApiPropertyOptional({
        description: 'Campo para ordenação (valores permitidos)',
        enum: ['dueDate', 'createdAt', 'updatedAt', 'status'],
        example: 'dueDate',
    })
    readonly orderBy?: string = 'createdAt';

    @IsString()
    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    @ApiPropertyOptional({
        description: 'Direção da ordenação',
        example: 'DESC',
        enum: ['ASC', 'DESC'],
    })
    readonly order?: 'ASC' | 'DESC' = 'DESC';


    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiPropertyOptional({
        description: 'Data inicial de vencimento',
        example: '2025-01-01',
    })
    readonly dueDateStart?: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiPropertyOptional({
        description: 'Data final de vencimento',
        example: '2025-12-31',
    })
    readonly dueDateEnd?: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiPropertyOptional({
        description: 'Data inicial de criação',
        example: '2025-01-01',
    })
    readonly createdStart?: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiPropertyOptional({
        description: 'Data final de criação',
        example: '2025-12-31',
    })
    readonly createdEnd?: Date

    @IsEnum(TaskStatus)
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Status da tarefa',
        enum: TaskStatus,
        example: TaskStatus.PENDING,
    })
    readonly status?: TaskStatus | keyof typeof TaskStatus;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    @ApiPropertyOptional({ description: 'Número da página', example: 1 })
    readonly page?: number = 1;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    @ApiPropertyOptional({
        description: 'Quantidade de itens por página',
        example: 10,
    })
    readonly limit?: number = 10;
}