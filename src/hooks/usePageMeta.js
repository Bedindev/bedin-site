import { useEffect } from 'react'

const TARGETS = {
  description: { selector: 'meta[name="description"]', attr: 'content', tag: 'meta', key: ['name', 'description'] },
  canonical: { selector: 'link[rel="canonical"]', attr: 'href', tag: 'link', key: ['rel', 'canonical'] },
  ogTitle: { selector: 'meta[property="og:title"]', attr: 'content', tag: 'meta', key: ['property', 'og:title'] },
  ogDescription: { selector: 'meta[property="og:description"]', attr: 'content', tag: 'meta', key: ['property', 'og:description'] },
  ogUrl: { selector: 'meta[property="og:url"]', attr: 'content', tag: 'meta', key: ['property', 'og:url'] },
  twitterTitle: { selector: 'meta[name="twitter:title"]', attr: 'content', tag: 'meta', key: ['name', 'twitter:title'] },
  twitterDescription: { selector: 'meta[name="twitter:description"]', attr: 'content', tag: 'meta', key: ['name', 'twitter:description'] },
}

// SPA: the static index.html carries the home metadata. This swaps the tags on the
// client for internal routes and restores the originals on unmount so the home is
// never left with another page's title when the user navigates back.
export function usePageMeta(meta) {
  const serialized = JSON.stringify(meta)
  useEffect(() => {
    const previousTitle = document.title
    if (meta.title) document.title = meta.title

    const restores = []
    Object.entries(TARGETS).forEach(([name, cfg]) => {
      const value = meta[name]
      if (value == null) return
      let el = document.head.querySelector(cfg.selector)
      if (el) {
        const previous = el.getAttribute(cfg.attr)
        el.setAttribute(cfg.attr, value)
        restores.push(() => el.setAttribute(cfg.attr, previous ?? ''))
      } else {
        el = document.createElement(cfg.tag)
        el.setAttribute(cfg.key[0], cfg.key[1])
        el.setAttribute(cfg.attr, value)
        document.head.appendChild(el)
        restores.push(() => el.remove())
      }
    })

    return () => {
      document.title = previousTitle
      restores.forEach(fn => fn())
    }
  }, [serialized]) // eslint-disable-line react-hooks/exhaustive-deps
}

export function useJsonLd(data) {
  const serialized = JSON.stringify(data)
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = serialized
    document.head.appendChild(script)
    return () => script.remove()
  }, [serialized])
}
