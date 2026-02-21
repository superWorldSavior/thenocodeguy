# Backlog

Source of truth for all stories. Managed by agents, readable by humans.

## Structure

```
backlog/
  open/    ← stories not yet done (backlog + current sprint)
  done/    ← completed stories (closed)
```

## Story format

Each `.md` file has a YAML frontmatter + body:

```markdown
---
id: 30
title: "Story title"
priority: high | medium | low
size: S | M | L
labels: [sprint, blocked, needs-refinement, carryover]
dependsOn: [57, 58]   # optional
---

## Description
Why this story exists.

## Acceptance Criteria
- AC1: testable condition
- AC2: testable condition
```

## Labels

- `sprint` — in current sprint
- `blocked` — has unresolved dependency
- `needs-refinement` — too large or unclear, split before adding to sprint
- `carryover` — carried over from previous sprint

## Priority

- `high` — must be in next sprint
- `medium` — important but not urgent
- `low` — nice to have

## Size

- `S` — trivial, < 1 agent run
- `M` — 1-2 agent runs
- `L` — 3+ runs, consider splitting
