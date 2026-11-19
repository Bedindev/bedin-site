import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'

const steps = ['Envie sua lista', 'Compare as opções', 'Escolha com segurança', 'Acompanhe a entrega']

export default function ComoFuncionaResumo() {
  return (
    <section className="resumo section" aria-labelledby="resumo-title">
      <div className="container resumo__inner">
        <Reveal className="resumo__content">
          <span className="label">Como funciona</span>
          <h2 className="sec-title" id="resumo-title">
            Da cotação à entrega, <span className="accent">a Bedin cuida de cada etapa</span>.
          </h2>
          <p className="sec-sub">
            A lista é enviada uma única vez. A Bedin compara as condições entre os fornecedores, organiza o frete, acompanha o pedido e responde pela entrega.
          </p>
          <Link to="/como-funciona" className="btn btn-tonal resumo__cta">
            Conheça nosso atendimento completo
          </Link>
        </Reveal>
        <Reveal as="ol" className="resumo__steps" aria-label="Etapas resumidas">
          {steps.map((step, i) => (
            <li key={step}>
              <span className="resumo__num" aria-hidden="true">{i + 1}</span>
              <span className="resumo__step-label">{step}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
