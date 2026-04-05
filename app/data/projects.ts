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
