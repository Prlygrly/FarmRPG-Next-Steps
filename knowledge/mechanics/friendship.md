---
type: Game Mechanic
title: "Townsfolk friendship"
description: "Friendship XP from gifts and requests, the multipliers, and free gifts from daily production."
tags: [friendship, townsfolk, gifts]
sources:
  - id: wiki-xp
    resource: https://farmrpg.com/wiki.php?page=XP%20Mechanics
    title: "FarmRPG wiki: XP Mechanics"
  - id: rii
    resource: FarmRPG wiki library page by Rii, 'Friendship Tips' (player-made, 2026-08-02), pasted by the player
    title: "Rii's Friendship Tips"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T20:00:00Z }
---
# Rules

- Friendship levels use the same [XP table](/mechanics/levels-and-xp.md) as skills.[^wiki-xp]
- Gift XP: loved 150 each, liked 25, hated -50, anything else 1. Super loved items give more (see the Gifts page).[^wiki-xp]
- Completing help requests gives a little XP; a completed PHR gives 450 to that townsperson.[^wiki-xp]
- Multipliers: Over The Moon x1.1, Friendship Primer perk x1.1, Townsfolk Of The Day x2. O.M.G perks: a 5% (one perk) or 10% (both) chance per gift batch of x7-x10, only on liked/loved gifts (about x1.37 / x1.75 over many batches).[^wiki-xp]
- Higher friendship is often needed later for quests or meals, so leveling townsfolk steadily is worthwhile.[^rii]

# Gift data

Every townsperson's loved, liked and hated items come from buddy.farm (`/page-data/t/<name>/`, `npcItems`; snapshot in npcs.js). Super-loved items (Heart Container 10M XP, Bouquet of Flowers 1,000) are listed with their own XP and left out of "cheap gift" suggestions.

# Free gifts from daily production (player guide)

| Item | Townsfolk |
|---|---|
| Eggs | Mariya, Star |
| Feathers | frank, Gary, Star |
| Milk | Lorn, Mariya, Borgen, Jill |
| Gummy Worms | Buddy, Thomas |
| Mealworms | Thomas |
| Minnows | Captain Thomas, Thomas |
| Trout | Holger, Gary |
| Oak | Beatrix, Gary |
| Stone | Cid |
| Black Powder | Beatrix, Cid |
| Coal | Ric Ryph |
| Wooden Button | Baba Gec |
| Twine | Charles |
| Iron Cup | Lorn |
| Horseshoe | Charles |
| Yarn | Gary, Cecil, Mummy |
| Ladder | Cecil |
| Wooden Box | Borgen, Vincent |
| Wooden Table | Holger |

Many Tower Mega Mastery items are also liked gifts (e.g. Drum -> Thomas, Shimmer Stone -> Cid, Chum -> Thomas, Glass Orb -> Lorn/George/Borgen/ROOMBA), which gives a use for the extras. Twine, Rope, Fishing Net, Mushroom Paste, Leather, Orange Juice, Lemonade, Bucket, Large Net and Red Dye are better kept for crafting.[^rii]

[^wiki-xp]: FarmRPG wiki: XP Mechanics
[^rii]: Rii's Friendship Tips
