import { useEffect, useRef } from 'react'

export default function About() {
  const imgRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )
    if (imgRef.current) observer.observe(imgRef.current)
    if (contentRef.current) observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about section" id="sobre">
      <div className="container">
        <div className="about__grid">
          <div className="about__img-wrap reveal" ref={imgRef}>
            <img src="/imagem familia.png" alt="Família Bedin" />
            <div className="about__badge">
              <div className="year-num">2016</div>
              <div className="year-txt">Fundada em<br />Biguaçu, SC</div>
            </div>
          </div>
          <div className="about__content reveal" ref={contentRef}>
            <span className="label">Nossa história</span>
            <h2 className="sec-title">Uma família dedicada<br />a <span className="accent">produtos naturais</span></h2>
            <p className="about__lead">
              Em outubro de 2016, Jean Carlos Bedin e Juli Bedin fundaram a Bedin Representação com um objetivo claro: conectar empresas de todo o Brasil aos melhores produtos naturais do mercado.
            </p>
            <div className="about__values">
              <div className="val-row">
                <div className="val-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <div>
                  <strong>Missão</strong>
                  <p>Gerar oportunidades de crescimento para todos os nossos parceiros através da forma que servimos.</p>
                </div>
              </div>
              <div className="val-row">
                <div className="val-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <div>
                  <strong>Visão</strong>
                  <p>Atender mensalmente 10 mil empresas até 2030.</p>
                </div>
              </div>
              <div className="val-row">
                <div className="val-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <div>
                  <strong>Valores</strong>
                  <p>Ética, Meritocracia, Pontualidade, Autoresponsabilidade, Proatividade, Gratidão e Servir.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
