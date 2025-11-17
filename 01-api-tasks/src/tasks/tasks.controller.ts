import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { FindTaskDTO } from './dto/find-task.dto';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { UpdateTasksDTO } from './dto/update-tasks.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas com filtros e paginação' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas encontrada com sucesso.',
    schema: {
      example: {
        total: 25,
        tasks: [
          {
            id: '8374755d-38fb-476d-b0e1-bca09ca810cc',
            title: 'Organizar estudos',
            description: 'Montar cronograma para revisar TypeScript',
            status: 'pending',
            dueDate: '2025-11-17T00:00:00.000Z',
            created_at: '2025-11-11T19:40:00.000Z',
            updated_at: '2025-11-11T19:40:00.000Z',
          },
        ],
      },
    },
  })
  async findAll(@Query() query: FindTaskDTO) {
    return this.taskService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma tarefa pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID da task a ser buscada',
    example: 'f96af84c-303f-4935-975f-dc7c2ab5faeb',
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa encontrada com sucesso',
    example: {
      id: '8374755d-38fb-476d-b0e1-bca09ca810cc',
      title: 'Organizar estudos',
      description: 'Montar cronograma para revisar TypeScript',
      dueDate: '2025-11-10T00:00:00.000Z',
      status: 'done',
      created_at: '2025-11-10T12:51:23.000Z',
      updated_at: '2025-11-10T13:26:10.000Z',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    schema: {
      example: {
        message: 'Task ID:f96af84c-303f-4935-975f-dc7c2ab5faeb not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  async findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma Tarefa' })
  @ApiBody({
    description: 'Dados que podem ser atualizados na tarefa',
    type: UpdateTasksDTO,
    examples: {
      exemplo1: {
        summary: 'Atualização de status e descrição',
        value: {
          title: 'Organizar estudos',
          description: 'Montar cronograma para revisar TypeScript',
          dueDate: '2025-11-10',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Task Criada com sucesso',
    example: {
      id: '8374755d-38fb-476d-b0e1-bca09ca810cc',
      title: 'Organizar estudos',
      description: 'Montar cronograma para revisar TypeScript',
      dueDate: '2025-11-10T00:00:00.000Z',
      status: 'pending',
      created_at: '2025-11-10T14:07:18.000Z',
      updated_at: '2025-11-10T14:07:18.000Z',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação.',
    schema: {
      example: {
        message: ['title should not be empty', 'title must be a string'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  async create(@Body() createCourseDTO: CreateTaskDTO) {
    return this.taskService.create(createCourseDTO);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma tarefa existente' })
  @ApiParam({
    name: 'id',
    description: 'UUID da task a ser buscada',
    example: '8374755d-38fb-476d-b0e1-bca09ca810cc',
  })
  @ApiBody({ type: CreateTaskDTO })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso',
    example: {
      id: '8374755d-38fb-476d-b0e1-bca09ca810cc',
      title: 'Organizar estudos',
      description: 'Montar cronograma para revisar TypeScript',
      status: 'done',
      dueDate: '2025-11-10T00:00:00.000Z',
      created_at: '2025-11-10T14:07:18.000Z',
      updated_at: '2025-11-10T14:07:18.000Z',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    schema: {
      example: {
        message: 'Task ID:f96af84c-303f-4935-975f-dc7c2ab5faeb not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  async update(@Param('id') id: string, @Body() updateTaskDTO: UpdateTasksDTO) {
    return this.taskService.update(id, updateTaskDTO);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma Tarefa' })
  @ApiParam({
    name: 'id',
    description: 'UUID da task a ser buscada',
    example: 'f96af84c-303f-4935-975f-dc7c2ab5faeb',
  })
  @ApiResponse({ status: 204, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
