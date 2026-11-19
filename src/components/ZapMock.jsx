/* Exemplo de como a cotação chega no WhatsApp, dentro de uma moldura de
   celular — o mesmo recurso que o mercos.com usa no hero.

   A moldura importa: é ela que faz o olho reconhecer "isso é uma conversa
   de WhatsApp" antes de ler qualquer palavra.

   Dados ilustrativos, não é captura de conversa real. O rodapé diz isso.
   `telefone` liga a moldura; sem ela o mock renderiza solto, como estava
   na seção de cobertura. */

function Check() {
  return (
    <svg viewBox="0 0 16 11" className="v2-zap__check" aria-hidden="true">
      <path d="M1 6.2 L3.6 8.8 L9.2 2.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.4 6.2 L9 8.8 L14.6 2.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ZapMock({ telefone = false, nota = true }) {
  const conversa = (
    <figure className={`v2-zap${telefone ? ' v2-zap--tel' : ''}`}>
      <div className="v2-zap__barra">
        {telefone && (
          <span className="v2-zap__voltar" aria-hidden="true">‹</span>
        )}
        <span className="v2-zap__avatar" aria-hidden="true">
          <img src="/logo vetorizado Bedin.png" alt="" />
        </span>
        <span className="v2-zap__contato">
          <strong>Bedin Representações</strong>
          <em>online</em>
        </span>
      </div>

      <div className="v2-zap__corpo">
        <div className="v2-zap__dia" aria-hidden="true"><span>Hoje</span></div>

        <div className="v2-zap__linha v2-zap__linha--loja">
          <div className="v2-zap__balao v2-zap__balao--loja">
            <p>Preciso de uva passa, chia e castanha de caju. Uns 50&nbsp;kg de cada.</p>
            <span className="v2-zap__meta">09:12<Check /></span>
          </div>
        </div>

        <div className="v2-zap__linha v2-zap__linha--bedin">
          <div className="v2-zap__balao v2-zap__balao--bedin">
            <p className="v2-zap__intro">Cotação consolidada:</p>
            <ul>
              <li><span>Uva passa chilena</span><span>50 kg</span></li>
              <li><span>Chia premium</span><span>50 kg</span></li>
              <li><span>Castanha de caju W2</span><span>50 kg</span></li>
            </ul>
            <p className="v2-zap__resumo">
              3 indústrias · 1 frete · entrega em 7 dias úteis
            </p>
            <span className="v2-zap__meta">09:48</span>
          </div>
        </div>
      </div>

      {nota && (
        <figcaption className="v2-zap__nota">
          Exemplo ilustrativo. Produtos e prazos variam conforme a cotação.
        </figcaption>
      )}
    </figure>
  )

  if (!telefone) return conversa

  return (
    <div className="v2-tel-palco">
      <div className="v2-tel">
        <div className="v2-tel__corpo">
          <div className="v2-tel__ilha" aria-hidden="true" />
          <div className="v2-tel__status" aria-hidden="true">
            <span className="v2-tel__hora">9:41</span>
            <span className="v2-tel__icones">
              <svg viewBox="0 0 18 12" width="17" height="11"><g fill="currentColor">
                <rect x="0" y="8" width="3" height="4" rx="1" />
                <rect x="4.5" y="6" width="3" height="6" rx="1" />
                <rect x="9" y="3" width="3" height="9" rx="1" />
                <rect x="13.5" y="0" width="3" height="12" rx="1" />
              </g></svg>
              <svg viewBox="0 0 16 12" width="15" height="11"><path fill="currentColor" d="M8 11.2 5.4 8.5a3.7 3.7 0 0 1 5.2 0zM3 6.1a7.8 7.8 0 0 1 10 0l-1.3 1.4a5.9 5.9 0 0 0-7.4 0zM.6 3.6a11.3 11.3 0 0 1 14.8 0L14 5a9.4 9.4 0 0 0-12 0z" /></svg>
              <svg viewBox="0 0 26 12" width="24" height="11">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.5" />
                <rect x="2" y="2" width="18" height="8" rx="1.6" fill="currentColor" />
                <path d="M23.5 4.2v3.6a2 2 0 0 0 0-3.6z" fill="currentColor" opacity="0.5" />
              </svg>
            </span>
          </div>
          {conversa}
        </div>
      </div>
    </div>
  )
}
