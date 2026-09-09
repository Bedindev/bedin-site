import '@testing-library/jest-dom/vitest'
import { vi, beforeEach, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { MockIntersectionObserver, installMatchMedia, setReducedMotion } from './helpers'

vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }))

globalThis.IntersectionObserver = MockIntersectionObserver
globalThis.fetch = vi.fn(() => Promise.reject(new Error('offline in tests')))

// Node ≥ 22 ships an experimental localStorage global that shadows jsdom's; use an in-memory one.
function memoryStorage() {
  let store = {}
  return {
    getItem: key => (key in store ? store[key] : null),
    setItem: (key, value) => { store[key] = String(value) },
    removeItem: key => { delete store[key] },
    clear: () => { store = {} },
    key: i => Object.keys(store)[i] ?? null,
    get length() { return Object.keys(store).length },
  }
}
Object.defineProperty(globalThis, 'localStorage', { value: memoryStorage(), configurable: true, writable: true })
Object.defineProperty(window, 'localStorage', { value: globalThis.localStorage, configurable: true, writable: true })
window.scrollTo = vi.fn()
window.open = vi.fn()

// jsdom cannot navigate; block anchor defaults so React handlers still run without noise.
document.addEventListener('click', e => {
  if (e.target.closest && e.target.closest('a')) e.preventDefault()
}, true)

beforeEach(() => {
  MockIntersectionObserver.reset()
  setReducedMotion(false)
  installMatchMedia()
  window.gtag = vi.fn()
  window.scrollTo.mockClear()
  globalThis.localStorage.clear()
  window.history.replaceState({}, '', '/')
  document.body.style.overflow = ''
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})
