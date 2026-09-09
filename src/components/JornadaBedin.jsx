import { useCallback, useEffect, useRef, useState } from 'react'
import { trackWhatsApp } from '../analytics'
import { Reveal } from './Reveal'
import WhatsAppIcon, { whatsappLink } from './WhatsAppIcon'

export const JORNADA_INTERVAL_MS = 2800

export const JORNADA_STEPS = [
  {
    id: 'lista',
    short: 'Envie sua lista',
    title: 'Envie sua lista',
    text: 'Mande pelo WhatsApp os produtos e as quantidades de que sua loja precisa.',
  },
  {
    id: 'comparacao',
    short: 'Comparamos',
    title: 'Comparamos as opções',
    text: 'A Bedin consulta os fornecedores parceiros e organiza preços, disponibilidade e condições para facilitar sua escolha.',
  },
  {
    id: 'frete',
    short: 'Frete',
    title: 'Avaliamos o frete',
    text: 'Buscamos opções de transporte, prazo e custo para você analisar a compra completa antes de confirmar.',
  },
  {
    id: 'pedido',
    short: 'Pedido',
    title: 'Acompanhamos o pedido',
    text: 'Nossa equipe acompanha nota fiscal, transportadora, previsão e andamento do pedido.',
  },
  {
    id: 'suporte',
    short: 'Suporte',
    title: 'Suporte até a entrega',
    text: 'Você recebe atualizações e conta com atendimento humano se surgir qualquer dúvida, atraso, avaria ou problema.',
  },
]

const WA_MESSAGE = 'Olá, vim pelo site da Bedin e quero enviar uma lista para cotação.'

const svgProps = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false' }

function StepIcon({ id }) {
  switch (id) {
    case 'lista':
      return <svg {...svgProps}><path d="M4 5h16M4 12h10M4 19h7" /><path d="M17 16l2 2 4-4" /></svg>
    case 'comparacao':
      return <svg {...svgProps}><rect x="3" y="4" width="7" height="16" rx="1.5" /><rect x="14" y="4" width="7" height="16" rx="1.5" /><path d="M6.5 9h0M6.5 13h0M17.5 9h0M17.5 13h0" strokeWidth="2.4" /></svg>
    case 'frete':
      return <svg {...svgProps}><rect x="1.5" y="6" width="13" height="10" rx="1.5" /><path d="M14.5 9h4l3 3.5V16h-7z" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></svg>
    case 'pedido':
      return <svg {...svgProps}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 14l2 2 4-4" /></svg>
    default:
      return <svg {...svgProps}><path d="M21 12a8 8 0 01-11.6 7.1L4 20l1.1-4.4A8 8 0 1121 12z" /><path d="M9 12h0M12 12h0M15 12h0" strokeWidth="2.6" /></svg>
  }
}

function CheckIcon() {
  return <svg {...svgProps} strokeWidth="2.4"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
}

function StepVisual({ id }) {
  switch (id) {
    case 'lista':
      return (
        <div className="mock mock--chat">
          <div className="mock__head"><span className="mock__avatar">L</span><span>Sua lista · WhatsApp</span></div>
          <div className="mock__bubble">
            <ul>
              <li>Chia · 20 kg</li>
              <li>Uva-passa · 30 kg</li>
              <li>Castanha-de-caju · 10 kg</li>
              <li>Cúrcuma em pó · 5 kg</li>
            </ul>
            <span className="mock__sent">Enviado ✓✓</span>
          </div>
        </div>
      )
    case 'comparacao':
      return (
        <div className="mock mock--compare">
          <div className="mock__head">Opções organizadas</div>
          <ul className="mock__options">
            <li><span className="mock__option-name">Fornecedor A</span><span className="mock__tag mock__tag--green">Melhor preço</span></li>
            <li><span className="mock__option-name">Fornecedor B</span><span className="mock__tag">Pronta entrega</span></li>
            <li><span className="mock__option-name">Fornecedor C</span><span className="mock__tag mock__tag--warm">Melhor condição</span></li>
          </ul>
          <div className="mock__legend"><span>Preço</span><span>Disponibilidade</span><span>Condições</span></div>
        </div>
      )
    case 'frete':
      return (
        <div className="mock mock--frete">
          <div className="mock__head"><span className="mock__truck"><StepIcon id="frete" /></span>Cotação rápida de frete</div>
          <ul className="mock__options">
            <li><span className="mock__option-name">Opção 1</span><span className="mock__tag mock__tag--green">Menor custo</span></li>
            <li><span className="mock__option-name">Opção 2</span><span className="mock__tag">Entrega mais rápida</span></li>
          </ul>
          <div className="mock__legend"><span>Transporte</span><span>Prazo</span><span>Custo</span></div>
        </div>
      )
    case 'pedido':
      return (
        <div className="mock mock--status">
          <div className="mock__head">Andamento do pedido</div>
          <ul className="mock__checks">
            <li className="is-done"><CheckIcon />Pedido confirmado</li>
            <li className="is-done"><CheckIcon />Nota fiscal emitida</li>
            <li className="is-current"><span className="mock__dot" />Em transporte</li>
          </ul>
        </div>
      )
    default:
      return (
        <div className="mock mock--status">
          <div className="mock__head">Até a entrega</div>
          <ul className="mock__checks">
            <li className="is-done"><CheckIcon />Entrega acompanhada</li>
            <li className="is-current"><span className="mock__wa"><WhatsAppIcon size={12} /></span>Suporte disponível</li>
            <li className="is-done"><CheckIcon />Pedido concluído</li>
          </ul>
        </div>
      )
  }
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function JornadaBedin({ interval = JORNADA_INTERVAL_MS }) {
  const trackRef = useRef(null)
  const tabRefs = useRef([])
  const [active, setActive] = useState(0)
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const [manual, setManual] = useState(false)
  const [reduced, setReduced] = useState(prefersReducedMotion)
  const total = JORNADA_STEPS.length
  const last = total - 1

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    if (mq.addEventListener) mq.addEventListener('change', onChange)
    else mq.addListener(onChange)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange)
      else mq.removeListener(onChange)
    }
  }, [])

  // Autoplay is armed only once the step track is actually on screen.
  useEffect(() => {
    const el = trackRef.current
    if (!el || started || reduced || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started, reduced])

  // One timeout per step; cleanup on every dependency change guarantees no timer
  // survives a pause, a manual selection, or an unmount.
  useEffect(() => {
    if (!started || reduced || manual || paused || active >= last) return
    const timer = setTimeout(() => setActive(a => Math.min(a + 1, last)), interval)
    return () => clearTimeout(timer)
  }, [started, reduced, manual, paused, active, last, interval])

  const select = useCallback(i => {
    setManual(true)
    setActive(i)
  }, [])

  const onKeyDown = (e, i) => {
    let next = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % total
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + total) % total
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    select(next)
    const tab = tabRefs.current[next]
    if (tab) tab.focus()
  }

  const onBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
  }

  const progress = last > 0 ? (active / last) * 100 : 0
  const current = JORNADA_STEPS[active]

  return (
    <section className="jornada section" id="como-funciona" aria-labelledby="jornada-title">
      <div className="container">
        <Reveal className="sec-header">
          <span className="label">Como funciona</span>
          <h2 className="sec-title" id="jornada-title">
            Da sua lista à entrega, <span className="accent">a Bedin acompanha cada etapa</span>.
          </h2>
          <p className="sec-sub">Uma jornada simples para você comprar melhor e gastar menos tempo acompanhando fornecedores.</p>
        </Reveal>

        {/* Autoplay pauses while a step has keyboard focus or the pointer hovers the step
            track (intent to pick a step). A pointer merely resting on the panel must not pause it. */}
        <div className="jornada__player" onFocus={() => setPaused(true)} onBlur={onBlur}>
          <p className="jornada__status" aria-live="polite">
            Etapa <strong>{active + 1}</strong> de {total} · {current.title}
          </p>

          <div
            className="jornada__track"
            ref={trackRef}
            role="tablist"
            aria-label="Etapas do atendimento Bedin"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            <div className="jornada__line" aria-hidden="true">
              <span className="jornada__line-fill" style={{ width: `${progress}%` }} />
            </div>
            {JORNADA_STEPS.map((step, i) => {
              const state = i < active ? 'done' : i === active ? 'active' : 'todo'
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  id={`jornada-tab-${step.id}`}
                  aria-selected={i === active}
                  aria-controls={`jornada-panel-${step.id}`}
                  className={`jornada__step is-${state}`}
                  data-state={state}
                  onClick={() => select(i)}
                  onKeyDown={e => onKeyDown(e, i)}
                  ref={el => { tabRefs.current[i] = el }}
                >
                  <span className="jornada__step-icon">
                    {state === 'done' ? <CheckIcon /> : <StepIcon id={step.id} />}
                    <span className="jornada__step-num" aria-hidden="true">{i + 1}</span>
                  </span>
                  <span className="jornada__step-label">{step.short}</span>
                  <span className="sr-only">
                    {state === 'done' ? ' (etapa concluída)' : state === 'active' ? ' (etapa atual)' : ''}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="jornada__panels">
            {JORNADA_STEPS.map((step, i) => (
              <div
                key={step.id}
                role="tabpanel"
                id={`jornada-panel-${step.id}`}
                aria-labelledby={`jornada-tab-${step.id}`}
                aria-hidden={i !== active}
                className={`jornada__panel${i === active ? ' is-active' : ''}`}
              >
                <div className="jornada__panel-text">
                  <span className="jornada__panel-step">Etapa {i + 1} de {total}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <div className="jornada__panel-visual" aria-hidden="true">
                  <StepVisual id={step.id} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Reveal className="jornada__cta">
          <a
            href={whatsappLink(WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-filled large"
            onClick={() => trackWhatsApp('como_funciona_jornada')}
          >
            <WhatsAppIcon />
            Enviar minha lista no WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  )
}
