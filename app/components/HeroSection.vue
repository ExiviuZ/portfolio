<!-- app/components/HeroSection.vue -->
<script setup lang="ts">
const { displayText, start, stop } = useTypingAnimation([
  'Frontend Developer',
  'Vue.js Developer',
  'UI/UX Enthusiast',
])

onMounted(start)
onUnmounted(stop)

function scrollToProjects() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
    <div class="max-w-3xl">
      <p class="mb-4 font-mono text-sm text-[--color-accent] tracking-widest uppercase">
        Hello, I'm
      </p>

      <h1 class="mb-4 text-5xl font-bold tracking-tight text-[--color-text-primary] md:text-7xl">
        Your Name
      </h1>

      <div class="mb-6 h-8 font-mono text-xl text-[--color-accent] md:text-2xl">
        <span>{{ displayText }}</span>
        <span class="animate-pulse">|</span>
      </div>

      <p class="mb-10 mx-auto max-w-xl text-lg text-[--color-text-muted]">
        I build clean, fast, and accessible web interfaces with Vue.js — and connect them to robust backends with Laravel.
      </p>

      <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href="#projects"
          class="rounded-lg bg-[--color-accent] px-6 py-3 text-sm font-semibold text-[--color-bg-primary] transition-all duration-200 hover:bg-[--color-accent-hover] hover:shadow-lg hover:shadow-cyan-500/20"
          @click.prevent="scrollToProjects"
        >
          View My Work
        </a>
        <a
          href="/resume.pdf"
          download
          class="rounded-lg border border-[--color-accent] px-6 py-3 text-sm font-semibold text-[--color-accent] transition-all duration-200 hover:bg-[--color-accent]/10"
        >
          Download Resume
        </a>
      </div>
    </div>

    <div class="absolute bottom-8 flex flex-col items-center gap-2 text-[--color-text-muted]">
      <span class="text-xs font-mono">scroll down</span>
      <div class="h-8 w-px animate-bounce bg-[--color-accent]" />
    </div>
  </section>
</template>
