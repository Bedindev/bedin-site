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
      title: 'Cotação gratuita',
      desc: 'Solicite quantas cotações precisar, sem custo. Respondemos em até 24 horas úteis.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      title: '+1.000 produtos',
      desc: 'Amplo portfólio de produtos naturais: frutas secas, especiarias, grãos, sementes e muito mais.'
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
      title: '+30 fornecedores',
      desc: 'Parceria com os melhores fornecedores do segmento natural para garantir qualidade e disponibilidade.'
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
      title: 'Frete negociado',
      desc: 'Negociamos o melhor frete para todo o Brasil, reduzindo custos logísticos para sua empresa.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: 'Atendimento rápido',
      desc: 'Time ágil e comprometido. Você nunca fica sem resposta quando precisa de uma solução rápida.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      ),
      title: 'Empresa familiar',
      desc: 'Fundada em 2016 com valores de confiança, transparência e compromisso com cada cliente.'
    }
  ]

  return (
    <section className="features section" id="diferenciais">
      <div className="container">
        <div className="sec-header reveal" ref={headerRef}>
          <span className="label">Por que nos escolher</span>
          <h2 className="sec-title">Dê um chute no <span className="accent">desperdício</span></h2>
          <p className="sec-sub">Conectamos seu negócio aos melhores produtos naturais do Brasil, com agilidade e preço justo.</p>
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
