import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDTO } from './create-tasks.dto';

export class UpdateTasksDTO extends PartialType(CreateTaskDTO) {}
