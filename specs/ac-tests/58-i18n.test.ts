/**
 * PBI #58 — i18n agents — noms et contenus en 4 langues
 * Acceptance Criteria tests
 * Source: Azure DevOps PBI #58
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const LOCALES = ['fr', 'en', 'zh-TW', 'zh-CN']

function loadMessages(locale: string) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../../messages', `${locale}.json`), 'utf8'))
}

function flatKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null
      ? flatKeys(v as Record<string, unknown>, `${prefix}${k}.`)
      : [`${prefix}${k}`]
  )
}

describe('PBI #58 — i18n completeness', () => {
  it('AC1: les 4 fichiers de locale existent', () => {
    for (const locale of LOCALES) {
      const filePath = path.join(__dirname, '../../messages', `${locale}.json`)
      expect(fs.existsSync(filePath), `${locale}.json should exist`).toBe(true)
    }
  })

  it('AC2: toutes les clés FR existent dans les autres locales', () => {
    const frKeys = flatKeys(loadMessages('fr'))
    for (const locale of LOCALES.filter(l => l !== 'fr')) {
      const localeKeys = flatKeys(loadMessages(locale))
      const missing = frKeys.filter(k => !localeKeys.includes(k))
      expect(missing, `Keys missing in ${locale}: ${missing.slice(0, 5).join(', ')}`).toHaveLength(0)
    }
  })

  it('AC3: noms des agents en anglais dans toutes les locales', () => {
    const agentNames = ['commercial', 'admin', 'webmaster']
    for (const locale of LOCALES) {
      const msgs = loadMessages(locale)
      const allText = JSON.stringify(msgs).toLowerCase()
      for (const name of agentNames) {
        expect(allText, `${locale} should contain agent name "${name}"`).toContain(name)
      }
    }
  })

  it('AC4: zéro string FR hardcodée dans les composants', () => {
    const appDir = path.join(__dirname, '../../app')
    const tsxFiles: string[] = []

    function findTsx(dir: string) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) findTsx(full)
        else if (entry.name.endsWith('.tsx')) tsxFiles.push(full)
      }
    }
    findTsx(appDir)

    // Common French words that shouldn't be hardcoded
    const frenchPatterns = [
      />\s*Accueil\s*</,
      />\s*Services\s*</,
      />\s*Contactez-nous\s*</,
      />\s*À propos\s*</,
    ]

    for (const file of tsxFiles) {
      const content = fs.readFileSync(file, 'utf8')
      for (const pattern of frenchPatterns) {
        expect(
          content,
          `${path.basename(file)} should not have hardcoded French: ${pattern}`
        ).not.toMatch(pattern)
      }
    }
  })
})
