'use client'

import { useSyncExternalStore } from 'react'
import CategoryChip from './components/CategoryChip'
import Link from 'next/link'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: string | null
  created_at: string
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'America/Sao_Paulo' })
}

function subscribeToCategory(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener('bedin:category-change', onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener('bedin:category-change', onChange)
  }
}

const getSearch = () => window.location.search
const getServerSearch = () => ''

export default function BlogClient({ posts, categories }: { posts: Post[], categories: string[] }) {
  // Keep the full article list in server HTML; restore URL filtering after hydration.
  const search = useSyncExternalStore(subscribeToCategory, getSearch, getServerSearch)
  const selected = new URLSearchParams(search).get('categoria')
  const setSelected = (category: string | null) => {
    const params = new URLSearchParams(search)
    if (category) params.set('categoria', category)
    else params.delete('categoria')
    const query = params.toString()
    window.history.pushState(null, '', query ? `/?${query}` : '/')
    window.dispatchEvent(new Event('bedin:category-change'))
  }

  const filtered = selected ? posts.filter(p => p.category === selected) : posts

  return (
    <div className="blog-layout">
      <aside className="blog-sidebar">
        <h3>Categorias</h3>
        <ul>
          <li>
            <button aria-pressed={!selected} className={!selected ? 'active' : ''} onClick={() => setSelected(null)}>
              Todos
            </button>
          </li>
          {categories.map(cat => (
            <li key={cat}>
              <button aria-pressed={selected === cat} className={selected === cat ? 'active' : ''} onClick={() => setSelected(cat)}>
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className="blog-grid" aria-label="Artigos" aria-live="polite">
        {filtered.length === 0 ? (
          <div className="blog-empty" role="status">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 4h6a4 4 0 0 1 3 1.5A4 4 0 0 1 15 4h6v15h-6a4 4 0 0 0-3 1.5A4 4 0 0 0 9 19H3Z" /><path d="M12 6v14M6 8h3M6 12h3M15 8h3M15 12h3" />
            </svg>
            <h2>Novas leituras estão a caminho</h2>
            <p>{selected ? 'Ainda não temos artigos nesta categoria. Que tal explorar os outros conteúdos?' : 'Em breve, dicas e novidades para ajudar sua loja a crescer. Volte para conferir!'}</p>
            {selected && <button className="btn btn-filled" onClick={() => setSelected(null)}>Ver todos os artigos</button>}
          </div>
        ) : (
          filtered.map(post => (
            <Link href={`/${post.slug}`} key={post.id} className="blog-card">
              <div className="blog-card__cover">
                <div className="blog-card__cover-top">
                  <span className="blog-card__cover-year">{new Date(post.created_at).toLocaleDateString('pt-BR', { year: 'numeric', timeZone: 'America/Sao_Paulo' })}</span>
                  <img className="blog-card__cover-logo" src="/logo vetorizado Bedin.png" alt="Bedin" height={20} />
                </div>
                <h3 className="blog-card__cover-title">{post.category || 'Blog'}</h3>
              </div>
              <div className="blog-card__body">
                <CategoryChip category={post.category} />
                <h2>{post.title}</h2>
                {post.excerpt && <p>{post.excerpt}</p>}
                <div className="blog-card__meta">
                  <time className="blog-card__date" dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                </div>
                <span className="blog-card__read">Ler artigo <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          ))
        )}
      </section>
    </div>
  )
}
