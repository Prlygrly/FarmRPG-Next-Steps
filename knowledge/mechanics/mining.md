---
type: Game Mechanic
title: "Mining"
description: "Six zones, floors, veins and deposits, perks and charms, auto-excavation (AEX) output and pickaxe use, floor and skill rewards."
tags: [mining, aex, pickaxes, charms]
sources:
  - id: library
    resource: in-game Library pages Mining (2026-10-24, Rkm), Mining Drops (2026-10-15, sponge), Mining Floor Rewards (2026-09-07), Skill Level Rewards (2026-08-31), pasted by the player 2026-11-23
    title: "FarmRPG Library: Mining"
  - id: page
    resource: the player's Mine page and Spring Cave page, 2026-11-23
    title: "Mine pages"
  - id: buddy
    resource: https://buddy.farm/l/fenrir-s-den/ (and the other five zones)
    title: "buddy.farm mining locations"
generated: { by: claude-code/opus-5.5, at: 2026-11-24T06:00:00Z }
---
# Getting in

- Mining unlocks at Farming 40 with the quest "Fun Underground Now", which gives Cid's Spare Pickaxe.[^library]
- Six zones, each with its own Mining level and pickaxe (one pickaxe used per tile uncovered):[^library]

  | Zone | Level | Pickaxe | AEX lantern |
  |---|---|---|---|
  | Spring Cave | 1 | Pickaxe | Lantern |
  | Highland Hollow | 10 | Bone Pickaxe | Lantern |
  | Sol Grotto | 20 | Crystal Pickaxe | Lantern |
  | Ember Caverns | 30 | Sturdy Pickaxe | Linked Lantern |
  | Fenrir's Den | 40 | Steel Pickaxe | Linked Lantern |
  | Mossrock Mine | 50 | Heavy Pickaxe | Glowing Lantern |

- Each zone has its own floor count. The Mine page lists every zone with "Floor N", "Auto-Excavation On" when AEX runs,
  "Requires: <pickaxe>" when you have none of that pickaxe, and "???" / "Unlocks at Mining Level 50" for a locked zone.[^page]
- A zone's own page shows Current Floor, Charms Active, Items Left and Attempts Left.[^page]
- Several deposits are the next zone's pickaxe (Spring Cave gives Bone Pickaxes, Highland Hollow Crystal Pickaxes, Sol Grotto Sturdy,
  Ember Caverns Steel, Fenrir's Den Heavy, Mossrock Mine Ancient Pickaxes).[^library]

# A floor

- Like single-player Battleship: a grid hides multi-tile items (veins) and single white tiles (deposits).[^library]
- Grid: 5x5, 6x6 from floor 10, 7x7 from 100, 8x8 from 1,000, 9x9 from 10,000.[^library]
- Misses use attempts; hitting a vein tile or a deposit doesn't. Find every vein ("Items Left") to go down a floor. Out of attempts:
  start the floor over (no limit but pickaxes).[^library]
- Traps (red X) cost an extra attempt; Bonus Attempt tiles (purple) give one back; XP Bonus tiles give a big XP boost (still cost an
  attempt). An Explosive uncovers a row or column (one Explosive per tile, once a grid); a Bomb uncovers scattered tiles (one per grid,
  destroys deposits). Both disarm traps safely.[^library]
- Items per vein, before perks and charms: floors 1-9: 1-5; 10-99: 1-7; 100-999: 1-9; 1,000-9,999: 1-11; 10,000+: 1-13. The vein's
  length doesn't matter.[^library]
- +1 per vein for each of Effective Mining I (skill perk) and II (Farm Supply), and +1 per charm of that zone you own.[^library]
- Vein drops unlock by floor (1, 10, 100; Mossrock Mine also 1,000). Deposits have their own fixed ranges and no floor limit.[^library]
  Lists: [mining data](/data/mining.md).

# Charms

- Each zone has a charm (e.g. Fenrir's Den Charm). Charms stack, only need to be in the inventory, and only help their zone:
  +1 per vein, more manual mining XP, +1 AEX item per run each (those charm items cost no pickaxe).[^library]
- Sources: floor rewards (100, 200, 300, 400, 500 x3, 600-900, 1,000 x4 in every zone), Mining level 50 (5 each for the first three
  zones) and 60 (5 each for the last three), and some quests.[^library]

# Auto-excavation (AEX)

- Unlocks in a zone at floor 100. Every 10 minutes it collects items from that zone, using that zone's pickaxes; it turns itself off
  when they run out. No mining XP, no floors, and mining perks don't apply.[^library]
- Base output per run = floor / 10, at most 100 (every 10 floors +1, capped at floor 1,000). Pickaxes used = the base output.[^library]
- Each zone charm adds +1 item per run that uses no pickaxe.[^library]
- Which items come out depends on the current floor.[^library] The Library doesn't say how they're split; the planner assumes the same
  mix as manual mining, i.e. each item weighted by 1 / buddy.farm's hits-per-drop rate (an assumption, not a game rule).
- Lanterns can be loaded (any number, not capped by the inventory); each gives AEX a 50% chance not to use pickaxes. The planner reads
  that as "loaded lanterns halve pickaxe use".[^library]
- Per day: 144 runs, so (floor / 10 + charms) x 144 items and floor / 10 x 144 pickaxes (half with lanterns). Floor 100 with 9 charms:
  19 items a run, 2,736 a day, 1,440 pickaxes (720 with lanterns).

# Perks

- Skill perks: Mining Primer I & II (+10% XP each), Pickaxe Saver I (10% chance a pickaxe isn't used), Effective Mining I (+1 per vein),
  Deposit Detector I (more deposits).[^library]
- Farm Supply: Mining Almanac (+10% XP), Pickaxe Saver II, Deposit Detector II, Effective Mining II.[^library]

# XP

- Each tile mined manually gives a little XP; Explosives and Bombs give a lot (by level, plus the tiles); Bonus XP tiles scale with
  level; finishing a floor gives a lot (scales with depth and attempts left, capped). Charms raise manual mining XP in their zone.[^library]
- buddy.farm lists average XP and Silver value per hit for each zone and floor band (in mining.js).[^buddy]

# Rewards

- Floor rewards are claimed on each zone's info page at floors 10, 25, 50, 100, 150 ... 1,000 (lists in mining.js). Floor 50 gives a
  Maverick Chip in every zone; 300 gives 100 of the next zone's pickaxe (Sol Grotto and Highland Hollow give Bone Pickaxes).[^library]
- Mining skill rewards: 10: 15,000 Silver, 100 Bone Pickaxe, 10 Bomb; 20: 75,000, 50 Crystal Pickaxe, 10 Bomb; 30: 125,000, 50 Sturdy
  Pickaxe, 10 Bomb; 40: 500,000, 25 Steel Pickaxe, 10 Bomb; 50: 2,500,000, 5 charms each for Spring Cave, Highland Hollow, Sol Grotto;
  60: 10,000,000, 5 each for Ember Caverns, Fenrir's Den, Mossrock Mine.[^library]
- Merit badge That's Mine III: floor 10,000 in one zone.[^library]

[^library]: FarmRPG Library: Mining, Mining Drops, Mining Floor Rewards, Skill Level Rewards.
[^page]: The player's Mine page and Spring Cave page.
[^buddy]: buddy.farm mining locations.
