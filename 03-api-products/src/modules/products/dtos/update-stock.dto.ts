import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateStockDto {
  @ApiProperty({
    description:
      'Quantidade a adicionar (positivo) ou remover (negativo) do estoque',
    example: 10,
  })
  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  quantity: number;
}


