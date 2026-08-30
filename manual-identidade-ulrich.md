# Manual de Identidade — Ulrich

*Sistema de referência para tudo que nasce sob o nome Ulrich — site, projetos, sets. Sem frase-manifesto: a consistência vem da estrutura visual, não de slogan.*

---

## Conceito

Dois modos, uma gramática. A estrutura — tipografia, o traço-sinal, dado sempre em mono, desalinhamento proposital — é idêntica nos dois eixos: é isso que assina como Ulrich em qualquer lugar, dev ou DJ. O que muda por contexto é só o acento de cor: **vinho no eixo dev** (execução, precisão, código) e **roxo meia-noite no eixo DJ** (imersão, ritmo, noite). Os dois nunca aparecem juntos como acento na mesma peça — o contexto decide qual está vivo.

---

## Paleta

Base e texto são compartilhados entre os dois modos — só o acento muda. Regra de ouro continua: **um acento vivo por peça**, agora com dois candidatos possíveis em vez de um.

### Base (comum aos dois modos)

| Nome | Hex | Papel |
|---|---|---|
| Fundo | `#0A0A0A` | Base — nunca preto puro `#000` |
| Superfície 1 | `#141414` | Cards, blocos elevados |
| Superfície 2 | `#1C1C1C` | Hover, elementos ativos |
| Texto | `#EDEDEA` | Corpo |
| Texto Forte | `#FFFFFF` | Títulos de alto destaque, uso raro |
| Texto Discreto | `#8A8A85` | Legenda, metadado |

### Acento — Dev (padrão do site)

| Nome | Hex | Papel |
|---|---|---|
| Vinho | `#8A1F3D` | Ação primária, destaque ativo em contexto dev |
| Vinho Profundo | `#4C0F22` | Hover/pressed, estado destrutivo |

### Acento — DJ (Ulrich)

| Nome | Hex | Papel |
|---|---|---|
| Roxo Meia-Noite | `#4A2C6D` | Ação primária, destaque ativo em contexto DJ |
| Roxo Profundo | `#2A1740` | Hover/pressed |

---

## Tema

Preto é o padrão — é a base de tudo. Mas existe modo claro pra quando o contexto pedir (documento pra cliente, impressão, ambiente muito iluminado). Tema é eixo independente do acento: os dois alternam sem conflito, então qualquer combinação (dev-escuro, dev-claro, dj-escuro, dj-claro) funciona.

Mesma disciplina dos dois lados: **tema escuro nunca usa preto puro no fundo, tema claro nunca usa branco puro no fundo.** O puro fica reservado pra texto de alto destaque, não pra superfície.

| Nome | Escuro | Claro | Papel |
|---|---|---|---|
| Fundo | `#0A0A0A` | `#F7F6F2` | Base da página |
| Superfície 1 | `#141414` | `#FFFFFF` | Cards, blocos elevados |
| Superfície 2 | `#1C1C1C` | `#ECEAE4` | Hover, elementos ativos |
| Texto | `#EDEDEA` | `#1A1A1A` | Corpo |
| Texto Forte | `#FFFFFF` | `#000000` | Destaque raro |
| Texto Discreto | `#8A8A85` | `#6B6B66` | Legenda, metadado |

O acento (vinho ou roxo) não muda com o tema — só a base inverte. Contraste dos dois acentos contra fundo claro já é alto o suficiente sem ajuste (são cores escuras e saturadas).

---

## Tipografia

| Papel | Fonte | Uso |
|---|---|---|
| Display / títulos | **Cabinet Grotesk** | Nome, headers, título de projeto — geométrica, com caráter |
| Corpo | **Inter** | Texto corrido, parágrafos, UI |
| Dados / números | **JetBrains Mono** | Ano, BPM, tom, métrica, contador — sempre tabular |

Regra prática: **se é dado, é mono. Se é título, é Cabinet. O resto é Inter.**

---

## Escala

Base: **8px**. Todo espaçamento, tamanho de componente e raio de borda deriva daqui — é o número que aparece em tudo que você faz (BPM, contagem, o resto). Meio-passo (`4px`) é a única exceção sancionada, reservada pra texto utilitário pequeno e ajuste fino onde o passo cheio atrapalharia leitura.

### Espaçamento
`4 (meio-passo) · 8 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96`

### Componentes

| Elemento | Valor | Múltiplo |
|---|---|---|
| Botão padrão (altura) | 48px | 8×6 |
| Botão CTA / grande | 56px | 8×7 |
| Toggle / caixa de ícone | 40px | 8×5 |
| Ícone interno | 16px | 8×2 |
| Raio — cards | 8px | 8×1 |
| Raio — elementos pequenos | 4px | meio-passo |
| Raio — blocos grandes | 16px | 8×2 |

### Tipografia

| Papel | Tamanho | Múltiplo |
|---|---|---|
| Micro (legenda, hex, metadado) | 12px | meio-passo |
| Label/eyebrow mono | 16px | 8×2 |
| Corpo | 16px | 8×2 |
| Dado mono grande | 24 / 32px | 8×3 / 8×4 |
| Subtítulo | 24px | 8×3 |
| Título de seção | 32 / 40px | 8×4 / 8×5 |
| Display (nome/hero) | 48 – 96px, fluido | 8×6 – 8×12 |

Espessura de traço e de borda ficam fora da régua — são peso visual, não layout. Forçar isso em múltiplo de 8 dilui a regra sem ganhar nada.

---

## Assinaturas visuais

Toda peça usa pelo menos 2 das 4.

1. **O traço-sinal** — linha única que começa reta/angular (circuito) e termina em curva de onda. Divisor de seção, sublinhado, elemento de capa. Único elemento com licença pra quebrar a grade.
2. **Dado sempre em mono** — todo número em JetBrains Mono tabular. Fora disso é erro de identidade.
3. **Acento como pulso único, cor por contexto** — um só acento vivo por peça: vinho em dev, roxo em DJ. Nunca os dois juntos na mesma tela — é o que mantém "raro" mesmo com duas cores no sistema.
4. **Desalinhamento proposital** — pelo menos um elemento fora da grade em toda composição. Antídoto ao "cara de template".

---

## Anti-padrões (nunca fazer)

| Proibido | Por quê |
|---|---|
| Ícone de fone/laptop genérico de stock | Clichê de capa de LinkedIn, zero assinatura |
| Gradiente fora dos pares Vinho→Preto ou Roxo→Preto | Não é a paleta, dilui a identidade |
| Composição 100% simétrica e centralizada | Mata a assinatura 4, vira frio e corporativo |
| Emoji em UI, ícone preenchido colorido, sombra neumorphism | Cara de template genérico |
| Vinho e roxo como acento na mesma peça/tela | Cada acento pertence a um contexto — misturar é o mesmo erro de ter dois acentos vivos, dobrado |
| Fonte serifada/clássica | Foge do eixo técnico-noturno |
| Número em Inter ou Cabinet | Perde a assinatura 2 |
| Fundo branco puro (`#FFFFFF`) na página em tema claro | Mesma disciplina do tema escuro — puro é pra texto de destaque, não pra fundo |
| Espaçamento, tamanho de componente ou raio fora da escala de 8 (exceto o meio-passo de 4) | Quebra a régua numérica — que é a assinatura mais pessoal do sistema inteiro |
| Linha fina dividindo cada seção (hairline rule) | É um dos clichês mais reconhecíveis de layout gerado por IA agora — a régua de 8 e os painéis alternados substituem essa função |

---

## Aplicação

- **luizulrich.com** — modo padrão do site é **dev/vinho**, já que hoje é portfólio voltado a cliente/freelance. Quando existir seção dedicada ao Ulrich DJ, ela muda pra modo roxo — mesma estrutura, acento diferente. Tecnicamente: um atributo `data-domain="dj"` sobrescreve só os tokens de acento, mesmo mecanismo de tema claro/escuro.
- **Capas/thumbnails de projeto (dev)** — traço-sinal + stack/ano em mono, acento vinho.
- **Posts e sets de DJ** — BPM e tom em mono, traço-sinal como transição, acento roxo.
- **Numeração de seção** — segue a própria escala: `08 · 16 · 24 · 32 · 40`, nunca `01 · 02 · 03`. É a régua de 8 aparecendo até na estrutura do próprio manual.

---

## Tokens de referência (ponto de partida)

```css
:root {
  /* base — compartilhada nos dois modos */
  --ulrich-bg: #0A0A0A;
  --ulrich-surface-1: #141414;
  --ulrich-surface-2: #1C1C1C;
  --ulrich-text: #EDEDEA;
  --ulrich-text-strong: #FFFFFF;
  --ulrich-text-muted: #8A8A85;

  /* tipografia */
  --font-display: 'Cabinet Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* escala — grid de 8pt, meio-passo = 4px */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 40px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 80px;
  --space-10: 96px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  /* acento padrão = dev (vinho) */
  --ulrich-accent: #8A1F3D;
  --ulrich-accent-deep: #4C0F22;
}

/* contexto DJ sobrescreve só o acento */
[data-domain="dj"] {
  --ulrich-accent: #4A2C6D;
  --ulrich-accent-deep: #2A1740;
}

/* tema claro sobrescreve só a base — independente do domínio */
[data-theme="light"] {
  --ulrich-bg: #F7F6F2;
  --ulrich-surface-1: #FFFFFF;
  --ulrich-surface-2: #ECEAE4;
  --ulrich-text: #1A1A1A;
  --ulrich-text-strong: #000000;
  --ulrich-text-muted: #6B6B66;
}
```

Isto é referência de conteúdo, não implementação — ainda não foi escrito em cima do repositório real do site.
