# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static single-page developer portfolio with Nuxt 4, deployed to GitHub Pages, featuring hero, about, skills, projects, and contact sections.

**Architecture:** Single `index.vue` page with anchor-based navigation. Each section is an isolated Vue component. Data (projects, skills) lives in typed `app/data/` files. A `useScrollSpy` composable drives active nav highlighting.

**Tech Stack:** Nuxt 4, Tailwind CSS v4 (`@tailwindcss/vite`), VueUse (`@vueuse/nuxt`), Iconify (`@iconify/vue`), Formspree (contact form), Vitest + Vue Test Utils (tests), GitHub Actions + `peaceiris/actions-gh-pages` (deploy).

---

## File Map

| File | Responsibility |
|---|---|
| `nuxt.config.ts` | Static generation, Tailwind Vite plugin, VueUse module, base URL |
| `assets/css/main.css` | Tailwind import, `@theme` tokens (colors, fonts) |
| `app/data/projects.ts` | Typed array of 5 project objects |
| `app/data/skills.ts` | Typed arrays of frontend and backend skill objects |
| `app/composables/useScrollSpy.ts` | Tracks which section is in the viewport |
| `app/composables/useTypingAnimation.ts` | Cycles through role strings with typewriter effect |
| `app/components/AppNav.vue` | Sticky nav, anchor links, hamburger, active highlight |
| `app/components/HeroSection.vue` | Full-viewport hero with typing animation and CTA buttons |
| `app/components/AboutSection.vue` | Two-column bio + photo layout |
| `app/components/SkillsSection.vue` | Badge grid with scroll fade-in |
| `app/components/ProjectsSection.vue` | 5 project cards grid |
| `app/components/ContactSection.vue` | Formspree form + social links |
| `app/components/AppFooter.vue` | Simple footer |
| `app/pages/index.vue` | Assembles all sections |
| `public/resume.pdf` | Placeholder — replace with real PDF |
| `public/profile.jpg` | Placeholder — replace with real photo |
| `public/projects/*.png` | Placeholder screenshots — 5 images |
| `.github/workflows/deploy.yml` | GitHub Actions: generate + deploy to gh-pages |
| `vitest.config.ts` | Vitest configuration |
| `tests/composables/useScrollSpy.test.ts` | Unit tests for scroll spy |
| `tests/composables/useTypingAnimation.test.ts` | Unit tests for typing animation |

---

## Task 1: Scaffold Nuxt 4 project

**Files:**
- Create: `package.json`, `nuxt.config.ts`, `tsconfig.json`, `assets/css/main.css`

- [ ] **Step 1: Initialize Nuxt 4 in the current directory**

```bash
cd /var/www/portfolio-website
npx nuxi@latest init . --force
```

When prompted, choose: Yes to overwrite, no git initialization (we already have one).

- [ ] **Step 2: Install additional dependencies**

```bash
npm install @vueuse/nuxt @vueuse/core @iconify/vue
npm install -D @tailwindcss/vite vitest @vue/test-utils happy-dom
```

- [ ] **Step 3: Verify Nuxt starts**

```bash
npm run dev
```

Expected: Nuxt dev server running at `http://localhost:3000` with default page.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: scaffold Nuxt 4 project"
```

---

## Task 2: Configure Nuxt and Tailwind v4

**Files:**
- Modify: `nuxt.config.ts`
- Create: `assets/css/main.css`
- Create: `vitest.config.ts`

- [ ] **Step 1: Replace `nuxt.config.ts`**

```ts
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
```

- [ ] **Step 2: Create `assets/css/main.css`**

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #0a0a0f;
  --color-bg-secondary: #111118;
  --color-bg-card: #16161f;
  --color-accent: #06b6d4;
  --color-accent-hover: #22d3ee;
  --color-text-primary: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-border: #1e1e2e;

  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

html {
  scroll-behavior: smooth;
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
}

::selection {
  background-color: var(--color-accent);
  color: var(--color-bg-primary);
}
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
  },
})
```

- [ ] **Step 4: Verify dev server still works**

```bash
npm run dev
```

Expected: Runs without errors.

- [ ] **Step 5: Commit**

```bash
git add nuxt.config.ts assets/css/main.css vitest.config.ts
git commit -m "feat: configure Nuxt 4 static mode with Tailwind v4"
```

---

## Task 3: Create data files

**Files:**
- Create: `app/data/projects.ts`
- Create: `app/data/skills.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/data/projects.test.ts
import { describe, it, expect } from 'vitest'
import { projects } from '../../app/data/projects'
import { frontendSkills, backendSkills } from '../../app/data/skills'

describe('projects data', () => {
  it('has exactly 5 projects', () => {
    expect(projects).toHaveLength(5)
  })

  it('each project has required fields', () => {
    projects.forEach(p => {
      expect(p).toHaveProperty('id')
      expect(p).toHaveProperty('name')
      expect(p).toHaveProperty('description')
      expect(p).toHaveProperty('liveUrl')
      expect(p).toHaveProperty('screenshot')
      expect(p).toHaveProperty('tags')
      expect(Array.isArray(p.tags)).toBe(true)
    })
  })
})

describe('skills data', () => {
  it('has frontend skills', () => {
    expect(frontendSkills.length).toBeGreaterThan(0)
  })

  it('has backend skills', () => {
    expect(backendSkills.length).toBeGreaterThan(0)
  })

  it('each skill has name and icon', () => {
    ;[...frontendSkills, ...backendSkills].forEach(s => {
      expect(s).toHaveProperty('name')
      expect(s).toHaveProperty('icon')
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/data/projects.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Create `app/data/projects.ts`**

```ts
// app/data/projects.ts
export interface Project {
  id: string
  name: string
  description: string
  liveUrl: string
  screenshot: string
  tags: string[]
}

export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Project One',
    description: 'A brief description of what this project does, the problem it solves, and your role in building it.',
    liveUrl: 'https://example.com',
    screenshot: '/projects/project-1.png',
    tags: ['Vue.js', 'Laravel', 'MySQL'],
  },
  {
    id: 'project-2',
    name: 'Project Two',
    description: 'A brief description of what this project does, the problem it solves, and your role in building it.',
    liveUrl: 'https://example.com',
    screenshot: '/projects/project-2.png',
    tags: ['Vue.js', 'REST API', 'Tailwind CSS'],
  },
  {
    id: 'project-3',
    name: 'Project Three',
    description: 'A brief description of what this project does, the problem it solves, and your role in building it.',
    liveUrl: 'https://example.com',
    screenshot: '/projects/project-3.png',
    tags: ['JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'project-4',
    name: 'Project Four',
    description: 'A brief description of what this project does, the problem it solves, and your role in building it.',
    liveUrl: 'https://example.com',
    screenshot: '/projects/project-4.png',
    tags: ['Vue.js', 'Laravel', 'Tailwind CSS'],
  },
  {
    id: 'project-5',
    name: 'Project Five',
    description: 'A brief description of what this project does, the problem it solves, and your role in building it.',
    liveUrl: 'https://example.com',
    screenshot: '/projects/project-5.png',
    tags: ['Vue.js', 'PHP', 'Bootstrap'],
  },
]
```

- [ ] **Step 4: Create `app/data/skills.ts`**

```ts
// app/data/skills.ts
export interface Skill {
  name: string
  icon: string // Iconify icon name
}

export const frontendSkills: Skill[] = [
  { name: 'HTML5', icon: 'logos:html-5' },
  { name: 'CSS3', icon: 'logos:css-3' },
  { name: 'JavaScript', icon: 'logos:javascript' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'Vue.js', icon: 'logos:vue' },
  { name: 'Nuxt.js', icon: 'logos:nuxt-icon' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
  { name: 'Git', icon: 'logos:git-icon' },
]

export const backendSkills: Skill[] = [
  { name: 'PHP', icon: 'logos:php' },
  { name: 'Laravel', icon: 'logos:laravel' },
  { name: 'MySQL', icon: 'logos:mysql-icon' },
  { name: 'REST APIs', icon: 'mdi:api' },
  { name: 'GitHub', icon: 'logos:github-icon' },
]
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx vitest run tests/data/projects.test.ts
```

Expected: PASS — 5 tests passing.

- [ ] **Step 6: Commit**

```bash
git add app/data/ tests/data/
git commit -m "feat: add projects and skills data"
```

---

## Task 4: Build `useScrollSpy` composable

**Files:**
- Create: `app/composables/useScrollSpy.ts`
- Create: `tests/composables/useScrollSpy.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/composables/useScrollSpy.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useScrollSpy } from '../../app/composables/useScrollSpy'

describe('useScrollSpy', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    const mockObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }
    vi.stubGlobal('IntersectionObserver', vi.fn(() => mockObserver))
  })

  it('initializes with empty active section', () => {
    const { activeSection } = useScrollSpy(['hero', 'about', 'skills'])
    expect(activeSection.value).toBe('')
  })

  it('returns a reactive activeSection ref', () => {
    const { activeSection } = useScrollSpy(['hero'])
    expect(typeof activeSection.value).toBe('string')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/composables/useScrollSpy.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Create `app/composables/useScrollSpy.ts`**

```ts
// app/composables/useScrollSpy.ts
export function useScrollSpy(sectionIds: string[]) {
  const activeSection = ref('')
  const observers: IntersectionObserver[] = []

  onMounted(() => {
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            activeSection.value = id
          }
        },
        { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' },
      )
      observer.observe(el)
      observers.push(observer)
    })
  })

  onUnmounted(() => {
    observers.forEach((o) => o.disconnect())
  })

  return { activeSection }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/composables/useScrollSpy.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/composables/useScrollSpy.ts tests/composables/useScrollSpy.test.ts
git commit -m "feat: add useScrollSpy composable"
```

---

## Task 5: Build `useTypingAnimation` composable

**Files:**
- Create: `app/composables/useTypingAnimation.ts`
- Create: `tests/composables/useTypingAnimation.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/composables/useTypingAnimation.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useTypingAnimation } from '../../app/composables/useTypingAnimation'

describe('useTypingAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with an empty display string', () => {
    const { displayText } = useTypingAnimation(['Frontend Developer'])
    expect(displayText.value).toBe('')
  })

  it('types characters over time', () => {
    const { displayText, start } = useTypingAnimation(['Hi'])
    start()
    vi.advanceTimersByTime(110)
    expect(displayText.value).toBe('H')
    vi.advanceTimersByTime(110)
    expect(displayText.value).toBe('Hi')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/composables/useTypingAnimation.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Create `app/composables/useTypingAnimation.ts`**

```ts
// app/composables/useTypingAnimation.ts
export function useTypingAnimation(roles: string[], typeSpeed = 100, deleteSpeed = 50, pauseMs = 2000) {
  const displayText = ref('')
  let currentRoleIndex = 0
  let charIndex = 0
  let isDeleting = false
  let timer: ReturnType<typeof setTimeout> | null = null

  function tick() {
    const currentRole = roles[currentRoleIndex]

    if (!isDeleting) {
      charIndex++
      displayText.value = currentRole.slice(0, charIndex)

      if (charIndex === currentRole.length) {
        isDeleting = true
        timer = setTimeout(tick, pauseMs)
        return
      }
    } else {
      charIndex--
      displayText.value = currentRole.slice(0, charIndex)

      if (charIndex === 0) {
        isDeleting = false
        currentRoleIndex = (currentRoleIndex + 1) % roles.length
      }
    }

    timer = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed)
  }

  function start() {
    timer = setTimeout(tick, typeSpeed)
  }

  function stop() {
    if (timer) clearTimeout(timer)
  }

  return { displayText, start, stop }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/composables/useTypingAnimation.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/composables/useTypingAnimation.ts tests/composables/useTypingAnimation.test.ts
git commit -m "feat: add useTypingAnimation composable"
```

---

## Task 6: Build `AppNav` component

**Files:**
- Create: `app/components/AppNav.vue`

- [ ] **Step 1: Create `app/components/AppNav.vue`**

```vue
<!-- app/components/AppNav.vue -->
<script setup lang="ts">
const props = defineProps<{
  activeSection: string
}>()

const isMenuOpen = ref(false)

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function scrollTo(href: string) {
  isMenuOpen.value = false
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 border-b border-[--color-border] bg-[--color-bg-primary]/90 backdrop-blur-sm">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <!-- Logo -->
      <a href="#hero" class="font-mono text-lg font-semibold text-[--color-accent]" @click.prevent="scrollTo('#hero')">
        &lt;YourName /&gt;
      </a>

      <!-- Desktop links -->
      <ul class="hidden items-center gap-8 md:flex">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="text-sm transition-colors duration-200"
            :class="activeSection === link.href.slice(1)
              ? 'text-[--color-accent] font-medium'
              : 'text-[--color-text-muted] hover:text-[--color-text-primary]'"
            @click.prevent="scrollTo(link.href)"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Hamburger -->
      <button
        class="flex flex-col gap-1.5 md:hidden"
        aria-label="Toggle menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span
          v-for="i in 3"
          :key="i"
          class="block h-0.5 w-6 bg-[--color-text-primary] transition-all duration-200"
        />
      </button>
    </nav>

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="border-t border-[--color-border] bg-[--color-bg-secondary] px-6 py-4 md:hidden">
      <ul class="flex flex-col gap-4">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="block text-sm transition-colors duration-200"
            :class="activeSection === link.href.slice(1)
              ? 'text-[--color-accent] font-medium'
              : 'text-[--color-text-muted]'"
            @click.prevent="scrollTo(link.href)"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>
```

- [ ] **Step 2: Verify it renders in dev**

Temporarily add `<AppNav :active-section="''" />` to `app/pages/index.vue` and check `http://localhost:3000`. Remove after verifying.

- [ ] **Step 3: Commit**

```bash
git add app/components/AppNav.vue
git commit -m "feat: add AppNav component"
```

---

## Task 7: Build `HeroSection` component

**Files:**
- Create: `app/components/HeroSection.vue`

- [ ] **Step 1: Create `app/components/HeroSection.vue`**

```vue
<!-- app/components/HeroSection.vue -->
<script setup lang="ts">
const { displayText, start, stop } = useTypingAnimation([
  'Frontend Developer',
  'Vue.js Developer',
  'UI/UX Enthusiast',
])

onMounted(start)
onUnmounted(stop)
</script>

<template>
  <section
    id="hero"
    class="flex min-h-screen flex-col items-center justify-center px-6 text-center"
  >
    <div class="max-w-3xl">
      <!-- Greeting -->
      <p class="mb-4 font-mono text-[--color-accent] text-sm tracking-widest uppercase">
        Hello, I'm
      </p>

      <!-- Name -->
      <h1 class="mb-4 text-5xl font-bold tracking-tight text-[--color-text-primary] md:text-7xl">
        Your Name
      </h1>

      <!-- Typing role -->
      <div class="mb-6 h-8 font-mono text-xl text-[--color-accent] md:text-2xl">
        <span>{{ displayText }}</span>
        <span class="animate-pulse">|</span>
      </div>

      <!-- Tagline -->
      <p class="mb-10 text-lg text-[--color-text-muted] max-w-xl mx-auto">
        I build clean, fast, and accessible web interfaces with Vue.js — and connect them to robust backends with Laravel.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href="#projects"
          class="rounded-lg bg-[--color-accent] px-6 py-3 text-sm font-semibold text-[--color-bg-primary] transition-all duration-200 hover:bg-[--color-accent-hover] hover:shadow-lg hover:shadow-cyan-500/20"
          @click.prevent="$el.closest('section')?.parentElement?.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })"
        >
          View My Work
        </a>
        <a
          href="/resume.pdf"
          download
          class="rounded-lg border border-[--color-accent] px-6 py-3 text-sm font-semibold text-[--color-accent] transition-all duration-200 hover:bg-[--color-accent]/10"
        >
          Download Resume
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 flex flex-col items-center gap-2 text-[--color-text-muted]">
      <span class="text-xs font-mono">scroll down</span>
      <div class="h-8 w-px animate-bounce bg-[--color-accent]" />
    </div>
  </section>
</template>
```

- [ ] **Step 2: Fix the "View My Work" scroll — replace the inline handler**

The inline handler above is messy. Replace the `@click.prevent` on the "View My Work" button with a proper handler using a script function:

```vue
<script setup lang="ts">
const { displayText, start, stop } = useTypingAnimation([
  'Frontend Developer',
  'Vue.js Developer',
  'UI/UX Enthusiast',
])

onMounted(start)
onUnmounted(stop)

function scrollToProjects() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
```

And update the button:
```html
<a
  href="#projects"
  class="rounded-lg bg-[--color-accent] px-6 py-3 text-sm font-semibold text-[--color-bg-primary] transition-all duration-200 hover:bg-[--color-accent-hover] hover:shadow-lg hover:shadow-cyan-500/20"
  @click.prevent="scrollToProjects"
>
  View My Work
</a>
```

- [ ] **Step 3: Commit**

```bash
git add app/components/HeroSection.vue
git commit -m "feat: add HeroSection with typing animation"
```

---

## Task 8: Build `AboutSection` component

**Files:**
- Create: `app/components/AboutSection.vue`

- [ ] **Step 1: Create `app/components/AboutSection.vue`**

```vue
<!-- app/components/AboutSection.vue -->
<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
    stop()
  }
})
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="mx-auto max-w-6xl px-6 py-24"
  >
    <!-- Section heading -->
    <div class="mb-16 text-center">
      <p class="mb-2 font-mono text-sm text-[--color-accent] tracking-widest uppercase">Get to know me</p>
      <h2 class="text-3xl font-bold text-[--color-text-primary] md:text-4xl">About Me</h2>
    </div>

    <!-- Two-column layout -->
    <div
      class="flex flex-col items-center gap-12 transition-all duration-700 md:flex-row"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <!-- Bio text -->
      <div class="flex-1 space-y-4 text-[--color-text-muted] leading-relaxed">
        <p>
          Hi! I'm <span class="text-[--color-text-primary] font-medium">Your Name</span>, a frontend developer based in [Your Location]. I started my career building user interfaces with Vue.js and gradually expanded my skills to cover backend integration with Laravel.
        </p>
        <p>
          During my time at [Previous Company], I worked on [brief description of what the company does], where I developed and maintained frontend features, integrated REST APIs, and collaborated closely with backend engineers to deliver full-stack features.
        </p>
        <p>
          I care about writing clean, readable code and building interfaces that feel fast and intuitive. I'm currently looking for my next opportunity to grow as a developer.
        </p>

        <!-- Quick facts -->
        <div class="pt-4 grid grid-cols-2 gap-3">
          <div v-for="fact in facts" :key="fact.label" class="flex items-center gap-2">
            <span class="text-[--color-accent] font-mono text-xs">▹</span>
            <span class="text-sm"><span class="text-[--color-text-primary] font-medium">{{ fact.label }}:</span> {{ fact.value }}</span>
          </div>
        </div>
      </div>

      <!-- Photo -->
      <div class="shrink-0">
        <div class="relative h-64 w-64 md:h-72 md:w-72">
          <div class="absolute inset-0 rounded-xl border-2 border-[--color-accent] translate-x-3 translate-y-3" />
          <img
            src="/profile.jpg"
            alt="Your Name"
            class="relative h-full w-full rounded-xl object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// Quick facts data — edit these
const facts = [
  { label: 'Location', value: 'Your City, Country' },
  { label: 'Experience', value: '2+ years' },
  { label: 'Focus', value: 'Frontend Dev' },
  { label: 'Open to', value: 'Full-time roles' },
]
</script>
```

> **Note:** Vue does not allow two `<script>` blocks unless one is `<script setup>`. Merge the `facts` array into the `<script setup>` block:

Corrected file — use a single `<script setup>` block:

```vue
<!-- app/components/AboutSection.vue -->
<script setup lang="ts">
const facts = [
  { label: 'Location', value: 'Your City, Country' },
  { label: 'Experience', value: '2+ years' },
  { label: 'Focus', value: 'Frontend Dev' },
  { label: 'Open to', value: 'Full-time roles' },
]

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
    stop()
  }
})
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="mx-auto max-w-6xl px-6 py-24"
  >
    <div class="mb-16 text-center">
      <p class="mb-2 font-mono text-sm text-[--color-accent] tracking-widest uppercase">Get to know me</p>
      <h2 class="text-3xl font-bold text-[--color-text-primary] md:text-4xl">About Me</h2>
    </div>

    <div
      class="flex flex-col items-center gap-12 transition-all duration-700 md:flex-row"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="flex-1 space-y-4 text-[--color-text-muted] leading-relaxed">
        <p>
          Hi! I'm <span class="text-[--color-text-primary] font-medium">Your Name</span>, a frontend developer based in [Your Location].
          I started my career building user interfaces with Vue.js and gradually expanded my skills to cover backend integration with Laravel.
        </p>
        <p>
          During my time at [Previous Company], I worked on [brief description], where I developed and maintained frontend features,
          integrated REST APIs, and collaborated with backend engineers to deliver full-stack features.
        </p>
        <p>
          I care about writing clean, readable code and building interfaces that feel fast and intuitive.
          I'm currently looking for my next opportunity to grow as a developer.
        </p>

        <div class="pt-4 grid grid-cols-2 gap-3">
          <div v-for="fact in facts" :key="fact.label" class="flex items-center gap-2">
            <span class="text-[--color-accent] font-mono text-xs">▹</span>
            <span class="text-sm">
              <span class="text-[--color-text-primary] font-medium">{{ fact.label }}:</span> {{ fact.value }}
            </span>
          </div>
        </div>
      </div>

      <div class="shrink-0">
        <div class="relative h-64 w-64 md:h-72 md:w-72">
          <div class="absolute inset-0 rounded-xl border-2 border-[--color-accent] translate-x-3 translate-y-3" />
          <img
            src="/profile.jpg"
            alt="Your Name"
            class="relative h-full w-full rounded-xl object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/AboutSection.vue
git commit -m "feat: add AboutSection component"
```

---

## Task 9: Build `SkillsSection` component

**Files:**
- Create: `app/components/SkillsSection.vue`

- [ ] **Step 1: Create `app/components/SkillsSection.vue`**

```vue
<!-- app/components/SkillsSection.vue -->
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { frontendSkills, backendSkills } from '../data/skills'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
    stop()
  }
})
</script>

<template>
  <section
    id="skills"
    ref="sectionRef"
    class="bg-[--color-bg-secondary] px-6 py-24"
  >
    <div class="mx-auto max-w-6xl">
      <div class="mb-16 text-center">
        <p class="mb-2 font-mono text-sm text-[--color-accent] tracking-widest uppercase">What I work with</p>
        <h2 class="text-3xl font-bold text-[--color-text-primary] md:text-4xl">Skills</h2>
      </div>

      <div
        class="space-y-12 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <!-- Frontend -->
        <div>
          <h3 class="mb-6 font-mono text-sm text-[--color-text-muted] uppercase tracking-widest">Frontend</h3>
          <div class="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            <div
              v-for="skill in frontendSkills"
              :key="skill.name"
              class="flex flex-col items-center gap-2 rounded-xl border border-[--color-border] bg-[--color-bg-card] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[--color-accent]/40 hover:shadow-lg hover:shadow-cyan-500/5"
            >
              <Icon :icon="skill.icon" class="h-8 w-8" />
              <span class="text-xs text-[--color-text-muted]">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- Backend -->
        <div>
          <h3 class="mb-6 font-mono text-sm text-[--color-text-muted] uppercase tracking-widest">Backend & Tools</h3>
          <div class="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            <div
              v-for="skill in backendSkills"
              :key="skill.name"
              class="flex flex-col items-center gap-2 rounded-xl border border-[--color-border] bg-[--color-bg-card] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[--color-accent]/40 hover:shadow-lg hover:shadow-cyan-500/5"
            >
              <Icon :icon="skill.icon" class="h-8 w-8" />
              <span class="text-xs text-[--color-text-muted]">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/SkillsSection.vue
git commit -m "feat: add SkillsSection component"
```

---

## Task 10: Build `ProjectsSection` component

**Files:**
- Create: `app/components/ProjectsSection.vue`

- [ ] **Step 1: Create `app/components/ProjectsSection.vue`**

```vue
<!-- app/components/ProjectsSection.vue -->
<script setup lang="ts">
import { projects } from '../data/projects'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
    stop()
  }
})
</script>

<template>
  <section
    id="projects"
    ref="sectionRef"
    class="mx-auto max-w-6xl px-6 py-24"
  >
    <div class="mb-16 text-center">
      <p class="mb-2 font-mono text-sm text-[--color-accent] tracking-widest uppercase">What I've built</p>
      <h2 class="text-3xl font-bold text-[--color-text-primary] md:text-4xl">Projects</h2>
    </div>

    <div
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div
        v-for="project in projects"
        :key="project.id"
        class="group flex flex-col overflow-hidden rounded-xl border border-[--color-border] bg-[--color-bg-card] transition-all duration-300 hover:-translate-y-1 hover:border-[--color-accent]/30 hover:shadow-xl hover:shadow-cyan-500/10"
      >
        <!-- Screenshot -->
        <div class="relative overflow-hidden">
          <img
            :src="project.screenshot"
            :alt="project.name"
            class="h-48 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[--color-bg-card] via-transparent to-transparent" />
        </div>

        <!-- Content -->
        <div class="flex flex-1 flex-col p-5">
          <h3 class="mb-2 text-lg font-semibold text-[--color-text-primary]">{{ project.name }}</h3>
          <p class="mb-4 flex-1 text-sm text-[--color-text-muted] leading-relaxed">{{ project.description }}</p>

          <!-- Tags -->
          <div class="mb-4 flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="rounded-full border border-[--color-accent]/30 bg-[--color-accent]/10 px-3 py-0.5 text-xs text-[--color-accent]"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Live Demo link -->
          <a
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm font-medium text-[--color-accent] transition-colors hover:text-[--color-accent-hover]"
          >
            Live Demo
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/ProjectsSection.vue
git commit -m "feat: add ProjectsSection component"
```

---

## Task 11: Build `ContactSection` component

**Files:**
- Create: `app/components/ContactSection.vue`

- [ ] **Step 1: Sign up for Formspree**

Go to [formspree.io](https://formspree.io), create a free account, create a new form, and copy your form ID (looks like `xpwzabcd`).

- [ ] **Step 2: Create `app/components/ContactSection.vue`**

Replace `YOUR_FORMSPREE_ID` with the ID from Step 1.

```vue
<!-- app/components/ContactSection.vue -->
<script setup lang="ts">
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID' // Replace with your Formspree form ID

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
  { label: 'GitHub', href: 'https://github.com/yourusername', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'Email', href: 'mailto:your@email.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]
</script>

<template>
  <section
    id="contact"
    class="bg-[--color-bg-secondary] px-6 py-24"
  >
    <div class="mx-auto max-w-6xl">
      <div class="mb-16 text-center">
        <p class="mb-2 font-mono text-sm text-[--color-accent] tracking-widest uppercase">Get in touch</p>
        <h2 class="text-3xl font-bold text-[--color-text-primary] md:text-4xl">Contact</h2>
        <p class="mt-4 text-[--color-text-muted]">I'm open to opportunities. Feel free to reach out!</p>
      </div>

      <div class="flex flex-col gap-12 md:flex-row">
        <!-- Form -->
        <form class="flex-1 space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label class="mb-1 block text-sm text-[--color-text-muted]">Name</label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="Your name"
              class="w-full rounded-lg border border-[--color-border] bg-[--color-bg-card] px-4 py-3 text-sm text-[--color-text-primary] placeholder-[--color-text-muted]/50 outline-none transition focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent]"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm text-[--color-text-muted]">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="your@email.com"
              class="w-full rounded-lg border border-[--color-border] bg-[--color-bg-card] px-4 py-3 text-sm text-[--color-text-primary] placeholder-[--color-text-muted]/50 outline-none transition focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent]"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm text-[--color-text-muted]">Message</label>
            <textarea
              v-model="form.message"
              required
              rows="5"
              placeholder="What's on your mind?"
              class="w-full rounded-lg border border-[--color-border] bg-[--color-bg-card] px-4 py-3 text-sm text-[--color-text-primary] placeholder-[--color-text-muted]/50 outline-none transition focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent] resize-none"
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

        <!-- Social links -->
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
```

- [ ] **Step 3: Commit**

```bash
git add app/components/ContactSection.vue
git commit -m "feat: add ContactSection with Formspree integration"
```

---

## Task 12: Build `AppFooter` component

**Files:**
- Create: `app/components/AppFooter.vue`

- [ ] **Step 1: Create `app/components/AppFooter.vue`**

```vue
<!-- app/components/AppFooter.vue -->
<template>
  <footer class="border-t border-[--color-border] px-6 py-8 text-center">
    <p class="font-mono text-xs text-[--color-text-muted]">
      Designed & Built by <span class="text-[--color-accent]">Your Name</span>
    </p>
  </footer>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/AppFooter.vue
git commit -m "feat: add AppFooter component"
```

---

## Task 13: Assemble `index.vue`

**Files:**
- Modify: `app/pages/index.vue`

- [ ] **Step 1: Replace `app/pages/index.vue` with the assembled page**

```vue
<!-- app/pages/index.vue -->
<script setup lang="ts">
const { activeSection } = useScrollSpy(['hero', 'about', 'skills', 'projects', 'contact'])
</script>

<template>
  <div class="min-h-screen bg-[--color-bg-primary] font-[--font-sans]">
    <AppNav :active-section="activeSection" />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
```

- [ ] **Step 2: Verify the full page in dev**

```bash
npm run dev
```

Open `http://localhost:3000`. Check:
- Nav is sticky and links scroll to each section
- Hero shows typing animation
- About section has two-column layout
- Skills section shows icon badges
- Projects section shows 5 cards
- Contact form and social links visible
- Footer at the bottom

- [ ] **Step 3: Commit**

```bash
git add app/pages/index.vue
git commit -m "feat: assemble full portfolio index page"
```

---

## Task 14: Add placeholder public assets

**Files:**
- Create: `public/resume.pdf` (placeholder)
- Create: `public/profile.jpg` (placeholder)
- Create: `public/projects/project-1.png` through `project-5.png` (placeholders)

- [ ] **Step 1: Create placeholder files**

```bash
# Create directories
mkdir -p public/projects

# Create placeholder text files (replace with real files later)
echo "Replace this with your real resume PDF" > public/resume.pdf
echo "" > public/profile.jpg
for i in 1 2 3 4 5; do echo "" > public/projects/project-$i.png; done
```

- [ ] **Step 2: Add a README note**

```bash
cat > public/ASSETS_README.md << 'EOF'
# Public Assets

Replace these placeholder files with your real content:

- `resume.pdf` — Your resume PDF
- `profile.jpg` — Your headshot photo (recommended: square, min 400x400)
- `projects/project-1.png` through `project-5.png` — Screenshots of each project (recommended: 1280x720)
EOF
```

- [ ] **Step 3: Commit**

```bash
git add public/
git commit -m "chore: add placeholder public assets"
```

---

## Task 15: Static generation check

**Files:**
- No file changes — verification only

- [ ] **Step 1: Run `nuxt generate`**

```bash
npm run generate
```

Expected: Build completes successfully. Output in `.output/public/`.

- [ ] **Step 2: Preview the static build**

```bash
npx serve .output/public
```

Open the URL shown (usually `http://localhost:3000`). Verify all sections load, nav works, and "Download Resume" downloads the PDF.

- [ ] **Step 3: Fix any build errors before continuing**

Common issues:
- `document is not defined` — wrap any `document.*` calls in `onMounted` or `if (import.meta.client)`
- Missing asset errors — ensure all `public/` files exist

---

## Task 16: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Generate static site
        run: npm run generate

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .output/public
```

- [ ] **Step 2: Commit**

```bash
mkdir -p .github/workflows
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Actions deploy workflow"
```

- [ ] **Step 3: Set up GitHub repository**

1. Create a new repository on GitHub named `portfolio-website` (or your preferred name)
2. If deploying to `username.github.io/portfolio-website`, update `nuxt.config.ts`:
   ```ts
   app: {
     baseURL: '/portfolio-website/',
   }
   ```
3. Push to GitHub:
   ```bash
   git remote add origin https://github.com/yourusername/portfolio-website.git
   git branch -M main
   git push -u origin main
   ```
4. In GitHub repo settings → Pages → Source: select `gh-pages` branch

- [ ] **Step 4: Verify deployment**

After the GitHub Actions workflow completes (check Actions tab), visit `https://yourusername.github.io/portfolio-website/`. The portfolio should be live.

---

## Task 17: Personalize content

Fill in all placeholder content with real information. Do this after the site is running.

- [ ] **Update `nuxt.config.ts`** — replace `'Your Name'` in the title
- [ ] **Update `HeroSection.vue`** — replace `Your Name`, tagline, role titles
- [ ] **Update `AboutSection.vue`** — replace bio text, location, facts
- [ ] **Update `app/data/projects.ts`** — fill in real project names, descriptions, URLs, tags
- [ ] **Update `app/data/skills.ts`** — add/remove skills to match your actual stack
- [ ] **Update `ContactSection.vue`** — replace GitHub/LinkedIn/email URLs, Formspree ID
- [ ] **Update `AppFooter.vue`** — replace `Your Name`
- [ ] **Replace `public/resume.pdf`** — your real resume
- [ ] **Replace `public/profile.jpg`** — your real photo
- [ ] **Replace `public/projects/*.png`** — real screenshots
- [ ] **Commit and push** — triggers auto-deploy
