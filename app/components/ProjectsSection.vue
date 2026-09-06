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

// Project links leave the site, so confirm before opening them in a new tab.
// Projects with no public URL get an explanatory dialog instead.
const dialogRef = ref<HTMLDialogElement | null>(null)
const pending = ref<{
  name: string
  url?: string
  kind: 'external' | 'unavailable'
  statusLabel: string
} | null>(null)

const pendingHost = computed(() => {
  if (!pending.value?.url) return ''
  try {
    return new URL(pending.value.url).hostname.replace(/^www\./, '')
  } catch {
    return pending.value.url
  }
})

function openDialog(project: { name: string; liveUrl?: string; statusLabel: string }, event: MouseEvent) {
  event.preventDefault()
  pending.value = {
    name: project.name,
    url: project.liveUrl,
    kind: project.liveUrl ? 'external' : 'unavailable',
    statusLabel: project.statusLabel,
  }
  dialogRef.value?.showModal()
}

function closeDialog() {
  dialogRef.value?.close()
}

function goToContact() {
  closeDialog()
  // Closing restores focus to the link that opened the dialog, and the browser
  // scrolls that back into view — which cancels an immediate smooth scroll. So
  // wait for the exit, then move focus to the section before scrolling to it.
  window.setTimeout(() => {
    const el = document.getElementById('contact')
    if (!el) return
    el.focus({ preventScroll: true })
    el.scrollIntoView({ behavior: 'smooth' })
  }, EXIT_MS)
}

// Keep the content mounted until the exit transition finishes, otherwise the
// dialog collapses to its 2px border for a frame on the way out. transitionend
// is not dependable here once `display` goes discrete, so use the known duration.
const EXIT_MS = 300

function onClosed() {
  window.setTimeout(() => {
    if (!dialogRef.value?.open) pending.value = null
  }, EXIT_MS)
}

onMounted(() => {
  const el = dialogRef.value
  if (!el || 'closedBy' in HTMLDialogElement.prototype) return
  el.addEventListener('click', (event) => {
    if (event.target !== el) return
    const r = el.getBoundingClientRect()
    const inside = r.top <= event.clientY && event.clientY <= r.top + r.height
      && r.left <= event.clientX && event.clientX <= r.left + r.width
    if (!inside) el.close()
  })
})
</script>

<template>
  <section id="projects" aria-label="Selected work" class="border-t border-ink bg-paper">
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
              @click="openDialog(project, $event)"
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
              @click="openDialog(project, $event)"
            >Visit live site ↗</a>
          </div>
        </article>
      </div>
    </div>

    <!-- Leaving-the-site confirmation. The action is a real anchor rather than
         window.open(), so no popup blocker can swallow it. -->
    <dialog
      ref="dialogRef"
      closedby="any"
      aria-labelledby="external-link-title"
      class="m-auto w-[calc(100vw-2rem)] max-w-[30rem] border border-ink bg-paper p-0 text-ink shadow-[10px_10px_0_0_rgb(23_21_15/0.10)]"
      @close="onClosed"
    >
      <div v-if="pending">
        <div class="flex items-baseline justify-between gap-4 border-b border-ink bg-paper-deep px-[clamp(1.25rem,3vw,1.75rem)] py-3">
          <p id="external-link-title" class="m-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            {{ pending.kind === 'external' ? 'Leaving this site' : 'No public link' }}
          </p>
          <p class="m-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            {{ pending.kind === 'external' ? 'New tab ↗' : pending.statusLabel }}
          </p>
        </div>

        <div class="px-[clamp(1.25rem,3vw,1.75rem)] pt-5 pb-[clamp(1.25rem,3vw,1.75rem)]">
          <p class="m-0 text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.15] tracking-[-0.025em] text-pretty">
            {{ pending.name }}
          </p>
          <p
            v-if="pending.kind === 'external'"
            class="mt-2 mb-0 border-b border-rule pb-3 font-mono text-[11px] tracking-[0.06em] text-ink-faint"
          >{{ pendingHost }}</p>
          <div v-else class="mt-2 border-b border-rule pb-3" />

          <p v-if="pending.kind === 'external'" class="mt-3.5 mb-0 text-[15px] leading-[1.55] text-ink-muted text-pretty">
            The site opens in a new tab — this page stays open behind it.
          </p>

          <div class="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <a
              v-if="pending.kind === 'external'"
              :href="pending.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex min-h-[46px] flex-1 cursor-pointer items-center justify-center bg-ink px-5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ink-lift"
              @click="closeDialog"
            >Continue ↗</a>
            <button
              v-else
              type="button"
              class="min-h-[46px] flex-1 cursor-pointer bg-ink px-5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ink-lift"
              @click="goToContact"
            >Get in touch →</button>

            <button
              type="button"
              class="min-h-[46px] cursor-pointer border border-ink bg-transparent px-5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:bg-paper-hover"
              @click="closeDialog"
            >{{ pending.kind === 'external' ? 'Cancel' : 'Close' }}</button>
          </div>
        </div>
      </div>
    </dialog>
  </section>
</template>
