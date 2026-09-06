<!-- app/components/AppNav.vue -->
<script setup lang="ts">
defineProps<{
  activeSection: string
}>()

const isMenuOpen = ref(false)

const navLinks = [
  { n: '01', label: 'About', href: '#about' },
  { n: '02', label: 'Experience', href: '#experience' },
  { n: '03', label: 'Stack', href: '#skills' },
  { n: '04', label: 'Learning', href: '#learning' },
  { n: '05', label: 'Selected Work', href: '#projects' },
  { n: '06', label: 'Contact', href: '#contact' },
]

function scrollTo(href: string) {
  isMenuOpen.value = false
  if (import.meta.client) {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="sticky top-0 z-60 border-b border-ink bg-paper/92 backdrop-blur-[6px]">
    <div class="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-[clamp(1.25rem,4vw,3.5rem)] py-3.5 md:items-baseline">
      <a
        href="#top"
        class="font-mono text-[13px] font-semibold uppercase tracking-[0.14em]"
        @click.prevent="scrollTo('#top')"
      >
        Papio<span class="opacity-65">, M.A.</span>
      </a>

      <!-- Desktop -->
      <nav class="hidden flex-wrap items-baseline gap-[clamp(0.875rem,2.2vw,1.875rem)] md:flex">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="border-b pb-0.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors"
          :class="activeSection === link.href.slice(1)
            ? 'border-ink text-ink'
            : 'border-transparent text-ink-quiet hover:border-ink hover:text-ink'"
          @click.prevent="scrollTo(link.href)"
        >
          <span class="mr-1.5 text-ink-faint">{{ link.n }}</span>{{ link.label }}
        </a>
      </nav>

      <!-- Mobile trigger -->
      <button
        class="-mr-2.5 flex h-11 w-11 cursor-pointer flex-col items-end justify-center gap-[5px] border-none bg-transparent md:hidden"
        aria-label="Menu"
        aria-controls="mobile-nav"
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="block h-px w-[22px] bg-ink" />
        <span class="block h-px w-[22px] bg-ink" />
      </button>
    </div>

    <!-- Mobile sheet -->
    <nav v-if="isMenuOpen" id="mobile-nav" aria-label="Sections" class="sheet bg-ink px-4 pt-1.5 pb-3.5 md:hidden">
      <button
        v-for="link in navLinks"
        :key="link.href"
        class="flex min-h-[46px] w-full cursor-pointer items-baseline gap-3 border-none border-b border-b-ink-lift bg-transparent p-0 text-left"
        @click="scrollTo(link.href)"
      >
        <span class="font-mono text-[10px] tracking-[0.16em] text-sand">{{ link.n }}</span>
        <span
          class="font-mono text-[12px] uppercase tracking-[0.16em]"
          :class="activeSection === link.href.slice(1) ? 'text-paper' : 'text-paper/80'"
        >{{ link.label }}</span>
      </button>
    </nav>
  </header>
</template>
