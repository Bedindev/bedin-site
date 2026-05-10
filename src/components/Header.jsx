import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  const handleNavClick = (e, href) => {
    e.preventDefault()
    closeMenu()
    const target = document.querySelector(href)
    if (target) {
      const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0
      window.scrollTo({ top: target.offsetTop - headerHeight - 12, behavior: 'smooth' })
    }
  }

  return (
    <header ref={headerRef} className={`header${scrolled ? ' scrolled' : ''}`} id="header">
      <div className="container header__inner">
        <a href="#" className="header__logo">
          <img src="/logo vetorizado Bedin.png" alt="Bedin Representação" height="40" />
        </a>
        <nav className={`header__nav${menuOpen ? ' open' : ''}`} id="nav">
          {isHome ? (
            <>
              <a href="#sobre" onClick={e => handleNavClick(e, '#sobre')}>Sobre nós</a>
              <a href="#produtos" onClick={e => handleNavClick(e, '#produtos')}>Produtos</a>
              <a href="#diferenciais" onClick={e => handleNavClick(e, '#diferenciais')}>Diferenciais</a>
              <a href="#cotacao" onClick={e => handleNavClick(e, '#cotacao')}>Cotação</a>
            </>
          ) : (
            <>
              <Link to="/" onClick={closeMenu}>Início</Link>
              <Link to="/#sobre" onClick={closeMenu}>Sobre nós</Link>
              <Link to="/#cotacao" onClick={closeMenu}>Cotação</Link>
            </>
          )}
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
        </nav>
        <div className="header__actions">
          <a
            href="https://wa.me/5548998680025?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Bedin!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm-hide"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar agora · (48) 99868-0025
          </a>
          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            id="hamburger"
            aria-label="Menu"
            onClick={toggleMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
