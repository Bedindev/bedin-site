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
              <div className="year-txt">Outubro de 2016<br />Biguaçu, SC</div>
            </div>
          </div>
          <div className="about__content reveal" ref={contentRef}>
            <span className="label">Nossa história</span>
            <h2 className="sec-title">Em 2016, <span className="accent">Jean e Juli começaram com uma decisão</span>: lojista bem atendido vira parceiro pra vida.</h2>
            <p className="about__lead">
              A Bedin Representação nasceu em outubro de 2016 em Biguaçu, Santa Catarina, fundada pelo casal Jean Carlos Bedin e Juli Bedin. A gente começou pequeno, atendendo lojas da Grande Florianópolis. Dez anos depois somos 12 pessoas no time, com 30 marcas representadas, mais de 1.000 produtos no catálogo e mais de 234 lojistas que avaliaram nosso trabalho com nota 4,9 no Google. Nada disso aconteceu por acaso. Aconteceu porque escolhemos servir antes de vender, e isso virou o que nos diferencia.
            </p>
            <div className="about__vision">
              <h3>Onde queremos chegar até 2030: <strong>10 mil empresas atendidas todo mês.</strong></h3>
              <p>Não é meta de vaidade. É um compromisso público. A gente vai crescer junto com você.</p>
            </div>
            <div className="about__values-table">
              <h4>Nossos valores · o que isso significa pra você</h4>
              <ul>
                <li><strong>Servir</strong><span>Você vem antes da venda. Sempre.</span></li>
                <li><strong>Pontualidade</strong><span>Pedido sai na data combinada. Sem desculpa.</span></li>
                <li><strong>Ética</strong><span>Mesmo preço, mesma condição, com ou sem você olhando.</span></li>
                <li><strong>Autoresponsabilidade</strong><span>Erro nosso é problema nosso. Você não paga por ele.</span></li>
                <li><strong>Proatividade</strong><span>A gente avisa antes do estoque acabar.</span></li>
                <li><strong>Meritocracia</strong><span>Quem trabalha melhor pra você é quem te atende.</span></li>
                <li><strong>Gratidão</strong><span>Cada lojista que confia na gente é razão pra fazer melhor amanhã.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
