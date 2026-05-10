import { useEffect, useRef, useState, useCallback } from 'react'

const fallbackReviews = [
  {
    name: 'Alessandro Ferreira',
    date: 'cliente há anos',
    rating: 5,
    text: 'Sobre a Bedin Representação, só tenho uma palavra: gratidão! Há anos tenho parceria com eles e sempre foram muito atenciosos, competentes e prestam um serviço de excelência!'
  },
  {
    name: 'Fernanda Tramontin',
    date: 'um ano atrás',
    rating: 5,
    text: 'Representantes atenciosos e prestativos! A Tainá cuida do nosso atendimento com muito carinho, sempre esclarecendo dúvidas e oferecendo ótimas opções de produtos. Até presente de aniversário ela enviou! Muito satisfeita.'
  },
  {
    name: 'Cristiane Bellé',
    date: 'um ano atrás',
    rating: 5,
    text: 'Minha experiência com a Bedin Representação foi excepcional em todos os aspectos. Desde o primeiro contato, fui recebida com um atendimento impecável. Empresa totalmente transparente, honesta e comprometida em oferecer as melhores soluções.'
  },
  {
    name: 'Rodrigo Schmidt',
    date: 'um ano atrás',
    rating: 5,
    text: 'Empresa séria, comprometida e com um atendimento excepcional! Sempre fomos muito bem atendidos pela Tainá, que é ágil, prestativa e está sempre disposta a nos ajudar.'
  },
  {
    name: 'Steffani Amaral',
    date: '9 meses atrás',
    rating: 5,
    text: 'Empresa abençoada, equipe de colaboradores prestativos e eficientes, tendo um atendimento excelente e comprometimento com os clientes!'
  },
]

const fallbackRating = 4.9
const fallbackTotal = 234

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function renderStars(rating) {
  return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))
}

function translateDate(dateStr) {
  const map = {
    'a year ago': 'um ano atrás',
    'years ago': 'anos atrás',
    'a month ago': 'um mês atrás',
    'months ago': 'meses atrás',
    'a week ago': 'uma semana atrás',
    'weeks ago': 'semanas atrás',
    'a day ago': 'um dia atrás',
    'days ago': 'dias atrás',
  }
  let result = dateStr
  for (const [en, pt] of Object.entries(map)) {
    result = result.replace(en, pt)
  }
  return result
}

export default function Reviews() {
  const headerRef = useRef(null)
  const layoutRef = useRef(null)
  const carouselRef = useRef(null)
  const wrapRef = useRef(null)
  const autoplayRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [reviewData, setReviewData] = useState({
    reviews: fallbackReviews,
    rating: fallbackRating,
    totalReviews: fallbackTotal,
  })

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (data.reviews && data.reviews.length > 0) {
          const apiReviews = data.reviews
            .filter(r => r.text && r.text.length > 20)
            .map(r => ({
              name: r.name,
              photoUrl: r.photoUrl,
              date: translateDate(r.date),
              rating: r.rating,
              text: r.text,
            }))
          // Combine API reviews with fallbacks (avoid duplicates by name)
          const apiNames = new Set(apiReviews.map(r => r.name))
          const extra = fallbackReviews.filter(r => !apiNames.has(r.name))
          const combined = [...apiReviews, ...extra]
          setReviewData({
            reviews: combined,
            rating: data.rating || fallbackRating,
            totalReviews: data.totalReviews || fallbackTotal,
          })
        }
      })
      .catch(() => {})
  }, [])

  const reviews = reviewData.reviews
  const total = reviews.length

  const getVisible = useCallback(() => {
    if (!wrapRef.current) return 3
    const w = wrapRef.current.offsetWidth
    if (w < 600) return 1
    if (w < 1024) return 2
    return 3
  }, [])

  const update = useCallback((idx) => {
    if (!carouselRef.current || !wrapRef.current) return
    const visible = getVisible()
    const gap = 20
    const cardW = (wrapRef.current.offsetWidth - gap * (visible - 1)) / visible
    carouselRef.current.style.transform = `translateX(-${idx * (cardW + gap)}px)`
  }, [getVisible])

  useEffect(() => {
    update(index)
  }, [index, reviews, update])

  useEffect(() => {
    const handleResize = () => {
      const v = getVisible()
      const maxIdx = Math.max(0, total - v)
      const safeIdx = Math.min(index, maxIdx)
      if (safeIdx !== index) setIndex(safeIdx)
      else update(safeIdx)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [index, total, getVisible, update])

  // Autoplay
  useEffect(() => {
    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        setIndex(prev => {
          const v = getVisible()
          const maxIdx = Math.max(0, total - v)
          return prev >= maxIdx ? 0 : prev + 1
        })
      }, 5000)
    }

    startAutoplay()
    return () => clearInterval(autoplayRef.current)
  }, [total, getVisible])

  const handleManualNav = (newIndex) => {
    clearInterval(autoplayRef.current)
    setIndex(newIndex)
    autoplayRef.current = setInterval(() => {
      setIndex(prev => {
        const v = getVisible()
        const maxIdx = Math.max(0, total - v)
        return prev >= maxIdx ? 0 : prev + 1
      })
    }, 5000)
  }

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

  const scoreFormatted = String(reviewData.rating).replace('.', ',')

  return (
    <section className="reviews section">
      <div className="container">
        <div className="sec-header reveal" ref={headerRef}>
          <span className="label">A verdade vem dos lojistas</span>
          <h2 className="sec-title"><span className="accent">Centenas de avaliações no Google.</span> Nota 4,9. Sem campanha. Sem combinação.</h2>
          <p className="sec-sub"><em>Empresa séria não precisa dizer que é. Os clientes dizem por ela.</em></p>
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
            <div className="reviews__panel-score">{scoreFormatted}</div>
            <div className="reviews__panel-count">Baseado em <strong>centenas de avaliações</strong></div>
            <a
              href="https://share.google/ZdruFz4KpnQ1jW6iw"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-filled reviews__panel-btn"
            >
              Ler todas no Google
            </a>
          </div>
          <div className="reviews__carousel-wrap" ref={wrapRef}>
            <div className="reviews__carousel" id="reviewsCarousel" ref={carouselRef}>
              {reviews.map((r, i) => (
                <div className="review-card" key={i}>
                  <div className="review-card__header">
                    {r.photoUrl ? (
                      <img className="review-avatar-img" src={r.photoUrl} alt={r.name} referrerPolicy="no-referrer" />
                    ) : (
                      <div className="review-avatar">{getInitials(r.name)}</div>
                    )}
                    <div>
                      <strong>{r.name}</strong>
                      <span className="review-date">{r.date}</span>
                    </div>
                  </div>
                  <div className="review-stars">{renderStars(r.rating)}</div>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
            <button
              className="reviews__arrow reviews__arrow--prev"
              onClick={() => handleManualNav(Math.max(0, index - 1))}
              disabled={prevDisabled}
              aria-label="Anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button
              className="reviews__arrow reviews__arrow--next"
              onClick={() => handleManualNav(Math.min(total - getVisible(), index + 1))}
              disabled={nextDisabled}
              aria-label="Próximo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="reviews__cta">
          <a
            href="https://wa.me/5548998680025?text=Ol%C3%A1%20Bedin%2C%20quero%20ser%20o%20pr%C3%B3ximo%20depoimento%20de%205%20estrelas!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-filled large"
          >
            Quero ser o próximo depoimento de 5 estrelas
          </a>
        </div>
      </div>
    </section>
  )
}
