# Fase 1 - Saneamento Estrutural

## Escopo principal em uso

- Páginas principais: `index.html`, `luiz.html`, `ulrich.html`, `contato.html`
- Rota secundária mantida: `presskit.html` como redirecionamento para `ulrich.html#press-kit`
- Stack ativa: HTML estático + CSS em camadas + JavaScript sem build

## Nova organização de CSS

- `assets/css/tokens.css`
  - tokens de cor, raio, sombras, container e acentos por página
- `assets/css/base.css`
  - reset, tipografia, estrutura base, containers, sections e reveal
- `assets/css/layout.css`
  - header, navegação, hero, grids compartilhados e footer
- `assets/css/components.css`
  - cards, botões, badges, links, media blocks e CTAs reutilizáveis
- `assets/css/player.css`
  - player global isolado em arquivo próprio
- `assets/css/home.css`, `assets/css/luiz.css`, `assets/css/ulrich.css`, `assets/css/contato.css`
  - estilos de página

## Remoções seguras executadas

- `assets/css/global.css`
  - removido após fragmentação em camadas mais claras
- `assets/css/presskit.css`
  - removido por estar órfão e sem rota ativa dependente

## Código morto ou conflituoso saneado

- utilitários não usados removidos de `assets/css/layout.css`
- duplicações mortas removidas de `assets/css/home.css`
- seletores genéricos de `luiz.css` e `ulrich.css` passaram a ser mais escopados por página
- player saiu da folha global e foi isolado

## Governança de JS após a Fase 1

- `assets/js/app.js`
  - agora centraliza boot, helpers de página e storage
- `assets/js/menu.js`
  - controla apenas navegação e estado mobile
- `assets/js/reveal.js`
  - controla apenas reveal
- `assets/js/analytics.js`
  - fica como camada de tracking simples e preparada para futura troca de provider
- `assets/js/player.js`
  - inicialização condicional, menos contaminação global e responsabilidades mais separadas

## Mantidos por segurança

- `assets/projects/spotifywrapped/**`
  - mantido como microsite separado; não foi removido por possível valor pessoal/estratégico
- `assets/audio/Afro House @ Ulrich [23.08.2025].mp3`
  - arquivo sem uso atual, mantido por segurança
- `assets/images/ulrich-presskit2.jpg`
  - imagem sem uso atual, mantida por segurança
- ícones sociais não usados em `assets/icons/*.svg`
  - mantidos por segurança e possível reuso futuro

## Pendências já preparadas para a Fase 2

- migrar de arquitetura desktop-first para mobile-first de forma mais profunda
- revisar payload de imagens e áudio
- reestruturar narrativa e hierarquia visual
- transformar Luiz e Ulrich em jornadas mais distintas
- evoluir tracking para analytics real
