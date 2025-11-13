# 🧠 **API LAB** — APIs Reais para Treino de Front-End

**Autor:** Carlos Vasconcelos  
**Tecnologias:** NestJS · TypeScript · SQLite · REST API  

---

## 🎯 **Objetivo**

Disponibilizar **APIs completas e reais** para desenvolvedores **front-end** praticarem integração com back-end — como em projetos do mercado.

> **Cada API = 1 cenário real + desafios práticos**

---

## 🔄 **Como Funciona**

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
   - Banco `.db` com dados reais (quando necessário)
   - Documentação Swagger

3. **Consuma com:**
   - React, Vue, Angular
   - Postman, Insomnia
   - Mobile (React Native, Flutter)

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
pnpm install

# Rode o servidor
pnpm run start:dev
```

A API ficará disponível em:  
👉 **http://localhost:3000**

A documentação Swagger pode ser acessada em:  
👉 **http://localhost:3000/docs**

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

---
> **Clone. Consuma. Construa. Brilhe.**
