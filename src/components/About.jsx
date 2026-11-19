import { Link } from 'react-router-dom'

const ficha = [
  { termo: 'Fundação', valor: 'Outubro de 2016' },
  { termo: 'Sede', valor: 'Biguaçu, SC' },
  { termo: 'Área de atuação', valor: 'Brasil' },
  { termo: 'Equipe', valor: '12 profissionais' },
  { termo: 'Segmento', valor: 'Alimentos naturais' },
  { termo: 'Indústrias representadas', valor: 'Mais de 30' }
]

export default function About() {
  return (
    <section className="about section" id="sobre">
      <div className="container">
        <div className="about__grid">
          <div className="about__content">
            <span className="label">A empresa</span>
            <h2 className="sec-title">
              Uma representação comercial construída <span className="accent">loja a loja, desde 2016</span>.
            </h2>
            <p className="about__lead">
              A Bedin Representações foi fundada em outubro de 2016 em Biguaçu, Santa Catarina,
              atendendo inicialmente lojas da Grande Florianópolis.
            </p>
            <p className="about__body">
              A empresa é administrada pelos sócios fundadores e hoje conta com uma equipe de
              12 profissionais. A carteira reúne mais de 200 lojas atendidas mensalmente em todo o
              território nacional, com um portfólio de mais de 30 indústrias do setor de alimentos
              naturais.
            </p>
            <p className="about__body">
              A seleção de cada fornecedor representado considera três critérios: consistência de
              qualidade, regularidade de entrega e giro comprovado no varejo natural. É esse
              filtro que sustenta a nota 4,9 registrada no Google ao longo de dez anos de operação.
            </p>
            <div className="about__cta">
              <Link to="/sobre" className="btn btn-tonal">Conhecer a empresa</Link>
            </div>
          </div>

          <div className="about__ficha">
            <h3>Dados da empresa</h3>
            <dl>
              {ficha.map(f => (
                <div key={f.termo}>
                  <dt>{f.termo}</dt>
                  <dd>{f.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
