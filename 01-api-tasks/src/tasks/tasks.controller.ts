import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTasksDTO } from './dtos/create-task.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';
import { FindTaskDTO } from './dtos/find-task.dto';
import { TasksService } from './tasks.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { }

    @Post()
    @ApiOperation({ summary: 'Criar uma Tarefa' })
    @ApiBody({
        description: 'Dados que podem ser atualizados na tarefa',
        type: CreateTasksDTO,
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
            title: 'Organizar estudos',
            description: 'Montar cronograma para revisar TypeScript',
            dueDate: '2025-11-10T00:00:00.000Z',
            status: 'pending',
            "_id": "6936077c983ef2876beec93e",
            created_at: '2025-11-10T14:07:18.000Z',
            updated_at: '2025-11-10T14:07:18.000Z',
            "__v": 0
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
    create(@Body() createTaskDTO: CreateTasksDTO) {
        return this.taskService.create(createTaskDTO)
    }

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
    findAll(@Query() queryDTO: FindTaskDTO) {
        return this.taskService.findAll(queryDTO)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar uma tarefa pelo ID' })
    @ApiParam({
        name: 'id',
        description: '_id da task a ser buscada',
        example: '6936077c983ef2876beec93e',
    })
    @ApiResponse({
        status: 200,
        description: 'Tarefa encontrada com sucesso',
        example: {
            "_id": "693603f591376ae379814904",
            "title": "task 01",
            "description": "Terminar o curso da UDEMY",
            "dueDate": "2025-11-05T00:00:00.000Z",
            "status": "done",
            "createdAt": "2025-12-07T22:47:17.314Z",
            "updatedAt": "2025-12-07T22:57:59.363Z",
            "__v": 0
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Tarefa não encontrada',
        schema: {
            example: {
                message: 'Task ID:693603f591376ae379814904 not found',
                error: 'Not Found',
                statusCode: 404,
            },
        },
    })
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(id)
    }


    @ApiOperation({ summary: 'Atualizar uma tarefa existente' })
    @ApiParam({
        name: '_id',
        description: 'ID da task a ser buscada',
        example: '6936077c983ef2876beec93e',
    })
    @ApiBody({ type: UpdateTaskDTO })
    @ApiResponse({
        status: 200,
        description: 'Tarefa atualizada com sucesso',
        example: {
            title: 'Organizar estudos',
            description: 'Montar cronograma para revisar TypeScript',
            status: 'done',
            "_id": '6936077c983ef2876beec93e',
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
                message: 'Task ID:6936077c983ef2876beec93e not found',
                error: 'Not Found',
                statusCode: 404,
            },
        },
    })
    @Put(':id')
    update(@Param('id') id: string, @Body() updateTaskDTO: UpdateTaskDTO) {
        return this.taskService.update(id, updateTaskDTO)
    }

    @ApiOperation({ summary: 'Deletar uma Tarefa' })
    @ApiParam({
        name: '_id',
        description: 'UUID da task a ser buscada',
        example: '6936077c983ef2876beec93e',
    })
    @ApiResponse({ status: 204, description: 'Task deleted successfully' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.taskService.remove(id)
    }
}
