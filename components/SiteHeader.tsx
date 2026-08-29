'use client'

type ActivePage = 'luiz' | 'ulrich' | 'contato'

interface SiteHeaderProps {
  activePage: ActivePage
}

export function SiteHeader({ activePage }: SiteHeaderProps) {
  return (
    <header className="site-header glass">
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="Ir para a página inicial">
          <span className="brand-mark">LU</span>
          <span className="brand-text">Luiz Ulrich</span>
        </a>

        <nav className="main-nav" id="mainNav" aria-label="Navegação principal">
          <a href="/luiz" className={activePage === 'luiz' ? 'is-active' : ''}>Luiz</a>
          <a href="/ulrich" className={activePage === 'ulrich' ? 'is-active' : ''}>Ulrich</a>
          <a href="/contato" className={activePage === 'contato' ? 'is-active' : ''}>Contato</a>
        </nav>

        <button
          className="menu-toggle"
          id="menuToggle"
          aria-label="Abrir menu"
          aria-expanded="false"
          aria-controls="mainNav"
          type="button"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
