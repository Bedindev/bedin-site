import { trackWhatsApp } from '../analytics'

const logos = [
  { src: '/logos-fornecedores/fornecedor-Nuttini.png', alt: 'Nuttini' },
  { src: '/logos-fornecedores/fornecedor-banto.png', alt: 'Banto' },
  { src: '/logos-fornecedores/fornecedor-brasbol.png', alt: 'Brasbol' },
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
  { src: '/logos-fornecedores/fornecedor-letha.png', alt: 'Letha' },
  { src: '/logos-fornecedores/fornecedor-nl.png', alt: 'NL' },
  { src: '/logos-fornecedores/fornecedor-polico.png', alt: 'Polico' },
  { src: '/logos-fornecedores/fornecedor-sacredoux.png', alt: 'Sacredoux' },
  { src: '/logos-fornecedores/fornecedor-vida-em-graos.png', alt: 'Vida em Grãos' },
  { src: '/logos-fornecedores/fornecedor-vimacedo.png', alt: 'Vimacedo' },
  { src: '/logos-fornecedores/fornecedro-suprema.png', alt: 'Suprema' },
]

export default function Suppliers() {
  return (
    <section className="suppliers" id="fornecedores">
      <div className="container">
        <div className="suppliers__header">
          <span className="label">Indústrias representadas</span>
          <h2 className="sec-title">
            Mais de 30 fornecedores, <span className="accent">selecionados ao longo de dez anos</span>.
          </h2>
          <p className="sec-sub">
            O portfólio é montado com base em três critérios: consistência de qualidade,
            regularidade de entrega e giro comprovado no varejo natural.
          </p>
        </div>

        <div className="suppliers__grid">
          {logos.map(l => (
            <div className="logo-item" key={l.alt}>
              <img src={l.src} alt={l.alt} loading="lazy" />
            </div>
          ))}
        </div>

        <div className="suppliers__cta">
          <a
            href="https://wa.me/5548998680025?text=Ol%C3%A1%2C%20gostaria%20de%20receber%20a%20rela%C3%A7%C3%A3o%20completa%20de%20fornecedores."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-tonal"
            onClick={() => trackWhatsApp('fornecedores')}
          >
            Receber a relação completa
          </a>
        </div>
      </div>
    </section>
  )
}
