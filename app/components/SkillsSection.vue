<!-- app/components/SkillsSection.vue -->
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { frontendSkills, backendSkills, infraSkills, aiSkills } from '../data/skills'

const groups = [
  { label: 'Frontend', skills: frontendSkills },
  { label: 'Backend', skills: backendSkills },
  { label: 'Infrastructure & Tools', skills: infraSkills },
  { label: 'AI-Assisted Development', skills: aiSkills },
]
</script>

<template>
  <section id="skills" class="border-t border-b border-ink bg-paper-deep">
    <div class="mx-auto max-w-[1280px] px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(3rem,8vh,5.625rem)]">
      <SectionHeading index="03" title="Stack" caption="What I work with" />

      <div class="grid gap-x-[clamp(1.75rem,4vw,4rem)] gap-y-[clamp(1.75rem,3vw,2.75rem)] pt-[clamp(1.5rem,3vw,2.5rem)] md:grid-cols-2">
        <div v-for="group in groups" :key="group.label" class="reveal min-w-0">
          <p class="mb-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">{{ group.label }}</p>
          <ul class="m-0 list-none p-0">
            <li
              v-for="skill in group.skills"
              :key="skill.name"
              class="flex min-h-[46px] items-center gap-3.5 border-t border-rule px-0.5 py-3 transition-[background-color,padding] hover:bg-paper hover:pl-2"
            >
              <Icon :icon="skill.icon" class="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
              <span class="text-[17px] tracking-[-0.01em]">{{ skill.name }}</span>
              <span class="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">{{ skill.level }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
