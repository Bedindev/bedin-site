import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, screen, fireEvent, within } from '@testing-library/react'
import App from '../App'
import { navigateTo } from './helpers'

function renderAt(path) {
  navigateTo(path)
  return render(<App />)
}

const WA = 'https://wa.me/5548998680025'
const WA_MESSAGE = encodeURIComponent('Olá, vim pelo site da Bedin e quero enviar uma lista para cotação.')

describe('/como-funciona', () => {
  it('renders when the URL is opened directly and has a single h1', () => {
    renderAt('/como-funciona')
    const h1s = screen.getAllByRole('heading', { level: 1 })
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent('Você cuida da sua loja. A Bedin cuida da compra até a entrega.')
  })

  it('is served on a hard refresh by the SPA rewrite in vercel.json', () => {
    const vercel = JSON.parse(readFileSync(resolve(process.cwd(), 'vercel.json'), 'utf8'))
    const rewrite = vercel.rewrites.find(r => r.source === '/(.*)' && r.destination === '/index.html')
    expect(rewrite).toBeTruthy()
    expect(vercel.redirects.some(r => r.source.startsWith('/como-funciona'))).toBe(false)
  })

  it('shows the link as current in the header and links it in the footer', () => {
    renderAt('/como-funciona')
    const header = screen.getByRole('banner')
    const nav = within(header).getByRole('link', { name: 'Como funciona' })
    expect(nav).toHaveAttribute('href', '/como-funciona')
    expect(nav).toHaveAttribute('aria-current', 'page')
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByRole('link', { name: 'Como funciona' })).toHaveAttribute('href', '/como-funciona')
  })

  it('opens WhatsApp with the official number from the hero, journey and final CTAs, each with its own analytics origin', () => {
    renderAt('/como-funciona')
    const [hero, jornada] = screen.getAllByRole('link', { name: /Enviar minha lista no WhatsApp/ })
    const final = screen.getByRole('link', { name: /Enviar minha lista para cotação/ })
    expect(hero.closest('.cf-hero')).not.toBeNull()
    expect(jornada.closest('.jornada')).not.toBeNull()
    expect(final.closest('.cf-final')).not.toBeNull()
    ;[hero, jornada, final].forEach(link => {
      expect(link).toHaveAttribute('href', `${WA}?text=${WA_MESSAGE}`)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    })
    fireEvent.click(hero)
    fireEvent.click(jornada)
    fireEvent.click(final)
    const labels = window.gtag.mock.calls.map(c => c[2].event_label)
    expect(labels).toEqual(['como_funciona_hero', 'como_funciona_jornada', 'como_funciona_final'])
    expect(new Set(labels).size).toBe(3)
  })

  it('scrolls to the animated journey from the secondary hero CTA', () => {
    renderAt('/como-funciona')
    fireEvent.click(screen.getByRole('link', { name: 'Ver como funciona' }))
    expect(window.scrollTo).toHaveBeenCalled()
    expect(document.getElementById('como-funciona')).toBeInTheDocument()
  })

  it('renders the before/after comparison in legible pairs', () => {
    renderAt('/como-funciona')
    const rows = document.querySelectorAll('.compare__row')
    expect(rows).toHaveLength(5)
    rows.forEach(row => {
      expect(within(row).getByText('Sem a Bedin')).toBeInTheDocument()
      expect(within(row).getByText('Com a Bedin')).toBeInTheDocument()
    })
    expect(screen.getByText('Falar com vários fornecedores')).toBeInTheDocument()
    expect(screen.getByText('Um único contato pelo WhatsApp')).toBeInTheDocument()
  })

  it('lists the five services and the technology section with the approved copy', () => {
    renderAt('/como-funciona')
    ;['Cotação de preços', 'Cotação de frete', 'Organização dos pedidos', 'Rastreamento e atualizações', 'Suporte pós-venda']
      .forEach(title => expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument())
    expect(screen.getByRole('heading', { name: /Tecnologia nos bastidores/ })).toBeInTheDocument()
    expect(screen.getByText(/Você não precisa aprender um sistema novo/)).toBeInTheDocument()
  })

  it('never promises GPS or real-time tracking and never names internal tools', () => {
    renderAt('/como-funciona')
    const text = document.body.textContent
    expect(text).not.toMatch(/gps/i)
    expect(text).not.toMatch(/tempo real/i)
    expect(text).not.toMatch(/cotahub|supabase|n8n|intelig[êe]ncia artificial|automa[çc][ãa]o|banco de dados/i)
  })

  it('reuses the existing Stats block and adds no new figures, percentages or prices', () => {
    renderAt('/como-funciona')
    const stats = document.querySelector('.stats')
    expect(stats).toBeInTheDocument()
    ;['Nota no Google', 'Produtos no catálogo', 'Fornecedores parceiros', 'Empresas atendidas todo mês']
      .forEach(label => expect(within(stats).getByText(new RegExp(label))).toBeInTheDocument())
    expect(within(stats).getByText('4,9')).toBeInTheDocument()
    expect(document.querySelectorAll('.stats')).toHaveLength(1)

    const main = document.querySelector('main').textContent
    expect(main).not.toMatch(/\d+\s?%/)
    expect(main).not.toMatch(/R\$/)
    expect(main).not.toMatch(/\d+\s?(min|hora|dia)s?\b/i)
  })

  it('shows only real reviews already present in the project', () => {
    renderAt('/como-funciona')
    ;['Alessandro Ferreira', 'Rodrigo Schmidt', 'Steffani Amaral'].forEach(name =>
      expect(screen.getAllByText(name).length).toBeGreaterThan(0)
    )
    expect(screen.getByRole('link', { name: /Ler todas as avaliações no Google/ })).toHaveAttribute('href', 'https://share.google/ZdruFz4KpnQ1jW6iw')
  })

  it('sets and restores page metadata (title, description, canonical, Open Graph, Twitter)', () => {
    document.title = 'Home title'
    const desc = document.createElement('meta'); desc.name = 'description'; desc.content = 'home desc'; document.head.appendChild(desc)
    const canonical = document.createElement('link'); canonical.rel = 'canonical'; canonical.href = 'https://www.bedinrepresentacao.com.br/'; document.head.appendChild(canonical)

    const { unmount } = renderAt('/como-funciona')
    expect(document.title).toBe('Como funciona | Cotação, frete e acompanhamento | Bedin Representações')
    expect(desc.content).toMatch(/Envie sua lista e conte com a Bedin/)
    expect(canonical.href).toBe('https://www.bedinrepresentacao.com.br/como-funciona')
    expect(document.head.querySelector('meta[property="og:title"]').content).toMatch(/Como funciona/)
    expect(document.head.querySelector('meta[property="og:url"]').content).toBe('https://www.bedinrepresentacao.com.br/como-funciona')
    expect(document.head.querySelector('meta[name="twitter:title"]').content).toMatch(/Como funciona/)
    expect(document.head.querySelector('script[type="application/ld+json"]').textContent).toMatch(/HowTo/)

    unmount()
    expect(document.title).toBe('Home title')
    expect(desc.content).toBe('home desc')
    expect(canonical.href).toBe('https://www.bedinrepresentacao.com.br/')
    expect(document.head.querySelector('meta[property="og:title"]')).toBeNull()
    expect(document.head.querySelector('script[type="application/ld+json"]')).toBeNull()
    desc.remove(); canonical.remove()
  })
})
