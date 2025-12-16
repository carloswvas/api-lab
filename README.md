# **API LAB** — APIs Reais para Treino de Front-End

**Autor:** Carlos Vasconcelos  
**Tecnologias:** NestJS · TypeScript · MongoDB · PostgreSQL · REST API · Docker 

---

## **Sobre o Projeto**

O **API Lab** é um projeto **open source educacional** criado para desenvolvedores que querem praticar **integração front-end com APIs reais**, seguindo **padrões usados no mercado**.

Aqui você não encontra CRUDs genéricos.
Cada API simula um **cenário real**, com regras, validações e estrutura pensadas para **ensino e prática profissional**.

> **Ideal para quem quer sair do “projeto de curso” e treinar como se estivesse em um time real.**

---

## **Para quem é este projeto?**

- Desenvolvedores Front-End (React, Vue, Angular, Mobile)
- Estudantes de programação
- Quem quer praticar consumo de APIs reais
- Quem deseja montar projetos de portfólio mais profissionais

## **Como Funciona**

1. **Novas APIs são adicionadas em pastas numeradas:**

   ```
   /01-api-tasks
   /02-api-products
   /03-api-users
   ...
   ```

2. **Cada pasta contém:**
   - Projeto NestJS completo
   - `README.md` com endpoints, exemplos e **desafios front-end**
   - Dockerfile e Docker Compose
   - Documentação Swagger
   - Estrutura preparada para testes

---

## Tecnologias Utilizadas

- **NestJS** — Framework Node.js modular e escalável.  
- **TypeScript** — Tipagem forte e manutenção simplificada.  
- **Docker / Docker Compose** — Containerização e orquestração para fácil execução.
- **MongoDB / PostgreSQL** — Bancos usados em projetos reais.
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
> Estrutura pensada para ensinar organização, separação de responsabilidades e boas práticas.
---

## Sugestões de Prática para Front-End

Cada API virá acompanhada de sugestões como:
- Listagem e detalhamento de dados.
- Formulários de criação e edição.
- Tratamento de erros e validações.
- Feedback visual (sucesso / erro).
- Autenticação (JWT) quando aplicável

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
>Sugestões de novas APIs e melhorias também são muito bem-vindas.
---

## Sobre o Autor

**Carlos Vasconcelos**  
Instrutor de TI com mais de 10 anos de experiência na área e 7 anos na educação.
Atua com:
- Desenvolvimento de software
- Ensino de Programação
- Mentoria de alunos e criação de produtos educacionais.  

📬 [LinkedIn](https://www.linkedin.com/in/carlos-w-vasconcelos/)  
🐙 [GitHub](https://github.com/carloswvas)

---
⭐ Se este projeto te ajudou, considere deixar uma star no repositório.
Isso ajuda o projeto a crescer e alcançar mais desenvolvedores.
> **Clone. Consuma. Construa. Brilhe.**
