import ZapMock from './ZapMock'

/* Cobertura da Bedin, ao lado do exemplo de como a cotação chega.
   O mock vem do ZapMock — o mesmo do hero, sem a moldura de celular
   (aqui ele é apoio, não o visual principal). */

export default function CoberturaBrasil() {
  return (
    <section className="v2-cobertura section">
      <div className="container v2-cobertura__grid">
        <div className="v2-cobertura__texto">
          <span className="label">Cobertura</span>
          <h2>Da Bahia ao Rio Grande do Sul</h2>
          <p>
            A Bedin atende mais de 200 lojas por mês em todo o território nacional,
            com sede em Biguaçu, Santa Catarina. O frete é consolidado entre as
            indústrias para reduzir o custo por quilo.
          </p>

          <dl className="v2-cobertura__dados">
            <div>
              <dt>Sede</dt>
              <dd>Biguaçu, SC</dd>
            </div>
            <div>
              <dt>Atendimento</dt>
              <dd>Brasil inteiro</dd>
            </div>
            <div>
              <dt>Lojas por mês</dt>
              <dd>Mais de 200</dd>
            </div>
          </dl>
        </div>

        <div className="v2-cobertura__visual">
          <ZapMock telefone nota={false} />
          <p className="v2-cobertura__legenda">
            Assim chega a sua cotação. <span>Exemplo ilustrativo.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
