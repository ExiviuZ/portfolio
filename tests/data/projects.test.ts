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
