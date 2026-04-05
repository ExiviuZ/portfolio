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

  beforeEach(() => {
    mockObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }
    const MockIntersectionObserver = vi.fn(function (this: unknown) {
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
})
