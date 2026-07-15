import type { Metadata } from 'next'
import { supabase } from '../lib/supabase'
import Header from './components/Header'
import Footer from './components/Footer'
import BlogClient from './BlogClient'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Blog Bedin · o que ninguém te conta sobre vender produto natural',
  description: 'Dicas práticas, análises de mercado e estratégias reais que aplicamos com nossos lojistas-parceiros.',
  alternates: { canonical: 'https://blog.bedinrepresentacao.com.br' },
  openGraph: {
    title: 'Blog Bedin · o que ninguém te conta sobre vender produto natural',
    description: 'Dicas práticas, análises de mercado e estratégias reais para lojistas de produtos naturais.',
    url: 'https://blog.bedinrepresentacao.com.br',
    type: 'website',
  },
}

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, category, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const categories = [...new Set((posts || []).map((p: any) => p.category).filter(Boolean))] as string[]

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
          <BlogClient posts={posts || []} categories={categories} />
        </div>
      </main>
      <Footer />
    </>
  )
}
