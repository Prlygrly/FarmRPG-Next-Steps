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
- Keep on-screen text short and formal; no superlatives ("the most useful…").[^player]
- **Slow grinds** shows only masteries the Tower still needs (its tier), plus Orange Juice, Lemonade, Large Net, White Parchment
  and Beet until MM'd; "Slower than" (default 180 days) filters the rest. Each row assumes it gets the whole production or
  budget.[^player]
- Grind times count the cap growing every day (cap + daily growth x day), not today's cap forever.[^player]
- Drinks and nets (Arnold Palmers, Apple Ciders, Lemonade, Large Nets) default from fruit / Antlers only: the hand-gathered parts
  (Glass, Tea Leaves) are easy and assumed on hand; show the exploring they take as a side note.[^player]
- Always state the **total** Arnold Palmers / Apple Ciders / Large Nets a mastery takes, not just the time: they can be bought
  or gifted, so a small total can be done in a day.[^player]
- Crops: players plant one crop in every plot (Plant All), then the next crop. Show crop needs as harvests and growth time before
  Veggie Juice; the Veggie Juice setting then decides the days. Breakfast Boost for very short crops, Grape Juice likely (not
  certain) for the longest. Ignore the rare, expensive mixed-planting item entirely.[^player]
- Silver goal: blank goal = the next Tower level; ways = crafting from production, per drink/net, and Large Nets at the best
  unlocked fishing place; the next better locked place says what unlocks it.[^player]
- Sell end products, not their parts: an item is never suggested for sale while anything made from it isn't Mega Mastered
  (sell the Butter, not the Butter Churn; tables, boxes and shields, not Wood, Boards or Planks). Items used exploring or
  fishing (Explosive, nets, drinks) aren't sold either; Chum is better gifted to a townsperson. Cooking uses count like
  crafting. 1:1 recipes with the crafting bonus (Leather Helmet -> Reinforced Helmet): MM the top item first, then the lower
  one; only then is selling the lower one sensible.[^player]
- Exceptions, case by case: Lantern and Red Shield sell well and Linked Lantern's / Frost Shield's parts are slow or costly,
  so selling them is fine short term (say the next step pays more). An item at the cap that can't be made into anything
  right now (another part is missing) may be sold.[^player]
- A single request's page (quest.php: special and personal requests, e.g. "Items Wanted", "Lost Items") lists "Items Requested"
  (item, "You have N", "Nx") and "Rewards" (Silver amount, items "Nx"); parser still to build.[^player]
- Saved production carries its own unit, as the game states it: `{ n: 54210, per: "day" }` for daily drops (Antler,
  Eggs, Milk, Trout…), `{ n: 18002, per: "hour" }` for the rest. The math converts to per hour in one place
  (`ratesPerHour` in engine.js); never store or quote a daily drop as an hourly rate.[^player]
- Full list of decisions and the batch history: the README.[^readme]

[^player]: Player confirmation
[^readme]: farmrpg-planner README
