# Quickstart: SEO Optimization

**Feature**: 005-seo-optimization | **Date**: 2026-02-26

## Verification Scenarios

### 1. Title Length Check
```bash
# After implementation, grep all metaTitle in fr.json
# Each should be under ~48 chars (template adds " | TheNoCodeGuy")
grep '"metaTitle"' messages/fr.json | awk -F'"' '{print length($4), $4}' | sort -rn
# All values must be < 48 chars
```

### 2. Meta Description Length Check
```bash
# All metaDesc between 120-155 chars
grep '"metaDesc"' messages/fr.json | awk -F'"' '{print length($4), $4}' | sort -rn
```

### 3. No More "Automatisez" in Meta Tags
```bash
grep -i "automatisez" messages/fr.json | grep -i "meta"
# Should return 0 results
```

### 4. External Links Present
```bash
grep -r "href=\"https://" app/[locale]/ components/ --include="*.tsx" | grep -v node_modules | wc -l
# Should be >= 10
```

### 5. Pillar Page Exists
```bash
# Verify the page exists in all locales
ls app/[locale]/agent-ia/page.tsx
# Check translation keys exist
grep "agentIA" messages/fr.json | head -5
grep "agentIA" messages/en.json | head -5
grep "agentIA" messages/zh-TW.json | head -5
grep "agentIA" messages/zh-CN.json | head -5
```

### 6. Sitemap Updated
```bash
grep "agent-ia\|domaines" app/sitemap.ts
# Should show domain pages and agent-ia in the PAGES array
```

### 7. Image Title Attributes
```bash
grep -r "title=" app/ components/ --include="*.tsx" | grep -i image | wc -l
# Should be > 0 for all Image components
```

### 8. Build Passes
```bash
npm run build
# Must exit 0 with no errors
```

### 9. Word Count Check (FR version)
Navigate to:
- /fr/agent-ia → 1,500+ words
- /fr/domaines/btp → 1,500+ words
- /fr/domaines/commerce → 1,000+ words
- /fr/domaines/admin → 1,000+ words
- /fr/domaines/web → 1,000+ words
- /fr/blog → 200+ words intro
- /fr/contact → 150+ words added
