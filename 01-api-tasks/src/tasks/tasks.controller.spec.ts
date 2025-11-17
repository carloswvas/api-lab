import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { FindTaskDTO } from './dto/find-task.dto';
import { Tasks, TaskStatus } from './entities/task.entity';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasksService = {
    findAll: jest.fn().mockResolvedValue({
      tasks: [{ id: '1', title: 'Estudar NestJS' }],
      total: 1,
    }),
    findOne: jest.fn().mockResolvedValue({ id: '1', title: 'Estudar NestJS' }),
    create: jest.fn().mockResolvedValue({ id: '1', title: 'Nova Tarefa' }),
    update: jest.fn().mockResolvedValue({ id: '1', title: 'Atualizado' }),
    remove: jest.fn().mockResolvedValue({ id: '1', deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /tasks', () => {
    it('should return a list of tasks successfully', async () => {
      const query: FindTaskDTO = { page: 1, limit: 10 };

      const result = await controller.findAll(query);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual({
        tasks: [{ id: '1', title: 'Estudar NestJS' }],
        total: 1,
      });
    });

    it('should throw an error if service fails', async () => {
      const query: FindTaskDTO = { page: 1, limit: 10 };
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValueOnce(new Error('Database error'));

      await expect(controller.findAll(query)).rejects.toThrow('Database error');
    });
  });

  describe('POST /tasks', () => {
    const task = Object.assign(new Tasks(), {
      id: '1',
      title: 'Estudar NestJS',
      description: 'Aprender testes e validação com DTOs',
      dueDate: new Date('2025-11-10'),
      status: 'pending',
      created_at: new Date('2025-11-01T10:00:00.000Z'),
      updated_at: new Date('2025-11-05T15:00:00.000Z'),
    });

    it('should create a new task successfully', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(task);

      const result = await controller.create(task);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith(task);
      expect(result).toEqual(task);
    });

    it('should throw an error if service fails', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValueOnce(new Error('Database error'));
      await expect(controller.create(task)).rejects.toThrow('Database error');
    });

    it('should not create a task without required fields', async () => {
      const invalidDto = {
        description: 'Missing title field',
      };

      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new Error('Erro de validação.'));

      await expect(controller.create(invalidDto as any)).rejects.toThrow(
        'Erro de validação.',
      );
    });
  });

  describe('GET /tasks/:id', () => {
    it('should return a task when found', async () => {
      const task = Object.assign(new Tasks(), {
        id: '1',
        title: 'Estudar NestJS',
        description: 'Aprender testes e validação com DTOs',
        dueDate: new Date('2025-11-10'),
        status: 'pending',
        created_at: new Date('2025-11-01T10:00:00.000Z'),
        updated_at: new Date('2025-11-05T15:00:00.000Z'),
      });

      jest.spyOn(service, 'findOne').mockResolvedValue(task);

      const result = await controller.findOne('1');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(task);
    });
    it('should throw NotFoundException when task does not exist', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new Error('Task ID:999 not found'));

      await expect(controller.findOne('999')).rejects.toThrow(
        'Task ID:999 not found',
      );
    });
    it('should handle unexpected service errors gracefully', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new Error('Database connection failed'));

      await expect(controller.findOne('1')).rejects.toThrow(
        'Database connection failed',
      );
    });
  });

  describe('PUT /tasks/:id', () => {
    it('should update a task successfully', async () => {
      const id = '1';
      const task = Object.assign(new Tasks(), {
        id,
        title: 'Estudar NestJS',
        description: 'Aprender testes e validação com DTOs',
        dueDate: new Date('2025-11-10'),
        status: TaskStatus.IN_PROGRESS,
        created_at: new Date('2025-11-01T10:00:00.000Z'),
        updated_at: new Date('2025-11-05T15:00:00.000Z'),
      });

      jest.spyOn(service, 'update').mockResolvedValue(task);
      const result = await controller.update(id, task);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.update).toHaveBeenCalledWith(id, task);
      expect(result).toEqual(task);
    });
    it('should throw NotFoundException when task to update does not exist', async () => {
      const id = '999';
      const updateTaskDto = {
        title: 'Tarefa inexistente',
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new Error('Task ID:999 not found'));

      await expect(controller.update(id, updateTaskDto)).rejects.toThrow(
        'Task ID:999 not found',
      );
    });
    it('should handle unexpected errors gracefully', async () => {
      const id = '1';
      const updateTaskDto = {
        title: 'Falha inesperada',
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new Error('Database error'));

      await expect(controller.update(id, updateTaskDto)).rejects.toThrow(
        'Database error',
      );
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should remove an existing task and return undefined (204 equivalent)', async () => {
      const id = '1234-uuid';
      jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce(undefined as unknown as Tasks);

      const result = await controller.remove(id);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toBeUndefined();
    });
    it('should throw an error if the task does not exist', async () => {
      const id = 'not-found-id';
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new Error('Task not found'));

      await expect(controller.remove(id)).rejects.toThrow('Task not found');
    });
  });
});
