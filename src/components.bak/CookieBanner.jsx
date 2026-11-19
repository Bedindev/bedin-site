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
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '480px',
      background: '#fff',
      color: '#333',
      borderRadius: '10px',
      padding: '14px 18px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
      border: '1px solid #e8e8e8',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    }}>
      <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5', flex: 1, minWidth: '200px' }}>
        Usamos cookies para melhorar sua experiência. <a href="/politica-de-privacidade" style={{ color: '#5a8a2e', textDecoration: 'underline' }}>Saiba mais</a>.
      </p>
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={handleDecline}
          style={{
            background: 'transparent',
            border: '1px solid #ddd',
            color: '#888',
            borderRadius: '6px',
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          Recusar
        </button>
        <button
          onClick={handleAccept}
          style={{
            background: '#5a8a2e',
            border: 'none',
            color: '#fff',
            borderRadius: '6px',
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
          }}
        >
          Aceitar
        </button>
      </div>
    </div>
  )
}
