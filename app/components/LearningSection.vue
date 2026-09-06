<!-- app/components/LearningSection.vue -->
<script setup lang="ts">
import { learningItems } from '../data/learning'

const items = learningItems.map((item, i) => ({
  ...item,
  n: String(i + 1).padStart(2, '0'),
}))
</script>

<template>
  <section id="learning" aria-label="Currently learning" class="mx-auto max-w-[1280px] px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(3.5rem,10vh,6.875rem)]">
    <SectionHeading index="04" title="Currently Learning" caption="Always growing" />

    <p class="reveal my-[clamp(1.5rem,4vw,2.5rem)] max-w-[44ch] text-[clamp(1.125rem,1.8vw,1.4375rem)] leading-[1.4] tracking-[-0.012em] text-pretty">
      Good developers never stop learning. Six things I'm actively studying right now.
    </p>

    <div class="grid gap-x-[clamp(1.75rem,4vw,3.5rem)] sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in items"
        :key="item.title"
        class="reveal min-w-0 border-t border-rule py-5"
      >
        <div class="flex items-baseline gap-2.5">
          <span class="font-mono text-[10px] tracking-[0.14em] text-ink-quiet">{{ item.n }}</span>
          <h3 class="m-0 text-xl tracking-[-0.015em]">{{ item.title }}</h3>
        </div>
        <p class="mt-2 text-[15px] leading-[1.6] text-ink-muted text-pretty">{{ item.description }}</p>
      </div>
    </div>
  </section>
</template>
