import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: "Bem-vindo à API Pública de Pokémons!",
      description:
        "Aqui você pode consultar a lista completa de pokémons, aplicar filtros, paginar resultados e visualizar detalhes individuais de forma rápida e simples.",

      docs: "Documentação disponível em /docs (Swagger UI).",

      endpoints: [
        {
          method: "GET",
          path: "/pokemons",
          description: "Retorna todos os pokémons com suporte a filtros e paginação"
        },
        {
          method: "GET",
          path: "/pokemons/:id",
          description: "Consulta um pokémon pelo seu identificador"
        }
      ],

      status: "OK",
      version: "1.0.0"
    }
  }
}
