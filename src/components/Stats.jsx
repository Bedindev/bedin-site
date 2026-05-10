import { useEffect, useRef } from 'react'

function Counter({ target, prefix, suffix }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const dur = 1800
          const start = performance.now()
          const tick = (now) => {
            const p = Math.min((now - start) / dur, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.round(target * eased).toLocaleString('pt-BR')
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div className="stat-val">
      {prefix && <span className="stat-suffix">{prefix}</span>}
      <span ref={ref}>0</span>
      {suffix && <span className="stat-suffix">{suffix}</span>}
    </div>
  )
}

function RevealWrapper({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div className="reveal" ref={ref}>{children}</div>
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats__header">
          <span className="label">Os números que cabem na sua gôndola</span>
          <h2 className="sec-title">O que <span className="accent">10 anos abastecendo o Brasil</span> acumulou.</h2>
        </div>
        <div className="stats__grid">
          <RevealWrapper>
            <Counter target={234} />
            <div className="stat-label">Avaliações 4,9 estrelas no Google</div>
          </RevealWrapper>
          <RevealWrapper>
            <Counter target={1000} suffix="+" />
            <div className="stat-label">Produtos no catálogo</div>
          </RevealWrapper>
          <RevealWrapper>
            <Counter target={30} />
            <div className="stat-label">Marcas representadas</div>
          </RevealWrapper>
          <RevealWrapper>
            <Counter target={12} />
            <div className="stat-label">Pessoas no time da Bedin</div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
