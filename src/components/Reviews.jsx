import { useEffect, useRef, useState } from 'react'

const reviews = [
  {
    initials: 'CB',
    name: 'Cristiane Bellé',
    date: 'um ano atrás',
    text: '"Minha experiência com a Bedin Representações foi excepcional em todos os aspectos. Desde o primeiro contato, fui recebida com um atendimento impecável. Empresa totalmente transparente, honesta e comprometida em oferecer as melhores soluções."'
  },
  {
    initials: 'FT',
    name: 'Fernanda Tramontin',
    date: 'um ano atrás',
    text: '"Representantes atenciosos e prestativos! A Tainá cuida do nosso atendimento com muito carinho, sempre esclarecendo dúvidas e oferecendo ótimas opções de produtos. Até presente de aniversário ela enviou! Muito satisfeita."'
  },
  {
    initials: 'RS',
    name: 'Rodrigo Schmidt',
    date: 'um ano atrás',
    text: '"Empresa séria, comprometida e com um atendimento excepcional! Sempre fomos muito bem atendidos pela Tainá, que é ágil, prestativa e está sempre disposta a nos ajudar."'
  },
  {
    initials: 'GS',
    name: 'Gabriel Silva',
    date: 'um ano atrás',
    text: '"Experiência sensacional com a Bedin, atendimento ultra-especializado. Já faço negócios há 2 anos. Indico sem medo!!!"'
  },
  {
    initials: 'AF',
    name: 'Alessandro Ferreira',
    date: 'um ano atrás',
    text: '"Sobre a Bedin representação, só tenho uma palavra: gratidão! Há anos tenho parceria com eles e sempre foram muito atenciosos, competentes e prestam um serviço de excelência!"'
  },
  {
    initials: 'CA',
    name: 'Camilly Almeida',
    date: 'um ano atrás',
    text: '"Os colaboradores são dedicados e atenciosos. Os produtos naturais são de ótima qualidade, dá para sentir o cuidado em cada detalhe. Continuem assim!"'
  },
  {
    initials: 'SA',
    name: 'Steffani Amaral',
    date: '9 meses atrás',
    text: '"Empresa abençoada, equipe de colaboradores prestativos e eficientes, tendo um atendimento excelente e comprometimento com os clientes!"'
  },
  {
    initials: 'RC',
    name: 'Raquel Córdova',
    date: 'um ano atrás',
    text: '"O diferencial da Bedin é ter valores e princípios como pilar de sustentação, o que a faz ser destaque. Produtos de ótima qualidade e atendimento impecável!"'
  },
]

export default function Reviews() {
  const headerRef = useRef(null)
  const layoutRef = useRef(null)
  const carouselRef = useRef(null)
  const wrapRef = useRef(null)
  const [index, setIndex] = useState(0)
  const total = reviews.length

  const getVisible = () => {
    if (!wrapRef.current) return 3
    const w = wrapRef.current.offsetWidth
    if (w < 600) return 1
    if (w < 1024) return 2
    return 3
  }

  const update = (idx) => {
    if (!carouselRef.current || !wrapRef.current) return
    const visible = getVisible()
    const gap = 20
    const cardW = (wrapRef.current.offsetWidth - gap * (visible - 1)) / visible
    carouselRef.current.style.transform = `translateX(-${idx * (cardW + gap)}px)`
  }

  useEffect(() => {
    update(index)
  }, [index])

  useEffect(() => {
    const handleResize = () => {
      const v = getVisible()
      const safeIdx = Math.max(0, Math.min(index, total - v))
      if (safeIdx !== index) setIndex(safeIdx)
      else update(safeIdx)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [index])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    if (layoutRef.current) observer.observe(layoutRef.current)
    return () => observer.disconnect()
  }, [])

  const visible = getVisible()
  const prevDisabled = index === 0
  const nextDisabled = index >= total - visible

  return (
    <section className="reviews section">
      <div className="container">
        <div className="sec-header reveal" ref={headerRef}>
          <span className="label">Histórias de sucesso e confiança</span>
          <h2 className="sec-title">O que nossos <span className="accent">clientes dizem</span></h2>
        </div>
        <div className="reviews__layout reveal" ref={layoutRef}>
          <div className="reviews__panel">
            <div className="reviews__panel-logo">
              <svg width="28" height="28" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </div>
            <div className="reviews__panel-label">EXCELENTE</div>
            <div className="reviews__panel-stars">★★★★★</div>
            <div className="reviews__panel-score">4,9</div>
            <div className="reviews__panel-count">Baseado em <strong>234 avaliações</strong></div>
            <a
              href="https://share.google/ZdruFz4KpnQ1jW6iw"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-filled reviews__panel-btn"
            >
              Avalie-nos no Google
            </a>
          </div>
          <div className="reviews__carousel-wrap" ref={wrapRef}>
            <div className="reviews__carousel" id="reviewsCarousel" ref={carouselRef}>
              {reviews.map((r, i) => (
                <div className="review-card" key={i}>
                  <div className="review-card__header">
                    <div className="review-avatar">{r.initials}</div>
                    <div>
                      <strong>{r.name}</strong>
                      <span className="review-date">{r.date}</span>
                    </div>
                  </div>
                  <div className="review-stars">★★★★★</div>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
            <button
              className="reviews__arrow reviews__arrow--prev"
              onClick={() => setIndex(i => Math.max(0, i - 1))}
              disabled={prevDisabled}
              aria-label="Anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button
              className="reviews__arrow reviews__arrow--next"
              onClick={() => setIndex(i => Math.min(total - getVisible(), i + 1))}
              disabled={nextDisabled}
              aria-label="Próximo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
