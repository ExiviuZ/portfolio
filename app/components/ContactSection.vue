<!-- app/components/ContactSection.vue -->
<script setup lang="ts">
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID' // User will replace with real ID

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')

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

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/ExiviuZ',
    icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mark-angel-papio-076aa5149',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'Email',
    href: 'mailto:papio.markangel788@gmail.com',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
]
</script>

<template>
  <section id="contact" class="bg-[--color-bg-secondary] px-6 py-16">
    <div class="mx-auto max-w-6xl">
      <div class="mb-10 text-center">
        <p class="mb-2 font-mono text-sm text-[--color-accent] tracking-widest uppercase">Get in touch</p>
        <h2 class="text-3xl font-bold text-[--color-text-primary] md:text-4xl">Contact</h2>
        <p class="mt-4 text-[--color-text-muted]">I'm open to opportunities. Feel free to reach out!</p>
      </div>

      <div class="flex flex-col gap-12 md:flex-row">
        <form class="flex-1 space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label for="contact-name" class="mb-1 block text-sm text-[--color-text-muted]">Name</label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              required
              placeholder="Mark Angel Papio"
              class="w-full rounded-lg border border-[--color-border] bg-[--color-bg-card] px-4 py-3 text-sm text-[--color-text-primary] placeholder-[--color-text-muted]/50 outline-none transition focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent]"
            />
          </div>

          <div>
            <label for="contact-email" class="mb-1 block text-sm text-[--color-text-muted]">Email</label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              required
              placeholder="your@email.com"
              class="w-full rounded-lg border border-[--color-border] bg-[--color-bg-card] px-4 py-3 text-sm text-[--color-text-primary] placeholder-[--color-text-muted]/50 outline-none transition focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent]"
            />
          </div>

          <div>
            <label for="contact-message" class="mb-1 block text-sm text-[--color-text-muted]">Message</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              required
              rows="5"
              placeholder="What's on your mind?"
              class="w-full resize-none rounded-lg border border-[--color-border] bg-[--color-bg-card] px-4 py-3 text-sm text-[--color-text-primary] placeholder-[--color-text-muted]/50 outline-none transition focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent]"
            />
          </div>

          <button
            type="submit"
            :disabled="status === 'submitting'"
            class="w-full rounded-lg bg-[--color-accent] py-3 text-sm font-semibold text-[--color-bg-primary] transition-all hover:bg-[--color-accent-hover] disabled:opacity-50"
          >
            {{ status === 'submitting' ? 'Sending...' : 'Send Message' }}
          </button>

          <p v-if="status === 'success'" class="text-sm text-green-400">Message sent! I'll get back to you soon.</p>
          <p v-if="status === 'error'" class="text-sm text-red-400">Something went wrong. Please try again.</p>
        </form>

        <div class="flex flex-col justify-center gap-6 md:w-64">
          <p class="text-sm text-[--color-text-muted]">Or find me on these platforms:</p>
          <div class="space-y-4">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-[--color-text-muted] transition-colors hover:text-[--color-accent]"
            >
              <svg class="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path :d="link.icon" />
              </svg>
              <span class="text-sm font-medium">{{ link.label }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
