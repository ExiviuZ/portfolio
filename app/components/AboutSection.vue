<!-- app/components/AboutSection.vue -->
<script setup lang="ts">
const facts = [
  { label: 'Location', value: 'Bulacan, Philippines' },
  { label: 'Experience', value: '2+ years' },
  { label: 'Focus', value: 'Frontend Dev' },
  { label: 'Open to', value: 'Full-time roles' },
]

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { app: { baseURL } } = useRuntimeConfig()
const imgSrc = (path: string) => `${baseURL.replace(/\/$/, '')}${path}`

const { stop } = useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
    stop()
  }
})
</script>

<template>
  <section id="about" ref="sectionRef" class="mx-auto max-w-6xl px-6 py-16">
    <div class="mb-10 text-center">
      <p class="mb-2 font-mono text-sm text-[--color-accent] tracking-widest uppercase">Get to know me</p>
      <h2 class="text-3xl font-bold text-[--color-text-primary] md:text-4xl">About Me</h2>
    </div>

    <div
      class="flex flex-col items-center gap-12 transition-all duration-700 md:flex-row"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="flex-1 space-y-4 text-[--color-text-muted] leading-relaxed">
        <p>
          Hi! I'm <span class="text-[--color-text-primary] font-medium">Mark Angel Papio</span>, a frontend developer based in Philippines.
          I started my career building user interfaces with Vue.js and gradually expanded my skills to cover backend integration with Laravel.
        </p>
        <p>
          During my time at Designblue Manila, I worked on several projects, where I developed and maintained frontend features,
          integrated REST APIs, and collaborated with backend engineers to deliver full-stack features.
        </p>
        <p>
          I care about writing clean, readable code and building interfaces that feel fast and intuitive.
          I'm currently looking for my next opportunity to grow as a developer.
        </p>

        <div class="pt-4 grid grid-cols-2 gap-3">
          <div v-for="fact in facts" :key="fact.label" class="flex items-center gap-2">
            <span class="text-[--color-accent] font-mono text-xs">▹</span>
            <span class="text-sm">
              <span class="text-[--color-text-primary] font-medium">{{ fact.label }}:</span> {{ fact.value }}
            </span>
          </div>
        </div>
      </div>

      <div class="shrink-0">
        <div class="relative h-64 w-64 md:h-72 md:w-72">
          <div class="absolute inset-0 rounded-xl border-2 border-[--color-accent] translate-x-3 translate-y-3" />
          <img
            :src="imgSrc('/images/profile.jpg')"
            alt="Mark Angel Papio"
            class="relative h-full w-full rounded-xl object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  </section>
</template>
