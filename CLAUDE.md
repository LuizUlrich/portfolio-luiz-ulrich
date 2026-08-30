# Portfólio Luiz Ulrich

Site pessoal com duas vertentes sob o mesmo domínio:

- **Luiz** (`/luiz`) — portfólio profissional: tecnologia, sistemas, dados, suporte.
- **Ulrich** (`/ulrich`) — projeto artístico como DJ: sets, SoundCloud, press kit.
- **Home** (`/`) — landing que apresenta as duas vertentes.
- **Contato** (`/contato`) — canal único de contato para as duas vertentes.

## Stack

- Next.js 15 (App Router, Server Components por padrão, `'use client'` só onde precisa de interatividade)
- React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- PostgreSQL via `pg` (`lib/db.ts` — pool singleton), string de conexão em `DATABASE_URL`. Ainda não decidido onde vai rodar (talvez Vercel Postgres, se tier gratuito atender).
- Deploy: Vercel, branch de trabalho `claude/portfolio-diagnostic-audit-crEUs`, PR #18.

## Identidade visual — leia antes de criar ou alterar qualquer página

Este projeto tem um manual de identidade formal:

- **`manual-identidade-ulrich.md`** — o manual completo: conceito, paleta, tema, tipografia, escala, assinaturas visuais, anti-padrões, tokens CSS de referência.
- **`identidade-ulrich-demo.html`** — protótipo vivo do sistema (abrir no navegador), com os toggles de contexto (dev/dj) e tema (escuro/claro) funcionando.

**Regra: toda página nova, componente novo ou redesign a partir de agora segue esse manual.** Resumo do essencial:

- Dois eixos independentes que nunca se misturam como acento na mesma peça:
  - **Contexto** (`data-domain`): `dev` = acento vinho `#8A1F3D` (Luiz/profissional); `dj` = acento roxo meia-noite `#4A2C6D` (Ulrich).
  - **Tema** (`data-theme`): `dark` (padrão, `#0A0A0A`) ou `light` (`#F7F6F2`). Nunca preto puro no fundo escuro, nunca branco puro no fundo claro.
- Tipografia: Cabinet Grotesk para display/títulos, Inter para corpo, JetBrains Mono para **todo** dado numérico (ano, BPM, tom, métrica) — nunca número em Inter ou Cabinet.
- Escala de 8px para espaçamento, tamanho de componente e raio de borda. Meio-passo de 4px é a única exceção.
- Toda peça usa pelo menos 2 das 4 assinaturas visuais: traço-sinal (linha reta que vira onda), dado sempre em mono, acento como pulso único, desalinhamento proposital.
- Nunca usar hairline dividindo seções — usar painéis alternados (`section.panel`) em vez disso.
- Lista completa de anti-padrões está no manual — checar antes de aprovar um design.

O site hoje (`/luiz`, `/ulrich`, `/contato`, `/`) ainda usa o sistema visual anterior (CSS em `assets/css/`) — a migração para esta identidade é a "versão 2" do portfólio e ainda não foi aplicada ao código real. Ao trabalhar em qualquer página nova ou reescrita, aplicar os tokens deste manual em vez de reutilizar os estilos antigos.

## Convenções de trabalho

- Não quebrar o que já funciona.
- Mobile-first.
- Mudanças pequenas, commits separados por objetivo.
- Não fazer push nem deploy sem o usuário pedir explicitamente (exceto em sessões automatizadas de PR, onde push faz parte do fluxo combinado).
