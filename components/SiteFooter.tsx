interface SiteFooterProps {
  kicker: string
  description: string
  hasUlrichSignature?: boolean
}

export function SiteFooter({ kicker, description, hasUlrichSignature }: SiteFooterProps) {
  return (
    <footer className="page-footer">
      <div className="container footer-inner">
        <div className="footer-copy">
          <span className="section-kicker">{kicker}</span>
          <p>{description}</p>
        </div>
        <nav className="footer-nav" aria-label="Navegação do rodapé">
          <a href="/">Início</a>
          <a href="/contato">Contato</a>
        </nav>
      </div>
      {hasUlrichSignature && (
        <div className="ulrich-signature">
          <span className="ulrich-by">by</span>
          <a
            href="https://www.luizulrich.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ulrich-link"
          >
            Ulrich
            <span className="ulrich-underline" />
          </a>
        </div>
      )}
    </footer>
  )
}
