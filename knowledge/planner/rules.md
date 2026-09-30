---
type: Reference
title: "Planner design rules"
description: "How the planner ranks, costs and words things, as agreed with the player."
tags: [planner]
sources:
  - id: player
    resource: confirmed by the player in planning chats
    title: "Player confirmation"
  - id: readme
    resource: ../../README.md
    title: "farmrpg-planner README"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# Rules

- Metric: finishing things (tower levels, GMs, MMs, quests). Works for any player; nothing player-specific is hardcoded.[^player]
- Effort in AP (see [effort units](/mechanics/effort-units.md)) plus time waiting on [daily production](/mechanics/production.md); waiting leads the wording.[^player]
- Daily production covers at most 7 days of a job; the rest is gathered or crafted.[^player]
- Masteries and quests weighted equally; quickest done first; main quests always shown.[^player]
- No plan relies on voiding; leftovers past the cap: say how soon the cap fills, use or sell as you go.[^player]
- Never recommend cookies or paid wishing well tosses; wishing well shows today only.[^player]
- Never say "keep it for its mastery" ([mastery](/mechanics/mastery.md) is counted on gain).[^player]
- Full list of decisions and the batch history: the README.[^readme]

[^player]: Player confirmation
[^readme]: farmrpg-planner README
