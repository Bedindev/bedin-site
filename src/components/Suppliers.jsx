import { useEffect, useRef } from 'react'

const logos = [
  { src: '/logos-fornecedores/forncedor-amazonia.png', alt: 'Amazônia' },
  { src: '/logos-fornecedores/fornecedor-Nuttini.png', alt: 'Nuttini' },
  { src: '/logos-fornecedores/fornecedor-banto.png', alt: 'Banto' },
  { src: '/logos-fornecedores/fornecedor-brasbol.png', alt: 'Brasbol' },
  { src: '/logos-fornecedores/fornecedor-brasil-ervas.png', alt: 'Brasil Ervas' },
  { src: '/logos-fornecedores/fornecedor-brasnutt.png', alt: 'Brasnutt' },
  { src: '/logos-fornecedores/fornecedor-castanhas-ouro-verde.png', alt: 'Castanhas Ouro Verde' },
  { src: '/logos-fornecedores/fornecedor-ceara.png', alt: 'Ceará' },
  { src: '/logos-fornecedores/fornecedor-costa.png', alt: 'Costa' },
  { src: '/logos-fornecedores/fornecedor-cs.png', alt: 'CS' },
  { src: '/logos-fornecedores/fornecedor-dicaju.png', alt: 'Dicaju' },
  { src: '/logos-fornecedores/fornecedor-divinut.png', alt: 'Divinut' },
  { src: '/logos-fornecedores/fornecedor-elmar.png', alt: 'Elmar' },
  { src: '/logos-fornecedores/fornecedor-gramore.png', alt: 'Gramore' },
  { src: '/logos-fornecedores/fornecedor-granne.png', alt: 'Granne' },
  { src: '/logos-fornecedores/fornecedor-granvital.png', alt: 'Granvital' },
  { src: '/logos-fornecedores/fornecedor-iberica.png', alt: 'Ibérica' },
  { src: '/logos-fornecedores/fornecedor-icau.png', alt: 'Icaú' },
  { src: '/logos-fornecedores/fornecedor-jandira-reserva.png', alt: 'Jandira Reserva' },
  { src: '/logos-fornecedores/fornecedor-jandira.png', alt: 'Jandira' },
  { src: '/logos-fornecedores/fornecedor-jtc.png', alt: 'JTC' },
  { src: '/logos-fornecedores/fornecedor-jutica.png', alt: 'Jutica' },
  { src: '/logos-fornecedores/fornecedor-leryc.png', alt: 'Leryc' },
  { src: '/logos-fornecedores/fornecedor-letha.png', alt: 'Letha' },
  { src: '/logos-fornecedores/fornecedor-nl.png', alt: 'NL' },
  { src: '/logos-fornecedores/fornecedor-polico.png', alt: 'Polico' },
  { src: '/logos-fornecedores/fornecedor-sacredoux.png', alt: 'Sacredoux' },
  { src: '/logos-fornecedores/fornecedor-vida-em-graos.png', alt: 'Vida em Grãos' },
  { src: '/logos-fornecedores/fornecedor-vimacedo.png', alt: 'Vimacedo' },
  { src: '/logos-fornecedores/fornecedro-suprema.png', alt: 'Suprema' },
]

export default function Suppliers() {
  const headerRef = useRef(null)

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
    return () => observer.disconnect()
  }, [])

  return (
    <section className="suppliers">
      <div className="suppliers__header reveal" ref={headerRef}>
        <span className="label">Quem está por trás da sua gôndola</span>
        <h2 className="sec-title"><span className="accent">30 marcas selecionadas.</span> Uma curadoria construída em 10 anos.</h2>
        <p className="sec-sub">Cada marca foi escolhida por qualidade comprovada, regularidade de entrega e potencial de giro no varejo natural. Você compra de quem a gente compraria.</p>
      </div>
      <div className="marquee-wrap">
        <div className="marquee-track">
          <div className="marquee-inner" aria-hidden="false">
            {logos.map((l, i) => (
              <div className="logo-item" key={i}>
                <img src={l.src} alt={l.alt} />
              </div>
            ))}
          </div>
          <div className="marquee-inner" aria-hidden="true">
            {logos.map((l, i) => (
              <div className="logo-item" key={`dup-${i}`}>
                <img src={l.src} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="suppliers__cta">
        <a
          href="https://wa.me/5548998680025?text=Ol%C3%A1%20Bedin%2C%20quero%20receber%20a%20lista%20completa%20das%2030%20marcas%20representadas!"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-filled large"
        >
          Receber a lista completa das 30 marcas no WhatsApp
        </a>
      </div>
    </section>
  )
}
