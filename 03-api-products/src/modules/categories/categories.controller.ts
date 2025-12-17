import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dtos/create-category.dto.js';
import { UpdateCategoryDto } from './dtos/update-category.dto.js';
import { FindCategoryDto } from './dtos/find-category.dto.js';
import { Category } from './entities/category.entity.js';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova categoria' })
  @ApiResponse({
    status: 201,
    description: 'Categoria criada com sucesso',
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'Já existe uma categoria com este nome',
  })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar categorias com filtros e paginação' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias retornada com sucesso',
  })
  @ApiQuery({ name: 'search', required: false, description: 'Busca por nome' })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: 'Filtrar por status',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Itens por página',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'Campo de ordenação',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'Direção da ordenação',
  })
  findAll(@Query() query: FindCategoryDto) {
    return this.categoriesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar categoria por ID (inclui produtos)' })
  @ApiParam({ name: 'id', description: 'UUID da categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria encontrada',
    type: Category,
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma categoria' })
  @ApiParam({ name: 'id', description: 'UUID da categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso',
    type: Category,
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
  })
  @ApiResponse({
    status: 409,
    description: 'Já existe uma categoria com este nome',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir uma categoria' })
  @ApiParam({ name: 'id', description: 'UUID da categoria' })
  @ApiResponse({
    status: 204,
    description: 'Categoria excluída com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
  })
  @ApiResponse({
    status: 409,
    description: 'Não é possível excluir categoria com produtos vinculados',
  })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}


