import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks which section is currently under a thin band near the top of the
 * viewport.
 *
 * A ratio threshold is deliberately not used: sections here are far taller
 * than the observer band, so their intersection ratio never approaches a
 * fractional threshold and no section would ever become active. Instead the
 * band is narrow and any section crossing it counts, with the last one in
 * document order winning when a boundary sits inside the band.
 */
export function useScrollSpy(sectionIds: string[]) {
  const activeSection = ref('')
  const observers: IntersectionObserver[] = []

  onMounted(() => {
    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id
          if (entry.isIntersecting) visible.add(id)
          else visible.delete(id)
        })

        const current = sectionIds.filter(id => visible.has(id))
        if (current.length > 0) {
          activeSection.value = current[current.length - 1]!
        }
      },
      { rootMargin: '-20% 0px -75% 0px', threshold: 0 },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    observers.push(observer)
  })

  onUnmounted(() => {
    observers.forEach(o => o.disconnect())
  })

  return { activeSection }
}
