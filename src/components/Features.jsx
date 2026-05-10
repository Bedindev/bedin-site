import { useEffect, useRef } from 'react'

function useReveal(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

function RevealCard({ children, className }) {
  const ref = useRef(null)
  useReveal(ref)
  return <div className={`${className} reveal`} ref={ref}>{children}</div>
}

export default function Features() {
  const headerRef = useRef(null)
  useReveal(headerRef)

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
          <rect x="9" y="3" width="6" height="4" rx="1"/>
          <path d="M9 12h6M9 16h4"/>
        </svg>
      ),
      title: 'Cotação em 24h, sem custo',
      desc: 'Você manda no WhatsApp, a gente devolve com preço, prazo e disponibilidade no próximo dia útil. Sem reunião, sem proposta de quatro páginas.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      title: '30 marcas, um único contato',
      desc: 'Em vez de gerenciar 30 representantes diferentes, você fala com a Bedin. A gente cuida do resto: pedido, frete, follow-up, lançamento.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87"/>
          <path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
      title: 'Frete negociado pro Brasil inteiro',
      desc: 'Pedido consolidado entre marcas reduz seu custo logístico e acelera a reposição. Da Bahia ao Rio Grande do Sul, entrega que cabe na sua margem.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" rx="1"/>
          <path d="M16 8h4l3 5v3h-7V8z"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      title: 'Mix completo, sem furo de gôndola',
      desc: '8 categorias e mais de 1.000 SKUs: frutas secas, especiarias, grãos, sementes, chás, chips, drageados e farináceos. Você nunca diz "não tenho" pro seu cliente.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: 'Atendimento que tem nome',
      desc: 'Jean, Juli e o time de 12 pessoas. Você não fala com bot. Você fala com gente que sabe o nome da sua loja e o que você comprou no mês passado.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      ),
      title: 'Empresa familiar, decisão familiar',
      desc: 'Fundada por Jean e Juli em outubro de 2016. Quando você precisa de uma exceção comercial, a resposta vem rápido, porque quem decide está do outro lado do WhatsApp.'
    }
  ]

  return (
    <section className="features section" id="diferenciais">
      <div className="container">
        <div className="sec-header reveal" ref={headerRef}>
          <span className="label">Por que lojistas ficam</span>
          <h2 className="sec-title">O que muda na sua loja com a <span className="accent">Bedin do seu lado</span>.</h2>
          <p className="sec-sub">A gente não vende produto. A gente vende previsibilidade pra sua gôndola, pra você focar em vender e não em correr atrás de fornecedor.</p>
        </div>
        <div className="features__grid">
          {features.map((f, i) => (
            <RevealCard key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  )
}
