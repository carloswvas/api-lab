import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../../tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;

  const mockTaskModelStatic = {
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn(),


    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    countDocuments: jest.fn(),
  };

  const mockTaskModelConstructor = jest.fn().mockImplementation((dto) => ({
    ...dto,
    save: jest.fn().mockResolvedValue({
      _id: '123',
      ...dto,
    }),
  }));


  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, {
        provide: getModelToken('Task'),
        useValue: Object.assign(mockTaskModelConstructor, mockTaskModelStatic),
      }],
    }).compile();

    service = module.get<TasksService>(TasksService);


  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task successfully', async () => {
      const dto = { title: 'Test', description: 'Desc' };

      const result = await service.create(dto);

      expect(result).toEqual({
        _id: '123',
        title: 'Test',
        description: 'Desc',
      });

      expect(mockTaskModelConstructor).toHaveBeenCalledWith(dto);
    })
  })

  describe('findAll', () => {
    it('should return paginated results', async () => {
      const query = { page: 1, limit: 10 };


      mockTaskModelStatic.exec.mockResolvedValueOnce([
        { _id: '1', title: 'Task 1' },
      ]);


      mockTaskModelStatic.countDocuments.mockResolvedValueOnce(1);


      const result = await service.findAll(query as any);


      expect(result).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        data: [{ _id: '1', title: 'Task 1' }],
      });
    });
  });

  describe('findOne', () => {
    it('should throw BadRequestException for invalid id', async () => {
      await expect(service.findOne('123')).rejects.toThrow(BadRequestException);
    });


    it('should throw NotFoundException if task not found', async () => {
      mockTaskModelStatic.findById.mockReturnValue({ exec: () => null });


      await expect(service.findOne('507f191e810c19729de860ea')).rejects.toThrow(NotFoundException);
    });


    it('should return a task successfully', async () => {
      mockTaskModelStatic.findById.mockReturnValue({ exec: () => ({ _id: '1', title: 'Test' }) });


      const result = await service.findOne('507f191e810c19729de860ea');


      expect(result).toEqual({ _id: '1', title: 'Test' });
    });
  });

  describe('update', () => {
    it('should update the task successfully', async () => {
      mockTaskModelStatic.findByIdAndUpdate.mockReturnValue(mockTaskModelStatic);
      mockTaskModelStatic.exec.mockResolvedValueOnce({ _id: '1', title: 'Updated' });


      const result = await service.update('507f191e810c19729de860ea', { title: 'Updated' } as any);


      expect(result).toEqual({ _id: '1', title: 'Updated' });
    });


    it('should throw NotFoundException if task not found', async () => {
      mockTaskModelStatic.findByIdAndUpdate.mockReturnValue(mockTaskModelStatic);
      mockTaskModelStatic.exec.mockResolvedValueOnce(null);


      await expect(
        service.update('507f191e810c19729de860ea', { title: 'X' } as any)
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove successfully', async () => {
      mockTaskModelStatic.findByIdAndDelete.mockReturnValue(mockTaskModelStatic);
      mockTaskModelStatic.exec.mockResolvedValueOnce({ _id: '1' });


      await expect(service.remove('507f191e810c19729de860ea')).resolves.not.toThrow();
    });


    it('should throw NotFoundException if task does not exist', async () => {
      mockTaskModelStatic.findByIdAndDelete.mockReturnValue(mockTaskModelStatic);
      mockTaskModelStatic.exec.mockResolvedValueOnce(null);


      await expect(service.remove('507f191e810c19729de860ea')).rejects.toThrow(NotFoundException);
    });
  });

});
