import type { Metadata } from 'next'
import { ClientScripts } from '@/components/ClientScripts'
import { HomeIdentity } from '@/components/identity/HomeIdentity'

import '@/assets/css/identity/home.css'

export const metadata: Metadata = {
  title: 'Luiz Ulrich | Tecnologia e Projeto Ulrich',
  description:
    'Luiz Ulrich — suporte, sistemas e produtos digitais construídos na prática (Luiz) e sets de música eletrônica guiados por leitura de pista (Ulrich).',
  metadataBase: new URL('https://luizulrich.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Luiz Ulrich | Tecnologia e Projeto Ulrich',
    description: 'Duas vertentes, uma lógica: tecnologia e música eletrônica.',
    url: 'https://luizulrich.com/',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luiz Ulrich | Tecnologia e Projeto Ulrich',
    description: 'Duas vertentes, uma lógica: tecnologia e música eletrônica.',
  },
}

const HOME_SCRIPTS = ['/assets/js/analytics.js']

export default function HomePage() {
  return (
    <>
      <ClientScripts scripts={HOME_SCRIPTS} />
      <HomeIdentity />
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
