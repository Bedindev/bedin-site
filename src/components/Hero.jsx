import { Link } from 'react-router-dom'
import { trackWhatsApp } from '../analytics'
import WhatsAppIcon from './WhatsAppIcon'

const destaques = [
  { src: '/Frutas secas.png', nome: 'Frutas secas' },
  { src: '/especiarias.png', nome: 'Especiarias' },
  { src: '/grãos.png', nome: 'Grãos' },
  { src: '/sementes.png', nome: 'Sementes' },
  { src: '/chas.png', nome: 'Chás' },
  { src: '/farinaceos.png', nome: 'Farináceos' },
]

const credenciais = [
  { num: 'Desde 2016', label: 'Em atividade\nhá dez anos' },
  { num: '+30', label: 'Fornecedores\nrepresentados' },
  { num: '+200', label: 'Lojas atendidas\ntodo mês' },
  { num: '4,9', label: 'Nota no Google\ncentenas de avaliações' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow">Representação comercial de alimentos naturais</span>
          <h1 className="hero__title">
            Um único contato para abastecer <span className="accent">toda a sua loja natural</span>.
          </h1>
          <p className="hero__subtitle">
            A Bedin representa mais de 30 indústrias do setor de naturais. Você envia a sua lista
            uma vez e recebe cotação consolidada em até 24 horas úteis — com preço, prazo e frete
            fechados.
          </p>
          <div className="hero__ctas">
            <a
              href="https://wa.me/5548998680025?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp large"
              onClick={() => trackWhatsApp('hero')}
            >
              <WhatsAppIcon size={17} />
              Solicitar cotação
            </a>
            <Link to="/como-funciona" className="btn btn-tonal">
              Como trabalhamos
            </Link>
          </div>
          <dl className="hero__creds">
            {credenciais.map(c => (
              <div className="hero__cred" key={c.num}>
                <dt className="hero__cred-num">{c.num}</dt>
                <dd className="hero__cred-label">
                  {c.label.split('\n').map((linha, i) => (
                    <span key={i}>
                      {linha}
                      {i === 0 && <br />}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__visual">
          <div className="hero__mosaic">
            {destaques.map(d => (
              <figure key={d.nome}>
                <img src={d.src} alt={d.nome} loading="eager" width="160" height="160" />
                <figcaption>{d.nome}</figcaption>
              </figure>
            ))}
          </div>
          <p className="hero__mosaic-note">
            8 categorias · mais de 1.000 itens em catálogo
          </p>
        </div>
      </div>
    </section>
  )
}
