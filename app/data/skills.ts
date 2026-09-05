export interface Skill {
  name: string
  icon: string // Iconify icon name — square glyphs only, they render in a fixed 18×18 box
  level: string // How often / how deeply I work with it
}

export const frontendSkills: Skill[] = [
  { name: 'HTML5', icon: 'logos:html-5', level: 'Daily' },
  { name: 'CSS3', icon: 'logos:css-3', level: 'Daily' },
  { name: 'JavaScript', icon: 'logos:javascript', level: 'Daily' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', level: 'Confident' },
  { name: 'Vue.js', icon: 'logos:vue', level: 'Core' },
  { name: 'Nuxt.js', icon: 'logos:nuxt-icon', level: 'Core' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', level: 'Daily' },
]

export const backendSkills: Skill[] = [
  { name: 'PHP', icon: 'logos:php', level: 'Working' },
  { name: 'Laravel', icon: 'logos:laravel', level: 'Working' },
  { name: 'MySQL', icon: 'logos:mysql-icon', level: 'Working' },
  { name: 'REST APIs', icon: 'mdi:api', level: 'Core' },
]

export const infraSkills: Skill[] = [
  { name: 'AWS (Lightsail / VPS)', icon: 'simple-icons:amazonwebservices', level: 'Working' },
  { name: 'Nginx', icon: 'simple-icons:nginx', level: 'Working' },
  { name: 'PM2', icon: 'simple-icons:pm2', level: 'Working' },
  { name: 'Git', icon: 'logos:git-icon', level: 'Daily' },
  { name: 'GitHub', icon: 'logos:github-icon', level: 'Daily' },
]

export const aiSkills: Skill[] = [
  { name: 'Claude Code', icon: 'logos:claude-icon', level: 'Daily' },
  { name: 'Gemini CLI', icon: 'simple-icons:googlegemini', level: 'Working' },
  { name: 'Codex', icon: 'logos:openai-icon', level: 'Working' },
]

// Marquee band under the hero
export const tickerSkills: string[] = [
  'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Vue.js', 'Nuxt.js', 'Tailwind CSS',
  'PHP', 'Laravel', 'MySQL', 'REST APIs', 'AWS', 'Nginx', 'PM2', 'Git', 'GitHub',
  'Claude Code', 'Vitest', 'Docker',
]
