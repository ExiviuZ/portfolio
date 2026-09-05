import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createApp, defineComponent } from 'vue'
import { useScrollSpy } from '../../app/composables/useScrollSpy'

function withSetup<T>(composable: () => T): [T, ReturnType<typeof createApp>] {
  let result!: T
  const app = createApp(defineComponent({
    setup() {
      result = composable()
      return {}
    },
    template: '<div />',
  }))
  app.mount(document.createElement('div'))
  return [result, app]
}

describe('useScrollSpy', () => {
  let mockObserver: { observe: ReturnType<typeof vi.fn>; disconnect: ReturnType<typeof vi.fn>; unobserve: ReturnType<typeof vi.fn> }
  let callback: (entries: { target: { id: string }; isIntersecting: boolean }[]) => void

  beforeEach(() => {
    mockObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }
    const MockIntersectionObserver = vi.fn(function (this: unknown, cb: typeof callback) {
      callback = cb
      return mockObserver
    })
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  it('initializes with empty active section', () => {
    const [{ activeSection }] = withSetup(() => useScrollSpy(['hero', 'about', 'skills']))
    expect(activeSection.value).toBe('')
  })

  it('returns a reactive activeSection ref', () => {
    const [{ activeSection }] = withSetup(() => useScrollSpy(['hero']))
    expect(typeof activeSection.value).toBe('string')
  })

  it('calls observe for each section id that exists in the DOM', () => {
    // Create DOM elements for each section
    const div1 = document.createElement('div')
    div1.id = 'hero'
    const div2 = document.createElement('div')
    div2.id = 'about'
    document.body.appendChild(div1)
    document.body.appendChild(div2)

    withSetup(() => useScrollSpy(['hero', 'about']))

    expect(mockObserver.observe).toHaveBeenCalledTimes(2)

    document.body.removeChild(div1)
    document.body.removeChild(div2)
  })

  it('calls disconnect on unmount', () => {
    const div = document.createElement('div')
    div.id = 'hero'
    document.body.appendChild(div)

    const [, app] = withSetup(() => useScrollSpy(['hero']))
    app.unmount()

    expect(mockObserver.disconnect).toHaveBeenCalled()

    document.body.removeChild(div)
  })

  it('activates a section that crosses the band, however tall it is', () => {
    const div = document.createElement('div')
    div.id = 'projects'
    document.body.appendChild(div)

    const [{ activeSection }] = withSetup(() => useScrollSpy(['about', 'projects']))
    callback([{ target: { id: 'projects' }, isIntersecting: true }])

    expect(activeSection.value).toBe('projects')

    document.body.removeChild(div)
  })

  it('prefers the later section when two are in the band, and restores the earlier one when it leaves', () => {
    const a = document.createElement('div')
    a.id = 'about'
    const b = document.createElement('div')
    b.id = 'experience'
    document.body.appendChild(a)
    document.body.appendChild(b)

    const [{ activeSection }] = withSetup(() => useScrollSpy(['about', 'experience']))

    callback([
      { target: { id: 'about' }, isIntersecting: true },
      { target: { id: 'experience' }, isIntersecting: true },
    ])
    expect(activeSection.value).toBe('experience')

    callback([{ target: { id: 'experience' }, isIntersecting: false }])
    expect(activeSection.value).toBe('about')

    document.body.removeChild(a)
    document.body.removeChild(b)
  })
})
