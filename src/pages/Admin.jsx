import { useState } from 'react'
import { supabase } from '../lib/supabase'

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function Admin() {
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '',
    category: '', seo_title: '', seo_description: '', published: false
  })
  const [status, setStatus] = useState('')

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'title' && !f.slug ? { slug: slugify(value) } : {})
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('Salvando...')
    const { error } = await supabase.from('posts').insert([form])
    if (error) {
      setStatus('Erro: ' + error.message)
    } else {
      setStatus('Post salvo com sucesso!')
      setForm({ title: '', slug: '', excerpt: '', content: '', category: '', seo_title: '', seo_description: '', published: false })
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-wrap">
        <h1>Novo Post</h1>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="fgroup">
            <label>Título</label>
            <input name="title" value={form.title} onChange={handleChange} required placeholder="Título do post" />
          </div>
          <div className="fgroup">
            <label>Slug (URL)</label>
            <input name="slug" value={form.slug} onChange={handleChange} required placeholder="titulo-do-post" />
          </div>
          <div className="fgroup">
            <label>Resumo</label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows="2" placeholder="Breve descrição do post..." />
          </div>
          <div className="fgroup">
            <label>Conteúdo (HTML)</label>
            <textarea name="content" value={form.content} onChange={handleChange} rows="12" placeholder="<p>Conteúdo do post em HTML...</p>" required />
          </div>
          <div className="fgroup">
            <label>Categoria</label>
            <input name="category" value={form.category} onChange={handleChange} placeholder="Ex: Dicas, Produtos Naturais..." />
          </div>
          <div className="fgroup">
            <label>SEO Title</label>
            <input name="seo_title" value={form.seo_title} onChange={handleChange} placeholder="Título para Google (60 caracteres)" />
          </div>
          <div className="fgroup">
            <label>SEO Description</label>
            <textarea name="seo_description" value={form.seo_description} onChange={handleChange} rows="2" placeholder="Descrição para Google (160 caracteres)" />
          </div>
          <div className="fgroup" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" name="published" checked={form.published} onChange={handleChange} id="published" />
            <label htmlFor="published">Publicar agora</label>
          </div>
          <button type="submit" className="btn btn-filled large">{status === 'Salvando...' ? 'Salvando...' : 'Salvar Post'}</button>
          {status && <p style={{ marginTop: '12px', color: status.includes('Erro') ? '#ef4444' : '#25D366' }}>{status}</p>}
        </form>
      </div>
    </div>
  )
}
