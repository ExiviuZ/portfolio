<!-- app/components/ExperienceSection.vue -->
<script setup lang="ts">
import { experienceBullets } from '../data/profile'

const bullets = experienceBullets.map((text, i) => ({
  n: String(i + 1).padStart(2, '0'),
  text,
}))
</script>

<template>
  <section id="experience" aria-label="Experience" class="mx-auto max-w-[1280px] px-[clamp(1.25rem,4vw,3.5rem)] pb-[clamp(3.5rem,10vh,6.875rem)]">
    <SectionHeading index="02" title="Experience" caption="Where I've worked" />

    <div class="reveal grid gap-[clamp(1.5rem,4vw,4rem)] pt-[clamp(1.75rem,4vw,3rem)] md:grid-cols-3">
      <div class="min-w-0">
        <p class="m-0 font-mono text-[clamp(1.75rem,4vw,3.375rem)] leading-none font-medium tracking-[-0.04em]">
          2024<span class="text-ink-faint">—</span><br class="hidden md:inline">Present
        </p>
        <p class="mt-4.5 text-[21px] tracking-[-0.01em]">Designblue Manila</p>
        <p class="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">Creative agency · Manila</p>
      </div>

      <div class="min-w-0 md:col-span-2">
        <h3 class="m-0 text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.15] tracking-[-0.02em]">Mid Web Developer</h3>
        <p class="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">Previously — Junior Frontend Developer</p>

        <ul class="mt-6 list-none p-0">
          <li
            v-for="bullet in bullets"
            :key="bullet.n"
            class="grid grid-cols-[34px_1fr] gap-3 border-t border-rule py-[15px] text-base leading-[1.6] text-ink-body text-pretty"
          >
            <span class="pt-[5px] font-mono text-[10px] tracking-[0.1em] text-ink-quiet">{{ bullet.n }}</span>
            <span>{{ bullet.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
