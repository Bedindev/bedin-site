import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import App from '../App'
import { navigateTo } from './helpers'

function renderAt(path) {
  navigateTo(path)
  return render(<App />)
}

describe('home and existing pages', () => {
  it('replaces the secondary hero CTA with a link to /como-funciona and keeps only two CTAs', () => {
    renderAt('/')
    const ctas = document.querySelector('.hero__ctas')
    expect(ctas.querySelectorAll('a')).toHaveLength(2)
    expect(within(ctas).getByRole('link', { name: 'Entender como funciona' })).toHaveAttribute('href', '/como-funciona')
    expect(within(ctas).getByRole('link', { name: /Falar com a Bedin no WhatsApp/ })).toHaveAttribute('href', expect.stringContaining('wa.me/5548998680025'))
  })

  it('adds "Como funciona" to the home header, internal headers and the footer', () => {
    renderAt('/')
    expect(within(screen.getByRole('banner')).getByRole('link', { name: 'Como funciona' })).toHaveAttribute('href', '/como-funciona')
    expect(within(screen.getByRole('contentinfo')).getByRole('link', { name: 'Como funciona' })).toHaveAttribute('href', '/como-funciona')
  })

  it('shows the compact summary with four steps and a CTA to the dedicated page', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: /Da cotação à entrega, a Bedin cuida de cada etapa/ })).toBeInTheDocument()
    const steps = screen.getByRole('list', { name: 'Etapas resumidas' })
    expect(within(steps).getAllByRole('listitem').map(li => li.textContent)).toEqual([
      '1Envie sua lista', '2Compare as opções', '3Escolha com segurança', '4Acompanhe a entrega',
    ])
    expect(screen.getByRole('link', { name: 'Conheça nosso atendimento completo' })).toHaveAttribute('href', '/como-funciona')
  })

  it('keeps every existing WhatsApp event and the quotation form intact', () => {
    renderAt('/')
    fireEvent.click(screen.getByRole('link', { name: /Falar com a Bedin no WhatsApp/ }))
    fireEvent.click(screen.getByRole('link', { name: /Falar agora/ }))
    fireEvent.click(screen.getByRole('link', { name: 'WhatsApp' }))
    const labels = window.gtag.mock.calls.map(c => c[2].event_label)
    expect(labels).toEqual(['hero', 'header', 'botao_flutuante'])

    const form = document.getElementById('form-cotacao')
    expect(form).toBeInTheDocument()
    ;['nome', 'empresa', 'tel', 'email', 'produtos-cotacao', 'qtd'].forEach(id => expect(form.querySelector(`#${id}`)).toBeInTheDocument())
  })

  it('still renders /sobre and /politica-de-privacidade with the new navigation link', () => {
    const sobre = renderAt('/sobre')
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(within(screen.getByRole('banner')).getByRole('link', { name: 'Como funciona' })).toBeInTheDocument()
    sobre.unmount()

    renderAt('/politica-de-privacidade')
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(within(screen.getByRole('banner')).getByRole('link', { name: 'Como funciona' })).toBeInTheDocument()
  })

  it('redirects unknown routes to the home', () => {
    renderAt('/nao-existe')
    expect(window.location.pathname).toBe('/')
  })
})
