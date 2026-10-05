---
type: Game Mechanic
title: "Tower artifacts"
description: "The artifact each Tower floor gives and the perk it unlocks (bought for 1 perk point or 1 gold)."
tags: [tower, perks, artifacts]
sources:
  - id: wiki-artifacts
    resource: https://farmrpg.com/wiki.php?page=Tower+Artifacts
    title: "FarmRPG wiki: Tower Artifacts (edited 2026-08-24), pasted by the player"
  - id: wiki-scythe
    resource: https://farmrpg.com/wiki.php?page=Scythe+Of+Dewstar
    title: "FarmRPG wiki: Scythe Of Dewstar (edited 2026-08-25), pasted by the player"
generated: { by: claude-code/opus-5.5, at: 2026-10-05T23:00:00Z }
---

# How they work

Reaching certain Tower floors gives an artifact. The artifact only unlocks a perk: it does nothing until that perk is bought,
for 1 perk point (Perks page) or 1 gold (Farm Supply page). See [perks](/data/perks.md) for how those pages copy.[^wiki-artifacts]

# The list

| Floor | Artifact | Perk (where) | Effect |
|---|---|---|---|
| 10 | Diary of O'Dynn | Enriched Soil (perk point) | Crop growth -10% of base time; must be active when planting. With the other growth perks (80% total) it halves what's left (e.g. 48-minute Cabbage). |
| 20 | Bahltruvian Scales | Gift of Persuasion (perk point) | +10% silver from sales |
| 30 | Odthorin's Charm | Steady Hands (perk point) | Crafting costs 10% less silver |
| 40 | Stones of Gallodor | Animal Charmer (perk point) | +500 XP per pet / feed / incubate (Chickens, Cows, Pigs, Raptors) |
| 50 | Runecube | Eagle Eye (perk point) | Rare drops ~20% more often (farming, exploring, fishing); common ones slightly less |
| 60 | Growth Medallion I | Orchard Annex I (gold) | +400 orchard trees allowed |
| 70 | Trigon Knot | Fishing Trawl (perk point) | +100 fish per Large Net (500 with Reinforced Netting) |
| 80 | Friendship Bracelet | Charming Personality (perk point) | Townsfolk mail 5-15 of an item each hour; past the mailbox cap, stops at 2,000 |
| 90 | Headdress of Luna | Resource Saver 3 (gold) | +20% chance a craft gives extra items |
| 100 | Strange Gem | Inventory Boost (gold) | +2,500 inventory cap |
| 110 | Growth Medallion II | Orchard Annex II (gold) | +1,500 orchard trees allowed |
| 120 | Ashes of Pentagorn | Magic Coals (gold) | Cooking uses fewer ingredients |
| 130 | Dragon Heart | Personal Bonus (gold) | Personal Help Request rewards x2 |
| 140 | Magic Mirror | Reflecting Pool (gold) | Wishing Well rewards x2 |
| 150 | Maduin's Cup | Grape Juice Spring (gold) | Daily Grape Juice allowance x2 |
| 160 | Serpent of Trym | Antler Snare (gold) | 10% of Antler production also drops at noon |
| 170 | Spring Bangle | Tree Shaker (gold) | 10% of orchard production also drops at noon |
| 180 | Inferno Ring | Inferno Forge (gold) | 10% more when crafting one item (the wiki's item icon didn't copy) |
| 190 | Lava Ring | Lava Forge (gold) | 10% more when crafting one item (icon didn't copy) |
| 200 | Unusual Gem | Inventory Boost II (gold) | +2,500 inventory cap |
| 250 | Scythe of Dewstar | Bonus Crops (perk point) | One extra crop per plot on every harvest (see below) |
| 300 | Mechanical Heart | Monthly Love (perk point) | Bigger monthly chore rewards (+3,000 first, +2,000 second, starter box doubled); must be active when collecting |

[^wiki-artifacts]

The Friendship Bracelet's item list didn't copy (icons only).[^wiki-artifacts]

# Scythe of Dewstar (Bonus Crops)

- Each harvest also gives one bonus crop per plot, drawn from crops with the same or a shorter growth time (48 plots of Wheat:
  48 Wheat plus double-crop extras as usual, plus 48 random quicker crops). Peppers give all Peppers.[^wiki-scythe]
- Bonus crops are plain crops: no Mushrooms, no crop drops (since 2025), no Spring Seed flowers, not gold (gold seeds count as
  the plain crop), the same for mega seeds as for normal ones.[^wiki-scythe]
- No XP, and they don't count for the "harvest crops" chore. Cookies and double-crop perks don't apply to them, unless you
  have Dewstar's Journal (reward of the "Book of Dewstar Mastery" questline: crop certificates for Eggplant, Watermelon,
  Cotton, Peppers, Wheat, Broccoli, Pine Tree, Cucumber, Potato, Corn, Rice, plus Lorn friendship 90), which lets Cookies
  work on them (not on seasonal drops like Yellow Watermelon).[^wiki-scythe]

# Planner implications

- Reinforced Netting + Fishing Trawl = 500 fish per Large Net ([effort units](/mechanics/effort-units.md)).
- Noon drops (Antler Snare, Tree Shaker): see [production](/mechanics/production.md).
- Gift of Persuasion is part of the sell perks % ([silver](/mechanics/silver.md)); Grape Juice Spring doubles the Grape Juice
  allowance ([crops](/mechanics/crops.md)).
- Bonus Crops aren't modelled yet: they're random quicker crops, not more of the crop you planted.

[^wiki-artifacts]: FarmRPG wiki: Tower Artifacts
[^wiki-scythe]: FarmRPG wiki: Scythe Of Dewstar
