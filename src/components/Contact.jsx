import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const leftRef = useRef(null)
  const formRef = useRef(null)
  const [btnText, setBtnText] = useState('Enviar solicitação')
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [btnStyle, setBtnStyle] = useState({})
  const formElRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )
    if (leftRef.current) observer.observe(leftRef.current)
    if (formRef.current) observer.observe(formRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBtnText('Enviando...')
    setBtnDisabled(true)

    const form = formElRef.current
    const dados = {
      nome: form.querySelector('#nome').value,
      empresa: form.querySelector('#empresa').value,
      telefone: form.querySelector('#tel').value,
      email: form.querySelector('#email').value,
      produtos: form.querySelector('#produtos').value,
      quantidade: form.querySelector('#qtd').value,
    }

    try {
      const res = await fetch('https://ebvwvzicdpvurmrpcgpd.supabase.co/functions/v1/form-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidnd2emljZHB2dXJtcnBjZ3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NzcwNzYsImV4cCI6MjA4OTM1MzA3Nn0.q5vKDjAM1q9tn47rI17PEIsBvU8JMXv5BU4EbBJ4xe0',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidnd2emljZHB2dXJtcnBjZ3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NzcwNzYsImV4cCI6MjA4OTM1MzA3Nn0.q5vKDjAM1q9tn47rI17PEIsBvU8JMXv5BU4EbBJ4xe0'
        },
        body: JSON.stringify(dados)
      })
      const data = await res.json()
      if (data.success) {
        setBtnText('✓ Solicitação enviada!')
        setBtnStyle({ background: '#25D366' })
        setTimeout(() => {
          form.reset()
          setBtnText('Enviar solicitação')
          setBtnDisabled(false)
          setBtnStyle({})
        }, 3500)
      } else {
        throw new Error('Resposta sem sucesso')
      }
    } catch {
      setBtnText('Erro — tente novamente')
      setBtnStyle({ background: '#ef4444' })
      setTimeout(() => {
        setBtnText('Enviar solicitação')
        setBtnDisabled(false)
        setBtnStyle({})
      }, 3000)
    }
  }

  return (
    <section className="contact section" id="cotacao">
      <div className="container">
        <div className="contact__grid">
          <div className="reveal" ref={leftRef}>
            <span className="label">Fale conosco</span>
            <h2 className="sec-title" style={{ textAlign: 'left' }}>Solicite sua<br /><span className="accent">cotação gratuita</span></h2>
            <p className="contact__sub">Preencha o formulário ou entre em contato diretamente. Respondemos em até 24 horas úteis.</p>
            <div className="contact__channels">
              <a href="https://wa.me/5548986800025" target="_blank" rel="noopener noreferrer" className="ch-card">
                <div className="ch-icon green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div><strong>WhatsApp</strong><span>(48) 9868-0025</span></div>
              </a>
              <a href="tel:+554899861-1350" className="ch-card">
                <div className="ch-icon tonal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div><strong>Telefone</strong><span>(48) 99861-1350</span></div>
              </a>
              <div className="ch-card">
                <div className="ch-icon warm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div><strong>Localização</strong><span>Biguaçu, SC</span></div>
              </div>
            </div>
          </div>
          <div className="form-card reveal" ref={formRef}>
            <h3>Solicitar cotação</h3>
            <form id="form-cotacao" onSubmit={handleSubmit} ref={formElRef}>
              <div className="fgroup">
                <label htmlFor="nome">Nome completo</label>
                <input type="text" id="nome" placeholder="Seu nome" required />
              </div>
              <div className="fgroup">
                <label htmlFor="empresa">Empresa</label>
                <input type="text" id="empresa" placeholder="Nome da sua empresa" required />
              </div>
              <div className="frow">
                <div className="fgroup">
                  <label htmlFor="tel">Telefone</label>
                  <input type="tel" id="tel" placeholder="(00) 00000-0000" required />
                </div>
                <div className="fgroup">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" id="email" placeholder="seu@email.com" required />
                </div>
              </div>
              <div className="fgroup">
                <label htmlFor="produtos">Produtos de interesse</label>
                <textarea id="produtos" rows="4" placeholder="Descreva os produtos que você precisa..." required></textarea>
              </div>
              <div className="fgroup">
                <label htmlFor="qtd">Quantidade estimada</label>
                <input type="text" id="qtd" placeholder="Ex: 50kg por mês" />
              </div>
              <button
                type="submit"
                className="btn btn-filled large full"
                style={{ marginTop: '8px', ...btnStyle }}
                disabled={btnDisabled}
              >
                {btnText}
              </button>
              <p className="form-hint">Cotação 100% gratuita. Respondemos em até 24h úteis.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
