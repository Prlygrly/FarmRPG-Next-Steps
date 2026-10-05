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
- "Do these next" blends by effort in minutes of play: AP ÷ your AP-per-minute (default 100) + waiting hours × "an hour of waiting = N minutes" (default 20, since you can do other things while waiting). A "By type" view groups them instead.[^player]
- Players without the Tower see no Tower talk; masteries show their silver/gold/perk-point rewards instead of AK; a Leveling up card helps toward 4x90/4x99 (see [levels and XP](/mechanics/levels-and-xp.md), [progression](/mechanics/progression.md)).[^player]
- New visitors start with no paid perks; only items with a known production rate count as daily production.[^player]
- Places need their skill level as well as item evidence (see [locked places](/mechanics/locked-places.md)).
- Pastes: chat is stripped before anything is read; headings match in any case (the Steam app copies in capitals); the Steam Orchard page also carries the farm list, and both are read.[^player]
- Veggie Juice on crops is a setting (none / as much as helps / N each / down to X min), 10% per juice or 20% after "A Better Juice" ([Veggie Juice](/mechanics/veggie-juice.md)).[^player]
- Kitchen is a pantry list (quest needs, then lowest stock); cook time = perks + your usual stirs, never perfect ([cooking](/mechanics/cooking.md)).[^player]
- Keep on-screen text short.[^player]
- Full list of decisions and the batch history: the README.[^readme]

[^player]: Player confirmation
[^readme]: farmrpg-planner README
