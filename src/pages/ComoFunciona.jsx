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
    icon: <svg {...iconProps}><rect x="3" y="4" width="7" height="16" rx="1.5" /><rect x="14" y="4" width="7" height="16" rx="1.5" /><path d="M6.5 9h0M6.5 13h0M17.5 9h0M17.5 13h0" strokeWidth="2.4" /></svg>,
  },
  {
    title: 'Cotação de frete',
    text: 'Buscamos opções de transporte, custo e prazo para você avaliar a compra completa antes de fechar.',
    icon: <svg {...iconProps}><rect x="1.5" y="6" width="13" height="10" rx="1.5" /><path d="M14.5 9h4l3 3.5V16h-7z" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></svg>,
  },
  {
    title: 'Organização dos pedidos',
    text: 'Depois da sua escolha, nossa equipe auxilia no encaminhamento das informações e acompanha o andamento com os fornecedores.',
    icon: <svg {...iconProps}><path d="M4 5h16M4 12h10M4 19h7" /><path d="M17 16l2 2 4-4" /></svg>,
  },
  {
    title: 'Rastreamento e atualizações',
    text: 'Você recebe informações sobre nota fiscal, transportadora, previsão e andamento dos seus pedidos.',
    icon: <svg {...iconProps}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 14l2 2 4-4" /></svg>,
  },
  {
    title: 'Suporte pós-venda',
    text: 'Em casos de dúvida, atraso, falta, avaria ou problema comercial, a equipe Bedin acompanha a situação e ajuda na solução.',
    icon: <svg {...iconProps}><path d="M21 12a8 8 0 01-11.6 7.1L4 20l1.1-4.4A8 8 0 1121 12z" /><path d="M9 12h0M12 12h0M15 12h0" strokeWidth="2.6" /></svg>,
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
                  className="btn btn-filled large"
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
            <div className="cf-hero__visual" aria-hidden="true">
              <div className="mock mock--chat cf-hero__card cf-hero__card--chat">
                <div className="mock__head"><span className="mock__avatar">L</span><span>Sua lista · WhatsApp</span></div>
                <div className="mock__bubble">
                  <ul>
                    <li>Chia · 20 kg</li>
                    <li>Uva-passa · 30 kg</li>
                    <li>Castanha-de-caju · 10 kg</li>
                  </ul>
                  <span className="mock__sent">Enviado ✓✓</span>
                </div>
              </div>
              <div className="mock mock--status cf-hero__card cf-hero__card--result">
                <div className="mock__head"><span className="mock__avatar mock__avatar--bedin">B</span><span>Retorno da Bedin</span></div>
                <ul className="mock__checks">
                  <li className="is-done"><svg {...iconProps} strokeWidth="2.4"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>Fornecedores comparados</li>
                  <li className="is-done"><svg {...iconProps} strokeWidth="2.4"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>Frete consultado</li>
                  <li className="is-current"><span className="mock__dot" />Pedido acompanhado</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="hero__wave" aria-hidden="true">
            <svg viewBox="0 0 1440 64" preserveAspectRatio="none">
              <path d="M0,32 C480,64 960,0 1440,32 L1440,64 L0,64 Z" fill="#f9f9f7" />
            </svg>
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
                  <span className="services__icon">{s.icon}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="tech section" aria-labelledby="tech-title">
          <div className="container tech__grid">
            <Reveal className="tech__visual" aria-hidden="true">
              <div className="tech__board">
                <div className="tech__board-head">Nos bastidores da Bedin</div>
                <ul>
                  <li><span className="tech__dot" />Tabelas organizadas</li>
                  <li><span className="tech__dot" />Cotações agilizadas</li>
                  <li><span className="tech__dot" />Fretes consultados</li>
                  <li><span className="tech__dot" />Pedidos acompanhados</li>
                </ul>
              </div>
              <div className="tech__chat">
                <span className="tech__chat-icon"><WhatsAppIcon size={16} /></span>
                <span>Você continua falando com a nossa equipe</span>
              </div>
            </Reveal>
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
