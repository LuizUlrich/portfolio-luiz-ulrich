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
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
