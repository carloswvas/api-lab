import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { TasksService } from './tasks/tasks.service';
import { TaskStatus } from './tasks/dtos/create-task.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const tasksService = app.get(TasksService)

  const taskCount = await tasksService.count()
  if(taskCount === 0 ){
    console.log('Banco vazio. Criando Task inicial')
    await tasksService.create({
      title: 'Bem-vindo(a) a api Tasks!',
      description: 'Esta tarefa foi criada automaticamente na inicialização do backend. Bora codar!',
      dueDate: new Date('2025-12-08'),
      status:TaskStatus.DONE
    })
  }

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  const config = new DocumentBuilder()
    .setTitle('API de Tarefas')
    .setDescription(
      `
### Sobre o Projeto
API pública desenvolvida com **NestJS + TypeScript** para fins de estudo e integração com aplicações front-end.  
Permite criar, listar, atualizar e excluir tarefas, simulando um ambiente real de CRUD.

---

### Avisos para quem for testar via Front-end
- Esta API **não possui autenticação** — qualquer usuário pode realizar requisições.
- Certifique-se de usar URLs iniciando com **http://** (ex: http://localhost:3000).
- Se ocorrer erro de rede no Swagger (“Failed to fetch”), significa que o navegador bloqueou a requisição — teste via Postman, Insomnia ou pelo seu front.

---

### Dicas
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


  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log('Api disponibilizada em http://localhost:3000');
  console.log('Documentação disponibilizada em http://localhost:3000/docs');
}
bootstrap();
