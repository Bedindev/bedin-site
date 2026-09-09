import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CategoryChip from '../components/CategoryChip'

export const revalidate = 86400

type Props = { params: Promise<{ slug: string }> }

async function getPost(slug: string) {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return data
}

export async function generateStaticParams() {
  const { data } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true)
  return (data || []).map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const url = `https://blog.bedinrepresentacao.com.br/${slug}`
  const title = post.seo_title || post.title
  const description = post.seo_description || post.excerpt || ''

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.created_at,
      images: post.cover_image ? [{ url: post.cover_image, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  // Articles carry their own leading <h1>; the page already renders the title, so drop it
  // to avoid a duplicated heading and keep a single h1 per page.
  const contentHtml = (post.content || '').replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>/i, '')
  const plainText = (post.content || '')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:#\d+|#x[\da-f]+|[a-z]+);/gi, ' ')
    .trim()
  const wordCount = plainText ? plainText.split(/\s+/).length : 0
  const readingMinutes = Math.ceil(wordCount / 200)
  const shortTitle = post.title.length > 60 ? `${post.title.slice(0, 57).trimEnd()}…` : post.title

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: { '@type': 'Organization', name: 'Bedin Representações' },
    publisher: {
      '@type': 'Organization',
      name: 'Bedin Representações',
      url: 'https://www.bedinrepresentacao.com.br',
    },
    url: `https://blog.bedinrepresentacao.com.br/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="blog-post-page">
        <div className="container">
          <div className="blog-post-wrap">
            <header className="blog-post__header">
              <div className="blog-post__meta">
                <CategoryChip category={post.category} />
                <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                <span>{readingMinutes} {readingMinutes === 1 ? 'minuto' : 'minutos'} de leitura</span>
              </div>
              <h1>{post.title}</h1>
            </header>
            <nav className="blog-breadcrumb" aria-label="Caminho de navegação">
              <ol>
                <li><Link href="/">Blog</Link></li>
                {post.category && <li><Link href={`/?categoria=${encodeURIComponent(post.category)}`}>{post.category}</Link></li>}
                <li aria-current="page" title={post.title}>{shortTitle}</li>
              </ol>
            </nav>
            <div
              className="blog-post__content"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </div>
      </main>
      <section className="blog-post__cta" aria-labelledby="quote-title">
        <div className="container">
          <h2 id="quote-title">Pronto para montar o estoque da sua loja?</h2>
          <p>Fale com a equipe Bedin e receba uma cotação em até 24h.</p>
          <a className="btn blog-post__cta-button" href="https://wa.me/5548998680025?text=Olá%2C%20vim%20pelo%20blog%20da%20Bedin!" target="_blank" rel="noopener noreferrer">Pedir cotação no WhatsApp</a>
        </div>
      </section>
      <Footer />
    </>
  )
}
