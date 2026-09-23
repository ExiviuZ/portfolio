import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Smooth wheel scrolling for the whole page. Lenis honours prefers-reduced-motion
// and scroll-margin-top on its own, so anchor offsets stay in the CSS.
export default defineNuxtPlugin(() => {
  const lenis = new Lenis({ autoRaf: true })

  return { provide: { lenis } }
})
