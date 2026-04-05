<!-- app/components/ProjectsSection.vue -->
<script setup lang="ts">
import type { ProjectCategory } from '../data/projects'
import { projects } from '../data/projects'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const activeTab = ref<ProjectCategory>('work')

const filteredProjects = computed(() =>
  projects.filter(p => p.category === activeTab.value)
)

const tabs: { label: string; value: ProjectCategory }[] = [
  { label: 'Work Projects', value: 'work' },
  { label: 'Practice Projects', value: 'practice' },
]

const { stop } = useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
    stop()
  }
})
</script>

<template>
  <section id="projects" ref="sectionRef" class="mx-auto max-w-6xl px-6 py-16">
    <div class="mb-10 text-center">
      <p class="mb-2 font-mono text-sm text-[--color-accent] tracking-widest uppercase">What I've built</p>
      <h2 class="text-3xl font-bold text-[--color-text-primary] md:text-4xl">Projects</h2>
    </div>

    <!-- Tabs -->
    <div class="mb-10 flex justify-center">
      <div class="flex rounded-full border border-[--color-border] bg-[--color-bg-card] p-1 gap-1">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="cursor-pointer rounded-full px-6 py-2 text-sm font-medium transition-all duration-200"
          :class="activeTab === tab.value
            ? 'bg-[--color-accent] text-[--color-bg-primary] shadow-md shadow-cyan-500/20'
            : 'text-[--color-text-muted] hover:text-[--color-text-primary] hover:bg-[--color-border]'"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(project, index) in filteredProjects"
        :key="project.id"
        class="group relative flex flex-col overflow-hidden rounded-xl border border-[--color-border] bg-[--color-bg-card] transition-all duration-300 hover:border-[--color-accent]/50 hover:shadow-2xl hover:shadow-cyan-500/10"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        :style="isVisible ? { transitionDelay: `${index * 100}ms`, transitionDuration: '600ms', transitionProperty: 'opacity, transform' } : {}"
      >
        <!-- Glow border on hover -->
        <div class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style="background: radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(6,182,212,0.06), transparent 60%)" />

        <div class="relative overflow-hidden">
          <img
            :src="project.screenshot"
            :alt="project.name"
            class="h-48 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <!-- Overlay that fades in on hover -->
          <div class="absolute inset-0 bg-gradient-to-t from-[--color-bg-card] via-[--color-bg-card]/20 to-transparent transition-opacity duration-300" />
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

          <!-- Live -->
          <a
            v-if="project.status === 'live'"
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

          <!-- In Development -->
          <span
            v-else-if="project.status === 'in-development'"
            class="flex items-center gap-2 text-sm font-medium text-yellow-400"
          >
            <span class="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            In Development
          </span>

          <!-- Private -->
          <span
            v-else-if="project.status === 'private'"
            class="flex items-center gap-2 text-sm font-medium text-[--color-text-muted]"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Private Project
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
