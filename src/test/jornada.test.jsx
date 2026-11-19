import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import JornadaBedin, { JORNADA_STEPS } from '../components/JornadaBedin'

const WA = 'https://wa.me/5548998680025'

describe('JornadaBedin', () => {
  beforeEach(() => {
    window.gtag = vi.fn()
  })

  it('renders the five steps as a static ordered list, in order and fully visible', () => {
    render(<JornadaBedin />)
    const items = screen.getByRole('list').querySelectorAll('.jornada__step')
    expect(items).toHaveLength(5)
    JORNADA_STEPS.forEach((step, i) => {
      expect(within(items[i]).getByRole('heading', { level: 3, name: step.title })).toBeInTheDocument()
      expect(within(items[i]).getByText(step.text)).toBeInTheDocument()
      expect(within(items[i]).getByText(String(i + 1).padStart(2, '0'))).toBeInTheDocument()
    })
  })

  it('carries no tabs, panels or timers — nothing animates or auto-advances', () => {
    vi.useFakeTimers()
    render(<JornadaBedin />)
    expect(screen.queryAllByRole('tab')).toHaveLength(0)
    expect(screen.queryAllByRole('tabpanel')).toHaveLength(0)
    expect(vi.getTimerCount()).toBe(0)
    vi.useRealTimers()
  })

  it('keeps the WhatsApp CTA with the official number and its analytics origin', () => {
    render(<JornadaBedin />)
    const cta = screen.getByRole('link', { name: /Enviar minha lista no WhatsApp/ })
    expect(cta).toHaveAttribute('href', expect.stringContaining(WA))
    expect(cta).toHaveAttribute('target', '_blank')
    expect(cta).toHaveAttribute('rel', expect.stringContaining('noopener'))
    fireEvent.click(cta)
    expect(window.gtag.mock.calls[0][2].event_label).toBe('como_funciona_jornada')
  })

  it('anchors the section so the hero CTA can scroll to it', () => {
    const { container } = render(<JornadaBedin />)
    expect(container.querySelector('#como-funciona')).not.toBeNull()
    expect(container.querySelector('.jornada')).not.toBeNull()
  })
})
