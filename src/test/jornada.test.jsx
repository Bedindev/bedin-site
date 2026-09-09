import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import JornadaBedin, { JORNADA_STEPS, JORNADA_INTERVAL_MS } from '../components/JornadaBedin'
import { intersectAll, setReducedMotion } from './helpers'

const STEP = JORNADA_INTERVAL_MS

function tabs() { return screen.getAllByRole('tab') }
function selectedIndex() { return tabs().findIndex(t => t.getAttribute('aria-selected') === 'true') }
// React only schedules the next step after the previous state update flushes,
// so advance one interval per act() to mirror the browser.
function advance(ms) {
  const steps = Math.max(1, Math.ceil(ms / STEP))
  for (let i = 0; i < steps; i++) act(() => { vi.advanceTimersByTime(Math.min(STEP, ms)) })
}

describe('JornadaBedin', () => {
  it('renders the five steps in order with all content present without animation', () => {
    render(<JornadaBedin />)
    const all = tabs()
    expect(all).toHaveLength(5)
    JORNADA_STEPS.forEach((s, i) => expect(all[i]).toHaveTextContent(s.short))
    const panels = screen.getAllByRole('tabpanel', { hidden: true })
    expect(panels).toHaveLength(5)
    JORNADA_STEPS.forEach(s => {
      expect(screen.getByRole('heading', { level: 3, name: s.title, hidden: true })).toBeInTheDocument()
      expect(screen.getByText(s.text)).toBeInTheDocument()
    })
    expect(selectedIndex()).toBe(0)
    expect(panels[0]).toHaveAttribute('aria-hidden', 'false')
    expect(panels[1]).toHaveAttribute('aria-hidden', 'true')
  })

  it('does not start until the track enters the viewport', () => {
    vi.useFakeTimers()
    render(<JornadaBedin />)
    advance(STEP * 4)
    expect(selectedIndex()).toBe(0)
  })

  it('advances one step at a time, stops on the last step and never loops', () => {
    vi.useFakeTimers()
    render(<JornadaBedin />)
    intersectAll()
    expect(selectedIndex()).toBe(0)
    advance(STEP)
    expect(selectedIndex()).toBe(1)
    advance(STEP)
    expect(selectedIndex()).toBe(2)
    advance(STEP)
    expect(selectedIndex()).toBe(3)
    advance(STEP)
    expect(selectedIndex()).toBe(4)
    advance(STEP * 10)
    expect(selectedIndex()).toBe(4)
    expect(vi.getTimerCount()).toBe(0)
    expect(screen.getByText(/Etapa/, { selector: '.jornada__status' })).toHaveTextContent('5 de 5')
  })

  it('marks previous steps as done, not only by color', () => {
    vi.useFakeTimers()
    render(<JornadaBedin />)
    intersectAll()
    advance(STEP * 2)
    const all = tabs()
    expect(all[0]).toHaveAttribute('data-state', 'done')
    expect(all[0]).toHaveTextContent('etapa concluída')
    expect(all[2]).toHaveAttribute('data-state', 'active')
    expect(all[2]).toHaveTextContent('etapa atual')
    expect(all[3]).toHaveAttribute('data-state', 'todo')
  })

  it('selects a step by click and stops the autoplay for good', () => {
    vi.useFakeTimers()
    render(<JornadaBedin />)
    intersectAll()
    fireEvent.click(tabs()[2])
    expect(selectedIndex()).toBe(2)
    advance(STEP * 5)
    expect(selectedIndex()).toBe(2)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('selects steps by keyboard (arrows, Home/End and Enter)', async () => {
    const user = userEvent.setup()
    render(<JornadaBedin />)
    const all = tabs()
    all[0].focus()
    fireEvent.keyDown(all[0], { key: 'ArrowRight' })
    expect(selectedIndex()).toBe(1)
    expect(document.activeElement).toBe(tabs()[1])
    fireEvent.keyDown(tabs()[1], { key: 'End' })
    expect(selectedIndex()).toBe(4)
    fireEvent.keyDown(tabs()[4], { key: 'ArrowRight' })
    expect(selectedIndex()).toBe(0)
    tabs()[3].focus()
    await user.keyboard('{Enter}')
    expect(selectedIndex()).toBe(3)
  })

  it('pauses while the pointer hovers the step track and resumes afterwards', () => {
    vi.useFakeTimers()
    const { container } = render(<JornadaBedin />)
    intersectAll()
    advance(STEP)
    expect(selectedIndex()).toBe(1)
    const track = container.querySelector('.jornada__track')
    fireEvent.pointerEnter(track)
    advance(STEP * 4)
    expect(selectedIndex()).toBe(1)
    fireEvent.pointerLeave(track)
    advance(STEP)
    expect(selectedIndex()).toBe(2)
  })

  it('keeps advancing when the pointer merely rests on the explanation panel', () => {
    vi.useFakeTimers()
    const { container } = render(<JornadaBedin />)
    intersectAll()
    fireEvent.pointerEnter(container.querySelector('.jornada__panels'))
    advance(STEP)
    expect(selectedIndex()).toBe(1)
  })

  it('pauses while a step has keyboard focus', () => {
    vi.useFakeTimers()
    render(<JornadaBedin />)
    intersectAll()
    act(() => { tabs()[0].focus() })
    advance(STEP * 3)
    expect(selectedIndex()).toBe(0)
  })

  it('clears every timer on unmount and never updates state afterwards', () => {
    vi.useFakeTimers()
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { unmount } = render(<JornadaBedin />)
    intersectAll()
    advance(STEP)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
    advance(STEP * 5)
    expect(errorSpy).not.toHaveBeenCalled()
    errorSpy.mockRestore()
  })

  it('never autoplays when prefers-reduced-motion is active, but stays clickable', () => {
    setReducedMotion(true)
    vi.useFakeTimers()
    render(<JornadaBedin />)
    intersectAll()
    advance(STEP * 6)
    expect(selectedIndex()).toBe(0)
    expect(vi.getTimerCount()).toBe(0)
    fireEvent.click(tabs()[4])
    expect(selectedIndex()).toBe(4)
  })

  it('keeps every step reachable with animation disabled', () => {
    setReducedMotion(true)
    render(<JornadaBedin />)
    tabs().forEach((tab, i) => {
      fireEvent.click(tab)
      expect(selectedIndex()).toBe(i)
      expect(screen.getAllByRole('tabpanel', { hidden: true })[i]).toHaveAttribute('aria-hidden', 'false')
    })
  })

  it('tracks its WhatsApp CTA with a dedicated origin', () => {
    render(<JornadaBedin />)
    const cta = screen.getByRole('link', { name: /Enviar minha lista no WhatsApp/ })
    expect(cta).toHaveAttribute('href', expect.stringContaining('wa.me/5548998680025'))
    fireEvent.click(cta)
    expect(window.gtag).toHaveBeenCalledWith('event', 'whatsapp_click', expect.objectContaining({ event_label: 'como_funciona_jornada' }))
  })
})
