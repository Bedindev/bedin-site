import { useEffect, useRef } from 'react'

export default function Hero() {
  const revealRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )
    if (revealRef.current) observer.observe(revealRef.current)
    return () => observer.disconnect()
  }, [])

  const handleScroll = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    const header = document.getElementById('header')
    if (target) {
      window.scrollTo({ top: target.offsetTop - (header ? header.offsetHeight : 0) - 12, behavior: 'smooth' })
    }
  }

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow">Empresa familiar desde 2016</span>
          <h1 className="hero__title">
            Produtos naturais<br />para o seu negócio<br />
            <span className="accent">crescer</span>
          </h1>
          <p className="hero__subtitle">
            Mais de 1.000 produtos entre frutas secas, especiarias, grãos e sementes.
            Cotação gratuita. Frete negociado. Atendimento em todo o Brasil.
          </p>
          <div className="hero__ctas">
            <a href="#cotacao" className="btn btn-filled large" onClick={e => handleScroll(e, '#cotacao')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Solicitar cotação gratuita
            </a>
            <a href="#produtos" className="btn btn-ghost-white" onClick={e => handleScroll(e, '#produtos')}>Ver produtos</a>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__img-wrap reveal" ref={revealRef}>
            <img src="/imagem hero.png" alt="Produtos naturais: grãos, sementes e especiarias" />
            <div className="hero__img-glass">
              <div className="glass-number">+30</div>
              <div className="glass-label">Fornecedores</div>
            </div>
            <div className="hero__harvest-badge">
              <span className="num">+1k</span>
              <span className="txt">produtos</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__wave">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none">
          <path d="M0,32 C480,64 960,0 1440,32 L1440,64 L0,64 Z" fill="#f9f9f7"/>
        </svg>
      </div>
    </section>
  )
}
