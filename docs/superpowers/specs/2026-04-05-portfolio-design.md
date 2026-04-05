# Portfolio Website Design Spec
**Date:** 2026-04-05
**Status:** Approved

## Overview

A developer portfolio website for a junior frontend developer with some fullstack (Laravel) experience. The primary goal is to land a job. It showcases 5 projects, a skills section, about info, resume download, and a contact form.

Built with **Nuxt 4** as a fully static site (via `nuxt generate`) deployed to **GitHub Pages**.

---

## Goals

- Help the owner land a frontend developer role
- Showcase 5 projects with live URLs, screenshots, and descriptions
- Allow visitors to download a resume (PDF)
- Let visitors learn about the developer (background, skills)
- Enable contact via form and social links

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Nuxt 4 (static generation) |
| Styling | Tailwind CSS v4 |
| Animations | VueUse `useIntersectionObserver` + CSS transitions |
| Icons | Iconify (via `@iconify/vue`) |
| Contact form | Formspree (free tier, no backend needed) |
| Deployment | GitHub Pages via `nuxt generate` + GitHub Actions |

---

## Visual Style

- **Theme:** Dark/tech aesthetic — deep dark backgrounds, monospace or modern sans-serif typography
- **Accent color:** Cyan (terminal-inspired)
- **Animations:** Subtle — fade-in on scroll, smooth hover lifts, typing effect on hero title
- **Responsive:** Mobile-first, hamburger nav on small screens

---

## Architecture

Single-page application (SPA) with anchor-based navigation. All content on `index.vue`. Nuxt configured with `ssr: false` and `target: static` for GitHub Pages compatibility.

```
/ (index)
├── #hero       — name, title, CTA buttons
├── #about      — short bio + photo
├── #skills     — tech stack badges grouped by category
├── #projects   — 5 project cards
├── #contact    — contact form + social links
```

No sub-routes. Navigation is anchor links with smooth scroll.

---

## Page Sections

### Sticky Nav
- Logo/name on the left
- Anchor links on the right: About, Skills, Projects, Contact
- Active section highlighted as user scrolls
- Collapses to hamburger menu on mobile

### Hero (`#hero`)
- Full-viewport height
- Large heading: developer's name
- Role title with typing animation (e.g. "Frontend Developer")
- One-liner tagline
- Two CTA buttons:
  - "View My Work" → scrolls to #projects
  - "Download Resume" → direct link to `/resume.pdf` (static file in `/public`)

### About (`#about`)
- Two-column desktop layout: bio text (left), photo (right)
- Stacks vertically on mobile
- Short paragraph covering background: junior frontend dev who grew into fullstack with Laravel integrations

### Skills (`#skills`)
- Grid of icon + label badges
- Grouped into two categories:
  - **Frontend:** HTML, CSS, JavaScript, Vue.js, Tailwind CSS, etc.
  - **Backend / Other:** Laravel, PHP, REST APIs, Git, etc.
- Fade-in on scroll via `useIntersectionObserver`

### Projects (`#projects`)
- Grid of 5 cards (2-3 columns on desktop, 1 on mobile)
- Each card contains:
  - Project screenshot (static image in `/public/projects/`)
  - Project name
  - Short description (written collaboratively with owner)
  - Tech stack tags
  - "Live Demo" button → opens live URL in new tab
- Hover effect: subtle lift + shadow

### Contact (`#contact`)
- Split layout on desktop (stacks on mobile):
  - **Left:** Form with fields: Name, Email, Message, Send button — submitted via Formspree
  - **Right:** Social links — GitHub, LinkedIn, direct email link
- No backend required; Formspree handles delivery to owner's email

---

## Deployment

- `nuxt generate` outputs static files to `.output/public`
- GitHub Actions workflow on push to `main`:
  1. Install dependencies
  2. Run `nuxt generate`
  3. Deploy `.output/public` to `gh-pages` branch
- Resume PDF placed in `/public/resume.pdf` (updated manually as needed)
- Project screenshots placed in `/public/projects/<name>.png`

---

## Out of Scope

- Individual project detail pages (can be added later)
- Blog
- CMS integration
- Authentication
