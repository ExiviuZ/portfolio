<!-- app/components/LearningSection.vue -->
<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
    stop()
  }
})

const items = [
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Testing',
    description: 'Writing unit and component tests with Vitest and Vue Test Utils to build more reliable and maintainable code.',
  },
  {
    icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: 'Git Workflow',
    description: 'Practicing branching strategies, pull request workflows, and conventional commits for better collaboration in team environments.',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Performance Optimization',
    description: 'Exploring lazy loading, code splitting, image optimization, and Core Web Vitals to ship faster and more efficient web experiences.',
  },
  {
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    title: 'CI/CD Basics',
    description: 'Learning automated pipelines for building, testing, and deploying applications — currently practising with GitHub Actions.',
  },
  {
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    title: 'Docker',
    description: 'Getting comfortable with containerising applications and running consistent local development environments using Docker.',
  },
  {
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    title: 'Laravel Deep Dive',
    description: 'Going beyond basic integration — learning Laravel from the backend perspective including Eloquent, queues, and API design.',
  },
  {
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    title: 'React & Next.js',
    description: 'Expanding beyond Vue by learning React and Next.js to broaden my frontend toolkit and open up more opportunities.',
  },
]
</script>

<template>
  <section
    id="learning"
    ref="sectionRef"
    class="bg-[--color-bg-secondary] px-6 py-16"
  >
    <div class="mx-auto max-w-6xl">
      <div class="mb-10 text-center">
        <p class="mb-2 font-mono text-sm text-[--color-accent] tracking-widest uppercase">Always growing</p>
        <h2 class="text-3xl font-bold text-[--color-text-primary] md:text-4xl">Currently Learning</h2>
        <p class="mt-4 max-w-xl mx-auto text-sm text-[--color-text-muted]">
          I believe good developers never stop learning. Here's what I'm actively studying and working to improve on.
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
        <div
          v-for="(item, index) in items"
          :key="item.title"
          class="flex gap-4 rounded-xl border border-[--color-border] bg-[--color-bg-card] p-5 transition-all duration-300 hover:border-[--color-accent]/30"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="isVisible ? { transitionDelay: `${index * 80}ms`, transitionDuration: '600ms', transitionProperty: 'opacity, transform' } : {}"
        >
          <!-- Icon -->
          <div class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[--color-accent]/10 border border-[--color-accent]/20">
            <svg class="h-4 w-4 text-[--color-accent]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
            </svg>
          </div>

          <!-- Text -->
          <div>
            <h3 class="mb-1 text-sm font-semibold text-[--color-text-primary]">{{ item.title }}</h3>
            <p class="text-xs text-[--color-text-muted] leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
