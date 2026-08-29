import type { Metadata } from 'next'
import { BodyClass } from '@/components/BodyClass'
import { ClientScripts } from '@/components/ClientScripts'

import '@/assets/css/base/reset.css'
import '@/assets/css/base/tokens.css'
import '@/assets/css/base/typography.css'
import '@/assets/css/base/utilities.css'
import '@/assets/css/components/display-panel.css'
import '@/assets/css/components/jog-wheel.css'
import '@/assets/css/components/waveform.css'
import '@/assets/css/components/dj-player.css'
import '@/assets/css/sections/deck.css'
import '@/assets/css/sections/hero-bg.css'
import '@/assets/css/sections/hot-cues.css'
import '@/assets/css/sections/manifesto.css'
import '@/assets/css/sections/tracklist.css'
import '@/assets/css/sections/mixer.css'
import '@/assets/css/sections/processo.css'
import '@/assets/css/sections/cta-final.css'
import '@/assets/css/pages/home-ulrich.css'

export const metadata: Metadata = {
  title: 'Ulrich.dev — Systems in Rhythm',
  description:
    'Ulrich.dev: sistemas digitais com clareza, precisão e ritmo — fullstack, UX/IHC, automação e performance.',
  metadataBase: new URL('https://luizulrich.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Ulrich.dev — Systems in Rhythm',
    description: 'Sistemas digitais com clareza, precisão e ritmo.',
    url: 'https://luizulrich.com/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ulrich.dev — Systems in Rhythm',
    description: 'Sistemas digitais com clareza, precisão e ritmo.',
  },
}

const HOME_SCRIPTS = ['/assets/js/home.js']

export default function HomePage() {
  return (
    <>
      <BodyClass className="ulrich-home" />
      <ClientScripts scripts={HOME_SCRIPTS} />

      <a className="skip-link" href="#conteudo">Pular para conteúdo</a>

      <header className="site-header" id="topo">
        <div className="container header-inner">
          <a className="brand" href="#hero" aria-label="Ir para início">Ulrich.dev</a>
          <button
            className="menu-toggle"
            type="button"
            id="menuToggle"
            aria-expanded="false"
            aria-controls="hotCuesNav"
            aria-label="Abrir navegação"
          >
            <span /><span /><span />
          </button>
          <nav id="hotCuesNav" className="hot-cues-nav" aria-label="Hot Cues">
            <a href="#manifesto" data-cue="sobre">Sobre</a>
            <a href="#tracklist" data-cue="cases">Cases</a>
            <a href="#mixer" data-cue="stack">Stack</a>
            <a href="#processo" data-cue="processo">Processo</a>
            <a href="#contato" data-cue="contato">Contato</a>
          </nav>
          <nav className="page-nav" aria-label="Identidades">
            <a href="/luiz" className="page-nav__link">Luiz</a>
            <a href="/ulrich" className="page-nav__link page-nav__link--ulrich">Ulrich</a>
          </nav>
        </div>
        <div className="set-progress" aria-hidden="true"><span id="setProgressBar" /></div>
      </header>

      <main id="conteudo">
        <section id="hero" className="section s-deck" aria-labelledby="hero-title">
          <div className="hero-bg">
            <img src="/assets/images/cdj.svg" alt="" />
          </div>
          <div className="container deck-grid">
            <div>
              <p className="kicker">ULRICH.DEV — SYSTEMS IN RHYTHM</p>
              <h1 id="hero-title">Construo sistemas digitais com clareza, precisão e ritmo.</h1>
              <p className="lead">
                Do diagnóstico ao deploy: fullstack, suporte, automação e UX aplicados para reduzir fricção e acelerar resultado.
              </p>
              <div className="cta-row">
                <a className="btn btn-primary" href="#tracklist">Ver cases</a>
                <a
                  className="btn btn-secondary"
                  href="https://wa.me/5546991210030"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                </a>
              </div>
              <div className="display-panel" aria-label="Painel técnico">
                <span>MODE: BUILD</span><span>STACK: FULL</span><span>STATUS: AVAILABLE</span>
              </div>
              <section className="dj-player" aria-label="Player de sets">
                <p className="dj-player-label">SET PLAYER</p>
                <p className="dj-current-track" id="djCurrentTrack">Carregando set...</p>
                <p className="dj-status" id="djStatus" data-state="idle">Pronto para tocar</p>
                <div className="dj-main-controls">
                  <button id="djPlay" type="button" aria-label="Tocar ou pausar set" aria-pressed="false">Play</button>
                  <button id="djNext" type="button" aria-label="Próximo set">Próximo</button>
                  <label className="dj-select-wrap" htmlFor="djSetSelect">
                    <span>Set</span>
                    <select id="djSetSelect" aria-label="Selecionar set" />
                  </label>
                </div>
                <div className="dj-timeline">
                  <span id="djCurrentTime" aria-live="off">00:00</span>
                  <input
                    id="djSeek"
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    defaultValue="0"
                    aria-label="Linha do tempo do set"
                  />
                  <span id="djDuration">--:--</span>
                </div>
                <div className="dj-bottom">
                  <label className="dj-volume" htmlFor="djVolume" aria-label="Controle de volume">
                    <span aria-hidden="true">🔊</span>
                    <input id="djVolume" type="range" min="0" max="1" step="0.01" defaultValue="0.7" />
                  </label>
                  <div className="dj-links">
                    <a
                      id="djExternalLink"
                      href="https://soundcloud.com/luizulrich"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ouvir no SoundCloud
                    </a>
                    <a href="mailto:luizfelipeulrich@gmail.com">Email</a>
                  </div>
                </div>
              </section>
            </div>
            <div className="cdj-stage" aria-hidden="true">
              <div className="jog-wheel" />
            </div>
          </div>
          <div className="waveform-shell" aria-hidden="true"><div className="waveform-line" /></div>
        </section>

        <section id="manifesto" className="section s-manifesto" aria-labelledby="manifesto-title">
          <div className="container">
            <span className="section-kicker">Manifesto</span>
            <h2 id="manifesto-title">
              Tecnologia e música seguem a mesma lógica: estrutura, controle e progressão.
            </h2>
            <p>
              Eu projeto experiências como quem monta um set: cada decisão técnica tem função,
              cada interface tem ritmo, cada entrega precisa performar no mundo real.
            </p>
          </div>
        </section>

        <section id="tracklist" className="section s-tracklist" aria-labelledby="tracklist-title">
          <div className="container">
            <span className="section-kicker">Cases</span>
            <h2 id="tracklist-title">Tracklist / Cases</h2>
            <ol className="tracklist">
              <li>
                <article>
                  <p className="track-id">Track 01</p>
                  <h3>Erick Imóveis</h3>
                  <div>
                    <span className="track-summary">Plataforma imobiliária • Web App</span>
                    <div className="track-detail">
                      <p>Problema: navegação e busca de imóveis.</p>
                      <p>Resultado: catálogo com experiência fluída.</p>
                      <p>
                        <a className="btn-project" href="https://ericklautharte.com/" target="_blank" rel="noopener noreferrer">
                          Abrir projeto
                        </a>
                      </p>
                    </div>
                  </div>
                </article>
              </li>
              <li>
                <article>
                  <p className="track-id">Track 02</p>
                  <h3>Barbearia Bertotti</h3>
                  <div>
                    <span className="track-summary">Site institucional • Frontend + operação</span>
                    <div className="track-detail">
                      <p>Problema: presença e captação.</p>
                      <p>Resultado: operação digital direta.</p>
                      <p>
                        <a className="btn-project" href="https://www.barbeariabertotti.com/" target="_blank" rel="noopener noreferrer">
                          Abrir projeto
                        </a>
                      </p>
                    </div>
                  </div>
                </article>
              </li>
              <li>
                <article>
                  <p className="track-id">Track 03</p>
                  <h3>João Estúdio Gastronômico</h3>
                  <div>
                    <span className="track-summary">Presença premium • Branding + Web</span>
                    <div className="track-detail">
                      <p>Problema: posicionamento digital.</p>
                      <p>Resultado: narrativa de alto valor.</p>
                      <p>
                        <a className="btn-project" href="https://joao-estudio-gastronomico.vercel.app/contato.html" target="_blank" rel="noopener noreferrer">
                          Abrir projeto
                        </a>
                      </p>
                    </div>
                  </div>
                </article>
              </li>
              <li>
                <article>
                  <p className="track-id">Track 04</p>
                  <h3>Vision Board <span className="private-badge">Projeto privado</span></h3>
                  <div>
                    <span className="track-summary">Ferramenta interna • protótipo visual</span>
                    <div className="track-detail">
                      <p>Problema: organização visual de metas.</p>
                      <p>Resultado: estrutura privada focada em produtividade.</p>
                    </div>
                  </div>
                </article>
              </li>
              <li>
                <article>
                  <p className="track-id">Track 05</p>
                  <h3>Spotify Wrapped <span className="private-badge">Projeto privado</span></h3>
                  <div>
                    <span className="track-summary">Experimento audiovisual • uso restrito</span>
                    <div className="track-detail">
                      <p>Problema: explorar narrativa audiovisual.</p>
                      <p>Resultado: laboratório privado de interface e timing.</p>
                    </div>
                  </div>
                </article>
              </li>
              <li>
                <article>
                  <p className="track-id">Track 06</p>
                  <h3>SGPD — Protótipo</h3>
                  <div>
                    <span className="track-summary">Projeto acadêmico • Prototipagem de sistemas</span>
                    <div className="track-detail">
                      <p>Problema: estruturação de solução.</p>
                      <p>Resultado: referência de processo.</p>
                      <p>
                        <a className="btn-project" href="/assets/projects/sgpd-prototipo/">Acessar referência</a>
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            </ol>
          </div>
        </section>

        <section id="mixer" className="section s-mixer" aria-labelledby="mixer-title">
          <div className="container">
            <span className="section-kicker">Stack</span>
            <h2 id="mixer-title">Mixer / Stack Técnico</h2>
            <ul className="mixer-grid">
              <li><strong>Frontend</strong><span>Interfaces performáticas e acessíveis.</span></li>
              <li><strong>Backend / Sistemas</strong><span>Integração, estabilidade e operação.</span></li>
              <li><strong>UX / IHC</strong><span>Fluxos claros orientados a tarefa.</span></li>
              <li><strong>Automação</strong><span>Menos retrabalho, mais escala.</span></li>
              <li><strong>Banco de Dados</strong><span>Modelagem e consistência de dados.</span></li>
              <li><strong>Deploy / Cloud</strong><span>Entrega contínua e monitoramento.</span></li>
            </ul>
          </div>
        </section>

        <section id="processo" className="section s-processo" aria-labelledby="processo-title">
          <div className="container">
            <span className="section-kicker">Processo</span>
            <h2 id="processo-title">Processo</h2>
            <ol className="process-steps">
              <li>Diagnosticar</li>
              <li>Estruturar</li>
              <li>Construir</li>
              <li>Testar</li>
              <li>Publicar</li>
              <li>Melhorar</li>
            </ol>
          </div>
        </section>

        <section id="contato" className="section s-cta" aria-labelledby="contato-title">
          <div className="container">
            <span className="section-kicker">Contato</span>
            <h2 id="contato-title">
              Se você precisa de sistema que funcione de verdade, vamos conversar.
            </h2>
            <div className="cta-links">
              <a href="https://github.com/LuizUlrich" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/luizulrich" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="cta-primary" href="https://wa.me/5546991210030" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="mailto:contato@luizulrich.com">contato@luizulrich.com</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer" aria-label="Rodapé">
        <div className="container home-footer__inner">
          <span className="home-footer__brand">Ulrich.dev</span>
          <nav className="home-footer__nav" aria-label="Navegação do rodapé">
            <a href="/luiz">Luiz</a>
            <a href="/ulrich">Ulrich</a>
            <a href="/contato">Contato</a>
          </nav>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Luiz Ulrich',
            url: 'https://luizulrich.com/',
            jobTitle: 'Desenvolvedor Fullstack',
            sameAs: [
              'https://soundcloud.com/luizulrich',
              'https://linkedin.com/in/luizulrich',
              'https://github.com/LuizUlrich',
            ],
          }),
        }}
      />
    </>
  )
}
