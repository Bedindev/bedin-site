import { trackWhatsApp } from '../analytics'
import WhatsAppIcon, { whatsappLink } from './WhatsAppIcon'

export const JORNADA_STEPS = [
  {
    id: 'lista',
    short: 'Envie sua lista',
    title: 'Envie sua lista',
    text: 'Mande pelo WhatsApp os produtos e as quantidades de que sua loja precisa.',
  },
  {
    id: 'comparacao',
    short: 'Comparamos',
    title: 'Comparamos as opções',
    text: 'A Bedin consulta os fornecedores parceiros e organiza preços, disponibilidade e condições para facilitar sua escolha.',
  },
  {
    id: 'frete',
    short: 'Frete',
    title: 'Avaliamos o frete',
    text: 'Buscamos opções de transporte, prazo e custo para você analisar a compra completa antes de confirmar.',
  },
  {
    id: 'pedido',
    short: 'Pedido',
    title: 'Acompanhamos o pedido',
    text: 'Nossa equipe acompanha nota fiscal, transportadora, previsão e andamento do pedido.',
  },
  {
    id: 'suporte',
    short: 'Suporte',
    title: 'Suporte até a entrega',
    text: 'Você recebe atualizações e conta com atendimento humano se surgir qualquer dúvida, atraso, avaria ou problema.',
  },
]

const WA_MESSAGE = 'Olá, vim pelo site da Bedin e quero enviar uma lista para cotação.'

export default function JornadaBedin() {
  return (
    <section className="jornada section" id="como-funciona" aria-labelledby="jornada-title">
      <div className="container">
        <div className="sec-header">
          <span className="label">Etapa a etapa</span>
          <h2 className="sec-title" id="jornada-title">
            Da lista enviada <span className="accent">até a entrega na sua loja</span>.
          </h2>
          <p className="sec-sub">
            São cinco etapas, todas conduzidas pela mesma equipe e pelo mesmo canal.
          </p>
        </div>

        <ol className="jornada__steps">
          {JORNADA_STEPS.map((step, i) => (
            <li className="jornada__step" key={step.id}>
              <span className="jornada__num">{String(i + 1).padStart(2, '0')}</span>
              <div className="jornada__body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="jornada__cta">
          <a
            href={whatsappLink(WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            onClick={() => trackWhatsApp('como_funciona_jornada')}
          >
            <WhatsAppIcon size={17} />
            Enviar minha lista no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
