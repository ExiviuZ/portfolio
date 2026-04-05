// app/composables/useScrollSpy.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollSpy(sectionIds: string[]) {
  const activeSection = ref('')
  const observers: IntersectionObserver[] = []

  onMounted(() => {
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            activeSection.value = id
          }
        },
        { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' },
      )
      observer.observe(el)
      observers.push(observer)
    })
  })

  onUnmounted(() => {
    observers.forEach((o) => o.disconnect())
  })

  return { activeSection }
}
