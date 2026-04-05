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
