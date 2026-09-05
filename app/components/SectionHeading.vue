<!-- app/components/SectionHeading.vue -->
<script setup lang="ts">
withDefaults(defineProps<{
  index: string
  title: string
  caption?: string
  tone?: 'light' | 'dark'
  /** The artboards only keep a caption on small screens for Selected Work. */
  captionOnMobile?: boolean
}>(), { tone: 'light', captionOnMobile: false })
</script>

<template>
  <div
    class="flex items-baseline gap-4 border-b pb-3"
    :class="tone === 'dark' ? 'border-rule-dark' : 'border-ink'"
  >
    <span
      class="font-mono text-[11px] tracking-[0.2em]"
      :class="tone === 'dark' ? 'text-sand' : 'text-ink-faint'"
    >{{ index }}</span>
    <h2
      class="m-0 font-mono text-[clamp(0.9375rem,1.8vw,1.25rem)] font-medium uppercase tracking-[0.05em]"
      :class="tone === 'dark' ? 'text-paper' : 'text-ink'"
    >{{ title }}</h2>
    <span
      v-if="caption"
      class="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] sm:block"
      :class="[
        tone === 'dark' ? 'text-sand' : 'text-ink-faint',
        captionOnMobile ? 'block' : 'hidden',
      ]"
    >{{ caption }}</span>
  </div>
</template>
