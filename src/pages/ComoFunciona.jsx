import { trackWhatsApp } from '../analytics'
import { usePageMeta, useJsonLd } from '../hooks/usePageMeta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import Stats from '../components/Stats'
import JornadaBedin, { JORNADA_STEPS } from '../components/JornadaBedin'
import { Reveal } from '../components/Reveal'
import WhatsAppIcon, { whatsappLink } from '../components/WhatsAppIcon'
import { fallbackReviews } from '../components/Reviews'

const PAGE_URL = 'https://www.bedinrepresentacao.com.br/como-funciona'
const PAGE_TITLE = 'Como funciona | Cotação, frete e acompanhamento | Bedin Representações'
const PAGE_DESCRIPTION = 'Envie sua lista e conte com a Bedin para comparar fornecedores, cotar frete, acompanhar pedidos e prestar suporte até a entrega.'
const WA_MESSAGE = 'Olá, vim pelo site da Bedin e quero enviar uma lista para cotação.'

const compare = [
  ['Falar com vários fornecedores', 'Um único contato pelo WhatsApp'],
  ['Abrir e comparar diversas tabelas', 'Cotação organizada para facilitar a decisão'],
  ['Pedir frete separadamente', 'Opções de frete avaliadas antes de fechar'],
  ['Cobrar informações de cada pedido', 'Acompanhamento e atualizações'],
  ['Resolver problemas sozinho', 'Suporte da equipe Bedin'],
]

const iconProps = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false' }

const services = [
  {
    title: 'Cotação de preços',
    text: 'Comparamos produtos, preços, disponibilidade e condições entre diferentes fornecedores para facilitar sua decisão.',
  },
  {
    title: 'Cotação de frete',
    text: 'Buscamos opções de transporte, custo e prazo para você avaliar a compra completa antes de fechar.',
  },
  {
    title: 'Organização dos pedidos',
    text: 'Depois da sua escolha, nossa equipe auxilia no encaminhamento das informações e acompanha o andamento com os fornecedores.',
  },
  {
    title: 'Rastreamento e atualizações',
    text: 'Você recebe informações sobre nota fiscal, transportadora, previsão e andamento dos seus pedidos.',
  },
  {
    title: 'Suporte pós-venda',
    text: 'Em casos de dúvida, atraso, falta, avaria ou problema comercial, a equipe Bedin acompanha a situação e ajuda na solução.',
  },
]

const selectedReviewers = ['Alessandro Ferreira', 'Rodrigo Schmidt', 'Steffani Amaral']

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function scrollToJornada(e) {
  e.preventDefault()
  const target = document.getElementById('como-funciona')
  if (!target) return
  const header = document.getElementById('header')
  const reduce = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({
    top: target.offsetTop - (header ? header.offsetHeight : 0) - 12,
    behavior: reduce ? 'auto' : 'smooth',
  })
}

export default function ComoFunciona() {
  usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    canonical: PAGE_URL,
    ogTitle: PAGE_TITLE,
    ogDescription: PAGE_DESCRIPTION,
    ogUrl: PAGE_URL,
    twitterTitle: PAGE_TITLE,
    twitterDescription: PAGE_DESCRIPTION,
  })

  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como funciona o atendimento da Bedin Representações',
    description: PAGE_DESCRIPTION,
    step: JORNADA_STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.text,
    })),
  })

  const reviews = fallbackReviews.filter(r => selectedReviewers.includes(r.name))

  return (
    <>
      <Header />
      <main className="cf-page">
        <section className="cf-hero">
          <div className="container cf-hero__inner">
            <div className="cf-hero__content">
              <span className="hero__eyebrow">Cotação, frete e acompanhamento em um só atendimento</span>
              <h1 className="cf-hero__title">
                Você cuida da sua loja. <span className="accent">A Bedin cuida da compra até a entrega.</span>
              </h1>
              <p className="cf-hero__sub">
                Envie sua lista uma única vez. A Bedin compara preços e condições entre diferentes fornecedores, ajuda você a avaliar o frete, acompanha seus pedidos e mantém você informado até a entrega — tudo pelo WhatsApp e com atendimento humano.
              </p>
              <div className="hero__ctas">
                <a
                  href={whatsappLink(WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp large"
                  onClick={() => trackWhatsApp('como_funciona_hero')}
                >
                  <WhatsAppIcon />
                  Enviar minha lista no WhatsApp
                </a>
                <a href="#como-funciona" className="btn btn-ghost-white" onClick={scrollToJornada}>
                  Ver como funciona
                </a>
              </div>
            </div>
            <div className="cf-hero__visual">
              <ol className="cf-hero__resumo">
                {JORNADA_STEPS.map((step, i) => (
                  <li key={step.id}>
                    <span className="cf-hero__resumo-num">{i + 1}</span>
                    <span className="cf-hero__resumo-txt">{step.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="compare section" aria-labelledby="compare-title">
          <div className="container">
            <Reveal className="sec-header">
              <span className="label">Antes e depois</span>
              <h2 className="sec-title" id="compare-title">O que muda no seu dia a dia</h2>
              <p className="sec-sub">Menos tempo resolvendo compras. Mais tempo cuidando da sua loja.</p>
            </Reveal>
            <Reveal className="compare__table">
              <div className="compare__head" aria-hidden="true">
                <span className="compare__col compare__col--before">Sem a Bedin</span>
                <span className="compare__col compare__col--after">Com a Bedin</span>
              </div>
              <ul className="compare__rows">
                {compare.map(([before, after]) => (
                  <li className="compare__row" key={before}>
                    <div className="compare__cell compare__cell--before">
                      <span className="compare__tag">Sem a Bedin</span>
                      <span className="compare__mark" aria-hidden="true">
                        <svg {...iconProps} strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18" /></svg>
                      </span>
                      <p>{before}</p>
                    </div>
                    <div className="compare__cell compare__cell--after">
                      <span className="compare__tag">Com a Bedin</span>
                      <span className="compare__mark" aria-hidden="true">
                        <svg {...iconProps} strokeWidth="2.4"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                      </span>
                      <p>{after}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <JornadaBedin />

        <section className="services section" aria-labelledby="services-title">
          <div className="container services__grid">
            <Reveal className="services__intro">
              <span className="label">O que está incluído</span>
              <h2 className="sec-title" id="services-title">
                Uma equipe para <span className="accent">acompanhar toda a sua compra</span>
              </h2>
              <p className="sec-sub">Tudo pelo WhatsApp, com gente de verdade do outro lado.</p>
            </Reveal>
            <Reveal as="ol" className="services__list">
              {services.map(s => (
                <li key={s.title} className="services__item">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="tech section" aria-labelledby="tech-title">
          <div className="container tech__grid">
            <Reveal className="tech__content">
              <span className="label">Bastidores</span>
              <h2 className="sec-title" id="tech-title">
                Tecnologia nos bastidores. <span className="accent">Pessoas de verdade no atendimento.</span>
              </h2>
              <p>A Bedin utiliza tecnologia própria para organizar tabelas, agilizar cotações, consultar fretes e acompanhar pedidos.</p>
              <p>Isso torna nossa operação mais rápida e organizada, sem substituir o que sempre fez parte da nossa história: atendimento próximo, humano e responsável.</p>
              <p>Você não precisa aprender um sistema novo. Continua falando com nossa equipe pelo WhatsApp — a tecnologia trabalha por trás para que as informações cheguem com mais agilidade.</p>
            </Reveal>
          </div>
        </section>

        <Stats />

        <section className="cf-reviews section" aria-labelledby="cf-reviews-title">
          <div className="container">
            <Reveal className="sec-header">
              <span className="label">Quem já compra com a Bedin</span>
              <h2 className="sec-title" id="cf-reviews-title">
                Agilidade, atenção e <span className="accent">comprometimento</span>, na palavra de quem compra.
              </h2>
            </Reveal>
            <Reveal as="ul" className="cf-reviews__grid">
              {reviews.map(r => (
                <li className="review-card" key={r.name}>
                  <div className="review-card__header">
                    <div className="review-avatar" aria-hidden="true">{getInitials(r.name)}</div>
                    <div>
                      <strong>{r.name}</strong>
                      <span className="review-date">{r.date}</span>
                    </div>
                  </div>
                  <div className="review-stars" aria-hidden="true">★★★★★</div>
                  <span className="sr-only">Avaliação de 5 estrelas</span>
                  <p>{r.text}</p>
                </li>
              ))}
            </Reveal>
            <Reveal className="cf-reviews__more">
              <a href="https://share.google/ZdruFz4KpnQ1jW6iw" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Ler todas as avaliações no Google
              </a>
            </Reveal>
          </div>
        </section>

        <section className="cf-final section" aria-labelledby="cf-final-title">
          <div className="container">
            <Reveal className="cf-final__card">
              <h2 id="cf-final-title">Sua próxima compra pode começar com uma única mensagem.</h2>
              <p>Envie sua lista para a Bedin. Nossa equipe ajuda você a comparar fornecedores, avaliar preços, consultar o frete e acompanhar o pedido até a entrega.</p>
              <a
                href={whatsappLink(WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-filled large"
                onClick={() => trackWhatsApp('como_funciona_final')}
              >
                <WhatsAppIcon />
                Enviar minha lista para cotação
              </a>
              <p className="cf-final__hint">Cotação sem custo e sem compromisso. Atendimento para lojistas e empresas.</p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
