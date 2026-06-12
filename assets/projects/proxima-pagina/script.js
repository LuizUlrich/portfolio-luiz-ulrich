/* ============================================
   NOSSA PRÓXIMA PÁGINA — Lógica do Livro
   ============================================ */

(function () {
  'use strict';

  // ---- CONTEÚDO: cada item é uma "página" do livro ----
  const PAGES = [
    // 0 — CAPA
    {
      type: 'cover',
      bg: './assets/foto-capa.jpeg',
      eyebrow: 'Para Jéssica · 12 de Junho',
      title: ['Nossa', 'Próxima', 'Página'],
      subtitle: 'Tudo que já vivemos foi só o rascunho. Aqui começa o livro de verdade.'
    },

    // 1 — Cap I academia
    {
      type: 'chapter', icon: '🌅', num: 'Capítulo I',
      title: 'Todo dia às <em>6 da manhã</em>',
      body: [
        'Tem gente que mal abre o olho às 6 da manhã. A gente tá na academia (mesmo às vezes não querendo).',
        'Não é pra todo mundo, e tudo bem. Mas pra nós é. Tem algo bonito em acordar junto antes do mundo acordar, até quando o travesseiro é dez vezes mais confortável do que puxar barras de ferro.',
        'Você reclama. Eu reclamo. Mas vamos. <strong>E isso diz tudo sobre quem você é.</strong>'
      ],
      media: { type: 'video', src: './assets/academia.mp4', caption: 'Esse ritual nosso. Todo santo dia.' }
    },

    // 2 — Cap II moto
    {
      type: 'chapter', icon: '🌧️', num: 'Capítulo II',
      title: 'De moto. <em>Na chuva.</em>',
      body: [
        'A maioria das pessoas espera a chuva passar. A gente saiu no meio dela. Apenas para criar memórias.',
        'Não sei se foi coragem ou falta de juízo. Sei que foi inesquecível. E sinceramente? Eu prefiro fazer coisas inesquecíveis com você do que coisas sensatas sem você.',
        '<strong>Ficamos molhadinhos. (Papo de padeiro)</strong>'
      ],
      media: { type: 'video', src: './assets/moto.mp4', caption: 'A chuva, a moto e nós dois.' }
    },

    // 3 — Cap III borboleta (+ vídeo nos-encontramos)
    {
      type: 'chapter', icon: '🦋', num: 'Capítulo III',
      title: 'Nada disso foi <em>por acaso</em>',
      body: [
        'Pensa em tudo que precisou dar errado pra a gente chegar aqui.',
        'Cada decisão torta, cada plano que não deu certo, cada momento em que a vida foi diferente do que a gente esperava. Tudo aquilo foi preparando o terreno, sem que a gente soubesse, pra esse encontro acontecer.',
        'Eu vim pra Blumenau com medo. Vim com meu irmão, a Sheila em cima da camionete, e uma aposta no que podia ser. Deixei o medo de lado, fui atrás de uma oportunidade, a Leads me aceitou. E no fim parei aqui.',
        '<strong>O universo levou o tempo que precisava. Mas acertou.</strong>'
      ],
      media: { type: 'video', src: './assets/nos-encontramos.mp4', caption: 'O encontro que o tempo armou.' }
    },

    // 4 — Pausa coração (contato) — junto ao Capítulo IV
    {
      type: 'heart',
      label: 'Um detalhe',
      img: './assets/foto-contato.jpeg',
      caption: 'Nenhum gesto grande.<br>Só um coraçãozinho no meu nome.<br>Um gesto que achei fofo (e quase obriguei ksksksksk).'
    },

    // 5 — Cap IV lar
    {
      type: 'chapter', icon: '🏠', num: 'Capítulo IV',
      title: 'O lar que você <em>me deu sem perceber</em>',
      body: [
        'Você me convidou pro seu apartamento. Eu vim com carisma, cara de pau e a Sheila.',
        'E aqui aconteceu uma coisa que eu não esperava: você fez esse lugar virar lar. Não pela decoração, não pelas coisas, mas pelo jeito que você me recebeu. Pelo espaço que abriu pra mim sem hesitar.',
        '<strong>Pela segunda vez, eu me senti em casa.</strong>',
        'Esse apartamento não é a casa dos nossos sonhos. Mas é onde tudo já começou a fazer sentido.'
      ]
    },

    // 6 — Cap V pequenas coisas
    {
      type: 'chapter', icon: '🫧', num: 'Capítulo V',
      title: 'As nossas <em>pequenas coisas</em>',
      body: [
        'Você que começou a ir no mercado comigo. E gostou. O que eu ainda acho engraçado e fofo ao mesmo tempo.',
        'Eu arrumando os pesos pra você na academia. Nunca deixando você carregar sacola, mala, nada, porque você é uma princesa e eu levo isso a sério.',
        'O beijinho que vem puxado, aquela respirada de ar até a boca do outro encontrar. Ninguém mais faz isso. É nosso.',
        'Meu lanchinho que você faz. O carinho quando sente que preciso. Os jogos, as séries, os filmes que a gente vê juntos.',
        '<strong>São as coisas pequenas. São as que mais ficam.</strong>'
      ],
      media: { type: 'video', src: './assets/fazendo-lanchinho.mp4', caption: 'Meu lanchinho. Feito por você.' }
    },

    // 7 — Cap VI mais linda
    {
      type: 'chapter', icon: '🌸', num: 'Capítulo VI',
      title: 'A pessoa mais linda <em>do universo</em>',
      body: [
        'As maravilhas do mundo são bonitas. Mas nenhuma chega perto de você.',
        'Eu te observo. O jeito que você ri, o que faz quando está animada, como você é quando está sendo você mesma sem perceber que estou olhando.',
        'Você não precisa me pedir nada. Mas se pedir o mundo, eu vou atrás. E mesmo quando não pede, eu apareço com rosas e girassóis, ou qualquer flor que encontro no caminho, porque você merece sem precisar de motivo.',
        '<strong>Faço tudo por você. Não por obrigação. Por escolha.</strong>'
      ],
      media: { type: 'image', src: './assets/foto-porao.jpeg', caption: 'A mais linda. Sem nem tentar.' }
    },

    // 8 — Cap VII conversas
    {
      type: 'chapter', icon: '🤝', num: 'Capítulo VII',
      title: 'A gente não briga. <em>A gente conversa de verdade.</em>',
      body: [
        'Todo casal tem conflitos. O nosso diferencial não é não tê-los, é como a gente lida com eles.',
        'A gente se entende mesmo quando é difícil. Se escuta quando dói. Tenta compreender o outro lado mesmo quando não é fácil concordar.',
        'Ninguém nasce sabendo se relacionar. Afinal, estamos vivendo pela primeira vez, do nosso jeito, construindo-se aos poucos.',
        '<strong>E o que mais me orgulha é que a gente escolhe o diálogo toda vez.</strong>'
      ]
    },

    // 9 — Cap VIII conquistas
    {
      type: 'chapter', icon: '🔑', num: 'Capítulo VIII',
      title: 'Conquistando <em>as nossas coisas</em>',
      body: [
        'Um carro. Não qualquer carro, o nosso carro. O que vai levar a gente pro litoral no fim de semana, descer pra ver o Mateo em Itajaí quando bater saudade, ir pra festa quando der vontade de sumir do mundo por uma noite.',
        'São coisas pequenas no papel. Na prática, são <strong>a liberdade de ir onde quiser, quando quiser, com quem quiser.</strong>',
        'E quem eu quero do lado sempre é você.'
      ]
    },

    // 10 — Cap IX viagens
    {
      type: 'chapter', icon: '✈️', num: 'Capítulo IX',
      title: 'Você só foi pra Argentina. <em>Ainda.</em>',
      body: [
        'Tem muita coisa te esperando. Uruguai pra começar, lugar que eu quero te apresentar. Chile pra ver neve juntos pela primeira vez. E Minas, pra tomar aquele café com pão de queijo e dodilê numa tarde sem pressa.',
        'Depois vem o resto: cruzeiro, safári na África, Egito. A lista é longa e a gente vai riscar tudo.',
        'Cada carimbo no seu passaporte vai ser meu, falando no sentido de que <strong>eu vou estar do seu lado em cada um deles.</strong>'
      ]
    },

    // 11 — Cap X Romeu
    {
      type: 'chapter', icon: '🐾', num: 'Capítulo X',
      title: 'O Romeu ganhou <em>um irmão</em>',
      body: [
        'Alguém novo e mofadinho vai aparecer um dia. Você vai fingir que é surpresa, mas a gente sabe que você já tá esperando.',
        'O Romeu vai odiar na primeira semana e vai ser o melhor amigo na segunda. <strong>É o jeito da família funcionar.</strong>',
        'E sim. Eu já cedi. Pode ser dois salsichas (e talvez um gato).'
      ]
    },

    // 12 — Cap XI não trabalhar
    {
      type: 'chapter', icon: '☀️', num: 'Capítulo XI',
      title: 'O dia em que você <em>não vai precisar</em> trabalhar mais',
      body: [
        'Você acorda. Sem alarme. Com tempo. Com calma. Com o café que eu já fiz.',
        'Não porque você não é capaz, até por quê você é mais capaz do que a maioria das pessoas que conheço. Mas porque você vai ter escolhido uma vida em que <strong>o tempo é seu</strong>, e eu vou ter feito questão disso.',
        'Ser minha esposa troféu não é título. É consequência do que vou construir por você.'
      ]
    },

    // 13 — Cap XII casa na praia
    {
      type: 'chapter', icon: '🌊', num: 'Capítulo XII',
      title: 'A casa que dá <em>direto pro mar</em>',
      body: [
        'Não um apartamento com vista pro mar. Uma <strong>casa</strong>. Porta que abre, areia no quintal, ondas que você escuta mesmo quando tá dormindo.',
        'Varanda. Dois cafés. Os salsichas (e talvez um gato) na areia. Nós dois sem pressa nenhuma.',
        'Eu já sei como vai ser. E você também.'
      ]
    },

    // 14 — Cap XIII ir até o fim
    {
      type: 'chapter', icon: '🔥', num: 'Capítulo XIII',
      title: 'Você me faz <em>ir até o fim</em>',
      body: [
        'Eu corro atrás das minhas coisas. Sempre corri. Mas tinha uma diferença entre começar e ir até o fim.',
        'Você é essa diferença.',
        'Quando você me fala que sou inteligente, curioso, que admira o jeito que penso, você acha que está só elogiando. Mas o que está fazendo é me dar combustível pra ser mais. Pra não parar no meio. Pra buscar o que parecia impossível.',
        '<strong>Você me motiva mais do que imagina. E eu quero dar o mundo pra você, porque você merece cada pedaço dele.</strong>'
      ]
    },

    // 15 — Cap XIV medo
    {
      type: 'chapter', icon: '💫', num: 'Capítulo XIV',
      title: 'O medo que <em>ninguém sabe</em> que tenho',
      body: [
        'Não tenho medo de fracassar. Não tenho medo de errar.',
        'Tenho medo de te perder.',
        'Porque sem você, metade do motivo de crescer some junto. Você não é só alguém que eu amo, você é a razão pela qual eu me importo em ser alguém melhor todo dia.',
        'Então enquanto eu tiver você, <strong>eu nunca vou parar de evoluir.</strong> Não porque preciso. Porque você merece o melhor que eu consigo ser.'
      ]
    },

    // 16 — MENSAGEM FINAL
    {
      type: 'final',
      bg: './assets/onde-comecou.jpeg',
      label: 'Para você',
      message: 'Antes eu tinha planos. Superficiais, sem muito rumo, coisas que eu queria, mas sem saber bem por quê.<br><br>Hoje tenho planos concretos. E a melhor motivação do mundo: te fazer feliz.<br><br>Dentre todos os lugares que podemos ir, de uma coisa eu tenho certeza.<br><br>Eu quero estar com você.',
      signature: 'Você é meu mundo ❤️<br>Te amo, Jessica Soares Freire'
    }
  ];

  // Ornamento decorativo de cabeçalho (fundo da folha branca)
  const ORNAMENT =
    "<svg class='ornament-svg' viewBox='0 0 140 18' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>" +
    "<path d='M20 9 H58' /><path d='M82 9 H120' />" +
    "<path d='M70 2 L75 9 L70 16 L65 9 Z' fill='currentColor' stroke='none'/>" +
    "<circle cx='61' cy='9' r='1.3' fill='currentColor' stroke='none'/>" +
    "<circle cx='79' cy='9' r='1.3' fill='currentColor' stroke='none'/>" +
    "<path d='M20 9 q-6 -5 -12 0' /><path d='M120 9 q6 -5 12 0' />" +
    "</svg>";

  // ---- "CROMO" da folha: ornamento no topo + número no rodapé ----
  function pageChrome(pageNo) {
    const num = pageNo ? `<span class="page-no">${pageNo}</span>` : '';
    return `<div class="page-ornament">${ORNAMENT}</div>${num}`;
  }

  // ---- RENDERIZAÇÃO DE PÁGINA (folha de papel / meia página) ----
  // opts.noMedia → capítulo sem mídia (vídeo vai pra folha ao lado, no desktop)
  function renderPage(page, opts) {
    opts = opts || {};
    const no = opts.pageNo;
    // durante a transição (freeze) o vídeo entra parado, pra só tocar 1x ao assentar
    const vatt = opts.freeze
      ? 'muted playsinline preload="auto"'
      : 'autoplay muted loop playsinline preload="auto"';
    if (!page) return '<div class="page-content"></div>';

    if (page.type === 'blank') {
      return '<div class="page-content active blank-paper"></div>';
    }

    if (page.type === 'chapter') {
      let media = '';
      if (page.media && !opts.noMedia) {
        if (page.media.type === 'video') {
          media = `<div class="page-media video"><video src="${page.media.src}" ${vatt}></video></div>
                   <p class="media-caption">${page.media.caption}</p>`;
        } else {
          media = `<div class="page-media"><img src="${page.media.src}" alt=""></div>
                   <p class="media-caption">${page.media.caption}</p>`;
        }
      }
      return `
        ${pageChrome(no)}
        <div class="page-content active">
          <span class="chapter-icon">${page.icon}</span>
          <div class="chapter-meta">
            <span class="chapter-num">${page.num}</span>
            <div class="chapter-line"></div>
          </div>
          <h2 class="chapter-title">${page.title}</h2>
          <div class="chapter-body">${page.body.map(p => `<p>${p}</p>`).join('')}</div>
          ${media}
        </div>`;
    }

    // folha dedicada ao vídeo (desktop): só o vídeo em retrato + legenda
    if (page.type === 'mediaplate') {
      const stage = page.mediaType === 'video'
        ? `<div class="media-stage"><video src="${page.src}" ${vatt}></video></div>`
        : `<div class="media-stage"><img src="${page.src}" alt=""></div>`;
      return `
        ${pageChrome(no)}
        <div class="page-content active mediaplate">
          <span class="plate-eyebrow">${page.num}</span>
          ${stage}
          <p class="media-caption">${page.caption}</p>
        </div>`;
    }

    if (page.type === 'heart') {
      return `
        ${pageChrome(no)}
        <div class="page-content active heart-page">
          <p class="heart-label">${page.label}</p>
          <div class="heart-phone"><img src="${page.img}" alt=""></div>
          <p class="heart-caption">${page.caption}</p>
        </div>`;
    }

    if (page.type === 'photo') {
      return `
        ${pageChrome(no)}
        <div class="page-content active photo-page">
          <div class="photo-frame"><img src="${page.img}" alt=""></div>
          <p class="media-caption">${page.caption}</p>
        </div>`;
    }

    return '<div class="page-content"></div>';
  }

  // ---- RENDERIZAÇÃO FULL-BLEED (capa / final ocupam a tela toda) ----
  function renderFull(page) {
    if (page.type === 'cover') {
      return `
        <div class="cover-page">
          <div class="cover-bg" style="background-image:url('${page.bg}')"></div>
          <div class="full-content">
            <p class="cover-eyebrow">${page.eyebrow}</p>
            <p class="cover-ornament">✦ &nbsp; ✦ &nbsp; ✦</p>
            <h1 class="cover-title">${page.title[0]}<em>${page.title[1]}</em>${page.title[2]}</h1>
            <div class="cover-rule"></div>
            <p class="cover-subtitle">${page.subtitle}</p>
          </div>
        </div>`;
    }
    if (page.type === 'final') {
      return `
        <div class="final-page">
          ${page.bg ? `<div class="final-bg" style="background-image:url('${page.bg}')"></div>` : ''}
          <div class="full-content">
            <p class="final-label">${page.label}</p>
            <p class="final-message">${page.message}</p>
            <div class="final-rule"></div>
            <p class="final-signature">${page.signature}</p>
            <div class="final-ornament">✦ &nbsp; ✦ &nbsp; ✦</div>
          </div>
        </div>`;
    }
    if (page.type === 'photo') {
      return `
        <div class="photo-full">
          <div class="photo-full-frame"><img src="${page.img}" alt=""></div>
          <p class="photo-full-caption">${page.caption}</p>
        </div>`;
    }
    return '';
  }

  // páginas que ocupam a "tela" inteira (capa, foto de destaque, final)
  function isFullType(p) {
    return p.type === 'cover' || p.type === 'final' || p.type === 'photo';
  }

  // ---- MONTAGEM DAS UNIDADES (desktop) ----
  // Cada unidade é uma "tela": full-bleed (capa/foto/final) OU spread de 2 folhas.
  function buildUnits() {
    const units = [];
    let pending = null;
    const flushPending = () => {
      if (pending) { units.push({ type: 'spread', left: pending, right: { type: 'blank' } }); pending = null; }
    };
    const pair = (p) => {
      if (!pending) { pending = p; }
      else { units.push({ type: 'spread', left: pending, right: p }); pending = null; }
    };

    PAGES.forEach((p) => {
      if (isFullType(p)) {
        flushPending();
        units.push({ type: 'full', page: p });
      } else if (p.type === 'chapter' && p.media) {
        // capítulo com mídia (vídeo OU foto) ocupa um spread inteiro: texto | mídia
        flushPending();
        const plate = { type: 'mediaplate', num: p.num, mediaType: p.media.type, src: p.media.src, caption: p.media.caption };
        units.push({ type: 'spread', left: p, right: plate, mediaChapter: true });
      } else {
        pair(p);
      }
    });
    flushPending();
    return units;
  }

  const UNITS = buildUnits();

  // ---- NUMERAÇÃO POR FOLHA (cada modo conta suas próprias páginas; capa/final sem número) ----
  const desktopNo = new Map();
  (function () {
    let n = 0;
    UNITS.forEach(u => {
      if (u.type !== 'spread') return;
      [u.left, u.right].forEach(pg => { if (pg && pg.type !== 'blank') desktopNo.set(pg, ++n); });
    });
  })();
  const mobileNo = new Map();
  (function () {
    let n = 0;
    PAGES.forEach(pg => { if (!isFullType(pg)) mobileNo.set(pg, ++n); });
  })();
  function pageNoFor(pg) { return (isMobile ? mobileNo : desktopNo).get(pg) || 0; }

  // ---- ESTADO ----
  let isMobile = window.matchMedia('(max-width: 768px)').matches;
  let index = 0; // desktop: índice da unidade · mobile: índice da página (PAGES)
  let isAnimating = false;

  const leftEl = document.querySelector('.page-side.left');
  const rightEl = document.querySelector('.page-side.right');
  const fullEl = document.querySelector('.page-full');
  const bookEl = document.getElementById('book');
  const indicator = document.getElementById('page-indicator');
  const hint = document.getElementById('hint');

  function totalUnits() {
    return isMobile ? PAGES.length : UNITS.length;
  }

  // markup de uma unidade (usado tanto no desenho quanto na animação)
  function unitInner(unit) {
    if (unit.type === 'full') {
      return { full: true, html: renderFull(unit.page) };
    }
    return {
      full: false,
      html:
        `<div class="page-side left">${renderPage(unit.left, { noMedia: unit.mediaChapter, pageNo: pageNoFor(unit.left), freeze: true })}</div>` +
        `<div class="page-side right">${renderPage(unit.right, { pageNo: pageNoFor(unit.right), freeze: true })}</div>`
    };
  }

  // ---- DESENHA A TELA ATUAL ----
  function draw() {
    if (isMobile) {
      const page = PAGES[index];
      const isFull = isFullType(page);
      bookEl.classList.toggle('full', isFull);
      if (isFull) {
        fullEl.innerHTML = renderFull(page);
        leftEl.innerHTML = ''; rightEl.innerHTML = '';
      } else {
        rightEl.innerHTML = renderPage(page, { pageNo: pageNoFor(page) });
        rightEl.classList.add('left-active');
        leftEl.innerHTML = ''; fullEl.innerHTML = '';
      }
    } else {
      const unit = UNITS[index];
      bookEl.classList.toggle('full', unit.type === 'full');
      if (unit.type === 'full') {
        fullEl.innerHTML = renderFull(unit.page);
        leftEl.innerHTML = ''; rightEl.innerHTML = '';
      } else {
        leftEl.innerHTML = renderPage(unit.left, { noMedia: unit.mediaChapter, pageNo: pageNoFor(unit.left) });
        rightEl.innerHTML = renderPage(unit.right, { pageNo: pageNoFor(unit.right) });
        fullEl.innerHTML = '';
      }
    }
    playVideos();
    updateIndicator();
    updateNav();
  }

  // garante o autoplay (mudo, em loop) ao virar a página — estilo GIF
  function playVideos() {
    bookEl.querySelectorAll('video').forEach(v => {
      v.muted = true;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    });
  }

  // ---- INDICADOR DE PÁGINAS ----
  function updateIndicator() {
    const total = totalUnits();
    indicator.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === index ? ' active' : '');
      indicator.appendChild(dot);
    }
  }

  // ---- NAV ZONES ----
  const prevZone = document.querySelector('.nav-zone.prev');
  const nextZone = document.querySelector('.nav-zone.next');

  function updateNav() {
    prevZone.classList.toggle('disabled', index <= 0);
    nextZone.classList.toggle('disabled', index >= totalUnits() - 1);
  }

  // ---- VIRADA DE PÁGINA ----
  function go(dir) {
    if (isAnimating) return;
    const next = index + dir;
    if (next < 0 || next >= totalUnits()) return;
    isAnimating = true;
    hideHint();
    slideAnimate(dir, next);
  }

  // ---- ANIMAÇÃO DESLIZANTE ----
  function slideAnimate(dir, next) {
    const goingForward = dir > 0;

    let inner;
    if (isMobile) {
      const page = PAGES[next];
      if (isFullType(page)) {
        inner = { full: true, html: renderFull(page) };
      } else {
        inner = { full: false, html: `<div class="page-side right left-active">${renderPage(page, { pageNo: pageNoFor(page), freeze: true })}</div>` };
      }
    } else {
      inner = unitInner(UNITS[next]);
    }

    const overlay = document.createElement('div');
    overlay.className = 'slide-overlay ' + (goingForward ? 'forward' : 'backward');

    const frame = document.createElement('div');
    frame.className = 'slide-inner' + (inner.full ? ' full' : '');
    frame.innerHTML = inner.html;
    overlay.appendChild(frame);
    document.getElementById('book-wrap').appendChild(overlay);

    overlay.getBoundingClientRect(); // força reflow
    overlay.classList.add('animate');

    setTimeout(() => {
      index = next;
      draw();
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      isAnimating = false;
    }, 620);
  }

  // ---- HINT ----
  let hintTimer;
  function showHintDelayed() {
    hintTimer = setTimeout(() => {
      if (index === 0) {
        hint.textContent = isMobile ? 'Toque à direita para virar' : 'Clique nas bordas ou use as setas';
        hint.classList.add('show');
      }
    }, 2500);
  }
  function hideHint() {
    hint.classList.remove('show');
    clearTimeout(hintTimer);
  }

  // ---- EVENTOS ----
  nextZone.addEventListener('click', () => go(1));
  prevZone.addEventListener('click', () => go(-1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(-1); }
  });

  // swipe mobile
  let touchX = null;
  document.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) { go(dx < 0 ? 1 : -1); }
    touchX = null;
  }, { passive: true });

  // resize → recalcula mobile/desktop e converte o índice
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const wasMobile = isMobile;
      isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (wasMobile === isMobile) return;
      if (isMobile) {
        // desktop → mobile: vai pra primeira página da unidade atual
        const unit = UNITS[index];
        const target = unit.type === 'full' ? unit.page : unit.left;
        index = Math.max(0, PAGES.indexOf(target));
      } else {
        // mobile → desktop: acha a unidade que contém a página atual
        const page = PAGES[index];
        index = findUnitOf(page);
      }
      index = Math.min(index, totalUnits() - 1);
      draw();
    }, 200);
  });

  function findUnitOf(page) {
    for (let i = 0; i < UNITS.length; i++) {
      const u = UNITS[i];
      if (u.type === 'full' && u.page === page) return i;
      if (u.type === 'spread' && (u.left === page || u.right === page)) return i;
    }
    return 0;
  }

  // ---- INICIALIZAÇÃO ----
  let started = false;
  function init() {
    if (started) return;
    started = true;
    draw();
    showHintDelayed();
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hidden'), 600);
  }

  // espera fontes carregarem (evita flash); fallback garante boot
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(init);
    setTimeout(init, 1500);
  } else {
    init();
  }
})();
