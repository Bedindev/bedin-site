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

      if (data?.seo_title) document.title = data.seo_title
      if (data?.seo_description) {
        let meta = document.querySelector('meta[name="description"]')
        if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
        meta.content = data.seo_description
      }
    }
    fetchPost()
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
