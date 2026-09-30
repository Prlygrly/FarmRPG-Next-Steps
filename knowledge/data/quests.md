---
type: Dataset
title: "Quests"
description: "Open quests: needs, rewards, level requirements, and previous/next links for chains."
resource: ../../quests.js
tags: [data]
sources:
  - id: origin
    resource: https://buddy.farm/quests/
    title: "buddy.farm quest pages"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# About

Open quests: needs, rewards, level requirements, and previous/next links for chains. Loaded by the planner page as a plain script (works from file://).[^origin]

# Refresh

Regenerate with `node tools/snapshot-quests.js`.

[^origin]: buddy.farm quest pages
