import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()
      setPost(data)
      setLoading(false)

      if (!data) return

      const pageUrl = `https://www.bedinrepresentacao.com.br/blog/${slug}`
      const title = data.seo_title || data.title
      const description = data.seo_description || data.excerpt || ''

      document.title = title

      const setMeta = (selector, attr, value) => {
        let el = document.querySelector(selector)
        if (!el) { el = document.createElement('meta'); document.head.appendChild(el) }
        el.setAttribute(attr, value)
      }

      setMeta('meta[name="description"]', 'content', description)

      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
      canonical.href = pageUrl

      setMeta('meta[property="og:title"]', 'content', title)
      setMeta('meta[property="og:description"]', 'content', description)
      setMeta('meta[property="og:url"]', 'content', pageUrl)
      setMeta('meta[property="og:type"]', 'content', 'article')
      if (data.cover_image) setMeta('meta[property="og:image"]', 'content', data.cover_image)
    }
    fetchPost()

    return () => {
      document.title = 'Bedin Representação | A representante que cuida da sua loja natural'
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) canonical.href = 'https://www.bedinrepresentacao.com.br/'
    }
  }, [slug])

  function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  }

  if (loading) return <><Header /><div className="container" style={{padding:'120px 0', textAlign:'center'}}>Carregando...</div><Footer /></>
  if (!post) return <><Header /><div className="container" style={{padding:'120px 0', textAlign:'center'}}><h2>Não encontramos esse post</h2><Link to="/blog">← Voltar pro blog</Link></div><Footer /></>

  return (
    <>
      <Header />
      <main className="blog-post-page">
        <div className="container">
          <div className="blog-post-wrap">
            <Link to="/blog" className="blog-back">← Voltar pro blog</Link>
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
      <WhatsAppFloat />
    </>
  )
}
