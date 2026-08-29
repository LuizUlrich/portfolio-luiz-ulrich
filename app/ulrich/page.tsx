import type { Metadata } from 'next'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { BodyClass } from '@/components/BodyClass'
import { ClientScripts } from '@/components/ClientScripts'

import '@/assets/css/global.css'
import '@/assets/css/layout.css'
import '@/assets/css/components.css'
import '@/assets/css/ulrich.css'

export const metadata: Metadata = {
  title: 'Ulrich | Sets, SoundCloud e Press Kit',
  description:
    'Ulrich é um projeto artístico com sets, SoundCloud, identidade sonora e apresentação pensada para pista, curadoria e booking.',
  metadataBase: new URL('https://luizulrich.com'),
  alternates: { canonical: '/ulrich' },
  openGraph: {
    title: 'Ulrich | Sets, SoundCloud e Press Kit',
    description: 'Sets, SoundCloud, identidade sonora e apresentação do projeto Ulrich em uma única página.',
    url: 'https://luizulrich.com/ulrich',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ulrich | Sets, SoundCloud e Press Kit',
    description: 'Sets, SoundCloud, identidade sonora e apresentação do projeto Ulrich em uma única página.',
  },
}

const SCRIPTS = [
  '/assets/js/menu.js',
  '/assets/js/reveal.js',
  '/assets/js/player.js',
  '/assets/js/analytics.js',
  '/assets/js/app.js',
]

export default function UlrichPage() {
  return (
    <div className="ulrich-page">
      <BodyClass className="ulrich-page" />
      <ClientScripts scripts={SCRIPTS} />
      <SiteHeader activePage="ulrich" />

      <main>
        <section className="hero page-hero section ulrich-hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <span className="section-kicker">Projeto artístico</span>
              <h1>Sets com identidade e direção.</h1>

              <p className="lead">
                Ulrich é um projeto guiado por feeling, leitura de pista e construção de jornada.
                A intenção é fazer as pessoas sentirem a música, e não apenas ouvi-la.
              </p>

              <p className="lead">
                O foco está em conduzir a energia com elegância, groove, presença e assinatura.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary btn-primary--ulrich" href="#sets">Ouvir sets</a>
                <a className="btn btn-secondary btn-secondary--ulrich" href="#press-kit">Ver press kit</a>
              </div>
            </div>

            <div className="hero-media reveal">
              <img
                src="/assets/images/ulrich-hero.webp"
                alt="Ulrich em foto promocional"
                className="hero-photo"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="section" id="sets">
          <div className="container reveal">
            <span className="section-kicker">Sets</span>
            <h2>Sets em destaque</h2>

            <div className="ulrich-visual-grid">
              <figure className="info-card ulrich-cover-card">
                <img
                  src="/assets/images/preview-ulrich.webp"
                  alt="Ulrich em visual de prévia do projeto"
                  className="hero-photo ulrich-cover-photo"
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <figure className="info-card ulrich-cover-card">
                <img
                  src="/assets/images/ulrich-cover.webp"
                  alt="Ulrich em foto de cobertura do projeto"
                  className="hero-photo ulrich-cover-photo"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>

            <div className="set-grid">
              <article className="set-card">
                <span className="set-type">Set principal</span>
                <h3>El Fortin Talent 2026</h3>
                <p>
                  Um recorte direto da identidade do projeto Ulrich, com direção, progressão
                  e presença de pista. Um set pensado para mostrar controle de energia,
                  construção de clima e assinatura artística.
                </p>
                <button
                  className="btn btn-primary btn-primary--ulrich play-track-btn"
                  data-track="0"
                  type="button"
                >
                  Tocar set principal
                </button>
              </article>

              <article className="set-card">
                <span className="set-type">Set especial</span>
                <h3>After Rebobina @ At home [03.08.2025]</h3>
                <p>
                  Um recorte mais íntimo e espontâneo do projeto Ulrich, com clima de after,
                  seleção envolvente e uma condução mais solta, sem perder identidade, groove e conexão.
                </p>
                <button
                  className="btn btn-secondary btn-secondary--ulrich play-track-btn"
                  data-track="1"
                  type="button"
                >
                  Tocar After Rebobina
                </button>
              </article>
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container reveal">
            <span className="section-kicker">SoundCloud</span>
            <h2>Uma extensão natural do universo Ulrich</h2>

            <div className="soundcloud-grid">
              <article className="info-card soundcloud-card soundcloud-card--main">
                <p>
                  O SoundCloud funciona como uma extensão natural do projeto Ulrich, reunindo
                  sets, recortes e passagens sonoras que ajudam a entender melhor a direção musical,
                  a atmosfera e a identidade construída em cada fase do projeto.
                </p>
                <p>
                  É um ponto de entrada para quem quer ir além da superfície e escutar o projeto
                  com mais contexto, mais continuidade e mais proximidade com a essência do som.
                </p>

                <div className="presskit-actions soundcloud-actions">
                  <a
                    className="btn btn-primary btn-primary--ulrich"
                    href="https://soundcloud.com/luizulrich"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ouvir no SoundCloud
                  </a>
                </div>
              </article>

              <article className="info-card soundcloud-card soundcloud-card--side accent-panel">
                <h3>O que você encontra lá</h3>
                <ul className="clean-list">
                  <li>Sets publicados e recortes do projeto.</li>
                  <li>Identidade sonora em construção contínua.</li>
                  <li>Um ponto de entrada para curadores, público e interessados.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container reveal">
            <span className="section-kicker">Identidade</span>
            <h2>O que define o projeto</h2>

            <div className="approach-grid">
              <article className="info-card">
                <h3>Leitura</h3>
                <p>Antes de acelerar, observo o ambiente, entendo a resposta da pista e percebo o momento certo de condução.</p>
              </article>

              <article className="info-card">
                <h3>Construção</h3>
                <p>Os sets são pensados como jornada, conectando faixas que façam sentido entre si e com a energia do espaço.</p>
              </article>

              <article className="info-card">
                <h3>Pressão</h3>
                <p>A intensidade sobe com intenção, sem perder groove, elegância e coerência estética.</p>
              </article>

              <article className="info-card">
                <h3>Memória</h3>
                <p>O objetivo final é deixar sensação, lembrança e impacto em quem vive o set.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container reveal">
            <span className="section-kicker">Direção artística</span>
            <h2>Como o projeto se posiciona</h2>

            <p className="section-text">
              Ulrich não nasce da necessidade de seguir uma regra fixa de gênero, mas da busca
              por criar conexão entre música, atmosfera e movimento. O projeto é guiado pelo
              que a pista pede, pelo que o momento comporta e pelo que a experiência precisa.
            </p>

            <p className="section-text">
              A ideia é construir presença com refinamento, sem exagero visual, sem performance forçada
              e sem perder a naturalidade da pista.
            </p>

            <p className="section-text section-text--highlight">
              O projeto existe para controlar a pista com elegância e fazer a música ser sentida de verdade.
            </p>
          </div>
        </section>

        <section className="section alt" id="press-kit">
          <div className="container reveal">
            <span className="section-kicker">Apresentação do projeto</span>
            <h2>Press kit integrado ao universo Ulrich</h2>

            <div className="presskit-grid">
              <article className="info-card presskit-card presskit-card--wide">
                <p>
                  Ulrich é um projeto de música eletrônica construído com foco em experiência,
                  leitura de pista e conexão real com o público.
                </p>
                <p>
                  A proposta não está presa a uma regra rígida de gêneros, mas sim à capacidade
                  de entender a energia do ambiente e conduzir a jornada da forma mais certa para aquele momento.
                </p>
                <p>
                  O projeto combina presença, sensibilidade e direção para construir sets que equilibram
                  groove, emoção, pressão e memória.
                </p>
                <p>
                  Mais do que apenas tocar, a intenção é apresentar uma assinatura clara para casas,
                  curadores, marcas e pessoas interessadas em uma experiência com identidade.
                </p>
              </article>

              <article className="info-card presskit-card accent-panel">
                <h3>Assinatura</h3>
                <ul className="clean-list">
                  <li>Leitura de pista e construção de clima.</li>
                  <li>Progressão de energia com intenção.</li>
                  <li>Mistura entre emoção, groove e presença.</li>
                  <li>Sets pensados para deixar sensação e memória.</li>
                </ul>
              </article>

              <article className="info-card presskit-card presskit-card--media">
                <img
                  src="/assets/images/ulrich-presskit.jpg"
                  alt="Ulrich em material de press kit"
                  className="hero-photo presskit-photo"
                  loading="lazy"
                  decoding="async"
                />
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container reveal">
            <span className="section-kicker">Para quem quer conhecer melhor</span>
            <h2>Resumo rápido para interesse e booking</h2>

            <div className="presskit-points">
              <article className="info-card">
                <h3>Nome artístico</h3>
                <p>Ulrich</p>
              </article>

              <article className="info-card">
                <h3>Base</h3>
                <p>Santa Catarina, Brasil</p>
              </article>

              <article className="info-card">
                <h3>Foco</h3>
                <p>Música eletrônica, pista, experiência e construção de jornada.</p>
              </article>

              <article className="info-card">
                <h3>Posicionamento</h3>
                <p>Projeto guiado por elegância, leitura de momento e assinatura própria.</p>
              </article>

              <article className="info-card">
                <h3>Interesse</h3>
                <p>Bookings, collabs, convites, curadoria e projetos especiais.</p>
              </article>

              <article className="info-card">
                <h3>Contato</h3>
                <p>Canal direto para oportunidades ligadas ao projeto.</p>
              </article>
            </div>

            <div className="presskit-actions">
              <a className="btn btn-primary btn-primary--ulrich" href="/contato">Falar sobre booking</a>
              <a className="btn btn-secondary btn-secondary--ulrich" href="#sets">Ouvir sets novamente</a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter
        kicker="Projeto Ulrich"
        description="Sets, identidade sonora e apresentação do projeto reunidos em uma única página para descoberta e interesse."
      />
    </div>
  )
}
