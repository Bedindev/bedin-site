export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="https://www.bedinrepresentacao.com.br" className="header__logo">
          <img src="/logo vetorizado Bedin.png" alt="Bedin" height={36} width={120} />
          <div>
            <span className="logo-text">Bedin</span>
            <span className="logo-sub">Representação</span>
          </div>
        </a>
        <nav className="header__nav">
          <a href="https://www.bedinrepresentacao.com.br/#produtos">Produtos</a>
          <a href="https://www.bedinrepresentacao.com.br/#sobre">Sobre</a>
          <a href="/blog">Blog</a>
          <a href="https://www.bedinrepresentacao.com.br/#cotacao">Cotação</a>
        </nav>
        <div className="header__actions">
          <a
            href="https://wa.me/5548998680025?text=Ol%C3%A1%20Bedin%2C%20vim%20pelo%20blog!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-filled"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
