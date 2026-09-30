---
type: Game Mechanic
title: "Effort: AP, AC and Large Nets"
description: "How many Arnold Palmers, Apple Ciders or Large Nets a drop costs, from buddy.farm's formulas."
tags: [effort, exploring, fishing]
sources:
  - id: player
    resource: confirmed by the player in planning chats
    title: "Player confirmation"
  - id: buddy-format
    resource: buddy.farm source code, src/utils/format.tsx
    title: "buddy.farm format.tsx"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# Rules

- Planner unit: **1 AP = 1 AC = 1 Large Net** (AP = Arnold Palmer, AC = Apple Cider).[^player]
- Explore `rate` = explores per drop. AC per drop = rate / (explPerCider x 0.4 / base); explPerCider 1000 (1250 with Cinnamon Sticks).[^buddy-format]
- AP per drop = rate / ((1 / base) x itemsPerPalmer); itemsPerPalmer 200 (500 with Lemon Squeezer).[^buddy-format]
- `base` null (Sinking Swamp) means explores only.
- Fishing: Large Nets per drop = rate / (250 + 150 Reinforced Netting + 100 Fishing Trawl). Frozen-pond variants skipped.[^buddy-format]
- Wanderer: % chance exploring uses no stamina.

[^player]: Player confirmation
[^buddy-format]: buddy.farm format.tsx
