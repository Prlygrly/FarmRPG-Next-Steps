---
type: Game Mechanic
title: "Cooking"
description: "Ovens make one meal each; perks and stirring shorten cook time; tasting and seasoning give mastery and XP."
tags: [cooking, meals]
sources:
  - id: player
    resource: confirmed by the player in planning chats
    title: "Player confirmation"
  - id: wiki-cooking
    resource: https://farmrpg.com/wiki.php?page=Cooking
    title: "FarmRPG wiki: Cooking"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# Rules

- Unlock: Farming 75 and Crafting 75; Kitchen costs 500M silver. Most recipes need Cooking Pots (Ember Lagoon ingredients).[^wiki-cooking]
- One meal per oven. Ovens unlock with cooking level, 1B silver each.[^wiki-cooking]
- Oven unlocks: the first comes with the Kitchen; then Cooking 2, 5, 10, 20, 35, 50, 70, 90 and 99 (ten in all). The planner assumes a player has every oven their level allows unless they type their own number.[^player]
- Speed perks: Hotter Ovens I 10% (Farm Supply), Quicker Cooking I 5% and II 10% (perk points); up to 25% faster.[^wiki-cooking]
- **Stir**: first after 1 minute, then every 15 minutes; each takes 10% off the time left. A stir can push time left below the taste/season timers and lose them.[^wiki-cooking]
- **Taste**: after 3 minutes, then every 20; bonus mastery +1 plus 1 per 30 minutes of base cook time (needs one of the meal owned).[^wiki-cooking]
- **Season**: after 5 minutes, then every 30; random bonus XP.[^wiki-cooking]
- Full perks + perfect stirring: Onion Soup 1 h -> 37m27s, 2 h meals -> 1h7m9s, Mushroom Stew 3 h -> 1h31m52s, Acorn Pie 24 h -> 5h0m28s.[^wiki-cooking]
- Players rarely stir perfectly (1-4 interaction rounds a meal); never assume perfect.[^player]

# Examples

Perks 25% faster, stirs at 1, 16 and 31 min: Onion Soup 60 -> 45 min; 44 left at 1 -> 39.6; 24.6 left at 16 -> 22.1; 7.1 left at 31 -> 6.4; done at 37.4 min (wiki: 37m27s).

[^player]: Player confirmation
[^wiki-cooking]: FarmRPG wiki: Cooking
