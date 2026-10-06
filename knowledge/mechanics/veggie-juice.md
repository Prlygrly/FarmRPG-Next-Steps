---
type: Game Mechanic
title: "Veggie Juice"
description: "Each Veggie Juice cuts 10% (20% after A Better Juice) off a planted crop's time left, 1-minute floor; recipe and the player's cycle."
tags: [farming, crops, crafting]
sources:
  - id: player
    resource: confirmed by the player in planning chats
    title: "Player confirmation"
  - id: buddy-vj
    resource: https://buddy.farm/i/veggie-juice/
    title: "buddy.farm: Veggie Juice"
verified: { by: human:player, at: 2026-09-30T18:00:00Z }
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# Rules

- Recipe: 7 each Carrot, Peas, Cucumber, Eggplant, Peppers + 15 Beet, 2 Tomato, 2 Watermelon, 2 Twine, 2 Horn, 1 Glass Bottle.[^buddy-vj]
- Each juice used on a planted crop takes **10% off the time left** by default, **20%** once the "A Better Juice" questline (Mariya, I-VI; needs Tower 100 and Farming, Fishing, Crafting, Exploring 99) is done; never below 1 minute: N juices at once = left x (1 - cut)^N. Best used all at once right after planting.[^player]
- "A Better Juice" is assigned as soon as you qualify; a player could hide it before doing it (edge case).[^player]
- Mailable, so even beginners can have some (they just can't craft it).[^player]
- Juices to reach the 1-minute floor from `m` minutes left: ceil(ln(m) / -ln(1 - cut)). Example (20%): Cabbage at 48 min -> 18 juices
  (17 leave about 1 min 5 s). Confirmed in game by the player: exactly 18.[^player]
- Kept for speeding crops, not sold.[^player]

# The player's cycle

1. Breakfast Boost the five quick crops (Eggplant, Carrot, Peas, Cucumber, Peppers) until full.
2. Grow Tomato and Watermelon, taking turns, when nothing else needs the plots, until full.
3. Grape Juice the (Mega) Beets and craft (Craftworks) until Tomato and Watermelon run out. Repeat.[^player]

The planner marks the first step whose crops aren't in yet (for the Veggie Juice goal) as the one to do now.[^player]

[^player]: Player confirmation
[^buddy-vj]: buddy.farm: Veggie Juice
