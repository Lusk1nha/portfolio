import { describe, it, expect, vi, afterEach } from 'vitest'
import { getYearsOfExperience, getYearsLabel } from './YearsOfExperience'

describe('getYearsOfExperience', () => {
  afterEach(() => vi.useRealTimers())

  it('returns 0 before the first anniversary', () => {
    vi.setSystemTime(new Date('2021-09-01'))
    expect(getYearsOfExperience()).toBe(0)
  })

  it('returns the full year count after anniversary month/day', () => {
    vi.setSystemTime(new Date('2022-09-01'))
    expect(getYearsOfExperience()).toBe(1)
  })

  it('does not count the year if anniversary has not passed yet', () => {
    vi.setSystemTime(new Date('2022-08-31'))
    expect(getYearsOfExperience()).toBe(0)
  })

  it('counts multiple years correctly', () => {
    vi.setSystemTime(new Date('2025-10-15'))
    expect(getYearsOfExperience()).toBe(4)
  })
})

describe('getYearsLabel', () => {
  afterEach(() => vi.useRealTimers())

  it('formats label in Portuguese', () => {
    vi.setSystemTime(new Date('2024-09-01'))
    expect(getYearsLabel('pt')).toBe('3+ anos')
  })

  it('formats label in English', () => {
    vi.setSystemTime(new Date('2024-09-01'))
    expect(getYearsLabel('en')).toBe('3+ years')
  })

  it('formats label in Spanish', () => {
    vi.setSystemTime(new Date('2024-09-01'))
    expect(getYearsLabel('es')).toBe('3+ años')
  })

  it('formats label in French', () => {
    vi.setSystemTime(new Date('2024-09-01'))
    expect(getYearsLabel('fr')).toBe('3+ ans')
  })
})
