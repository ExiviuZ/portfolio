<!-- app/components/AppNav.vue -->
<script setup lang="ts">
defineProps<{
  activeSection: string
}>()

const isMenuOpen = ref(false)

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Learning', href: '#learning' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function scrollTo(href: string) {
  isMenuOpen.value = false
  if (import.meta.client) {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 border-b border-[--color-border] bg-[--color-bg-primary]/90 backdrop-blur-sm">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#hero" class="font-mono text-lg font-semibold text-[--color-accent]" @click.prevent="scrollTo('#hero')">
        &lt;MarkAngelPapio /&gt;
      </a>

      <ul class="hidden items-center gap-8 md:flex">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="text-sm transition-colors duration-200"
            :class="activeSection === link.href.slice(1)
              ? 'text-[--color-accent] font-medium'
              : 'text-[--color-text-muted] hover:text-[--color-text-primary]'"
            @click.prevent="scrollTo(link.href)"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <button
        class="flex flex-col gap-1.5 md:hidden"
        aria-label="Toggle menu"
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span v-for="i in 3" :key="i" class="block h-0.5 w-6 bg-[--color-text-primary] transition-all duration-200" />
      </button>
    </nav>

    <div v-if="isMenuOpen" class="border-t border-[--color-border] bg-[--color-bg-secondary] px-6 py-4 md:hidden">
      <ul class="flex flex-col gap-4">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="block text-sm transition-colors duration-200"
            :class="activeSection === link.href.slice(1)
              ? 'text-[--color-accent] font-medium'
              : 'text-[--color-text-muted]'"
            @click.prevent="scrollTo(link.href)"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>
