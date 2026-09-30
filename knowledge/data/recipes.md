---
type: Dataset
title: "Recipes"
description: "Craft and cook recipes, crafting level, mailable, and what each item is used in."
resource: ../../recipes.js
tags: [data]
sources:
  - id: origin
    resource: https://buddy.farm/
    title: "buddy.farm item pages"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# About

Craft and cook recipes, crafting level, mailable, and what each item is used in. Loaded by the planner page as a plain script (works from file://).[^origin]

# Refresh

Regenerate with `node tools/snapshot-recipes.js`.

[^origin]: buddy.farm item pages
