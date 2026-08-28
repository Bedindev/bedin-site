import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.bedinrepresentacao.com.br'),
  title: {
    default: 'Blog Bedin | Conteúdo para lojistas de produtos naturais',
    template: '%s | Blog Bedin',
  },
  description: 'Dicas práticas, análises de mercado e estratégias reais para quem tem loja de produtos naturais.',
  openGraph: {
    siteName: 'Bedin Representações',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bedinrepresentacao',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
