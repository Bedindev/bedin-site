import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [selectedCategory])

  async function fetchPosts() {
    setLoading(true)
    let query = supabase
      .from('posts')
      .select('id, title, slug, excerpt, category, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (selectedCategory) {
      query = query.eq('category', selectedCategory)
    }

    const { data } = await query
    if (data) {
      setPosts(data)
      const cats = [...new Set(data.map(p => p.category).filter(Boolean))]
      if (!selectedCategory) setCategories(cats)
    }
    setLoading(false)
  }

  async function fetchCategories() {
    const { data } = await supabase
      .from('posts')
      .select('category')
      .eq('published', true)
    if (data) {
      const cats = [...new Set(data.map(p => p.category).filter(Boolean))].sort()
      setCategories(cats)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <>
      <Header />
      <main className="blog-page">
        <div className="container">
          <div className="blog-hero">
            <span className="label">Conteúdo</span>
            <h1 className="sec-title">Blog <span className="accent">Bedin</span></h1>
            <p>Dicas, novidades e estratégias para lojas de produtos naturais.</p>
          </div>
          <div className="blog-layout">
            <aside className="blog-sidebar">
              <h3>Categorias</h3>
              <ul>
                <li>
                  <button
                    className={!selectedCategory ? 'active' : ''}
                    onClick={() => setSelectedCategory(null)}
                  >
                    Todos
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      className={selectedCategory === cat ? 'active' : ''}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
            <section className="blog-grid">
              {loading ? (
                <p className="blog-loading">Carregando posts...</p>
              ) : posts.length === 0 ? (
                <p className="blog-empty">Nenhum post encontrado.</p>
              ) : (
                posts.map(post => (
                  <Link to={`/blog/${post.slug}`} key={post.id} className="blog-card">
                    <div className="blog-card__img-placeholder">
                      <span>Bedin Representação</span>
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
      <WhatsAppFloat />
    </>
  )
}
