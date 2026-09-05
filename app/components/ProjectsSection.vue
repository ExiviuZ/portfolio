<!-- app/components/ProjectsSection.vue -->
<script setup lang="ts">
import type { ProjectCategory } from '../data/projects'
import { projects } from '../data/projects'
import { statusLabels } from '../data/profile'

const assetUrl = useAssetUrl()
const activeTab = ref<ProjectCategory>('work')

const tabs: { label: string; value: ProjectCategory }[] = [
  { label: 'Client work', value: 'work' },
  { label: 'Practice', value: 'practice' },
]

const visibleProjects = computed(() =>
  projects
    .filter(p => p.category === activeTab.value)
    .map((p, i) => ({
      ...p,
      n: String(i + 1).padStart(2, '0'),
      statusLabel: statusLabels[p.status] ?? p.status,
      tagLine: p.tags.join(' / '),
      isLive: p.status === 'live',
    })),
)

const countLabel = computed(() => `${visibleProjects.value.length} projects`)
</script>

<template>
  <section id="projects" class="border-t border-ink bg-paper">
    <div class="mx-auto max-w-[1280px] px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(3rem,8vh,5.625rem)] pb-[clamp(3.5rem,10vh,6.875rem)]">
      <SectionHeading index="05" title="Selected Work" :caption="countLabel" caption-on-mobile />

      <!-- Tabs: inline rule on desktop, split control on mobile -->
      <div class="mt-3.5 flex items-stretch border border-ink sm:mt-0 sm:border-none sm:items-baseline sm:gap-4.5 sm:pt-5.5 sm:pb-2">
        <template v-for="(tab, i) in tabs" :key="tab.value">
          <span
            v-if="i > 0"
            class="hidden font-mono text-xs text-ink-faint sm:inline"
            aria-hidden="true"
          >/</span>
          <button
            class="flex-1 cursor-pointer border-none font-mono text-[11px] uppercase tracking-[0.16em] transition-colors sm:flex-none sm:bg-transparent sm:px-0 sm:pt-0 sm:pb-1 sm:text-xs"
            :class="[
              activeTab === tab.value
                ? 'min-h-[46px] bg-ink text-paper sm:border-b sm:border-ink sm:text-ink'
                : 'min-h-[46px] bg-transparent text-ink-quiet hover:text-ink sm:border-b sm:border-transparent',
              i > 0 ? 'border-l border-l-ink sm:border-l-0' : '',
            ]"
            :aria-pressed="activeTab === tab.value"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </template>
      </div>

      <div>
        <article
          v-for="project in visibleProjects"
          :key="project.id"
          class="reveal grid items-start gap-[clamp(1.5rem,3.5vw,3.5rem)] border-t border-ink py-[clamp(1.75rem,4vw,3rem)] md:grid-cols-3"
        >
          <div class="min-w-0 md:order-2 md:col-span-2">
            <a
              :href="project.liveUrl || '#projects'"
              :target="project.liveUrl ? '_blank' : undefined"
              :rel="project.liveUrl ? 'noopener noreferrer' : undefined"
              class="block border border-ink bg-paper-deep p-2 transition-colors hover:bg-paper-press"
            >
              <img
                :src="assetUrl(project.screenshot)"
                :alt="project.name"
                decoding="async"
                loading="lazy"
                class="block aspect-16/10 w-full object-cover object-top saturate-90"
              >
            </a>
          </div>

          <div class="min-w-0 md:order-1">
            <div class="flex items-baseline gap-3">
              <span class="font-mono text-[11px] tracking-[0.16em] text-ink-quiet">{{ project.n }}</span>
              <span class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">{{ project.statusLabel }}</span>
            </div>
            <h3 class="mt-2.5 text-[clamp(1.6875rem,3.4vw,2.875rem)] leading-[1.06] tracking-[-0.028em] text-pretty">{{ project.name }}</h3>
            <p class="mt-4 max-w-[46ch] text-base leading-[1.6] text-ink-muted text-pretty">{{ project.description }}</p>
            <p class="mt-4.5 font-mono text-[10px] leading-[1.9] uppercase tracking-[0.14em] text-ink-faint">{{ project.tagLine }}</p>
            <a
              v-if="project.isLive"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-4.5 inline-flex min-h-[44px] items-center border-b border-ink pb-0.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:border-ink-faint hover:text-ink-faint sm:min-h-0"
            >Visit live site ↗</a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
