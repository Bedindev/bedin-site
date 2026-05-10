import { useEffect, useRef } from 'react'

function RevealCard({ children }) {
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
  return <div className="cat-card reveal" ref={ref}>{children}</div>
}

const categories = [
  { img: '/Frutas secas.png', name: 'Frutas Secas', desc: 'Uva passa, damasco, tâmara, ameixa, cranberry e mais. A categoria que mais gira no varejo natural.' },
  { img: '/especiarias.png', name: 'Especiarias', desc: 'Pimenta, canela, cúrcuma, gengibre, noz-moscada. Margem alta, ticket fácil.' },
  { img: '/grãos.png', name: 'Grãos', desc: 'Quinoa, amaranto, trigo, aveia, cevada e cereais integrais. Compra recorrente, cliente fiel.' },
  { img: '/sementes.png', name: 'Sementes', desc: 'Chia, linhaça, girassol, abóbora, gergelim. O básico que toda loja natural tem que ter sempre.' },
  { img: '/chas.png', name: 'Chás', desc: 'Ervas medicinais, funcionais e blends especiais. Sazonalidade que rende o ano inteiro.' },
  { img: '/chips.png', name: 'Chips', desc: 'Chips de frutas, legumes e vegetais desidratados. Categoria nova, espaço pra crescer.' },
  { img: '/drageados.png', name: 'Drageados', desc: 'Castanhas e frutas cobertas com chocolate. Impulso de balcão, ticket extra.' },
  { img: '/farinaceos.png', name: 'Farináceos', desc: 'Farinhas especiais, amidos e misturas pra panificação. Pega a onda da panificação saudável.' },
]

export default function Products() {
  const headerRef = useRef(null)
  const ctaRef = useRef(null)

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
    if (ctaRef.current) observer.observe(ctaRef.current)
    return () => observer.disconnect()
  }, [])

  const handleScroll = (e) => {
    e.preventDefault()
    const target = document.querySelector('#cotacao')
    const header = document.getElementById('header')
    if (target) {
      window.scrollTo({ top: target.offsetTop - (header ? header.offsetHeight : 0) - 12, behavior: 'smooth' })
    }
  }

  return (
    <section className="products section" id="produtos">
      <div className="container">
        <div className="sec-header reveal" ref={headerRef}>
          <span className="label">O que sua loja precisa</span>
          <h2 className="sec-title"><span className="accent">8 categorias.</span><br />Mais de 1.000 produtos.</h2>
          <p className="sec-sub">Da matéria-prima ao produto pronto pra gôndola. Você monta o pedido como sua loja precisa e a Bedin entrega tudo junto.</p>
        </div>
        <div className="products__grid">
          {categories.map((cat, i) => (
            <RevealCard key={i}>
              <div className="cat-icon"><img src={cat.img} alt={cat.name} /></div>
              <div className="cat-card__body">
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </div>
            </RevealCard>
          ))}
        </div>
        <div className="products__cta reveal" ref={ctaRef}>
          <a href="#cotacao" className="btn btn-filled large" onClick={handleScroll}>Solicitar cotação dos produtos</a>
        </div>
      </div>
    </section>
  )
}
