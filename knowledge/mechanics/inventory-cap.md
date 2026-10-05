---
type: Game Mechanic
title: "Inventory cap and voiding"
description: "One cap applies to each item separately; gathering past it voids, crafting into a full item is refused."
tags: [inventory, core]
sources:
  - id: player
    resource: confirmed by the player in planning chats
    title: "Player confirmation"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# Rules

- One cap number applies to **each item separately**. It grows daily, so treat it as editable.[^player]
- Gathering or harvesting past the cap **voids** the extra (it still counts for [mastery](/mechanics/mastery.md)). Crops can void.[^player]
- You **can't craft into a full item**: if the output is at cap, the craft doesn't happen.[^player]
- Craftworks is instant and crafts to exactly the limit.[^player]
- "MAX ON HAND" on the inventory page carries no intent; it only means you can't craft more into it.[^player]

# Daily growth

- The cap grows every day by the Storehouse amount (starts around +2; perks and +2 purchases raise it; each +2 costs 10x the
  last: +18 -> +20 is 10T). See [building upgrades](/mechanics/building-upgrades.md).[^player]
- Long projections count it: day 1 = cap, day 2 = cap + growth, day 3 = cap + 2 x growth, and so on.[^player]

# Planner implications

No plan should rely on voiding: show where the extra goes, and for leftovers bigger than the cap say how soon the cap fills and to use or sell as you go.

[^player]: Player confirmation
