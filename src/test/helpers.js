import { act } from '@testing-library/react'

export class MockIntersectionObserver {
  static instances = []

  constructor(callback, options) {
    this.callback = callback
    this.options = options
    this.elements = new Set()
    this.disconnected = false
    MockIntersectionObserver.instances.push(this)
  }

  observe(el) { this.elements.add(el) }
  unobserve(el) { this.elements.delete(el) }
  disconnect() { this.elements.clear(); this.disconnected = true }
  takeRecords() { return [] }

  trigger(isIntersecting = true) {
    const entries = [...this.elements].map(target => ({
      target,
      isIntersecting,
      intersectionRatio: isIntersecting ? 1 : 0,
    }))
    if (entries.length) this.callback(entries, this)
  }

  static reset() { MockIntersectionObserver.instances = [] }
}

export function intersectAll() {
  act(() => {
    MockIntersectionObserver.instances.forEach(o => {
      if (!o.disconnected) o.trigger(true)
    })
  })
}

let reducedMotion = false
export function setReducedMotion(value) { reducedMotion = value }

export function installMatchMedia() {
  window.matchMedia = query => ({
    get matches() {
      return query.includes('prefers-reduced-motion: reduce') ? reducedMotion : false
    },
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() { return false },
  })
}

export function navigateTo(path) {
  window.history.pushState({}, '', path)
}
