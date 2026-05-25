# ◈ lucas/portfolio

> Portfolio pessoal de Lucas Pedro da Hora — desenvolvedor Full Stack com foco em React, Node.js e Rust.

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055ff?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)

---

## ✦ Visão geral

Site portfolio com estética **terminal/DEV** — fonte monospace, grid background, multi-tema e animações. Construído com arquitetura **DDD + Clean Architecture + SOLID** e suporte bilíngue **PT-BR / EN**.

## ✦ Funcionalidades

- **14 temas** — 10 dark (Midnight, Terminal, Cyberpunk, Dracula, Tokyo Night, Synthwave, Nord, Night Runner, Forest, Rosé Pine) + 4 light (Coffee, Paper, Latte, Sakura)
- **Bilíngue** — PT-BR e EN com troca instantânea via contexto React
- **Currículo online** — página `/cv` completa com exportação via print nativo do browser
- **GitHub API** — projetos em destaque carregados direto do GitHub com fallback local
- **Roteamento** — 6 páginas com lazy loading e transições suaves (Framer Motion)
- **Performance** — code splitting por rota, vendor chunks separados, compressão Brotli + gzip, imagens otimizadas
- **Responsive** — mobile-first, menu hamburguer, layout adaptável

## ✦ Stack

| Camada         | Tecnologias                                            |
| -------------- | ------------------------------------------------------ |
| **Framework**  | React 19 + TypeScript 6 + Vite 8                       |
| **Estilo**     | Tailwind CSS v4 + CSS Custom Properties                |
| **Animações**  | Framer Motion 12                                       |
| **Roteamento** | React Router v7                                        |
| **Ícones**     | Phosphor Icons                                         |
| **Fonte**      | JetBrains Mono Variable                                |
| **API**        | @octokit/rest (GitHub API)                             |
| **Build**      | vite-plugin-compression2 + vite-plugin-image-optimizer |

## ✦ Arquitetura

```
src/
  domain/          # Entidades e value-objects puros
  application/     # Use-cases
  infrastructure/  # Dados estáticos + GitHub client + repositórios
  presentation/    # React (componentes, páginas, contextos, router)
  i18n/            # Traduções PT e EN
  styles/          # Temas CSS (14 temas via data-theme)
```

A separação segue **DDD**: o domínio não conhece React, a infrastructure não conhece a UI, e a presentation apenas chama use-cases ou repositórios via interfaces (princípio D do SOLID).

## ✦ Páginas

| Rota          | Descrição                                           |
| ------------- | --------------------------------------------------- |
| `/`           | Home — Hero, resumo de seções, projetos em destaque |
| `/projects`   | Todos os projetos (local + GitHub)                  |
| `/experience` | Timeline completo de experiência profissional       |
| `/stack`      | Stack técnica agrupada por categoria                |
| `/contact`    | Contato + links sociais                             |
| `/cv`         | Currículo completo (PT ou EN) com impressão nativa  |

## ✦ Primeiros passos

**Pré-requisitos:** Node.js 18+ e pnpm

```bash
# Instalar dependências
pnpm install

# Servidor de desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Preview do build
pnpm preview

# Formatação do código
pnpm format
```

## ✦ Variáveis de ambiente

Não há variáveis obrigatórias. A GitHub API funciona sem token (rate limit de 60 req/h). Para aumentar o limite:

```env
# .env.local (opcional)
VITE_GITHUB_TOKEN=ghp_...
```

> O `GithubClient` em `src/infrastructure/github/GithubClient.ts` já aceita o token se presente.

## ✦ Temas

Os temas são definidos em `src/styles/themes.css` via `data-theme` no `<html>`. Para adicionar um novo tema, basta adicionar um seletor `[data-theme="nome"]` com as CSS vars e registrar a entrada em `src/infrastructure/data/themes.data.ts`.

## ✦ i18n

As traduções vivem em `src/i18n/pt.ts` (PT-BR, define a interface `Translations`) e `src/i18n/en.ts` (EN). Para adicionar uma nova string: adicione o campo na interface em `pt.ts` e o valor correspondente em `en.ts`.

---

<p align="center">
  Feito com ♥ por <a href="https://github.com/Lusk1nha">Lucas Pedro da Hora</a>
</p>
