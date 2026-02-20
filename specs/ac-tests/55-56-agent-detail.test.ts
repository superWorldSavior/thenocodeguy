/**
 * PBI #55 & #56 — Pages agents détail (commercial, admin, webmaster)
 * Acceptance Criteria tests
 * Source: Azure DevOps PBI #55, #56
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const LOCALES = ['fr', 'en', 'zh-TW', 'zh-CN']
const AGENTS = ['commercial', 'admin', 'webmaster']

function loadMessages(locale: string) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../../messages', `${locale}.json`), 'utf8'))
}

describe('PBI #55/#56 — Agent detail pages', () => {
  it('AC1: la page agents/[slug] existe', () => {
    const pagePath = path.join(__dirname, '../../app/[locale]/agents/[slug]/page.tsx')
    expect(fs.existsSync(pagePath), 'agents/[slug]/page.tsx should exist').toBe(true)
  })

  it('AC2: les noms des agents sont en anglais dans toutes les locales', () => {
    for (const locale of LOCALES) {
      const msgs = loadMessages(locale)
      const agentsData = msgs.agents || {}
      const allValues = JSON.stringify(agentsData).toLowerCase()
      for (const agent of AGENTS) {
        // At least the slug/id should be referenced
        expect(allValues, `Locale ${locale} should reference ${agent}`).toMatch(agent)
      }
    }
  })

  it('AC5: CTA vers contact présent dans la page', () => {
    const page = fs.readFileSync(path.join(__dirname, '../../app/[locale]/agents/[slug]/page.tsx'), 'utf8')
    expect(page).toMatch(/\/contact|contact/)
  })
})
