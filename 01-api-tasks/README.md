# **TaskMaster API** – O Playground Perfeito para o Dev Front-End!  

<pre>
████████╗ █████╗ ███████╗██╗  ██╗███╗   ███╗ █████╗ ███████╗████████╗███████╗██████╗      █████╗ ██████╗ ██╗
╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝████╗ ████║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗    ██╔══██╗██╔══██╗██║
   ██║   ███████║███████╗█████╔╝ ██╔████╔██║███████║███████╗   ██║   █████╗  ██████╔╝    ███████║██████╔╝██║
   ██║   ██╔══██║╚════██║██╔═██╗ ██║╚██╔╝██║██╔══██║╚════██║   ██║   ██╔══╝  ██╔══██╗    ██╔══██║██╔═══╝ ██║
   ██║   ██║  ██║███████║██║  ██╗██║ ╚═╝ ██║██║  ██║███████║   ██║   ███████╗██║  ██║    ██║  ██║██║     ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝     ╚═╝
</pre>
---

## **Bem-vindo, Herói do Front-End!**  
Você acabou de receber o **poder supremo** de uma API **robusta, segura e cheia de filtros** para construir o **gerenciador de tarefas dos seus sonhos**!  

Essa API **não é só um CRUD** — é um **campo de batalha** para você brilhar com animações, filtros dinâmicos, drag-and-drop, dark mode, e até **notificações em tempo real**!

---

## **O que você tem nas mãos?**

| Recurso | Status |
|--------|--------|
| CRUD completo de tarefas | ✅ |
| Filtros avançados (busca, data, status) | ✅ |
| Paginação inteligente | ✅ |
| Ordenação por múltiplos campos | ✅ |
| Validação com DTOs | ✅ |
| Swagger documentado (acesso em `/docs`) | ✅ |
| Status automático (`overdue` com lógica extra) | 🔥 (desafio!) |

---

## **Endpoints – Sua Caixa de Ferramentas**

| Método | Rota | Descrição |
|-------|------|-----------|
| `GET` | `/tasks` | Lista com **filtros + paginação** |
| `GET` | `/tasks/:id` | Busca uma tarefa |
| `POST` | `/tasks` | Cria uma nova tarefa |
| `PUT` | `/tasks/:id` | Atualiza tarefa |
| `DELETE` | `/tasks/:id` | Remove tarefa |

> **Acesse a doc interativa:** `http://localhost:3000/docs`

---

## **Campos da Tarefa**

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "dueDate": "2025-11-17",
  "status": "pending" | "in_progress" | "done" | "overdue",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

---

## **FILTROS AVANÇADOS (GET /tasks)**

| Parâmetro | Exemplo | Descrição |
|---------|--------|-----------|
| `search` | `?search=TypeScript` | Busca em título e descrição |
| `status` | `?status=pending` | Filtra por status |
| `dueDateStart` | `?dueDateStart=2025-11-01` | Data mínima |
| `dueDateEnd` | `?dueDateEnd=2025-11-30` | Data máxima |
| `orderBy` | `?orderBy=dueDate` | Campo de ordenação |
| `order` | `?order=ASC` | Ordem (ASC/DESC) |
| `page` / `limit` | `?page=2&limit=5` | Paginação |

---

## **Desafios ÉPICOS para o Front-End**

> **Dica:** Cada desafio concluído = +100 XP no seu portfólio!

---

### **Desafio 1: Filtro Dinâmico com Chips Animados**  
- Crie chips removíveis para cada filtro aplicado  
- Animação de entrada/saída com **Framer Motion** ou **GSAP**  
- Atualize a URL com `useSearchParams`

---

### **Desafio 2: Drag & Drop + Kanban Board**  
- Use **dnd-kit** ou **react-beautiful-dnd**  
- Mova tarefas entre colunas: `Pending → In Progress → Done`  
- Atualize o status com `PUT /tasks/:id`

---

### **Desafio 3: Notificações de Vencimento**  
- Destaque tarefas com `dueDate < hoje` e `status !== done`  
- Adicione badge vermelho com contador  
- Animação de "tremor" nas overdue

---

### **Desafio 4: Modo Escuro Automático + Tema Personalizado**  
- Detecte preferência do sistema  
- Salve no `localStorage`  
- Animação suave de troca de tema

---

### **Desafio 5: Gráfico de Produtividade (Bônus Épico!)**  
- Use **Chart.js** ou **Recharts**  
- Mostre tarefas concluídas por dia/semana  
- Dados vêm de `GET /tasks?createdStart=...`

---

### **Desafio 6: Auto-Update de Status `overdue`**  
> **Atenção:** A API **não atualiza automaticamente** o status!  
- Crie um `useEffect` que verifica `dueDate`  
- Se `dueDate < now` e `status !== done` → PATCH para `overdue`  
- Atualize UI em tempo real

---

### **Desafio 7: Animações de Criação/Edição**  
- Modal com animação de **slide + fade**  
- Confete ao marcar como `done` (**canvas-confetti**)  
- Feedback visual ao salvar

---

## **Dicas de UI/UX para Brilhar**

- Use **Tailwind CSS** + **Headless UI**  
- Cards com hover 3D (`transform: perspective`)  
- Skeleton loading na listagem  
- Toast de sucesso/erro com **Sonner** ou **React Hot Toast**

---

## **Como Rodar Localmente**

```bash
git clone https://github.com/carloswvas/api-lab.git
cd 01-api-tasks
pnpm install
pnpm run start:dev
```
---

## **Seu Portfólio Vai Explodir!**

> **"Eu criei um gerenciador de tarefas com filtros avançados, drag-and-drop, animações e auto-update de status!"**  
> — *Você, em 2 semanas*

---

## **Badge de Conclusão**

> Cole no seu README: 
![TaskMaster Master](https://img.shields.io/badge/TaskMaster-MASTER-FFD700?style=for-the-badge&logo=trophy)
---

## **Bora codar?**  
**Abra o terminal, respire fundo, e transforme essa API em uma obra-prima visual!**

> **"O back-end fez o trabalho pesado. Agora é com você, front-end!"**  

---

**#TaskMaster #FrontEndChallenge #React #TypeScript #PortfolioKiller**
