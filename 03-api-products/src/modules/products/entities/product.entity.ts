import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity.js';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({
    description: 'ID único do produto (UUID)',
    example: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nome do produto',
    example: 'iPhone 15 Pro',
  })
  @Column({ length: 200 })
  name: string;

  @ApiProperty({
    description: 'Descrição detalhada do produto',
    example: 'Smartphone Apple com chip A17 Pro',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    description: 'Preço do produto em BRL (deve ser >= 0)',
    example: 9999.99,
    minimum: 0,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    description: 'Quantidade em estoque',
    example: 50,
    minimum: 0,
  })
  @Column({ type: 'int', default: 0 })
  stock: number;

  @ApiProperty({
    description: 'URL da imagem do produto',
    example: 'https://example.com/iphone15.jpg',
    nullable: true,
  })
  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @ApiProperty({
    description: 'SKU (Stock Keeping Unit) do produto',
    example: 'IPHONE-15-PRO-256',
    nullable: true,
  })
  @Column({ length: 50, nullable: true, unique: true })
  sku: string;

  @ApiProperty({
    description: 'Indica se o produto está ativo',
    example: true,
    default: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'ID da categoria do produto',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @Column({ name: 'category_id' })
  categoryId: string;

  @ApiProperty({
    description: 'Categoria do produto',
    type: () => Category,
  })
  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

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
}

