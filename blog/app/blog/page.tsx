import type { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const revalidate = 86400 // ISR: revalida uma vez por dia

export const metadata: Metadata = {
  title: 'Blog Bedin · o que ninguém te conta sobre vender produto natural',
  description: 'Dicas práticas, análises de mercado e estratégias reais que aplicamos com nossos lojistas-parceiros.',
  alternates: { canonical: 'https://www.bedinrepresentacao.com.br/blog' },
  openGraph: {
    title: 'Blog Bedin · o que ninguém te conta sobre vender produto natural',
    description: 'Dicas práticas, análises de mercado e estratégias reais para lojistas de produtos naturais.',
    url: 'https://www.bedinrepresentacao.com.br/blog',
    type: 'website',
  },
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, category, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const categories = [...new Set((posts || []).map((p: any) => p.category).filter(Boolean))]

  return (
    <>
      <Header />
      <main className="blog-page">
        <div className="container">
          <div className="blog-hero">
            <span className="label">Conteúdo pra quem tem loja</span>
            <h1 className="sec-title">Blog <span className="accent">Bedin</span> · o que ninguém te conta sobre vender produto natural</h1>
            <p>Dicas práticas, análises de mercado e estratégias reais que aplicamos com nossos lojistas-parceiros.</p>
          </div>
          <div className="blog-layout">
            <aside className="blog-sidebar">
              <h3>Categorias</h3>
              <ul>
                {categories.map((cat: any) => (
                  <li key={cat}><span className="blog-sidebar__cat">{cat}</span></li>
                ))}
              </ul>
            </aside>
            <section className="blog-grid">
              {!posts || posts.length === 0 ? (
                <p className="blog-empty">Em breve novos conteúdos por aqui.</p>
              ) : (
                posts.map((post: any) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="blog-card">
                    <div className="blog-card__cover">
                      <div className="blog-card__cover-top">
                        <span className="blog-card__cover-year">{new Date(post.created_at).getFullYear()}</span>
                        <img className="blog-card__cover-logo" src="/logo vetorizado Bedin.png" alt="Bedin" height={20} />
                      </div>
                      <h3 className="blog-card__cover-title">{post.category || 'Blog'}</h3>
                    </div>
                    <div className="blog-card__body">
                      <h2>{post.title}</h2>
                      {post.excerpt && <p>{post.excerpt}</p>}
                      <div className="blog-card__meta">
                        <span className="blog-card__date">{formatDate(post.created_at)}</span>
                        {post.category && <span className="blog-card__cat">{post.category}</span>}
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
