<!-- app/components/ProjectsSection.vue -->
<script setup lang="ts">
import { projects } from '../data/projects'

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
  <section id="projects" ref="sectionRef" class="mx-auto max-w-6xl px-6 py-24">
    <div class="mb-16 text-center">
      <p class="mb-2 font-mono text-sm text-[--color-accent] tracking-widest uppercase">What I've built</p>
      <h2 class="text-3xl font-bold text-[--color-text-primary] md:text-4xl">Projects</h2>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="group flex flex-col overflow-hidden rounded-xl border border-[--color-border] bg-[--color-bg-card] transition-all duration-300 hover:-translate-y-1 hover:border-[--color-accent]/30 hover:shadow-xl hover:shadow-cyan-500/10"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        :style="isVisible ? { transitionDelay: `${index * 100}ms`, transitionDuration: '600ms', transitionProperty: 'opacity, transform' } : {}"
      >
        <div class="relative overflow-hidden">
          <img
            :src="project.screenshot"
            :alt="project.name"
            class="h-48 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[--color-bg-card] via-transparent to-transparent" />
        </div>

        <div class="flex flex-1 flex-col p-5">
          <h3 class="mb-2 text-lg font-semibold text-[--color-text-primary]">{{ project.name }}</h3>
          <p class="mb-4 flex-1 text-sm text-[--color-text-muted] leading-relaxed">{{ project.description }}</p>

          <div class="mb-4 flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="rounded-full border border-[--color-accent]/30 bg-[--color-accent]/10 px-3 py-0.5 text-xs text-[--color-accent]"
            >
              {{ tag }}
            </span>
          </div>

          <a
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm font-medium text-[--color-accent] transition-colors hover:text-[--color-accent-hover]"
          >
            Live Demo
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
