import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  IsNumber,
  IsUUID,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FindProductDto {
  @ApiPropertyOptional({
    description: 'Busca por nome ou descrição (parcial, case-insensitive)',
    example: 'iPhone',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por ID da categoria',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID('4')
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por status ativo/inativo',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Preço mínimo',
    example: 100,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  priceMin?: number;

  @ApiPropertyOptional({
    description: 'Preço máximo',
    example: 10000,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  priceMax?: number;

  @ApiPropertyOptional({
    description: 'Filtrar apenas produtos em estoque (stock > 0)',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  inStock?: boolean;

  @ApiPropertyOptional({
    description: 'Número da página',
    example: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Quantidade de itens por página',
    example: 10,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Campo para ordenação',
    example: 'price',
    enum: ['name', 'price', 'stock', 'createdAt', 'updatedAt'],
  })
  @IsString()
  @IsOptional()
  orderBy?: string = 'name';

  @ApiPropertyOptional({
    description: 'Direção da ordenação',
    example: 'ASC',
    enum: ['ASC', 'DESC'],
  })
  @IsString()
  @IsOptional()
  order?: 'ASC' | 'DESC' = 'ASC';
}

