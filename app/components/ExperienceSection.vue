<!-- app/components/ExperienceSection.vue -->
<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
    stop()
  }
})

const experiences = [
  {
    company: 'Designblue Manila',
    role: 'Mid Web Developer',
    previousRole: 'Junior Frontend Developer',
    duration: '2024 — Present',
    bullets: [
      'Started as a Junior Frontend Developer and grew into a Mid Web Developer role through consistent delivery and expanding responsibilities.',
      'Built and maintained frontend interfaces for multiple client projects across real estate, insurance, retail, and government sectors using Vue.js, Nuxt.js, and Tailwind CSS.',
      'Integrated REST APIs for CMS-driven content across all client sites, and collaborated directly with third-party backend teams (e.g. Etiqa) to integrate insurance-specific APIs for KYC and policy purchasing flows.',
      'Developed a static informational microsite for the Asian Development Bank (ADB), delivering a pixel-perfect implementation with Nuxt static generation.',
      'Contributed to frontend architecture decisions and component design across projects of varying scale and complexity.',
    ],
  },
]
</script>

<template>
  <section
    id="experience"
    ref="sectionRef"
    class="mx-auto max-w-6xl px-6 py-16"
  >
    <div class="mb-10 text-center">
      <p class="mb-2 font-mono text-sm text-[--color-accent] tracking-widest uppercase">Where I've worked</p>
      <h2 class="text-3xl font-bold text-[--color-text-primary] md:text-4xl">Experience</h2>
    </div>

    <div class="relative">
      <!-- Vertical line -->
      <div class="absolute left-0 top-0 h-full w-px bg-[--color-border] md:left-[200px]" />

      <div
        v-for="(exp, index) in experiences"
        :key="exp.company"
        class="relative flex flex-col gap-6 pb-12 pl-8 md:flex-row md:pl-0 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        :style="isVisible ? { transitionDelay: `${index * 100}ms`, transitionDuration: '600ms', transitionProperty: 'opacity, transform' } : {}"
      >
        <!-- Dot on the line -->
        <div class="absolute left-[-4.5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[--color-accent] bg-[--color-bg-primary] md:left-[195.5px]" />

        <!-- Left: date + company -->
        <div class="md:w-[200px] md:pr-10 md:text-right md:pt-0.5 shrink-0">
          <p class="font-mono text-xs text-[--color-accent]">{{ exp.duration }}</p>
          <p class="mt-1 text-sm font-semibold text-[--color-text-primary]">{{ exp.company }}</p>
        </div>

        <!-- Right: role + bullets -->
        <div class="flex-1 md:pl-10">
          <div class="mb-4">
            <h3 class="text-lg font-bold text-[--color-text-primary]">{{ exp.role }}</h3>
            <p class="mt-0.5 font-mono text-xs text-[--color-text-muted]">
              Previously: {{ exp.previousRole }}
            </p>
          </div>

          <ul class="space-y-3">
            <li
              v-for="bullet in exp.bullets"
              :key="bullet"
              class="flex gap-3 text-sm text-[--color-text-muted] leading-relaxed"
            >
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[--color-accent]" />
              {{ bullet }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
