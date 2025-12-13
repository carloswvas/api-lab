# **Pokemon Master API** – A Pokédex Oficial dos Heróis do Front-End!  

<pre>
██████╗  ██████╗ ██╗  ██╗███████╗███╗   ███╗ ██████╗ ███╗   ██╗    ███╗   ███╗ █████╗ ███████╗████████╗███████╗██████╗ 
██╔══██╗██╔═══██╗██║ ██╔╝██╔════╝████╗ ████║██╔═══██╗████╗  ██║    ████╗ ████║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
██████╔╝██║   ██║█████╔╝ █████╗  ██╔████╔██║██║   ██║██╔██╗ ██║    ██╔████╔██║███████║███████╗   ██║   █████╗  ██████╔╝
██╔═══╝ ██║   ██║██╔═██╗ ██╔══╝  ██║╚██╔╝██║██║   ██║██║╚██╗██║    ██║╚██╔╝██║██╔══██║╚════██║   ██║   ██╔══╝  ██╔══██╗
██║     ╚██████╔╝██║  ██╗███████╗██║ ╚═╝ ██║╚██████╔╝██║ ╚████║    ██║ ╚═╝ ██║██║  ██║███████║   ██║   ███████╗██║  ██║
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
                                                                                                                                                       
</pre>
---

## **Bem-vindo, Mestre Pokémon do Front-End!**  
Você acaba de encontrar a **API definitiva** para construir sua própria **Pokédex**, listas inteligentes, filtros avançados e dashboards insanos sobre Pokémon. 

---

### Aqui você vai usar e abusar de:
- Buscas avançadas
- Filtros por geração, tipo, nome e ID
- Ordenação
- Paginação
- Endpoints limpos e performáticos
- Dados COMPLETOS de Pokémon (tipos, stats, habilidades, geração, imagem…)

Esta API é o seu novo campo de treinamento.
O front-end vai brilhar — e você vai conquistar todas as Badges.

## **O que você tem nas mãos?**

| Recurso | Status |
|--------|--------|
| Listagem completa de Pokémons | ✅ |
| Busca por nome ou ID | ✅ |
| Filtros avançados (tipo, geração) | ✅ |
| Paginação inteligente | ✅ |
| Ordenação por múltiplos campos | ✅ |
| DTOs com validação | ✅
| **Acesso a Imagens Estáticas de cada pokemon** | ✅ |
| Swagger documentado (acesso em `/docs`) | ✅ |
| Dados completos do Pokémon | 🔥 (desafio!) |

A API também expõe imagens estáticas dos Pokémons, permitindo que front-ends exibam artes oficiais sem depender de fontes externas.
---

## **Endpoints – Sua Pokédex Digital**

| Método | Rota | Descrição |
|-------|------|-----------|
| `GET` | `/pokemons` | Lista Pokémons com filtros + paginação |
| `GET` | `/pokemons/:id` | Retorna detalhes completos de um Pokémon |
| `GET` | `/public/images/{id}-{name}.png` | Exibe artes oficiais de cada Pokémon sem depender de fontes externas |

As imagens são servidas automaticamente pelo servidor NestJS usando a pasta `public/`.
Podem ser utilizadas diretamente em aplicações front-end, mobile ou serviços externos.

> **Acesse a doc interativa:** `http://localhost:3000/docs`

---

## **FILTROS AVANÇADOS (GET /pokemons)**

| Parâmetro | Exemplo | Descrição |
|---------|--------|-----------|
| `search` | `?search=bulb` | Busca por nome ou ID |
| `generation` | `?generation=1` | Filtra pela geração |
| `type` | `?type=grass` | Filtra pelo tipo do Pokémon|
| `orderBy` | `?orderBy=name` | Campo de ordenação |
| `order` | `?order=DESC` | Ordenação ASC/DESC |
| `page` | `?page=2` | Página atual |
| `limit` | `?limit=20` | Tamanho da página |

### Campos aceitos no orderBy
- id
- name
- base_experience
- createdAt

---

## Exemplo real de Pokémon (modelo do banco)
```json
{
  "_id": "6938d0efb2beda5a155cf484",
  "id": 1,
  "name": "bulbasaur",
  "height": 7,
  "weight": 69,
  "base_experience": 64,
  "image_path": "public/images/1-bulbasaur.png",
  "types": [
    { "id": 12, "name": "Grass" },
    { "id": 4, "name": "Poison" }
  ],
  "stats": [
    { "id": 1, "name": "HP", "base_stat": 45 },
    { "id": 2, "name": "Attack", "base_stat": 49 },
    { "id": 3, "name": "Defense", "base_stat": 49 },
    { "id": 4, "name": "Special Attack", "base_stat": 65 },
    { "id": 5, "name": "Special Defense", "base_stat": 65 },
    { "id": 6, "name": "Speed", "base_stat": 45 }
  ],
  "abilities": [
    { "id": 65, "name": "Overgrow", "is_hidden": false },
    { "id": 34, "name": "Chlorophyll", "is_hidden": true }
  ],
  "generation": { "id": 1, "name": "Generation I" }
}
```
## **Como Rodar Localmente**

```bash
git clone https://github.com/carloswvas/api-lab.git
cd 02-api-pokemon
docker compose up -d --build
```
---

## **Gym Badges – Conquistas do Front-End**
> **Dica:** Cada desafio concluído = +100 XP no seu portfólio!

---

### **Desafio 1 – Pokédex com Infinite Scroll**  
- Use IntersectionObserver
- Carregue novos Pokémons conforme o scroll
- Transição suave entre cards

---

### **Desafio 2 – Filtros com Chips (tipos, geração)**  
- Cada filtro vira um chip
- Remoção animada com Framer Motion

---

### **Desafio 3 – Battle Stats Chart**  
- Use Recharts ou Chart.js
- Mostre os stats em Radar Chart (igual aos jogos!)

---

### **Desafio 4 – Modal de Detalhes com animação**  
- Exibir Pokémon completo
- Animação de fade/slide

---

### **Desafio 5 – Busca com autocomplete**  
- Sugestões a cada letra
- debounce de 300ms

---

### **Desafio 6 – Sistema de Favoritos**  
- LocalStorage
- Badge “★” para favorito

## **Dicas de UI/UX para uma Pokédex de Verdade**

- Cards com sombra leve + borda colorida por tipo
- Skeleton Loading inspirado no GameBoy
- Background animado com gradientes suaves
- Efeitos sonoros 8-bit ao clicar
- Animações rápidas com Framer Motion

---

## **Pokémon Master Badge**

> Use no seu README do front-end:<br>

![Pokémon Master](https://img.shields.io/badge/Pokémon_Master-CHAMPION-EE1515?style=for-the-badge&logo=pokemon&logoColor=white)    ou    ![Pokémon Master](https://img.shields.io/badge/Pokémon_Master-CHAMPION-3B4CCA?style=for-the-badge&logo=pokemon&logoColor=white)

---

## **Agora é com você, treinador!**  
**Abra o VSCode, prepare seus componentes, e capture — ou melhor, renderize — todos os Pokémons!**

> **"A jornada para ser um Mestre Pokémon começa com uma única requisição GET."**

> **"Catch ’em all — inclusive os bugs."**  

**#PokemonMaster #FrontEndChallenge #React #TypeScript #PortfolioKiller**

---
Feito por **Carlos Vasconcelos**


