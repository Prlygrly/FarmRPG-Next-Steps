---
type: Game Mechanic
title: "Crops and growth"
description: "Crop yield per hour from plots, growth perks, Double Prizes and Grape Juice; Mega seeds give 10 crops."
tags: [farming, crops]
status: draft
sources:
  - id: player
    resource: confirmed by the player in planning chats
    title: "Player confirmation"
  - id: buddy-seeds
    resource: https://buddy.farm/
    title: "buddy.farm seed pages"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# Rules

- Yield per hour = plots / seeds per crop x (1 + Double Prizes) x (min(60 / growth', harvests per hour) + Grape Juice uses per day / 24).
- Growth perks ("Crops grow N% faster") add up and come off the growth time; how the game really combines them is **unconfirmed** (planner caps at 95%). Corn has its own extra perk.
- Mega seeds grow 10 crops per seed.[^buddy-seeds]
- Grape Juice makes a planting ready instantly; uses per day = (1 + extra uses) x 2 from Farm Supply perks (14 a day with the Pitcher and Fountains).[^player]
- Crops that also drop somewhere you can explore (Mushroom) are gathered, not farmed.[^player]
- Crops can void (unlike crafts). See [inventory cap](/mechanics/inventory-cap.md).
- See [Breakfast Boost](/mechanics/breakfast-boost.md), [cookies](/mechanics/cookies.md), [Veggie Juice](/mechanics/veggie-juice.md).

[^player]: Player confirmation
[^buddy-seeds]: buddy.farm seed pages
