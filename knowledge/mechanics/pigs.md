---
type: Game Mechanic
title: "Pigs and Bacon"
description: "Bacon from a slaughtered pig by level, how fast pigs level, Truffle odds by level, and why a small pen slaughtered at level 5-6 costs the least Truffle silver."
tags: [pigs, bacon, truffles, livestock]
sources:
  - id: planner
    resource: "Which pigs become bacon? A FarmRPG bacon planner (community page, shared by the player as a saved HTML file)"
    title: "Community bacon planner"
  - id: buddy-bacon
    resource: https://buddy.farm/i/bacon/
    title: "buddy.farm: Bacon"
generated: { by: claude-code/opus-5.5, at: 2026-10-09T20:00:00Z }
---
# Rules

- Bacon from slaughtering a level L pig: none below level 5; from level 5, 10 × L − 25 (25 at level 5, 35 at 6, 175 at 20).[^planner]
- A slaughtered pig isn't replaced on its own: you buy a new one, which starts at level 1. (The planner assumes an
  instant replacement.)[^player]
- Pigs use the shared XP table (levels-and-xp.md). A fed pig gets 1,000 XP a day, +350 with Animal Lover, +500 with
  Animal Charmer (1,850 with both). Pigs level up only at feeding time, so a level counts from the feed after the XP is reached.[^planner]
- At 1,850 XP a day a new pig reaches level 5 on day 7 and level 6 on day 10; level 20 takes about five months.[^planner]
- Truffles (with a Pig Collar, pigs fed that day): a level L pig finds a White Truffle on L% of days and a Black
  Truffle on L/3% of days, and can find both. Expected Truffle silver grows in a straight line with level.[^planner]
- Quests need about 70,360 Bacon across 29 quests (September 2026); quests also reward about 4,050. Bacon also drops
  exploring Mount Banon.[^planner][^buddy-bacon]

# Which pigs to slaughter

- Slaughtering resets that slot to level 1; the cost is the Truffles the slot misses while it regrows. A level 5 pig took
  a week to grow, a level 20 pig months, so the lowest pigs at level 5+ are always the cheapest Bacon.[^planner]
- For Bacon over time, a small pen slaughtered each time its pigs reach level 5 (every 7 days at 1,850 XP) makes the most
  Bacon per slot per day; level 6 (every 10 days) is about as good with fewer slaughters. Above 6, Bacon per day falls.[^planner]
- Bacon per slot per day at 1,850 XP: level 5 = 25 / 7 ≈ 3.6; level 6 = 35 / 10 = 3.5.[^planner]

[^planner]: Community bacon planner (player-shared, 2026-10-09)
[^player]: Player confirmation (2026-10-09)
[^buddy-bacon]: buddy.farm Bacon page (quest totals, as cited by the planner)
