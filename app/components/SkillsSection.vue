<!-- app/components/SkillsSection.vue -->
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { frontendSkills, backendSkills } from '../data/skills'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
    stop()
  }
})
</script>

<template>
  <section id="skills" ref="sectionRef" class="bg-[--color-bg-secondary] px-6 py-24">
    <div class="mx-auto max-w-6xl">
      <div class="mb-16 text-center">
        <p class="mb-2 font-mono text-sm text-[--color-accent] tracking-widest uppercase">What I work with</p>
        <h2 class="text-3xl font-bold text-[--color-text-primary] md:text-4xl">Skills</h2>
      </div>

      <div
        class="space-y-12 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <div>
          <h3 class="mb-6 font-mono text-sm text-[--color-text-muted] uppercase tracking-widest">Frontend</h3>
          <div class="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            <div
              v-for="skill in frontendSkills"
              :key="skill.name"
              class="flex flex-col items-center gap-2 rounded-xl border border-[--color-border] bg-[--color-bg-card] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[--color-accent]/40 hover:shadow-lg hover:shadow-cyan-500/5"
            >
              <Icon :icon="skill.icon" class="h-8 w-8" />
              <span class="text-xs text-[--color-text-muted]">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="mb-6 font-mono text-sm text-[--color-text-muted] uppercase tracking-widest">Backend & Tools</h3>
          <div class="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            <div
              v-for="skill in backendSkills"
              :key="skill.name"
              class="flex flex-col items-center gap-2 rounded-xl border border-[--color-border] bg-[--color-bg-card] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[--color-accent]/40 hover:shadow-lg hover:shadow-cyan-500/5"
            >
              <Icon :icon="skill.icon" class="h-8 w-8" />
              <span class="text-xs text-[--color-text-muted]">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
