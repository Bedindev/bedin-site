export function trackWhatsApp(location) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'contato',
      event_label: location,
    })
  }
}

export function trackPhone(location) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'phone_click', {
      event_category: 'contato',
      event_label: location,
    })
  }
}

export function trackFormSubmit() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_cotacao_submit', {
      event_category: 'conversao',
      event_label: 'formulario_cotacao',
    })
  }
}
