import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FindPokemonDTO {
  @ApiPropertyOptional({
    description:
      'Texto para busca por nome ou ID. A busca é feita por regex no nome (case-insensitive) ou por correspondência exata do ID.',
    example: 'bulba',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filtra os Pokémons pela geração (ID numérico da geração).',
    example: 1,
  })
  @IsInt()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  generation?: number;

  @ApiPropertyOptional({
    description:
      'Filtra os Pokémons por tipo (ex.: fire, water, grass). A busca é case-insensitive.',
    example: 'fire',
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    description:
      'Campo utilizado para ordenação dos resultados. Valores permitidos: id, name, base_experience, createdAt.',
    enum: ['id', 'name', 'base_experience', 'createdAt'],
    default: 'id',
  })
  @ApiPropertyOptional({})
  @IsOptional()
  @IsIn(['id', 'name', 'base_experience', 'createdAt'])
  orderBy?: string = 'id';

  @ApiPropertyOptional({
    description:
      'Define a direção da ordenação. ASC para crescente, DESC para decrescente.',
    enum: ['ASC', 'DESC'],
    default: 'ASC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'ASC';

  @ApiPropertyOptional({
    description: 'Número da página (paginação). Deve ser um número inteiro >= 1.',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description:
      'Quantidade de itens por página (limite). Deve ser um número inteiro >= 10.',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(10)
  limit: number = 10;
}
