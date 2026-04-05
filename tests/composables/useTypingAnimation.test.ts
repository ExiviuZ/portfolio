import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useTypingAnimation } from '../../app/composables/useTypingAnimation'

describe('useTypingAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with an empty display string', () => {
    const { displayText } = useTypingAnimation(['Frontend Developer'])
    expect(displayText.value).toBe('')
  })

  it('types characters over time', () => {
    const { displayText, start } = useTypingAnimation(['Hi'])
    start()
    vi.advanceTimersByTime(110)
    expect(displayText.value).toBe('H')
    vi.advanceTimersByTime(110)
    expect(displayText.value).toBe('Hi')
  })
})
