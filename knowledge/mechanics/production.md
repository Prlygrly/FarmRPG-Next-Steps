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
| Trout / Bait Farm | Trout (daily); Grubs, Minnows (hourly, per the Trout Farm page: "produces grubs every hour") |
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
- Noon bonuses (Tree Shaker, Tower 170: orchard; Antler Snare, Tower 160: Antlers) are 10% of the full production (not of what fit at midnight), capped on their own.[^player]
- Voiding from production over your cap is harmless (e.g. Antlers from raptors you can't control). The costly kind, a full inventory right before a drop, isn't modelled yet.[^player]

# Year-long blockers

Large Net, Orange Juice and Lemonade Mega Masteries take a year or more even at full production; keep Antlers -> Fishing Nets -> Large Nets, Oranges -> Orange Juice and Lemons -> Lemonade going every day.[^player]

[^player]: Player confirmation

## Building pages (source: the player's building pages, 2026-10-05)
- Drop timing stated on each page: Sawmill boards and wood every hour; Ironworks iron and nails every 3 minutes; Steelworks
  steel and wire every 60 minutes; Hay Field straw every 10 minutes; Quarry stone **and sandstone** every 10 minutes (same
  amount), coal **every hour**; Worm Habitat worms, gummy worms and mealworms every hour; Trout Farm trout daily, grubs and
  minnows every hour; Coop, Pasture, Raptor Pen, Vineyard daily.
- Each page states its output in one sentence (see `parseBuilding` in parse.js), so a player without the home-page output perk
  can paste the pages one by one. The Storehouse page states the max inventory ("Currently your MAX Inventory is N").
- Trout Farm: every 10,000 trout a day also makes 1 Mega Trout.
- Steel and Steel Wire can also be **crafted**, so they aren't limited by the Steelworks alone.[^player]

## Noon bonus strategy (Antlers, fruit)
- Voiding at midnight is fine and expected. The best setup is a noon bonus (10% of production) as big as the cap: two full
  drops a day (200% of the cap) instead of 100% + 10%. For Antlers that needs production >= 10 x cap.[^player]
- Fruit tops out around 9,100 a day (about 7,000 trees, the base limit; special items add a few), so fruit can't reach that;
  once the cap is above the fruit drop, every fruit counts.[^player]
- Without the noon artifact (Antler Snare / Tree Shaker) there is no noon drop at all; getting it adds a 10% drop at noon.

