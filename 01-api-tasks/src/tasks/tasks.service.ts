import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindTaskDTO } from './dtos/find-task.dto';
import { CreateTasksDTO } from './dtos/create-task.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name)
        private readonly taskModel: Model<TaskDocument>
    ) { }

    async create(createTaskDTO: CreateTasksDTO): Promise<Task> {
        const createdTask = new this.taskModel(createTaskDTO)
        return await createdTask.save()
    }

    async findAll(queryDTO: FindTaskDTO) {
        const {
            search,
            status,
            orderBy,
            order,
            page = 1,
            limit = 10,
            dueDateStart,
            dueDateEnd,
        } = queryDTO

        const filters: any = {}

        if (status) {
            filters.status = status
        }

        if (search) {
            filters.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        if (dueDateStart || dueDateEnd) {
            filters.dueDate = {};
            if (dueDateStart) filters.dueDate.$gte = dueDateStart;
            if (dueDateEnd) filters.dueDate.$lte = dueDateEnd;
        }

        const query = this.taskModel.find(filters);

        if (orderBy) {
            const sortOrder = order === 'DESC' ? -1 : 1;
            query.sort({ [orderBy]: sortOrder });
        }

        const skip = (page - 1) * limit;
        query.skip(skip).limit(limit);

        const [data, total] = await Promise.all([
            query.exec(),
            this.taskModel.countDocuments(filters),
        ]);

        return { page, limit, total, data };

    }

    async findOne(id: string): Promise<Task> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException(`O ID '${id}' não é válido`)
        }

        const task = await this.taskModel.findById(id).exec()
        if (!task) {
            throw new NotFoundException(`Task with ID:${id} not found`)
        }

        return task;
    }

    async update(id: string, updateTaskDTO: UpdateTaskDTO): Promise<Task> {
        const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDTO, {
            new: true,
            runValidators: true
        }).exec()

        if (!updatedTask) {
            throw new NotFoundException(`Task with ID:${id} not found`)
        }

        return updatedTask;
    }

    async remove(id: string): Promise<void> {
        const removedTask = await this.taskModel.findByIdAndDelete(id).exec()
        if (!removedTask) {
            throw new NotFoundException(`Task with ID:${id} not found`)
        }
    }

    async count() {
        return this.taskModel.countDocuments().exec()
    }
}
