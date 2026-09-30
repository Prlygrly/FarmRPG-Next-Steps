---
type: Dataset
title: "Chest and bag contents"
description: "What chests and grab bags contain and what opens them."
resource: ../../loot.js
tags: [data]
sources:
  - id: origin
    resource: https://buddy.farm/
    title: "buddy.farm item pages"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# About

What chests and grab bags contain and what opens them. Loaded by the planner page as a plain script (works from file://).[^origin]

# Refresh

Regenerate with `node tools/snapshot-loot.js`.

[^origin]: buddy.farm item pages
