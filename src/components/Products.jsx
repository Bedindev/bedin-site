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
  { img: '/Frutas secas.png', name: 'Frutas Secas', desc: 'Uva passa, damasco, tâmara, ameixa, cranberry e mais' },
  { img: '/especiarias.png', name: 'Especiarias', desc: 'Pimenta, canela, cúrcuma, gengibre, noz-moscada' },
  { img: '/grãos.png', name: 'Grãos', desc: 'Quinoa, amaranto, trigo, aveia, cevada e cereais integrais' },
  { img: '/sementes.png', name: 'Sementes', desc: 'Chia, linhaça, girassol, abóbora, gergelim' },
  { img: '/chas.png', name: 'Chás', desc: 'Ervas medicinais, funcionais e blends especiais' },
  { img: '/chips.png', name: 'Chips', desc: 'Chips de frutas, legumes e vegetais desidratados' },
  { img: '/drageados.png', name: 'Drageados', desc: 'Castanhas e frutas cobertas com chocolate' },
  { img: '/farinaceos.png', name: 'Farináceos', desc: 'Farinhas especiais, amidos e misturas para panificação' },
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
          <span className="label">Nosso portfólio</span>
          <h2 className="sec-title">Mais de <span className="accent">1.000 produtos</span><br />em 8 categorias</h2>
          <p className="sec-sub">Da matéria-prima ao produto pronto, tudo que seu negócio precisa.</p>
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
