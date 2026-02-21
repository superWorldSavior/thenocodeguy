---
id: 73
title: "Traductions zh-TW et zh-CN — aligner après refonte FR/EN"
priority: medium
size: M
labels: [backlog]
dependsOn: [60]
---

## Description
Après finalisation de messages/en.json et messages/fr.json (#60), traduire toutes les nouvelles clés en zh-TW et zh-CN. Vérifier la cohérence du vocabulaire recrutement/agence en chinois traditionnel et simplifié. Aucune clé ne doit rester en anglais fallback dans les locales chinoises.

## Acceptance Criteria
- messages/zh-TW.json contains translations for all keys present in en.json
- messages/zh-CN.json contains translations for all keys present in en.json
- No English fallback strings visible on /zh-TW or /zh-CN routes
- Recruitment vocabulary correctly translated (not literal SaaS translation)
- Build passes for all 4 locales
