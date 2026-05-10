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
    text: 'Outubro de 2016, Biguaçu (SC). Jean Carlos Bedin e Juli Bedin fundam a Bedin Representação atendendo lojistas da Grande Florianópolis com poucas marcas e muita disposição pra servir.'
  },
  {
    year: '2018',
    title: 'Primeira expansão estadual',
    text: 'A operação cresce pelo boca a boca. Em dois anos, a Bedin já atende lojas em todo Santa Catarina e começa a abrir caminho no Paraná e no Rio Grande do Sul.'
  },
  {
    year: '2020',
    title: 'Time cresce, atendimento humaniza',
    text: 'Tainá entra pra cuidar de relacionamento com lojistas. A regra interna passa a ser uma só: cada cliente sabe o nome de quem o atende, e quem atende sabe o nome da loja.'
  },
  {
    year: '2023',
    title: '20 marcas e cobertura nacional',
    text: 'Pedido consolidado entre marcas vira o diferencial logístico. Lojistas do Norte ao Sul conseguem montar mix completo com um único contato e frete negociado.'
  },
  {
    year: '2026',
    title: 'Onde estamos hoje',
    text: '12 pessoas no time. 30 marcas representadas. Mais de 1.000 produtos no catálogo. 234 avaliações reais no Google com nota 4,9. Atendimento em todo o Brasil.'
  }
]

const valores = [
  { nome: 'Servir', frase: 'Você vem antes da venda. Sempre.' },
  { nome: 'Pontualidade', frase: 'Pedido sai na data combinada. Sem desculpa.' },
  { nome: 'Ética', frase: 'Mesmo preço, mesma condição, com ou sem você olhando.' },
  { nome: 'Autoresponsabilidade', frase: 'Erro nosso é problema nosso. Você não paga por ele.' },
  { nome: 'Proatividade', frase: 'A gente avisa antes do estoque acabar.' },
  { nome: 'Meritocracia', frase: 'Quem trabalha melhor pra você é quem te atende.' },
  { nome: 'Gratidão', frase: 'Cada lojista que confia na gente é razão pra fazer melhor amanhã.' }
]

export default function Sobre() {
  useEffect(() => {
    document.title = 'A família Bedin | Bedin Representação'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.content = 'A história da Bedin Representação: 10 anos abastecendo lojistas naturais do Brasil com 30 marcas, 12 pessoas no time e nota 4,9 no Google.'
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
                Dez anos atrás éramos duas pessoas com uma decisão. Hoje somos 12, com 30 marcas representadas, mais de 1.000 produtos no catálogo e 234 lojistas que avaliaram nosso trabalho com nota 4,9 no Google.
              </p>
            </div>
            <div className="sobre-hero__visual">
              <img src="/imagem familia.png" alt="Família Bedin" />
              <div className="sobre-hero__badge">
                <span className="num">2016</span>
                <span className="txt">Biguaçu, SC</span>
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
                Em 2016, Jean e Juli olharam pro mercado e viram a mesma cena se repetir. O lojista comprava, o representante sumia. Quando aparecia, era pra empurrar o próximo lançamento, não pra resolver o pedido atrasado, o produto faltando, a dúvida sobre giro. A gente decidiu que a Bedin seria diferente. E continua sendo, dez anos depois.
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
                  <p>{v.frase}</p>
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
