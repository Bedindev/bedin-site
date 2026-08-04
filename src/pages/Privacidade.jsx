import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'

export default function Privacidade() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ marginBottom: '8px' }}>Política de Privacidade</h1>
          <p style={{ color: '#888', marginBottom: '40px' }}>Última atualização: agosto de 2026</p>

          <p>A <strong>Bedin Representações</strong> respeita a sua privacidade e está comprometida com a proteção dos seus dados pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.</p>

          <h2 style={{ marginTop: '40px', marginBottom: '12px' }}>1. Quem somos</h2>
          <p>Bedin Representações é uma empresa de representação comercial de alimentos naturais, com sede em Biguaçu, SC, atendendo lojas naturais em todo o Brasil desde 2016.</p>
          <p>Contato: <a href="mailto:bedinrepresentacao@gmail.com">bedinrepresentacao@gmail.com</a> · WhatsApp: <a href="tel:+5548998680025">(48) 99868-0025</a></p>

          <h2 style={{ marginTop: '40px', marginBottom: '12px' }}>2. Quais dados coletamos</h2>
          <p>Coletamos dados em duas situações:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            <li><strong>Formulário de cotação:</strong> nome, nome da empresa, WhatsApp, e-mail e descrição dos produtos desejados.</li>
            <li><strong>Navegação no site:</strong> dados anônimos de uso coletados automaticamente pelo Google Analytics 4, como páginas visitadas, tempo de navegação, localização aproximada (cidade/estado), dispositivo e origem do acesso.</li>
          </ul>

          <h2 style={{ marginTop: '40px', marginBottom: '12px' }}>3. Para que usamos seus dados</h2>
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            <li>Responder solicitações de cotação via WhatsApp</li>
            <li>Entrar em contato comercial quando solicitado</li>
            <li>Analisar o desempenho do site e melhorar a experiência de navegação</li>
          </ul>

          <h2 style={{ marginTop: '40px', marginBottom: '12px' }}>4. Base legal</h2>
          <p>O tratamento dos seus dados é baseado em:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            <li><strong>Consentimento</strong> — ao preencher o formulário de cotação</li>
            <li><strong>Legítimo interesse</strong> — para análise de desempenho do site via Google Analytics</li>
          </ul>

          <h2 style={{ marginTop: '40px', marginBottom: '12px' }}>5. Compartilhamento de dados</h2>
          <p>Não vendemos nem compartilhamos seus dados pessoais com terceiros, exceto:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            <li><strong>Google Analytics 4</strong> — para análise de uso do site (dados anônimos e agregados). Saiba mais em <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.</li>
          </ul>

          <h2 style={{ marginTop: '40px', marginBottom: '12px' }}>6. Cookies</h2>
          <p>O Google Analytics utiliza cookies para coletar dados de navegação de forma anônima. Você pode desativar os cookies nas configurações do seu navegador a qualquer momento.</p>

          <h2 style={{ marginTop: '40px', marginBottom: '12px' }}>7. Seus direitos</h2>
          <p>De acordo com a LGPD, você tem direito a:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            <li>Confirmar se tratamos seus dados</li>
            <li>Acessar seus dados</li>
            <li>Corrigir dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusão dos seus dados</li>
            <li>Revogar o consentimento a qualquer momento</li>
          </ul>
          <p>Para exercer seus direitos, entre em contato pelo WhatsApp <a href="tel:+5548998680025">(48) 99868-0025</a> ou pelo e-mail <a href="mailto:bedinrepresentacao@gmail.com">bedinrepresentacao@gmail.com</a>.</p>

          <h2 style={{ marginTop: '40px', marginBottom: '12px' }}>8. Segurança</h2>
          <p>Adotamos medidas técnicas adequadas para proteger seus dados contra acesso não autorizado, perda ou divulgação indevida.</p>

          <h2 style={{ marginTop: '40px', marginBottom: '12px' }}>9. Alterações nesta política</h2>
          <p>Podemos atualizar esta política periodicamente. A data da última atualização estará sempre indicada no topo desta página.</p>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
