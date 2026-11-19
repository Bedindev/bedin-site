const features = [
  {
    title: 'Cotação consolidada em 24h úteis',
    desc: 'Você envia a lista uma vez. A Bedin cota com todos os fornecedores que atendem aquele mix e devolve preço, prazo e disponibilidade em um único documento.'
  },
  {
    title: 'Mais de 30 indústrias, um só interlocutor',
    desc: 'Em vez de negociar com dezenas de representantes, a sua loja trata com a Bedin. Pedido, acompanhamento, prazo e pós-venda passam pelo mesmo canal.'
  },
  {
    title: 'Frete consolidado',
    desc: 'Pedidos de fornecedores diferentes são agrupados em uma única operação logística, o que reduz o custo por quilo e encurta o prazo de reposição.'
  },
  {
    title: 'Mix completo do varejo natural',
    desc: '8 categorias e mais de 1.000 itens: frutas secas, especiarias, grãos, sementes, chás, chips, drageados e farináceos. Sem necessidade de buscar fora.'
  },
  {
    title: 'Carteira com atendimento nominal',
    desc: 'Cada loja tem um responsável fixo na equipe, que conhece o histórico de compras e o giro da operação. Sem fila de atendimento e sem rodízio.'
  },
  {
    title: 'Decisão comercial sem intermediário',
    desc: 'A Bedin é administrada pelos próprios sócios. Condição especial, exceção de prazo ou ajuste de pedido são resolvidos diretamente com quem decide.'
  }
]

export default function Features() {
  return (
    <section className="features section" id="diferenciais">
      <div className="container">
        <div className="sec-header">
          <span className="label">O que a representação cobre</span>
          <h2 className="sec-title">
            O que muda na operação da sua loja <span className="accent">com a Bedin como representante</span>.
          </h2>
          <p className="sec-sub">
            A função de uma representação comercial é tirar da loja o trabalho de garimpar fornecedor,
            comparar condição e administrar frete. É isso que a Bedin faz desde 2016.
          </p>
        </div>
        <div className="features__grid">
          {features.map((f, i) => (
            <div className="feature-card" key={f.title}>
              <span className="feature-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
