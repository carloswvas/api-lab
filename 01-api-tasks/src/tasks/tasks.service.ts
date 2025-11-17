import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from './entities/task.entity';
import { FindTaskDTO } from './dto/find-task.dto';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { UpdateTasksDTO } from './dto/update-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly taskRepository: Repository<Tasks>,
  ) {}

  async findAll(
    filters: FindTaskDTO,
  ): Promise<{ tasks: Tasks[]; total: number }> {
    const {
      search,
      orderBy = 'dueDate',
      order = 'DESC',
      dueDateStart,
      dueDateEnd,
      createdStart,
      createdEnd,
      status,
      page = 1,
      limit = 10,
    } = filters;

    const query = this.taskRepository.createQueryBuilder('task');

    const allowedOrderFields = [
      'dueDate',
      'created_at',
      'updated_at',
      'status',
      'task',
    ];
    const safeOrderBy = allowedOrderFields.includes(orderBy)
      ? orderBy
      : 'dueDate';

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    if (dueDateStart && dueDateEnd) {
      query.andWhere('task.dueDate BETWEEN :start AND :end', {
        start: dueDateStart,
        end: dueDateEnd,
      });
    } else if (dueDateStart) {
      query.andWhere('task.dueDate >= :start', {
        start: dueDateStart,
      });
    } else if (dueDateEnd) {
      query.andWhere('task.dueDate <= :end', {
        end: dueDateEnd,
      });
    }

    if (createdStart && createdEnd) {
      query.andWhere('task.created_at BETWEEN :cStart AND :cEnd', {
        cStart: createdStart,
        cEnd: createdEnd,
      });
    }

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    query.orderBy(`task.${safeOrderBy}`, order === 'ASC' ? 'ASC' : 'DESC');
    query.skip((page - 1) * limit).take(limit);

    const [tasks, total] = await query.getManyAndCount();
    return { tasks, total };
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task ID:${id} not found`);
    }

    return task;
  }

  async create(createTaskDTO: CreateTaskDTO): Promise<Tasks> {
    const task = this.taskRepository.create(createTaskDTO);
    return await this.taskRepository.save(task);
  }

  async update(id: string, updateTaskDTO: UpdateTasksDTO) {
    const task = await this.taskRepository.preload({
      ...updateTaskDTO,
      id,
    });

    if (!task) {
      throw new NotFoundException(`Task ID:${id} not found`);
    }

    return this.taskRepository.save(task);
  }

  async remove(id: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task ID:${id} not found!`);
    }

    return this.taskRepository.remove(task);
  }
}
