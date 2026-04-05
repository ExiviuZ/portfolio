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

  it('stop() halts typing and resets state', () => {
    const { displayText, start, stop } = useTypingAnimation(['Hello'])
    start()
    vi.advanceTimersByTime(250) // type 'He'
    expect(displayText.value).toBe('He')
    stop()
    vi.advanceTimersByTime(1000) // advance further — should not change
    expect(displayText.value).toBe('') // reset to empty
  })

  it('does nothing when roles is empty', () => {
    const { displayText, start } = useTypingAnimation([])
    start()
    vi.advanceTimersByTime(500)
    expect(displayText.value).toBe('')
  })
})
