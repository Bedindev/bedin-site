import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
  return (data || []).map((p: any) => ({ slug: p.slug }))
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
      images: post.cover_image ? [{ url: post.cover_image }] : [],
    },
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

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
            <Link href="/" className="blog-back">← Voltar pro blog</Link>
            {post.category && <span className="blog-card__cat">{post.category}</span>}
            <h1>{post.title}</h1>
            <div className="blog-post__meta">
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div
              className="blog-post__content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
