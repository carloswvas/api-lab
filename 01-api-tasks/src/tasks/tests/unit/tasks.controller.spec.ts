import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../../tasks.controller';
import { TasksService } from '../../tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService
        }
      ]
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call TasksService.create and return value', async () => {
      const dto = { title: 'Task 1', description: 'desc' };
      const result = { id: '1', ...dto };

      mockTasksService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(mockTasksService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return list', async () => {
      const query = { page: 1, limit: 10 };
      const result = { data: [], total: 0, page: 1, limit: 10 };

      mockTasksService.findAll.mockResolvedValue(result);

      expect(await controller.findAll(query)).toEqual(result);
      expect(mockTasksService.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('findOne', () => {
    it('should return one task', async () => {
      const result = { id: '1', title: 'A' };
      mockTasksService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
      expect(mockTasksService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const dto = { title: 'updated' };
      const result = { id: '1', ...dto };

      mockTasksService.update.mockResolvedValue(result);

      expect(await controller.update('1', dto)).toEqual(result);
      expect(mockTasksService.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should delete a task', async () => {
      mockTasksService.remove.mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
      expect(mockTasksService.remove).toHaveBeenCalledWith('1');
    });
  });

});
