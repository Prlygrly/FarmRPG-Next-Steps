---
type: Dataset
title: "Drop rates"
description: "Explore and fishing drop rates per place, with each place's base, type, and average XP and silver per explore/fish."
resource: ../../drops.js
tags: [data]
sources:
  - id: origin
    resource: https://buddy.farm/exploring/
    title: "buddy.farm exploring and fishing pages"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# Fetching

buddy.farm's Gatsby JSON: `/page-data/{exploring,fishing,quests}/page-data.json`, `/page-data/l/<slug>/`, `/page-data/i/<slug>/`,
`/page-data/q/<slug>/`. Slugs: lowercase, non-alphanumerics -> `-` (apostrophes too: `santa-s-workshop`); quest slugs keep a
trailing `-` for trailing punctuation and drop `<br/>`. Snapshot scripts: `tools/snapshot-*.js`.

# About

Explore and fishing drop rates per place, with each place's base, type, and average XP and silver per explore/fish. Loaded by the planner page as a plain script (works from file://).[^origin]

# Refresh

Regenerate with `node tools/snapshot-drops.js`.

[^origin]: buddy.farm exploring and fishing pages
