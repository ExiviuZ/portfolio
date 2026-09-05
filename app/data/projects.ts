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
    description: 'Frontend for a national real estate brand — reusable Vue components consuming CMS-managed property listings over REST, responsive across every device.',
    liveUrl: 'https://suntrust.com.ph',
    screenshot: '/projects/suntrust.webp',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API', 'CMS'],
    status: 'live',
    category: 'work',
  },
  {
    id: 'project-2',
    name: 'Inlife Benefits',
    description: 'Benefits platform frontend rendering CMS-managed plans, coverage details and informational pages through REST integrations, with a focus on clean navigation.',
    liveUrl: 'https://www.inlifebenefits.com.ph',
    screenshot: '/projects/inlife.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API', 'CMS'],
    status: 'live',
    category: 'work',
  },
  {
    id: 'project-3',
    name: 'Robinsons Department Store',
    description: 'Retail site frontend — Vue components wired to REST endpoints for CMS-driven content, with consistent UI across many page types.',
    liveUrl: 'https://robinsonsdepartmentstore.com.ph',
    screenshot: '/projects/robinsons.webp',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API', 'CMS'],
    status: 'live',
    category: 'work',
  },
  {
    id: 'project-4',
    name: 'ADB Information Platform',
    description: 'Static informational microsite for the Asian Development Bank on fragile and conflict-affected states — a pixel-perfect build on Nuxt static generation, no CMS or backend.',
    liveUrl: 'https://www.adb.org/multimedia/fcas-sids-information-platform',
    screenshot: '/projects/adb.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Static Site'],
    status: 'live',
    category: 'work',
  },
  {
    id: 'project-8',
    name: 'Designblue Manila',
    description: 'Public site for the agency, built with the team on Nuxt 4 and Vue 3 against a Laravel API and custom CMS.',
    liveUrl: 'https://designbluemanila.com/',
    screenshot: '/projects/designblue.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Laravel', 'REST API', 'CMS'],
    status: 'live',
    category: 'work',
  },
  {
    id: 'project-7',
    name: 'Brikk Inventory System',
    description: 'Internal inventory management frontend — data-heavy components for stock, orders and records, wired to the backend over REST in real time.',
    screenshot: '/projects/brikk.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API'],
    status: 'private',
    category: 'work',
  },
  {
    id: 'project-5',
    name: 'Etiqa Insurance PH',
    description: 'Insurance site frontend: CMS-driven products and FAQs over REST, plus integrations with Etiqa\'s own backend APIs for KYC and policy purchasing flows.',
    screenshot: '/projects/etiqa.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API', 'CMS'],
    status: 'in-development',
    category: 'work',
  },
  {
    id: 'project-6',
    name: 'Etiqa Online Shop Portal',
    description: 'Storefront for browsing and buying insurance products — CMS content over REST alongside third-party APIs handling KYC verification and policy issuance.',
    screenshot: '/projects/etiqa-portal.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API', 'CMS'],
    status: 'in-development',
    category: 'work',
  },

  // ─── Frontend Mentor / practice projects ─────────────────────────────────
  {
    id: 'practice-1',
    name: 'URL Shortening API',
    description: 'Frontend Mentor challenge integrated with the CleanURI API — async JavaScript, clipboard interaction and a responsive layout from mobile up.',
    liveUrl: 'https://exiviuz.github.io/FEM-URL-Shortening/',
    screenshot: '/projects/shortening.webp',
    tags: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    status: 'live',
    category: 'practice',
  },
  {
    id: 'practice-2',
    name: 'Space Tourism',
    description: 'Multi-page site with destination, crew and technology sections — tab navigation, three breakpoints, structured JSON data.',
    liveUrl: 'https://exiviuz.github.io/space-tourism/',
    screenshot: '/projects/space.webp',
    tags: ['HTML', 'CSS', 'JavaScript'],
    status: 'live',
    category: 'practice',
  },
  {
    id: 'practice-3',
    name: 'Job Listing with Filtering',
    description: 'Dynamic tag-based filtering built in React to practise component state, derived data and conditional rendering.',
    liveUrl: 'https://exiviuz.github.io/react-job-listing/',
    screenshot: '/projects/job-listing.png',
    tags: ['React', 'HTML', 'CSS'],
    status: 'live',
    category: 'practice',
  },
  {
    id: 'practice-4',
    name: 'RAWG Clone',
    description: 'Game discovery app on the RAWG API — ratings, genres and platform details in a card-based browse and search UI.',
    liveUrl: 'https://exiviuz.github.io/rawg-clone/',
    screenshot: '/projects/rawg.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    status: 'live',
    category: 'practice',
  },
  {
    id: 'practice-5',
    name: 'Insure Landing Page',
    description: 'Marketing landing page built pixel-perfect from a Figma design — mobile-first layout, clean semantic structure.',
    liveUrl: 'https://exiviuz.github.io/insure-landing-page/',
    screenshot: '/projects/insure.webp',
    tags: ['HTML', 'CSS', 'JavaScript'],
    status: 'live',
    category: 'practice',
  },
]
