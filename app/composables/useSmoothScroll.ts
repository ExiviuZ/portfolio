/**
 * Scrolls to an element through Lenis so programmatic jumps use the same
 * easing as wheel scrolling instead of fighting it.
 */
export function useSmoothScroll() {
  const { $lenis } = useNuxtApp()

  function scrollTo(target: string | HTMLElement) {
    if (!import.meta.client) return
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
    if (el) $lenis.scrollTo(el)
  }

  return { scrollTo }
}
