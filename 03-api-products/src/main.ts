import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CategoriesService } from './modules/categories/categories.service.js';
import { ProductsService } from './modules/products/products.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Seed inicial de dados
  const categoriesService = app.get(CategoriesService);
  const productsService = app.get(ProductsService);

  const categoryCount = await categoriesService.count();
  if (categoryCount === 0) {
    console.log('🌱 Banco vazio. Criando dados iniciais...');

    // Criar categorias
    const electronics = await categoriesService.create({
      name: 'Eletrônicos',
      description: 'Dispositivos eletrônicos e gadgets',
    });

    const clothing = await categoriesService.create({
      name: 'Vestuário',
      description: 'Roupas e acessórios de moda',
    });

    const books = await categoriesService.create({
      name: 'Livros',
      description: 'Livros físicos e digitais',
    });

    // Criar produtos
    await productsService.create({
      name: 'iPhone 15 Pro',
      description: 'Smartphone Apple com chip A17 Pro',
      price: 9999.99,
      stock: 50,
      categoryId: electronics.id,
    });

    await productsService.create({
      name: 'MacBook Pro M3',
      description: 'Notebook profissional com chip M3',
      price: 19999.99,
      stock: 25,
      categoryId: electronics.id,
    });

    await productsService.create({
      name: 'Camiseta Dev TypeScript',
      description: 'Camiseta 100% algodão com estampa TypeScript',
      price: 79.9,
      stock: 100,
      categoryId: clothing.id,
    });

    await productsService.create({
      name: 'Clean Code - Robert C. Martin',
      description: 'O guia definitivo para escrever código limpo',
      price: 89.9,
      stock: 200,
      categoryId: books.id,
    });

    console.log('✅ Dados iniciais criados com sucesso!');
  }

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API de Produtos e Categorias')
    .setDescription(
      `
### Sobre o Projeto
API pública desenvolvida com **NestJS + TypeScript + PostgreSQL** para fins de estudo e integração com aplicações front-end.  
Simula um catálogo de e-commerce com **Produtos** e **Categorias**, incluindo relacionamentos, filtros avançados e validações robustas.

---

### Stack Tecnológica
- **Backend:** NestJS + TypeORM
- **Banco de Dados:** PostgreSQL
- **Validação:** class-validator + class-transformer
- **Documentação:** Swagger/OpenAPI

---

### Avisos para quem for testar via Front-end
- Esta API **não possui autenticação** — qualquer usuário pode realizar requisições.
- Certifique-se de usar URLs iniciando com **http://** (ex: http://localhost:3001).
- Se ocorrer erro de rede no Swagger ("Failed to fetch"), teste via Postman, Insomnia ou pelo seu front.

---

### Dicas
- As respostas seguem o formato **JSON**.
- Preços são em **BRL (R$)** com até 2 casas decimais.
- Produtos possuem relação com Categorias (ManyToOne).
- Use os filtros para simular uma loja real!
`,
    )
    .setVersion('1.0')
    .addTag('Categories', 'Gerenciamento de categorias de produtos')
    .addTag('Products', 'Gerenciamento de produtos do catálogo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
  console.log('🚀 API disponibilizada em http://localhost:3001');
  console.log('📚 Documentação disponibilizada em http://localhost:3001/docs');
}
bootstrap();


