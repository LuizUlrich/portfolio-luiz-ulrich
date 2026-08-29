import type { Metadata } from 'next'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { BodyClass } from '@/components/BodyClass'
import { ClientScripts } from '@/components/ClientScripts'

import '@/assets/css/global.css'
import '@/assets/css/layout.css'
import '@/assets/css/components.css'
import '@/assets/css/luiz.css'

export const metadata: Metadata = {
  title: 'Luiz Ulrich | Suporte, Sistemas, Banco de Dados e Projetos Digitais',
  description:
    'Portfólio profissional de Luiz Ulrich com foco em suporte, sistemas, banco de dados, troubleshooting, projetos digitais e melhoria de processos.',
  metadataBase: new URL('https://luizulrich.com'),
  alternates: { canonical: '/luiz' },
  openGraph: {
    title: 'Luiz Ulrich | Suporte, Sistemas, Banco de Dados e Projetos Digitais',
    description: 'Suporte, sistemas, banco de dados, troubleshooting, projetos digitais e experiência aplicada em entregas reais.',
    url: 'https://luizulrich.com/luiz',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luiz Ulrich | Suporte, Sistemas, Banco de Dados e Projetos Digitais',
    description: 'Suporte, sistemas, banco de dados, troubleshooting, projetos digitais e experiência aplicada em entregas reais.',
  },
}

const SCRIPTS = [
  '/assets/js/menu.js',
  '/assets/js/reveal.js',
  '/assets/js/analytics.js',
  '/assets/js/app.js',
]

export default function LuizPage() {
  return (
    <div className="luiz-page">
      <BodyClass className="luiz-page" />
      <ClientScripts scripts={SCRIPTS} />
      <SiteHeader activePage="luiz" />

      <main>
        <section className="hero page-hero section luiz-hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <span className="section-kicker">Trajetória profissional</span>
              <h1>Experiência aplicada com visão prática.</h1>

              <p className="lead">
                Minha trajetória em tecnologia vem sendo construída na prática, com atuação em suporte computacional,
                sistemas, troubleshooting, implantação, estruturação de informações e melhoria de processos.
              </p>

              <p className="lead">
                Além da base operacional e técnica, também venho aplicando isso em projetos reais de sites,
                estrutura digital, banco de dados, publicação, ajustes técnicos e evolução contínua de presença online.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary btn-primary--luiz" href="#projetos">Ver experiência aplicada</a>
                <a className="btn btn-secondary btn-secondary--luiz" href="/contato">Abrir contato</a>
              </div>
            </div>

            <aside className="hero-panel info-card reveal accent-panel">
              <picture className="luiz-hero-photo-wrap">
                <source srcSet="/assets/images/preview-luiz.webp" type="image/webp" />
                <img
                  src="/assets/images/preview-luiz.webp"
                  alt="Luiz Ulrich em retrato profissional"
                  className="hero-photo luiz-hero-photo"
                  loading="eager"
                  decoding="async"
                />
              </picture>
              <span className="section-kicker">Direção atual</span>
              <h2>Meu foco hoje</h2>
              <ul className="clean-list">
                <li>Entregar projetos digitais com mais consistência do planejamento à publicação.</li>
                <li>Resolver problemas com clareza, precisão e senso prático.</li>
                <li>Unir suporte, sistemas, organização de dados e desenvolvimento web aplicado.</li>
                <li>Construir uma carreira sólida com visão técnica e execução real.</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="container reveal">
            <span className="section-kicker">Sobre</span>
            <h2>Quem sou eu</h2>

            <p className="section-text">
              Sou uma pessoa analítica, curiosa e orientada à evolução. Tenho facilidade para
              aprender rápido, entender padrões e organizar cenários que, no começo, parecem
              confusos ou desalinhados.
            </p>

            <p className="section-text">
              Foi isso que me aproximou da tecnologia. Gosto de estruturar problemas, separar
              o que é causa, impacto e prioridade, e transformar isso em solução prática,
              funcional e confiável.
            </p>

            <p className="section-text">
              Hoje essa base aparece tanto na minha atuação com suporte computacional,
              implantação de sistemas, atendimento técnico, orientação de usuários e leitura de fluxos
              de informação quanto no desenvolvimento web aplicado, publicação de sites e ajustes de estrutura digital.
            </p>

            <p className="section-text section-text--highlight">
              Meu objetivo é seguir crescendo como um profissional confiável, técnico e capaz
              de pegar projetos reais, organizar dados, estruturar a execução e fazer acontecer.
            </p>
          </div>
        </section>

        <section className="section alt">
          <div className="container reveal">
            <span className="section-kicker">Postura de trabalho</span>
            <h2>Soft skills</h2>

            <div className="skills-grid">
              <article className="info-card">
                <h3>Aprendizado contínuo</h3>
                <p>Estou sempre buscando aprender, testar e evoluir, porque crescer em tecnologia exige constância.</p>
              </article>

              <article className="info-card">
                <h3>Organização</h3>
                <p>Gosto de estruturar tarefas, prioridades e cenários com clareza para agir melhor e com mais eficiência.</p>
              </article>

              <article className="info-card">
                <h3>Pontualidade</h3>
                <p>Levo compromisso a sério. Cumprir prazo, respeitar combinados e manter consistência faz parte da minha forma de trabalhar.</p>
              </article>

              <article className="info-card">
                <h3>Tomada de decisão</h3>
                <p>Procuro entender o contexto antes de agir, avaliar possibilidades e decidir com responsabilidade.</p>
              </article>

              <article className="info-card">
                <h3>Execução</h3>
                <p>Tenho perfil prático. Gosto de resolver, tirar do papel e fazer a coisa andar.</p>
              </article>

              <article className="info-card">
                <h3>Criatividade funcional</h3>
                <p>Quando o caminho mais óbvio não resolve, gosto de pensar em soluções mais inteligentes e úteis.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container reveal">
            <span className="section-kicker">Atuação prática</span>
            <h2>Como eu atuo</h2>

            <p className="section-text">
              No dia a dia, gosto de trabalhar de forma prática, racional e direta.
              Quando surge um problema, meu primeiro passo é entender de verdade o que
              está acontecendo, o que causou aquilo e qual é o impacto da situação.
            </p>

            <p className="section-text">
              Depois disso, busco a solução mais eficiente possível, sem complicar o que pode ser simples.
              Também valorizo muito processos bem organizados e informações bem estruturadas, porque
              clareza reduz erro, retrabalho e desgaste.
            </p>

            <p className="section-text">
              Outro ponto que considero forte em mim é a capacidade de orientar pessoas.
              Gosto de ajudar usuários a entender melhor o sistema, o processo e a forma
              correta de executar uma tarefa.
            </p>

            <p className="section-text section-text--highlight">
              Para mim, tecnologia não é só ferramenta. É fazer interface, sistema e dados funcionarem melhor para as pessoas.
            </p>
          </div>
        </section>

        <section className="section alt">
          <div className="container reveal">
            <span className="section-kicker">Base técnica</span>
            <h2>Hard skills</h2>

            <div className="skills-grid">
              <article className="info-card">
                <h3>Suporte técnico</h3>
                <p>Atuação com atendimento a usuários, troubleshooting, diagnóstico de falhas e resolução de problemas operacionais e técnicos.</p>
              </article>

              <article className="info-card">
                <h3>Sistemas e implantação</h3>
                <p>Configuração inicial, validação de funcionamento, apoio na adaptação do cliente e acompanhamento do uso com foco em estabilidade.</p>
              </article>

              <article className="info-card">
                <h3>Desenvolvimento web aplicado</h3>
                <p>Uso prático de HTML, CSS e JavaScript para estruturar interfaces, ajustar páginas, organizar navegação e evoluir sites reais.</p>
              </article>

              <article className="info-card">
                <h3>Publicação e manutenção de sites</h3>
                <p>Experiência com GitHub, Vercel, Cloudflare e estrutura de arquivos para deploy, ajustes pós-publicação e manutenção contínua.</p>
              </article>

              <article className="info-card">
                <h3>Interfaces e responsividade</h3>
                <p>Organização visual de páginas, refinamento de layout, adaptação para diferentes telas e cuidado com clareza de uso.</p>
              </article>

              <article className="info-card">
                <h3>Banco de dados e estrutura de informação</h3>
                <p>Experiência prática com organização de dados, estruturação de informações, suporte à operação, leitura de banco de dados e uso de soluções como Supabase, PostgreSQL e SQL para dar base mais funcional aos projetos.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="projetos">
          <div className="container reveal">
            <span className="section-kicker">Projetos e entregas</span>
            <h2>Experiência aplicada</h2>

            <div className="project-grid">
              <article className="project-card">
                <div className="project-top">
                  <span className="project-label">Projeto real</span>
                  <h3>Site imobiliário</h3>
                </div>
                <p>
                  Criação e refinamento de um site voltado ao mercado imobiliário, com foco em apresentação
                  de imóveis, estrutura visual mais clara, experiência do usuário e organização dos dados.
                </p>
                <ul className="project-points">
                  <li><strong>Foco:</strong> layout, cards, página de detalhes, busca e área administrativa.</li>
                  <li><strong>Tecnologia:</strong> Supabase, estrutura de dados, administração de imóveis e organização da informação para operação e catálogo.</li>
                  <li><strong>Impacto:</strong> vitrine digital mais funcional, visualmente coerente e pronta para evolução real.</li>
                </ul>
                <div className="project-card__actions">
                  <a
                    className="project-card__cta"
                    href="https://www.ericklautharte.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver projeto do site imobiliário"
                  >
                    Ver projeto
                  </a>
                </div>
              </article>

              <article className="project-card">
                <div className="project-top">
                  <span className="project-label">Projeto real</span>
                  <h3>Barbearia Bertotti</h3>
                </div>
                <p>
                  Desenvolvimento de um site profissional para barbearia com foco em presença digital,
                  experiência do cliente e estrutura operacional do negócio.
                </p>
                <ul className="project-points">
                  <li><strong>Foco:</strong> site institucional, agendamento online, agenda dos barbeiros e experiência do cliente.</li>
                  <li><strong>Tecnologia:</strong> estrutura preparada para banco de dados, controle de horários e gestão operacional.</li>
                  <li><strong>Impacto:</strong> presença digital mais forte, rotina mais organizada e fluxo de atendimento mais eficiente.</li>
                </ul>
                <div className="project-card__actions">
                  <a
                    className="project-card__cta"
                    href="https://www.barbeariabertotti.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver projeto Barbearia Bertotti"
                  >
                    Ver projeto
                  </a>
                </div>
              </article>

              <article className="project-card">
                <div className="project-top">
                  <span className="project-label">Cliente real</span>
                  <h3>Site Chef João</h3>
                </div>
                <p>
                  Desenvolvimento e refinamento de um site profissional para cliente real, com atenção
                  à imagem do negócio, clareza da comunicação e apresentação mais segura do serviço.
                </p>
                <ul className="project-points">
                  <li><strong>Foco:</strong> layout, CTA, formulário, responsividade e ajustes finais de apresentação.</li>
                  <li><strong>Entrega:</strong> estrutura mais profissional, objetiva e preparada para publicação.</li>
                  <li><strong>Impacto:</strong> presença digital mais convincente para um cliente real.</li>
                </ul>
                <div className="project-card__actions">
                  <span className="project-card__status">Projeto entregue</span>
                </div>
              </article>

              <article className="project-card">
                <div className="project-top">
                  <span className="project-label">Projeto autoral</span>
                  <h3>Portfólio Luiz Ulrich</h3>
                </div>
                <p>
                  Desenvolvimento e evolução do meu próprio site como base para organizar minha identidade
                  profissional e artística, estruturar conteúdo e comunicar melhor meu posicionamento.
                </p>
                <ul className="project-points">
                  <li><strong>Foco:</strong> navegação, layout, hierarquia de informação e coerência entre as páginas.</li>
                  <li><strong>Entrega:</strong> presença digital mais organizada, madura e alinhada com a minha fase atual.</li>
                  <li><strong>Impacto:</strong> melhor leitura do meu perfil e integração mais clara entre interface, sistema e dados.</li>
                </ul>
                <div className="project-card__actions">
                  <span className="project-card__status">Projeto em evolução</span>
                </div>
              </article>

              <article className="project-card">
                <div className="project-top">
                  <span className="project-label">Deploy e infraestrutura</span>
                  <h3>Publicação e estrutura de sites no ar</h3>
                </div>
                <p>
                  Experiência prática com publicação de projetos usando GitHub, Vercel, domínio e Cloudflare,
                  cuidando da estrutura necessária para colocar o site no ar e ajustar o que for preciso.
                </p>
                <ul className="project-points">
                  <li><strong>Foco:</strong> deploy, configuração, estrutura de arquivos e ajustes técnicos de publicação.</li>
                  <li><strong>Entrega:</strong> sites publicados com mais estabilidade e continuidade de manutenção.</li>
                  <li><strong>Impacto:</strong> experiência real em sair do ambiente local e levar o projeto para produção.</li>
                </ul>
                <div className="project-card__actions">
                  <span className="project-card__status">Infraestrutura aplicada</span>
                </div>
              </article>

              <article className="project-card">
                <div className="project-top">
                  <span className="project-label">Sistemas e operação</span>
                  <h3>Transferência de ERP, dados e continuidade operacional</h3>
                </div>
                <p>
                  Atuação em projeto de migração operacional envolvendo ERP, produtos, estoque, clientes
                  e outras configurações importantes para manter a operação organizada e funcional.
                </p>
                <ul className="project-points">
                  <li><strong>Foco:</strong> transferência de dados, revisão de estrutura, modelagem da lógica operacional e suporte à operação.</li>
                  <li><strong>Entrega:</strong> processo mais organizado e seguro para continuidade do trabalho.</li>
                  <li><strong>Impacto:</strong> reforço da minha base em sistemas, banco de dados, atenção a detalhe e melhoria de processos.</li>
                </ul>
                <div className="project-card__actions">
                  <span className="project-card__status">Operação estruturada</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container reveal">
            <span className="section-kicker">Experiência profissional</span>
            <h2>Trajetória</h2>

            <div className="timeline">
              <article className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <h3>Voxy Intelligence Solutions</h3>
                  <p>Auxiliar Analista de Suporte Computacional I, com atuação em atendimento remoto e presencial, diagnóstico e resolução de incidentes técnicos, instalação, configuração, manutenção de sistemas e suporte direto à operação do cliente.</p>
                </div>
              </article>

              <article className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <h3>Twin Brasil</h3>
                  <p>Atuação com sistema ERP, apoio administrativo, controle operacional, atendimento pós-venda e suporte às rotinas da operação, fortalecendo minha leitura de processos, fluxo de dados e necessidades reais do dia a dia.</p>
                </div>
              </article>

              <article className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <h3>CSB Engenharia</h3>
                  <p>Experiência com análise de Normas Regulamentadoras e projetos de modelagem 3D, fortalecendo visão técnica, organização, leitura de processo e disciplina para lidar com contexto mais estruturado e detalhado.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container reveal">
            <span className="section-kicker">Formação</span>
            <h2>Base acadêmica</h2>

            <div className="skills-grid skills-grid--academic">
              <article className="info-card info-card--compact">
                <h3>Análise e Desenvolvimento de Sistemas</h3>
                <p>Formação em andamento, ampliando base em tecnologia, lógica, sistemas e desenvolvimento.</p>
              </article>

              <article className="info-card info-card--compact">
                <h3>Técnico em Eletromecânica</h3>
                <p>Formação que contribuiu para disciplina técnica, raciocínio lógico e leitura estruturada de problemas.</p>
              </article>

              <article className="info-card info-card--landscape">
                <h3>Objetivo e futuro</h3>
                <p>Estou construindo minha carreira passo a passo, com visão de longo prazo e muita seriedade no meu processo de evolução.</p>
                <p>Quero aprofundar minha base técnica, assumir desafios maiores e crescer para funções com mais responsabilidade, análise e impacto real.</p>
                <p>Meu foco é evoluir continuamente e me tornar um profissional cada vez mais completo dentro da área de tecnologia.</p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter
        kicker="Lado profissional"
        description="Página dedicada à trajetória em tecnologia, sistemas, suporte, dados e construção técnica com visão prática."
        hasUlrichSignature
      />
    </div>
  )
}
