import type { Metadata } from 'next'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { BodyClass } from '@/components/BodyClass'
import { ClientScripts } from '@/components/ClientScripts'

import '@/assets/css/global.css'
import '@/assets/css/layout.css'
import '@/assets/css/components.css'
import '@/assets/css/contato.css'

export const metadata: Metadata = {
  title: 'Contato | Luiz Ulrich, Tecnologia, Dados e Projeto Ulrich',
  description:
    'Página de contato de Luiz Ulrich para oportunidades profissionais, projetos digitais, banco de dados, colaborações e bookings do projeto Ulrich.',
  metadataBase: new URL('https://luizulrich.com'),
  alternates: { canonical: '/contato' },
  openGraph: {
    title: 'Contato | Luiz Ulrich, Tecnologia, Dados e Projeto Ulrich',
    description: 'Fale com Luiz Ulrich sobre tecnologia, banco de dados, projetos digitais, SoundCloud e bookings.',
    url: 'https://luizulrich.com/contato',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contato | Luiz Ulrich, Tecnologia, Dados e Projeto Ulrich',
    description: 'Fale com Luiz Ulrich sobre tecnologia, banco de dados, projetos digitais, SoundCloud e bookings.',
  },
}

const SCRIPTS = [
  '/assets/js/menu.js',
  '/assets/js/reveal.js',
  '/assets/js/analytics.js',
  '/assets/js/app.js',
]

export default function ContatoPage() {
  return (
    <div className="contact-page">
      <BodyClass className="contact-page" />
      <ClientScripts scripts={SCRIPTS} />
      <SiteHeader activePage="contato" />

      <main>
        <section className="hero page-hero section contact-hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <span className="section-kicker">Contato</span>
              <h1>Vamos conversar.</h1>

              <p className="lead">
                Estou aberto a oportunidades profissionais, projetos digitais, estrutura de dados,
                banco de dados, colaborações estratégicas e bookings relacionados ao projeto Ulrich.
              </p>

              <p className="lead">
                Se a ideia fizer sentido, a conversa acontece. Sem enrolação, sem excesso
                e com foco no que realmente importa.
              </p>
            </div>

            <aside className="hero-panel info-card reveal contact-hero-panel">
              <span className="section-kicker">Posso ajudar com</span>
              <h2>Direcionamento</h2>
              <ul className="clean-list">
                <li>Oportunidades em tecnologia, sistemas e banco de dados.</li>
                <li>Projetos digitais, estrutura digital e presença online.</li>
                <li>Organização de dados, manutenção e evolução de sistemas.</li>
                <li>Parcerias criativas e branding pessoal.</li>
                <li>Bookings e convites para o projeto Ulrich.</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="container reveal">
            <span className="section-kicker">Canais principais</span>
            <h2>Escolha o melhor ponto de contato</h2>

            <div className="contact-grid">
              <a
                className="contact-btn contact-btn--luiz"
                href="https://wa.me/5546991210030"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-btn__label">WhatsApp</span>
                <span className="contact-btn__value">+55 46 9 9121-0030</span>
              </a>

              <a
                className="contact-btn contact-btn--ulrich"
                href="https://www.instagram.com/luiz.ulrich/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-btn__label">Instagram</span>
                <span className="contact-btn__value">Presença, identidade e universo artístico</span>
              </a>

              <a
                className="contact-btn contact-btn--luiz"
                href="https://www.linkedin.com/in/luizulrich/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-btn__label">LinkedIn</span>
                <span className="contact-btn__value">Conexões profissionais, trajetória e networking</span>
              </a>

              <a
                className="contact-btn contact-btn--ulrich"
                href="https://soundcloud.com/luizulrich"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-btn__label">SoundCloud</span>
                <span className="contact-btn__value">Sets, identidade sonora e universo do projeto Ulrich</span>
              </a>
            </div>

            <p className="contact-note">
              Para contato por e-mail, você também pode falar por{' '}
              <a href="mailto:luizfelipeulrich@gmail.com">luizfelipeulrich@gmail.com</a>.
            </p>
          </div>
        </section>

        <section className="section alt">
          <div className="container reveal">
            <span className="section-kicker">Direcionamento</span>
            <h2>Como falar comigo</h2>

            <div className="contact-dual-grid">
              <article className="info-card contact-side-card contact-side-card--luiz">
                <h3>Lado Luiz</h3>
                <p>
                  Para oportunidades profissionais, projetos de tecnologia, suporte,
                  estruturação digital, organização de dados e trabalhos ligados à área técnica.
                </p>
              </article>

              <article className="info-card contact-side-card contact-side-card--ulrich">
                <h3>Lado Ulrich</h3>
                <p>
                  Para bookings, convites, collabs e tudo que envolva música, pista,
                  presença artística e experiências ligadas ao projeto.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter
        kicker="Contato"
        description="Canal direto para oportunidades profissionais, projetos digitais, banco de dados, colaborações e bookings."
      />
    </div>
  )
}
