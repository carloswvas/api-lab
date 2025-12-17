import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '🛒 API de Produtos e Categorias - Acesse /docs para a documentação interativa!';
  }
}

