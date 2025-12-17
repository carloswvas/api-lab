import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Category } from './entities/category.entity.js';
import { CreateCategoryDto } from './dtos/create-category.dto.js';
import { UpdateCategoryDto } from './dtos/update-category.dto.js';
import { FindCategoryDto } from './dtos/find-category.dto.js';
import { PaginatedCategoriesResponse } from './interfaces/category-response.interface.js';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new ConflictException(
        `Já existe uma categoria com o nome "${createCategoryDto.name}"`,
      );
    }

    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll(query: FindCategoryDto): Promise<PaginatedCategoriesResponse> {
    const {
      search,
      isActive,
      page = 1,
      limit = 10,
      orderBy = 'name',
      order = 'ASC',
    } = query;

    const where: any = {};

    if (search) {
      where.name = ILike(`%${search}%`);
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    const [data, total] = await this.categoryRepository.findAndCount({
      where,
      order: { [orderBy]: order },
      skip: (page - 1) * limit,
      take: limit,
    });

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

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException(`Categoria com ID "${id}" não encontrada`);
    }

    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: updateCategoryDto.name },
      });

      if (existingCategory) {
        throw new ConflictException(
          `Já existe uma categoria com o nome "${updateCategoryDto.name}"`,
        );
      }
    }

    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);

    if (category.products && category.products.length > 0) {
      throw new ConflictException(
        `Não é possível excluir a categoria "${category.name}" pois ela possui ${category.products.length} produto(s) vinculado(s)`,
      );
    }

    await this.categoryRepository.remove(category);
  }

  async count(): Promise<number> {
    return this.categoryRepository.count();
  }
}


