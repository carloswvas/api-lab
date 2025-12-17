import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsUUID,
  IsUrl,
  MaxLength,
  MinLength,
  Min,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nome do produto',
    example: 'iPhone 15 Pro',
    minLength: 2,
    maxLength: 200,
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
  @MaxLength(200, { message: 'O nome deve ter no máximo 200 caracteres' })
  name: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada do produto',
    example: 'Smartphone Apple com chip A17 Pro, 256GB, Titânio Natural',
  })
  @IsString({ message: 'A descrição deve ser uma string' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Preço do produto em BRL (não pode ser negativo)',
    example: 9999.99,
    minimum: 0,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O preço deve ser um número com no máximo 2 casas decimais' },
  )
  @Min(0, { message: 'O preço não pode ser negativo' })
  price: number;

  @ApiPropertyOptional({
    description: 'Quantidade em estoque',
    example: 50,
    minimum: 0,
    default: 0,
  })
  @IsInt({ message: 'O estoque deve ser um número inteiro' })
  @Min(0, { message: 'O estoque não pode ser negativo' })
  @IsOptional()
  stock?: number = 0;

  @ApiPropertyOptional({
    description: 'URL da imagem do produto',
    example: 'https://example.com/iphone15.jpg',
  })
  @IsUrl({}, { message: 'A URL da imagem deve ser válida' })
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'SKU (Stock Keeping Unit) único do produto',
    example: 'IPHONE-15-PRO-256',
    maxLength: 50,
  })
  @IsString({ message: 'O SKU deve ser uma string' })
  @MaxLength(50, { message: 'O SKU deve ter no máximo 50 caracteres' })
  @IsOptional()
  sku?: string;

  @ApiPropertyOptional({
    description: 'Define se o produto está ativo',
    example: true,
    default: true,
  })
  @IsBoolean({ message: 'isActive deve ser um booleano' })
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: 'ID da categoria do produto (UUID)',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID('4', { message: 'O categoryId deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O categoryId é obrigatório' })
  categoryId: string;
}

