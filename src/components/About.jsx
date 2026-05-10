import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

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
              <div className="year-txt">Outubro de 2016<br />Grande Florianópolis, SC</div>
            </div>
          </div>
          <div className="about__content reveal" ref={contentRef}>
            <span className="label">Nossa história</span>
            <h2 className="sec-title">Em 2016, <span className="accent">Jean e Juli começaram com uma decisão</span>: lojista bem atendido vira parceiro pra vida.</h2>
            <p className="about__lead">
              A Bedin nasceu em outubro de 2016, com Jean e Juli prospectando lojistas pela Grande Florianópolis. Dez anos depois somos 12 pessoas no time, com mais de 30 fornecedores parceiros e mais de 200 empresas atendidas todo mês. Não foi sorte. Foi escolha: servir antes de vender.
            </p>
            <div className="about__cta">
              <Link to="/sobre" className="btn btn-filled large">Conhecer a história completa →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
