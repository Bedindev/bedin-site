import { useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'

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

function Reveal({ children, as: Tag = 'div', className = '' }) {
  const ref = useRef(null)
  useReveal(ref)
  return <Tag ref={ref} className={`${className} reveal`.trim()}>{children}</Tag>
}

const timeline = [
  {
    year: '2016',
    title: 'Onde tudo começou',
    text: 'Outubro de 2016. Jean Carlos Bedin e Juli Bedin saem de Concórdia rumo a São José (SC), bairro Cobrasol, pra representar uma empresa de produtos naturais. Começam prospectando lojas naturais com GPS na mão pela Grande Florianópolis e sul do estado.'
  },
  {
    year: '2019',
    title: 'Boca a boca e crescimento solo',
    text: 'Três anos de operação enxuta. A Bedin já atende cerca de 200 lojistas, e Jean e Juli percebem que tocar tudo a dois está virando gargalo: precisam de mais gente pra continuar entregando o atendimento que se tornou marca registrada.'
  },
  {
    year: '2020',
    title: 'Escritório em Biguaçu e os primeiros do time',
    text: 'A família se muda pra Biguaçu (SC) e abre o primeiro escritório próprio. Mesmo no ano da pandemia, a Bedin contrata os dois primeiros colaboradores pra reforçar o atendimento aos lojistas.'
  },
  {
    year: '2021–2025',
    title: 'Expansão do time e quatro escritórios',
    text: 'Cinco anos de crescimento contínuo. O time vai aumentando, a Bedin troca de escritório quatro vezes pra acompanhar a operação, e a curadoria de fornecedores passa a representar marcas referência no varejo natural brasileiro.'
  },
  {
    year: '2026',
    title: 'Onde estamos hoje',
    text: '12 pessoas atrás de cada pedido (Jean, Juli, o filho da família e mais 10 colaboradores). Mais de 30 fornecedores parceiros, mais de 1.000 produtos no catálogo e mais de 200 empresas atendidas por mês em todo o Brasil. Nota 4,9 no Google com centenas de avaliações reais.'
  }
]

const valores = [
  { nome: 'Servir' },
  { nome: 'Pontualidade' },
  { nome: 'Ética' },
  { nome: 'Autoresponsabilidade' },
  { nome: 'Proatividade' },
  { nome: 'Meritocracia' },
  { nome: 'Gratidão' }
]

export default function Sobre() {
  useEffect(() => {
    document.title = 'A família Bedin | Bedin Representação'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.content = 'A história da Bedin Representação: 10 anos abastecendo lojistas naturais do Brasil, com mais de 30 fornecedores parceiros, 12 pessoas no time e nota 4,9 no Google.'
    }
  }, [])

  return (
    <>
      <Header />
      <main className="sobre-page">
        <section className="sobre-hero">
          <div className="container sobre-hero__inner">
            <div className="sobre-hero__content">
              <span className="hero__eyebrow">Família Bedin · desde outubro de 2016</span>
              <h1 className="sobre-hero__title">
                A história de uma família que escolheu <span className="accent">servir antes de vender</span>.
              </h1>
              <p className="sobre-hero__sub">
                Dez anos atrás, Jean e Juli saíram de Concórdia rumo à Grande Florianópolis com uma decisão. Hoje somos 12 pessoas no time, com mais de 30 fornecedores parceiros, mais de 1.000 produtos no catálogo e mais de 200 empresas atendidas todo mês.
              </p>
            </div>
            <div className="sobre-hero__visual">
              <img src="/imagem familia.png" alt="Família Bedin" />
              <div className="sobre-hero__badge">
                <span className="num">2016</span>
                <span className="txt">Grande Florianópolis</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sobre-manifesto">
          <div className="container">
            <Reveal className="sobre-manifesto__card">
              <span className="label">Por que existimos</span>
              <h2>A Bedin nasceu pra resolver um problema que todo lojista natural conhece de cor: <span className="accent">representante que some depois da venda</span>.</h2>
              <p>
                Em 2016, Jean e Juli saíram de Concórdia pra Grande Florianópolis com uma representação na mão e GPS no carro. Prospectando porta a porta, viram a mesma cena se repetir em cada loja: o lojista comprava, o representante sumia. Quando aparecia, era pra empurrar o próximo lançamento, não pra resolver o pedido atrasado ou a dúvida sobre giro. A gente decidiu que a Bedin seria diferente. E continua sendo, dez anos depois.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="sobre-timeline section">
          <div className="container">
            <Reveal className="sec-header">
              <span className="label">Linha do tempo</span>
              <h2 className="sec-title">De duas pessoas em Biguaçu a <span className="accent">12 pessoas atendendo o Brasil</span>.</h2>
            </Reveal>
            <div className="timeline">
              {timeline.map((item, i) => (
                <Reveal key={i} className="timeline__item">
                  <div className="timeline__year">{item.year}</div>
                  <div className="timeline__body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="sobre-vision">
          <div className="container">
            <Reveal className="sobre-vision__card">
              <span className="label">Compromisso 2030</span>
              <h2>Atender <span className="accent">10 mil empresas todo mês até 2030</span>.</h2>
              <p>
                Não é meta de vaidade pra colocar em apresentação de investidor. É um compromisso público com cada lojista que escolhe a Bedin. A gente vai crescer junto com você, sem perder o que nos trouxe até aqui: nome próprio, resposta no WhatsApp, pedido que sai na data combinada.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="sobre-valores section">
          <div className="container">
            <Reveal className="sec-header">
              <span className="label">Nossos valores</span>
              <h2 className="sec-title">Sete palavras que <span className="accent">decidem cada conversa</span> com lojista.</h2>
              <p className="sec-sub">Não são quadros na parede do escritório. São critérios que a gente usa pra contratar, atender e tomar decisão difícil.</p>
            </Reveal>
            <div className="valores-grid">
              {valores.map((v, i) => (
                <Reveal key={i} className="valor-card">
                  <h3>{v.nome}</h3>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="sobre-cta">
          <div className="container">
            <Reveal className="sobre-cta__card">
              <h2>Pronto pra ter a Bedin do seu lado?</h2>
              <p>Manda no WhatsApp os produtos que você precisa. A gente devolve cotação em até 24h úteis, com preço, prazo e disponibilidade. Sem custo, sem compromisso.</p>
              <a
                href="https://wa.me/5548998680025?text=Ol%C3%A1%20Bedin%2C%20vim%20pelo%20site%20e%20quero%20uma%20cota%C3%A7%C3%A3o!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-filled large"
              >
                Falar com a Bedin no WhatsApp
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
