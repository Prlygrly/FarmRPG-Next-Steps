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
- Price of each new unit = **a fixed rate x the new amount**, so the price rises by the rate each time (sampled 2026-10-05).[^player]
  Going from A to B costs rate x (B(B+1) - A(A+1)) / 2. Rates per unit of each building's own amount:

  | Item | Rate | Unit | Check |
  |---|---|---|---|
  | Grapes (Vineyard) | 2,000 | per day | 11,000 -> 11,001 = 22,002,000 (no limit on how many; each costs 2,000 more than the last) |
  | Worms | 250 | per hour | 11,001 = 2,750,250 |
  | Gummy Worms | 25,000 | per hour | 2,001 = 50,025,000 |
  | Mealworms | 10,000 | per hour | 2,001 = 20,010,000 |
  | Board (Sawmill) | 1,500 | per hour | 18,001 = 27,001,500 |
  | Wood (Sawmill) | 1,000 | per hour | 18,001 = 18,001,000 |
  | Straw (Hay Field) | 10,000 | per 10 minutes | 11,001 = 110,010,000 |
  | Steel (Steelworks) | 300,000 | per hour | 1,251 = 375,300,000 |
  | Trout | 150 | per day | 6,001 = 900,150 |
  | Grubs | 1,000 | per hour | 5,001 = 5,001,000 |
  | Minnows | 5,000 | per hour | 5,001 = 25,005,000 |
  | Stone (Quarry) | 15,000 | per 10 minutes | 2,001 = 30,015,000 |
  | Coal (Quarry) | 25,000 | per hour | 1,501 = 37,525,000; 1,502 = 37,550,000 |
  | Iron (Ironworks) | 10,000 | per 3 minutes | 501 = 5,010,000 |

- Steel Wire isn't bought: it follows Steel, **Steel / 3 rounded** (1,250 -> 417, 1,253 -> 418, 1,256 -> 419).[^player]
- Followers: Sandstone comes with Stone; each Ironworks step adds 1 Iron and 3 Nails (500 Iron + 1,500 Nails every 3 minutes).[^player]
- Not sampled, on purpose: Coop, Pasture, Raptor Pen (animals) and the Orchard (trees). By the time a player maxes them the
  cost rarely matters; the Silver goal takes a typed amount for anything else.[^player]
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
- Upgrade costs are exact for the sampled buildings (upgrades.js); show them next to the time saved.
- The cap can be projected forward: cap in N days = cap now + daily growth × N.

[^player]: Player confirmation
[^pages]: Building pages
