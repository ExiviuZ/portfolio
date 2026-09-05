import { describe, it, expect } from 'vitest'
import { projects } from '../../app/data/projects'
import { frontendSkills, backendSkills, infraSkills, aiSkills, tickerSkills } from '../../app/data/skills'
import { learningItems } from '../../app/data/learning'
import { facts, experienceBullets, roles, socialLinks, statusLabels } from '../../app/data/profile'

describe('projects data', () => {
  it('has both work and practice projects', () => {
    expect(projects.filter(p => p.category === 'work').length).toBeGreaterThan(0)
    expect(projects.filter(p => p.category === 'practice').length).toBeGreaterThan(0)
  })

  it('each project has required fields', () => {
    projects.forEach(p => {
      expect(p).toHaveProperty('id')
      expect(p).toHaveProperty('name')
      expect(p).toHaveProperty('description')
      expect(p).toHaveProperty('screenshot')
      expect(Array.isArray(p.tags)).toBe(true)
      expect(p.tags.length).toBeGreaterThan(0)
    })
  })

  it('has unique ids', () => {
    const ids = projects.map(p => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every live project has a liveUrl', () => {
    projects.filter(p => p.status === 'live').forEach(p => {
      expect(p.liveUrl).toBeTruthy()
    })
  })

  it('screenshots point at public/ paths', () => {
    projects.forEach(p => {
      expect(p.screenshot.startsWith('/projects/')).toBe(true)
    })
  })

  it('every status has a display label', () => {
    projects.forEach(p => {
      expect(statusLabels[p.status]).toBeTruthy()
    })
  })
})

describe('skills data', () => {
  const allSkills = [...frontendSkills, ...backendSkills, ...infraSkills, ...aiSkills]

  it('has every stack group populated', () => {
    ;[frontendSkills, backendSkills, infraSkills, aiSkills].forEach(group => {
      expect(group.length).toBeGreaterThan(0)
    })
  })

  it('each skill has name, icon and level', () => {
    allSkills.forEach(s => {
      expect(s).toHaveProperty('name')
      expect(s).toHaveProperty('icon')
      expect(s.level).toBeTruthy()
    })
  })

  it('lists no skill twice across groups', () => {
    const names = allSkills.map(s => s.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('ticker lists skills for the marquee', () => {
    expect(tickerSkills.length).toBeGreaterThan(0)
  })
})

describe('profile data', () => {
  it('has typing-animation roles', () => {
    expect(roles.length).toBeGreaterThan(1)
  })

  it('has facts and experience bullets', () => {
    expect(facts.length).toBe(4)
    expect(experienceBullets.length).toBeGreaterThan(0)
  })

  it('each social link has a label, href and value', () => {
    socialLinks.forEach(l => {
      expect(l.label).toBeTruthy()
      expect(l.href).toBeTruthy()
      expect(l.value).toBeTruthy()
    })
  })
})

describe('learning data', () => {
  it('has six items, matching the section copy', () => {
    expect(learningItems).toHaveLength(6)
  })

  it('each item has a title and description', () => {
    learningItems.forEach(i => {
      expect(i.title).toBeTruthy()
      expect(i.description).toBeTruthy()
    })
  })
})
