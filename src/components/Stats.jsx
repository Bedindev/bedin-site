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
        <div className="stats__grid">
          <RevealWrapper>
            <Counter target={1000} suffix="+" />
            <div className="stat-label">Produtos disponíveis</div>
          </RevealWrapper>
          <RevealWrapper>
            <Counter target={30} prefix="+" />
            <div className="stat-label">Fornecedores parceiros</div>
          </RevealWrapper>
          <RevealWrapper>
            <Counter target={8} />
            <div className="stat-label">Anos de mercado</div>
          </RevealWrapper>
          <RevealWrapper>
            <Counter target={100} suffix="%" />
            <div className="stat-label">Cotação gratuita</div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
