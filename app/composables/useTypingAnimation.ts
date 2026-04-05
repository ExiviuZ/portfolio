// app/composables/useTypingAnimation.ts
import { ref } from 'vue'

export function useTypingAnimation(roles: string[], typeSpeed = 100, deleteSpeed = 50, pauseMs = 2000) {
  const displayText = ref('')
  let currentRoleIndex = 0
  let charIndex = 0
  let isDeleting = false
  let timer: ReturnType<typeof setTimeout> | null = null

  function tick() {
    const currentRole = roles[currentRoleIndex]

    if (!isDeleting) {
      charIndex++
      displayText.value = currentRole.slice(0, charIndex)

      if (charIndex === currentRole.length) {
        isDeleting = true
        timer = setTimeout(tick, pauseMs)
        return
      }
    } else {
      charIndex--
      displayText.value = currentRole.slice(0, charIndex)

      if (charIndex === 0) {
        isDeleting = false
        currentRoleIndex = (currentRoleIndex + 1) % roles.length
      }
    }

    timer = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed)
  }

  function start() {
    if (roles.length === 0) return
    timer = setTimeout(tick, typeSpeed)
  }

  function stop() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    // Reset state so start() begins fresh
    charIndex = 0
    isDeleting = false
    currentRoleIndex = 0
    displayText.value = ''
  }

  return { displayText, start, stop }
}
