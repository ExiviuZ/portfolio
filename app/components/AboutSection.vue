<!-- app/components/AboutSection.vue -->
<script setup lang="ts">
import { facts } from '../data/profile'

const assetUrl = useAssetUrl()
</script>

<template>
  <section id="about" class="mx-auto max-w-[1280px] px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(3.5rem,10vh,6.875rem)]">
    <SectionHeading index="01" title="About" caption="Get to know me" />

    <div class="grid items-start gap-x-[clamp(1.75rem,4vw,4rem)] pt-[clamp(1.75rem,4vw,3rem)] md:grid-cols-2">
      <p class="reveal m-0 mb-5 text-[clamp(1.1875rem,1.9vw,1.5625rem)] leading-[1.45] tracking-[-0.012em] text-pretty md:col-start-1 md:row-start-1">
        A frontend developer in the Philippines who started with Vue interfaces and grew outward — into REST integrations, then Laravel.
      </p>

      <figure class="reveal m-0 mb-5 md:col-start-2 md:row-start-1 md:row-span-2 md:mb-0">
        <div class="border border-ink bg-paper-deep p-2.5">
          <img
            :src="assetUrl('/images/profile.jpg')"
            alt="Mark Angel Papio"
            class="block aspect-4/5 w-full object-cover mix-blend-multiply grayscale contrast-[1.06]"
          >
        </div>
        <figcaption class="mt-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          Fig. 1 — the developer, 2026
        </figcaption>
      </figure>

      <div class="reveal min-w-0 md:col-start-1 md:row-start-2">
        <p class="mb-3.5 text-base leading-[1.65] text-ink-muted text-pretty">
          At Designblue Manila I develop and maintain frontend features across real estate, insurance, retail and government projects, integrate CMS-driven APIs, and work alongside backend engineers to ship full-stack features.
        </p>
        <p class="m-0 text-base leading-[1.65] text-ink-muted text-pretty">
          I care about code that reads well and interfaces that feel fast. I'm looking for my next opportunity to grow.
        </p>

        <dl class="mt-8 grid gap-x-8 sm:grid-cols-2">
          <div
            v-for="fact in facts"
            :key="fact.label"
            class="flex items-baseline justify-between gap-3 border-t border-rule py-[11px]"
          >
            <dt class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">{{ fact.label }}</dt>
            <dd class="m-0 text-right text-[15px]">{{ fact.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
