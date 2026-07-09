import type { MetadataRoute } from 'next'
import { supabase } from '../lib/supabase'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, created_at, updated_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const postEntries: MetadataRoute.Sitemap = (posts || []).map((post: any) => ({
    url: `https://blog.bedinrepresentacao.com.br/${post.slug}`,
    lastModified: post.updated_at || post.created_at,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://blog.bedinrepresentacao.com.br',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...postEntries,
  ]
}
