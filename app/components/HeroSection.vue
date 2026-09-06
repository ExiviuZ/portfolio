<!-- app/components/HeroSection.vue -->
<script setup lang="ts">
import { roles } from '../data/profile'

const { displayText, start, stop } = useTypingAnimation(roles, 84, 42, 1800)

onMounted(start)
onUnmounted(stop)

function scrollTo(id: string) {
  if (import.meta.client) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section
    id="hero"
    aria-label="Introduction"
    class="mx-auto max-w-[1280px] px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(3rem,9vh,6.5rem)]"
  >
    <!-- Masthead strip -->
    <div class="flex flex-col gap-1 border-b border-rule pb-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">Bulacan, Philippines</span>
      <span class="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint sm:inline">Portfolio — Vol. 01</span>
      <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">Open to full-time</span>
    </div>

    <h1 class="reveal mt-[clamp(1.5rem,5vh,3.5rem)] mb-0 font-mono text-[clamp(3.5rem,15vw,12.25rem)] leading-[0.86] font-medium uppercase tracking-[-0.055em]">
      Mark<br>Angel<br>Papio
    </h1>

    <div class="mt-[clamp(1.75rem,5vh,3.5rem)] grid gap-[clamp(1.5rem,4vw,3.5rem)] border-t border-ink pt-5 md:grid-cols-3">
      <div>
        <p class="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">Currently</p>
        <p class="font-mono text-[clamp(0.9375rem,1.5vw,1.1875rem)] tracking-[-0.01em]">
          <!-- The letter-by-letter text would be announced on every tick, so it
               is hidden and the roles are exposed as one static string. -->
          <span class="sr-only">{{ roles.join(', ') }}</span>
          <span aria-hidden="true">{{ displayText }}</span><span class="caret" aria-hidden="true">▌</span>
        </p>
        <p class="mt-1.5 font-mono text-[11px] text-ink-faint">Mid Web Developer · Designblue Manila</p>
      </div>

      <div class="reveal min-w-0 md:col-span-2">
        <p class="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">Statement</p>
        <p class="max-w-[34ch] text-[clamp(1.25rem,2.3vw,1.9375rem)] leading-[1.28] tracking-[-0.015em] text-pretty">
          I build clean, fast, accessible interfaces with <em class="italic">Vue</em> — and connect them to robust backends with <em class="italic">Laravel</em>.
        </p>
        <div class="mt-5.5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <a
            href="#projects"
            class="min-h-[50px] cursor-pointer bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ink-lift sm:min-h-0 flex items-center justify-center sm:inline-flex"
            @click.prevent="scrollTo('projects')"
          >View selected work →</a>
          <a
            href="#contact"
            class="min-h-[50px] cursor-pointer border border-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:bg-paper-hover sm:min-h-0 flex items-center justify-center sm:inline-flex"
            @click.prevent="scrollTo('contact')"
          >Résumé / Contact</a>
        </div>
      </div>
    </div>
  </section>
</template>
