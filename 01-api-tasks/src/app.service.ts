import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: "Bem-vindo à API de Gerenciamento de Tarefas!",
      description:
        "Esta API permite criar, listar, atualizar e remover tarefas, com filtros avançados, paginação e ordenação.",

      docs: "Acesse /docs para visualizar a documentação Swagger.",

      endpoints: [
        {
          method: "POST",
          path: "/tasks",
          description: "Cria uma nova tarefa"
        },
        {
          method: "GET",
          path: "/tasks",
          description: "Lista todas as tarefas com paginação e filtros"
        },
        {
          method: "GET",
          path: "/tasks/:id",
          description: "Busca uma tarefa pelo ID"
        },
        {
          method: "PUT",
          path: "/tasks/:id",
          description: "Atualiza uma tarefa existente"
        },
        {
          method: "DELETE",
          path: "/tasks/:id",
          description: "Remove uma tarefa pelo ID"
        }
      ],

      status: "OK",
      version: "1.0.0"
    };
  }
}
