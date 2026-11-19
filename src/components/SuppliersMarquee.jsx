import { trackWhatsApp } from '../analytics'

const logos = [
  { src: '/logos-fornecedores/fornecedor-Nuttini.png', alt: 'Nuttini' },
  { src: '/logos-fornecedores/fornecedor-banto.png', alt: 'Bantô' },
  { src: '/logos-fornecedores/fornecedor-brasbol.png', alt: 'BrasBol' },
  { src: '/logos-fornecedores/fornecedor-brasil-ervas.png', alt: 'Brasil Ervas' },
  { src: '/logos-fornecedores/fornecedor-brasnutt.png', alt: 'Brasnutt' },
  { src: '/logos-fornecedores/fornecedor-castanhas-ouro-verde.png', alt: 'Castanhas Ouro Verde' },
  { src: '/logos-fornecedores/fornecedor-costa.png', alt: 'Costa' },
  { src: '/logos-fornecedores/fornecedor-cs.png', alt: 'CS' },
  { src: '/logos-fornecedores/fornecedor-dicaju.png', alt: 'Dicaju' },
  { src: '/logos-fornecedores/fornecedor-divinut.png', alt: 'Divinut' },
  { src: '/logos-fornecedores/fornecedor-elmar.png', alt: 'Elmar' },
  { src: '/logos-fornecedores/fornecedor-gramore.png', alt: 'Gramore' },
  { src: '/logos-fornecedores/fornecedor-granne.png', alt: 'Granne' },
  { src: '/logos-fornecedores/fornecedor-granvital.png', alt: 'Granvital' },
  { src: '/logos-fornecedores/fornecedor-icau.png', alt: 'Icaú' },
  { src: '/logos-fornecedores/fornecedor-jandira-reserva.png', alt: 'Jandira Reserva' },
  { src: '/logos-fornecedores/fornecedor-jandira.png', alt: 'Jandira' },
  { src: '/logos-fornecedores/fornecedor-jtc.png', alt: 'JTC' },
  { src: '/logos-fornecedores/fornecedor-jutica.png', alt: 'Jutica' },
  { src: '/logos-fornecedores/fornecedor-leryc.png', alt: 'Leryc' },
  { src: '/logos-fornecedores/fornecedor-letha.png', alt: 'Letha Trading' },
  { src: '/logos-fornecedores/fornecedor-nl.png', alt: 'NL' },
  { src: '/logos-fornecedores/fornecedor-polico.png', alt: 'Polico' },
  { src: '/logos-fornecedores/fornecedor-sacredoux.png', alt: 'Sacrè Doux' },
  { src: '/logos-fornecedores/fornecedor-vida-em-graos.png', alt: 'Vida em Grãos' },
  { src: '/logos-fornecedores/fornecedor-vimacedo.png', alt: 'Vimacedo' },
  { src: '/logos-fornecedores/fornecedro-suprema.png', alt: 'Suprema' },
]

/* Faixa que rola continuamente, como a do mercos.com (slide 40s linear infinite).
   A lista é duplicada para o laço não ter emenda visível. */
export default function SuppliersMarquee() {
  return (
    <section className="v2-marca" id="fornecedores">
      <div className="container">
        <div className="v2-sec-head">
          <span className="label">Indústrias representadas</span>
          <h2>Mais de 30 fornecedores, selecionados ao longo de dez anos</h2>
          <p>
            O portfólio é montado com base em três critérios: consistência de qualidade,
            regularidade de entrega e giro comprovado no varejo natural.
          </p>
        </div>
      </div>

      <div className="v2-marca__faixa">
        <div className="v2-marca__trilho">
          {[0, 1].map(copia => (
            <div className="v2-marca__grupo" key={copia} aria-hidden={copia === 1}>
              {logos.map(l => (
                <div className="v2-marca__item" key={`${copia}-${l.alt}`}>
                  <img src={l.src} alt={copia === 0 ? l.alt : ''} loading="lazy" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="v2-marca__cta">
          <a
            href="https://wa.me/5548998680025?text=Ol%C3%A1%2C%20gostaria%20de%20receber%20a%20rela%C3%A7%C3%A3o%20completa%20de%20fornecedores."
            target="_blank"
            rel="noopener noreferrer"
            className="btn v2-btn-outline"
            onClick={() => trackWhatsApp('v2_fornecedores')}
          >
            Receber a relação completa
          </a>
        </div>
      </div>
    </section>
  )
}
