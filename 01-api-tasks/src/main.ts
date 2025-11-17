import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { dataSource } from './database/orm-cli-config';

async function runMigrations() {
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    await dataSource.runMigrations();
    console.log('✅ Migrations executadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar migrations:', error);
    process.exit(1);
  }
}

async function bootstrap() {
  await runMigrations();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API de Tarefas')
    .setDescription(
      `
### 📝 Sobre o Projeto
API pública desenvolvida com **NestJS + TypeScript** para fins de estudo e integração com aplicações front-end.  
Permite criar, listar, atualizar e excluir tarefas, simulando um ambiente real de CRUD.

---

### ⚠️ Avisos para quem for testar via Front-end
- Esta API **não possui autenticação** — qualquer usuário pode realizar requisições.
- Certifique-se de usar URLs iniciando com **http://** (ex: http://localhost:3000).
- Se ocorrer erro de rede no Swagger (“Failed to fetch”), significa que o navegador bloqueou a requisição — teste via Postman, Insomnia ou pelo seu front.

---

### 💡 Dicas
- As respostas seguem o formato **JSON**.
- Campos de data usam o padrão **ISO 8601** (ex: \`2025-11-12T10:00:00.000Z\`).
- Utilize o endpoint \`/tasks\` para gerenciar suas tarefas.
`,
    )
    .setVersion('1.0')
    .addTag('Tasks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log('Api disponibilizada em http://localhost:3000');
  console.log('Documentação disponibilizada em http://localhost:3000/docs');
}
bootstrap();
