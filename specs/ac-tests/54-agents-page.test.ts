/**
 * PBI #54 — Page /agents — showcase des agents
 * Acceptance Criteria tests
 * Source: Azure DevOps PBI #54
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const LOCALES = ['fr', 'en', 'zh-TW', 'zh-CN']

function loadMessages(locale: string) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../../messages', `${locale}.json`), 'utf8'))
}

describe('PBI #54 — Page /agents', () => {
  it('AC1: la page agents existe', () => {
    const pagePath = path.join(__dirname, '../../app/[locale]/agents/page.tsx')
    expect(fs.existsSync(pagePath), 'agents/page.tsx should exist').toBe(true)
  })

  it('AC2: 3 agents listés (commercial, admin, webmaster)', () => {
    const page = fs.readFileSync(path.join(__dirname, '../../app/[locale]/agents/page.tsx'), 'utf8')
    expect(page).toMatch(/commercial/i)
    expect(page).toMatch(/admin/i)
    expect(page).toMatch(/webmaster/i)
  })

  it('AC3: chaque agent a un lien vers sa page détail', () => {
    const page = fs.readFileSync(path.join(__dirname, '../../app/[locale]/agents/page.tsx'), 'utf8')
    expect(page).toMatch(/\/agents\/commercial|agents\/\[slug\]|slug/)
  })

  it('AC5: textes i18n agents existent dans les 4 locales', () => {
    for (const locale of LOCALES) {
      const msgs = loadMessages(locale)
      expect(msgs.agents, `Locale ${locale} should have agents section`).toBeTruthy()
    }
  })
})
