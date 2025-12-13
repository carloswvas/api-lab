# **API LAB** — APIs Reais para Treino de Front-End

**Autor:** Carlos Vasconcelos  
**Tecnologias:** NestJS · TypeScript · MongoDB · PostgreSQL · REST API · Docker 

---

## **Objetivo**

Disponibilizar **APIs completas e reais** para desenvolvedores **front-end** praticarem integração com back-end — como em projetos do mercado.

> **Cada API = 1 cenário real + desafios práticos**

---

## **Como Funciona**

1. **Novas APIs são adicionadas em pastas numeradas:**

   ```
   /01-api-tasks
   /02-api-products
   /03-api-users
   ...
   ```

2. **Cada pasta contém:**
   - Projeto NestJS completo com SQLite
   - `README.md` com endpoints, exemplos e **desafios front-end**
   - Dockerfile para rodar a API em container
   - Documentação Swagger

3. **Consuma com:**
   - React, Vue, Angular
   - Postman, Insomnia
   - Mobile (React Native, Flutter)

---

## Tecnologias Utilizadas

- **NestJS** — Framework Node.js modular e escalável.  
- **TypeScript** — Tipagem forte e manutenção simplificada.  
- **Docker / Docker Compose** — Containerização e orquestração para fácil execução.  
- **Class Validator / Class Transformer** — Validação e transformação de dados.  
- **Swagger** — Documentação automática dos endpoints.

---

## Como Executar uma API
**Importante:** Certifique-se de que o **Docker Desktop** está **ligado / iniciado / em execução (running)** antes de usar qualquer comando do Docker ou Docker Compose.
```bash
# Clone o repositório
git clone https://github.com/carloswvas/api-lab.git

# Entre na pasta de uma API específica
cd 01-api-tasks

# Suba a API usando Docker Compose
docker compose up -d --build

# (Opcional) Verifique os logs do container
docker logs task-api
```

A API ficará disponível em:  
**http://localhost:3000**

A documentação Swagger pode ser acessada em:  
**http://localhost:3000/docs**

---

## Estrutura Padrão de Cada API

```
📁 src/
 ┣ 📂 modules/
 ┃ ┣ 📂 dtos/
 ┃ ┣ 📂 schemas/
 ┃ ┣ 📂 tests/
 ┃ ┣ 📜 controller.ts
 ┃ ┣ 📜 service.ts
 ┃ ┗ 📜 module.ts
 ┣ 📜 main.ts
 ┣ 📜 app.module.ts
 ┗ 📜 docker-compose.yml
 ┗ 📜 Dockerfile
```

---

## Sugestões de Prática para Front-End

Cada API virá acompanhada de sugestões como:
- Criar uma tela de **listagem e detalhes** dos dados.
- Implementar **formulários** de cadastro e edição.
- Tratar **erros de API** e **validações**.
- Exibir **mensagens dinâmicas** (sucesso/erro).
- Aplicar **autenticação (JWT)** nas APIs que exigirem login.

---

## Cronograma de Lançamentos

| Nº | Tema da API | Data de Publicação | Status
|----|--------------|--------------------| -------- |
| 01 | Lista de Tarefas | 08/12/2025 | 🟢 Disponível |
| 02 | Api Pokemon | 13/12/2025 | 🟢 Disponível |
| 03 | Produtos e Categorias | 00/00/2025 | ⚪ Em breve |
| 04 | Usuários e Autenticação | 00/00/2025 | ⚪ Em breve |
| ... | ... | ... | ... |

---

## Como Contribuir

Quer sugerir uma nova prática ou colaborar?  
1. Faça um **fork** do repositório.  
2. Crie uma nova branch:  
   ```bash
   git checkout -b feature/nova-api
   ```
3. Faça suas alterações e envie um **pull request**.

---

## Sobre o Autor

**Carlos Vasconcelos**  
Instrutor de TI com mais de 10 anos de experiência na área e 7 anos na educação.  
Atua com desenvolvimento de software, mentoria de alunos e criação de produtos educacionais voltados à formação de desenvolvedores.  

📬 [LinkedIn](https://www.linkedin.com/in/carlos-w-vasconcelos/)  
🐙 [GitHub](https://github.com/carloswvas)

---
> **Clone. Consuma. Construa. Brilhe.**
