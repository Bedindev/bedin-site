import { trackWhatsApp } from '../analytics'
import { fallbackReviews } from './Reviews'

/* Três depoimentos em destaque, com a frase que o leitor leva embora.
   O selo do Google fica no topo — é a prova agregada, e no mercos.com
   ela aparece junto da prova nominal, não escondida no rodapé. */

const DESTAQUES = ['Alessandro Ferreira', 'Cristiane Bellé', 'Rodrigo Schmidt']

/* A frase que o leitor leva embora. Escolhida do próprio texto da avaliação,
   sem reescrever o que o cliente disse. */
const PUXADA = {
  'Alessandro Ferreira': 'Só tenho uma palavra: gratidão',
  'Cristiane Bellé': 'Excepcional em todos os aspectos',
  'Rodrigo Schmidt': 'Empresa séria e comprometida',
}

/* Há quanto tempo é cliente diz mais do que "um ano atrás".
   Vem do texto público da própria avaliação no Google. */
const RELACAO = {
  'Alessandro Ferreira': 'Cliente há anos',
  'Cristiane Bellé': 'Avaliação no Google',
  'Rodrigo Schmidt': 'Avaliação no Google',
}

function iniciais(nome) {
  return nome.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
}

function Estrelas() {
  return (
    <>
      <span className="v2-depo__estrelas" aria-hidden="true">★★★★★</span>
      <span className="sr-only">Avaliação de 5 estrelas</span>
    </>
  )
}

export default function ReviewsGrid() {
  const destaques = DESTAQUES
    .map(n => fallbackReviews.find(r => r.name === n))
    .filter(Boolean)

  return (
    <section className="v2-depo section" id="depoimentos">
      <div className="container">
        <div className="v2-sec-head">
          <span className="label">A verdade vem dos lojistas</span>
          <h2>Mais de 200 lojas já melhoraram o abastecimento com a Bedin</h2>
          <p>
            As avaliações abaixo são públicas e estão no perfil da Bedin no Google.
            Nenhuma foi escrita por nós.
          </p>
        </div>

        {/* prova agregada, no topo — onde o Mercos a coloca */}
        <div className="v2-depo__selo">
          <span className="v2-depo__selo-num">4,9</span>
          <span className="v2-depo__selo-col">
            <span className="v2-depo__estrelas v2-depo__estrelas--lg" aria-hidden="true">★★★★★</span>
            <span className="v2-depo__selo-txt">
              <strong>Nota 4,9 de 5</strong> no Google · centenas de avaliações de lojistas
            </span>
          </span>
          <a
            href="https://share.google/ZdruFz4KpnQ1jW6iw"
            target="_blank"
            rel="noopener noreferrer"
            className="v2-depo__selo-link"
            onClick={() => trackWhatsApp('v2_google_reviews')}
          >
            Ver no Google ↗
          </a>
        </div>

        <ul className="v2-depo__grid">
          {destaques.map(r => (
            <li className="v2-depo__card" key={r.name}>
              <Estrelas />
              {PUXADA[r.name] && (
                <p className="v2-depo__puxada">“{PUXADA[r.name]}”</p>
              )}
              <p className="v2-depo__texto">{r.text}</p>
              <a
                className="v2-depo__ler"
                href="https://share.google/ZdruFz4KpnQ1jW6iw"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp('v2_depo_ler_completo')}
              >
                Ler no Google
                <span className="sr-only"> a avaliação de {r.name}</span>
              </a>
              <div className="v2-depo__autor">
                <span className="v2-depo__avatar" aria-hidden="true">{iniciais(r.name)}</span>
                <span className="v2-depo__autor-info">
                  <strong>{r.name}</strong>
                  <em>{RELACAO[r.name] || 'Avaliação no Google'}</em>
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="v2-depo__rodape">
          <p>Quer falar com um lojista que já compra pela Bedin? Podemos indicar.</p>
          <a
            href="https://wa.me/5548998680025?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20com%20um%20lojista%20que%20j%C3%A1%20compra%20pela%20Bedin."
            target="_blank"
            rel="noopener noreferrer"
            className="btn v2-btn-outline"
            onClick={() => trackWhatsApp('v2_depo_referencia')}
          >
            Pedir uma referência
          </a>
        </div>
      </div>
    </section>
  )
}
