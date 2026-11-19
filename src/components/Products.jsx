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
  { img: '/Frutas secas.png', name: 'Frutas secas', desc: 'Uva passa, damasco, tâmara, ameixa e cranberry. É a categoria de maior giro no varejo natural.' },
  { img: '/especiarias.png', name: 'Especiarias', desc: 'Pimenta, canela, cúrcuma, gengibre e noz-moscada, em embalagem de varejo e a granel.' },
  { img: '/grãos.png', name: 'Grãos', desc: 'Quinoa, amaranto, trigo, aveia, cevada e cereais integrais. Itens de compra recorrente.' },
  { img: '/sementes.png', name: 'Sementes', desc: 'Chia, linhaça, girassol, abóbora e gergelim. Linha básica, presente em toda loja do setor.' },
  { img: '/chas.png', name: 'Chás', desc: 'Ervas medicinais, funcionais e blends. Demanda distribuída ao longo do ano.' },
  { img: '/chips.png', name: 'Chips', desc: 'Frutas, legumes e vegetais desidratados. Categoria em expansão no varejo natural.' },
  { img: '/drageados.png', name: 'Drageados', desc: 'Castanhas e frutas cobertas com chocolate. Produto de ponto de venda e compra por impulso.' },
  { img: '/farinaceos.png', name: 'Farináceos', desc: 'Farinhas especiais, amidos e misturas para panificação, incluindo linhas sem glúten.' },
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
          <span className="label">Portfólio</span>
          <h2 className="sec-title">Oito categorias, <span className="accent">mais de 1.000 itens em catálogo</span>.</h2>
          <p className="sec-sub">O catálogo cobre da matéria-prima ao produto embalado para gôndola. O pedido é montado conforme a necessidade da loja e entregue em uma única operação.</p>
        </div>
        <div className="products__grid">
          {categories.map((cat, i) => (
            <RevealCard key={i}>
              <div className="cat-icon"><img src={cat.img} alt={cat.name} width="120" height="120" /></div>
              <div className="cat-card__body">
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </div>
            </RevealCard>
          ))}
        </div>
        <div className="products__cta reveal" ref={ctaRef}>
          <a href="#cotacao" className="btn btn-filled" onClick={handleScroll}>Solicitar cotação</a>
        </div>
      </div>
    </section>
  )
}
