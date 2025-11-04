# 🧠 API LAB — APIs para Treino de Front-End  
**Autor:** Carlos Vasconcelos  
**Tecnologias:** NestJS · TypeScript · SQLite · REST API  

---

## 🎯 Objetivo

Este repositório tem como objetivo **disponibilizar APIs reais para que desenvolvedores front-end possam praticar integração com back-end**. Periodicamente, uma nova API será lançada com um tema e conjunto de endpoints para consumo, simulando cenários reais do mercado.

---

## 🔄 Como Funciona

1. **Periodicamente**, será adicionada uma nova API em uma pasta separada, por exemplo:
   ```
   /01-api-tasks
   /02-api-products
   /03-api-users
   ...
   ```
2. Cada pasta conterá:
   - Um projeto **NestJS** completo com **SQLite** embutido.  
   - Um **README.md próprio** explicando endpoints, exemplos de uso e sugestões de desafios.
   - Um **arquivo .db** (SQLite) com dados de exemplo.

3. As APIs podem ser consumidas via **Postman**, **Insomnia** ou diretamente pelo **frontend** (React, Vue, Angular etc).

---

## ⚙️ Tecnologias Utilizadas

- **NestJS** — Framework Node.js modular e escalável.  
- **TypeScript** — Tipagem forte e manutenção simplificada.  
- **SQLite** — Banco de dados leve e portátil, ideal para APIs de treino.  
- **Class Validator / Class Transformer** — Validação e transformação de dados.  
- **Swagger** — Documentação automática dos endpoints.

---

## 🚀 Como Executar uma API

```bash
# Clone o repositório
git clone https://github.com/carloswvas/api-lab.git

# Entre na pasta de uma API específica
cd 01-api-tasks

# Instale as dependências
npm install

# Rode o servidor
npm run start:dev
```

A API ficará disponível em:  
👉 **http://localhost:3000**

A documentação Swagger pode ser acessada em:  
👉 **http://localhost:3000/api-docs**

---

## 🧩 Estrutura Padrão de Cada API

```
📁 src/
 ┣ 📂 modules/
 ┃ ┣ 📂 entities/
 ┃ ┣ 📂 dto/
 ┃ ┣ 📜 controller.ts
 ┃ ┣ 📜 service.ts
 ┃ ┗ 📜 module.ts
 ┣ 📜 main.ts
 ┣ 📜 app.module.ts
 ┗ 📜 prisma/
```

---

## 💡 Sugestões de Prática para Front-End

Cada API virá acompanhada de sugestões como:
- Criar uma tela de **listagem e detalhes** dos dados.
- Implementar **formulários** de cadastro e edição.
- Tratar **erros de API** e **validações**.
- Exibir **mensagens dinâmicas** (sucesso/erro).
- Aplicar **autenticação (JWT)** nas APIs que exigirem login.

---

## 🗓️ Cronograma de Lançamentos

| Nº | Tema da API | Data de Publicação | Status
|----|--------------|--------------------| -------- |
| 01 | Lista de Tarefas | 00/00/2025 | 🟢 Disponível |
| 02 | Produtos e Categorias | 00/00/2025 | 🔴 Em desenvolvimento |
| 03 | Usuários e Autenticação | 00/00/2025 | ⚪ Em breve |
| ... | ... | ... | ... |

---

## 🤝 Como Contribuir

Quer sugerir uma nova prática ou colaborar?  
1. Faça um **fork** do repositório.  
2. Crie uma nova branch:  
   ```bash
   git checkout -b feature/nova-api
   ```
3. Faça suas alterações e envie um **pull request**.

---

## 🧑‍💻 Sobre o Autor

**Carlos Vasconcelos**  
Instrutor de TI com mais de 10 anos de experiência na área e 7 anos na educação.  
Atua com desenvolvimento de software, mentoria de alunos e criação de produtos educacionais voltados à formação de desenvolvedores.  

📬 [LinkedIn](https://www.linkedin.com/in/carlos-w-vasconcelos/)  
🐙 [GitHub](https://github.com/carloswvas)
