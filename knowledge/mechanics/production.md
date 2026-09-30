---
type: Game Mechanic
title: "Daily production"
description: "Farm buildings and the orchard make items over time; which building makes what, and the boosts."
tags: [production, farm, orchard]
sources:
  - id: player
    resource: confirmed by the player in planning chats
    title: "Player confirmation"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# Buildings

| Building | Makes |
|---|---|
| Chicken Coop | Eggs, Feathers (daily) |
| Cow Pasture | Milk (daily) |
| Raptor Pen | Antlers, Steak Kabobs (daily) |
| Worm Habitat | Worms, Gummy Worms, Mealworms (hourly) |
| Trout / Bait Farm | Trout, Grubs, Minnows (daily) |
| Vineyard | Grapes (daily) |
| Sawmill | Boards, Wood (hourly) |
| Ironworks | Iron, Nails (every 3 min) |
| Steelworks | Steel, Steel Wire (hourly) |
| Hay Field | Straw (every 10 min) |
| Quarry | Stone, Coal (every 10 min) |
| Orchard | Apples, Oranges, Lemons (daily) |

# Boosts

- Orchard noon bonus (Farm Supply): +10% of orchard production.[^player]
- Hickory Omelette: Sawmill also produces 20% every 10 minutes for 1 hour (about x2.2 for that hour).[^player]
- Iron Depot (Farm Supply): Iron and Nails bought automatically, effectively unlimited.[^player]
- Resource Saver: chance a **craft** gives double (cooking doesn't).[^player]

# Drops and the cap

- Production arrives in drops (the building's interval above). A drop only fills your inventory: anything over your cap voids on arrival.[^player]
- Autocrafting runs after the drop, so it can't use the excess either.[^player]
- So between two checks of the game you can use at most one inventory's worth. Usable rate = min(made per gap, cap) / gap, where the gap is the drop interval or the time between your checks, whichever is longer. Straw every 10 minutes, emptied each time, really can be six caps an hour.[^player]
- The orchard noon bonus is a % of the full production (not of what fit at midnight), capped on its own.[^player]
- Voiding from production over your cap is harmless (e.g. Antlers from raptors you can't control). The costly kind, a full inventory right before a drop, isn't modelled yet.[^player]

# Year-long blockers

Large Net, Orange Juice and Lemonade Mega Masteries take a year or more even at full production; keep Antlers -> Fishing Nets -> Large Nets, Oranges -> Orange Juice and Lemons -> Lemonade going every day.[^player]

[^player]: Player confirmation
