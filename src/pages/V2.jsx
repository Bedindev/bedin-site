import { Link } from 'react-router-dom'
import { useState } from 'react'
import { trackWhatsApp } from '../analytics'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import SuppliersMarquee from '../components/SuppliersMarquee'
import ReviewsGrid from '../components/ReviewsGrid'
import ContactV2 from '../components/ContactV2'
import FluxoCotacao from '../components/FluxoCotacao'
import CoberturaBrasil from '../components/CoberturaBrasil'
import WhatsAppIcon, { whatsappLink } from '../components/WhatsAppIcon'
import { usePageMeta } from '../hooks/usePageMeta'

const WA_COTACAO = 'Olá, gostaria de solicitar uma cotação.'
const WA_CATALOGO = 'Olá, gostaria de receber o catálogo completo da Bedin.'
const WA_CLIENTE = 'Olá, sou cliente Bedin e preciso de atendimento.'

/* Prova de escala — espelha a faixa de métricas da Mercos (posição 2) */
const metricas = [
  { num: '+1.000', label: 'itens ativos em catálogo' },
  { num: '+30', label: 'indústrias representadas' },
  { num: '+200', label: 'lojas atendidas todo mês' },
  { num: '4,9', label: 'de nota no Google' },
  { num: '10 anos', label: 'de atividade ininterrupta' },
]

/* Segmentação — "Para quem é" da Mercos */
const publicos = [
  {
    titulo: 'Lojas de produtos naturais',
    texto: 'A gôndola inteira em um pedido só: as 8 categorias do catálogo.',
    itens: ['Cotação consolidada', 'Frete agrupado', 'Reposição recorrente'],
  },
  {
    titulo: 'Empórios e mercearias finas',
    texto: 'Itens de maior valor agregado, com giro comprovado no varejo.',
    itens: ['Linha premium', 'Ticket alto', 'Lançamentos primeiro'],
  },
  {
    titulo: 'Distribuidores regionais',
    texto: 'Volume de vários fornecedores em uma só operação logística.',
    itens: ['Volume negociado', 'Condição direta', 'Prazo ajustável'],
  },
]

/* Diferenciais — "Confira os diferenciais" da Mercos */
/* Só o que as outras seções NÃO dizem. "Cotação em 24h" e "frete
   consolidado" já são o diagrama do fluxo; "cobertura nacional" é a
   seção de cobertura inteira. Repetir aqui só aumentava a leitura. */
const diferenciais = [
  { titulo: 'Um só interlocutor', texto: 'Pedido, acompanhamento e pós-venda passam pelo mesmo canal — não por dezenas de representantes.' },
  { titulo: 'Atendimento nominal', texto: 'Um responsável fixo para a sua loja, que conhece o histórico e o giro. Sem fila e sem rodízio.' },
  { titulo: 'Decisão com quem decide', texto: 'A Bedin é administrada pelos sócios. Condição especial ou exceção de prazo não sobem escada.' },
  { titulo: 'Dez anos de curadoria', texto: 'As mais de 30 indústrias foram selecionadas por qualidade, regularidade de entrega e giro comprovado.' },
]

/* FAQ — as objeções que travam o primeiro pedido, agrupadas pelo momento
   em que surgem. O conteúdo espelha o FAQPage do index.html (IMP-003):
   se mudar aqui, mude lá — o Google espera correspondência visível. */
const faq = [
  {
    grupo: 'Antes de pedir',
    p: 'Como solicito uma cotação para a minha loja?',
    r: 'Envie pelo WhatsApp (48) 99868-0025 a relação de itens e as quantidades estimadas. A Bedin devolve cotação em até 24 horas úteis com preço, disponibilidade e condições de pagamento. Não há custo nem compromisso.',
  },
  {
    grupo: 'Antes de pedir',
    p: 'Comprar pela Bedin sai mais caro do que comprar direto da indústria?',
    r: 'Não. A Bedin é a representante comercial dessas indústrias — o preço que você recebe é o preço da própria indústria, e quem remunera a representação é ela, não a sua loja. O ganho para você está em negociar uma vez só e juntar o frete de vários fornecedores numa entrega.',
  },
  {
    grupo: 'Antes de pedir',
    p: 'Preciso ter CNPJ?',
    r: 'Sim. A Bedin é uma representação comercial e atende exclusivamente lojas e empresas do varejo e do atacado — não vende para consumidor final.',
  },
  {
    grupo: 'Antes de pedir',
    p: 'Qual é o pedido mínimo?',
    r: 'O mínimo varia conforme a indústria e a categoria. Como a Bedin consolida o pedido entre vários fornecedores, na prática a sua loja costuma atingir o mínimo com mais facilidade do que comprando direto de cada um.',
  },
  {
    grupo: 'Produtos e cobertura',
    p: 'Quais categorias a Bedin representa?',
    r: 'São mais de 1.000 itens em 8 categorias: frutas secas, especiarias, grãos, sementes, chás, chips, drageados e farináceos — de mais de 30 indústrias parceiras selecionadas por qualidade e regularidade de entrega.',
  },
  {
    grupo: 'Produtos e cobertura',
    p: 'A Bedin atende em todo o Brasil?',
    r: 'Sim. A Bedin abastece lojas em todo o território nacional, atendendo mais de 200 empresas por mês desde 2016. A sede fica em Biguaçu, Santa Catarina.',
  },
  {
    grupo: 'Produtos e cobertura',
    p: 'Dá para pedir só uma categoria?',
    r: 'Dá. Muitas lojas começam por uma linha só — frutas secas ou castanhas, por exemplo — e ampliam o mix depois que conhecem o atendimento. Não há exigência de comprar o catálogo inteiro.',
  },
  {
    grupo: 'Entrega e pagamento',
    p: 'Como funciona o frete?',
    r: 'A Bedin agrupa os itens de fornecedores diferentes em uma única operação logística e apresenta as opções de transporte, custo e prazo antes de você fechar o pedido. Você aprova o frete junto com a cotação.',
  },
  {
    grupo: 'Entrega e pagamento',
    p: 'Quais são as formas de pagamento?',
    r: 'As condições são definidas por indústria e constam na cotação, junto do preço e do prazo. Cada proposta chega com a condição comercial já fechada, para você decidir com o número na frente.',
  },
  {
    grupo: 'Entrega e pagamento',
    p: 'Quem atende a minha loja depois do primeiro pedido?',
    r: 'Cada loja tem um responsável fixo na equipe, que acompanha o histórico de compras e o giro da operação. Não há fila nem rodízio de atendente a cada contato.',
  },
]

const GRUPOS = ['Antes de pedir', 'Produtos e cobertura', 'Entrega e pagamento']

function FaqItem({ item, id, aberto, onToggle }) {
  return (
    <li className={`v2-faq__item${aberto ? ' is-open' : ''}`}>
      <h3 className="v2-faq__h">
        <button
          type="button"
          className="v2-faq__q"
          aria-expanded={aberto}
          aria-controls={`faq-a-${id}`}
          id={`faq-q-${id}`}
          onClick={onToggle}
        >
          <span>{item.p}</span>
          <span className="v2-faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <div
        className="v2-faq__a"
        id={`faq-a-${id}`}
        role="region"
        aria-labelledby={`faq-q-${id}`}
        hidden={!aberto}
      >
        <p>{item.r}</p>
      </div>
    </li>
  )
}

export default function V2() {
  const [aberta, setAberta] = useState(0)

  usePageMeta({
    title: 'Bedin Representações — alimentos naturais para a sua loja',
    description: 'Representação comercial de mais de 30 indústrias de alimentos naturais. Envie a sua lista e receba uma cotação consolidada em 24h úteis, com preço, prazo e frete. Atende lojas com CNPJ em todo o Brasil.',
  })

  return (
    <div className="v2">
      <Header
        acesso={{
          href: whatsappLink(WA_CLIENTE),
          label: 'Já sou cliente',
          onClick: () => trackWhatsApp('v2_header_cliente'),
        }}
      />
      <main>
        {/* 1. HERO — centralizado, par de CTAs, nota de risco (IMP-001, IMP-002) */}
        <section className="v2-hero">
          <div className="container">
            <span className="v2-hero__eyebrow">Representação comercial de alimentos naturais</span>
            <h1 className="v2-hero__title">
              Abasteça a sua loja com <span className="accent">um pedido só</span>
            </h1>
            <p className="v2-hero__sub">
              Mais de 30 indústrias de alimentos naturais em um só contato. Você manda a
              lista, a Bedin devolve uma cotação com preço, prazo e frete fechados.
            </p>
            <div className="v2-hero__ctas">
              <a
                href={whatsappLink(WA_COTACAO)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn v2-btn-primary"
                onClick={() => trackWhatsApp('v2_hero_cotacao')}
              >
                <WhatsAppIcon size={18} />
                Solicitar cotação
              </a>
              <a
                href={whatsappLink(WA_CATALOGO)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn v2-btn-outline"
                onClick={() => trackWhatsApp('v2_hero_catalogo')}
              >
                Receber o catálogo
              </a>
            </div>
            {/* IMP-001: a nota de redução de risco, no ponto da decisão.
                "Lojas com CNPJ" estava só aos 6.381px — quem não é PJ
                descobria tarde demais que não é o público. */}
            <p className="v2-hero__nota">
              Para lojas com CNPJ · Cotação sem custo e sem compromisso ·
              Resposta em até 24h úteis
            </p>

            <div className="v2-hero__visual">
              <div className="v2-hero__painel">
                <div className="v2-hero__painel-barra">
                  <span>Catálogo Bedin · 8 categorias</span>
                </div>
                <div className="v2-hero__painel-grid">
                  {[
                    { src: '/Frutas secas.png', n: 'Frutas secas' },
                    { src: '/especiarias.png', n: 'Especiarias' },
                    { src: '/grãos.png', n: 'Grãos' },
                    { src: '/sementes.png', n: 'Sementes' },
                    { src: '/chas.png', n: 'Chás' },
                    { src: '/chips.png', n: 'Chips' },
                    { src: '/drageados.png', n: 'Drageados' },
                    { src: '/farinaceos.png', n: 'Farináceos' },
                  ].map(c => (
                    <figure key={c.n}>
                      <img src={c.src} alt={c.n} loading="eager" />
                      <figcaption>{c.n}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. MÉTRICAS — prova antes da explicação (R-001) */}
        <section className="v2-metricas">
          <div className="container">
            <ul className="v2-metricas__grid">
              {metricas.map(m => (
                <li key={m.label}>
                  <span className="v2-metricas__num">{m.num}</span>
                  <span className="v2-metricas__label">{m.label}</span>
                </li>
              ))}
            </ul>
            <p className="v2-metricas__reforco">
              <strong>Mais de 200 lojas</strong> confiam na Bedin todo mês
            </p>
          </div>
        </section>

        {/* 2b. FLUXO — diagrama no lugar de mais um bloco de texto */}
        <FluxoCotacao />

        {/* 3. PARA QUEM É — segmentação */}
        <section className="v2-publicos section">
          <div className="container">
            <div className="v2-sec-head">
              <span className="label">Para quem é</span>
              <h2>Quem compra com a Bedin</h2>
              <p>A representação atende três perfis de operação, com a mesma estrutura de cotação e entrega.</p>
            </div>
            <div className="v2-publicos__grid">
              {publicos.map(p => (
                <article className="v2-publico" key={p.titulo}>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                  <ul>
                    {p.itens.map(i => <li key={i}>{i}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. DIFERENCIAIS */}
        <section className="v2-dif section">
          <div className="container">
            <div className="v2-sec-head">
              <span className="label">Diferenciais</span>
              <h2>O que muda na operação da sua loja</h2>
              <p>A função de uma representação é tirar da loja o trabalho de garimpar fornecedor, comparar condição e administrar frete.</p>
            </div>
            <div className="v2-dif__grid">
              {diferenciais.map((d, i) => (
                <article className="v2-dif__card" key={d.titulo}>
                  <span className="v2-dif__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{d.titulo}</h3>
                  <p>{d.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4b. COBERTURA + exemplo de cotação */}
        <CoberturaBrasil />

        {/* 5. FORNECEDORES — faixa rolando, como no mercos.com */}
        <SuppliersMarquee />

        {/* 6. DEPOIMENTOS — grade de 3, sem carrossel cortado */}
        <ReviewsGrid />

        {/* 7. FAQ — objeções tratadas logo antes do fechamento (R-009, IMP-003).
            Duas colunas: as perguntas e um cartão de saída para quem não
            encontrou a dúvida — a seção não termina em beco sem saída. */}
        <section className="v2-faq section" id="faq">
          <div className="container">
            <div className="v2-sec-head">
              <span className="label">Perguntas frequentes</span>
              <h2>Dúvidas de quem está começando a comprar</h2>
              <p>As perguntas que a equipe mais ouve de lojistas no primeiro contato.</p>
            </div>

            <div className="v2-faq__grid">
              <div className="v2-faq__col">
                {GRUPOS.map(grupo => (
                  <div className="v2-faq__bloco" key={grupo}>
                    <h3 className="v2-faq__grupo">{grupo}</h3>
                    <ul className="v2-faq__list">
                      {faq
                        .map((item, i) => ({ item, i }))
                        .filter(({ item }) => item.grupo === grupo)
                        .map(({ item, i }) => (
                          <FaqItem
                            key={item.p}
                            item={item}
                            id={i}
                            aberto={aberta === i}
                            onToggle={() => setAberta(aberta === i ? -1 : i)}
                          />
                        ))}
                    </ul>
                  </div>
                ))}
              </div>

              <aside className="v2-faq__ajuda">
                <h3>Não encontrou a sua dúvida?</h3>
                <p>
                  Quem responde é a equipe comercial, não um robô. Mande a pergunta
                  pelo WhatsApp e você tem resposta em horário comercial.
                </p>
                <a
                  href={whatsappLink('Olá, tenho uma dúvida sobre como comprar pela Bedin.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn v2-btn-primary"
                  onClick={() => trackWhatsApp('v2_faq_duvida')}
                >
                  <WhatsAppIcon size={18} />
                  Tirar uma dúvida
                </a>
                <dl className="v2-faq__dados">
                  <div>
                    <dt>Resposta da cotação</dt>
                    <dd>Até 24h úteis</dd>
                  </div>
                  <div>
                    <dt>Custo para cotar</dt>
                    <dd>Nenhum</dd>
                  </div>
                  <div>
                    <dt>Atende</dt>
                    <dd>Lojas com CNPJ</dd>
                  </div>
                </dl>
                <p className="v2-faq__ajuda-nota">
                  A Bedin atende lojas em todo o Brasil desde 2016, com sede em
                  Biguaçu, Santa Catarina.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* 8. FORMULÁRIO — padrão mercos. Vem antes do fechamento: quem já
            decidiu preenche aqui, sem ter de passar por mais um pedido. */}
        <ContactV2 />

        {/* 9. CTA FINAL — bloco de identidade, mesmo par de botões (R-002).
            O título não repete a prova social (já dita nos depoimentos):
            aqui ele descreve a ação e o que ela custa. */}
        <section className="v2-final">
          <div className="container">
            <div className="v2-final__card">
              <h2>Comece pela sua próxima reposição</h2>
              <p>
                Envie a lista dos itens que a sua loja precisa repor. A Bedin cota com
                as indústrias que atendem aquele mix e devolve uma proposta só, em até
                24 horas úteis.
              </p>
              <div className="v2-final__ctas">
                <a
                  href={whatsappLink(WA_COTACAO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn v2-btn-primary"
                  onClick={() => trackWhatsApp('v2_final_cotacao')}
                >
                  <WhatsAppIcon size={18} />
                  Solicitar cotação
                </a>
                <a
                  href={whatsappLink(WA_CATALOGO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn v2-btn-outline-light"
                  onClick={() => trackWhatsApp('v2_final_catalogo')}
                >
                  Receber o catálogo
                </a>
              </div>
              <p className="v2-final__nota">
                Cotação sem custo e sem compromisso · Resposta em até 24h úteis
              </p>

              {/* reforço de escala no fechamento, como no mercos.com */}
              <ul className="v2-final__prova">
                <li><strong>+200</strong> lojas atendidas por mês</li>
                <li><strong>+30</strong> indústrias representadas</li>
                <li><strong>4,9</strong> de nota no Google</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 10. BARRA CLIENTE / PROSPECTO (IMP-004) — por último, como no
            mercos.com: quem já é cliente não disputa espaço com a captação. */}
        <section className="v2-cliente">
          <div className="container v2-cliente__inner">
            <span>Já é cliente Bedin?</span>
            <a
              href={whatsappLink(WA_CLIENTE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn v2-btn-ghost"
              onClick={() => trackWhatsApp('v2_cliente_recorrente')}
            >
              Falar com o seu atendimento
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
