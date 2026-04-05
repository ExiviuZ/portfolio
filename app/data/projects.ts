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
    description: 'Built and maintained the frontend of a real estate website for Suntrust Properties. Developed reusable Vue components, consumed REST APIs to display CMS-managed property listings and pages, and ensured a responsive layout across devices.',
    liveUrl: 'https://suntrust.com.ph',
    screenshot: '/projects/suntrust.webp',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API', 'CMS'],
    status: 'live',
    category: 'work',
  },
  {
    id: 'project-2',
    name: 'Inlife Benefits',
    description: 'Developed the frontend for Inlife\'s benefits platform, integrating REST APIs to render CMS-managed content including plans, coverage details, and informational pages. Focused on clean UI and smooth navigation across the site.',
    liveUrl: 'https://www.inlifebenefits.com.ph',
    screenshot: '/projects/inlife.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API', 'CMS'],
    status: 'live',
    category: 'work',
  },
  {
    id: 'project-3',
    name: 'Robinsons Department Store',
    description: 'Worked on the frontend of the Robinsons Department Store website, building Vue components and connecting them to REST APIs for CMS-driven content. Handled responsive layouts and ensured consistent UI across multiple page types.',
    liveUrl: 'https://robinsonsdepartmentstore.com.ph',
    screenshot: '/projects/robinsons.webp',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API', 'CMS'],
    status: 'live',
    category: 'work',
  },
  {
    id: 'project-4',
    name: 'ADB Informational Platform',
    description: 'Built a static informational microsite for the Asian Development Bank (ADB) covering fragile and conflict-affected states. Developed entirely on the frontend using Nuxt\'s static generation — no CMS or backend involved.',
    liveUrl: 'https://www.adb.org/multimedia/fcas-sids-information-platform',
    screenshot: '/projects/adb.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Static Site'],
    status: 'live',
    category: 'work',
  },
  {
    id: 'project-5',
    name: 'Etiqa Insurance Philippines',
    description: 'Developing the frontend for Etiqa\'s insurance website in the Philippines. Building Vue components and integrating REST APIs provided by Etiqa\'s own backend team to display CMS-managed content including insurance products, FAQs, and landing pages. Currently in progress.',
    screenshot: '/projects/etiqa.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API', 'CMS'],
    status: 'in-development',
    category: 'work',
  },
  {
    id: 'project-6',
    name: 'Etiqa Online Shop Portal',
    description: 'Developing the frontend for Etiqa\'s online insurance shop where users can browse and purchase insurance products. Integrating REST APIs provided by Etiqa\'s own backend team for product listings and checkout flows. Currently in progress.',
    screenshot: '/projects/etiqa-portal.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API', 'CMS'],
    status: 'in-development',
    category: 'work',
  },
  {
    id: 'project-7',
    name: 'Brikk Inventory Management System',
    description: 'Built the frontend of an internal inventory management system, developing data-heavy UI components for managing stock, orders, and records. Integrated REST APIs to connect the Vue interface with the backend in real time.',
    screenshot: '/projects/brikk.png',
    tags: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'REST API'],
    status: 'private',
    category: 'work',
  },

  // ─── Frontend Mentor / Practice Projects ──────────────────────────────────
  // Replace each entry below with your real Frontend Mentor project details.
  // liveUrl → your live solution URL (e.g. https://your-username.github.io/project-name)
  // screenshot → add the image to /public/projects/ and update the path
  // tags → list the techs you used
  {
    id: 'practice-1',
    name: 'URL Shortening API',
    description: 'A Frontend Mentor challenge where I built a URL shortening landing page integrated with the CleanURI API. Practiced API calls, async JavaScript, clipboard interaction, and responsive layout across mobile and desktop.',
    liveUrl: 'https://exiviuz.github.io/FEM-URL-Shortening/',
    screenshot: '/projects/shortening.webp',
    tags: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    status: 'live',
    category: 'practice',
  },
  {
    id: 'practice-2',
    name: 'Space Tourism',
    description: 'A multi-page space tourism website from Frontend Mentor featuring destination, crew, and technology sections. Practiced tab-based navigation, responsive design across three breakpoints, and working with structured JSON data.',
    liveUrl: 'https://exiviuz.github.io/space-tourism/',
    screenshot: '/projects/space.webp',
    tags: ['HTML', 'CSS', 'JavaScript'],
    status: 'live',
    category: 'practice',
  },
  {
    id: 'practice-3',
    name: 'Job Listing with Filtering',
    description: 'A job listings page with dynamic tag-based filtering. Users can add and remove filter tags to narrow down listings. Built with React to practice component state, derived data, and conditional rendering.',
    liveUrl: 'https://exiviuz.github.io/react-job-listing/',
    screenshot: '/projects/job-listing.png',
    tags: ['React', 'HTML', 'CSS'],
    status: 'live',
    category: 'practice',
  },
  {
    id: 'practice-4',
    name: 'RAWG Clone — Video Game Database',
    description: 'A video game discovery app powered by the RAWG API. Displays games with ratings, genres, and platform details. Practiced working with a public API, search functionality, and card-based UI layouts.',
    liveUrl: 'https://exiviuz.github.io/rawg-clone/',
    screenshot: '/projects/rawg.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    status: 'live',
    category: 'practice',
  },
  {
    id: 'practice-5',
    name: 'Insure Landing Page',
    description: 'A responsive marketing landing page for an insurance company from Frontend Mentor. Focused on pixel-perfect implementation from a Figma design, mobile-first layout, and clean semantic HTML structure.',
    liveUrl: 'https://exiviuz.github.io/insure-landing-page/',
    screenshot: '/projects/insure.webp',
    tags: ['HTML', 'CSS', 'JavaScript'],
    status: 'live',
    category: 'practice',
  },
]
