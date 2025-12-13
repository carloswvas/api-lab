import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET'],
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
  .setTitle('API Pokemon')
  .setDescription( `
### Sobre o Projeto
Esta é uma API pública desenvolvida em NestJS com TypeScript, criada para estudos e para integração com aplicações front-end.\n
A API permite consultar pokémons, seja listando todos, buscando uma lista específica ou recuperando detalhes de um pokémon individual.

---

### Avisos para quem for testar via Front-end
- Esta API **não possui autenticação** — qualquer usuário pode realizar requisições.
- Certifique-se de usar URLs iniciando com **http://** (ex: http://localhost:3000).
- Se ocorrer erro de rede no Swagger (“Failed to fetch”), significa que o navegador bloqueou a requisição — teste via Postman, Insomnia ou pelo seu front.

---

### Dicas
- As respostas seguem o formato **JSON**.
- Campos de data usam o padrão **ISO 8601** (ex: \`2025-11-12T10:00:00.000Z\`).
- Utilize o endpoint \`/pokemons\` listar os pokemons.

---

### Imagem estática
- Arquivos estáticos estão disponíveis no caminho \`/public\`
### Exemplo: http://localhost:3000/public/images/1-bulbasaur.png
`)
  .setVersion('1.0')
  .addTag('Pokemons')
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(process.env.PORT ?? 3000);
  console.log('Api disponibilizada em http://localhost:3000');
  console.log('Documentação disponibilizada em http://localhost:3000/docs');
}
bootstrap();
