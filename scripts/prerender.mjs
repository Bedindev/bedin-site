/* Pré-renderiza as rotas estáticas depois do `vite build`.
 *
 * Por quê: o site é uma SPA e o HTML servido vinha com <div id="root"></div>
 * vazio. O Google até executa JavaScript, mas numa segunda passada que pode
 * levar dias ou semanas — até lá o texto da página não existe para ele.
 *
 * Como: carrega o bundle já construído dentro de um DOM do jsdom, espera o
 * React montar e grava o HTML resultante. Não há servidor nem navegador no
 * processo, então roda no build da Vercel sem dependência extra: jsdom já era
 * devDependency do projeto (usado pelos testes).
 *
 * O resultado continua sendo uma SPA: o React reidrata o mesmo HTML no
 * navegador e a navegação segue client-side. O que muda é só o primeiro byte.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { JSDOM, VirtualConsole } from 'jsdom'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(raiz, 'dist')

/* Só rotas que existem de fato. /v1 fica de fora de propósito: é a home
   anterior, mantida apenas para rollback, e não deve ser indexada. */
const ROTAS = ['/', '/politica-de-privacidade']

const modelo = readFileSync(join(dist, 'index.html'), 'utf8')
if (!modelo.includes('<div id="root"></div>')) {
  console.error('[prerender] o index.html não tem <div id="root"></div> vazio — o build mudou?')
  process.exit(1)
}

/* O bundle usa APIs de navegador no nível do módulo; sem estes globais o
   import falha antes de o React montar. */
/* `navigator` e `location` são somente-leitura no Node moderno:
   defineProperty é o único jeito de sobrepô-los. */
function definir(nome, valor) {
  Object.defineProperty(globalThis, nome, { value: valor, configurable: true, writable: true })
}

function instalarGlobais(dom) {
  const w = dom.window
  globalThis.window = w
  globalThis.document = w.document
  definir('navigator', w.navigator)
  definir('location', w.location)
  globalThis.history = w.history
  globalThis.localStorage = w.localStorage
  globalThis.sessionStorage = w.sessionStorage
  /* tudo que o bundle pode tocar no nível do módulo */
  for (const n of ['HTMLElement', 'HTMLAnchorElement', 'HTMLInputElement', 'HTMLFormElement',
    'Element', 'Node', 'Event', 'CustomEvent', 'MutationObserver', 'DOMParser',
    'SVGElement', 'Image', 'FormData', 'URL', 'URLSearchParams']) {
    if (w[n]) globalThis[n] = w[n]
  }
  globalThis.getComputedStyle = w.getComputedStyle
  globalThis.requestAnimationFrame = cb => setTimeout(() => cb(Date.now()), 0)
  globalThis.cancelAnimationFrame = id => clearTimeout(id)
  globalThis.matchMedia = w.matchMedia || (() => ({
    matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {},
  }))
  w.matchMedia = globalThis.matchMedia
  globalThis.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} }
  w.IntersectionObserver = globalThis.IntersectionObserver
  globalThis.scrollTo = () => {}
  w.scrollTo = () => {}
  /* nenhuma chamada de rede durante o build */
  globalThis.fetch = () => Promise.reject(new Error('fetch desabilitado no prerender'))
  w.fetch = globalThis.fetch
  globalThis.gtag = () => {}
  w.gtag = globalThis.gtag
}

function limparGlobais() {
  for (const k of ['window', 'document', 'navigator', 'location', 'history', 'localStorage',
    'sessionStorage', 'HTMLElement', 'Element', 'Node', 'Event', 'CustomEvent',
    'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame', 'matchMedia',
    'IntersectionObserver', 'scrollTo', 'fetch', 'gtag',
    'HTMLAnchorElement', 'HTMLInputElement', 'HTMLFormElement', 'MutationObserver',
    'DOMParser', 'SVGElement', 'Image', 'FormData', 'URL', 'URLSearchParams']) {
    delete globalThis[k]
  }
}

/* o entry do bundle, lido do próprio index.html */
const entry = modelo.match(/<script type="module"[^>]*src="([^"]+)"/)?.[1]
if (!entry) {
  console.error('[prerender] não achei o script de entrada no index.html')
  process.exit(1)
}
const entryUrl = pathToFileURL(join(dist, entry.replace(/^\//, ''))).href

let falhas = 0

for (const rota of ROTAS) {
  const vc = new VirtualConsole()   /* silencia ruído do bundle */
  const dom = new JSDOM(modelo, {
    url: 'https://www.bedinrepresentacao.com.br' + rota,
    pretendToBeVisual: true,
    virtualConsole: vc,
  })
  instalarGlobais(dom)

  try {
    /* cache-busting: cada rota precisa de uma execução limpa do módulo */
    await import(entryUrl + '?rota=' + encodeURIComponent(rota))
    /* dá tempo para o React montar e os efeitos rodarem */
    await new Promise(r => setTimeout(r, 300))

    const root = dom.window.document.getElementById('root')
    const conteudo = root?.innerHTML?.trim() || ''
    if (conteudo.length < 500) {
      console.error(`[prerender] ${rota}: conteúdo vazio ou curto demais (${conteudo.length} bytes)`)
      falhas++
      continue
    }

    /* grava só o que está dentro de #root; o <head> do modelo é preservado,
       e usePageMeta reescreve title/description no cliente como antes */
    let html = modelo.replace('<div id="root"></div>', `<div id="root">${conteudo}</div>`)

    const destino = rota === '/' ? join(dist, 'index.html') : join(dist, rota.replace(/^\//, ''), 'index.html')
    mkdirSync(dirname(destino), { recursive: true })
    writeFileSync(destino, html)
    console.log(`[prerender] ${rota.padEnd(26)} ${(conteudo.length / 1024).toFixed(1)} kB`)
  } catch (e) {
    console.error(`[prerender] ${rota}: ${e.message.slice(0, 120)}`)
    falhas++
  } finally {
    limparGlobais()
    dom.window.close()
  }
}

if (falhas) {
  console.error(`[prerender] ${falhas} rota(s) falharam — o build não deve seguir com HTML vazio.`)
  process.exit(1)
}
console.log('[prerender] ok')
