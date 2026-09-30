---
type: Dataset
title: "Seeds"
description: "Base growth time and crops per seed for every seed, including Mega seeds."
resource: ../../seeds.js
tags: [data]
sources:
  - id: origin
    resource: https://buddy.farm/
    title: "buddy.farm seed pages"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# About

Base growth time and crops per seed for every seed, including Mega seeds. Loaded by the planner page as a plain script (works from file://).[^origin]

# Refresh

Regenerate with `node tools/snapshot-seeds.js`.

[^origin]: buddy.farm seed pages
