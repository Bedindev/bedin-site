/* Diagrama do fluxo de cotação.
   Ocupa o lugar que no mercos.com é da captura do sistema: mostra o processo
   em vez de descrevê-lo. Usa os logos reais dos fornecedores, não caixas
   genéricas, e contrasta o antes com o depois. */

/* 7 logos + a célula "+24" preenchem exatamente a grade de 4x2 */
const industrias = [
  { src: '/logos-fornecedores/fornecedor-banto.png', alt: 'Bantô' },
  { src: '/logos-fornecedores/fornecedor-Nuttini.png', alt: 'Nuttini' },
  { src: '/logos-fornecedores/fornecedor-castanhas-ouro-verde.png', alt: 'Castanhas Ouro Verde' },
  { src: '/logos-fornecedores/fornecedor-divinut.png', alt: 'Divinut' },
  { src: '/logos-fornecedores/fornecedor-jutica.png', alt: 'Jutica' },
  { src: '/logos-fornecedores/fornecedor-granvital.png', alt: 'Granvital' },
  { src: '/logos-fornecedores/fornecedor-elmar.png', alt: 'Elmar' },
]

const etapas = [
  { n: '01', titulo: 'Você envia a lista', texto: 'Uma mensagem no WhatsApp com os itens e as quantidades.' },
  { n: '02', titulo: 'A Bedin cota com as indústrias', texto: 'Consultamos todas as representadas que atendem aquele mix.' },
  { n: '03', titulo: 'Você recebe uma proposta só', texto: 'Preço, prazo, disponibilidade e frete em um único documento.' },
]

export default function FluxoCotacao() {
  return (
    <section className="v2-fluxo section" id="como-funciona">
      <div className="container">
        <div className="v2-sec-head">
          <span className="label">Como funciona</span>
          <h2>Uma lista enviada, uma proposta recebida</h2>
          <p>
            A Bedin fica entre a sua loja e mais de 30 indústrias.
            Você negocia uma vez, não trinta.
          </p>
        </div>

        <div className="v2-fluxo__quadro">
          {/* coluna 1 — a loja */}
          <div className="v2-fluxo__col v2-fluxo__col--loja">
            <div className="v2-fluxo__caixa v2-fluxo__caixa--loja">
              <span className="v2-fluxo__tag">Sua loja</span>
              <p className="v2-fluxo__lista">
                <span>Uva passa · 50 kg</span>
                <span>Chia · 50 kg</span>
                <span>Castanha · 50 kg</span>
              </p>
            </div>
            <span className="v2-fluxo__legenda">1 mensagem no WhatsApp</span>
          </div>

          {/* conector 1 */}
          <div className="v2-fluxo__conector">
            <span className="v2-fluxo__seta v2-fluxo__seta--ida" aria-hidden="true" />
            <span className="v2-fluxo__seta-txt">envia a lista</span>
            <span className="v2-fluxo__seta v2-fluxo__seta--volta" aria-hidden="true" />
            <span className="v2-fluxo__seta-txt v2-fluxo__seta-txt--volta">recebe 1 cotação</span>
          </div>

          {/* coluna 2 — a Bedin */}
          <div className="v2-fluxo__col v2-fluxo__col--bedin">
            <div className="v2-fluxo__caixa v2-fluxo__caixa--bedin">
              <img src="/logo vetorizado Bedin.png" alt="" className="v2-fluxo__logo" />
              <strong>Bedin</strong>
              <span>cota, compara e consolida</span>
            </div>
            <span className="v2-fluxo__legenda">em até 24h úteis</span>
          </div>

          {/* conector 2 — leque */}
          <div className="v2-fluxo__leque" aria-hidden="true">
            <svg viewBox="0 0 70 260" preserveAspectRatio="none">
              <g stroke="var(--v2-line)" strokeWidth="1.5" fill="none">
                <path d="M0 130 C 40 130, 30 24, 70 24" />
                <path d="M0 130 C 40 130, 30 77, 70 77" />
                <path d="M0 130 C 40 130, 40 130, 70 130" />
                <path d="M0 130 C 40 130, 30 183, 70 183" />
                <path d="M0 130 C 40 130, 30 236, 70 236" />
              </g>
            </svg>
          </div>

          {/* coluna 3 — as indústrias, com os logos reais */}
          <div className="v2-fluxo__col v2-fluxo__col--ind">
            <div className="v2-fluxo__industrias">
              {industrias.map(i => (
                <div className="v2-fluxo__ind" key={i.alt}>
                  <img src={i.src} alt={i.alt} loading="lazy" />
                </div>
              ))}
              <div className="v2-fluxo__ind v2-fluxo__ind--mais">+23</div>
            </div>
            <span className="v2-fluxo__legenda">mais de 30 indústrias representadas</span>
          </div>
        </div>

        {/* o ganho, explícito */}
        <div className="v2-fluxo__ganho">
          <div className="v2-fluxo__ganho-lado v2-fluxo__ganho-lado--antes">
            <span className="v2-fluxo__ganho-rot">Sem a Bedin</span>
            <strong>30 contatos</strong>
            <span>30 cotações para comparar, 30 fretes para pagar</span>
          </div>
          <div className="v2-fluxo__ganho-lado v2-fluxo__ganho-lado--depois">
            <span className="v2-fluxo__ganho-rot">Com a Bedin</span>
            <strong>1 contato</strong>
            <span>1 cotação consolidada, 1 frete só</span>
          </div>
        </div>

        <ol className="v2-fluxo__etapas">
          {etapas.map(e => (
            <li key={e.n}>
              <span className="v2-fluxo__n">{e.n}</span>
              <div>
                <h3>{e.titulo}</h3>
                <p>{e.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
