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
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';
import { FindProductDto } from './dtos/find-product.dto.js';
import { UpdateStockDto } from './dtos/update-stock.dto.js';
import { Product } from './entities/product.entity.js';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos (ex: preço negativo)',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
  })
  @ApiResponse({
    status: 409,
    description: 'SKU já existe',
  })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar produtos com filtros e paginação' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Busca por nome ou descrição',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'Filtrar por categoria',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: 'Filtrar por status',
  })
  @ApiQuery({
    name: 'priceMin',
    required: false,
    description: 'Preço mínimo',
  })
  @ApiQuery({
    name: 'priceMax',
    required: false,
    description: 'Preço máximo',
  })
  @ApiQuery({
    name: 'inStock',
    required: false,
    description: 'Apenas produtos em estoque',
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
  findAll(@Query() query: FindProductDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID (inclui categoria)' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({
    status: 200,
    description: 'Produto encontrado',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um produto' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos (ex: preço negativo)',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto ou categoria não encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'SKU já existe',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch(':id/stock')
  @ApiOperation({ summary: 'Atualizar estoque do produto' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({
    status: 200,
    description: 'Estoque atualizado com sucesso',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Estoque insuficiente para a operação',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado',
  })
  updateStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStockDto: UpdateStockDto,
  ): Promise<Product> {
    return this.productsService.updateStock(id, updateStockDto.quantity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir um produto' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({
    status: 204,
    description: 'Produto excluído com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado',
  })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}

