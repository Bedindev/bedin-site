import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import ComoFuncionaResumo from './components/ComoFuncionaResumo.jsx'
import Features from './components/Features.jsx'
import Suppliers from './components/Suppliers.jsx'
import Products from './components/Products.jsx'
import About from './components/About.jsx'
import Reviews from './components/Reviews.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import Privacidade from './pages/Privacidade.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import V2 from './pages/V2.jsx'
import './v2.css'

// Client-side navigations keep the previous scroll position; the browser only
// handles the initial load. Skip the first render so reload restoration still works.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    if (hash) {
      let target = null
      try { target = document.querySelector(hash) } catch { target = null }
      if (target) {
        const header = document.getElementById('header')
        window.scrollTo({ top: target.offsetTop - (header ? header.offsetHeight : 0) - 12 })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <ComoFuncionaResumo />
        <Features />
        <Suppliers />
        <Products />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        {/* A versão retrofitada passou a ser a home. A anterior continua
            acessível em /v1 para comparação e rollback rápido. */}
        <Route path="/" element={<V2 />} />
        <Route path="/v1" element={<Home />} />
        <Route path="/politica-de-privacidade" element={<Privacidade />} />
        {/* "Sobre nós" e "Como funciona" saíram do site. As URLs continuam
            redirecionando para a home: as duas estavam no sitemap e indexadas
            (a de como-funciona com prioridade 0.9), então apagá-las geraria
            404 para quem chega pelo Google ou por link antigo. */}
        <Route path="/sobre" element={<Navigate to="/" replace />} />
        <Route path="/como-funciona" element={<Navigate to="/" replace />} />
        <Route path="/v2" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
      <CookieBanner />
    </BrowserRouter>
  )
}

export default App
