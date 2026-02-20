/**
 * PBI #57 — Pricing page — Starter 99€ HT/mois
 * Acceptance Criteria tests
 * Source: Azure DevOps PBI #57
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const LOCALES = ['fr', 'en', 'zh-TW', 'zh-CN']

function loadMessages(locale: string) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../../messages', `${locale}.json`), 'utf8'))
}

describe('PBI #57 — Pricing page', () => {
  it('AC1: la page pricing existe', () => {
    const pagePath = path.join(__dirname, '../../app/[locale]/pricing/page.tsx')
    expect(fs.existsSync(pagePath), 'pricing/page.tsx should exist').toBe(true)
  })

  it('AC2: prix "99" visible dans les messages', () => {
    for (const locale of LOCALES) {
      const msgs = loadMessages(locale)
      const pricingText = JSON.stringify(msgs.pricing || {})
      expect(pricingText, `Locale ${locale} pricing should mention 99`).toMatch(/99/)
    }
  })

  it('AC3: mention HT/hors taxes ou equivalent', () => {
    const fr = loadMessages('fr')
    const pricingFr = JSON.stringify(fr.pricing || {}).toLowerCase()
    expect(pricingFr).toMatch(/ht|hors taxes/)
  })

  it('AC4: fair use mentionné', () => {
    for (const locale of LOCALES) {
      const msgs = loadMessages(locale)
      const pricingText = JSON.stringify(msgs.pricing || {}).toLowerCase()
      // "fair use" in EN/FR, "合理使用" in ZH-TW/ZH-CN
      expect(pricingText, `Locale ${locale} should mention fair use`).toMatch(/fair use|合理使用/)
    }
  })

  it('AC5: CTA vers contact', () => {
    const page = fs.readFileSync(path.join(__dirname, '../../app/[locale]/pricing/page.tsx'), 'utf8')
    expect(page).toMatch(/\/contact|contact/)
  })
})
