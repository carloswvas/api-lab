# **ShopAPI** – Seu E-commerce Backend Completo!

<pre>
███████╗██╗  ██╗ ██████╗ ██████╗      █████╗ ██████╗ ██╗
██╔════╝██║  ██║██╔═══██╗██╔══██╗    ██╔══██╗██╔══██╗██║
███████╗███████║██║   ██║██████╔╝    ███████║██████╔╝██║
╚════██║██╔══██║██║   ██║██╔═══╝     ██╔══██║██╔═══╝ ██║
███████║██║  ██║╚██████╔╝██║         ██║  ██║██║     ██║
╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝         ╚═╝  ╚═╝╚═╝     ╚═╝
</pre>

---

## **Bem-vindo, Dev Front-End!**

Você tem em mãos uma **API de E-commerce completa** com **Produtos** e **Categorias**!  
Banco de dados **PostgreSQL**, relacionamentos reais, validações robustas e filtros avançados.

Agora é sua vez de construir uma **loja virtual incrível**! 🛍️

---

## **Stack Tecnológica**

| Tecnologia | Versão |
|------------|--------|
| NestJS | 11.x |
| TypeScript | 5.x |
| PostgreSQL | 16 |
| TypeORM | 0.3.x |
| Swagger | OpenAPI 3.0 |
| Docker | 24.x |

---

## **O que você tem nas mãos?**

| Recurso | Status |
|---------|--------|
| CRUD completo de Categorias | ✅ |
| CRUD completo de Produtos | ✅ |
| Relacionamento Produto → Categoria | ✅ |
| Validação de preço não negativo | ✅ |
| Validação de estoque não negativo | ✅ |
| SKU único por produto | ✅ |
| Filtros avançados (preço, categoria, estoque) | ✅ |
| Paginação inteligente | ✅ |
| Ordenação por múltiplos campos | ✅ |
| Swagger documentado (`/docs`) | ✅ |
| Seed automático de dados iniciais | ✅ |

---

## **Endpoints – Categories**

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/categories` | Lista com filtros + paginação |
| `GET` | `/categories/:id` | Busca categoria (inclui produtos) |
| `POST` | `/categories` | Cria nova categoria |
| `PATCH` | `/categories/:id` | Atualiza categoria |
| `DELETE` | `/categories/:id` | Remove categoria (sem produtos) |

---

## **Endpoints – Products**

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/products` | Lista com filtros + paginação |
| `GET` | `/products/:id` | Busca produto (inclui categoria) |
| `POST` | `/products` | Cria novo produto |
| `PATCH` | `/products/:id` | Atualiza produto |
| `PATCH` | `/products/:id/stock` | Atualiza estoque (+/-) |
| `DELETE` | `/products/:id` | Remove produto |

> **📚 Documentação Interativa:** `http://localhost:3001/docs`

---

## **Modelo de Dados**

### **Category**
```json
{
  "id": "uuid",
  "name": "Eletrônicos",
  "description": "Dispositivos e gadgets",
  "isActive": true,
  "createdAt": "2025-12-17T10:00:00.000Z",
  "updatedAt": "2025-12-17T10:00:00.000Z"
}
```

### **Product**
```json
{
  "id": "uuid",
  "name": "iPhone 15 Pro",
  "description": "Smartphone Apple com chip A17 Pro",
  "price": 9999.99,
  "stock": 50,
  "imageUrl": "https://example.com/iphone.jpg",
  "sku": "IPHONE-15-PRO-256",
  "isActive": true,
  "categoryId": "uuid-da-categoria",
  "category": { ... },
  "createdAt": "2025-12-17T10:00:00.000Z",
  "updatedAt": "2025-12-17T10:00:00.000Z"
}
```

---

## **Filtros Avançados**

### **GET /categories**

| Parâmetro | Exemplo | Descrição |
|-----------|---------|-----------|
| `search` | `?search=Eletr` | Busca por nome |
| `isActive` | `?isActive=true` | Filtrar por status |
| `page` | `?page=2` | Número da página |
| `limit` | `?limit=5` | Itens por página |
| `orderBy` | `?orderBy=name` | Campo de ordenação |
| `order` | `?order=DESC` | Direção (ASC/DESC) |

### **GET /products**

| Parâmetro | Exemplo | Descrição |
|-----------|---------|-----------|
| `search` | `?search=iPhone` | Busca por nome ou descrição |
| `categoryId` | `?categoryId=uuid` | Filtrar por categoria |
| `isActive` | `?isActive=true` | Filtrar por status |
| `priceMin` | `?priceMin=100` | Preço mínimo |
| `priceMax` | `?priceMax=5000` | Preço máximo |
| `inStock` | `?inStock=true` | Apenas com estoque |
| `page` / `limit` | `?page=1&limit=12` | Paginação |
| `orderBy` | `?orderBy=price` | Campo de ordenação |
| `order` | `?order=ASC` | Direção (ASC/DESC) |

---

## **Validações Implementadas**

| Campo | Regra | Mensagem de Erro |
|-------|-------|------------------|
| `price` | ≥ 0 | "O preço não pode ser negativo" |
| `stock` | ≥ 0 | "O estoque não pode ser negativo" |
| `name` | 2-200 chars | "O nome deve ter entre 2 e 200 caracteres" |
| `categoryId` | UUID válido | "O categoryId deve ser um UUID válido" |
| `sku` | Único | "Já existe um produto com este SKU" |

---

## **Desafios ÉPICOS para o Front-End**

> 🏆 **Cada desafio concluído = +100 XP no seu portfólio!**

---

### **🛒 Desafio 1: Catálogo de Produtos com Grid Responsivo**
- Crie um grid de cards de produtos
- Implemente filtro por categoria (dropdown ou sidebar)
- Slider de faixa de preço (`priceMin` / `priceMax`)
- Toggle para "Apenas em estoque"
- Animação de entrada com **Framer Motion**

---

### **🔍 Desafio 2: Busca com Autocomplete**
- Campo de busca com debounce (300ms)
- Dropdown com sugestões em tempo real
- Destaque do texto buscado nos resultados
- Use `?search=...` da API

---

### **📦 Desafio 3: Carrinho de Compras (Local)**
- Adicionar/remover produtos do carrinho
- Persistir no `localStorage`
- Validar estoque disponível antes de adicionar
- Calcular total com formatação BRL (`Intl.NumberFormat`)

---

### **📊 Desafio 4: Dashboard Admin com Gráficos**
- Use **Chart.js** ou **Recharts**
- Gráfico de pizza: produtos por categoria
- Gráfico de barras: estoque por produto
- Cards com métricas: total de produtos, categorias, valor em estoque

---

### **🎨 Desafio 5: Gestão de Categorias com Drag & Drop**
- Use **dnd-kit** ou **react-beautiful-dnd**
- Reordenar categorias visualmente
- Modal para criar/editar categoria
- Confirmação antes de excluir

---

### **💰 Desafio 6: Atualização de Estoque em Tempo Real**
- Formulário de entrada/saída de estoque
- Use `PATCH /products/:id/stock` com `{ quantity: +10 }` ou `{ quantity: -5 }`
- Feedback visual de sucesso/erro
- Animação no número do estoque

---

### **🏷️ Desafio 7: Página de Detalhes do Produto**
- Rota dinâmica `/products/:id`
- Galeria de imagens (simule com placeholder)
- Badge de categoria clicável
- Indicador de estoque (Verde/Amarelo/Vermelho)
- Botão "Adicionar ao Carrinho"

---

### **📱 Desafio 8: PWA com Offline Support**
- Configure Service Worker
- Cache das categorias e produtos populares
- Indicador de modo offline
- Sincronize quando voltar online

---

### **🎯 Desafio 9: Infinite Scroll na Listagem**
- Substitua paginação tradicional por scroll infinito
- Use **Intersection Observer**
- Skeleton loading durante carregamento
- Contador de produtos exibidos vs total

---

### **⚡ Desafio 10: Otimização de Performance**
- Implemente **React Query** ou **SWR** para cache
- Memoização com `useMemo` e `React.memo`
- Code splitting por rota
- Lazy loading de imagens

---

## **Dicas de UI/UX**

- Use **Tailwind CSS** + **Shadcn/UI** para componentes elegantes
- Formatação de preço: `new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`
- Skeleton loading em todas as listagens
- Toast de sucesso/erro com **Sonner** ou **React Hot Toast**
- Tema claro/escuro com `next-themes`

---

## **Como Rodar Localmente**

### **Com Docker (Recomendado)**
```bash
git clone https://github.com/carloswvas/api-lab.git
cd 03-api-products
docker compose up -d
```

### **Sem Docker**
```bash
# Tenha PostgreSQL rodando localmente
cd 03-api-products
npm install
npm run start:dev
```

> **API:** http://localhost:3001  
> **Swagger:** http://localhost:3001/docs

---

## **Dados Iniciais (Seed)**

A API cria automaticamente dados de exemplo na primeira execução:

| Categoria | Produtos |
|-----------|----------|
| Eletrônicos | iPhone 15 Pro, MacBook Pro M3 |
| Vestuário | Camiseta Dev TypeScript |
| Livros | Clean Code - Robert C. Martin |

---

## **Seu Portfólio Vai Brilhar!**

> **"Eu criei um e-commerce completo com catálogo, carrinho, filtros avançados e dashboard admin!"**  
> — *Você, em 3 semanas*

---

## **Badge de Conclusão**

> Cole no seu README:  
![ShopAPI Master](https://img.shields.io/badge/ShopAPI-MASTER-00D084?style=for-the-badge&logo=shopify)

---

## **Bora construir sua loja?**

**Abra o terminal, respire fundo, e transforme essa API em um e-commerce de verdade!**

> **"O back-end entregou tudo. Agora é com você, front-end!"**

---

**#ShopAPI #Ecommerce #React #NextJS #TypeScript #PortfolioKiller**

