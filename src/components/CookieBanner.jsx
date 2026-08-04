import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setVisible(true)
    } else if (consent === 'accepted') {
      enableGA()
    }
  }, [])

  function enableGA() {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      })
    }
  }

  function handleAccept() {
    localStorage.setItem('cookie_consent', 'accepted')
    enableGA()
    setVisible(false)
  }

  function handleDecline() {
    localStorage.setItem('cookie_consent', 'declined')
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      })
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)',
      maxWidth: '640px',
      background: '#1a1a1a',
      color: '#f5f5f5',
      borderRadius: '12px',
      padding: '20px 24px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
        Usamos cookies para analisar o tráfego do site com o Google Analytics e melhorar sua experiência.
        Veja nossa <a href="/politica-de-privacidade" style={{ color: '#8bc34a', textDecoration: 'underline' }}>Política de Privacidade</a>.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button
          onClick={handleDecline}
          style={{
            background: 'transparent',
            border: '1px solid #555',
            color: '#aaa',
            borderRadius: '8px',
            padding: '8px 20px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Recusar
        </button>
        <button
          onClick={handleAccept}
          style={{
            background: '#8bc34a',
            border: 'none',
            color: '#fff',
            borderRadius: '8px',
            padding: '8px 20px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          Aceitar cookies
        </button>
      </div>
    </div>
  )
}
