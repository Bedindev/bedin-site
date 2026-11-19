import { useRef, useState } from 'react'
import { trackFormSubmit, trackWhatsApp } from '../analytics'
import WhatsAppIcon, { whatsappLink } from './WhatsAppIcon'

const WA_NUMERO = '5548998680025'

/* Formulário no padrão do mercos.com: card branco, campos de 48px com
   borda sutil e raio 6px, rótulos acima, botão de largura total.

   O envio monta a mensagem e abre o WhatsApp. Pontos importantes:
   - `window.open` devolve null quando o popup é bloqueado. Nesse caso o
     formulário NÃO é limpo e o usuário recebe um link para clicar.
   - O texto de sucesso não diz "recebido": a Bedin só recebe quando a
     pessoa aperta enviar no WhatsApp. Dizer o contrário seria mentira.
   - O conteúdo digitado nunca é apagado automaticamente. */
export default function ContactV2() {
  const formRef = useRef(null)
  const [estado, setEstado] = useState('parado') // parado | aberto | bloqueado
  const [link, setLink] = useState('')

  const montarMensagem = f => {
    const v = id => f.querySelector(`#${id}`).value.trim()
    return [
      'Olá Bedin, vim pelo site e quero uma cotação:',
      '',
      `*Nome:* ${v('v2-nome')}`,
      `*Loja/Empresa:* ${v('v2-empresa')}`,
      `*WhatsApp:* ${v('v2-tel')}`,
      v('v2-email') ? `*E-mail:* ${v('v2-email')}` : '',
      `*Produtos:* ${v('v2-produtos')}`,
      v('v2-qtd') ? `*Volume mensal:* ${v('v2-qtd')}` : '',
    ].filter(Boolean).join('\n')
  }

  const handleSubmit = e => {
    e.preventDefault()
    const url = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(montarMensagem(formRef.current))}`

    trackFormSubmit()
    setLink(url)

    /* Sem 'noopener' nas features: com ele o navegador devolve null mesmo
       quando a aba abre, e não dá para distinguir sucesso de bloqueio.
       A segurança vem de zerar `opener` na janela retornada. */
    const janela = window.open(url, '_blank')
    if (janela) {
      try { janela.opener = null } catch { /* origem cruzada: já isolada */ }
      setEstado('aberto')
    } else {
      // popup bloqueado: mantém tudo preenchido e oferece o link
      setEstado('bloqueado')
    }
  }

  const limpar = () => {
    formRef.current.reset()
    setEstado('parado')
    setLink('')
  }

  return (
    <section className="v2-contato section" id="cotacao">
      <div className="container">
        <div className="v2-sec-head">
          <span className="label">Cotação</span>
          <h2>Envie a sua lista e receba a cotação em 24h úteis</h2>
          <p>Sem custo, sem cadastro e sem compromisso. Você recebe preço, prazo e condição de pagamento.</p>
        </div>

        <div className="v2-contato__grid">
          <form className="v2-form" ref={formRef} onSubmit={handleSubmit} id="v2-form-cotacao">
            <div className="v2-form__linha">
              <div className="v2-campo">
                <label htmlFor="v2-nome">Nome</label>
                <input
                  type="text" id="v2-nome" name="nome"
                  placeholder="Nome e sobrenome"
                  autoComplete="name" required
                />
              </div>
              <div className="v2-campo">
                <label htmlFor="v2-empresa">Loja ou empresa</label>
                <input
                  type="text" id="v2-empresa" name="empresa"
                  placeholder="Razão social ou nome fantasia"
                  autoComplete="organization" required
                />
              </div>
            </div>

            <div className="v2-form__linha">
              <div className="v2-campo">
                <label htmlFor="v2-tel">WhatsApp</label>
                <input
                  type="tel" id="v2-tel" name="telefone"
                  placeholder="(00) 00000-0000"
                  autoComplete="tel" inputMode="tel" required
                />
              </div>
              <div className="v2-campo">
                <label htmlFor="v2-email">E-mail <span>(opcional)</span></label>
                <input
                  type="email" id="v2-email" name="email"
                  placeholder="seu@email.com"
                  autoComplete="email" inputMode="email"
                />
              </div>
            </div>

            <div className="v2-campo">
              <label htmlFor="v2-produtos">Itens para cotação</label>
              <textarea
                id="v2-produtos" name="produtos" rows="4"
                placeholder="50 kg de uva passa&#10;30 kg de chia&#10;20 kg de castanha de caju"
                aria-describedby="v2-produtos-dica" required
              />
              <span className="v2-campo__dica" id="v2-produtos-dica">
                Um item por linha, com a quantidade. Não precisa ser exato.
              </span>
            </div>

            <div className="v2-campo">
              <label htmlFor="v2-qtd">Volume mensal estimado <span>(opcional)</span></label>
              <input
                type="text" id="v2-qtd" name="volume"
                placeholder="Ex.: 200 kg/mês"
              />
            </div>

            <button type="submit" className="btn v2-btn-primary v2-form__enviar">
              <WhatsAppIcon size={18} />
              Abrir no WhatsApp para enviar
            </button>

            {/* o estado é anunciado por leitor de tela */}
            <div className="v2-form__estado" role="status" aria-live="polite">
              {estado === 'aberto' && (
                <p className="v2-form__ok">
                  <strong>Quase lá:</strong> a conversa abriu no WhatsApp com a sua
                  lista já escrita. Toque em enviar por lá para a Bedin receber.
                  {' '}
                  <button type="button" className="v2-form__link" onClick={limpar}>
                    Limpar o formulário
                  </button>
                </p>
              )}
              {estado === 'bloqueado' && (
                <p className="v2-form__alerta">
                  <strong>O navegador bloqueou a janela.</strong> Os seus dados continuam
                  aqui — <a href={link} target="_blank" rel="noopener noreferrer">
                    abrir a conversa no WhatsApp
                  </a>.
                </p>
              )}
            </div>

            <p className="v2-form__nota">
              Cotação sem custo e sem compromisso · Resposta em até 24h úteis ·
              Os dados são usados apenas para o retorno comercial
            </p>
          </form>

          <aside className="v2-contato__lado">
            <h3>Prefere falar direto?</h3>
            <p>O atendimento comercial responde pelo WhatsApp em horário comercial.</p>

            <a
              href={whatsappLink('Olá, gostaria de solicitar uma cotação.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn v2-btn-outline v2-contato__wa"
              onClick={() => trackWhatsApp('v2_contato_lateral')}
            >
              <WhatsAppIcon size={17} />
              (48) 99868-0025
            </a>

            <dl className="v2-contato__dados">
              <div>
                <dt>Telefone</dt>
                <dd>(48) 99861-1350</dd>
              </div>
              <div>
                <dt>Sede</dt>
                <dd>Biguaçu, SC</dd>
              </div>
              <div>
                <dt>Atendimento</dt>
                <dd>Todo o Brasil</dd>
              </div>
              <div>
                <dt>Desde</dt>
                <dd>Outubro de 2016</dd>
              </div>
            </dl>

            {/* o que acontece depois de enviar — tira a incerteza de quem
                nunca pediu cotação para uma representação */}
            <div className="v2-contato__passos">
              <h4>O que acontece depois</h4>
              <ol>
                <li>A Bedin confere a lista e cota com as indústrias do mix.</li>
                <li>Você recebe uma proposta só, com preço, prazo e frete.</li>
                <li>Se aprovar, o pedido é colocado. Sem aprovar, acabou aí.</li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
