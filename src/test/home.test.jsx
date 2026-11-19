import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import App from '../App'
import { navigateTo } from './helpers'

function renderAt(path) {
  navigateTo(path)
  return render(<App />)
}

/* A versão retrofitada virou a home (rota /). A home anterior continua
   em /v1, que é o que estes testes verificam. */
describe('home and existing pages', () => {
  it('replaces the secondary hero CTA with a link to /como-funciona and keeps only two CTAs', () => {
    renderAt('/v1')
    const ctas = document.querySelector('.hero__ctas')
    expect(ctas.querySelectorAll('a')).toHaveLength(2)
    expect(within(ctas).getByRole('link', { name: 'Como trabalhamos' })).toHaveAttribute('href', '/como-funciona')
    expect(within(ctas).getByRole('link', { name: /Solicitar cotação/ })).toHaveAttribute('href', expect.stringContaining('wa.me/5548998680025'))
  })

  it('keeps every existing WhatsApp event and the quotation form intact', () => {
    renderAt('/v1')
    fireEvent.click(within(document.querySelector('.hero__ctas')).getByRole('link', { name: /Solicitar cotação/ }))
    fireEvent.click(screen.getByRole('link', { name: /Falar agora/ }))
    fireEvent.click(screen.getByRole('link', { name: 'WhatsApp' }))
    const labels = window.gtag.mock.calls.map(c => c[2].event_label)
    expect(labels).toEqual(['hero', 'header', 'botao_flutuante'])

    const form = document.getElementById('form-cotacao')
    expect(form).toBeInTheDocument()
    ;['nome', 'empresa', 'tel', 'email', 'produtos-cotacao', 'qtd'].forEach(id => expect(form.querySelector(`#${id}`)).toBeInTheDocument())
  })

  it('still renders /politica-de-privacidade', () => {
    renderAt('/politica-de-privacidade')
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  /* "Sobre nós" e "Como funciona" saíram do site, mas as URLs estavam
     indexadas: precisam redirecionar, não dar 404. */
  it('redirects the removed pages to the home', () => {
    const sobre = renderAt('/sobre')
    expect(window.location.pathname).toBe('/')
    sobre.unmount()

    renderAt('/como-funciona')
    expect(window.location.pathname).toBe('/')
  })

  it('no longer links to the removed pages', () => {
    renderAt('/')
    const links = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'))
    expect(links.some(h => h.includes('/sobre') || h.includes('/como-funciona'))).toBe(false)
  })

  it('redirects unknown routes to the home', () => {
    renderAt('/nao-existe')
    expect(window.location.pathname).toBe('/')
  })
})
