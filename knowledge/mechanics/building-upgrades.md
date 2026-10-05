---
type: Game Mechanic
title: "Building upgrades"
description: "Production is bought in chosen amounts, not levels; costs rise with each upgrade; some buildings and the cap's daily growth have their own rules."
tags: [production, upgrades, silver]
sources:
  - id: player
    resource: confirmed by the player in planning chats (2026-10-05)
    title: "Player confirmation"
  - id: pages
    resource: the player's building pages (Increase Generation, "At least N Silver needed")
    title: "Building pages"
generated: { by: claude-code/opus-5.5, at: 2026-10-05T12:00:00Z }
---

# How upgrades work

- Buildings have **no levels**. The player buys more production directly: on a building page, "Increase Generation" asks how
  much to add, and a game pop-up shows the price to confirm or cancel.[^player]
- The page only shows the price of the **next single unit** ("At least N Silver needed").[^pages] Players think in round
  targets instead (5,000 Wood an hour → 5,500, 6,000 or 10,000).[^player]
- The price **rises with each upgrade**; the curve is unknown. The player may buy single units a dozen times to see whether it
  rises linearly or faster.[^player]
- Some buildings have a **hard limit**. The orchard's tree count maxes out (a few special items, possibly the Tree of Life,
  raise it slightly; the effect looks small unless a player has many).[^player]

# Inventory cap growth

- The cap grows by a fixed amount **each day** (Storehouse work), starting around **+2 a day**. Perks raise it, and it can be
  bought up in **steps of +2**.[^player]
- Each +2 step costs **10× the one before**: the player's +18 → +20 is 10T, +20 → +22 is 100T, then 1 quadrillion
  (2026-10-05).[^player]
- The Storehouse page states the current daily growth: "it will increase by N each time you work".[^pages]

# Planner implications

- What-ifs for production should take a **target amount** ("Sawmill at 10,000 Wood an hour"), not "+1 level".
- No upgrade cost totals until the price curve is known; show the time saved, and the next unit's price only if pasted.
- The cap can be projected forward: cap in N days = cap now + daily growth × N.

[^player]: Player confirmation
[^pages]: Building pages
