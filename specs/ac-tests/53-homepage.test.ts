/**
 * PBI #53 — Homepage rewrite — The No Code Guys
 * Acceptance Criteria tests
 * Source: Azure DevOps PBI #53
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const LOCALES = ['fr', 'en', 'zh-TW', 'zh-CN']

function loadMessages(locale: string) {
  const filePath = path.join(__dirname, '../../messages', `${locale}.json`)
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function loadPage(pagePath: string) {
  const filePath = path.join(__dirname, '../../app/[locale]', pagePath)
  return fs.readFileSync(filePath, 'utf8')
}

describe('PBI #53 — Homepage rewrite', () => {
  it('AC1: hero contient "No Code Guy" dans les 4 locales', () => {
    for (const locale of LOCALES) {
      const msgs = loadMessages(locale)
      const heroTitle = msgs.home?.heroTitle || ''
      const heroHighlight = msgs.home?.heroHighlight || ''
      const combined = `${heroTitle} ${heroHighlight}`.toLowerCase()
      expect(combined, `Locale ${locale} hero should mention "no code guy"`).toMatch(/no.?code.?guy/i)
    }
  })

  it('AC2: 3 cards agents présentes dans le code homepage', () => {
    const page = loadPage('page.tsx')
    expect(page).toMatch(/commercial/i)
    expect(page).toMatch(/admin/i)
    expect(page).toMatch(/webmaster/i)
  })

  it('AC3: section comment ça marche existe', () => {
    for (const locale of LOCALES) {
      const msgs = loadMessages(locale)
      // Check for "how it works" style section
      const hasSteps = msgs.home?.how0Title || msgs.home?.howTitle || msgs.home?.step0Title
      expect(hasSteps, `Locale ${locale} should have "how it works" section`).toBeTruthy()
    }
  })

  it('AC4: CTA vers pricing ou contact présent', () => {
    const page = loadPage('page.tsx')
    expect(page).toMatch(/\/pricing|\/contact|\/tarifs/)
  })

  it('AC5: metadata contient le nouveau positionnement', () => {
    const page = loadPage('page.tsx')
    expect(page).toMatch(/metadata|generateMetadata/)
    // Check FR messages have updated metadata
    const fr = loadMessages('fr')
    const homeKeys = Object.values(fr.home || {}).join(' ').toLowerCase()
    expect(homeKeys).not.toMatch(/on automatise ce que vous répétez/)
  })

  it('AC6: testimonials conservés', () => {
    for (const locale of LOCALES) {
      const msgs = loadMessages(locale)
      expect(msgs.home?.testimonial0Quote, `Locale ${locale} should have testimonials`).toBeTruthy()
    }
  })
})
