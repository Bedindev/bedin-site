'use client'

import { useState } from 'react'
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
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function BlogClient({ posts, categories }: { posts: Post[], categories: string[] }) {
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = selected ? posts.filter(p => p.category === selected) : posts

  return (
    <div className="blog-layout">
      <aside className="blog-sidebar">
        <h3>Categorias</h3>
        <ul>
          <li>
            <button className={!selected ? 'active' : ''} onClick={() => setSelected(null)}>
              Todos
            </button>
          </li>
          {categories.map(cat => (
            <li key={cat}>
              <button className={selected === cat ? 'active' : ''} onClick={() => setSelected(cat)}>
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className="blog-grid">
        {filtered.length === 0 ? (
          <p className="blog-empty">Nenhum post nessa categoria.</p>
        ) : (
          filtered.map(post => (
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
  )
}
