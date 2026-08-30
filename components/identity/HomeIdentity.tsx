'use client'

import { useState } from 'react'
import { SetPlayer } from './SetPlayer'

type Domain = 'dev' | 'dj'
type Theme = 'dark' | 'light'

const MODE_LABEL: Record<Domain, string> = {
  dev: 'dev · vinho',
  dj: 'dj · roxo meia-noite',
}

export function HomeIdentity() {
  const [domain, setDomain] = useState<Domain>('dev')
  const [theme, setTheme] = useState<Theme>('dark')

  return (
    <div className="identity-page" data-domain={domain} data-theme={theme}>
      <a className="skip-link" href="#conteudo">
        Pular para conteúdo
      </a>

      <header className="id-header">
        <div className="id-wrap id-header-inner">
          <span className="id-mark">
            <span className="id-pulse" aria-hidden="true" />
            Luiz Ulrich
          </span>
          <div className="id-header-actions">
            <a className="id-header-link" href="/contato">
              Contato
            </a>
            <button
              type="button"
              className="id-theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
              title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>

      <main id="conteudo">
        <section className="id-hero id-wrap">
          <p className="id-eyebrow">
            <span className="id-pulse" aria-hidden="true" />
            duas vertentes, uma lógica
          </p>
          <h1>Luiz Ulrich</h1>
          <p className="id-lead">
            Tecnologia e música seguem a mesma lógica: diagnosticar o cenário, estruturar a resposta certa
            e executar com precisão. Do suporte técnico ao set na pista — a diferença é só o contexto.
          </p>
          <svg className="id-trace" viewBox="0 0 800 80" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,40 L120,40 L160,10 L200,70 L240,40 L300,40 C340,10 380,70 420,40 C460,10 500,70 540,40 C580,10 620,70 660,40 C700,10 740,70 780,40" />
          </svg>
        </section>

        <section className="id-toggle-section id-wrap">
          <div className="id-toggle" role="tablist" aria-label="Alternar entre Luiz e Ulrich">
            <button
              type="button"
              role="tab"
              aria-selected={domain === 'dev'}
              className={domain === 'dev' ? 'is-active' : ''}
              onClick={() => setDomain('dev')}
            >
              Luiz · Dev
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={domain === 'dj'}
              className={domain === 'dj' ? 'is-active' : ''}
              onClick={() => setDomain('dj')}
            >
              Ulrich · DJ
            </button>
          </div>
          <p className="id-mode-label">
            modo ativo: <span>{MODE_LABEL[domain]}</span>
          </p>
        </section>

        {domain === 'dev' ? <DevPanel /> : <DjPanel />}
      </main>

      <footer className="id-footer id-wrap">
        <div className="id-footer-inner">
          <span className="id-footer-mark">luiz ulrich — 2026</span>
          <nav className="id-footer-nav" aria-label="Navegação do rodapé">
            <a href="/contato">Contato</a>
            <a href="https://soundcloud.com/luizulrich" target="_blank" rel="noopener noreferrer">
              SoundCloud
            </a>
            <a href="https://www.linkedin.com/in/luizulrich/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/LuizUlrich" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.instagram.com/luiz.ulrich/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function DevPanel() {
  return (
    <>
      <section className="id-panel-section id-wrap">
        <p className="id-section-num">08 — Luiz · tecnologia</p>
        <h2>Suporte, sistemas e produtos digitais construídos na prática.</h2>
        <p className="id-text">
          Atuo com suporte computacional, sistemas, banco de dados e desenvolvimento web, sempre partindo
          do diagnóstico real antes da solução. Curioso, organizado e direto — gosto de estruturar o que
          está confuso e fazer o sistema funcionar de verdade para quem usa.
        </p>
        <div className="id-tags">
          <span className="id-tag">Frontend</span>
          <span className="id-tag">Backend / Sistemas</span>
          <span className="id-tag">UX / IHC</span>
          <span className="id-tag">Automação</span>
          <span className="id-tag">Banco de Dados</span>
          <span className="id-tag">Deploy / Cloud</span>
        </div>
      </section>

      <section className="id-panel-section id-panel id-wrap">
        <p className="id-section-num">16 — Projetos</p>
        <div className="id-stat-mono">
          06<span className="unit">projetos aplicados</span>
        </div>
        <div className="id-card-grid">
          <article className="id-card">
            <span className="id-card-tag">Projeto real</span>
            <h3>Erick Imóveis</h3>
            <p>Plataforma imobiliária com foco em catálogo, busca e experiência de navegação.</p>
            <a className="id-card-link" href="https://ericklautharte.com/" target="_blank" rel="noopener noreferrer">
              Ver projeto →
            </a>
          </article>
          <article className="id-card">
            <span className="id-card-tag">Projeto real</span>
            <h3>Barbearia Bertotti</h3>
            <p>Site institucional com agendamento online e estrutura de operação do negócio.</p>
            <a
              className="id-card-link"
              href="https://www.barbeariabertotti.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver projeto →
            </a>
          </article>
          <article className="id-card">
            <span className="id-card-tag">Cliente real</span>
            <h3>João Estúdio Gastronômico</h3>
            <p>Presença digital premium com foco em posicionamento e narrativa de alto valor.</p>
          </article>
          <article className="id-card">
            <span className="id-card-tag">Projeto acadêmico</span>
            <h3>SGPD — Protótipo</h3>
            <p>Prototipagem de sistema com foco em estruturação de solução e processo.</p>
            <a className="id-card-link" href="/assets/projects/sgpd-prototipo/">
              Acessar referência →
            </a>
          </article>
        </div>
      </section>

      <section className="id-panel-section id-wrap">
        <p className="id-section-num">24 — Trajetória</p>
        <div className="id-timeline">
          <div className="id-timeline-item">
            <span className="id-timeline-dot" aria-hidden="true" />
            <div>
              <h3>Voxy Intelligence Solutions</h3>
              <p>Auxiliar Analista de Suporte Computacional I — atendimento, diagnóstico e resolução de incidentes técnicos.</p>
            </div>
          </div>
          <div className="id-timeline-item">
            <span className="id-timeline-dot" aria-hidden="true" />
            <div>
              <h3>Twin Brasil</h3>
              <p>Sistema ERP, apoio administrativo, controle operacional e suporte às rotinas da operação.</p>
            </div>
          </div>
          <div className="id-timeline-item">
            <span className="id-timeline-dot" aria-hidden="true" />
            <div>
              <h3>CSB Engenharia</h3>
              <p>Análise de Normas Regulamentadoras e projetos de modelagem 3D.</p>
            </div>
          </div>
        </div>
        <div className="id-cta-row">
          <a className="id-btn id-btn-primary" href="/contato">
            Falar sobre um projeto
          </a>
          <a
            className="id-btn id-btn-secondary"
            href="https://wa.me/5546991210030"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}

function DjPanel() {
  return (
    <>
      <section className="id-panel-section id-wrap">
        <p className="id-section-num">08 — Ulrich · projeto artístico</p>
        <h2>Sets guiados por leitura de pista e construção de jornada.</h2>
        <p className="id-text">
          Ulrich é um projeto de música eletrônica guiado por feeling e leitura de pista, não por regra
          fixa de gênero. A intenção é conduzir a energia com elegância e deixar sensação — não só som.
        </p>
        <div className="id-tags">
          <span className="id-tag">Leitura de pista</span>
          <span className="id-tag">Construção de jornada</span>
          <span className="id-tag">Progressão com intenção</span>
          <span className="id-tag">Sensação e memória</span>
        </div>
      </section>

      <section className="id-panel-section id-panel id-wrap">
        <p className="id-section-num">16 — Sets</p>
        <div className="id-stat-mono">
          03<span className="unit">sets publicados</span>
        </div>
        <SetPlayer />
        <div className="id-cta-row">
          <a
            className="id-btn id-btn-primary"
            href="https://soundcloud.com/luizulrich"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ouvir no SoundCloud
          </a>
        </div>
      </section>

      <section className="id-panel-section id-wrap">
        <p className="id-section-num">24 — Ficha rápida</p>
        <div className="id-fact-grid">
          <div className="id-fact">
            <span className="id-fact-label">Nome artístico</span>
            <span className="id-fact-value">Ulrich</span>
          </div>
          <div className="id-fact">
            <span className="id-fact-label">Base</span>
            <span className="id-fact-value">Santa Catarina, Brasil</span>
          </div>
          <div className="id-fact">
            <span className="id-fact-label">Foco</span>
            <span className="id-fact-value">Música eletrônica, pista, jornada</span>
          </div>
          <div className="id-fact">
            <span className="id-fact-label">Interesse</span>
            <span className="id-fact-value">Bookings, collabs, curadoria</span>
          </div>
        </div>
        <div className="id-cta-row">
          <a className="id-btn id-btn-primary" href="/contato">
            Falar sobre booking
          </a>
        </div>
      </section>
    </>
  )
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.6" y1="4.6" x2="6.7" y2="6.7" />
      <line x1="17.3" y1="17.3" x2="19.4" y2="19.4" />
      <line x1="4.6" y1="19.4" x2="6.7" y2="17.3" />
      <line x1="17.3" y1="6.7" x2="19.4" y2="4.6" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  )
}
