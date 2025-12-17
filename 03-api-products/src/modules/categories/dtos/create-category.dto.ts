import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nome da categoria (único)',
    example: 'Eletrônicos',
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada da categoria',
    example: 'Dispositivos eletrônicos e gadgets',
  })
  @IsString({ message: 'A descrição deve ser uma string' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Define se a categoria está ativa',
    example: true,
    default: true,
  })
  @IsBoolean({ message: 'isActive deve ser um booleano' })
  @IsOptional()
  isActive?: boolean;
}


