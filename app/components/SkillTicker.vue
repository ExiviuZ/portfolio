<!-- app/components/SkillTicker.vue -->
<script setup lang="ts">
import { tickerSkills } from '../data/skills'

const line = `  ${tickerSkills.join('   ·   ')}   ·   `
</script>

<template>
  <div class="mt-[clamp(2.5rem,7vh,5rem)] overflow-hidden border-t border-b border-ink bg-paper-deep py-[9px]">
    <div class="marquee-track flex w-max">
      <span class="font-mono text-[11px] whitespace-nowrap text-ink-muted uppercase tracking-[0.18em]">{{ line }}</span>
      <span class="font-mono text-[11px] whitespace-nowrap text-ink-muted uppercase tracking-[0.18em]" aria-hidden="true">{{ line }}</span>
    </div>
  </div>
</template>
