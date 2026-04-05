// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  ssr: false,
  app: {
    // UPDATE this to your GitHub repo name if deploying to username.github.io/repo-name
    // Leave as '/' if deploying to username.github.io (root)
    baseURL: '/',
    head: {
      title: 'Your Name — Frontend Developer',
      meta: [
        { name: 'description', content: 'Frontend developer portfolio showcasing projects and skills.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap' },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/css/main.css'],
  modules: ['@vueuse/nuxt'],
})
