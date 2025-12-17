import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';
import { FindProductDto } from './dtos/find-product.dto.js';
import { PaginatedProductsResponse } from './interfaces/product-response.interface.js';
import { CategoriesService } from '../categories/categories.service.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Validação de preço não negativo (redundante com DTO, mas garante segurança)
    if (createProductDto.price < 0) {
      throw new BadRequestException('O preço não pode ser negativo');
    }

    // Verificar se a categoria existe
    await this.categoriesService.findOne(createProductDto.categoryId);

    // Verificar SKU único se fornecido
    if (createProductDto.sku) {
      const existingProduct = await this.productRepository.findOne({
        where: { sku: createProductDto.sku },
      });

      if (existingProduct) {
        throw new ConflictException(
          `Já existe um produto com o SKU "${createProductDto.sku}"`,
        );
      }
    }

    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(query: FindProductDto): Promise<PaginatedProductsResponse> {
    const {
      search,
      categoryId,
      isActive,
      priceMin,
      priceMax,
      inStock,
      page = 1,
      limit = 10,
      orderBy = 'name',
      order = 'ASC',
    } = query;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    // Filtro de busca por nome ou descrição
    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Filtro por categoria
    if (categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    // Filtro por status
    if (isActive !== undefined) {
      queryBuilder.andWhere('product.isActive = :isActive', { isActive });
    }

    // Filtro por faixa de preço
    if (priceMin !== undefined && priceMax !== undefined) {
      queryBuilder.andWhere('product.price BETWEEN :priceMin AND :priceMax', {
        priceMin,
        priceMax,
      });
    } else if (priceMin !== undefined) {
      queryBuilder.andWhere('product.price >= :priceMin', { priceMin });
    } else if (priceMax !== undefined) {
      queryBuilder.andWhere('product.price <= :priceMax', { priceMax });
    }

    // Filtro por estoque
    if (inStock === true) {
      queryBuilder.andWhere('product.stock > 0');
    } else if (inStock === false) {
      queryBuilder.andWhere('product.stock = 0');
    }

    // Ordenação
    const validOrderFields = [
      'name',
      'price',
      'stock',
      'createdAt',
      'updatedAt',
    ];
    const orderField = validOrderFields.includes(orderBy) ? orderBy : 'name';
    queryBuilder.orderBy(`product.${orderField}`, order);

    // Paginação
    queryBuilder.skip((page - 1) * limit).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    // Validação de preço não negativo
    if (updateProductDto.price !== undefined && updateProductDto.price < 0) {
      throw new BadRequestException('O preço não pode ser negativo');
    }

    // Verificar se a nova categoria existe
    if (
      updateProductDto.categoryId &&
      updateProductDto.categoryId !== product.categoryId
    ) {
      await this.categoriesService.findOne(updateProductDto.categoryId);
    }

    // Verificar SKU único se alterado
    if (updateProductDto.sku && updateProductDto.sku !== product.sku) {
      const existingProduct = await this.productRepository.findOne({
        where: { sku: updateProductDto.sku },
      });

      if (existingProduct) {
        throw new ConflictException(
          `Já existe um produto com o SKU "${updateProductDto.sku}"`,
        );
      }
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async count(): Promise<number> {
    return this.productRepository.count();
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findOne(id);

    const newStock = product.stock + quantity;
    if (newStock < 0) {
      throw new BadRequestException(
        `Estoque insuficiente. Estoque atual: ${product.stock}`,
      );
    }

    product.stock = newStock;
    return this.productRepository.save(product);
  }
}

