import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity.js';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty({
    description: 'ID único da categoria (UUID)',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Eletrônicos',
  })
  @Column({ length: 100, unique: true })
  name: string;

  @ApiProperty({
    description: 'Descrição detalhada da categoria',
    example: 'Dispositivos eletrônicos e gadgets',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    description: 'Indica se a categoria está ativa',
    example: true,
    default: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2025-12-17T10:00:00.000Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2025-12-17T10:00:00.000Z',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

