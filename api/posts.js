import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://tnhajvnwofourjusnivh.supabase.co',
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authHeader = req.headers['authorization']
  if (authHeader !== `Bearer ${process.env.BLOG_API_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { title, slug, excerpt, category, content, seo_title, seo_description, published } = req.body

  if (!title || !slug || !content) {
    return res.status(400).json({ error: 'Missing required fields: title, slug, content' })
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title,
        slug,
        excerpt: excerpt || '',
        category: category || '',
        content,
        seo_title: seo_title || title,
        seo_description: seo_description || excerpt || '',
        published: published ?? false,
      })
      .select()
      .single()

    if (error) throw error

    res.status(201).json({ success: true, post: data })
  } catch (error) {
    console.error('Post creation error:', error)
    res.status(500).json({ error: 'Failed to create post' })
  }
}
