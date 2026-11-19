const numeros = [
  { valor: '4,9', sufixo: '/5', label: 'Nota no Google, com centenas de avaliações de lojistas' },
  { valor: '1.000', sufixo: '+', label: 'Itens ativos em catálogo, distribuídos em 8 categorias' },
  { valor: '30', sufixo: '+', label: 'Indústrias representadas no setor de alimentos naturais' },
  { valor: '200', sufixo: '+', label: 'Lojas atendidas todos os meses em todo o Brasil' }
]

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats__header">
          <span className="label">A operação em números</span>
          <h2 className="sec-title">Dez anos de atividade, auditáveis na prática.</h2>
        </div>
        <div className="stats__grid">
          {numeros.map(n => (
            <div key={n.label}>
              <div className="stat-val">
                {n.valor}<span className="stat-suffix">{n.sufixo}</span>
              </div>
              <div className="stat-label">{n.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
