export type ProjectStatus = 'live' | 'in-development' | 'private'
export type ProjectCategory = 'work' | 'practice'

export interface Project {
  id: string
  name: string
  description: string
  liveUrl?: string
  screenshot: string
  tags: string[]
  status: ProjectStatus
  category: ProjectCategory
}

export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Suntrust Properties',
    description: 'A brief description of what this project does, the problem it solves, and your role in building it.',
    liveUrl: 'https://suntrust.com.ph',
    screenshot: '/projects/suntrust.webp',
    tags: ['Vue.js', 'Laravel', 'MySQL'],
    status: 'live',
    category: 'work',
  },
  {
    id: 'project-2',
    name: 'Inlife Benefits',
    description: 'A brief description of what this project does, the problem it solves, and your role in building it.',
    liveUrl: 'https://www.inlifebenefits.com.ph',
    screenshot: '/projects/inlife.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API'],
    status: 'live',
    category: 'work',
  },
  {
    id: 'project-3',
    name: 'Robinsons Department Store',
    description: 'A brief description of what this project does, the problem it solves, and your role in building it.',
    liveUrl: 'https://robinsonsdepartmentstore.com.ph',
    screenshot: '/projects/robinsons.webp',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API'],
    status: 'live',
    category: 'work',
  },
  {
    id: 'project-4',
    name: 'ADB Informational Platform (Microsite)',
    description: 'A brief description of what this project does, the problem it solves, and your role in building it.',
    liveUrl: 'https://www.adb.org/multimedia/fcas-sids-information-platform',
    screenshot: '/projects/adb.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Static Site'],
    status: 'live',
    category: 'work',
  },
  {
    id: 'project-5',
    name: 'Etiqa Life and General Assurance Philippines, Inc.',
    description: 'A brief description of what this project does, the problem it solves, and your role in building it.',
    screenshot: '/projects/etiqa.png',
    tags: ['Vue.js', 'PHP', 'Bootstrap'],
    status: 'in-development',
    category: 'work',
  },
  {
    id: 'project-6',
    name: 'Etiqa Online Shop Portal',
    description: 'A brief description of what this project does, the problem it solves, and your role in building it.',
    screenshot: '/projects/etiqa-portal.png',
    tags: ['Vue.js', 'PHP', 'Bootstrap'],
    status: 'in-development',
    category: 'work',
  },
  {
    id: 'project-7',
    name: 'Brikk Inventory Management System',
    description: 'A brief description of what this project does, the problem it solves, and your role in building it.',
    screenshot: '/projects/brikk.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API'],
    status: 'private',
    category: 'work',
  },
  
]
