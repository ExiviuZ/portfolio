import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useScrollSpy } from '../../app/composables/useScrollSpy'

describe('useScrollSpy', () => {
  beforeEach(() => {
    const mockObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }
    vi.stubGlobal('IntersectionObserver', vi.fn(() => mockObserver))
  })

  it('initializes with empty active section', () => {
    const { activeSection } = useScrollSpy(['hero', 'about', 'skills'])
    expect(activeSection.value).toBe('')
  })

  it('returns a reactive activeSection ref', () => {
    const { activeSection } = useScrollSpy(['hero'])
    expect(typeof activeSection.value).toBe('string')
  })
})
