import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { Tasks, TaskStatus } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';

describe('TasksService', () => {
  let service: TasksService;
  let repo: Repository<Tasks>;

  const mockQueryBuilder: any = {
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest
      .fn()
      .mockResolvedValue([[{ id: '1', title: 'Estudar NestJS' }], 1]),
  };

  const mockRepository = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Tasks),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repo = module.get<Repository<Tasks>>(getRepositoryToken(Tasks));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const result = await service.findAll({});
      expect(result.tasks).toHaveLength(1);
      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
      expect(result.total).toBe(1);
    });

    it('should apply search filter correctly', async () => {
      const findAllSpy = jest.spyOn(mockQueryBuilder, 'andWhere');

      await service.findAll({ search: 'NestJS' });

      expect(findAllSpy).toHaveBeenCalledWith(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: '%NestJS%' },
      );
    });

    it('should apply date range filters correctly', async () => {
      const findAllSpy = jest.spyOn(mockQueryBuilder, 'andWhere');

      await service.findAll({
        dueDateStart: new Date('2025-01-01'),
        dueDateEnd: new Date('2025-12-31'),
      });

      expect(findAllSpy).toHaveBeenCalledWith(
        'task.dueDate BETWEEN :start AND :end',
        { start: new Date('2025-01-01'), end: new Date('2025-12-31') },
      );
    });

    it('should apply status filter', async () => {
      const findAllSpy = jest.spyOn(mockQueryBuilder, 'andWhere');

      await service.findAll({ status: 'DONE' });

      expect(findAllSpy).toHaveBeenCalledWith('task.status = :status', {
        status: 'DONE',
      });
    });

    it('should apply pagination correctly', async () => {
      const skipSpy = jest.spyOn(mockQueryBuilder, 'skip');
      const takeSpy = jest.spyOn(mockQueryBuilder, 'take');

      await service.findAll({ page: 2, limit: 5 });

      expect(skipSpy).toHaveBeenCalledWith(5); // (2 - 1) * 5
      expect(takeSpy).toHaveBeenCalledWith(5);
    });
  });

  describe('findOne', () => {
    it('should return a task when found', async () => {
      const mockTask = Object.assign(new Tasks(), {
        id: '1',
        title: 'Estudar NestJS',
        description: 'Aprender testes',
        dueDate: new Date(),
        status: TaskStatus.DONE,
        created_at: new Date(),
        updated_at: new Date(),
      });

      jest.spyOn(repo, 'findOne').mockResolvedValue(mockTask);

      const result = await service.findOne('1');
      expect(result).toEqual(mockTask);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
    it('should throw NotFoundException when task does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
      await expect(service.findOne('999')).rejects.toThrow(
        'Task ID:999 not found',
      );
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: '999' },
      });
    });
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const createTaskDto = {
        title: 'Estudar TDD',
        description: 'Aprender testes unitários no NestJS',
        dueDate: new Date('2025-12-31'),
        status: TaskStatus.PENDING,
      };

      const saveTask = {
        id: '1',
        ...createTaskDto,
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockRepository.create = jest.fn().mockReturnValue(createTaskDto);
      mockRepository.save = jest.fn().mockResolvedValue(saveTask);

      const result = await service.create(createTaskDto);
      expect(mockRepository.create).toHaveBeenCalledWith(createTaskDto);
      expect(mockRepository.save).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual(saveTask);
    });

    it('should not create a task without a required fiel', async () => {
      const createTaskDTO = {
        description: 'Learn TDD with NestJS',
        dueDate: new Date('2025-12-31'),
        status: TaskStatus.PENDING,
      };

      const errors = await validate(createTaskDTO);

      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('update', () => {
    it('should update a task successfully', async () => {
      const id = '1';
      const updateTaskDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        status: TaskStatus.IN_PROGRESS,
      };

      const existingTask = {
        id,
        title: 'Old Title',
        description: 'Old Description',
        status: TaskStatus.PENDING,
      };

      const updatedTask = { ...existingTask, ...updateTaskDto };

      jest.spyOn(repo, 'preload').mockResolvedValue(updatedTask as Tasks);
      jest.spyOn(repo, 'save').mockResolvedValue(updatedTask as Tasks);

      const result = await service.update(id, updateTaskDto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.preload).toHaveBeenCalledWith({ id, ...updateTaskDto });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.save).toHaveBeenCalledWith(updatedTask);
      expect(result).toEqual(updatedTask);
    });

    it('should update only the provided fields (partial update)', async () => {
      const id = '1';
      const existingTask = {
        id,
        title: 'Learn NestJS',
        description: 'Study modules and providers',
        status: TaskStatus.PENDING,
        dueDate: new Date('2025-12-31'),
        created_at: new Date(),
        updated_at: new Date(),
      };

      const updateTaskDto = {
        status: TaskStatus.DONE,
      };

      const updatedTask = {
        ...existingTask,
        ...updateTaskDto,
      };

      jest.spyOn(repo, 'preload').mockResolvedValue(updatedTask as Tasks);
      jest.spyOn(repo, 'save').mockResolvedValue(updatedTask as Tasks);

      const result = await service.update(id, updateTaskDto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.preload).toHaveBeenCalledWith({ id, ...updateTaskDto });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.save).toHaveBeenCalledWith(updatedTask);
      expect(result.status).toBe(TaskStatus.DONE);
      expect(result.title).toBe('Learn NestJS');
    });

    it('should throw NotFoundException if task does not exist', async () => {
      const id = '999';
      const updateTaskDto = {
        title: 'New Title',
        description: 'New Description',
        status: TaskStatus.DONE,
      };

      jest.spyOn(repo, 'preload').mockResolvedValue(undefined);

      await expect(service.update(id, updateTaskDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.update(id, updateTaskDto)).rejects.toThrow(
        `Task ID:${id} not found`,
      );
    });
  });

  describe('remove', () => {
    const id = '1';
    const task = {
      id,
      title: 'Test Task',
      description: 'Test Description',
    } as Tasks;

    it('should delete a task successfully', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(task);
      jest.spyOn(repo, 'remove').mockResolvedValue(task);

      const result = await service.remove(id);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id } });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.remove).toHaveBeenCalledWith(task);
      expect(result).toEqual(task);
    });

    it('should throw NotFoundException when task does not exist', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);

      await expect(service.remove('999')).rejects.toThrow(NotFoundException);
      await expect(service.remove('999')).rejects.toThrow(
        'Task ID:999 not found!',
      );

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '999' } });
    });

    it('should throw an error if remove fails unexpectedly', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(task);
      jest
        .spyOn(repo, 'remove')
        .mockRejectedValue(new Error('Database failure'));

      await expect(service.remove(id)).rejects.toThrow('Database failure');

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id } });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repo.remove).toHaveBeenCalledWith(task);
    });
  });
});
