---
id: 73
title: "Traductions zh-TW et zh-CN — aligner après refonte staffing"
priority: medium
size: M
labels: [sprint]
---

## Description
Après finalisation de messages/en.json et messages/fr.json, traduire toutes les clés en zh-TW et zh-CN. Le vocabulaire doit refléter le positionnement agence de staffing IA (recrutement, placement, mission), pas SaaS.

## Acceptance Criteria
- messages/zh-TW.json contains translations for all keys present in en.json
- messages/zh-CN.json contains translations for all keys present in en.json
- No English fallback strings visible on /zh-TW or /zh-CN routes
- Staffing/recruitment vocabulary correctly translated (not SaaS literal translation)
- Build passes for all 4 locales

---
_Updated 2026-02-21 — staffing vocabulary_
