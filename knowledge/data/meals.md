---
type: Dataset
title: "Meals"
description: "Cooking level, base cook minutes and effect for every meal."
resource: ../../meals.js
tags: [data]
sources:
  - id: origin
    resource: https://buddy.farm/
    title: "buddy.farm meal pages"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# About

Cooking level, base cook minutes and effect for every meal. Loaded by the planner page as a plain script (works from file://).[^origin]

# Refresh

Regenerate with `node tools/snapshot-meals.js`.

[^origin]: buddy.farm meal pages
