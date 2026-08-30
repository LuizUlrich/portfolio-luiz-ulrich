import type { Metadata } from 'next'

export const metadata: Metadata = {
  icons: { icon: '/assets/icons/favicon.ico' },
  openGraph: {
    images: [{ url: 'https://luizulrich.com/assets/images/og-default.jpg', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
