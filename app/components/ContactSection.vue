<!-- app/components/ContactSection.vue -->
<script setup lang="ts">
import { socialLinks } from '../data/profile'

const FORMSPREE_ID = 'mreoodkz'

const assetUrl = useAssetUrl()

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')

const sendLabel = computed(() => {
  switch (status.value) {
    case 'submitting': return 'Sending…'
    case 'success': return 'Message sent ✓'
    default: return 'Send message →'
  }
})

async function handleSubmit() {
  status.value = 'submitting'
  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      status.value = 'success'
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      status.value = 'error'
    }
  } catch {
    status.value = 'error'
  }
}

const fieldClass = 'w-full box-border bg-transparent border-none border-b border-b-rule-dark py-2 text-lg text-paper outline-none transition-colors placeholder:text-sand/60 focus:border-b-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand-light'
const labelClass = 'block mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-sand'
</script>

<template>
  <section id="contact" aria-label="Contact" tabindex="-1" class="border-t border-ink bg-ink text-paper">
    <div class="mx-auto max-w-[1280px] px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(3rem,8vh,6rem)]">
      <SectionHeading index="06" title="Contact" caption="Get in touch" tone="dark" />

      <div class="grid gap-[clamp(1.75rem,4vw,4rem)] pt-[clamp(1.75rem,4vw,3rem)] md:grid-cols-2">
        <div class="min-w-0">
          <p class="m-0 text-[clamp(1.75rem,4vw,3.375rem)] leading-[1.08] tracking-[-0.03em] text-pretty">
            Open to opportunities.<br><em class="italic text-sand-light">Say hello.</em>
          </p>

          <div class="mt-8 flex flex-col">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.href"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              class="flex min-h-[52px] flex-col justify-center gap-1 border-t border-rule-dark py-3.5 text-paper transition-colors hover:text-sand-light sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <span class="font-mono text-[11px] uppercase tracking-[0.16em]">{{ link.label }}</span>
              <span class="text-[15px] text-sand-light">{{ link.value }}</span>
            </a>

            <a
              :href="assetUrl('/resume.pdf')"
              download="MarkAngel_Papio_Resume.pdf"
              class="flex min-h-[52px] flex-col justify-center gap-1 border-t border-rule-dark py-3.5 text-paper transition-colors hover:text-sand-light sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <span class="font-mono text-[11px] uppercase tracking-[0.16em]">Résumé</span>
              <span class="text-[15px] text-sand-light">Download PDF ↓</span>
            </a>
          </div>
        </div>

        <form class="flex min-w-0 flex-col gap-5.5" @submit.prevent="handleSubmit">
          <label class="block">
            <span :class="labelClass">Name</span>
            <input v-model="form.name" type="text" required placeholder="Your name" :class="fieldClass">
          </label>
          <label class="block">
            <span :class="labelClass">Email</span>
            <input v-model="form.email" type="email" required placeholder="you@company.com" :class="fieldClass">
          </label>
          <label class="block">
            <span :class="labelClass">Message</span>
            <textarea v-model="form.message" rows="4" required placeholder="What's on your mind?" :class="[fieldClass, 'resize-none']" />
          </label>

          <button
            type="submit"
            :disabled="status === 'submitting'"
            class="min-h-[50px] cursor-pointer border border-paper bg-paper px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-transparent hover:text-paper disabled:opacity-60 sm:self-start"
          >
            {{ sendLabel }}
          </button>

          <p v-if="status === 'error'" class="m-0 font-mono text-[11px] uppercase tracking-[0.14em] text-sand-light" role="alert">
            Something went wrong — email me directly instead.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
